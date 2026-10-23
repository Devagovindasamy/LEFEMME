import { DemoNote } from "@/components/ui/DemoNote";

export function PlaceholderPolicy({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">{eyebrow}</p>
      <h1 className="font-serif mt-3 text-5xl text-forest">{title}</h1>
      <p className="mt-6 text-base leading-8 text-ink-soft">{body}</p>
      <DemoNote className="mt-6">
        Demo placeholder — replace with counsel-approved policy copy.
      </DemoNote>
    </main>
  );
}
