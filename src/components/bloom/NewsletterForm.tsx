"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/cn";

const schema = z.object({
  email: z.email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm({
  variant = "light",
  source = "footer",
  onSuccess,
}: {
  variant?: "light" | "dark";
  source?: string;
  onSuccess?: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const response = await fetch("/api/bloom-club", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, source }),
    });
    const payload = (await response.json()) as { ok: boolean; message?: string };
    if (!response.ok || !payload.ok) {
      setServerError(payload.message ?? "Something went wrong. Please try again.");
      return;
    }
    setSuccess(true);
    reset();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lefemme-bloom-joined", "1");
    }
    onSuccess?.();
  }

  if (success) {
    return (
      <p
        className={cn(
          "mt-4 text-sm leading-6",
          variant === "dark" ? "text-gold-soft" : "text-forest",
        )}
        role="status"
      >
        You’re officially part of the Bloom Club.
        <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-taupe">
          Demo signup saved locally — not a live mailing list.
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4" noValidate>
      <div
        className={cn(
          "flex items-stretch border",
          variant === "dark" ? "border-ivory/25" : "border-gold/40",
        )}
      >
        <label className="sr-only" htmlFor={`bloom-email-${source}`}>
          Email address
        </label>
        <input
          id={`bloom-email-${source}`}
          type="email"
          autoComplete="email"
          placeholder="Email address"
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none",
            variant === "dark"
              ? "text-ivory placeholder:text-ivory/45"
              : "text-ink placeholder:text-taupe",
          )}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "px-4 text-[11px] uppercase tracking-[0.18em] transition-colors disabled:opacity-60",
            variant === "dark"
              ? "bg-ivory text-forest hover:bg-cream"
              : "bg-forest text-ivory hover:bg-forest-soft",
          )}
        >
          {isSubmitting ? "Sending" : "Join"}
        </button>
      </div>
      {errors.email ? (
        <p className="mt-2 text-xs text-wine" role="alert">
          {errors.email.message}
        </p>
      ) : null}
      {serverError ? (
        <p className="mt-2 text-xs text-wine" role="alert">
          {serverError}
        </p>
      ) : null}
      <p
        className={cn(
          "mt-2 text-[11px] leading-5",
          variant === "dark" ? "text-ivory/45" : "text-taupe",
        )}
      >
        Demo only. We store your email in this preview database so the form can
        work — it is not a production list.
      </p>
    </form>
  );
}
