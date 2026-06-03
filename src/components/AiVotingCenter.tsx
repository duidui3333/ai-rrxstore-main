import React, { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { 
  Brain, BookOpen, Calendar as CalendarIcon, Clock, Trophy, Users, Video, Sparkles, 
  GraduationCap, FileText, Book, Award, Search, ArrowLeft, ArrowRight, 
  Play, Eye, Heart, Info, Flame, TrendingUp, Stars, Zap, Shield, 
  LayoutTemplate, Check, HelpCircle, X, RotateCcw, ScanLine, Share2, 
  Rocket, Layers, Code, Briefcase, MessagesSquare, Link, Smartphone, ChevronRight, Home, Compass
} from "lucide-react";

// Import modular sub-components and static configuration datasets
import { 
  CATEGORY_CONFIGS, VOTING_CATEGORIES, TEMPLATES_DATA, 
  HOT_SEARCHES, PLACEHOLDER_PHRASES, getTemplateImage, getTemplateStyle, matchSubPlaystyle
} from "./voting/votingData";
import { VotingAppSimulator } from "./voting/VotingAppSimulator";
import { VotingConfigPanel } from "./voting/VotingConfigPanel";

// Pre-existing image asset fallbacks
import imgFeatured from "../assets/images/cat_featured_1779523249218.png";
import imgElimination from "../assets/images/cat_elimination_1779523103546.png";
import imgShooting from "../assets/images/cat_shooting_1779523124555.png";
import imgPuzzle from "../assets/images/cat_puzzle_1779523142523.png";
import imgSynthesis from "../assets/images/cat_synthesis_1779523162184.png";
import imgStage from "../assets/images/cat_stage_1779523182209.png";
import imgReaction from "../assets/images/cat_reaction_1779523199030.png";
import imgCatching from "../assets/images/cat_catching_1779523213920.png";
import imgAction from "../assets/images/cat_action_1779523229602.png";
import imgTemplateCover1 from "../assets/images/marketing_template_cover_1_1779935600707.png";
import imgTemplateCover2 from "../assets/images/marketing_template_cover_2_1779935619140.png";
import imgTemplateCover3 from "../assets/images/marketing_template_cover_3_1779935640170.png";
import imgVotingEventBanner from "../assets/images/voting_photo_event_banner_1779938100505.png";
import imgAdvancementVotingBanner from "../assets/images/advancement_voting_banner_1779847888696.png";
import imgGroupVotingBanner from "../assets/images/voting_group_event_banner_1779938119840.png";

type RouteMode = "center" | string;

export default function AiVotingCenter() {
  // Sidebar routing navigation layout
  const [activeSidebar, setActiveSidebar] = useState<RouteMode>("center");
  const [activeSidebarName, setActiveSidebarName] = useState("首页");

  // Filter mechanisms states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("全部");
  const [selectedStyle, setSelectedStyle] = useState("全部");
  const [selectedScene, setSelectedScene] = useState("精选");
  const [selectedSort, setSelectedSort] = useState("综合排序");

  // Category specific path states filters 
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [selectedCategorySubFilter, setSelectedCategorySubFilter] = useState("全部");

  // Workbench Details routing template selector id state
  const [detailTemplateId, setDetailTemplateId] = useState<string | null>(null);
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);

  // Dialog overlay modal templates state pointer
  const [previewModalTemplateId, setPreviewModalTemplateId] = useState<string | null>(null);
  
  // Favorites local database key pool
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["q1", "q4", "q6"]));

  // Typewriter search placeholder text loop states
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Short screen tracking hooks for floaty helper layout
  const [isShortScreen, setIsShortScreen] = useState(false);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Theme configuration controls matching gameplay center styles
  const themeColor = "indigo"; 
  const themeBtn = "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200/50";
  const themeText = "text-indigo-600";
  const themeBorder = "border-indigo-500/10";
  const themeHoverText = "hover:text-indigo-600";
  const themeBgLight = "bg-indigo-50";

  // Check sidebar height overflow dynamically to apply float status
  const checkSidebarHeight = () => {
    if (sidebarScrollRef.current) {
      const { scrollHeight, clientHeight } = sidebarScrollRef.current;
      // If content height exceeds actual screen layout height, float service info
      setIsShortScreen(scrollHeight > clientHeight + 10);
    }
  };

  useEffect(() => {
    checkSidebarHeight();
    window.addEventListener("resize", checkSidebarHeight);
    return () => window.removeEventListener("resize", checkSidebarHeight);
  }, []);

  // Sync scroll detection for horizontal slider Categories
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const handleHorizontalScroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      const offset = dir === "left" ? -400 : 400;
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  // Search capsule typing looping simulator effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = PLACEHOLDER_PHRASES[phraseIdx];

    if (!isDeleting) {
      if (charIdx < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedPlaceholder(currentPhrase.substring(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        }, 120);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800); // stay 1.8s
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setTypedPlaceholder(currentPhrase.substring(0, charIdx - 1));
          setCharIdx((prev) => prev - 1);
        }, 60);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % PLACEHOLDER_PHRASES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  // Favorite toggle helper
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Select Sidebar categories
  const handleSidebarClick = (id: RouteMode, name: string) => {
    setActiveSidebar(id);
    setActiveSidebarName(name);
    setCategorySearchQuery("");
    setSelectedCategorySubFilter("全部");
    setDetailTemplateId(null); // return to lists
    setIsWorkspaceMode(false);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Open workbench details
  const handleSelectTemplateDetail = (id: string) => {
    setDetailTemplateId(id);
    setIsWorkspaceMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Title change sync callback from workbench config form back to state template
  const [renamedTitles, setRenamedTitles] = useState<Record<string, string>>({});
  const handleTemplateTitleChange = (id: string, newTitle: string) => {
    setRenamedTitles((prev) => ({ ...prev, [id]: newTitle }));
  };

  // Compute processed template models representation list for INDEX main homepage view
  const indexFilteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((item) => {
      // 1. Sidebar Category restriction check
      if (selectedType !== "全部" && item.type !== selectedType) return false;

      // 2. Style selector config check
      if (selectedStyle !== "全部" && item.style !== selectedStyle) return false;

      // 3. Scene feature tags check
      if (selectedScene !== "精选") {
        const t = (renamedTitles[item.id] || item.title).toLowerCase();
        if (selectedScene === "👶萌娃大赛" && !t.includes("萌娃") && !t.includes("宝宝")) return false;
        if (selectedScene === "🏆年度评选" && !t.includes("年度") && !t.includes("百强") && !t.includes("力量")) return false;
        if (selectedScene === "摄影大赛" && !t.includes("摄影") && !t.includes("风光") && !t.includes("照片")) return false;
        if (selectedScene === "才艺评选" && !t.includes("才艺") && !t.includes("歌手") && !t.includes("声音")) return false;
        if (selectedScene === "萌宠评选" && !t.includes("萌宠") && !t.includes("宠物")) return false;
        if (selectedScene === "员工评选" && !t.includes("员工") && !t.includes("优秀")) return false;
        if (selectedScene === "人物评选" && !t.includes("人物") && !t.includes("榜样")) return false;
        if (selectedScene === "活动评选" && !t.includes("活动") && !t.includes("比赛")) return false;
        if (selectedScene === "作品评选" && !t.includes("作品") && !t.includes("设计") && !t.includes("创新")) return false;
        if (selectedScene === "晋级投票" && !t.includes("晋级") && !t.includes("排位") && !t.includes("海选")) return false;
        if (selectedScene === "节日评选" && !t.includes("节日") && !t.includes("晚会")) return false;
        if (selectedScene === "视频投票" && !t.includes("视频") && !t.includes("短片") && !t.includes("电影")) return false;
        if (selectedScene === "语音投票" && !t.includes("语音") && !t.includes("声音") && !t.includes("音乐")) return false;
      }

      // 4. Input search wildcard query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchTag = item.tagText?.toLowerCase().includes(query);
        const matchCat = item.type.toLowerCase().includes(query);
        if (!matchTitle && !matchTag && !matchCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === "模板热度") return b.hot - a.hot;
      if (selectedSort === "上架时间") return b.time.localeCompare(a.time);
      return 0; // default comprehensive order
    });
  }, [selectedType, selectedStyle, selectedScene, searchQuery, selectedSort]);

  // Compute processed template models for CATEGORY SPECIFIC view routing (e.g., "PK投票")
  const categoryFiltered = useMemo(() => {
    if (activeSidebar === "center") return [];
    return TEMPLATES_DATA.filter((item) => {
      // Must equal active category
      if (item.type !== activeSidebar) return false;

      // Filter subplaystyle
      if (selectedCategorySubFilter !== "全部" && !matchSubPlaystyle(item, selectedCategorySubFilter)) return false;

      // Query search
      if (categorySearchQuery.trim()) {
        const q = categorySearchQuery.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.tagText?.toLowerCase().includes(q);
      }

      return true;
    });
  }, [activeSidebar, selectedCategorySubFilter, categorySearchQuery]);

  // Active blueprint metadata pointer for scanning modal & editor mockup
  const previewTemplate = useMemo(() => {
    const activeId = previewModalTemplateId || detailTemplateId || "q1";
    const found = TEMPLATES_DATA.find((item) => item.id === activeId);
    if (!found) return null;
    return {
      ...found,
      title: renamedTitles[found.id] || found.title
    };
  }, [previewModalTemplateId, detailTemplateId, renamedTitles]);

  return (
    <div id="quiz-center-scope" className="flex h-screen w-full bg-[#FAFBFD] overflow-hidden select-text text-slate-800 font-sans">
      
      {/* ================== LEFT NAVIGATION BAR (STYLIZED ORPIN BLUEPRINT RECT) ================== */}
      <aside 
        className="w-[190px] border-r border-slate-100 bg-white flex flex-col justify-between shrink-0 h-full relative"
      >
        <div 
          ref={sidebarScrollRef}
          onScroll={checkSidebarHeight}
          className={cn(
            "flex-1 overflow-y-auto no-scrollbar pt-6 text-left",
            isShortScreen ? "pb-48" : "pb-6"
          )}
        >
          {/* Core Categories list */}
          <div className="px-2 space-y-1">

            {/* Main Center Router Home option */}
            <button
              onClick={() => handleSidebarClick("center", "首页")}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl font-extrabold text-[12.5px] tracking-wide transition-all duration-200 cursor-pointer text-left relative overflow-hidden group/opt",
                activeSidebar === "center" && !detailTemplateId
                  ? "bg-indigo-50 text-indigo-700 shadow-3xs" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-2">
                <Home className={cn("w-4 h-4 shrink-0 transition-transform", activeSidebar === "center" && !detailTemplateId ? "text-indigo-600 scale-105" : "text-slate-400 group-hover/opt:text-slate-600")} />
                <span>首页</span>
              </div>
            </button>

            {/* Loop categories lists */}
            {VOTING_CATEGORIES.slice(1).map((cat) => {
              const matches = activeSidebar === cat.id && !detailTemplateId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSidebarClick(cat.id, cat.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl font-extrabold text-[12.5px] tracking-wide transition-all duration-200 cursor-pointer text-left relative overflow-hidden group/opt",
                    matches 
                      ? "bg-indigo-50 text-indigo-700 shadow-3xs" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <cat.icon className={cn("w-4 h-4 shrink-0", matches ? "text-indigo-600 scale-105" : "text-slate-400 group-hover/opt:text-slate-600")} />
                    <span>{cat.name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Premium Promotion Banners directly under 动作类 (一行一个) - synced with playability center */}
          <div className="px-2 mt-4 space-y-1.5 text-left shrink-0">
            {/* Banner 1: 微信小程序对接 with WeChat Green Style and WeChat bubble icon */}
            <div 
              onClick={() => alert("微信小程序对接：支持一键将微端和游戏发布为独立微信小程序，多级缓存秒级响应。如需具体对接技术文档，请点击下方「定制服务」联系技术支持人员。")}
              className="group/banner relative p-3 rounded-xl bg-gradient-to-br from-[#EEFDF4] to-[#E2F9EC] border border-[#10B981]/25 shadow-xs flex items-center justify-between gap-1.5 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[11.5px] font-black text-[#047857] block truncate">微信小程序对接</span>
                <span className="text-[9px] text-[#10B981]/80 font-semibold block mt-0.5">无需开发 极速嵌接</span>
              </div>
              <div className="w-7 h-7 bg-[#EAFBF3] rounded-lg flex items-center justify-center border border-[#D1F7E4] shadow-xs shrink-0 select-none transition-transform group-hover/banner:rotate-6">
                <MessagesSquare className="w-4 h-4 fill-[#07C160] text-white" />
              </div>
            </div>

            {/* Banner 2: APP集成 */}
            <div 
              onClick={() => alert("APP集成方案：全面支持 iOS/Android Native App 集成、Flutter/React Native 混合架构。轻量级 SDK 方案可使研发在 3 小时内实现首款游戏落地接入。")}
              className="group/banner relative p-3 rounded-xl bg-gradient-to-br from-[#EDF5FF] to-[#E0E7FF] border border-[#C7D2FE]/40 shadow-xs flex items-center justify-between gap-1.5 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[11.5px] font-black text-[#1E40AF] block truncate">APP 集成安全方案</span>
                <span className="text-[9px] text-[#2563EB]/75 font-semibold block mt-0.5">iOS & Android 无缝嵌入</span>
              </div>
              <div className="w-7 h-7 bg-white/80 rounded-lg flex items-center justify-center border border-[#C7D2FE]/30 shadow-xs shrink-0 select-none text-[14px] leading-none group-hover/banner:rotate-6 transition-transform">
                📱
              </div>
            </div>

            {/* Banner 3: 活动接口打通 */}
            <div 
              onClick={() => alert("活动接口打通：可接入现有 CRM 以及会员积分体系，完美实现游戏金币、成长值、优惠券等道具资产与核心用户库的实时结算流。")}
              className="group/banner relative p-3 rounded-xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border border-[#A7F3D0]/40 shadow-xs flex items-center justify-between gap-1.5 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              <div className="flex-1 min-w-0">
                <span className="text-[11.5px] font-black text-[#065F46] block truncate">活动接口打通</span>
                <span className="text-[9px] text-[#059669]/75 font-semibold block mt-0.5">资产互通 数据同步</span>
              </div>
              <div className="w-7 h-7 bg-white/80 rounded-lg flex items-center justify-center border border-[#A7F3D0]/30 shadow-xs shrink-0 select-none text-[14px] leading-none group-hover/banner:rotate-6 transition-transform">
                ⚙️
              </div>
            </div>
          </div>

          {/* Normal inline Help Links when sidebar doesn't trigger isShortScreen */}
          {!isShortScreen && (
            <div className="px-2 pt-4 pb-16 space-y-1 mt-2 border-t border-slate-50">
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 select-none">
                服务与支持
              </span>
              <button 
                onClick={() => alert("人人秀帮助中心：为您提供全方位的技术指导、方案部署细节、以及模版编辑疑问。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                帮助中心
              </button>
              <button 
                onClick={() => alert("客户案例看板：查阅大型跨国零售商、大促电商、本地生活等各板块优秀落地游玩转化案例。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                客户案例
              </button>
              <button 
                onClick={() => alert("开放平台开发者门户：可提供统一的 OAuth2 会员鉴权、游戏引擎调用接口 API 和安全回调机制。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <Code className="w-4 h-4 text-slate-400" />
                开放平台
              </button>
              <button 
                onClick={() => alert("定制服务专家：支持提供专属前端大促节日IP设计、深层底层架构迁移等高级服务，我们将安排专门资深顾问联系您。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <Briefcase className="w-4 h-4 text-slate-400" />
                定制服务
              </button>
            </div>
          )}
        </div>

        {/* Floating/Absolute Service and Support only when screen height is small/short */}
        {isShortScreen && (
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md pt-2 pb-3 px-2 border-t border-slate-100 shadow-[0_-8px_20px_rgba(0,0,0,0.03)] z-25 space-y-1 text-left">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 select-none">
              服务与支持
            </div>
            <button 
              onClick={() => alert("人人秀帮助中心：为您提供全方位的技术指导、方案部署细节、以及模版编辑疑问。")}
              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              帮助中心
            </button>
            <button 
              onClick={() => alert("客户案例看板：查阅大型跨国零售商、大促电商、本地生活等各板块优秀落地游玩转化案例。")}
              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              客户案例
            </button>
            <button 
              onClick={() => alert("开放平台开发者门户：可提供统一 of OAuth2 会员鉴权、游戏引擎调用接口 API 和安全回调机制。")}
              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
            >
              <Code className="w-4 h-4 text-slate-400" />
              开放平台
            </button>
            <button 
              onClick={() => alert("定制服务专家：支持提供专属前端大促节日IP设计、深层底层架构迁移等高级服务，我们将安排专门资深顾问联系您。")}
              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
            >
              <Briefcase className="w-4 h-4 text-slate-400" />
              定制服务
            </button>
          </div>
        )}
      </aside>

      {/* ================== RIGHT CONTENT SCROLLABLE WRAPPER (WORKBENCH OR LIST VIEW) ================== */}
      <div 
        id="voting-scroll-pane"
        className="flex-1 overflow-y-auto bg-[#FAFBFD] flex flex-col h-full"
      >
        {detailTemplateId && previewTemplate ? (
          /* ==========================================================
             CASE A: UNIFIED DETAILS AND INTERACTIVE WORKBENCH VIEW (USER REQUEST 7 & 8)
             ========================================================== */
          isWorkspaceMode ? (
            /* --- WORKSPACE EDITING MODE --- */
            <div className="flex-grow flex flex-col h-full overflow-hidden text-left animate-in fade-in duration-300">
              {/* Top Workspace controls and breadcrumbs */}
              <header className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsWorkspaceMode(false)}
                    className="w-8.5 h-8.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-350 flex items-center justify-center text-slate-500 cursor-pointer hover:translate-x-[-1px] transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold leading-none mb-1">
                      <button onClick={() => setDetailTemplateId(null)} className="hover:text-indigo-600 transition-colors cursor-pointer">投票中心</button>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      <button onClick={() => setIsWorkspaceMode(false)} className="hover:text-indigo-600 transition-colors cursor-pointer">模版详情</button>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      <span>工作台配置中心</span>
                    </div>
                    <h2 className="text-[15.5px] font-black text-slate-800 tracking-tight leading-none">
                      当前模版工作区：{(renamedTitles[previewTemplate.id] || previewTemplate.title)}
                    </h2>
                  </div>
                </div>

                {/* Action operations pill */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const link = `https://ais-share-j4uzupg2.run.app/quiz/${previewTemplate.id}`;
                      navigator.clipboard.writeText(link);
                      alert(`演示及核销二维码已复制成功！\n${link}`);
                    }}
                    className="px-3.5 py-1.8 h-9.5 rounded-xl border border-slate-250 hover:border-slate-350 hover:bg-slate-50 text-slate-600 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    活动宣传复制
                  </button>
                  <button 
                    onClick={() => alert(`【${renamedTitles[previewTemplate.id] || previewTemplate.title}】投票营销活动已在当前测试环境中一键编译并上线！`)}
                    className={cn("px-4.5 py-1.8 h-9.5 rounded-xl text-white text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer", themeBtn)}
                  >
                    <Rocket className="w-4 h-4 animate-bounce" />
                    立即编译上线
                  </button>
                </div>
              </header>

              {/* Split Screen Workbench body */}
              <main className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-5 p-5">
                
                {/* Left Column: Simulated playable mobile game simulator */}
                <section className="w-full lg:w-[320px] bg-slate-900 border border-slate-950 rounded-3xl p-6 flex flex-col justify-between shrink-0 h-full relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none" />
                  
                  <div className="space-y-1 mb-3 text-center">
                    <span className="text-[9.5px] font-black tracking-widest text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/25 px-2.5 py-1 rounded-md inline-block uppercase animate-pulse">
                      ● SIMULATING LIVE ENVIRONMENT
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold">试玩区域可实时反馈右侧面板修改</p>
                  </div>

                  {/* Sub simulated mobile device app */}
                  <VotingAppSimulator 
                    templateId={previewTemplate.id}
                    title={renamedTitles[previewTemplate.id] || previewTemplate.title}
                    colorBg={previewTemplate.colorBg}
                    themeBtn={themeBtn}
                  />

                  <div className="text-center text-slate-550 text-[9.5px] select-none font-bold mt-3">
                    * 真实发布支持在微端、微信小程序及外部APP中一见嵌入
                  </div>
                </section>

                {/* Right Column: Multi-tab editor configuration panel */}
                <section className="flex-1 h-full min-w-0">
                  <VotingConfigPanel 
                    templateId={previewTemplate.id}
                    initialTitle={renamedTitles[previewTemplate.id] || previewTemplate.title}
                    onTitleChange={(title) => handleTemplateTitleChange(previewTemplate.id, title)}
                    themeBtn={themeBtn}
                  />
                </section>

              </main>
            </div>
          ) : (
            /* --- TEMPLATE DETAILS VIEW (IDENTICAL IN STRUCTURE & LAYOUT TO GAMIFIED MARKETING CENTER) --- */
            <div className="max-w-[1440px] w-full mx-auto animate-in fade-in duration-300 text-left bg-[#FAFBFD]">
              
              {/* Top Sticky Navigation Bar / Breadcrumbs - Styled without background or right buttons */}
              <div className="sticky top-0 z-30 pt-6 md:pt-8 pb-4 px-6 md:px-8 flex items-center select-none bg-[#FAFBFD]">
                <div className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                  <button 
                    onClick={() => setDetailTemplateId(null)} 
                    className="hover:text-indigo-650 transition-colors cursor-pointer font-extrabold flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> 返回首页
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-slate-905 font-black">{previewTemplate.type}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-slate-500 font-medium truncate max-w-[150px] sm:max-w-xs" title={previewTemplate.title}>{previewTemplate.title}</span>
                </div>
              </div>

              {/* Main Content Pane with spacing */}
              <div className="px-6 md:px-8 pb-12">
                {/* Split Columns Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Fixed/Sticky Phone Mockup containing the active quiz screen */}
                  <div className="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
                    <div className="relative flex flex-col items-center">
                    <div className="relative w-[min(340px,44vh)] h-[min(660px,85vh)] rounded-[36px] border-[10px] border-slate-900 bg-slate-950 shadow-2xl flex flex-col overflow-hidden select-none ring-4 ring-slate-100/80">
                      {/* Screen notch / Dynamic Island */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[68px] h-3 bg-slate-900 border border-slate-805 rounded-full z-50 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-slate-800" />
                      </div>
                      
                      {/* Top Status Indicators */}
                      <div className="absolute top-0.5 inset-x-0 h-4 bg-transparent z-40 flex items-center justify-between px-5 text-white/90 text-[8.5px] font-mono select-none">
                        <span>08:53</span>
                        <div className="flex items-center gap-1">
                          <span>● WI-FI</span>
                          <span className="text-emerald-400">100%</span>
                        </div>
                      </div>

                      {/* Simulated Mobile screen content */}
                      <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col justify-between pt-4">
                        <div className="flex-grow flex flex-col justify-center items-center scale-95 origin-center">
                          <VotingAppSimulator 
                            templateId={previewTemplate.id}
                            title={renamedTitles[previewTemplate.id] || previewTemplate.title}
                            colorBg={previewTemplate.colorBg}
                            themeBtn={themeBtn}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sidebar floating icons dock (absolute on desktop, horizontal below phone on mobile) */}
                    <div className="xl:absolute xl:top-8 xl:-right-14 xl:left-auto flex xl:flex-col flex-row gap-3 mt-4 xl:mt-0 z-45">
                      {/* Favorite Button */}
                      <button 
                        onClick={() => toggleFavorite(previewTemplate.id!)}
                        className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center w-11 h-11"
                        title={favorites.has(previewTemplate.id!) ? "取消收藏" : "收藏模板"}
                      >
                        <Heart className={cn("w-5 h-5 transition-colors", favorites.has(previewTemplate.id!) ? "fill-red-500 text-red-500 border-transparent animate-pulse" : "text-slate-650")} />
                      </button>

                      {/* Share Button with Hover QR code popup */}
                      <div className="relative group/share font-sans">
                        <button 
                          className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 bg-white text-slate-650 transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center w-11 h-11"
                          title="查看/分享二维码"
                        >
                          <Share2 className="w-5 h-5 text-slate-600" />
                        </button>
                        
                        {/* Hover QR Card */}
                        <div className="absolute right-0 xl:right-auto xl:left-1/2 xl:-translate-x-1/2 top-full mt-2 w-[200px] p-4 bg-white border border-slate-200 rounded-2xl shadow-xl z-55 pointer-events-none opacity-0 group-hover/share:opacity-100 group-hover/share:pointer-events-auto transition-all duration-300 transform scale-95 group-hover/share:scale-100 origin-top flex flex-col items-center gap-2 bg-white/98 backdrop-blur-md">
                          <span className="text-[11px] font-black text-slate-700 flex items-center gap-1 leading-none whitespace-nowrap">
                            <ScanLine className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                            微信扫码真机试玩
                          </span>
                          
                          {/* Beautiful SVG QR code block */}
                          <div className="w-28 h-28 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-1.5 relative group/qr shadow-xs">
                            <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="5" y="5" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
                              <rect x="11" y="11" width="10" height="10" rx="1.5" fill="currentColor" />
                              
                              <rect x="73" y="5" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
                              <rect x="79" y="11" width="10" height="10" rx="1.5" fill="currentColor" />

                              <rect x="5" y="73" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
                              <rect x="11" y="79" width="10" height="10" rx="1.5" fill="currentColor" />

                              <rect x="42" y="42" width="16" height="16" rx="3" fill="#4f46e5" />
                              <text x="50" y="54" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">💡</text>

                              <rect x="35" y="10" width="6" height="6" fill="currentColor" />
                              <rect x="45" y="15" width="4" height="4" fill="currentColor" />
                              <rect x="55" y="8" width="8" height="6" fill="currentColor" />
                              <rect x="10" y="35" width="6" height="6" fill="currentColor" />
                              <rect x="18" y="45" width="4" height="4" fill="currentColor" />
                              <rect x="8" y="55" width="8" height="6" fill="currentColor" />

                              <rect x="80" y="35" width="6" height="6" fill="currentColor" />
                              <rect x="72" y="48" width="4" height="4" fill="currentColor" />
                              <rect x="85" y="58" width="8" height="6" fill="currentColor" />

                              <rect x="35" y="80" width="8" height="6" fill="currentColor" />
                              <rect x="48" y="75" width="4" height="4" fill="currentColor" />
                              <rect x="58" y="82" width="6" height="6" fill="currentColor" />

                              <rect x="32" y="30" width="4" height="4" fill="currentColor" />
                              <rect x="64" y="32" width="6" height="6" fill="currentColor" />
                              <rect x="30" y="64" width="4" height="4" fill="currentColor" />
                              <rect x="66" y="66" width="6" height="6" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Template details & Similar Recommended grids */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                  
                  {/* 1. Core Header and Description Card with Tags and actions */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden group text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-full pointer-events-none" />
                    
                    <div className="flex items-start justify-between flex-wrap gap-4 z-10">
                      <div className="flex items-center">
                        <div>
                          <span className="text-[10px] uppercase font-black tracking-widest text-[#1C68F5] bg-[#EDF5FF] border border-[#E3EFFF] px-2.5 py-1 rounded-md leading-none">
                            {previewTemplate.type} • 精选智能投票
                          </span>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2.5 leading-none">
                            {previewTemplate.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-500 text-[13.5px] leading-relaxed font-semibold mt-4 z-10 text-left">
                      支持通过 AI 智能生成候选内容，生成个性化同款投票营销活动，或直接使用此模板快速设置并发布活动。内置高度适配当前题材的专业展示框架及防刷票逻辑。支持配置阶梯式投票奖励池、一键OAuth会员鉴权和精准倒计时控速。让您的公众号大促活动、企业文化评选、或本地引流实现指数级爆发。
                    </p>

                    {/* Tags list (max 3 tags) */}
                    <div className="flex flex-wrap gap-2 mt-4 z-10">
                      {[
                        previewTemplate.type,
                        `${previewTemplate.style}风格`,
                        previewTemplate.scene !== "全部" ? previewTemplate.scene : "通用节日"
                      ].filter(Boolean).slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[11px] font-bold px-2.5 py-1.5 bg-slate-100 text-slate-650 rounded-xl hover:bg-slate-200/60 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons directly below tags */}
                    <div className="mt-16 flex gap-4 flex-wrap z-10">
                      <button 
                        onClick={() => setIsWorkspaceMode(true)}
                        className={cn("px-8 py-4 text-white text-[13.5px] font-black rounded-xl transition-all duration-300 shadow-bold active:scale-95 flex items-center gap-2.5 cursor-pointer hover:shadow-lg", themeBtn)}
                      >
                        <Sparkles className="w-5 h-5 fill-white" />
                        AI 做同款
                      </button>
                      
                      <button 
                        onClick={() => alert(`恭喜，【${previewTemplate.title}】一端发布成功！投票海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`)}
                        className="px-8 py-4 text-white bg-slate-900 hover:bg-slate-800 font-extrabold rounded-xl text-[13.5px] transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg"
                      >
                        <Rocket className="w-5 h-5 text-emerald-400" />
                        立即发布
                      </button>
                    </div>
                  </div>

                  {/* 2. Similar templates ("为您推荐相似投票模版") */}
                  <div className="space-y-4 pt-6 text-left">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 select-none">
                      <Flame className="w-4 h-4 text-rose-500 fill-rose-500/10" />
                      相似爆款模板推荐
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                      {TEMPLATES_DATA.filter(t => t.id !== previewTemplate.id).slice(0, 3).map((item) => {
                        const isLiked = favorites.has(item.id);
                        const isHot = item.percentage >= 95;
                        const tags = [
                          item.type,
                          `${item.style}风`,
                          item.tagText.split(" ")[0] || item.scene
                        ].filter(Boolean).slice(0, 3);

                        return (
                          <div 
                            key={item.id} 
                            onClick={() => handleSelectTemplateDetail(item.id)}
                            className="group flex flex-col bg-white rounded-xl transition-all duration-300 hover:-translate-y-1 w-full cursor-pointer text-left shadow-2xs"
                          >
                            {/* Card Cover */}
                            <div 
                              className={cn("relative aspect-[3/5] w-full overflow-hidden rounded-xl bg-gradient-to-br cursor-pointer border border-slate-100", item.colorBg)}
                            >
                              <div className="absolute inset-0 bg-[#ffffff0c] pointer-events-none mix-blend-overlay"></div>
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-20 pointer-events-none"></div>

                              <div className="absolute top-2 right-2 flex items-center gap-1.5 z-30">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                                  className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all cursor-pointer"
                                >
                                  <Heart className={cn("h-3.5 w-3.5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "")} />
                                </button>
                              </div>

                              {/* Hover triggers matching other cards */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 z-20">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setPreviewModalTemplateId(item.id); }}
                                  className="flex items-center justify-center gap-1.5 w-[110px] py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 shadow-lg text-xs transition-all duration-300 cursor-pointer"
                                >
                                  扫码预览 <ScanLine className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleSelectTemplateDetail(item.id); }}
                                  className="flex items-center justify-center gap-1.5 w-[110px] py-2 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 text-xs transition-all duration-300 delay-75 shadow-sm cursor-pointer"
                                >
                                  查看详情
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-col pt-3 pb-1 gap-1.5 text-left bg-transparent rounded-b-xl">
                              <h3 className="text-[14px] font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={item.title}>
                                {(renamedTitles[item.id] || item.title)}
                              </h3>
                              
                              <div className="flex flex-wrap items-center gap-1">
                                {tags.map((tag, idx) => (
                                  <span 
                                    key={idx} 
                                    className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
          )
        ) : (
          /* ==========================================================
             CASE B: SYSTEM PORTAL MARKETPLACE (CENTER ROUTE VIEW)
             ========================================================== */
          <div className="flex-grow p-4 lg:p-6 space-y-6 max-w-7xl mx-auto w-full pb-20">
            
            {activeSidebar === "center" ? (
              /* CASE B1: MAIN QUIZ PORTAL CENTER HOME */
              <div className="space-y-6 text-left">
                
                {/* 3-scene header banners and consolidated search block grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch shrink-0">
                  {/* Left Side: 3 Quiz Scene Banners */}
                  <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* Banner 1: 投票活动 */}
                    <div 
                      onClick={() => {
                        setSelectedScene("节日评选");
                      }}
                      className="group relative h-[146px] rounded-3xl overflow-hidden shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer text-left border border-rose-100/60 bg-gradient-to-br from-rose-50/90 to-orange-50/60"
                    >
                      {/* Right-side image */}
                      <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
                         {/* Fade overlay blending left side to the background color */}
                         <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-rose-50/90 to-transparent z-10" />
                         <img 
                           src={imgVotingEventBanner} 
                           alt="投票活动" 
                           referrerPolicy="no-referrer"
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                      </div>

                      {/* Content */}
                      <div className="relative z-20 p-4.5 pt-4 h-full flex flex-col">
                         <div className="flex items-center self-start bg-gradient-to-r from-orange-400 to-rose-400 text-white px-2 py-[2px] rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm text-[10px] font-black tracking-wide mb-1 shadow-sm">
                           萌娃萌宠照片秀
                         </div>
                         
                         <h4 className="font-extrabold text-[20px] text-slate-800 tracking-tight leading-none mb-3">
                           照片投票
                         </h4>

                         <ul className="space-y-1.5 mt-auto">
                           <li className="flex items-center text-[10.5px] font-bold text-rose-700/90">
                             <span className="w-1 h-1 rounded-full bg-rose-500 mr-1.5 shrink-0" />
                             <span className="line-clamp-1">最美照片上传投票</span>
                           </li>
                           <li className="flex items-center text-[10.5px] font-bold text-rose-700/90">
                             <span className="w-1 h-1 rounded-full bg-rose-500 mr-1.5 shrink-0" />
                             <span className="line-clamp-1">照片墙面与多图竞合</span>
                           </li>
                         </ul>
                      </div>
                    </div>

                    {/* Banner 2: 晋级投票 */}
                    <div 
                      onClick={() => {
                        setSelectedScene("晋级投票");
                      }}
                      className="group relative h-[146px] rounded-3xl overflow-hidden shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer text-left border border-indigo-100/60 bg-gradient-to-br from-indigo-50/90 to-purple-50/60"
                    >
                      {/* Right-side image */}
                      <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
                         {/* Fade overlay blending left side to the background color */}
                         <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-indigo-50/90 to-transparent z-10" />
                         <img 
                           src={imgAdvancementVotingBanner} 
                           alt="晋级投票" 
                           referrerPolicy="no-referrer"
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                      </div>

                      {/* Content */}
                      <div className="relative z-20 p-4.5 pt-4 h-full flex flex-col">
                         <div className="flex items-center self-start bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-[2px] rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm text-[10px] font-black tracking-wide mb-1 shadow-sm">
                           新版机制
                         </div>
                         
                         <h4 className="font-extrabold text-[20px] text-slate-800 tracking-tight leading-none mb-3">
                           晋级投票
                         </h4>

                         <ul className="space-y-1.5 mt-auto">
                           <li className="flex items-center text-[10.5px] font-bold text-indigo-700/90">
                             <span className="w-1 h-1 rounded-full bg-indigo-500 mr-1.5 shrink-0" />
                             <span className="line-clamp-1">多赛程淘汰机制展现</span>
                           </li>
                           <li className="flex items-center text-[10.5px] font-bold text-indigo-700/90">
                             <span className="w-1 h-1 rounded-full bg-indigo-500 mr-1.5 shrink-0" />
                             <span className="line-clamp-1">专属晋级证书激励</span>
                           </li>
                         </ul>
                      </div>
                    </div>

                    {/* Banner 3: 分组投票 */}
                    <div 
                      onClick={() => {
                        setSelectedScene("全部");
                        setSelectedType("全部");
                        setSearchQuery("分组");
                      }}
                      className="group relative h-[146px] rounded-3xl overflow-hidden shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer text-left border border-teal-100/60 bg-gradient-to-br from-teal-50/90 to-emerald-50/60"
                    >
                      {/* Right-side image */}
                      <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
                         {/* Fade overlay blending left side to the background color */}
                         <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-teal-50/90 to-transparent z-10" />
                         <img 
                           src={imgGroupVotingBanner} 
                           alt="分组投票" 
                           referrerPolicy="no-referrer"
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                      </div>

                      {/* Content */}
                      <div className="relative z-20 p-4.5 pt-4 h-full flex flex-col">
                         <div className="flex items-center self-start bg-gradient-to-r from-teal-400 to-emerald-500 text-white px-2 py-[2px] rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm text-[10px] font-black tracking-wide mb-1 shadow-sm">
                           少儿组 / 青年组
                         </div>
                         
                         <h4 className="font-extrabold text-[20px] text-slate-800 tracking-tight leading-none mb-3">
                           分组赛道投票
                         </h4>

                         <ul className="space-y-1.5 mt-auto">
                           <li className="flex items-center text-[10.5px] font-bold text-teal-700/90">
                             <span className="w-1 h-1 rounded-full bg-teal-500 mr-1.5 shrink-0" />
                             <span className="line-clamp-1">少儿组、青年租多组别切换</span>
                           </li>
                           <li className="flex items-center text-[10.5px] font-bold text-teal-700/90">
                             <span className="w-1 h-1 rounded-full bg-teal-500 mr-1.5 shrink-0" />
                             <span className="line-clamp-1">分赛道精细化投票统计</span>
                           </li>
                         </ul>
                      </div>
                    </div>

                  </div>

                  {/* Right Side: Consolidated search box block (Naked/Border-free outer frame with exquisite quiz decorations) */}
                  <div className="xl:col-span-4 flex flex-col justify-center text-left relative group py-2 min-h-[160px]">
                    {/* Exquisite custom quiz decoration outline frame with correct Tailwind classes */}
                    <div className="relative w-full z-10">
                      {/* Scene Quiz Ornaments (输入框场景投票装饰) - Positioned to blend nicely with the input top-right border */}
                      <div className="absolute -top-3 right-6 pointer-events-none select-none z-20 flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-[9.5px] px-2.5 py-0.8 rounded-lg shadow-sm rotate-2 group-hover:rotate-0 transition-all duration-300">
                        <span>智能AI配置 💡</span>
                      </div>

                      <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder={isInputFocused ? "搜索更多投票场景" : (typedPlaceholder || "点击此处在各大模板库中精选...")}
                        className="w-full bg-white hover:bg-slate-50/50 border-2 border-indigo-100 focus:border-indigo-600 focus:bg-white rounded-3xl pl-12.5 pr-15 py-5.5 text-[13.5px] font-black tracking-tight shadow-md shadow-indigo-100/40 hover:shadow-lg hover:shadow-indigo-100/50 outline-hidden transition-all placeholder:text-slate-400 placeholder:font-bold"
                      />
                      {searchQuery ? (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 px-3 py-1.2 rounded-xl bg-indigo-50 text-[10.5px] font-black text-indigo-600 pointer-events-none tracking-wider shadow-2xs">
                          搜索
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Filter and Marketplace grid (User Request 8) */}
                <div className="space-y-4 pt-3.5 text-left relative">
                  {/* Anchor marker search capsule header with multi-tier Filter Tags Row */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-5 flex flex-col gap-4.5 shadow-xs relative z-20">
                    
                    {/* Single Row Voting Scene selection */}
                    <div className="w-full">
                      <div className="flex flex-wrap items-center gap-2 select-none">
                        {[
                          "精选",
                          "👶萌娃大赛",
                          "🏆年度评选",
                          "摄影大赛",
                          "才艺评选",
                          "萌宠评选",
                          "员工评选",
                          "人物评选",
                          "活动评选",
                          "作品评选",
                          "晋级投票",
                          "节日评选",
                          "视频投票",
                          "语音投票"
                        ].map((sceneName) => {
                          const isSel = selectedScene === sceneName;
                          return (
                            <button
                              key={sceneName}
                              onClick={() => setSelectedScene(sceneName)}
                              className={cn(
                                "px-3.5 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer text-[13.5px] items-center justify-center flex shadow-[0_1px_2px_rgba(0,0,0,0.05)] border outline-hidden whitespace-nowrap",
                                isSel 
                                  ? "bg-blue-50/80 border-blue-500 text-blue-600 shadow-sm" 
                                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                              )}
                            >
                              {sceneName}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-slate-150/50" />

                    {/* Marketplace sorting aligned bar */}
                    <div className="flex items-center justify-between select-none">
                      <div className="flex items-center gap-1.5">
                        {["综合排序", "模板热度", "上架时间"].map((smode) => (
                          <button
                            key={smode}
                            onClick={() => setSelectedSort(smode)}
                            className={cn(
                              "px-3.5 py-2 rounded-xl text-[13px] font-black transition-all cursor-pointer",
                              selectedSort === smode 
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-100" 
                                : "text-slate-500 hover:text-slate-750 hover:bg-slate-55"
                            )}
                          >
                            {smode}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Grid layout containing template card lists (User Request 8) */}
                  {indexFilteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-1.5 pb-8">
                      {indexFilteredTemplates.map((item) => {
                        const isFav = favorites.has(item.id);
                        return (
                          <div 
                            key={item.id}
                            onClick={() => handleSelectTemplateDetail(item.id)}
                            className="group flex flex-col transition-all duration-300 hover:-translate-y-1 w-full cursor-pointer text-left"
                          >
                            {/* Card top banner with geometric layouts */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewModalTemplateId(item.id);
                              }}
                              className={cn("relative aspect-[3/5] rounded-xl border border-slate-100/80 w-full overflow-hidden bg-gradient-to-br cursor-pointer", item.colorBg)}
                            >
                              <div className="absolute inset-0 bg-[#ffffff0a] pointer-events-none mix-blend-overlay"></div>
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-[0.12] pointer-events-none" />
                              
                              {/* Top left badge indicating difficulty stars or hot mark */}
                              <div className="absolute top-2.5 left-2.5 flex gap-1 z-10 select-none">
                                <span className="bg-red-500 text-white text-[9px] font-black px-1.8 py-0.5 rounded leading-none uppercase tracking-wider">
                                  精选
                                </span>
                              </div>

                              {/* Top right operations tools */}
                              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-25 select-none">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(item.id);
                                  }}
                                  className="w-7 h-7 rounded-lg bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm text-white flex items-center justify-center transition-all cursor-pointer"
                                >
                                  <Heart className={cn("w-3.5 h-3.5 transition-colors", isFav && "fill-rose-500 text-rose-500")} />
                                </button>
                              </div>

                              {/* Hover sweep overlay triggers scanning and editing actions */}
                              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 select-none">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewModalTemplateId(item.id);
                                  }}
                                  className="flex items-center justify-center gap-1.5 w-[110px] py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full transform translate-y-3 group-hover:translate-y-0 text-xs shadow-lg transition-transform duration-300 cursor-pointer text-center"
                                >
                                  扫码预览 <ScanLine className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectTemplateDetail(item.id);
                                  }}
                                  className="flex items-center justify-center gap-1.5 w-[110px] py-2 bg-white hover:bg-slate-50 text-slate-900 font-extrabold rounded-full transform translate-y-3 group-hover:translate-y-0 text-xs shadow-md transition-all duration-300 delay-75 cursor-pointer text-center"
                                >
                                  查看详情
                                </button>
                              </div>

                            </div>

                            {/* Card Bottom details info block */}
                            <div className="flex flex-col pt-3 pb-1 z-20 relative bg-transparent gap-1.5 select-none">
                              <h3 className="text-[13.5px] font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={renamedTitles[item.id] || item.title}>
                                {(renamedTitles[item.id] || item.title)}
                              </h3>
                              <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                {[
                                  item.type,
                                  `${item.style}风`,
                                  item.tagText.split(" ")[0]
                                ].filter(Boolean).slice(0, 3).map((tag, idx) => (
                                  <span 
                                    key={idx} 
                                    className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Search index empty screen helper */
                    <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto my-10 shadow-xs relative z-10">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-150/40 mx-auto animate-bounce mb-4 text-slate-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-slate-850 text-[15.5px]">没有检索到任何投票模板</h4>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        抱歉，无法找到该分类或含有该搜索词的问卷！您可以点击下方按钮重设一切过滤等级或使用其他词重试。
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedType("全部");
                          setSelectedStyle("全部");
                          setSelectedScene("全部");
                          setSearchQuery("");
                        }}
                        className={cn("mt-4 px-5 py-2 rounded-xl text-white text-xs font-black tracking-wide flex items-center gap-1.5 mx-auto active:scale-95 transition-transform cursor-pointer", themeBtn)}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        重置搜索机制
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* CASE B2: CATEGORY SPECIFIC ACTIVE VIEW PORTAL ROUTING (e.g., "PK投票") */
              <div className="space-y-6 text-left animate-in fade-in duration-300">
                
                {/* Specific Category details row with dual grids banner */}
                {(() => {
                  const catConfig = CATEGORY_CONFIGS[activeSidebar];
                  if (!catConfig) return null;

                  // Load specific category cover illustrations
                  const coverUrls: Record<string, string> = {
                    "知识投票": imgPuzzle,
                    "每日一答": imgFeatured,
                    "闯关投票": imgStage,
                    "PK投票": imgAction,
                    "视频投票": imgReaction,
                    "趣味投票": imgSynthesis,
                    "学习投票": imgFeatured,
                    "练习": imgFeatured,
                    "考试": imgFeatured,
                    "课程": imgFeatured,
                    "照片投票": imgFeatured,
                    "语音投票": imgElimination,
                  };
                  const categoryBg = coverUrls[activeSidebar] || imgPuzzle;

                  return (
                    <div className="space-y-6">
                      
                      {/* Flex row with promo banners */}
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                        
                        {/* Left split banners matching GamifiedMarketingCenter */}
                        <div className="flex-1 flex flex-col md:flex-row gap-4.5 items-stretch">
                          {/* Banner 1: Cat main illustrative banner */}
                          <div className="flex-grow min-w-[320px] rounded-3xl border border-slate-100 relative overflow-hidden h-[135px] flex flex-col justify-center p-5 shadow-2xs group/subcard transition-transform duration-300 hover:-translate-y-0.5">
                            <img 
                              src={categoryBg} 
                              alt={activeSidebar} 
                              className="absolute inset-0 w-full h-full object-cover group-hover/subcard:scale-103 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent z-5" />

                            <div className="relative z-10 text-white">
                              <span className="text-[8px] font-black bg-blue-600 px-2 py-0.5 rounded leading-none uppercase select-none">
                                {activeSidebar}专属
                              </span>
                              <h3 className="font-extrabold text-[15px] sm:text-[16.5px] tracking-tight mt-2">{catConfig.bannerTitle}</h3>
                              <p className="text-[11px] text-slate-300 leading-relaxed font-bold mt-1 line-clamp-2 max-w-[85%]">
                                {catConfig.bannerDesc}
                              </p>
                            </div>
                          </div>

                          {/* Banner 2: Stacked Featured Templates (动态展示本分类精选模板封面) */}
                          <div className="flex-grow min-w-[320px] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-black border border-slate-700 relative overflow-hidden group/subcard transition-transform duration-300 hover:-translate-y-0.5 select-none h-[135px] flex items-center p-4 shadow-xl hover:shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />
                            
                            <div className="relative z-10 flex flex-col justify-center min-w-[70px] shrink-0 mr-1">
                              <span className="text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 w-max mb-1 shadow-sm">
                                HOT
                              </span>
                              <h2 className="text-white text-[13px] font-extrabold leading-tight drop-shadow-sm">
                                爆款精选
                              </h2>
                            </div>

                            {/* Un-folded Cards Layout directly derived from dynamic categoryFiltered */}
                            <div className="relative z-10 flex-1 flex flex-row items-center justify-end gap-2 text-left">
                              {categoryFiltered.slice(0, 3).map((t, idx) => {
                                const mockCovers = [imgTemplateCover1, imgTemplateCover2, imgTemplateCover3];
                                const coverImg = mockCovers[idx % 3];
                                return (
                                  <div 
                                    key={t.id}
                                    className={cn(
                                      "relative w-[70px] sm:w-[82px] h-[95px] sm:h-[110px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-slate-600/50 flex flex-col overflow-hidden transition-all duration-500 bg-slate-800 group-hover/subcard:-translate-y-1",
                                      idx === 1 && "sm:-translate-y-1.5",
                                      idx === 2 && "hidden sm:flex"
                                    )}
                                  >
                                    {coverImg && (
                                      <img 
                                        src={coverImg}
                                        alt="Mockup"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/subcard:scale-110"
                                      />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                                      <div className="text-[8px] text-white/95 font-black leading-[1.15] line-clamp-1 drop-shadow-md">
                                        {t.title}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Right aligned Search details card */}
                        <div className="relative w-full xl:w-[350px] shrink-0">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                          <input 
                            type="text"
                            value={categorySearchQuery}
                            onChange={(e) => setCategorySearchQuery(e.target.value)}
                            placeholder={`搜索${activeSidebar}玩法模板名称...`}
                            className="w-full pl-11 pr-5 h-[48px] text-xs sm:text-[12.5px] font-extrabold bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl outline-none shadow-3xs"
                          />
                        </div>

                      </div>

                      {/* Templates grid filtered */}
                      {categoryFiltered.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                          {categoryFiltered.map((item) => {
                            const isFav = favorites.has(item.id);
                            return (
                              <div 
                                key={item.id}
                                onClick={() => handleSelectTemplateDetail(item.id)}
                                className="group flex flex-col transition-all duration-300 hover:-translate-y-1 w-full cursor-pointer text-left"
                              >
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewModalTemplateId(item.id);
                                  }}
                                  className={cn("relative aspect-[3/5] rounded-xl border border-slate-100 w-full overflow-hidden bg-gradient-to-br cursor-pointer", item.colorBg)}
                                >
                                  <div className="absolute inset-0 bg-[#ffffff0a] pointer-events-none mix-blend-overlay"></div>

                                  {/* Top indicators */}
                                  <div className="absolute top-2.5 left-2.5 z-10 select-none">
                                    <span className="bg-red-500 text-white text-[9px] font-black px-1.8 py-0.5 rounded leading-none uppercase tracking-wider">
                                      精选
                                    </span>
                                  </div>

                                  <div className="absolute top-2.5 right-2.5 z-20 select-none">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(item.id);
                                      }}
                                      className="w-7 h-7 rounded-lg bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white flex items-center justify-center"
                                    >
                                      <Heart className={cn("w-3.5 h-3.5", isFav && "fill-rose-500 text-rose-500")} />
                                    </button>
                                  </div>

                                  {/* Hover overlay sweep actions */}
                                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 select-none">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewModalTemplateId(item.id);
                                      }}
                                      className="flex items-center justify-center gap-1.5 w-[110px] py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-full text-xs shadow-md cursor-pointer"
                                    >
                                      扫码预览 <ScanLine className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectTemplateDetail(item.id);
                                      }}
                                      className="flex items-center justify-center gap-1.5 w-[110px] py-2 bg-white hover:bg-slate-50 text-slate-900 font-extrabold rounded-full text-xs shadow-md cursor-pointer text-center"
                                    >
                                      查看详情
                                    </button>
                                  </div>
                                </div>

                                <div className="flex flex-col pt-3 pb-1 z-20 relative bg-transparent gap-1.5 select-none">
                                  <h3 className="text-[13.5px] font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-650 transition-colors" title={renamedTitles[item.id] || item.title}>
                                    {(renamedTitles[item.id] || item.title)}
                                  </h3>
                                  <div className="flex flex-wrap items-center gap-1 mt-0.5">
                                    {[
                                      item.type,
                                      "安全推荐",
                                      item.scene
                                    ].filter(Boolean).slice(0, 3).map((tag, idx) => (
                                      <span 
                                        key={idx} 
                                        className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto my-10 shadow-3xs border border-slate-100">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-205/40 text-slate-400">
                            <Search className="w-6 h-6" />
                          </div>
                          <h4 className="font-black text-slate-850 text-15">该项未检索到任何模板</h4>
                          <p className="text-slate-450 text-[11.5px] mt-2 leading-relaxed">
                            请尝试更换玩法分类或清空上面的高级筛选框。
                          </p>
                          <button 
                            onClick={() => {
                              setSelectedCategorySubFilter("全部");
                              setCategorySearchQuery("");
                            }}
                            className={cn("mt-4 px-5 py-2 rounded-xl text-white text-xs font-black tracking-wide cursor-pointer flex items-center justify-center gap-1.5 mx-auto active:scale-95 transition-transform", themeBtn)}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            全部加载展示
                          </button>
                        </div>
                      )}

                    </div>
                  );
                })()}

              </div>
            )}

          </div>
        )}

      </div>

      {/* ================== OVERLAY MODAL: EXQUISITE PREVIEW SCREEN FRAME (USER REQUEST 8) ================== */}
      {previewModalTemplateId && previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur backdrop overlay */}
          <div 
            onClick={() => setPreviewModalTemplateId(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300" 
          />
          
          {/* Main Container Card */}
          <div className="relative w-full max-w-[860px] bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-200 border border-slate-100 font-sans">
            
            {/* Left Side: Mock Device Cover */}
            <div className="w-full md:w-[48%] bg-[#1E293B] p-8 shrink-0 flex items-center justify-center relative overflow-hidden select-none">
              {/* Visual ambient glows */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Device Inner Shell */}
              <div className="relative w-[235px] h-[430px] bg-slate-800 rounded-[36px] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-[4px] border-slate-700/80 flex flex-col overflow-hidden">
                {/* Speaker pill notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-slate-700 rounded-full" />
                </div>

                {/* Device Content Screen Canvas */}
                <div className={cn("flex-1 rounded-[26px] overflow-hidden relative flex flex-col bg-gradient-to-br", previewTemplate.colorBg)}>
                  <div className="absolute inset-0 bg-[#ffffff0a] pointer-events-none mix-blend-overlay" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-15 pointer-events-none" />

                  {/* Central ring graphic elements */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="w-24 h-24 rounded-full border-8 border-indigo-400/40 animate-pulse flex items-center justify-center shadow-lg relative mt-4">
                      <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-indigo-300/40" />
                      <span className="text-[9px] font-black tracking-wider text-indigo-200">ACTIVE</span>
                    </div>

                    {/* Display Texts */}
                    <div className="mt-8 text-center px-2">
                      <h4 className="text-[14px] font-black text-white leading-tight tracking-wide drop-shadow-md">
                        {(renamedTitles[previewTemplate.id] || previewTemplate.title)}
                      </h4>
                      <p className="text-[9px] font-bold text-white/50 tracking-widest mt-1 uppercase">
                        {previewTemplate.type} • AI GENERATED
                      </p>
                    </div>

                    {/* Tap indicator */}
                    <div className="absolute bottom-5 inset-x-8 py-2 rounded-xl bg-white/10 text-center text-white text-[9px] font-black tracking-widest uppercase border border-white/15 backdrop-blur-xs">
                      TAP TO START
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Description background and QR actions */}
            <div className="w-full md:w-[52%] p-8 flex flex-col justify-between relative bg-white text-left">
              {/* Close trigger anchor */}
              <button 
                onClick={() => setPreviewModalTemplateId(null)}
                className="absolute top-4.5 right-4.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all z-20 cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="space-y-5.5 text-left">
                {/* Category Pill tag - Bright & Modern Pill Match Image Style */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EDF5FF] text-[#1C68F5] rounded-full text-[11.5px] font-bold select-none border border-[#E3EFFF]">
                  <Brain className="w-3.5 h-3.5 text-[#1C68F5]" />
                  <span>{previewTemplate.type}</span>
                </div>

                {/* Details block */}
                <div>
                  <h2 className="text-2.5xl md:text-3xl font-black text-slate-800 tracking-tight leading-none text-left">
                    {(renamedTitles[previewTemplate.id] || previewTemplate.title)}
                  </h2>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed font-semibold mt-3.5 text-left">
                    支持通过 AI 智能生成候选内容，生成个性化同款投票营销活动，或直接使用此模板快速设置并发布活动。
                  </p>
                </div>

                {/* QR Card block */}
                <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4 shadow-xs mt-4 text-left">
                  <div className="w-18 h-18 bg-white p-2 rounded-xl border border-slate-200/60 shadow-xs shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full text-slate-850" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="0" y="0" width="30" height="30" rx="3" />
                      <rect x="6" y="6" width="18" height="18" fill="white" />
                      <rect x="11" y="11" width="8" height="8" />
                      
                      <rect x="70" y="0" width="30" height="30" rx="3" />
                      <rect x="76" y="6" width="18" height="18" fill="white" />
                      <rect x="81" y="11" width="8" height="8" />

                      <rect x="0" y="70" width="30" height="30" rx="3" />
                      <rect x="6" y="76" width="18" height="18" fill="white" />
                      <rect x="11" y="81" width="8" height="8" />

                      <rect x="42" y="42" width="8" height="8" />
                      <rect x="52" y="10" width="8" height="16" />
                      <rect x="40" y="28" width="16" height="8" />
                      <rect x="10" y="42" width="16" height="8" />
                      <rect x="42" y="42" width="8" height="8" />
                      <rect x="54" y="45" width="10" height="10" />
                      <rect x="80" y="42" width="10" height="8" />

                      <rect x="40" y="72" width="6" height="12" />
                      <rect x="50" y="76" width="14" height="8" />
                      <rect x="42" y="88" width="14" height="8" />
                      <rect x="70" y="70" width="10" height="10" />
                      <rect x="84" y="84" width="12" height="12" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-[14px] font-black text-slate-800 text-left leading-none">
                      扫码手机预览
                    </h4>
                    <p className="text-[11px] text-slate-400 font-bold mt-1.5 text-left leading-none">
                      扫码体验真实投票效果
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirm buttons and actions */}
              <div className="flex items-center gap-3 mt-7">
                <button 
                  onClick={() => {
                    setPreviewModalTemplateId(null);
                    handleSelectTemplateDetail(previewTemplate.id);
                    setIsWorkspaceMode(true);
                  }}
                  className="flex-1 py-3 px-5 font-black text-white text-[13px] rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-205 shadow-md flex items-center justify-center gap-1.5 cursor-pointer shadow-indigo-500/20"
                >
                  <Sparkles className="w-4 h-4 fill-white animate-pulse" />
                  做同款
                </button>
                <button 
                  onClick={() => {
                    alert(`恭喜，【${previewTemplate.title}】一端发布成功！投票海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`);
                    setPreviewModalTemplateId(null);
                  }}
                  className="flex-1 py-3 px-5 font-black text-white text-[13px] rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all duration-205 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Rocket className="w-4 h-4 text-emerald-400" />
                  直接发布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
