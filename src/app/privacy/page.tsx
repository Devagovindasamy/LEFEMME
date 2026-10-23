import { PlaceholderPolicy } from "@/components/content/PlaceholderPolicy";

export const metadata = {
  title: "Privacy",
  description: "Lefemme privacy policy placeholder.",
};

export default function PrivacyPage() {
  return (
    <PlaceholderPolicy
      eyebrow="Privacy"
      title="Privacy policy coming soon."
      body="This demo may store emails you submit in the local preview database so forms can function. It is not a production privacy policy and should be replaced before launch."
    />
  );
}
