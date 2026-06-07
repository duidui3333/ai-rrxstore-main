import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import SiteTemplateDetailPage from "./SiteTemplateDetailPage";
import TemplateCard from "./TemplateCard";
import templateImage1 from "../assets/images/template_image_01.png";
import templateImage2 from "../assets/images/template_image_02.png";
import templateImage3 from "../assets/images/template_image_03.png";
import templateImage4 from "../assets/images/template_image_04.png";
import templateImage5 from "../assets/images/template_image_05.png";
import templateImage6 from "../assets/images/template_image_06.png";
import templateImage7 from "../assets/images/template_image_07.png";
import templateImage8 from "../assets/images/template_image_08.png";
import templateImage9 from "../assets/images/template_image_09.png";
import templateImage10 from "../assets/images/template_image_10.png";
import templateImage11 from "../assets/images/template_image_11.png";
import templateImage12 from "../assets/images/template_image_12.png";

export interface TemplateCenterDetailData {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  views: number;
  image: string;
  isHot?: boolean;
}

const TEMPLATE_IMAGE_POOL = [
  templateImage1,
  templateImage2,
  templateImage3,
  templateImage4,
  templateImage5,
  templateImage6,
  templateImage7,
  templateImage8,
  templateImage9,
  templateImage10,
  templateImage11,
  templateImage12,
];

const RECOMMENDATION_SUBCATEGORIES: Record<string, string[]> = {
  游戏: ["闯关类", "抽奖类", "签到打卡", "小游戏", "大转盘"],
  设计: ["H5模板", "节日海报", "邀请函", "电子画册", "长图文"],
  答题: ["每日一答", "知识问答", "调查问卷", "趣味测试", "测评"],
  营销: ["微网站", "活动聚合", "模板主页", "微推", "裂变"],
  搭建: ["积分商城", "落地页", "微传单", "活动聚合页", "抽奖活动"],
};

const buildRecommendations = (template: TemplateCenterDetailData): TemplateCenterDetailData[] => {
  const pool = RECOMMENDATION_SUBCATEGORIES[template.category] || RECOMMENDATION_SUBCATEGORIES["设计"];

  return Array.from({ length: 9 }).map((_, index) => ({
    id: `${template.id}-recommend-${index}`,
    title: `${template.category}主题 - 商用高质量模板 ${index + 1}`,
    category: template.category,
    subCategory: pool[index % pool.length],
    views: 6800 + index * 1370,
    image: TEMPLATE_IMAGE_POOL[(index + 1) % TEMPLATE_IMAGE_POOL.length],
    isHot: index % 4 === 0,
  }));
};

export default function TemplateCenterDetail({
  template,
  onBack,
}: {
  template: TemplateCenterDetailData;
  onBack: () => void;
}) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const recommendations = useMemo(() => buildRecommendations(template), [template]);

  const toggleFavorite = (id: string, e?: MouseEvent) => {
    e?.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openTemplateDetail = (nextTemplate: TemplateCenterDetailData) => {
    window.sessionStorage.setItem("template-center-detail", JSON.stringify(nextTemplate));
    window.dispatchEvent(new Event("hashchange"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-1 w-full overflow-hidden">
      <main className="flex-1 overflow-y-auto bg-[#F5F7FA] custom-scrollbar">
        <SiteTemplateDetailPage
          template={{
            id: template.id,
            title: template.title,
            type: template.category,
            style: template.subCategory,
            scene: "全部",
          }}
          previewImage={template.image}
          qrPreview={
            <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="11" width="10" height="10" rx="1.5" fill="currentColor" />
              <rect x="73" y="5" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
              <rect x="79" y="11" width="10" height="10" rx="1.5" fill="currentColor" />
              <rect x="5" y="73" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="79" width="10" height="10" rx="1.5" fill="currentColor" />
              <rect x="42" y="42" width="16" height="16" rx="3" fill="#2563eb" />
              <text x="50" y="54" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">📱</text>
            </svg>
          }
          recommendations={recommendations.map((item) => ({ id: item.id }))}
          renderRecommendationCard={(item) => {
            const recommendation = recommendations.find((entry) => entry.id === item.id);
            if (!recommendation) return null;

            return (
              <TemplateCard
                key={recommendation.id}
                title={recommendation.title}
                image={recommendation.image}
                category={recommendation.category}
                subCategory={recommendation.subCategory}
                usageText={recommendation.views > 10000 ? `${(recommendation.views / 10000).toFixed(1)}w` : `${recommendation.views}`}
                onClick={() => openTemplateDetail(recommendation)}
                badgeText={recommendation.isHot ? "爆款" : undefined}
                badgeClassName="bg-red-500/90"
                isFavorite={favorites.has(recommendation.id)}
                onToggleFavorite={(e) => toggleFavorite(recommendation.id, e)}
              />
            );
          }}
          onBack={onBack}
          onPrimaryAction={() => {}}
          onSecondaryAction={() => {}}
          themeButtonClassName="bg-blue-600 hover:bg-blue-700"
          eyebrowSuffix="节日大促特荐"
          secondaryActionLabel="立即发布"
        />
      </main>
    </div>
  );
}
