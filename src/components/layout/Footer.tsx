import Link from "next/link";
import { brand, footerNav } from "@/data/brand";
import { NewsletterForm } from "@/components/bloom/NewsletterForm";
import { BloomDiscovery } from "@/components/interactive/BloomDiscovery";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-gold/30 bg-forest text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="font-serif text-3xl tracking-[0.18em]">{brand.name}</p>
          <p className="font-script mt-2 text-2xl text-gold-soft">
            {brand.community}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-ivory/75">
            A feminine floral handbag house. Elegant first, playfully personal
            second. Demo storefront — not a live shop.
          </p>
          <div className="mt-8 max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">
              Join the Bloom Club
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          <FooterColumn title="Shop" links={footerNav.shop} />
          <FooterColumn title="The House" links={footerNav.house} />
          <FooterColumn title="Care" links={footerNav.care} />
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-[11px] uppercase tracking-[0.18em] text-ivory/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <p>Lefemme demo. No live inventory or payments.</p>
            <span className="hidden sm:inline text-gold/40">·</span>
            <BloomDiscovery
              quoteId="footer-signoff"
              variant="ribbon"
              align="left"
              label="House Note"
              className="text-gold-soft hover:text-ivory"
            />
          </div>
          <p>
            Instagram{" "}
            {brand.instagramUrl ? (
              <a href={brand.instagramUrl} className="text-gold-soft underline">
                {brand.instagramHandle ?? "Visit"}
              </a>
            ) : (
              <span>profile coming soon</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ivory/80 transition-colors hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
