import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">404</p>
      <h1 className="font-serif mt-3 text-5xl text-forest">This bloom wandered off.</h1>
      <p className="mt-4 text-ink-soft">The page isn’t in the collection.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center bg-forest px-6 text-[11px] uppercase tracking-[0.2em] text-ivory"
      >
        Return home
      </Link>
    </main>
  );
}
