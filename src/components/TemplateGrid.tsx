import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import type { TemplateCenterDetailData } from "./TemplateCenterDetail";
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

interface Template {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  views: number;
  color: string;
  price: string;
  isHot?: boolean;
}

const colors = [
  "from-pink-400 to-rose-400",
  "from-blue-400 to-cyan-400",
  "from-emerald-400 to-teal-400",
  "from-purple-400 to-indigo-400",
  "from-orange-400 to-amber-400",
  "from-indigo-400 to-blue-500",
];

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

export default function TemplateGrid({ category, limit, layout = 'grid' }: { category?: string, limit?: number, layout?: 'grid' | 'row' }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const mockTypes = [
    { main: "游戏", sub: ["闯关类", "抽奖类", "签到打卡", "小游戏", "大转盘"] },
    { main: "设计", sub: ["H5模板", "节日海报", "邀请函", "电子画册", "长图文"] },
    { main: "答题", sub: ["每日一答", "知识问答", "调查问卷", "趣味测试", "测评"] },
    { main: "营销", sub: ["微网站", "活动聚合", "模板主页", "微推", "裂变"] },
    { main: "搭建", sub: ["积分商城", "落地页", "微传单", "活动聚合页", "抽奖活动"] }
  ];

  const itemsCount = limit || (layout === 'row' ? 10 : 15);
  const categoryTemplates: Template[] = Array.from({ length: itemsCount }).map((_, i) => {
    const typeObj = mockTypes[i % mockTypes.length];
    return {
      id: `tpl-${category}-${i}`,
      title: `${category ? category.split(' - ')[0] : "精选"}主题 - 商用高质量模板 ${i + 1}`,
      category: typeObj.main,
      subCategory: typeObj.sub[i % typeObj.sub.length],
      views: Math.floor(Math.random() * 50000) + 1000,
      color: colors[i % colors.length],
      price: i % 3 === 0 ? "免费" : "¥ 19.9",
      isHot: i % 5 === 0,
    };
  });

  const getTemplateImage = (index: number) => TEMPLATE_IMAGE_POOL[index % TEMPLATE_IMAGE_POOL.length];

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 2);
      setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    if (layout === 'row') {
      handleScroll();
      window.addEventListener('resize', handleScroll);
      return () => window.removeEventListener('resize', handleScroll);
    }
  }, [layout]);

  const doScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  const openTemplateDetail = (template: TemplateCenterDetailData) => {
    window.sessionStorage.setItem("template-center-detail", JSON.stringify(template));
    window.sessionStorage.setItem("template-center-detail-origin", window.location.hash || "#");
    window.location.hash = "#template-detail";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderCard = (tpl: Template, index: number) => {
    const image = getTemplateImage(index);
    const detailPayload: TemplateCenterDetailData = {
      id: tpl.id,
      title: tpl.title,
      category: tpl.category,
      subCategory: tpl.subCategory,
      views: tpl.views,
      image,
      isHot: tpl.isHot,
    };

    return (
      <TemplateCard
        key={tpl.id}
        title={tpl.title}
        image={image}
        category={tpl.category}
        subCategory={tpl.subCategory}
        usageText={tpl.views > 10000 ? (tpl.views / 10000).toFixed(1) + "w" : `${tpl.views}`}
        onClick={() => openTemplateDetail(detailPayload)}
        badgeText={tpl.isHot ? "爆款" : undefined}
        badgeClassName="bg-red-500/90"
        isFavorite={favorites.has(tpl.id)}
        onToggleFavorite={(e) => toggleFavorite(e, tpl.id)}
        wrapperClassName={layout === 'row' ? "min-w-[170px] w-[170px] sm:min-w-[200px] sm:w-[200px] lg:min-w-[210px] lg:w-[210px] shrink-0 snap-start" : "w-full"}
        imageWrapperClassName={`bg-gradient-to-br ${tpl.color}`}
      />
    );
  };

  if (layout === 'row') {
    return (
      <div className="relative group/slider -mx-1 px-1">
        <button 
          onClick={() => doScroll('left')} 
          className={cn("absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white shadow-md rounded-full items-center justify-center z-30 transition-all text-slate-700 hover:scale-110", showLeft ? "flex opacity-0 group-hover/slider:opacity-100" : "hidden")}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div 
          ref={scrollRef} 
          onScroll={handleScroll} 
          className="flex overflow-x-auto gap-3 lg:gap-4 pb-4 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {categoryTemplates.map(renderCard)}
        </div>

        <button 
          onClick={() => doScroll('right')} 
          className={cn("absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white shadow-md rounded-full items-center justify-center z-30 transition-all text-slate-700 hover:scale-110", showRight ? "flex opacity-0 group-hover/slider:opacity-100" : "hidden")}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 min-[1800px]:grid-cols-8 gap-4 lg:gap-5 pt-2">
      {categoryTemplates.map(renderCard)}
    </div>
  );
}
