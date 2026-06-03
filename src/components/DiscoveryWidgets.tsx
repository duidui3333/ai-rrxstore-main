import { useState, useEffect } from "react";
import { CalendarDays, ArrowRight, Zap, Target, Activity, Clock, Flame } from "lucide-react";
import imgTemplateCover1 from "../assets/images/marketing_template_cover_1_1779935600707.png";
import imgTemplateCover2 from "../assets/images/marketing_template_cover_2_1779935619140.png";
import imgTemplateCover3 from "../assets/images/marketing_template_cover_3_1779935640170.png";
import imgEnvelopeClean from "../assets/images/marketing_envelope_clean_1779861039045.png";
import imgWheelClean from "../assets/images/marketing_wheel_clean_1779861021138.png";
import imgAction from "../assets/images/cat_action_1779523229602.png";

export default function DiscoveryWidgets() {
  const events = [
    { date: "5月1日", name: "劳动节", day: "星期五", color: "text-[#3D63BB]", subColor: "text-[#6C8DCE]", bg: "from-[#eef3fb] to-[#f8faff]", img: imgTemplateCover1 },
    { date: "5月4日", name: "青年节", day: "星期一", color: "text-[#069D7B]", subColor: "text-[#5CB9A4]", bg: "from-[#ecf9f4] to-[#f7fdfb]", img: imgTemplateCover2 },
    { date: "5月5日", name: "立夏", day: "星期二", color: "text-[#378B3F]", subColor: "text-[#6FB175]", bg: "from-[#eff7f0] to-[#f8fbf8]", img: imgTemplateCover3 },
    { date: "5月10日", name: "母亲节", day: "星期日", color: "text-[#DF427C]", subColor: "text-[#E982A9]", bg: "from-[#fdf1f5] to-[#fef8fa]", img: imgAction },
    { date: "5月20日", name: "520表白日", day: "星期三", color: "text-[#F15B8A]", subColor: "text-[#F28BAA]", bg: "from-[#fff0f5] to-[#fff8fb]", img: imgEnvelopeClean },
    { date: "6月1日", name: "儿童节", day: "星期一", color: "text-[#2E7AD7]", subColor: "text-[#6F97E6]", bg: "from-[#eff6ff] to-[#f7fbff]", img: imgWheelClean },
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
    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      
      {/* Widget 1: Hot Calendar with Images (Spans 2 columns on lg, 3 on xl) */}
      <div className="lg:col-span-2 xl:col-span-3 bg-white rounded-2xl p-4 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-orange-500" />
            <h3 className="font-bold text-slate-800 text-sm">热点营销日历</h3>
          </div>
          <button className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1">更多节点 <ArrowRight className="h-3 w-3" /></button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-2">
          {events.map((evt, idx) => (
            <div key={idx} className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${evt.bg} p-3 pb-2 h-[88px] flex group transition-all hover:shadow-md cursor-pointer border border-transparent hover:border-slate-100`}>
              <div className="flex flex-col flex-1 justify-center relative z-10 pr-[72px] pl-2">
                <div className={`text-lg font-bold ${evt.color} mb-1 tracking-wider truncate`}>{evt.name}</div>
                <div className={`text-[12px] font-medium ${evt.subColor} flex items-center gap-1.5 truncate`}>
                  <span>{evt.date}</span>
                  <span>{evt.day}</span>
                </div>
              </div>
              
              {/* The image container */}
              <div className="absolute right-4 bottom-0 w-[64px] h-[74px] bg-white rounded-t-xl p-1 pb-0 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 z-20">
                <img src={evt.img} className="w-full h-full object-cover rounded-t-lg bg-slate-100" alt={evt.name} />
              </div>
            </div>
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

    </div>
  );
}
