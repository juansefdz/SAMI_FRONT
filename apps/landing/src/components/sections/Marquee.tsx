import { Cross } from "@/components/ui/Icons";

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <Cross width={14} height={14} className="text-white/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative overflow-hidden bg-brand-600 py-5 font-display text-2xl font-medium tracking-tight text-white md:text-4xl">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
