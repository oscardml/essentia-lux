import Link from "next/link";
import { redirect } from "next/navigation";
import { FaBoxOpen, FaStore, FaCalendarAlt } from "react-icons/fa";
import { createClient } from "@/lib/supabase/server";
import DatosPersonales from "@/components/cuenta/DatosPersonales";
import SeguridadCuenta from "@/components/cuenta/SeguridadCuenta";
import CodigoSocio from "@/components/cuenta/CodigoSocio";
import { DISCOUNT_CODES } from "@/config/discounts";
import { formatPrice, formatProductName } from "@/types/product";

export const metadata = {
  title: "Mi cuenta",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente de pago",
  paid: "Pagado",
  failed: "Fallido",
  refunded: "Reembolsado",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  paid: "bg-green-50 text-green-700 border-green-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  refunded: "bg-gray-100 text-gray-600 border-gray-200",
};

interface OrderItemRow {
  product_name: string;
  unit_price_cents: number;
  quantity: number;
}

interface OrderRow {
  id: string;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
  discount_code: string | null;
  order_items: OrderItemRow[];
}

export default async function MiCuentaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_member, member_discount_percent")
    .eq("id", user.id)
    .single();

  // Los pedidos se piden con sus líneas para poder mostrar qué se compró,
  // no solo el importe total.
  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id, status, total_cents, currency, created_at, discount_code, order_items(product_name, unit_price_cents, quantity)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();

  const nombreCorto = profile?.full_name?.split(" ")[0];
  const codigoSocio = DISCOUNT_CODES.find((d) => d.requiereCuenta);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Cabecera */}
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#6A806C] to-[#AF7E44] px-6 sm:px-8 py-6">
          <h1 className="text-2xl font-bold text-white">
            {nombreCorto ? `Hola, ${nombreCorto}` : "Mi cuenta"}
          </h1>
          <p className="text-white/80 mt-1">{user.email}</p>
        </div>

        {profile?.is_member && codigoSocio && (
          <div className="p-6 sm:p-8">
            <CodigoSocio
              code={codigoSocio.code}
              percent={codigoSocio.percent}
            />
          </div>
        )}
      </section>

      {/* Accesos rápidos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/tienda"
          className="group flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
        >
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <FaStore className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900">Ir a la tienda</p>
            <p className="text-sm text-gray-500">Cosmética profesional</p>
          </div>
        </Link>

        <Link
          href="/separar-cita"
          className="group flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
        >
          <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
            <FaCalendarAlt className="text-secondary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900">Reservar cita</p>
            <p className="text-sm text-gray-500">Agenda tu tratamiento</p>
          </div>
        </Link>
      </section>

      {/* Datos personales */}
      <DatosPersonales
        userId={user.id}
        email={user.email ?? ""}
        initialName={profile?.full_name ?? null}
      />

      {/* Pedidos */}
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
          <FaBoxOpen className="text-primary text-base" />
          Mis pedidos
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Aquí puedes consultar todo lo que has comprado.
        </p>

        {!orders || orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Todavía no has realizado ningún pedido.
            </p>
            <Link
              href="/tienda"
              className="inline-block bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200"
            >
              Descubrir productos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {new Date(order.created_at).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {order.discount_code && (
                      <p className="text-xs text-primary font-medium mt-0.5">
                        Código aplicado: {order.discount_code}
                      </p>
                    )}
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      STATUS_STYLES[order.status] ?? STATUS_STYLES.refunded
                    }`}
                  >
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>

                <ul className="space-y-1 mb-3">
                  {order.order_items?.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-3 text-sm text-gray-600"
                    >
                      <span className="min-w-0">
                        {item.quantity} × {formatProductName(item.product_name)}
                      </span>
                      <span className="whitespace-nowrap">
                        {formatPrice(
                          item.unit_price_cents * item.quantity,
                          order.currency
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500">
                    Total
                  </span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(order.total_cents, order.currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Seguridad */}
      <SeguridadCuenta />

      {/* Ayuda */}
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          ¿Necesitas ayuda con un pedido?
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Escríbenos y te respondemos lo antes posible.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/34691589789"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200"
            style={{ backgroundColor: "#6A806C" }}
          >
            Escribir por WhatsApp
          </a>
          <a
            href="mailto:info@essluxam.com"
            className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition-all duration-200"
          >
            Enviar un email
          </a>
        </div>
      </section>
    </div>
  );
}
