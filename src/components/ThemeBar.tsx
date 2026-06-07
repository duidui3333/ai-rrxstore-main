import { useState } from "react";
import { cn } from "../lib/utils";
import { getThemePalette } from "../lib/themeUtils";

const THEMES = [
  "精选推荐",
  "幼儿园",
  "邀请函",
  "办公/招聘",
  "小红书",
  "考试答题",
  "电子画册",
  "万能抽奖",
  "问卷营销",
  "海报设计",
  "投票评选",
  "互动营销",
  "培训招生",
  "大屏",
  "门店/商超",
  "政府/组织",
  "高校/教育",
  "医疗保健",
  "金融银行",
  "婚礼婚庆",
  "制造/工厂",
  "私域运营",
  "红包营销",
  "支付收款",
  "节日营销",
  "游戏营销",
  "裂变涨粉",
  "打卡签到",
  "企业文化",
  "小程序/APP运营",
];

const SELECTED_BLUE = "bg-blue-600 hover:bg-blue-700";

export default function ThemeBar({ activeTheme, onThemeChange }: { activeTheme: string, onThemeChange: (t: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative z-40 -mt-[10px] mb-4 flex w-full justify-center px-3 sm:px-4"
      style={{ height: "76px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn(
        "absolute top-0 w-full max-w-none overflow-hidden border bg-white/96 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        hovered
          ? "rounded-[28px] border-slate-200/80 px-6 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
          : "rounded-[28px] border-slate-200/70 px-6 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.06)]"
      )}>
        <div className="relative z-10 flex w-full justify-center">
          <div className={cn(
            "flex-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            hovered ? "max-h-[96px]" : "max-h-[40px]"
          )}>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-3 content-start transition-opacity duration-300">
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
                    "relative flex h-10 items-center justify-center whitespace-nowrap rounded-full px-5 text-[14px] outline-none transition-all duration-300 cursor-pointer",
                    isActive
                      ? `${theme === "精选推荐" ? SELECTED_BLUE : palette.btn} text-white font-bold`
                      : "bg-slate-50 text-slate-700 font-semibold hover:bg-blue-50 hover:text-blue-700 hover:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.14)]"
                  )}
                >
                  {theme === "精选推荐" ? "👍 精选推荐" : theme}
                </button>
              );
            })}
            </div>
          </div>
        </div>

        {/* Gradient Mask to smoothly hide overflowing right edge beautifully when closed */}
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-36 rounded-r-[28px] bg-gradient-to-l from-white via-white/88 to-transparent transition-opacity duration-500",
            hovered ? "opacity-0" : "opacity-100"
          )}
        ></div>
      </div>
    </div>
  );
}
