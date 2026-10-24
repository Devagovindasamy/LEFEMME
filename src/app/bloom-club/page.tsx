import { brand } from "@/data/brand";
import { NewsletterForm } from "@/components/bloom/NewsletterForm";

export const metadata = {
  title: "The Bloom Club",
  description: "Join The Bloom Club — LEFEMME’s free email community for first looks, founder letters, and little surprises.",
};

export default function BloomClubPage() {
  const { bloomClub } = brand;

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <p className="font-script text-4xl text-burgundy">{brand.community}</p>
      <h1 className="font-serif mt-3 text-5xl text-forest sm:text-6xl font-light">
        {bloomClub.headline}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft max-w-xl mx-auto">
        {bloomClub.invite}
      </p>

      {/* 3 Bloom Club Benefits */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3 text-left">
        {bloomClub.benefits.map((benefit, i) => (
          <div
            key={i}
            className="border border-gold/40 bg-[#FAF6F0] p-6 rounded-xs shadow-xs"
          >
            <span className="text-2xl" aria-hidden="true">{benefit.icon}</span>
            <h3 className="font-serif mt-3 text-lg text-forest font-medium">
              {benefit.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-md text-left">
        <NewsletterForm source="bloom-club-page" />
      </div>

      <p className="mt-6 text-xs text-taupe">
        Join for early access, founder notes, and special treats. Unsubscribe at any time.
      </p>
    </main>
  );
}
