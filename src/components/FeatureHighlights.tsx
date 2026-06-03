import React from 'react';
import { cn } from '../lib/utils';
import { Plus, Gamepad2, FileQuestion, Megaphone, Palette, Blocks, MoreHorizontal, MonitorPlay, BookImage, FilePlus2 } from 'lucide-react';

const features = [
  {
    name: '游戏化营销',
    icon: Gamepad2,
    gradient: 'bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF]',
    iconColor: 'text-rose-500',
    shadow: 'shadow-rose-200',
    badge: 'NEW'
  },
  {
    name: 'AI答题',
    icon: FileQuestion,
    gradient: 'bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]',
    iconColor: 'text-purple-600',
    shadow: 'shadow-purple-200',
    hasDot: true
  },
  {
    name: 'AI营销',
    icon: Megaphone,
    gradient: 'bg-gradient-to-br from-[#ffecd2] to-[#fcb69f]',
    iconColor: 'text-orange-500',
    shadow: 'shadow-orange-200',
    hasDot: true
  },
  {
    name: 'AI投票',
    icon: Palette,
    gradient: 'bg-gradient-to-br from-[#84fab0] to-[#8fd3f4]',
    iconColor: 'text-teal-600',
    shadow: 'shadow-teal-200',
    hasDot: true
  },
  {
    name: 'AI搭建',
    icon: Blocks,
    gradient: 'bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc]',
    iconColor: 'text-indigo-500',
    shadow: 'shadow-indigo-200',
    hasDot: true
  },
  {
    name: '更多',
    isAdd: true,
    dropdown: [
      { label: '大屏互动', icon: MonitorPlay },
      { label: '电子画册', icon: BookImage },
      { label: '空白创建', icon: FilePlus2 }
    ]
  }
];

export default function FeatureHighlights() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-5xl">
        {features.map((feature) => (
          <div 
            key={feature.name}
            className="relative group/feature"
          >
            <button 
              onClick={() => {
                if (feature.name === "游戏化营销") {
                  window.location.hash = "#gamified-marketing";
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="group/card flex w-[96px] sm:w-[112px] flex-col items-center rounded-[26px] border border-white/80 bg-white/80 px-4 py-4 shadow-[0_8px_24px_rgba(37,99,235,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_36px_rgba(37,99,235,0.10)] cursor-pointer relative"
            >
              <div className={cn(
                "w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-[18px] mb-3 flex items-center justify-center border border-slate-100 bg-white transition-transform duration-300 group-hover/card:scale-105 group-hover/card:border-slate-200",
                feature.isAdd 
                  ? "bg-slate-50" 
                  : "bg-slate-50"
              )}>
                {feature.isAdd ? (
                  <MoreHorizontal className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500 transition-colors group-hover/card:text-blue-600" strokeWidth={2.5} />
                ) : (
                  <feature.icon className={cn("w-6 h-6 sm:w-7 sm:h-7 transition-colors", feature.iconColor)} strokeWidth={2.25} />
                )}
              </div>
              <span className={cn(
                "text-[13px] sm:text-[14px] font-semibold tracking-normal text-center transition-colors leading-tight",
                feature.isAdd ? "text-slate-500 group-hover/card:text-blue-600" : "text-slate-700 group-hover/card:text-slate-900"
              )}>
                {feature.name}
              </span>
            </button>
            {feature.dropdown && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 pl-2 opacity-0 pointer-events-none group-hover/feature:opacity-100 group-hover/feature:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100/80 w-[120px] flex flex-col py-1.5 relative before:absolute before:-left-1.5 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-white before:border-l before:border-b before:border-slate-100/80 before:rotate-45">
                  {feature.dropdown.map(item => (
                    <button key={item.label} className="px-3 py-2.5 text-[13px] text-slate-600 font-medium hover:text-blue-600 hover:bg-slate-50/80 transition-colors flex items-center justify-center gap-2 relative z-10 w-full cursor-pointer">
                      <item.icon className="w-4 h-4 opacity-70" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
