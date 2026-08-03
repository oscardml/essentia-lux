import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Firma de webhook inválida: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const admin = createAdminClient();

    const { data: order } = await admin
      .from("orders")
      .select("id, status")
      .eq("stripe_checkout_session_id", session.id)
      .single();

    if (order && order.status !== "paid") {
      // En las compras sin cuenta el pedido se crea sin email, así que lo
      // tomamos de Stripe (que siempre lo pide al pagar). Sin esto no habría
      // forma de avisar al cliente del estado de su pedido.
      const customerEmail =
        session.customer_details?.email ?? session.customer_email ?? null;

      await admin
        .from("orders")
        .update({
          status: "paid",
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id,
          shipping_address: session.collected_information?.shipping_details ?? null,
          ...(customerEmail ? { customer_email: customerEmail } : {}),
        })
        .eq("id", order.id);

      const { data: orderItems } = await admin
        .from("order_items")
        .select("product_id, quantity")
        .eq("order_id", order.id);

      for (const item of orderItems ?? []) {
        if (!item.product_id) continue;
        await admin.rpc("decrement_product_stock", {
          p_product_id: item.product_id,
          p_quantity: item.quantity,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
