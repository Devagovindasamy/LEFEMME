import Link from "next/link";
import { db, isDatabaseConfigured } from "@/db";
import { demoOrders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatDemoPrice } from "@/data/catalog";
import { DemoNote } from "@/components/ui/DemoNote";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Demo order",
  description: "A demonstration order confirmation — no payment was taken.",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  let order: typeof demoOrders.$inferSelect | undefined;
  if (orderId && isDatabaseConfigured()) {
    try {
      const rows = await db
        .select()
        .from(demoOrders)
        .where(eq(demoOrders.id, orderId))
        .limit(1);
      order = rows[0];
    } catch {
      order = undefined;
    }
  }

  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">
        Demonstration only
      </p>
      <h1 className="font-serif mt-4 text-5xl text-forest">This is not a real purchase.</h1>
      <p className="mt-5 text-base leading-7 text-ink-soft">
        No payment was collected, no bag will ship, and no inventory was reserved.
        Thank you for walking through the Lefemme demo.
      </p>
      {order ? (
        <div className="mt-10 border border-gold/30 bg-paper px-6 py-8 text-left">
          <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">
            Demo order {order.id}
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Recorded for {order.name} · {order.email}
          </p>
          <p className="mt-2 text-sm">
            Subtotal {formatDemoPrice(order.subtotalCents)}
          </p>
          <DemoNote className="mt-4">{order.note}</DemoNote>
        </div>
      ) : (
        <p className="mt-8 text-sm text-taupe">No demo order id was found.</p>
      )}
      <Link
        href="/"
        className="mt-10 inline-flex h-12 items-center bg-forest px-6 text-[11px] uppercase tracking-[0.2em] text-ivory"
      >
        Return home
      </Link>
    </main>
  );
}
