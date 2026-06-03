import React, { useState } from 'react';
import { 
  Star, MessageCircle, HelpCircle, Lightbulb, ArrowUp, QrCode, 
  ChevronLeft, ArrowRight, MessageSquare, Smartphone, 
  AppWindow, Globe, Video, ShoppingBag,
  MonitorPlay, Coins, FileQuestion, Building, Building2, Gamepad2, Store,
  Blocks, Code, Calendar, GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';

interface FloatingNavProps {
  isScrolled: boolean;
  onScrollToTop: () => void;
}

export default function FloatingNav({ isScrolled, onScrollToTop }: FloatingNavProps) {
  const [activeTab, setActiveTab] = useState('');

  const NAV_ITEMS = [
    { icon: Star, label: '收藏', tooltip: '模板收藏' },
    { icon: MessageCircle, label: '客服', tooltip: '在线客服' },
    { icon: HelpCircle, label: '帮助', tooltip: '帮助中心' },
    { icon: Lightbulb, label: '方案', tooltip: '获客方案', isSolution: true },
  ];

  const SOLUTION_CATEGORIES = [
    { id: 'acquisition', label: '获客中心', hot: true, hasSub: true, icon: MessageCircle },
    { id: 'solutions', label: '解决方案', hasSub: true, icon: Lightbulb },
    { id: 'integration', label: '系统集成', hasSub: true, icon: Blocks },
    { id: 'cases', label: '客户案例', icon: FileQuestion },
    { id: 'calendar', label: '营销日历', icon: Calendar },
    { id: 'campus', label: '校园账号', icon: GraduationCap },
  ];

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      <div className="flex flex-col bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        {NAV_ITEMS.map((item, index) => (
          <div key={item.label} className="group relative">
            <button
              className={cn(
                "relative flex flex-col items-center justify-center w-[52px] h-[52px] text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200",
                index === 0 && "rounded-t-2xl",
                index === NAV_ITEMS.length - 1 && "rounded-b-2xl",
                index !== NAV_ITEMS.length - 1 && "border-b border-slate-100"
              )}
            >
              <item.icon className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              
              {!item.isSolution && (
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                  {item.tooltip}
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 -z-10"></div>
                </div>
              )}
            </button>

            {/* "方案" Hover Panel */}
            {item.isSolution && (
              <div 
                className="absolute right-full bottom-0 pr-3 opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-300 z-[60]"
                onMouseLeave={() => setActiveTab('')}
              >
                <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 p-0 flex overflow-visible">
                  
                  {/* Flyout Sub-menus (Reused logic but simplified) */}
                  {activeTab && ['acquisition', 'solutions', 'integration'].includes(activeTab) && (
                    <div className="absolute right-full top-0 pr-2 h-full animate-in fade-in slide-in-from-right-2 duration-200">
                      <div className="bg-white rounded-2xl shadow-[0_12px_45px_-10px_rgba(0,0,0,0.15)] border border-slate-100 p-6 min-w-[500px]">
                        {activeTab === 'acquisition' && (
                          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {[
                              { id: 'qc', label: '企微获客', icon: MessageCircle, color: 'blue', tags: ["渠道活码", "任务获客", "红包获客", "抽奖获客", "盲盒获客", "任务进群", "自动拉群"] },
                              { id: 'xcx', label: '小程序获客', icon: Smartphone, color: 'green', tags: ["引流任务", "积分商城", "分销商城", "活动获客", "海报获客", "增长分析", "嵌入小程序"] },
                              { id: 'app', label: 'APP获客', icon: AppWindow, color: 'purple', tags: ["APP拉起", "地推渠道码", "好评有礼", "积分运营", "活动获客", "增长分析", "嵌入APP"] },
                              { id: 'gzh', label: '公众号获客', icon: MessageSquare, color: 'emerald', tags: ["公众号涨粉", "节日活动", "活动运营", "粉丝抽奖", "签到打卡", "积分商城"] },
                            ].map(item => (
                              <div key={item.id} className="flex gap-3 group/item">
                                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", `bg-${item.color}-50`)}>
                                  <item.icon className={cn("w-4.5 h-4.5", `text-${item.color}-500`)} strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-slate-800 text-[13px] group-hover/item:text-blue-600 transition-colors uppercase tracking-tight">{item.label}</h4>
                                    <ArrowRight className="w-3 h-3 text-blue-600 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-1 group-hover/item:translate-x-0" />
                                  </div>
                                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-slate-500 line-clamp-2">
                                    {item.tags.map(tag => <span key={tag} className="hover:text-blue-600 cursor-pointer whitespace-nowrap">{tag}</span>)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'solutions' && (
                          <div className="grid grid-cols-2 gap-3 h-full content-start">
                            {[
                              { label: '活动营销中台解决方案', icon: MonitorPlay, color: 'orange' },
                              { label: '积分运营解决方案', icon: Coins, color: 'yellow' },
                              { label: '考试答题解决方案', icon: FileQuestion, color: 'green' },
                              { label: '企业文化建设解决方案', icon: Building, color: 'blue' },
                              { label: '智慧党建解决方案', icon: Star, color: 'red' },
                              { label: '游戏化营销解决方案', icon: Gamepad2, color: 'purple' },
                              { label: '银行数字营销解决方案', icon: Building2, color: 'cyan' },
                              { label: '连锁门店运营解决方案', icon: Store, color: 'indigo' },
                            ].map((item, i) => (
                              <a key={i} href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 group/box transition-all">
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", `bg-${item.color}-50`)}>
                                  <item.icon className={cn("w-4 h-4", `text-${item.color}-500`)} strokeWidth={1.5} />
                                </div>
                                <span className="font-bold text-slate-800 text-[12px] group-hover/box:text-blue-600 transition-colors line-clamp-1">{item.label}</span>
                              </a>
                            ))}
                          </div>
                        )}

                        {activeTab === 'integration' && (
                          <div className="flex flex-col gap-1">
                            {[
                              { label: '系统集成', desc: '快速、低成本搭建营销中台', icon: Blocks, hot: true },
                              { label: '私有部署', desc: '多种部署方式，更全面、更安全', icon: Globe },
                              { label: 'API开放平台', desc: 'API接口服务对接 满足特殊定制需求', icon: Code },
                              { label: '企业微信版', desc: '赋能企微运营，链接更强大', icon: MessageSquare },
                            ].map((item, i) => (
                              <a key={i} href="#" className="flex gap-4 p-2 rounded-lg hover:bg-slate-50 transition-colors group/item relative">
                                {item.hot && <span className="absolute top-2 right-2 text-[8px] bg-red-100 text-red-500 px-1 rounded font-bold">HOT</span>}
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover/item:bg-blue-100 transition-colors">
                                  <item.icon className="w-5 h-5 text-blue-600" strokeWidth={2} />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <h4 className="font-bold text-slate-800 text-[13px] group-hover/item:text-blue-600 transition-colors">{item.label}</h4>
                                  <p className="text-slate-400 text-[11px]">{item.desc}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Category List (Trigger side) */}
                  <div className={cn(
                    "w-[160px] bg-white flex flex-col py-3 transition-all duration-300",
                    activeTab && ['acquisition', 'solutions', 'integration'].includes(activeTab) ? "rounded-r-2xl" : "rounded-2xl"
                  )}>
                    {SOLUTION_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveTab(cat.id)}
                        className={cn(
                          "w-full px-5 py-3 text-left text-[14px] transition-all relative flex items-center gap-3 group/cat",
                          activeTab === cat.id ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                        )}
                      >
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          {activeTab === cat.id && cat.hasSub ? (
                            <ChevronLeft className="w-4 h-4 animate-in fade-in zoom-in-75 duration-200" strokeWidth={2} />
                          ) : (
                            <cat.icon 
                              className={cn("w-4 h-4 transition-colors", activeTab === cat.id ? "text-blue-600" : "text-slate-400")} 
                              strokeWidth={1.5} 
                            />
                          )}
                        </div>
                        <span className="flex-1 whitespace-nowrap">{cat.label}</span>
                        {cat.hot && (
                          <span className="bg-red-50 text-red-500 text-[9px] font-bold px-1 py-0.5 rounded leading-none shrink-0">HOT</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* QR Section (Always visible, enhanced) */}
                  <div className="w-[200px] p-6 flex flex-col items-center justify-center bg-slate-50/50 border-l border-slate-100 rounded-r-2xl">
                    <div className="w-32 h-32 bg-white p-3 rounded-2xl shadow-sm mb-5 ring-1 ring-slate-100 group/qr cursor-pointer hover:shadow-md transition-shadow">
                      <QrCode className="w-full h-full text-slate-900 group-hover:scale-105 transition-transform" strokeWidth={1} />
                    </div>
                    <div className="text-center px-2">
                      <div className="flex items-center justify-center gap-1.5 mb-1.5 text-blue-600">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-bold text-[14px] tracking-tight">联系商务经理</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-medium">扫码咨询专属顾问<br/>领取全套获客方案资料</p>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onScrollToTop}
        className={cn(
          "group relative flex flex-col items-center justify-center w-[52px] h-[52px] rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-500",
          isScrolled 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8 pointer-events-none"
        )}
      >
        <ArrowUp className="w-5 h-5 mb-1 group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth={1.5} />
        <span className="text-[10px] font-medium leading-none">置顶</span>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
          回到顶部
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 -z-10"></div>
        </div>
      </button>
    </div>
  );
}
