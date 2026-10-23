import { brand } from "@/data/brand";
import { NewsletterForm } from "@/components/bloom/NewsletterForm";
import { DemoNote } from "@/components/ui/DemoNote";

export const metadata = {
  title: "The Bloom Club",
  description: "Join The Bloom Club — Lefemme’s community for Bloomies. Demo signup only.",
};

export default function BloomClubPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <p className="font-script text-4xl text-burgundy">{brand.community}</p>
      <h1 className="font-serif mt-3 text-5xl text-forest sm:text-6xl">
        {brand.bloomClub.headline}
      </h1>
      <p className="mt-5 text-lg leading-8 text-ink-soft">
        {brand.bloomClub.invite}
      </p>
      <p className="mt-2 text-burgundy">{brand.bloomClub.whisper}</p>
      <div className="mx-auto mt-8 max-w-md text-left">
        <NewsletterForm source="bloom-club-page" />
      </div>
      <DemoNote className="mt-8">
        Demo community signup. Not connected to a production email platform.
      </DemoNote>
    </main>
  );
}
