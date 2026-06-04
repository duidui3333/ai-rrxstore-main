/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronRight, HelpCircle, ChevronDown, Check, 
  Sparkles, Laptop, Briefcase, Landmark, History, 
  Box, Paintbrush, Circle, Palette, Filter
} from "lucide-react";
import Header from "./components/Header";
import StoreBanner from "./components/StoreBanner";
import DiscoveryWidgets from "./components/DiscoveryWidgets";
import TemplateGrid from "./components/TemplateGrid";
import PreferenceModal from "./components/PreferenceModal";
import FloatingNav from "./components/FloatingNav";
import Footer from "./components/Footer";
import GamifiedMarketingCenter from "./components/GamifiedMarketingCenter";
import AiQuizCenter from "./components/AiQuizCenter";
import AiVotingCenter from "./components/AiVotingCenter";
import AiMarketingCenter from "./components/AiMarketingCenter";
import { getThemePalette } from "./lib/themeUtils";
import { cn } from "./lib/utils";

const SCENARIO_TAGS = ["全部", "设计", "游戏", "答题", "营销", "搭建"];

const ACTIVE_NODE_MODULES = [
  { id: "may1", name: "五一劳动节", tags: SCENARIO_TAGS },
  { id: "exclusive", name: "专属推荐", tags: ["全部", "邀请函", "内容宣传", "游戏营销"] },
  { id: "may4", name: "五四青年节", tags: SCENARIO_TAGS },
  { id: "may12", name: "温情母亲节", tags: SCENARIO_TAGS },
  { id: "may20", name: "520浪漫表白日", tags: SCENARIO_TAGS },
  { id: "jun1", name: "六一儿童节狂欢", tags: SCENARIO_TAGS }
];

const ModuleSection: React.FC<{ 
  module: typeof ACTIVE_NODE_MODULES[0];
  onOpenSettings?: () => void;
}> = ({ module, onOpenSettings }) => {
  const [activeTag, setActiveTag] = useState(module.tags[0]);

  return (
    <section id={module.id} className="bg-white rounded-2xl p-5 lg:p-6 overflow-hidden transition-shadow duration-300 hover:shadow-lg scroll-mt-24">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full max-w-[calc(100%-80px)] xl:max-w-none">
          <div className="flex items-center gap-2 shrink-0 relative">
            <h2 className="text-xl font-bold text-slate-800">{module.name}</h2>
            {module.id === "exclusive" && (
              <div className="relative flex items-center group/tip ml-1.5 mt-0.5">
                <div className="flex items-center justify-center p-1 cursor-help text-slate-400 hover:text-slate-500 -ml-1">
                  <HelpCircle className="w-3.5 h-3.5 transition-colors" />
                </div>
                <div className="absolute left-full top-1/2 -translate-y-1/2 pt-4 pb-4 pl-1.5">
                  {/* bridge for preventing mouse leaving */}
                  <div className="absolute top-0 bottom-0 -left-2 w-4 z-0"></div>
                  <div className="bg-slate-800 text-white text-[12px] px-3 py-1.5 rounded bg-opacity-95 backdrop-blur-sm whitespace-nowrap opacity-0 group-hover/tip:opacity-100 pointer-events-none group-hover/tip:pointer-events-auto transition-all duration-200 z-10 flex items-center shadow-lg translate-x-1 group-hover/tip:translate-x-0 relative">
                    根据您的偏好设置推荐，
                    <button 
                      onClick={onOpenSettings}
                      className="text-blue-400 hover:text-blue-300 ml-0.5 underline underline-offset-2 font-medium focus:outline-none cursor-pointer active:scale-95 transition-transform"
                    >
                      设置
                    </button>
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 -z-10 rounded-[1px]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Scenario Tags */}
          <div className="flex items-center gap-2 overflow-x-auto sm:ml-2 w-full pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {module.tags.map((tag) => (
              <button 
                key={tag} 
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "text-[13px] px-4 py-1.5 rounded-lg transition-colors font-medium cursor-pointer whitespace-nowrap", 
                  activeTag === tag ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}>
                {tag}
              </button>
            ))}
          </div>
        </div>
        <button className="hidden sm:flex text-[14px] font-medium text-slate-500 hover:text-orange-500 transition-colors items-center gap-1 group cursor-pointer shrink-0 ml-4">
          查看更多 <span className="group-hover:translate-x-0.5 transition-transform"><ChevronRight className="w-4 h-4" /></span>
        </button>
      </div>
      <TemplateGrid category={`${module.name} - ${activeTag}`} limit={10} layout="row" />
    </section>
  );
}

const SORTS = ["综合推荐", "最多使用", "最新上架"];
const SCENES = ["推荐", "设计", "游戏", "答题", "搭建", "大屏", "画册"];
const STYLES = ["全部", "简约", "商务", "国潮", "复古", "3D", "手绘"];
const COLORS = [
  { id: "全部", hex: "transparent" },
  { id: "红", hex: "#EF4444" },
  { id: "蓝", hex: "#3B82F6" },
  { id: "绿", hex: "#10B981" },
  { id: "黄", hex: "#F59E0B" },
  { id: "紫", hex: "#8B5CF6" },
  { id: "黑", hex: "#000000" },
];

function StyleDropdown({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg text-[12px] font-bold text-slate-600 transition-colors cursor-pointer"
      >
        风格: <span className="text-slate-900">{value}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-28 bg-white border border-slate-100 rounded-xl shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {STYLES.map(s => (
            <button
              key={s}
              onClick={() => { onChange(s); setIsOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 text-[12px] transition-colors hover:bg-slate-50",
                value === s ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-600"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LatestTemplatesSection() {
  const [activeScene, setActiveScene] = useState(SCENES[0]);
  const [activeSort, setActiveSort] = useState(SORTS[0]);
  const [activeStyle, setActiveStyle] = useState(STYLES[0]);
  const [activeColor, setActiveColor] = useState(COLORS[0].id);

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 mb-10 shadow-sm border border-slate-100">
      {/* Row 1: Scenes as main navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {SCENES.map((scene) => (
                <button
                  key={scene}
                  onClick={() => setActiveScene(scene)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-xl text-[15px] font-bold transition-all cursor-pointer",
                    activeScene === scene 
                  ? "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
              >
                {scene}
              </button>
          ))}
        </div>
      </div>

      {/* Row 2: Sort and Filters - Compact */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 mb-4 bg-slate-50/30 rounded-xl px-4 border border-slate-50">
        <div className="flex items-center gap-6">
          {/* Sorting */}
          <div className="flex items-center gap-4">
            {SORTS.map((s) => (
              <button 
                key={s} 
                onClick={() => setActiveSort(s)}
                className={cn(
                  "text-[12px] transition-all cursor-pointer font-bold", 
                  activeSort === s ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          
          <div className="hidden sm:block w-px h-3 bg-slate-200"></div>

          {/* Style Dropdown */}
          <StyleDropdown value={activeStyle} onChange={setActiveStyle} />
        </div>

        {/* Colors (Simple dots) */}
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold text-slate-400">颜色:</span>
          <div className="flex items-center gap-1.5">
            {COLORS.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveColor(c.id)}
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center transition-all cursor-pointer ring-offset-2",
                  activeColor === c.id ? "ring-2 ring-slate-300 scale-110" : "hover:scale-110"
                )}
                title={c.id}
              >
                {c.hex === "transparent" ? (
                  <Palette className={cn("w-full h-full p-0.5 mt-0.5", activeColor === "全部" ? "text-slate-900" : "text-slate-300")} />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: c.hex }}></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <TemplateGrid category={activeScene === "推荐" ? "最新模板" : activeScene} limit={15} />
      
      <div className="mt-10 flex justify-center">
        <button className="flex items-center gap-2 px-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-[14px] font-bold transition-all group cursor-pointer border border-slate-100 shadow-sm hover:shadow-md">
          探索更多精彩模板
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || "#");
  const [activeTheme, setActiveTheme] = useState("精选推荐");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || "#");
      // Scroll main area to top if navigated back
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsScrolled(target.scrollTop > 300);
    };

    const mainElement = mainRef.current;
    const gamifiedElement = document.getElementById('gamified-scroll');
    const quizElement = document.getElementById('quiz-scroll-pane');
    const votingElement = document.getElementById('voting-scroll-pane'); // We assume it's created if we followed quiz exactly, but we can reuse it
    const marketingElement = document.getElementById('ai-marketing-scroll');
    
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (gamifiedElement) {
      gamifiedElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (quizElement) {
      quizElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (votingElement) {
      votingElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (marketingElement) {
      marketingElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (mainElement) mainElement.removeEventListener('scroll', handleScroll);
      if (gamifiedElement) gamifiedElement.removeEventListener('scroll', handleScroll);
      if (quizElement) quizElement.removeEventListener('scroll', handleScroll);
      if (votingElement) votingElement.removeEventListener('scroll', handleScroll);
      if (marketingElement) marketingElement.removeEventListener('scroll', handleScroll);
    };
  }, [currentRoute]); // Re-bind if route changes

  const handleScrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const gamifiedElement = document.getElementById('gamified-scroll');
    if (gamifiedElement) {
      gamifiedElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const quizElement = document.getElementById('quiz-scroll-pane');
    if (quizElement) {
      quizElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const votingElement = document.getElementById('voting-scroll-pane');
    if (votingElement) {
      votingElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const marketingElement = document.getElementById('ai-marketing-scroll');
    if (marketingElement) {
      marketingElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const palette = getThemePalette(activeTheme);
  const isGamified = currentRoute === "#gamified-marketing";
  const isQuiz = currentRoute === "#ai-quiz";
  const isVoting = currentRoute === "#ai-voting";
  const isMarketing = currentRoute === "#ai-marketing";

  return (
    <div className="h-screen bg-[#F5F7FA] font-sans flex flex-col overflow-hidden">
      <Header isScrolled={isScrolled} currentRoute={currentRoute} />
      
      {isGamified ? (
        <GamifiedMarketingCenter />
      ) : isQuiz ? (
        <AiQuizCenter />
      ) : isVoting ? (
        <AiVotingCenter />
      ) : isMarketing ? (
        <AiMarketingCenter />
      ) : (
        <div className="flex flex-1 w-full overflow-hidden">
          {/* Main scrollable area */}
          <main ref={mainRef} className="flex-1 px-4 lg:px-8 py-6 w-full custom-scrollbar relative overflow-y-auto overflow-x-hidden">
            <div className="w-full space-y-6">
              
              <StoreBanner palette={palette} />
              <DiscoveryWidgets />
              
              {/* The Core Marketplace Container */}
              <div className="flex flex-col gap-6 relative z-20">
                {/* 1. Theme Modules (One row each) */}
                {ACTIVE_NODE_MODULES.map((mod) => (
                  <ModuleSection 
                    key={mod.id} 
                    module={mod} 
                    onOpenSettings={() => setIsPreferenceModalOpen(true)} 
                  />
                ))}

                {/* 2. Latest Templates Module with Sorting */}
                <LatestTemplatesSection />
              </div>
            </div>
            
            <div className="mt-20">
              <Footer />
            </div>
          </main>
        </div>
      )}

      <PreferenceModal 
        isOpen={isPreferenceModalOpen} 
        onClose={() => setIsPreferenceModalOpen(false)} 
      />

      <FloatingNav 
        isScrolled={isScrolled} 
        onScrollToTop={handleScrollToTop} 
      />
    </div>
  );
}
