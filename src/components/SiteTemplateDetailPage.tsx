import type { ReactNode } from "react";
import { Heart, Rocket, ScanLine, Share2, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import UnifiedTemplateDetailLayout from "./UnifiedTemplateDetailLayout";

type RecommendationItem = {
  id: string;
};

type SiteTemplateDetailPageProps = {
  template: {
    id: string;
    title: string;
    type: string;
    style: string;
    scene: string;
  };
  previewImage: string;
  qrPreview?: ReactNode;
  recommendations: RecommendationItem[];
  renderRecommendationCard: (item: RecommendationItem, index: number) => ReactNode;
  onBack: () => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  themeButtonClassName: string;
  eyebrowSuffix?: string;
  secondaryActionLabel?: string;
};

export default function SiteTemplateDetailPage({
  template,
  previewImage,
  qrPreview,
  recommendations,
  renderRecommendationCard,
  onBack,
  onPrimaryAction,
  onSecondaryAction,
  onToggleFavorite,
  isFavorite = false,
  themeButtonClassName,
  eyebrowSuffix = "节日大促特荐",
  secondaryActionLabel = "立即发布",
}: SiteTemplateDetailPageProps) {
  return (
    <UnifiedTemplateDetailLayout
      onBack={onBack}
      preview={
        <div className="relative flex flex-col items-center">
          <div className="relative h-[min(772px,calc(100vh-180px))] w-[min(398px,50vh)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[90%] w-[90%] rounded-[40px] border-[11px] border-slate-900 bg-slate-950 shadow-2xl flex flex-col overflow-hidden select-none ring-8 ring-white">
                <img
                  src={previewImage}
                  alt="模板详情预览图"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      }
      previewSideActions={
        <>
          <button
            onClick={onToggleFavorite}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all cursor-pointer active:scale-95 shadow-md"
            title={isFavorite ? "取消收藏" : "收藏模板"}
          >
            <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500 border-transparent animate-pulse" : "text-slate-650")} />
          </button>

          <div className="relative group/share">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 bg-white text-slate-650 transition-all cursor-pointer active:scale-95 shadow-md"
              title="查看/分享二维码"
            >
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>

            <div className="absolute right-0 top-full mt-2 w-[178px] p-3 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 pointer-events-none opacity-0 group-hover/share:opacity-100 group-hover/share:pointer-events-auto transition-all duration-300 transform scale-95 group-hover/share:scale-100 origin-top flex flex-col items-center gap-2 bg-white/98 backdrop-blur-md">
              <div className="w-36 h-36 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-2 relative group/qr shadow-xs">
                {qrPreview}
              </div>
              <span className="text-[11px] font-black text-slate-700 flex items-center gap-1.5 leading-none whitespace-nowrap mt-1">
                <ScanLine className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                微信扫描二维码
              </span>
            </div>
          </div>
        </>
      }
      eyebrow={
        <span className="text-[12px] uppercase font-black tracking-widest text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-md leading-none">
          {template.type} • {eyebrowSuffix}
        </span>
      }
      title={template.title}
      tags={[
        template.type,
        `${template.style}风格`,
        template.scene !== "全部" ? template.scene : "通用节日",
      ].filter(Boolean).slice(0, 3)}
      primaryAction={
        <button
          onClick={onPrimaryAction}
          className={cn("px-5 py-4 text-white text-[13.5px] font-black rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer", themeButtonClassName)}
        >
          <Sparkles className="w-5 h-5 fill-white" />
          AI 做同款
        </button>
      }
      secondaryAction={
        <button
          onClick={onSecondaryAction}
          className="px-5 py-4 text-slate-950 bg-blue-50 hover:bg-blue-100 font-extrabold rounded-2xl text-[13.5px] transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer border border-blue-100"
        >
          <Rocket className="w-5 h-5 text-slate-950" />
          {secondaryActionLabel}
        </button>
      }
      bottomHeading="相似玩法推荐"
      bottomContent={
        <div className="grid grid-cols-3 gap-3">
          {recommendations.slice(0, 15).map((item, index) => renderRecommendationCard(item, index))}
        </div>
      }
    />
  );
}
