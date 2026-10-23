import { Flower2, KeyRound, Layers, LayoutGrid } from "lucide-react";
import { brandFeatures } from "@/data/catalog";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = {
  lipstick: Flower2,
  "key-leash": KeyRound,
  structure: Layers,
  organisation: LayoutGrid,
};

export function ThoughtfulDetails() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            numeral="03"
            eyebrow="Made for the day"
            title="Thoughtful details."
            body="Everyday function, written in a quieter voice. These are brand-level features until each is confirmed for a specific bag."
          />
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {brandFeatures.map((feature, index) => {
            const Icon = icons[feature.id];
            return (
              <Reveal key={feature.id} delay={index * 0.08} className="h-full">
                <li className="h-full border border-gold/30 bg-paper px-6 py-8 transition-colors hover:border-burgundy/40">
                  <div className="flex items-center justify-between">
                    <Icon className="text-burgundy" size={22} strokeWidth={1.5} />
                    <span
                      className="font-serif text-lg text-taupe/70"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif mt-5 text-2xl text-forest">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    {feature.body}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
