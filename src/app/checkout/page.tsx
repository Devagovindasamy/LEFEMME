"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDemoPrice } from "@/data/catalog";
import { brand } from "@/data/brand";
import { DemoNote } from "@/components/ui/DemoNote";
import { cartSubtotal, useCartStore } from "@/store/cart";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const clear = useCartStore((s) => s.clear);
  const subtotal = cartSubtotal(items);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        items,
      }),
    });
    const payload = (await response.json()) as {
      ok: boolean;
      orderId?: string;
      message?: string;
    };
    if (!response.ok || !payload.ok || !payload.orderId) {
      setServerError(payload.message ?? "Could not place the demo order.");
      return;
    }
    clear();
    router.push(`/checkout/confirmation?order=${payload.orderId}`);
  }

  if (!hasHydrated) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-16">
        <p>Loading checkout…</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-serif text-4xl text-forest">Your bag is empty</h1>
        <Link href="/shop" className="mt-6 inline-block text-sm text-burgundy underline">
          Return to the collection
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">
        Demo checkout
      </p>
      <h1 className="font-serif mt-3 text-5xl text-forest">Almost there.</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">{brand.demo.checkoutDisclaimer}</p>
      <DemoNote className="mt-3">No payment details are requested or stored.</DemoNote>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="text-[11px] uppercase tracking-[0.18em] text-taupe">
              Full name
            </label>
            <input
              id="name"
              className="mt-2 w-full border border-gold/40 bg-paper px-3 py-3 text-sm outline-none focus:border-forest"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-wine" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="email" className="text-[11px] uppercase tracking-[0.18em] text-taupe">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full border border-gold/40 bg-paper px-3 py-3 text-sm outline-none focus:border-forest"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-wine" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <p className="text-sm text-ink-soft">
            Shipping address and payment are omitted on purpose. This preview
            records a demo order only.
          </p>
          {serverError ? (
            <p className="text-sm text-wine" role="alert">
              {serverError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-forest text-[11px] uppercase tracking-[0.22em] text-ivory disabled:opacity-60"
          >
            {isSubmitting ? "Placing demo order…" : "Place demo order"}
          </button>
        </form>

        <aside className="border border-gold/30 bg-paper p-6">
          <h2 className="font-serif text-2xl text-forest">Bag summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={`${item.productId}-${item.colorSlug}`} className="flex justify-between text-sm">
                <span>
                  {item.name} · {item.colorName} × {item.quantity}
                </span>
                <span>{formatDemoPrice(item.unitPriceCents * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-gold/30 pt-4">
            <span>Subtotal</span>
            <span>{formatDemoPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
