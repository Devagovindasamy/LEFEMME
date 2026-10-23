import { brand } from "@/data/brand";

export function AnnouncementBar() {
  return (
    <div className="bg-forest text-ivory">
      <p className="px-4 py-2 text-center text-[11px] uppercase tracking-[0.28em]">
        {brand.announcement}
      </p>
    </div>
  );
}
