import { PlaceholderPolicy } from "@/components/content/PlaceholderPolicy";

export const metadata = {
  title: "Shipping",
  description: "Lefemme shipping policy placeholder.",
};

export default function ShippingPage() {
  return (
    <PlaceholderPolicy
      eyebrow="Shipping"
      title="Shipping details coming soon."
      body="Transit times, regions, and carriers have not been confirmed. This page is reserved for the official shipping policy and should not be read as a delivery promise."
    />
  );
}
