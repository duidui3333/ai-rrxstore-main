import { useState, useEffect } from "react";
import { CalendarDays, ArrowRight, Zap, Target, Activity, Clock, Flame, Gift, Plug2, MessagesSquare, Smartphone, Code } from "lucide-react";
import imgTemplateCover1 from "../assets/images/marketing_template_cover_1_1779935600707.png";
import imgTemplateCover2 from "../assets/images/marketing_template_cover_2_1779935619140.png";
import imgTemplateCover3 from "../assets/images/marketing_template_cover_3_1779935640170.png";
import imgEnvelopeClean from "../assets/images/marketing_envelope_clean_1779861039045.png";
import imgWheelClean from "../assets/images/marketing_wheel_clean_1779861021138.png";
import imgAction from "../assets/images/cat_action_1779523229602.png";

export default function DiscoveryWidgets() {
  const events = [
    {
      month: "5月",
      day: "01",
      title: "劳动节",
      gameName: "致敬奋斗者",
      tag: "节日热点",
      targetId: "may1",
      decor: "🏅🛠️",
      img: imgTemplateCover1,
      bgClass: "from-blue-50/90 to-white hover:to-blue-50/20 border-blue-100/80 hover:border-blue-300 hover:shadow-[0_12px_24px_rgba(59,130,246,0.12)]",
      textClass: "text-blue-600 bg-blue-100/70",
      headerBg: "bg-gradient-to-r from-blue-500 to-indigo-500",
      btnClass: "bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-100 hover:shadow-blue-300/50",
    },
    {
      month: "5月",
      day: "04",
      title: "青年节",
      gameName: "青春能量派",
      tag: "品牌互动",
      targetId: "may4",
      decor: "🎤⚡",
      img: imgTemplateCover2,
      bgClass: "from-emerald-50/90 to-white hover:to-emerald-50/20 border-emerald-100/80 hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(16,185,129,0.12)]",
      textClass: "text-emerald-700 bg-emerald-100/70",
      headerBg: "bg-gradient-to-r from-emerald-600 to-teal-600",
      btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100 hover:shadow-emerald-300/50",
    },
    {
      month: "5月",
      day: "05",
      title: "立夏",
      gameName: "夏日上新季",
      tag: "节气营销",
      targetId: "may4",
      decor: "🌿☀️",
      img: imgTemplateCover3,
      bgClass: "from-lime-50/90 to-white hover:to-lime-50/20 border-lime-100/80 hover:border-lime-300 hover:shadow-[0_12px_24px_rgba(132,204,22,0.12)]",
      textClass: "text-lime-700 bg-lime-100/70",
      headerBg: "bg-gradient-to-r from-lime-600 to-emerald-500",
      btnClass: "bg-lime-600 hover:bg-lime-700 shadow-md shadow-lime-100 hover:shadow-lime-300/50",
    },
    {
      month: "5月",
      day: "10",
      title: "母亲节",
      gameName: "感恩花礼季",
      tag: "温情促销",
      targetId: "may12",
      decor: "🌷🎁",
      img: imgAction,
      bgClass: "from-rose-50/90 to-white hover:to-rose-50/20 border-rose-100/80 hover:border-rose-300 hover:shadow-[0_12px_24px_rgba(244,63,94,0.12)]",
      textClass: "text-rose-600 bg-rose-100/70",
      headerBg: "bg-gradient-to-r from-rose-500 to-pink-500",
      btnClass: "bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-100 hover:shadow-rose-300/50",
    },
    {
      month: "5月",
      day: "20",
      title: "520表白日",
      gameName: "浪漫告白季",
      tag: "节日互动",
      targetId: "may20",
      decor: "💌🌹",
      img: imgEnvelopeClean,
      bgClass: "from-fuchsia-50/90 to-white hover:to-fuchsia-50/20 border-fuchsia-100/80 hover:border-fuchsia-300 hover:shadow-[0_12px_24px_rgba(217,70,239,0.12)]",
      textClass: "text-fuchsia-600 bg-fuchsia-100/70",
      headerBg: "bg-gradient-to-r from-fuchsia-500 to-pink-500",
      btnClass: "bg-fuchsia-500 hover:bg-fuchsia-600 shadow-md shadow-fuchsia-100 hover:shadow-fuchsia-300/50",
    },
    {
      month: "6月",
      day: "01",
      title: "儿童节",
      gameName: "欢乐接糖果",
      tag: "童心大促",
      targetId: "jun1",
      decor: "🍬🎈",
      img: imgWheelClean,
      bgClass: "from-pink-50/90 to-white hover:to-pink-50/20 border-pink-100/80 hover:border-pink-300 hover:shadow-[0_12px_24px_rgba(236,72,153,0.12)]",
      textClass: "text-pink-600 bg-pink-100/70",
      headerBg: "bg-gradient-to-r from-pink-500 to-fuchsia-500",
      btnClass: "bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-100 hover:shadow-pink-300/50",
    },
  ];

  const allTemplates = [
    { name: "五一劳动节狂欢大作战", tag: "游戏", views: "3.2w浏览" },
    { name: "母亲节康乃馨抽盲盒", tag: "营销", views: "1.5w浏览" },
    { name: "企业春招性格测试题库", tag: "答题", views: "8.9k浏览" },
    { name: "立夏节气动态海报素材", tag: "设计", views: "5.1k浏览" },
    { name: "周年庆祝微官网搭建", tag: "搭建", views: "1.2w浏览" },
    { name: "六一儿童节趣味问答赛", tag: "答题", views: "4.5k浏览" },
  ];

  const allFeed = [
    { user: "上海某**构", action: "发布了", template: "秋季招生邀请函" },
    { user: "135****8291", action: "创建了", template: "周年庆扭蛋机抽奖" },
    { user: "某互**团", action: "搭建了", template: "产品答题挑战赛" },
    { user: "微*用户", action: "保存了", template: "朋友圈打卡日签" },
    { user: "王**", action: "发布了", template: "520表白神器H5" },
    { user: "张**", action: "编辑了", template: "端午节赛龙舟游戏" },
  ];

  const [newTemplates, setNewTemplates] = useState(allTemplates.slice(0, 3));
  const [feed, setFeed] = useState(allFeed.slice(0, 3).map(f => ({ ...f, time: "刚刚更新" })));
  const accessItems = [
    {
      title: "微信小程序对接",
      desc: "无需开发 极速嵌接",
      icon: MessagesSquare,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100/90",
      cardBg: "from-emerald-50 to-green-50/80",
    },
    {
      title: "APP 集成安全方案",
      desc: "iOS & Android 无缝嵌入",
      icon: Smartphone,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-100/90",
      cardBg: "from-violet-50 to-fuchsia-50/70",
    },
    {
      title: "活动接口打通",
      desc: "资产互通 数据同步",
      icon: Code,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100/90",
      cardBg: "from-amber-50 to-orange-50/75",
    },
  ];

  const handleCalendarClick = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // 每分钟自动刷新更新内容
    const timer = setInterval(() => {
      setNewTemplates(prev => {
        const shuffled = [...allTemplates].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
      });
      
      setFeed(prev => {
        const shuffled = [...allFeed].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3).map(f => ({ ...f, time: "刚刚更新" }));
      });
    }, 60000); // 1 min timeout
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      
      {/* Widget 1: Hot Calendar with Images (Spans 2 columns on lg, 3 on xl) */}
      <div className="rounded-2xl bg-white p-4 flex flex-col overflow-hidden lg:col-span-2 xl:col-span-2 2xl:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <div className="mt-[5px] flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-orange-500" />
            <h3 className="font-bold text-slate-800 text-[15px] leading-none">热点营销日历</h3>
          </div>
          <button className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1">更多节点 <ArrowRight className="h-3 w-3" /></button>
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {events.map((evt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCalendarClick(evt.targetId)}
              className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border bg-gradient-to-br shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-transparent relative overflow-hidden group/card cursor-pointer text-left ${evt.bgClass}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/30 to-transparent rounded-full pointer-events-none opacity-40" />
              <div className="absolute -bottom-1 -right-1 text-5xl opacity-10 select-none group-hover/card:scale-130 transition-transform duration-500 pointer-events-none font-sans font-black">
                {evt.decor}
              </div>

              <div className="w-12 h-14 rounded-xl border border-slate-200/50 overflow-hidden flex flex-col shrink-0 bg-white shadow-xs select-none">
                <div className={`text-white text-[10px] font-extrabold text-center py-0.5 uppercase tracking-wider font-mono ${evt.headerBg}`}>
                  {evt.month}
                </div>
                <div className="flex-grow flex items-center justify-center text-slate-800 text-lg font-black font-mono leading-none">
                  {evt.day}
                </div>
              </div>

              <div className="flex flex-col min-w-[130px] flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none shadow-xs uppercase ${evt.textClass}`}>
                    {evt.tag}
                  </span>
                </div>
                <span className="text-[14px] font-black text-slate-800 mt-1.5 leading-none">{evt.title}</span>
                <div className="flex items-center gap-1.5 mt-1 leading-none">
                  <span className="text-[11px] text-slate-500 font-extrabold flex items-center gap-0.5">
                    <Gift className="w-3 h-3 text-slate-400" />
                    {evt.gameName}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Widget 2: New Arrivals */}
      <div className="relative rounded-2xl p-4 flex flex-col overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50/35 to-white">
        <div className="absolute top-0 right-0 opacity-[0.03] transform translate-x-2 -translate-y-2 pointer-events-none">
          <Flame className="w-24 h-24 text-orange-600" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-white/70 to-white" />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              <Flame className="h-3.5 w-3.5 text-white" />
            </div>
            <h3 className="font-bold text-orange-950 text-sm">最新上架模板</h3>
          </div>
          <span className="flex items-center px-1.5 py-0.5 text-[10px] font-black text-rose-600 bg-white rounded border border-rose-100 shadow-sm animate-pulse tracking-wider">
            NEW
          </span>
        </div>
        
        <div className="space-y-2.5 flex-1 pt-1 relative z-10">
          {newTemplates.map((item, idx) => (
            <div key={idx} className="group animate-in fade-in slide-in-from-bottom-2 duration-500 cursor-pointer flex items-center justify-between bg-white/60 hover:bg-white px-2.5 py-2 rounded-xl transition-all border border-transparent">
              <div className="flex items-center gap-2 overflow-hidden pr-2">
                <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 font-bold border border-orange-200/50">{item.tag}</span>
                <span className="text-[12px] font-medium text-slate-700 truncate group-hover:text-orange-600 transition-colors" title={item.name}>{item.name}</span>
              </div>
              <span className="shrink-0 text-[11px] text-slate-400 font-medium">{item.views}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-orange-200/60 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-orange-900/60 font-medium">
            <Target className="h-3.5 w-3.5 text-orange-500" />
            今日上新 <span className="text-orange-600 font-black text-[13px]">128</span> 款
          </div>
          <button className="text-[11px] text-orange-600 font-bold hover:underline flex items-center">去查收 <ArrowRight className="w-3 h-3 ml-0.5"/></button>
        </div>
      </div>

      {/* Widget 3: Live Creation Feed (New) */}
      <div className="relative rounded-2xl p-4 flex flex-col overflow-hidden bg-gradient-to-b from-indigo-50 via-blue-50/35 to-white">
        <div className="absolute top-0 right-0 opacity-[0.02] transform translate-x-2 -translate-y-2 pointer-events-none">
          <Activity className="w-24 h-24 text-indigo-600" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-white/70 to-white" />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-400 to-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              <Activity className="h-3 w-3 text-white" />
            </div>
            <h3 className="font-bold text-indigo-950 text-sm">实时创作动态</h3>
          </div>
          <span className="flex items-center px-1.5 py-0.5 text-[10px] font-black text-emerald-600 bg-white rounded border border-emerald-100 shadow-sm animate-pulse tracking-wider">
            LIVE
          </span>
        </div>

        <div className="flex-1 overflow-hidden relative z-10 pt-1">
          {/* Vertical list to mimic live updates */}
          <div className="space-y-2.5">
            {feed.map((item, idx) => (
              <div key={idx} className="flex animate-in fade-in slide-in-from-bottom-2 duration-500 gap-2.5 text-[12px] bg-white/60 hover:bg-white px-2.5 py-2 rounded-xl transition-all border border-transparent cursor-pointer group">
                <div className="shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center text-indigo-600 font-bold text-[10px] border border-indigo-200/50 group-hover:scale-110 transition-transform">
                    {item.user.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 leading-snug">
                  <p className="text-slate-600 text-[11px]">
                    <span className="font-semibold text-slate-800">{item.user}</span> {item.action}
                  </p>
                  <p className="font-bold text-indigo-600 mt-0.5 truncate text-[12px] group-hover:text-indigo-500 transition-colors">{item.template}</p>
                </div>
                <div className="shrink-0 text-[10px] text-slate-400 mt-0.5">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-indigo-200/60 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-indigo-900/60 font-medium">
            <Activity className="h-3.5 w-3.5 text-indigo-500" />
            今日创作 <span className="text-indigo-600 font-black text-[13px]">4.5W+</span> 份
          </div>
          <button className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center">去查看 <ArrowRight className="w-3 h-3 ml-0.5"/></button>
        </div>
      </div>

      <div className="relative rounded-2xl bg-gradient-to-b from-blue-100 via-sky-50/35 to-white p-4 flex flex-col overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.03] transform translate-x-2 -translate-y-2 pointer-events-none">
          <Plug2 className="w-24 h-24 text-sky-600" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-white/70 to-white" />

        <div className="mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-sky-400 to-cyan-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              <Plug2 className="h-3.5 w-3.5 text-white" />
            </div>
            <h3 className="font-bold text-sky-950 text-sm">接入方案</h3>
          </div>
        </div>

        <div className="space-y-3 flex-1 pt-1 relative z-10">
          {accessItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                className={`flex w-full items-center gap-3 rounded-2xl border border-white/70 bg-gradient-to-r ${item.cardBg} px-3 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(148,163,184,0.16)]`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${item.iconBg}`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-bold text-slate-800">{item.title}</span>
                  <span className="block text-[10px] font-semibold text-slate-400">{item.desc}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 pt-3 border-t border-sky-200/60 relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-sky-900/60 font-medium">
            <Zap className="h-3.5 w-3.5 text-sky-500" />
            多端接入 <span className="text-sky-600 font-black text-[13px]">3</span> 套
          </div>
        </div>
      </div>

    </div>
  );
}
