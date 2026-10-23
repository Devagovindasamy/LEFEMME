import { cn } from "@/lib/cn";

export function DemoNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] uppercase tracking-[0.18em] text-taupe",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function DemoPrice({
  amount,
  className,
}: {
  amount: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span>{amount}</span>
      <span className="text-[10px] uppercase tracking-[0.16em] text-taupe">
        Demo
      </span>
    </span>
  );
}
