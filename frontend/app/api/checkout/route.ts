import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export async function POST(request: Request) {
  const { items } = (await request.json()) as { items: CheckoutItem[] };

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // La interfaz ya pide iniciar sesión antes de comprar, pero eso solo es una
  // barrera visual: sin esta comprobación cualquiera podría llamar a este
  // endpoint directamente y generar pedidos anónimos.
  if (!user) {
    return NextResponse.json(
      { error: "Debes iniciar sesión para completar la compra." },
      { status: 401 }
    );
  }

  const admin = createAdminClient();

  // Revalidar precios y stock en el servidor: nunca confiar en el cliente.
  const productIds = items.map((i) => i.productId);
  const { data: products, error: productsError } = await admin
    .from("products")
    .select("id, name, price_cents, currency, stock, active")
    .in("id", productIds);

  if (productsError || !products || products.length !== productIds.length) {
    return NextResponse.json({ error: "Alguno de los productos ya no existe." }, { status: 400 });
  }

  let discountPercent = 0;
  if (user) {
    const { data: profile } = await admin
      .from("profiles")
      .select("member_discount_percent, is_member")
      .eq("id", user.id)
      .single();
    if (profile?.is_member) discountPercent = profile.member_discount_percent;
  }

  const lineItems: {
    productId: string;
    name: string;
    unitPriceCents: number;
    quantity: number;
    currency: string;
  }[] = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product || !product.active) {
      return NextResponse.json({ error: "Alguno de los productos ya no está disponible." }, { status: 400 });
    }
    if (item.quantity < 1 || item.quantity > product.stock) {
      return NextResponse.json(
        { error: `No hay suficiente stock de "${product.name}".` },
        { status: 400 }
      );
    }
    lineItems.push({
      productId: product.id,
      name: product.name,
      unitPriceCents: product.price_cents,
      quantity: item.quantity,
      currency: product.currency,
    });
  }

  const currency = lineItems[0].currency;
  const subtotalCents = lineItems.reduce(
    (sum, i) => sum + i.unitPriceCents * i.quantity,
    0
  );
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  const totalCents = subtotalCents - discountCents;

  // Crear el pedido en estado "pending" antes de redirigir a Stripe.
  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      status: "pending",
      subtotal_cents: subtotalCents,
      discount_cents: discountCents,
      total_cents: totalCents,
      currency,
      customer_email: user?.email ?? null,
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "No se pudo crear el pedido." }, { status: 500 });
  }

  await admin.from("order_items").insert(
    lineItems.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      product_name: i.name,
      unit_price_cents: i.unitPriceCents,
      quantity: i.quantity,
    }))
  );

  // El dominio se deduce de la propia petición para que las URLs de vuelta
  // de Stripe apunten siempre al sitio real (evita mandar al cliente a
  // localhost si NEXT_PUBLIC_SITE_URL se quedó mal configurada en Vercel).
  const siteUrl =
    request.headers.get("origin") ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const stripeLineItems = lineItems.map((i) => ({
    price_data: {
      currency: i.currency,
      product_data: { name: i.name },
      unit_amount: i.unitPriceCents,
    },
    quantity: i.quantity,
  }));

  // El descuento de socio se aplica como un cupón de importe fijo sobre el total.
  const discounts = discountCents > 0
    ? [
        {
          coupon: (
            await stripe.coupons.create({
              amount_off: discountCents,
              currency,
              duration: "once",
              name: `Descuento de socio (${discountPercent}%)`,
            })
          ).id,
        },
      ]
    : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: stripeLineItems,
    discounts,
    customer_email: user?.email,
    success_url: `${siteUrl}/tienda/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/tienda/cancelado`,
    shipping_address_collection: { allowed_countries: ["ES"] },
    metadata: { order_id: order.id },
  });

  await admin
    .from("orders")
    .update({ stripe_checkout_session_id: session.id })
    .eq("id", order.id);

  return NextResponse.json({ url: session.url });
}
