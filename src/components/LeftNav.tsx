import { 
  LayoutTemplate, Star, Grid, GraduationCap, 
  Palette, Gamepad2, BrainCircuit, Megaphone, Blocks, 
  MonitorPlay, BookOpen, Smartphone, Share2, 
  AppWindow, MessageCircle, Video, Store, Globe 
} from "lucide-react";
import { cn } from "../lib/utils";

// 1. Top Section
const coreNav = [
  { id: "center", name: "模板中心", icon: LayoutTemplate, accent: "text-blue-600", bg: "bg-blue-50" },
  { id: "peer", name: "同行精选", icon: Star, accent: "text-orange-500", bg: "bg-orange-50" },
  { id: "create", name: "立即创建", icon: Grid, accent: "text-purple-600", bg: "bg-purple-50" },
  { id: "campus", name: "校园账号", icon: GraduationCap, accent: "text-emerald-600", bg: "bg-emerald-50", badge: "免费领取" },
];

// 2. AI Capabilities
const aiNav = [
  { id: "games", name: "游戏化营销", icon: Gamepad2, text: "消除 / 动作 / 益智类", tag: "NEW", hColor: "hover:bg-rose-50 hover:text-rose-600" },
  { id: "quiz", name: "AI 答题", icon: BrainCircuit, text: "知识答题 / 闯关答题", tag: "主推", hColor: "hover:bg-purple-50 hover:text-purple-600", hasDot: true },
  { id: "market", name: "AI 营销", icon: Megaphone, text: "抽奖 / 投票 / 裂变", tag: "通用", hasDot: true },
  { id: "design", name: "AI 投票", icon: Palette, text: "H5 / 海报 / 图文 / 文章", tag: "常规", hasDot: true },
  { id: "build", name: "AI 搭建", icon: Blocks, text: "长页 / 小程序 / 微官网", tag: "应用", hasDot: true },
];

const toolsNav = [
  { id: "bigscreen", name: "大屏互动", icon: MonitorPlay },
  { id: "album", name: "电子画册", icon: BookOpen },
];

const scenesNav = [
  { id: "wecom", name: "企微获客", icon: Share2 },
  { id: "miniapp", name: "小程序获客", icon: Smartphone },
  { id: "app", name: "APP获客", icon: AppWindow },
  { id: "mp", name: "公众号获客", icon: MessageCircle },
  { id: "web", name: "网站获客", icon: Globe },
  { id: "video", name: "视频号获客", icon: Video },
  { id: "shop", name: "微信小店获客", icon: Store },
];

export default function LeftNav({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (id: string) => void }) {
  return (
    <aside className="w-[240px] shrink-0 border-r border-slate-200 bg-white hidden lg:flex flex-col h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
      {/* Platform Core */}
      <div className="p-3 border-b border-slate-100">
        <nav className="space-y-0.5">
          {coreNav.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeCategory === item.id 
                  ? cn(item.bg, item.accent) 
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-[18px] w-[18px]", activeCategory === item.id ? "" : item.accent)} />
                {item.name}
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* AI Capabilities Hub */}
      <div className="py-4">
        <div className="px-5 mb-2 text-xs font-semibold text-slate-400 tracking-wider">创意引擎</div>
        <nav className="space-y-1 px-3">
          {aiNav.map(item => (
            <button 
              key={item.id}
              className={cn(
                "group relative w-full flex flex-col items-start px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-slate-700 hover:bg-slate-50",
                item.hColor || ""
              )}
            >
              {item.tag === "NEW" && (
                <span className="absolute top-1.5 right-2 px-1.5 py-[2.5px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[9px] font-black rounded-t-lg rounded-br-lg rounded-bl-[2px] leading-none select-none z-10 shadow-[0_2px_8px_rgba(124,58,237,0.25)]">
                  NEW
                </span>
              )}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <item.icon className="h-[18px] w-[18px] text-slate-400 group-hover:text-current transition-colors" />
                  <span className="relative flex items-center">
                    {item.name}
                    {item.hasDot && (
                      <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 inline-block animate-pulse align-middle" />
                    )}
                  </span>
                </div>
                {item.tag && item.tag !== "NEW" && (
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded leading-none select-none",
                    item.tag === "主推"
                      ? "text-red-500 bg-red-50"
                      : "text-slate-500 bg-slate-100"
                  )}>
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 pl-[30px] font-normal leading-tight text-left">
                {item.text}
              </p>
            </button>
          ))}
        </nav>
      </div>

      {/* Tools */}
      <div className="py-2 border-t border-slate-100">
        <div className="px-5 mb-2 text-xs font-semibold text-slate-400 tracking-wider">内容工具</div>
        <nav className="space-y-0.5 px-3">
          {toolsNav.map(item => (
            <button key={item.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <item.icon className="h-[18px] w-[18px] text-slate-400" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Operations & Scenes */}
      <div className="py-4 border-t border-slate-100 mb-6">
        <div className="px-5 mb-2 text-xs font-semibold text-slate-400 tracking-wider">营销场景支持</div>
        <nav className="grid grid-cols-2 gap-1 px-3">
          {scenesNav.map((item, idx) => (
            <button key={item.id} className={cn("flex flex-col items-center justify-center p-2 rounded-lg text-xs text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors", idx === scenesNav.length - 1 && scenesNav.length % 2 !== 0 ? "col-span-2 flex-row gap-2" : "gap-1.5")}>
              <item.icon className="h-4 w-4" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
