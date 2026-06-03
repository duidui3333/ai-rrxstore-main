import { useState } from "react";
import { cn } from "../lib/utils";
import { getThemePalette } from "../lib/themeUtils";

const THEMES = ["精选推荐", "幼儿园", "邀请函", "办公/招聘", "小红书", "考试答题", "电子画册", "万能抽奖", "问卷营销", "海报设计", "投票评选", "互动营销", "培训招生", "门店/商超", "政府/组织", "高校/教育", "医疗保健", "金融银行", "婚礼婚庆", "制造/工厂", "小程序/APP运营", "私域运营", "红包营销", "支付收款", "节日营销", "游戏营销", "裂变涨粉", "打卡签到", "大屏", "企业文化"];

const MagicThemeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Background card (Green) */}
    <g style={{ transformOrigin: 'center', transform: 'rotate(-12deg) translate(-3px, 5px)' }}>
      <rect x="8" y="8" width="14" height="16" rx="3" fill="url(#grad1_ThemeBar)" opacity="0.9"/>
    </g>
    {/* Middle card (Pink) */}
    <g style={{ transformOrigin: 'center', transform: 'rotate(0deg)' }}>
      <rect x="9" y="8" width="14" height="16" rx="3" fill="url(#grad2_ThemeBar)" opacity="0.95"/>
    </g>
    {/* Front card (Indigo/Blue) */}
    <g style={{ transformOrigin: 'center', transform: 'rotate(12deg) translate(3px, -2px)' }}>
      <rect x="10" y="8" width="14" height="16" rx="3" fill="url(#grad3_ThemeBar)"/>
      {/* subtle UI lines inside the top template card */}
      <circle cx="14" cy="12" r="1.5" fill="white" opacity="0.9"/>
      <rect x="17" y="11" width="5" height="2" rx="1" fill="white" opacity="0.9"/>
      <rect x="14" y="15" width="8" height="2" rx="1" fill="white" opacity="0.6"/>
      <rect x="14" y="18" width="5" height="2" rx="1" fill="white" opacity="0.6"/>
    </g>

    {/* Big Magic Sparkle */}
    <path d="M26 4C26 4 25 7 22 8C25 9 26 12 26 12C26 12 27 9 30 8C27 7 26 4 26 4Z" fill="#FBBF24" />
    {/* Small Magic Sparkle */}
    <path d="M7 3C7 3 6.5 4.5 5 5C6.5 5.5 7 7 7 7C7 7 7.5 5.5 9 5C7.5 4.5 7 3 7 3Z" fill="#A78BFA" />
    
    <defs>
      <linearGradient id="grad1_ThemeBar" x1="8" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="grad2_ThemeBar" x1="9" y1="8" x2="23" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#DB2777" />
      </linearGradient>
      <linearGradient id="grad3_ThemeBar" x1="10" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#818CF8" />
        <stop offset="1" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
  </svg>
);

const SELECTED_BLUE = "bg-blue-600 hover:bg-blue-700";

export default function ThemeBar({ activeTheme, onThemeChange }: { activeTheme: string, onThemeChange: (t: string) => void }) {
  const [hovered, setHovered] = useState(false);

  const handleRandomTheme = () => {
    const availableThemes = THEMES.filter(t => t !== activeTheme);
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    onThemeChange(randomTheme);
  };

  return (
    <div
      className="relative z-40 -mt-10 mb-6 flex w-full justify-center px-2 sm:px-4"
      style={{ height: "74px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn(
        "absolute top-0 w-full max-w-[1440px] bg-white/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] border border-transparent",
        hovered
          ? "rounded-3xl p-3 shadow-xl border-slate-100"
          : "rounded-3xl p-3 shadow-[0_16px_40px_rgba(30,58,138,0.08)]"
      )}>
        <div className="flex relative z-10 w-full">
          {/* Badge */}
          <div className="relative group/tip shrink-0 h-[50px] w-[50px] mr-2 z-20">
            <button 
              onClick={handleRandomTheme}
              className="flex w-full h-full hover:bg-slate-200 bg-slate-100 items-center justify-center rounded-full select-none transition-all duration-300 group cursor-pointer"
            >
              <MagicThemeIcon className="w-7 h-7 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-800 text-white text-[12px] rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 z-50">
              手气不错（随机主题）
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-t border-l border-white/10"></div>
            </div>
          </div>

          {/* Theme Buttons */}
          <div className={cn(
            "flex-1 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden",
            hovered ? "max-h-[800px]" : "max-h-[50px]"
          )}>
            <div className="flex flex-wrap gap-x-2 gap-y-2.5 content-start transition-opacity duration-300">
              {THEMES.map(theme => {
              const isActive = activeTheme === theme;
              const palette = getThemePalette(theme);
              return (
                <button
                  key={theme}
                  onClick={() => {
                    onThemeChange(theme);
                    setHovered(false);
                  }}
                  className={cn(
                    "relative px-5 py-2.5 h-[50px] rounded-full text-[14px] transition-all duration-300 whitespace-nowrap outline-none flex items-center justify-center cursor-pointer",
                    isActive
                      ? `${theme === "精选推荐" ? SELECTED_BLUE : palette.btn} text-white font-bold`
                      : "bg-slate-50 text-slate-600 font-medium hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {theme}
                </button>
              );
            })}
            </div>
          </div>
        </div>

        {/* Gradient Mask to smoothly hide overflowing right edge beautifully when closed */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none rounded-r-2xl transition-opacity duration-500 z-20",
            hovered ? "opacity-0" : "opacity-100"
          )}
        ></div>
      </div>
    </div>
  );
}
