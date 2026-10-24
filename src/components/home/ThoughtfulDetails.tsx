import { Flower2, Sparkles, Heart, Palette, Layers } from "lucide-react";
import { brand } from "@/data/brand";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Flower2, Sparkles, Heart, Palette, Layers];

export function ThoughtfulDetails() {
  const pillars = brand.whyLefemme;

  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            numeral="03"
            eyebrow="Why Lefemme"
            title="Pretty. Intentional. Distinctive."
            body="Flowers are our first love. But there's so much more to LEFEMME. Five reasons every silhouette is made with intention."
          />
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={pillar.numeral} delay={index * 0.08} className="h-full">
                <li className="h-full border border-gold/30 bg-paper px-5 py-7 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <Icon className="text-burgundy" size={22} strokeWidth={1.5} />
                      <span
                        className="font-serif text-lg text-taupe/70"
                        aria-hidden="true"
                      >
                        {pillar.numeral}
                      </span>
                    </div>
                    <h3 className="font-serif mt-5 text-xl text-forest font-medium">
                      {pillar.heading}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-burgundy/80 font-medium">
                      {pillar.supporting}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-ink-soft">
                      {pillar.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
