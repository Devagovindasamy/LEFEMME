import { PlaceholderPolicy } from "@/components/content/PlaceholderPolicy";

export const metadata = {
  title: "Terms",
  description: "Lefemme terms placeholder.",
};

export default function TermsPage() {
  return (
    <PlaceholderPolicy
      eyebrow="Terms"
      title="Terms coming soon."
      body="Purchase terms, intellectual property, and house rules have not been supplied. Nothing on this demo storefront constitutes a commercial offer."
    />
  );
}
