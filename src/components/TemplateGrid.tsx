import { Play, Eye, Heart, ScanLine, ChevronLeft, ChevronRight, Info } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";

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

  const renderCard = (tpl: Template) => (
    <div key={tpl.id} className={cn("group flex flex-col bg-white rounded-xl transition-all duration-300 hover:-translate-y-1", layout === 'row' ? "min-w-[170px] w-[170px] sm:min-w-[200px] sm:w-[200px] lg:min-w-[210px] lg:w-[210px] shrink-0 snap-start" : "w-full")}>
      <div className={`relative aspect-[3/5] w-full overflow-hidden rounded-xl bg-gradient-to-br ${tpl.color}`}>
        <div className="absolute inset-0 opacity-20"></div>
        
        {tpl.isHot && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-500/90 text-white text-[10px] font-bold rounded z-10 backdrop-blur-sm">
            爆款
          </div>
        )}

        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-30">
          {/* Info Button with Tooltip */}
          <div className="relative group/tip">
            <button className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all">
              <Info className="h-3.5 w-3.5" />
            </button>
            <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
              可商用，查看详情
              <div className="absolute -top-1 right-2.5 w-2 h-2 bg-slate-800 rotate-45 border-t border-l border-white/10"></div>
            </div>
          </div>

          {/* Heart Button with Tooltip */}
          <div className="relative group/tip">
            <button 
              onClick={(e) => toggleFavorite(e, tpl.id)}
              className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all"
            >
              <Heart className={cn("h-3.5 w-3.5 transition-colors", favorites.has(tpl.id) ? "fill-red-500 text-red-500" : "")} />
            </button>
            <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
              {favorites.has(tpl.id) ? "取消收藏" : "收藏模板"}
              <div className="absolute -top-1 right-2.5 w-2 h-2 bg-slate-800 rotate-45 border-t border-l border-white/10"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 z-10">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 shadow-lg text-sm transition-all duration-300">
            扫码预览 <ScanLine className="h-3.5 w-3.5" />
          </button>
          <button className="flex items-center justify-center w-full max-w-[120px] py-2 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 text-xs transition-all duration-300 delay-75 shadow-sm">
            立即使用
          </button>
        </div>
      </div>
      
      <div className="flex flex-col pt-3 pb-1 z-20 relative bg-transparent rounded-b-xl cursor-pointer gap-2">
        <h3 className="text-[14px] font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors" title={tpl.title}>
          {tpl.title}
        </h3>
        
        <div className="flex items-center justify-between text-[11.5px] text-slate-500">
          <div className="flex items-center gap-1 font-medium bg-slate-50 px-1.5 py-0.5 rounded text-slate-600">
            <span>{tpl.category}</span>
            <span className="text-slate-300 scale-75">•</span>
            <span>{tpl.subCategory}</span>
          </div>
          <span className="flex items-center gap-1 font-medium bg-slate-50 px-1.5 py-0.5 rounded text-slate-500">
            <Eye className="w-3.5 h-3.5" />
            {tpl.views > 10000 ? (tpl.views / 10000).toFixed(1) + "w" : tpl.views}
          </span>
        </div>
      </div>
    </div>
  );

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
