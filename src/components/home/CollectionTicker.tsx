import { getCharms, getHandbags } from "@/data/catalog";

function FlowerGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true">
      <g transform="translate(6 6.4)">
        <circle cx="0" cy="-3.4" r="2.4" fill="#8A3E4C" />
        <circle cx="3.2" cy="-1" r="2.4" fill="#6E2C3A" />
        <circle cx="2" cy="2.8" r="2.4" fill="#8A3E4C" />
        <circle cx="-2" cy="2.8" r="2.4" fill="#6E2C3A" />
        <circle cx="-3.2" cy="-1" r="2.4" fill="#8A3E4C" />
        <circle cx="0" cy="0" r="1.5" fill="#C4A574" />
      </g>
    </svg>
  );
}

/**
 * Hairline marquee divider that carries the eye from the hero into the
 * handbag collection. Decorative only — the collection itself follows below.
 * Static (non-animated) when reduced motion is preferred.
 */
export function CollectionTicker() {
  const names = [
    ...getHandbags().map((p) => p.name),
    ...getCharms().map((p) => p.name.replace(" Leather Charm", "")),
  ];

  return (
    <div className="marquee overflow-hidden border-y border-gold/25 bg-paper py-3.5">
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-8"
          >
            {names.map((name) => (
              <span key={`${copy}-${name}`} className="flex items-center gap-8">
                <span className="font-serif text-lg tracking-wide text-forest">
                  {name}
                </span>
                <FlowerGlyph />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
