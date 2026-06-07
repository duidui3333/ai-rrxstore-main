import { useState } from "react";
import { 
  Bell, User, ChevronDown, Search, Blocks, Globe, Code, MessageSquare, 
  QrCode, MessageCircle, Smartphone, ShoppingBag, Video, AppWindow,
  MonitorPlay, Coins, FileQuestion, Building, Star, Building2, Gamepad2, 
  Store, ChevronRight, ArrowRight, LayoutDashboard 
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Header({ isScrolled = false, currentRoute = "#" }: { isScrolled?: boolean; currentRoute?: string }) {
  const [activeHelpTab, setActiveHelpTab] = useState('');

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-4 xl:px-6 backdrop-blur-md">
      <div className="flex items-center gap-4 xl:gap-8 w-full">
        <div className="flex items-center gap-1.5 cursor-pointer shrink-0" onClick={() => { window.location.href = "https://ai-renrenxiu.lins0304.workers.dev/"; }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-sm">
            人
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight ml-0.5">人人秀</span>
          <div className="ml-0.5 rounded-sm bg-gradient-to-b from-[#ff3c2a] to-[#ff7e00] px-1 py-0.5 text-[8px] font-bold text-white shrink-0 flex flex-col items-center leading-[1.1] shadow-sm tracking-widest">
            <span>11</span>
            <span>周</span>
            <span>年</span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 ml-1 text-[15px] shrink-0 animate-in fade-in duration-300">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.location.hash = "#"; }} 
            className={cn(
              "font-semibold transition-colors",
              (currentRoute !== "#ai-design" && currentRoute !== "#gamified-marketing" && currentRoute !== "#ai-quiz" && currentRoute !== "#ai-voting" && currentRoute !== "#ai-marketing") ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            )}
          >
            模板中心
          </a>
          <a 
            href="#ai-design" 
            className={cn(
              "font-semibold transition-colors relative flex items-center select-none",
              currentRoute === "#ai-design" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            )}
          >
            AI设计
          </a>
          <a 
            href="#gamified-marketing" 
            className={cn(
              "font-semibold transition-colors relative flex items-center select-none",
              currentRoute === "#gamified-marketing" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
            )}
          >
            游戏化营销
            <span className="absolute -top-[12px] left-full ml-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[9.5px] px-1.5 py-[2.5px] rounded-t-lg rounded-br-lg rounded-bl-[2px] font-black whitespace-nowrap shadow-[0_2px_8px_rgba(124,58,237,0.25)] leading-none select-none">
              NEW
            </span>
          </a>
            <a 
              href="#ai-voting" 
              className={cn(
                "font-semibold transition-colors relative flex items-center select-none",
                currentRoute === "#ai-voting" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
              )}
            >
              AI投票
            </a>
            <a 
              href="#ai-quiz" 
              className={cn(
                "font-semibold transition-colors relative flex items-center select-none",
                currentRoute === "#ai-quiz" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
              )}
            >
              AI答题
            </a>
            <a 
              href="#ai-marketing" 
              className={cn(
                "font-semibold transition-colors relative flex items-center select-none",
                currentRoute === "#ai-marketing" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
              )}
            >
              AI营销
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-slate-700 hover:text-blue-600 transition-colors relative flex items-center select-none">
              AI搭建
            </a>
            
            {/* 系统集成 (Mega Menu) */}
            <div className="group/nav relative flex items-center h-16">
              <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-slate-700 group-hover/nav:text-blue-600 transition-colors flex items-center h-full">
                系统集成
              </a>
              
              {/* Dropdown Panel */}
              <div className="absolute top-full left-1/2 -translate-x-[40%] pt-1 w-[680px] opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-100/50 p-6 flex relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/30 before:to-transparent before:pointer-events-none">
                  {/* bridge */}
                  <div className="absolute -top-4 left-0 right-0 h-4"></div>
                  
                  {/* Left Column */}
                  <div className="flex-1 pr-6 flex flex-col gap-2 relative z-10">
                    <a href="#" className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item relative">
                      <div className="absolute top-3 right-3 text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded font-bold">HOT</div>
                      <div className="w-[46px] h-[46px] rounded-[14px] bg-[#F4F6FB] flex items-center justify-center shrink-0 group-hover/item:bg-[#edf1f8] transition-colors">
                        <Blocks className="w-[22px] h-[22px] text-[#1E40AF]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-slate-800 text-[15px] mb-1 group-hover/item:text-blue-600 transition-colors">系统集成</h4>
                        <p className="text-slate-400 text-[13px] leading-snug">快速、低成本搭建营销中台</p>
                      </div>
                    </a>
                    
                    <a href="#" className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                      <div className="w-[46px] h-[46px] rounded-[14px] bg-[#F4F6FB] flex items-center justify-center shrink-0 group-hover/item:bg-[#edf1f8] transition-colors">
                        <Globe className="w-[22px] h-[22px] text-[#1E40AF]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-slate-800 text-[15px] mb-1 group-hover/item:text-blue-600 transition-colors">私有部署</h4>
                        <p className="text-slate-400 text-[13px] leading-snug">多种部署方式，更全面、更安全</p>
                      </div>
                    </a>

                    <a href="#" className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                      <div className="w-[46px] h-[46px] rounded-[14px] bg-[#F4F6FB] flex items-center justify-center shrink-0 group-hover/item:bg-[#edf1f8] transition-colors">
                        <Code className="w-[22px] h-[22px] text-[#1E40AF]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-slate-800 text-[15px] mb-1 group-hover/item:text-blue-600 transition-colors">API开放平台</h4>
                        <p className="text-slate-400 text-[13px] leading-snug">API接口服务对接 满足客户场景化需求定制</p>
                      </div>
                    </a>

                    <a href="#" className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                      <div className="w-[46px] h-[46px] rounded-[14px] bg-[#F4F6FB] flex items-center justify-center shrink-0 group-hover/item:bg-[#edf1f8] transition-colors">
                        <MessageSquare className="w-[22px] h-[22px] text-[#1E40AF]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-slate-800 text-[15px] mb-1 group-hover/item:text-blue-600 transition-colors">企业微信版</h4>
                        <p className="text-slate-400 text-[13px] leading-snug">赋能企业微信活动运营，让链接更强大</p>
                      </div>
                    </a>
                  </div>
                  
                  {/* Divider */}
                  <div className="w-px bg-slate-100 mx-2 relative z-10"></div>
                  
                  {/* Right Column */}
                  <div className="w-[260px] pl-6 flex flex-col items-center justify-center relative z-10 mt-2">
                    {/* Avatar & Speech Bubble */}
                    <div className="relative mb-[30px] w-full flex flex-col items-center">
                      <div 
                        className="w-[52px] h-[52px] rounded-full border-2 border-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] relative z-20 overflow-hidden bg-blue-100 flex items-center justify-center text-blue-600"
                      >
                        <User className="w-6 h-6" />
                      </div>
                      {/* Speech bubble */}
                      <div className="bg-[#FFF6ED] text-[#C2410C] text-[13px] px-4 py-[14px] rounded-[18px] w-full text-center relative -mt-[26px] pt-8 shadow-sm">
                        你好，我是您的专属顾问<br/>很高兴为您服务！
                      </div>
                    </div>
                    
                    {/* QR Code section */}
                    <div className="border border-slate-100 rounded-3xl p-3.5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-3 inline-block">
                      <div className="bg-slate-800 rounded-2xl w-24 h-24 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    <p className="text-slate-500 text-[13px]">扫码咨询专属客服</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 合作与帮助 (Mega Menu) */}
            <div 
              className="group/help relative flex items-center h-16"
              onMouseLeave={() => setActiveHelpTab('')}
            >
              <button className="flex items-center gap-1 font-semibold text-slate-700 group-hover/help:text-blue-600 transition-colors h-full">
                合作与帮助 <ChevronDown className="h-4 w-4 group-hover/help:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 w-[150px] opacity-0 translate-y-2 pointer-events-none group-hover/help:opacity-100 group-hover/help:translate-y-0 group-hover/help:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-100/50 py-2 flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/20 before:to-transparent before:pointer-events-none">
                  {/* bridge */}
                  <div className="absolute -top-4 left-0 right-0 h-4"></div>
                  
                  {/* Main List */}
                  <div className="flex flex-col relative z-10 w-full">
                    {[
                      { id: 'cases', label: '客户案例' },
                      { id: 'acquisition', label: '获客中心', hot: true, hasSub: true },
                      { id: 'solutions', label: '解决方案', hasSub: true },
                      { id: 'help', label: '帮助中心' },
                      { id: 'api', label: 'API开放平台' },
                      { id: 'partners', label: '招募合作人' },
                      { id: 'design', label: '设计服务' },
                      { id: 'changelog', label: '更新日志' },
                      { id: 'about', label: '关于我们' },
                    ].map(item => {
                      const isActive = activeHelpTab === item.id;
                      return (
                        <div key={item.id} className="relative group/btn w-full">
                          <button
                            className={cn(
                              "flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors relative",
                              isActive ? "bg-slate-50 text-blue-600" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                            )}
                            onMouseEnter={() => {
                              if (item.hasSub) setActiveHelpTab(item.id);
                              else setActiveHelpTab('');
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] leading-none">{item.label}</span>
                              {item.hot && (
                                <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded leading-none shrink-0">HOT</span>
                              )}
                            </div>
                            {item.hasSub && (
                              <ChevronRight className={cn(
                                "w-4 h-4 transition-transform", 
                                isActive ? "text-blue-600 translate-x-1" : "text-slate-400 group-hover/btn:translate-x-1"
                              )} />
                            )}
                          </button>

                          {/* Flyout Panel */}
                          {item.hasSub && isActive && (
                            <div className="absolute left-full top-0 ml-1 w-[600px] animate-in fade-in slide-in-from-left-2 duration-200">
                              {/* invisible bridge to prevent mouse leave */}
                              <div className="absolute -left-4 top-0 bottom-0 w-4"></div>
                              
                              <div className="bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-100/50 p-6 relative">
                                {item.id === 'acquisition' && (
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    {/* 企微获客 */}
                                    <div className="flex gap-4 group/acquisition-item">
                                      <div className="w-12 h-12 rounded-[14px] bg-blue-50 flex items-center justify-center shrink-0">
                                        <MessageCircle className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                          <h4 className="font-bold text-slate-800 text-[15px] group-hover/acquisition-item:text-blue-600 transition-colors">企微获客</h4>
                                          <a href="#" className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover/acquisition-item:opacity-100 transition-opacity">去使用 <ArrowRight className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                                          {["渠道活码", "任务获客", "红包获客", "抽奖获客", "盲盒获客", "任务进群", "自动拉群"].map(tag => (
                                            <span key={tag} className="hover:text-blue-600 cursor-pointer transition-colors whitespace-nowrap">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* 小程序获客 */}
                                    <div className="flex gap-4 group/acquisition-item">
                                      <div className="w-12 h-12 rounded-[14px] bg-green-50 flex items-center justify-center shrink-0">
                                        <Smartphone className="w-6 h-6 text-green-500" strokeWidth={1.5} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                          <h4 className="font-bold text-slate-800 text-[15px] group-hover/acquisition-item:text-blue-600 transition-colors">小程序获客</h4>
                                          <a href="#" className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover/acquisition-item:opacity-100 transition-opacity">去使用 <ArrowRight className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                                          {["引流任务", "积分商城", "分销商城", "活动获客", "海报获客", "增长分析", "嵌入小程序"].map(tag => (
                                            <span key={tag} className="hover:text-blue-600 cursor-pointer transition-colors whitespace-nowrap">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* APP获客 */}
                                    <div className="flex gap-4 group/acquisition-item">
                                      <div className="w-12 h-12 rounded-[14px] bg-purple-50 flex items-center justify-center shrink-0">
                                        <AppWindow className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                          <h4 className="font-bold text-slate-800 text-[15px] group-hover/acquisition-item:text-blue-600 transition-colors">APP获客</h4>
                                          <a href="#" className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover/acquisition-item:opacity-100 transition-opacity">去使用 <ArrowRight className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                                          {["APP拉起", "地推渠道码", "好评有礼", "积分运营", "活动获客", "增长分析", "嵌入APP"].map(tag => (
                                            <span key={tag} className="hover:text-blue-600 cursor-pointer transition-colors whitespace-nowrap">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* 公众号获客 */}
                                    <div className="flex gap-4 group/acquisition-item">
                                      <div className="w-12 h-12 rounded-[14px] bg-emerald-50 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-6 h-6 text-emerald-500" strokeWidth={1.5} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                          <h4 className="font-bold text-slate-800 text-[15px] group-hover/acquisition-item:text-blue-600 transition-colors">公众号获客</h4>
                                          <a href="#" className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover/acquisition-item:opacity-100 transition-opacity">去使用 <ArrowRight className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                                          {["公众号涨粉", "节日活动", "活动运营", "粉丝抽奖", "签到打卡", "积分商城"].map(tag => (
                                            <span key={tag} className="hover:text-blue-600 cursor-pointer transition-colors whitespace-nowrap">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* 网站获客 */}
                                    <div className="flex gap-4 group/acquisition-item">
                                      <div className="w-12 h-12 rounded-[14px] bg-cyan-50 flex items-center justify-center shrink-0">
                                        <Globe className="w-6 h-6 text-cyan-500" strokeWidth={1.5} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                          <h4 className="font-bold text-slate-800 text-[15px] group-hover/acquisition-item:text-blue-600 transition-colors">网站获客</h4>
                                          <a href="#" className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover/acquisition-item:opacity-100 transition-opacity">去使用 <ArrowRight className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                                          {["邀请注册", "用户调研", "活动运营", "增长分析"].map(tag => (
                                            <span key={tag} className="hover:text-blue-600 cursor-pointer transition-colors whitespace-nowrap">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* 视频号获客 */}
                                    <div className="flex gap-4 group/acquisition-item">
                                      <div className="w-12 h-12 rounded-[14px] bg-orange-50 flex items-center justify-center shrink-0">
                                        <Video className="w-6 h-6 text-orange-500" strokeWidth={1.5} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                          <h4 className="font-bold text-slate-800 text-[15px] group-hover/acquisition-item:text-blue-600 transition-colors">视频号获客</h4>
                                          <a href="#" className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover/acquisition-item:opacity-100 transition-opacity">去使用 <ArrowRight className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                                          {["直播获客", "短视频获客", "粉丝获客", "活动获客"].map(tag => (
                                            <span key={tag} className="hover:text-blue-600 cursor-pointer transition-colors whitespace-nowrap">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* 微信小店获客 */}
                                    <div className="flex gap-4 group/acquisition-item">
                                      <div className="w-12 h-12 rounded-[14px] bg-red-50 flex items-center justify-center shrink-0">
                                        <ShoppingBag className="w-6 h-6 text-red-500" strokeWidth={1.5} />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1.5">
                                          <h4 className="font-bold text-slate-800 text-[15px] group-hover/acquisition-item:text-blue-600 transition-colors">微信小店获客</h4>
                                          <a href="#" className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium opacity-0 group-hover/acquisition-item:opacity-100 transition-opacity">去使用 <ArrowRight className="w-3.5 h-3.5" /></a>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                                          {["推客招募", "推客管理", "推客等级", "推客裂变", "推客业绩"].map(tag => (
                                            <span key={tag} className="hover:text-blue-600 cursor-pointer transition-colors whitespace-nowrap">{tag}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {item.id === 'solutions' && (
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 content-start h-full">
                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-orange-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-orange-100">
                                        <MonitorPlay className="w-6 h-6 text-orange-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">活动营销中台解决方案</span>
                                    </a>

                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-yellow-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-yellow-100">
                                        <Coins className="w-6 h-6 text-yellow-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">积分运营解决方案</span>
                                    </a>

                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-green-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-green-100">
                                        <FileQuestion className="w-6 h-6 text-green-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">考试答题解决方案</span>
                                    </a>

                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-blue-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-blue-100">
                                        <Building className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">企业文化建设解决方案</span>
                                    </a>

                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-red-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-red-100">
                                        <Star className="w-6 h-6 text-red-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">智慧党建解决方案</span>
                                    </a>

                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-purple-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-purple-100">
                                        <Gamepad2 className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">游戏化营销解决方案</span>
                                    </a>

                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-cyan-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-cyan-100">
                                        <Building2 className="w-6 h-6 text-cyan-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">银行数字营销解决方案</span>
                                    </a>

                                    <a href="#" className="flex items-center gap-4 group/box cursor-pointer">
                                      <div className="w-12 h-12 rounded-[14px] bg-indigo-50 flex items-center justify-center shrink-0 transition-colors group-hover/box:bg-indigo-100">
                                        <Store className="w-6 h-6 text-indigo-500" strokeWidth={1.5} />
                                      </div>
                                      <span className="font-bold text-slate-800 text-[15px] group-hover/box:text-blue-600 transition-colors">连锁门店运营解决方案</span>
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-slate-700 hover:text-blue-600 transition-colors relative flex items-center">
              价格
              <span className="absolute -top-3.5 -right-16 bg-gradient-to-r from-[#ff3c2a] to-[#ff7e00] text-white text-[10px] px-1.5 py-0.5 rounded-t-xl rounded-br-xl rounded-bl-sm font-bold whitespace-nowrap shadow-sm">
                限时优惠
              </span>
            </a>
          </nav>
        
        <div className="ml-auto flex items-center gap-2 xl:gap-3 shrink-0">
          {isScrolled && (
            <div className="hidden md:block w-48 xl:w-56 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative flex items-center w-full h-9 rounded-full bg-slate-100/80 px-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white border border-transparent focus-within:border-blue-500/30 transition-all">
                <Search className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
                <input 
                  type="text" 
                  placeholder="搜索模板..." 
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-slate-700 placeholder:text-slate-400 min-w-0"
                />
              </div>
            </div>
          )}

          <button className={cn(
            "rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700",
            isScrolled ? "ml-0" : "ml-2"
          )}>
            进入工作台
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors ml-1">
            <Bell className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 overflow-hidden relative group">
            <User className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
