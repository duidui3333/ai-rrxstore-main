import React from 'react';
import { cn } from '../lib/utils';
import {
  MoreHorizontal,
} from 'lucide-react';
import iconGamified from '../assets/images/template-center-icons/游戏化营销.png';
import iconQuiz from '../assets/images/template-center-icons/ai答题.png';
import iconMarketing from '../assets/images/template-center-icons/ai营销.png';
import iconVoting from '../assets/images/template-center-icons/ai投票.png';
import iconBuilder from '../assets/images/template-center-icons/ai搭建.png';
import iconMore from '../assets/images/template-center-icons/更多.png';
import iconBigscreen from '../assets/images/template-center-icons/大屏互动.png';
import iconAlbum from '../assets/images/template-center-icons/电子画册.png';
import iconBlank from '../assets/images/template-center-icons/空白创建.png';

const features = [
  {
    name: '游戏化营销',
    icon: iconGamified,
    gradient: 'bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF]',
    iconColor: 'text-rose-500',
    shadow: 'shadow-rose-200',
    badge: 'NEW'
  },
  {
    name: 'AI答题',
    icon: iconQuiz,
    gradient: 'bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]',
    iconColor: 'text-purple-600',
    shadow: 'shadow-purple-200',
    hasDot: true
  },
  {
    name: 'AI营销',
    icon: iconMarketing,
    gradient: 'bg-gradient-to-br from-[#ffecd2] to-[#fcb69f]',
    iconColor: 'text-orange-500',
    shadow: 'shadow-orange-200',
    hasDot: true
  },
  {
    name: 'AI投票',
    icon: iconVoting,
    gradient: 'bg-gradient-to-br from-[#84fab0] to-[#8fd3f4]',
    iconColor: 'text-teal-600',
    shadow: 'shadow-teal-200',
    hasDot: true
  },
  {
    name: 'AI搭建',
    icon: iconBuilder,
    gradient: 'bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc]',
    iconColor: 'text-indigo-500',
    shadow: 'shadow-indigo-200',
    hasDot: true
  },
  {
    name: '更多',
    isAdd: true,
    icon: iconMore,
    dropdown: [
      { label: '大屏互动', icon: iconBigscreen },
      { label: '电子画册', icon: iconAlbum },
      { label: '空白创建', icon: iconBlank }
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
              className="group/card flex w-[96px] sm:w-[112px] flex-col items-center rounded-[26px] border border-white/55 bg-white/35 px-4 py-4 shadow-[0_8px_24px_rgba(37,99,235,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 hover:shadow-[0_14px_36px_rgba(37,99,235,0.10)] cursor-pointer relative"
            >
              <div className={cn(
                "w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-[18px] mb-3 flex items-center justify-center border border-white/70 bg-white/55 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-transform duration-300 group-hover/card:scale-105 group-hover/card:border-white/90 overflow-hidden backdrop-blur-md",
                feature.isAdd 
                  ? "bg-white/45" 
                  : "bg-white/55"
              )}>
                <img
                  src={feature.icon}
                  alt={feature.name}
                  className="h-full w-full object-contain p-0"
                  draggable={false}
                />
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
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-5 h-5 object-contain opacity-90 shrink-0"
                        draggable={false}
                      />
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
