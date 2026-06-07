import type { LucideIcon } from "lucide-react";

type IntegrationOptionItem = {
  title: string;
  subtitle: string;
  onClick: () => void;
  icon: LucideIcon;
  iconClassName: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function IntegrationOptionsSection({
  items,
}: {
  items: IntegrationOptionItem[];
}) {
  return (
    <div className="space-y-0.5">
      <div className="mb-0.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 select-none">
        接入方案
      </div>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.title}
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <Icon className={`w-4 h-4 shrink-0 ${item.iconClassName}`} />
            <span className="min-w-0 flex-1">
              <span className={`block truncate ${item.titleClassName || ""}`}>{item.title}</span>
              <span className={`block text-[10px] font-semibold normal-case tracking-normal ${item.subtitleClassName || ""}`}>
                {item.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
