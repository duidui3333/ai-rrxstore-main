import type { ReactNode } from "react";
import { ArrowLeft, Flame } from "lucide-react";

export default function UnifiedTemplateDetailLayout({
  onBack,
  preview,
  previewSideActions,
  eyebrow,
  title,
  description,
  tags = [],
  primaryAction,
  secondaryAction,
  bottomHeading,
  bottomContent,
  tagClassName = "text-[13px] font-normal px-2.5 py-1.5 bg-slate-100 text-slate-650 rounded-xl hover:bg-slate-200/60 transition-colors cursor-default",
}: {
  onBack: () => void;
  preview: ReactNode;
  previewSideActions?: ReactNode;
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tags?: string[];
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
  bottomHeading?: ReactNode;
  bottomContent?: ReactNode;
  tagClassName?: string;
}) {
  return (
    <div className="w-full px-5 py-6 sm:px-7 xl:px-10 space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start pt-2 max-w-[1680px] mx-auto">
        <div className="xl:col-span-7 xl:sticky xl:top-4 flex flex-col items-center rounded-[30px] bg-[linear-gradient(135deg,#f4f7ff,#ffffff)] border border-blue-50 shadow-[0_18px_60px_rgba(30,58,138,0.08)] py-6 relative overflow-visible">
          <button
            type="button"
            onClick={onBack}
            className="absolute left-6 top-6 z-20 flex items-center gap-1.5 rounded-full bg-white/92 px-4 py-2 text-[13px] font-bold text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80 backdrop-blur-md transition-all hover:bg-white hover:text-slate-950 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>

          {previewSideActions ? (
            <div className="absolute right-6 top-6 z-20 flex flex-col items-center gap-3">
              {previewSideActions}
            </div>
          ) : null}

          {preview}
        </div>

        <div className="xl:col-span-5 space-y-5">
          <div className="bg-white rounded-[28px] border border-slate-100 p-6 md:p-7 shadow-[0_16px_44px_rgba(30,58,138,0.08)] flex flex-col justify-between relative overflow-visible group">
            <div className="flex items-start justify-between flex-wrap gap-4 z-10">
              <div className="flex items-center">
                <div>
                  {eyebrow}
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 leading-tight">
                    {title}
                  </h2>
                </div>
              </div>
            </div>

            {description ? (
              <div className="mt-4 z-10">
                {description}
              </div>
            ) : null}

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-4 z-10">
                {tags.map((tag, idx) => (
                  <span key={`${tag}-${idx}`} className={tagClassName}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 grid grid-cols-2 gap-3 z-10">
              {primaryAction}
              {secondaryAction}
            </div>
          </div>

          {bottomContent ? (
            <div className="space-y-4 pt-2">
              {bottomHeading ? (
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-rose-500 fill-rose-500/10" />
                  {bottomHeading}
                </h3>
              ) : null}
              {bottomContent}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
