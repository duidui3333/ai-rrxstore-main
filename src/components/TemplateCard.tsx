import type { Key, MouseEventHandler } from "react";
import { Eye, Heart, Info } from "lucide-react";
import { cn } from "../lib/utils";

type TemplateCardProps = {
  key?: Key;
  title: string;
  image: string;
  category: string;
  subCategory: string;
  usageText: string;
  onClick: () => void;
  badgeText?: string;
  badgeClassName?: string;
  isFavorite?: boolean;
  onToggleFavorite?: MouseEventHandler<HTMLButtonElement>;
  infoTooltip?: string;
  favoriteTooltip?: string;
  wrapperClassName?: string;
  imageWrapperClassName?: string;
  titleClassName?: string;
};

export default function TemplateCard({
  title,
  image,
  category,
  subCategory,
  usageText,
  onClick,
  badgeText,
  badgeClassName = "bg-blue-600",
  isFavorite = false,
  onToggleFavorite,
  infoTooltip = "可商用，查看详情",
  favoriteTooltip,
  wrapperClassName,
  imageWrapperClassName,
  titleClassName,
}: TemplateCardProps) {
  const resolvedFavoriteTooltip = favoriteTooltip || (isFavorite ? "取消收藏" : "收藏模板");

  return (
    <article
      onClick={onClick}
      className={cn("group flex cursor-pointer flex-col rounded-xl bg-white transition-all duration-300 hover:-translate-y-1", wrapperClassName)}
    >
      <div className={cn("relative aspect-[3/5] w-full overflow-hidden rounded-xl", imageWrapperClassName)}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          draggable={false}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/30" />

        {badgeText ? (
          <div className={cn("absolute left-2 top-2 z-10 rounded px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm", badgeClassName)}>
            {badgeText}
          </div>
        ) : null}

        <div className="absolute right-2 top-2 z-30 flex items-center gap-1.5">
          <div className="relative group/tip">
            <button
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-slate-900/20 p-1.5 text-white backdrop-blur-md transition-all hover:bg-slate-900/40 cursor-pointer"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 top-full mt-2 rounded bg-slate-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity pointer-events-none shadow-xl border border-white/10 group-hover/tip:opacity-100">
              {infoTooltip}
              <div className="absolute -top-1 right-2.5 h-2 w-2 rotate-45 border-l border-t border-white/10 bg-slate-800" />
            </div>
          </div>

          <div className="relative group/tip">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(e);
              }}
              className="rounded-full bg-slate-900/20 p-1.5 text-white backdrop-blur-md transition-all hover:bg-slate-900/40 cursor-pointer"
            >
              <Heart className={cn("h-3.5 w-3.5 transition-colors", isFavorite && "fill-red-500 text-red-500")} />
            </button>
            <div className="absolute right-0 top-full mt-2 rounded bg-slate-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity pointer-events-none shadow-xl border border-white/10 group-hover/tip:opacity-100">
              {resolvedFavoriteTooltip}
              <div className="absolute -top-1 right-2.5 h-2 w-2 rotate-45 border-l border-t border-white/10 bg-slate-800" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 bg-slate-900/0 transition-all duration-300 group-hover:bg-slate-900/22" />
      </div>

      <div className="relative z-20 flex flex-col gap-2 rounded-b-xl bg-transparent pb-1 pt-3">
        <h3 className={cn("line-clamp-1 text-[14px] font-semibold text-slate-800 transition-colors group-hover:text-blue-600", titleClassName)} title={title}>
          {title}
        </h3>

        <div className="flex items-center justify-between text-[11.5px] text-slate-500">
          <div className="flex items-center gap-1 rounded bg-slate-50 px-1.5 py-0.5 font-medium text-slate-600">
            <span>{category}</span>
            <span className="scale-75 text-slate-300">•</span>
            <span>{subCategory}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded bg-slate-50 px-1.5 py-0.5 font-medium text-slate-500">
            <Eye className="h-3.5 w-3.5" />
            {usageText}
          </div>
        </div>
      </div>
    </article>
  );
}
