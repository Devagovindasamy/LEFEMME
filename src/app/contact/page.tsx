"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { brand } from "@/data/brand";
import { DemoNote } from "@/components/ui/DemoNote";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email."),
  message: z.string().trim().min(10, "Please write a short message."),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = (await response.json()) as { ok: boolean; message?: string };
    if (!response.ok || !payload.ok) {
      setServerError(payload.message ?? "Could not send the demo message.");
      return;
    }
    setSuccess(true);
    reset();
  }

  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">Contact</p>
      <h1 className="font-serif mt-3 text-5xl text-forest">A note to the house.</h1>
      <p className="mt-4 text-ink-soft">
        A public email, phone, and studio address have not been supplied. This
        form stores a demo message in the preview database only.
      </p>
      <DemoNote className="mt-3">
        {brand.contactEmail ? brand.contactEmail : "No public email yet."}
      </DemoNote>

      {success ? (
        <p className="mt-10 border border-gold/30 bg-paper px-6 py-8 text-forest" role="status">
          Message received for this demo. It will not be forwarded to a live inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="text-[11px] uppercase tracking-[0.18em] text-taupe">
              Name
            </label>
            <input
              id="name"
              className="mt-2 w-full border border-gold/40 bg-paper px-3 py-3 text-sm outline-none focus:border-forest"
              {...register("name")}
            />
            {errors.name ? <p className="mt-1 text-xs text-wine">{errors.name.message}</p> : null}
          </div>
          <div>
            <label htmlFor="email" className="text-[11px] uppercase tracking-[0.18em] text-taupe">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full border border-gold/40 bg-paper px-3 py-3 text-sm outline-none focus:border-forest"
              {...register("email")}
            />
            {errors.email ? <p className="mt-1 text-xs text-wine">{errors.email.message}</p> : null}
          </div>
          <div>
            <label htmlFor="message" className="text-[11px] uppercase tracking-[0.18em] text-taupe">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="mt-2 w-full border border-gold/40 bg-paper px-3 py-3 text-sm outline-none focus:border-forest"
              {...register("message")}
            />
            {errors.message ? (
              <p className="mt-1 text-xs text-wine">{errors.message.message}</p>
            ) : null}
          </div>
          {serverError ? <p className="text-sm text-wine">{serverError}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 bg-forest px-8 text-[11px] uppercase tracking-[0.2em] text-ivory disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send demo message"}
          </button>
        </form>
      )}
    </main>
  );
}
