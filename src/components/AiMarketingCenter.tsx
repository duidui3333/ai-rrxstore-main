import React, { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { 
  Gamepad2, Search, ArrowLeft, ArrowRight, Play, Eye, Heart, Info, Sparkles, 
  Flame, Clock, TrendingUp, Trophy, Stars, Users, Zap, Shield, 
  LayoutTemplate, Check, HelpCircle, Calendar, X, RotateCcw, Award,
  ScanLine, Share2, Rocket, Layers, BookOpen, Code, Briefcase, MessagesSquare,
  Link, Smartphone, LayoutGrid, Gift, CalendarCheck, CalendarDays, ShoppingBag, FileText, ClipboardList
} from "lucide-react";

import imgMarketingLuckyDraw from "../assets/images/marketing_wheel_scenery_1779869524677.png";
import imgMarketingHoliday from "../assets/images/marketing_holiday_scenery_1779869632454.png";
import imgMarketingEcommerce from "../assets/images/marketing_shop_scenery_1779869547194.png";
import imgMarketingRedEnvelope from "../assets/images/marketing_envelope_scenery_1779869477651.png";
import imgMarketingVoting from "../assets/images/marketing_voting_scenery_1779869568093.png";
import imgMarketingCheckin from "../assets/images/marketing_checkin_scenery_1779869590091.png";
import imgMarketingSurvey from "../assets/images/marketing_survey_scenery_1779869609098.png";
import imgMarketingCarnival from "../assets/images/marketing_carnival_scenery_1779869501774.png";
import imgMarketingFeatured from "../assets/images/marketing_featured_scenery_1779869981910.png";
import imgTemplateCover1 from "../assets/images/marketing_template_cover_1_1779935600707.png";
import imgTemplateCover2 from "../assets/images/marketing_template_cover_2_1779935619140.png";
import imgTemplateCover3 from "../assets/images/marketing_template_cover_3_1779935640170.png";


// Dictionary mapping gameplay categories to sub-playstyles, banners, and descriptions
const CATEGORY_CONFIGS: Record<string, { bannerTitle: string; bannerDesc: string; subPlaystyles: string[]; bannerColor: string; }> = {
  "抽奖营销": { bannerTitle: "抽奖营销专区", bannerDesc: "经典抽奖玩法，大转盘、九宫格，快速吸引用户互动，提升活动热度。", subPlaystyles: ["全部", "大转盘", "九宫格", "盲盒抽奖", "老虎机", "刮刮卡"], bannerColor: "from-pink-500/10 to-rose-500/10 border-rose-100 text-rose-800" },
  "红包营销": { bannerTitle: "红包营销专区", bannerDesc: "红包裂变、雨、拼手气红包，强利益驱动，快速实现拉新与裂变传播。", subPlaystyles: ["全部", "抢红包", "红包雨", "拼手气红包", "口令红包"], bannerColor: "from-violet-500/10 to-indigo-500/10 border-indigo-100 text-indigo-850" },
  "投票评选": { bannerTitle: "投票评选专区", bannerDesc: "结合图片、视频、图文的评选活动，粉丝拉票引发自传播爆发现象。", subPlaystyles: ["全部", "图文投票", "视频投票", "分组投票", "PK赛"], bannerColor: "from-emerald-500/10 to-teal-500/10 border-teal-100 text-teal-850" },
  "裂变营销": { bannerTitle: "裂变营销专区", bannerDesc: "老带新专属武器，拼团、砍价、助力等经典裂变工具，实现指数级增长。", subPlaystyles: ["全部", "砍价", "拼团", "助力", "分销", "邀请有礼"], bannerColor: "from-amber-500/10 to-yellow-600/10 border-yellow-100 text-yellow-850" },
  "签到打卡": { bannerTitle: "签到打卡专区", bannerDesc: "每日签到、习惯养成打卡，连续签到奖励，有效提升用户APP/小程序的开启率与粘性。", subPlaystyles: ["全部", "每日签到", "连续签到", "契约打卡", "早起打卡"], bannerColor: "from-purple-500/10 to-fuchsia-600/10 border-fuchsia-100 text-fuchsia-850" },
  "节日营销": { bannerTitle: "节日营销专区", bannerDesc: "紧贴中外各大节假日热点，包含春节、中秋、情人节等应景营销方案，点燃节日氛围。", subPlaystyles: ["全部", "春节", "元宵节", "情人节", "劳动节", "国庆节", "圣诞节"], bannerColor: "from-orange-500/10 to-red-650/10 border-red-100 text-red-850" },
  "电商支付": { bannerTitle: "电商支付专区", bannerDesc: "购物满减、支付后抽奖、积分兑换，直接打通交易链路，提升客单价与复购率。", subPlaystyles: ["全部", "支付有礼", "满减神券", "积分兑换", "限时秒杀"], bannerColor: "from-cyan-500/10 to-blue-600/10 border-blue-105 text-blue-900" },
  "活动报名": { bannerTitle: "活动报名专区", bannerDesc: "展会、沙龙、各类线下线上活动专属报名通道，结合签到核销一体化管理。", subPlaystyles: ["全部", "会议报名", "讲座预约", "展览预约", "比赛报名"], bannerColor: "from-rose-500/10 to-pink-650/10 border-pink-100 text-pink-900" },
  "问卷调查": { bannerTitle: "问卷调查专区", bannerDesc: "满意度调查、市场调研需求收集，搭配填表领红包/积分，低门槛获客。", subPlaystyles: ["全部", "满意度调查", "产品调研", "NPS问卷", "趣味测评"], bannerColor: "from-blue-400/10 to-cyan-500/10 border-cyan-100 text-cyan-900" },
  "大型活动": { bannerTitle: "大型活动专区", bannerDesc: "为双十一、周年庆量身定制的主会场级营销方案，集多种玩法于大成。", subPlaystyles: ["全部", "周年庆典", "双11狂欢", "双12", "年货节"], bannerColor: "from-indigo-400/10 to-purple-500/10 border-purple-100 text-purple-900" }
};

// Helper function to dynamically map mock templates to category sub-playstyles
const matchSubPlaystyle = (template: any, subPlaystyle: string) => {
  if (subPlaystyle === "全部") return true;
  // Fallback to match elements dynamically to ensure each sub-playstyle page displays at least 2 rows
  return true;
};

// Sidebar categories
const SIDEBAR_ITEMS = [
  { id: "center", name: "营销中心", icon: LayoutGrid, bg: "from-blue-500 to-indigo-600" },
  { id: "抽奖营销", name: "抽奖营销", icon: Gift, bg: "from-pink-500 to-rose-500" },
  { id: "红包营销", name: "红包营销", icon: Gift, bg: "from-violet-500 to-indigo-500" },
  { id: "投票评选", name: "投票评选", icon: Users, bg: "from-emerald-500 to-teal-500" },
  { id: "裂变营销", name: "裂变营销", icon: Share2, bg: "from-amber-400 to-yellow-600" },
  { id: "签到打卡", name: "签到打卡", icon: CalendarCheck, bg: "from-purple-500 to-fuchsia-600" },
  { id: "节日营销", name: "节日营销", icon: CalendarDays, bg: "from-orange-500 to-red-600" },
  { id: "电商支付", name: "电商支付", icon: ShoppingBag, bg: "from-cyan-500 to-blue-600" },
  { id: "活动报名", name: "活动报名", icon: FileText, bg: "from-rose-500 to-pink-600" },
  { id: "问卷调查", name: "问卷调查", icon: ClipboardList, bg: "from-blue-400 to-cyan-500" },
  { id: "大型活动", name: "大型活动", icon: Trophy, bg: "from-indigo-400 to-purple-500" }
];

// Visual cards category data mapping with custom-generated scenario illustration images
const GAMEPLAY_CATEGORIES = [
  { id: "全部", name: "精选", count: 125, desc: "爆款玩法推荐", image: imgMarketingFeatured, bg: "from-blue-50/90 to-white", color: "text-blue-700", subColor: "text-blue-500/85", activeBg: "bg-blue-600", activeTextColor: "text-white", activeSubColor: "text-blue-100", fillColor: "#2563eb" },
  { id: "抽奖营销", name: "抽奖营销", count: 42, desc: "好运大转盘抽不停", image: imgMarketingLuckyDraw, bg: "from-pink-50/90 to-white", color: "text-pink-700", subColor: "text-pink-500/85", activeBg: "bg-[#db2777]", activeTextColor: "text-white", activeSubColor: "text-pink-100", fillColor: "#db2777" },
  { id: "红包营销", name: "红包营销", count: 35, desc: "福利红包刺激转化", image: imgMarketingRedEnvelope, bg: "from-indigo-50/90 to-white", color: "text-indigo-700", subColor: "text-indigo-500/85", activeBg: "bg-indigo-600", activeTextColor: "text-white", activeSubColor: "text-indigo-100", fillColor: "#4f46e5" },
  { id: "投票评选", name: "投票评选", count: 28, desc: "评选拉新促活拉升", image: imgMarketingVoting, bg: "from-emerald-50/90 to-white", color: "text-emerald-700", subColor: "text-emerald-500/85", activeBg: "bg-emerald-600", activeTextColor: "text-white", activeSubColor: "text-emerald-100", fillColor: "#059669" },
  { id: "裂变营销", name: "裂变营销", count: 56, desc: "拉新裂变爆发增长", image: imgMarketingEcommerce, bg: "from-amber-50/90 to-white", color: "text-amber-700", subColor: "text-amber-500/85", activeBg: "bg-amber-600", activeTextColor: "text-white", activeSubColor: "text-amber-100", fillColor: "#d97706" },
  { id: "签到打卡", name: "签到打卡", count: 15, desc: "培养习惯提升留存", image: imgMarketingCheckin, bg: "from-fuchsia-50/90 to-white", color: "text-fuchsia-700", subColor: "text-fuchsia-500/85", activeBg: "bg-fuchsia-600", activeTextColor: "text-white", activeSubColor: "text-fuchsia-100", fillColor: "#c026d3" },
  { id: "节日营销", name: "节日营销", count: 88, desc: "借势营销节点爆发", image: imgMarketingHoliday, bg: "from-purple-50/90 to-white", color: "text-purple-700", subColor: "text-purple-500/85", activeBg: "bg-purple-600", activeTextColor: "text-white", activeSubColor: "text-purple-100", fillColor: "#9333ea" },
  { id: "电商支付", name: "电商支付", count: 32, desc: "促转化支付满减送", image: imgMarketingEcommerce, bg: "from-teal-50/90 to-white", color: "text-teal-700", subColor: "text-teal-500/85", activeBg: "bg-teal-600", activeTextColor: "text-white", activeSubColor: "text-teal-100", fillColor: "#0d9488" },
  { id: "活动报名", name: "活动报名", count: 19, desc: "线上线下高效邀约", image: imgMarketingVoting, bg: "from-orange-50/90 to-white", color: "text-orange-700", subColor: "text-orange-500/85", activeBg: "bg-orange-600", activeTextColor: "text-white", activeSubColor: "text-orange-100", fillColor: "#ea580c" },
  { id: "问卷调查", name: "问卷调查", count: 24, desc: "深入了解用户需求", image: imgMarketingSurvey, bg: "from-blue-50/90 to-white", color: "text-blue-700", subColor: "text-blue-500/85", activeBg: "bg-blue-600", activeTextColor: "text-white", activeSubColor: "text-blue-100", fillColor: "#2563eb" },
  { id: "大型活动", name: "大型活动", count: 11, desc: "超大型品牌定制化", image: imgMarketingCarnival, bg: "from-indigo-50/90 to-white", color: "text-indigo-700", subColor: "text-indigo-500/85", activeBg: "bg-indigo-600", activeTextColor: "text-white", activeSubColor: "text-indigo-100", fillColor: "#4f46e5" }
];

// Content filters
const GAME_TYPES = ["全部", "抽奖营销", "红包营销", "投票评选", "裂变营销", "签到打卡", "节日营销", "电商支付", "活动报名", "问卷调查", "大型活动"];
const GAME_STYLES = ["全部", "科技", "插画", "商务", "简约", "国潮", "卡通", "可爱", "时尚", "清新", "喜庆"];
const SORT_MODES = ["综合排序", "模板热度", "上架时间"];
const FESTIVALS = ["全部", "劳动节", "儿童节", "端午节", "中秋节", "万圣节", "圣诞节"];

// Beautiful Interactive templates with custom diagram/infographic UI definitions
const TEMPLATES_DATA = [
  {
    id: "g1",
    title: "九宫格豪华大转盘",
    type: "抽奖营销",
    style: "时尚",
    scene: "全部",
    hot: 24500,
    time: "2026-05-15",
    colorBg: "from-[#991B1B] via-[#DC2626] to-[#F59E0B]",
    tagText: "九宫格酷炫抽奖 转化率超高",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "8.2%", participants: "154k", difficulty: "★☆☆" },
    chartData: [50, 70, 85, 92, 98]
  },
  {
    id: "g2",
    title: "国潮祈福幸运大转盘",
    type: "抽奖营销",
    style: "国潮",
    scene: "端午节",
    hot: 18900,
    time: "2026-05-10",
    colorBg: "from-[#022C22] via-[#059669] to-[#10B981]",
    tagText: "国风华美转盘 预约即开抽",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "6.9%", participants: "95k", difficulty: "★★☆" },
    chartData: [40, 60, 75, 85, 92]
  },
  {
    id: "g3",
    title: "新春全民瓜分现金红包",
    type: "红包营销",
    style: "喜庆",
    scene: "全部",
    hot: 28900,
    time: "2026-01-15",
    colorBg: "from-[#7F1D1D] via-[#B91C1C] to-[#EF4444]",
    tagText: "好友助力 裂变暴涨",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "12.4%", participants: "320k", difficulty: "★★☆" },
    chartData: [70, 85, 90, 95, 99]
  },
  {
    id: "g4",
    title: "每日拼手气群现金红包",
    type: "红包营销",
    style: "可爱",
    scene: "儿童节",
    hot: 16500,
    time: "2026-05-25",
    colorBg: "from-[#F43F5E] via-[#FB7185] to-[#FDA4AF]",
    tagText: "口令领红包 社群超级促活",
    hasPrize: true,
    percentage: 88,
    stats: { conversions: "5.1%", participants: "82k", difficulty: "★☆☆" },
    chartData: [40, 50, 65, 80, 88]
  },
  {
    id: "g5",
    title: "萌娃才艺评选大赛",
    type: "投票评选",
    style: "卡通",
    scene: "儿童节",
    hot: 21500,
    time: "2026-05-20",
    colorBg: "from-[#1E3A8A] via-[#3B82F6] to-[#60A5FA]",
    tagText: "多维投票 绝佳家长圈社交爆款",
    hasPrize: false,
    percentage: 94,
    stats: { conversions: "7.8%", participants: "185k", difficulty: "★★☆" },
    chartData: [50, 65, 80, 90, 94]
  },
  {
    id: "g6",
    title: "优秀摄影作品票选活动",
    type: "投票评选",
    style: "简约",
    scene: "全部",
    hot: 14800,
    time: "2026-03-10",
    colorBg: "from-[#0F172A] via-[#1E293B] to-[#475569]",
    tagText: "高雅质感画廊 彰显品牌审美",
    hasPrize: false,
    percentage: 83,
    stats: { conversions: "4.2%", participants: "51k", difficulty: "★☆☆" },
    chartData: [30, 45, 60, 75, 83]
  },
  {
    id: "g7",
    title: "好友砍价狂欢神券免费领",
    type: "裂变营销",
    style: "商务",
    scene: "全部",
    hot: 23000,
    time: "2026-04-18",
    colorBg: "from-[#1E1B4B] via-[#4338CA] to-[#6366F1]",
    tagText: "裂变刀刀见血 秒杀客流巅峰",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "9.5%", participants: "210k", difficulty: "★★★" },
    chartData: [50, 70, 85, 92, 96]
  },
  {
    id: "g8",
    title: "拼团抢购超值豪礼方案",
    type: "裂变营销",
    style: "时尚",
    scene: "全部",
    hot: 19600,
    time: "2026-02-15",
    colorBg: "from-[#311042] via-[#701A75] to-[#A21CAF]",
    tagText: "老带新专属 快速裂变拓客",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.7%", participants: "105k", difficulty: "★★☆" },
    chartData: [40, 55, 70, 85, 91]
  },
  {
    id: "g9",
    title: "21天早起成长习惯打卡",
    type: "签到打卡",
    style: "清新",
    scene: "全部",
    hot: 17800,
    time: "2026-04-05",
    colorBg: "from-[#064E3B] via-[#059669] to-[#34D399]",
    tagText: "高留存日课 提升App次留与粘性",
    hasPrize: true,
    percentage: 90,
    stats: { conversions: "6.2%", participants: "88k", difficulty: "★★☆" },
    chartData: [30, 50, 70, 85, 90]
  },
  {
    id: "g10",
    title: "连续签到领高额无门槛券",
    type: "签到打卡",
    style: "可爱",
    scene: "全部",
    hot: 15200,
    time: "2026-05-28",
    colorBg: "from-[#7C2D12] via-[#C2410C] to-[#F97316]",
    tagText: "递进式奖励 签到第三天送豪礼",
    hasPrize: true,
    percentage: 85,
    stats: { conversions: "4.9%", participants: "64k", difficulty: "★☆☆" },
    chartData: [30, 45, 60, 75, 85]
  },
  {
    id: "g11",
    title: "圣诞老人送福惊喜袜派对",
    type: "节日营销",
    style: "卡通",
    scene: "圣诞节",
    hot: 25000,
    time: "2026-12-10",
    colorBg: "from-[#111827] via-[#1E1B4B] to-[#701A75]",
    tagText: "圣诞氛围拉满 开启神秘圣诞惊喜",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "8.9%", participants: "198k", difficulty: "★★☆" },
    chartData: [55, 70, 85, 92, 97]
  },
  {
    id: "g12",
    title: "粽香祈福端午配香囊",
    type: "节日营销",
    style: "国潮",
    scene: "端午节",
    hot: 18200,
    time: "2026-05-30",
    colorBg: "from-[#0F172A] via-[#0F766E] to-[#14B8A6]",
    tagText: "亲手制作端午香囊 祈福安康送大礼",
    hasPrize: true,
    percentage: 89,
    stats: { conversions: "5.4%", participants: "76k", difficulty: "★★★" },
    chartData: [35, 50, 65, 80, 89]
  },
  {
    id: "g13",
    title: "消费满返超值幸运大抽奖",
    type: "电商支付",
    style: "时尚",
    scene: "全部",
    hot: 29500,
    time: "2026-11-01",
    colorBg: "from-[#1E1B4B] via-[#4F46E5] to-[#EC4899]",
    tagText: "提升客单价 首选支付后抽现金红包",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "14.2%", participants: "450k", difficulty: "★☆☆" },
    chartData: [60, 75, 85, 95, 99]
  },
  {
    id: "g14",
    title: "商户积分趣味秒杀兑换中心",
    type: "电商支付",
    style: "商务",
    scene: "全部",
    hot: 16400,
    time: "2026-02-28",
    colorBg: "from-[#0F172A] via-[#334155] to-[#64748B]",
    tagText: "激活沉睡用户 零成本盘活会员积分",
    hasPrize: false,
    percentage: 86,
    stats: { conversions: "4.5%", participants: "90k", difficulty: "★★☆" },
    chartData: [30, 45, 60, 75, 86]
  },
  {
    id: "g15",
    title: "AI沙龙学术年会预约报名",
    type: "活动报名",
    style: "科技",
    scene: "全部",
    hot: 14100,
    time: "2026-05-08",
    colorBg: "from-[#0F172A] via-[#1E1B4B] to-[#2563EB]",
    tagText: "高雅科技风格 智能核销全能预约",
    hasPrize: false,
    percentage: 82,
    stats: { conversions: "3.2%", participants: "24k", difficulty: "★☆☆" },
    chartData: [40, 50, 60, 72, 82]
  },
  // --- New Templates to ensure at least 2 rows (8 items) per category/playstyle ---
  // 抽奖营销
  {
    id: "g16",
    title: "国潮大促幸运转盘",
    type: "抽奖营销",
    style: "国潮",
    scene: "全部",
    hot: 21000,
    time: "2026-05-20",
    colorBg: "from-[#7F1D1D] via-[#B91C1C] to-[#F59E0B]",
    tagText: "经典国潮风 打造大促爆品销量",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "7.1%", participants: "115k", difficulty: "★☆☆" },
    chartData: [45, 60, 75, 88, 95]
  },
  {
    id: "g17",
    title: "赛博霓虹扭蛋机",
    type: "抽奖营销",
    style: "科技",
    scene: "全部",
    hot: 19500,
    time: "2026-05-18",
    colorBg: "from-[#111827] via-[#1E1B4B] to-[#3B82F6]",
    tagText: "3D扭蛋极速爆款 感官炸裂体验",
    hasPrize: true,
    percentage: 90,
    stats: { conversions: "5.8%", participants: "89k", difficulty: "★★☆" },
    chartData: [35, 50, 70, 80, 90]
  },
  {
    id: "g18",
    title: "端午安康掷粽子抽奖",
    type: "抽奖营销",
    style: "国潮",
    scene: "端午节",
    hot: 22400,
    time: "2026-05-25",
    colorBg: "from-[#022C22] via-[#059669] to-[#F59E0B]",
    tagText: "传统糯米奇趣挑战 积分疯狂送",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "6.9%", participants: "103k", difficulty: "★☆☆" },
    chartData: [40, 58, 75, 85, 94]
  },
  {
    id: "g19",
    title: "极简商务开箱惊喜",
    type: "抽奖营销",
    style: "商务",
    scene: "全部",
    hot: 15300,
    time: "2026-03-12",
    colorBg: "from-slate-900 via-slate-700 to-slate-400",
    tagText: "白领专属轻感设计 兑券极速流转",
    hasPrize: false,
    percentage: 81,
    stats: { conversions: "3.1%", participants: "40k", difficulty: "★☆☆" },
    chartData: [20, 38, 55, 68, 81]
  },
  {
    id: "g20",
    title: "中秋探月玉兔刮刮卡",
    type: "抽奖营销",
    style: "可爱",
    scene: "中秋节",
    hot: 20800,
    time: "2026-09-15",
    colorBg: "from-indigo-950 via-[#311042] to-amber-500",
    tagText: "童真可爱小动物刮卡 惊喜超高拉新",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "5.5%", participants: "90k", difficulty: "★☆☆" },
    chartData: [35, 55, 72, 84, 92]
  },
  {
    id: "g21",
    title: "万圣节南瓜糖果转盘",
    type: "抽奖营销",
    style: "卡通",
    scene: "万圣节",
    hot: 16900,
    time: "2026-10-25",
    colorBg: "from-[#311042] via-purple-900 to-amber-600",
    tagText: "不给糖就捣蛋 节日限时疯狂秒抽",
    hasPrize: false,
    percentage: 84,
    stats: { conversions: "3.3%", participants: "48k", difficulty: "★★☆" },
    chartData: [25, 42, 58, 70, 84]
  },
  // 红包营销
  {
    id: "g22",
    title: "国味新春天降红包雨",
    type: "红包营销",
    style: "喜庆",
    scene: "全部",
    hot: 28550,
    time: "2026-01-20",
    colorBg: "from-red-950 via-red-700 to-yellow-500",
    tagText: "极度喜庆满屏红包 转化立竿见影",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "13.2%", participants: "380k", difficulty: "★☆☆" },
    chartData: [60, 78, 90, 96, 99]
  },
  {
    id: "g23",
    title: "科技引流瓜分现金池",
    type: "红包营销",
    style: "科技",
    scene: "全部",
    hot: 21100,
    time: "2026-05-14",
    colorBg: "from-slate-900 via-indigo-950 to-cyan-500",
    tagText: "未来风格AI助力 神仙抢包体验",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "6.4%", participants: "115k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 86, 93]
  },
  {
    id: "g24",
    title: "儿童节小熊派红包",
    type: "红包营销",
    style: "可爱",
    scene: "儿童节",
    hot: 19200,
    time: "2026-05-28",
    colorBg: "from-pink-600 via-pink-400 to-yellow-300",
    tagText: "萌动可爱卡通形象 激活全网童心",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.1%", participants: "88k", difficulty: "★☆☆" },
    chartData: [40, 55, 70, 82, 91]
  },
  {
    id: "g25",
    title: "端午龙舟送福大红包",
    type: "红包营销",
    style: "国潮",
    scene: "端午节",
    hot: 22000,
    time: "2026-05-18",
    colorBg: "from-emerald-950 via-emerald-800 to-amber-500",
    tagText: "龙船竞渡豪迈送礼 结合品牌分销",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "7.8%", participants: "120k", difficulty: "★★☆" },
    chartData: [45, 65, 80, 90, 95]
  },
  {
    id: "g26",
    title: "简约商务答谢群红包",
    type: "红包营销",
    style: "简约",
    scene: "全部",
    hot: 15400,
    time: "2026-04-10",
    colorBg: "from-slate-800 via-slate-600 to-slate-400",
    tagText: "极致冷风格 专为高端峰会定制",
    hasPrize: false,
    percentage: 79,
    stats: { conversions: "2.4%", participants: "32k", difficulty: "★☆☆" },
    chartData: [20, 35, 52, 65, 79]
  },
  {
    id: "g27",
    title: "劳动节致敬奋斗者红包",
    type: "红包营销",
    style: "清新",
    scene: "劳动节",
    hot: 17800,
    time: "2026-04-28",
    colorBg: "from-amber-900 via-emerald-800 to-emerald-500",
    tagText: "汗水凝聚硕果 关怀礼包普惠下发",
    hasPrize: true,
    percentage: 88,
    stats: { conversions: "4.0%", participants: "62k", difficulty: "★☆☆" },
    chartData: [30, 48, 65, 76, 88]
  },
  // 投票评选
  {
    id: "g28",
    title: "群雄逐鹿萌娃摄影选拔",
    type: "投票评选",
    style: "可爱",
    scene: "全部",
    hot: 21900,
    time: "2026-05-24",
    colorBg: "from-pink-900 via-rose-500 to-amber-500",
    tagText: "超红人气萌娃大赛 吸引跨代裂变",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "8.1%", participants: "140k", difficulty: "★★☆" },
    chartData: [50, 68, 80, 92, 96]
  },
  {
    id: "g29",
    title: "科技力量新锐百强评选",
    type: "投票评选",
    style: "科技",
    scene: "全部",
    hot: 18700,
    time: "2026-05-18",
    colorBg: "from-[#0F172A] via-[#1E1B4B] to-emerald-600",
    tagText: "AI加码 独立防刷机制与实名联动",
    hasPrize: false,
    percentage: 89,
    stats: { conversions: "4.5%", participants: "85k", difficulty: "★★★" },
    chartData: [35, 52, 68, 80, 89]
  },
  {
    id: "g30",
    title: "美德青年劳动之星候选",
    type: "投票评选",
    style: "简雅",
    scene: "劳动节",
    hot: 16200,
    time: "2026-04-30",
    colorBg: "from-slate-900 via-amber-900 to-amber-500",
    tagText: "寻找身边最美面孔 官方权威发布",
    hasPrize: false,
    percentage: 83,
    stats: { conversions: "3.2%", participants: "51k", difficulty: "★☆☆" },
    chartData: [20, 40, 58, 70, 83]
  },
  {
    id: "g31",
    title: "端午节风光国潮摄影展",
    type: "投票评选",
    style: "国潮",
    scene: "端午节",
    hot: 19900,
    time: "2026-05-20",
    colorBg: "from-[#022C22] via-[#059669] to-[#10B981]",
    tagText: "粽意漫漫 国画诗意风光评选展",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.2%", participants: "92k", difficulty: "★★☆" },
    chartData: [40, 55, 72, 83, 91]
  },
  {
    id: "g32",
    title: "儿童节萌宠大赛狂欢",
    type: "投票评选",
    style: "可爱",
    scene: "儿童节",
    hot: 20150,
    time: "2026-05-29",
    colorBg: "from-[#4C0519] via-pink-600 to-indigo-600",
    tagText: "最萌铲屎官PK 携手各大宠物商联办",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "6.0%", participants: "108k", difficulty: "★☆☆" },
    chartData: [45, 60, 75, 87, 93]
  },
  {
    id: "g33",
    title: "极简商务团队明星选举",
    type: "投票评选",
    style: "简约",
    scene: "全部",
    hot: 14500,
    time: "2026-03-15",
    colorBg: "from-slate-900 via-zinc-800 to-slate-400",
    tagText: "无干扰投递 深度契合商企年会",
    hasPrize: false,
    percentage: 78,
    stats: { conversions: "2.1%", participants: "29k", difficulty: "★☆☆" },
    chartData: [15, 32, 48, 62, 78]
  },
  // 裂变营销
  {
    id: "g34",
    title: "全民拼单享史低价狂欢",
    type: "裂变营销",
    style: "时尚",
    scene: "全部",
    hot: 24900,
    time: "2026-05-16",
    colorBg: "from-[#991B1B] via-rose-600 to-amber-500",
    tagText: "社交圈裂变拼客 实锤拉升销量",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "9.2%", participants: "175k", difficulty: "★★☆" },
    chartData: [50, 72, 85, 92, 97]
  },
  {
    id: "g35",
    title: "赛博引力好友千人砍价",
    type: "裂变营销",
    style: "科技",
    scene: "全部",
    hot: 21200,
    time: "2026-05-11",
    colorBg: "from-[#0F172A] via-indigo-950 to-blue-500",
    tagText: "能量球汇合 酷炫科幻高转介绍",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "6.1%", participants: "110k", difficulty: "★★☆" },
    chartData: [40, 58, 72, 84, 92]
  },
  {
    id: "g36",
    title: "端午合力包超级大龙粽",
    type: "裂变营销",
    style: "国潮",
    scene: "端午节",
    hot: 20500,
    time: "2026-05-21",
    colorBg: "from-[#022C22] via-[#0D9488] to-[#10B981]",
    tagText: "龙船合包 齐心合力共领豪华提货券",
    hasPrize: true,
    percentage: 90,
    stats: { conversions: "5.5%", participants: "95k", difficulty: "★★☆" },
    chartData: [35, 52, 70, 82, 90]
  },
  {
    id: "g37",
    title: "儿童节寻宝总动员拼图",
    type: "裂变营销",
    style: "可爱",
    scene: "儿童节",
    hot: 19800,
    time: "2026-05-27",
    colorBg: "from-pink-600 via-fuchsia-500 to-yellow-400",
    tagText: "集卡拼图 妈妈圈高热转发神作",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "6.8%", participants: "102k", difficulty: "★☆☆" },
    chartData: [45, 60, 75, 88, 94]
  },
  {
    id: "g38",
    title: "极简纯白好友能量助推",
    type: "裂变营销",
    style: "简约",
    scene: "全部",
    hot: 16100,
    time: "2026-02-18",
    colorBg: "from-slate-900 via-slate-700 to-slate-400",
    tagText: "几何力学 美学极致 带来海量留存",
    hasPrize: false,
    percentage: 82,
    stats: { conversions: "3.2%", participants: "45k", difficulty: "★☆☆" },
    chartData: [25, 42, 58, 72, 82]
  },
  {
    id: "g39",
    title: "双十一超级满减好友券",
    type: "裂变营销",
    style: "喜庆",
    scene: "全部",
    hot: 27100,
    time: "2026-11-01",
    colorBg: "from-red-800 via-red-600 to-amber-500",
    tagText: "狂欢预热 分享合砍大面额神券",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "11.1%", participants: "295k", difficulty: "★★☆" },
    chartData: [55, 75, 88, 93, 98]
  },
  // 签到打卡
  {
    id: "g40",
    title: "30天知识成长星球打卡",
    type: "签到打卡",
    style: "科技",
    scene: "全部",
    hot: 19600,
    time: "2026-05-21",
    colorBg: "from-slate-950 via-blue-950 to-indigo-600",
    tagText: "科幻太空舱 开启每日学习新能级",
    hasPrize: false,
    percentage: 89,
    stats: { conversions: "4.8%", participants: "92k", difficulty: "★★★" },
    chartData: [35, 52, 68, 80, 89]
  },
  {
    id: "g41",
    title: "国潮养生每日打卡挑战",
    type: "签到打卡",
    style: "国潮",
    scene: "端午节",
    hot: 18400,
    time: "2026-05-22",
    colorBg: "from-[#022C22] via-[#0D9488] to-amber-500",
    tagText: "手绘古典中医 每日调养积累神券",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.4%", participants: "80k", difficulty: "★★☆" },
    chartData: [40, 58, 72, 85, 91]
  },
  {
    id: "g42",
    title: "劳动节拼搏打卡得礼遇",
    type: "签到打卡",
    style: "清新",
    scene: "劳动节",
    hot: 17200,
    time: "2026-04-25",
    colorBg: "from-amber-900 via-emerald-800 to-emerald-500",
    tagText: "五一假期不间断 打卡致敬新时代",
    hasPrize: true,
    percentage: 86,
    stats: { conversions: "3.9%", participants: "59k", difficulty: "★★☆" },
    chartData: [28, 45, 60, 75, 86]
  },
  {
    id: "g43",
    title: "儿童节欢乐成长连续签到",
    type: "签到打卡",
    style: "可爱",
    scene: "儿童节",
    hot: 18900,
    time: "2026-05-26",
    colorBg: "from-pink-600 via-purple-600 to-yellow-400",
    tagText: "童心伴你天天见 累积积分换好物",
    hasPrize: true,
    percentage: 90,
    stats: { conversions: "4.7%", participants: "83k", difficulty: "★☆☆" },
    chartData: [30, 50, 68, 80, 90]
  },
  {
    id: "g44",
    title: "极简灰色深度思考打卡",
    type: "签到打卡",
    style: "简约",
    scene: "全部",
    hot: 14800,
    time: "2026-03-30",
    colorBg: "from-slate-900 via-slate-700 to-neutral-400",
    tagText: "无干扰纯文字打卡 培养高粘度用户",
    hasPrize: false,
    percentage: 81,
    stats: { conversions: "2.8%", participants: "38k", difficulty: "★☆☆" },
    chartData: [20, 38, 55, 68, 81]
  },
  {
    id: "g45",
    title: "圣诞极光暖心连续打卡",
    type: "签到打卡",
    style: "喜庆",
    scene: "圣诞节",
    hot: 23200,
    time: "2026-12-15",
    colorBg: "from-red-950 via-emerald-950 to-emerald-500",
    tagText: "冬日浪漫打卡 极光之夜终极兑大奖",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "6.8%", participants: "118k", difficulty: "★★☆" },
    chartData: [45, 62, 78, 88, 95]
  },
  // 节日营销
  {
    id: "g46",
    title: "端午吃香粽迎财运集福",
    type: "节日营销",
    style: "国潮",
    scene: "端午节",
    hot: 22600,
    time: "2026-05-23",
    colorBg: "from-[#022C22] via-[#059669] to-[#F59E0B]",
    tagText: "全网包粽子PK 共享千万特产福利",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "7.4%", participants: "125k", difficulty: "★☆☆" },
    chartData: [50, 68, 82, 90, 96]
  },
  {
    id: "g47",
    title: "中秋浪漫赏月寄相思",
    type: "节日营销",
    style: "插画",
    scene: "中秋节",
    hot: 20900,
    time: "2026-09-12",
    colorBg: "from-indigo-950 via-[#581C87] to-amber-500",
    tagText: "花好月圆 测一测你的中秋守护诗",
    hasPrize: false,
    percentage: 91,
    stats: { conversions: "5.1%", participants: "96k", difficulty: "★☆☆" },
    chartData: [35, 55, 72, 83, 91]
  },
  {
    id: "g48",
    title: "万圣节百鬼狂欢化装舞会",
    type: "节日营销",
    style: "卡通",
    scene: "万圣节",
    hot: 18105,
    time: "2026-10-28",
    colorBg: "from-stone-900 via-amber-950 to-orange-600",
    tagText: "搞怪换装大片 晒出你的神秘怪妆",
    hasPrize: true,
    percentage: 88,
    stats: { conversions: "4.1%", participants: "68k", difficulty: "★★☆" },
    chartData: [30, 48, 62, 75, 88]
  },
  {
    id: "g49",
    title: "劳动节辛勤耕耘线上灌溉",
    type: "节日营销",
    style: "清新",
    scene: "劳动节",
    hot: 18450,
    time: "2026-04-26",
    colorBg: "from-[#0F2F1D] via-emerald-800 to-amber-500",
    tagText: "虚拟庄稼种麦子 收获真实满减神券",
    hasPrize: true,
    percentage: 90,
    stats: { conversions: "4.8%", participants: "89k", difficulty: "★★☆" },
    chartData: [35, 52, 70, 82, 90]
  },
  {
    id: "g50",
    title: "儿童节积木城堡拼接大赛",
    type: "节日营销",
    style: "卡通",
    scene: "儿童节",
    hot: 19950,
    time: "2026-05-27",
    colorBg: "from-sky-700 via-sky-500 to-amber-400",
    tagText: "七彩拼图城堡 高阶宝妈群裂变爆发",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "5.7%", participants: "105k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 85, 93]
  },
  {
    id: "g51",
    title: "新春拜年AI智能送祝福",
    type: "节日营销",
    style: "喜庆",
    scene: "全部",
    hot: 26900,
    time: "2026-01-22",
    colorBg: "from-rose-900 via-[#DC2626] to-[#F59E0B]",
    tagText: "写拜年词生成绝美中国风画券",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "10.4%", participants: "280k", difficulty: "★★☆" },
    chartData: [55, 72, 85, 93, 98]
  },
  // 电商支付
  {
    id: "g52",
    title: "双11大牌满减极速预订",
    type: "电商支付",
    style: "时尚",
    scene: "全部",
    hot: 25800,
    time: "2026-11-02",
    colorBg: "from-red-950 via-rose-700 to-amber-500",
    tagText: "支付享立减 极速预约下定锁特权",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "8.9%", participants: "192k", difficulty: "★★★" },
    chartData: [50, 70, 85, 92, 98]
  },
  {
    id: "g53",
    title: "消费抽奖幸运翻牌大赢家",
    type: "电商支付",
    style: "奢华",
    scene: "全部",
    hot: 22100,
    time: "2026-05-24",
    colorBg: "from-[#311042] via-[#581C87] to-[#EC4899]",
    tagText: "支付即可抽奖 连中神券提升复刷率",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "6.8%", participants: "131k", difficulty: "★★☆" },
    chartData: [40, 60, 78, 88, 94]
  },
  {
    id: "g54",
    title: "端午香囊满返秒杀狂欢",
    type: "电商支付",
    style: "国潮",
    scene: "端午节",
    hot: 19800,
    time: "2026-05-18",
    colorBg: "from-[#022C22] via-[#059669] to-[#0D9488]",
    tagText: "支付满折 赠品线上提货物流到家",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "5.4%", participants: "90k", difficulty: "★★☆" },
    chartData: [35, 52, 70, 82, 92]
  },
  {
    id: "g55",
    title: "儿童节全场萌潮玩具满送",
    type: "电商支付",
    style: "可爱",
    scene: "儿童节",
    hot: 20400,
    time: "2026-05-27",
    colorBg: "from-pink-600 via-purple-600 to-yellow-400",
    tagText: "支付直接返还成长礼金 留住家庭群",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "6.1%", participants: "99k", difficulty: "★☆☆" },
    chartData: [45, 60, 75, 85, 93]
  },
  {
    id: "g56",
    title: "极简商务支付抽现返款",
    type: "电商支付",
    style: "简约",
    scene: "全部",
    hot: 16900,
    time: "2026-04-15",
    colorBg: "from-slate-900 via-slate-700 to-slate-400",
    tagText: "轻奢线条 笔触流畅 带来纯净质感",
    hasPrize: false,
    percentage: 81,
    stats: { conversions: "3.2%", participants: "42k", difficulty: "★★☆" },
    chartData: [20, 40, 58, 70, 81]
  },
  {
    id: "g57",
    title: "万圣节糖果积分超值狂抢",
    type: "电商支付",
    style: "卡通",
    scene: "万圣节",
    hot: 15400,
    time: "2026-10-26",
    colorBg: "from-zinc-950 via-[#4C0519] to-orange-550",
    tagText: "万能鬼怪市集 满件特惠与折换全攻略",
    hasPrize: false,
    percentage: 80,
    stats: { conversions: "2.5%", participants: "38k", difficulty: "★☆☆" },
    chartData: [15, 32, 50, 65, 80]
  },
  // 活动报名
  {
    id: "g58",
    title: "大咖云集极智开发者沙龙",
    type: "活动报名",
    style: "科技",
    scene: "全部",
    hot: 17200,
    time: "2026-05-15",
    colorBg: "from-slate-950 via-zinc-900 to-blue-600",
    tagText: "面向极智先锋 线上预约实联派票",
    hasPrize: false,
    percentage: 89,
    stats: { conversions: "4.2%", participants: "30k", difficulty: "★★☆" },
    chartData: [30, 48, 65, 78, 89]
  },
  {
    id: "g59",
    title: "国粉汉服盛典端午鉴赏会",
    type: "活动报名",
    style: "国潮",
    scene: "端午节",
    hot: 18900,
    time: "2026-05-19",
    colorBg: "from-[#451A03] via-[#78350F] to-[#10B981]",
    tagText: "汉服国乐雅集 线上预约实收限定周边",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.2%", participants: "58k", difficulty: "★☆☆" },
    chartData: [40, 55, 72, 83, 91]
  },
  {
    id: "g60",
    title: "劳动之光美德训练营活动",
    type: "活动报名",
    style: "清新",
    scene: "劳动节",
    hot: 16500,
    time: "2026-04-24",
    colorBg: "from-amber-900 via-emerald-800 to-emerald-500",
    tagText: "青年志愿者营 招募一键申请并录像",
    hasPrize: false,
    percentage: 84,
    stats: { conversions: "3.5%", participants: "40k", difficulty: "★☆☆" },
    chartData: [25, 42, 58, 70, 84]
  },
  {
    id: "g61",
    title: "可爱夏日海洋球游园会",
    type: "活动报名",
    style: "可爱",
    scene: "儿童节",
    hot: 19800,
    time: "2026-05-28",
    colorBg: "from-rose-600 via-purple-600 to-sky-400",
    tagText: "亲子水上城堡 限时优惠定坑预约",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "5.9%", participants: "72k", difficulty: "★☆☆" },
    chartData: [45, 60, 75, 86, 93]
  },
  {
    id: "g62",
    title: "极简纯白企业财税研讨会",
    type: "活动报名",
    style: "电脑",
    scene: "全部",
    hot: 14500,
    time: "2026-03-24",
    colorBg: "from-slate-900 via-slate-700 to-slate-400",
    tagText: "专业研讨预约 自动推送AI参会指南",
    hasPrize: false,
    percentage: 80,
    stats: { conversions: "2.8%", participants: "20k", difficulty: "★★☆" },
    chartData: [20, 38, 55, 68, 80]
  },
  {
    id: "g63",
    title: "圣诞老人雪地越野赛报名",
    type: "活动报名",
    style: "喜庆",
    scene: "圣诞节",
    hot: 21200,
    time: "2026-12-10",
    colorBg: "from-red-950 via-emerald-950 to-emerald-500",
    tagText: "冬日活力越野 选手极速通道认证",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "6.4%", participants: "65k", difficulty: "★★☆" },
    chartData: [40, 58, 75, 86, 95]
  },
  {
    id: "g64",
    title: "万圣节鬼怪剧本杀之约",
    type: "活动报名",
    style: "卡通",
    scene: "万圣节",
    hot: 15400,
    time: "2026-10-25",
    colorBg: "from-zinc-950 via-purple-950 to-orange-650",
    tagText: "一键拼车组队 线上定金即赠糖果礼",
    hasPrize: false,
    percentage: 82,
    stats: { conversions: "3.0%", participants: "32k", difficulty: "★★☆" },
    chartData: [20, 35, 52, 68, 82]
  },
  // 问卷调查
  {
    id: "g65",
    title: "智能商户服务质量满意度",
    type: "问卷调查",
    style: "商务",
    scene: "全部",
    hot: 18900,
    time: "2026-05-18",
    colorBg: "from-[#0F172A] via-[#1E293B] to-[#3B82F6]",
    tagText: "商户一站式NPS评测 赢取会员特权",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.5%", participants: "80k", difficulty: "★☆☆" },
    chartData: [40, 58, 72, 83, 91]
  },
  {
    id: "g66",
    title: "智能产品功能期待调研",
    type: "问卷调查",
    style: "科技",
    scene: "全部",
    hot: 20100,
    time: "2026-05-15",
    colorBg: "from-slate-900 via-indigo-950 to-emerald-600",
    tagText: "极客新风期待 积分回馈忠诚用户",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "6.2%", participants: "95k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 86, 93]
  },
  {
    id: "g67",
    title: "汉服国学文化喜爱度普查",
    type: "问卷调查",
    style: "国潮",
    scene: "全部",
    hot: 17200,
    time: "2026-05-10",
    colorBg: "from-[#451A03] via-[#9A3412] to-yellow-600",
    tagText: "赏古玩、谈文学，填表即领现金红包",
    hasPrize: true,
    percentage: 87,
    stats: { conversions: "4.1%", participants: "60k", difficulty: "★☆☆" },
    chartData: [30, 48, 62, 75, 87]
  },
  {
    id: "g68",
    title: "端午习俗文化端午卷",
    type: "问卷调查",
    style: "国潮",
    scene: "端午节",
    hot: 18500,
    time: "2026-05-19",
    colorBg: "from-[#022C22] via-[#047857] to-[#10B981]",
    tagText: "传统节日文化调研，包粽子玩法关联",
    hasPrize: true,
    percentage: 89,
    stats: { conversions: "4.9%", participants: "72k", difficulty: "★☆☆" },
    chartData: [35, 52, 68, 80, 89]
  },
  {
    id: "g69",
    title: "亲子玩具消费偏好大侦探",
    type: "问卷调查",
    style: "可爱",
    scene: "儿童节",
    hot: 19100,
    time: "2026-05-27",
    colorBg: "from-pink-600 via-purple-600 to-yellow-400",
    tagText: "妈妈群意见征集 兑换正版卡通拼图",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "5.8%", participants: "88k", difficulty: "★☆☆" },
    chartData: [40, 55, 72, 82, 92]
  },
  {
    id: "g70",
    title: "极简轻生活问答测试",
    type: "问卷调查",
    style: "简约",
    scene: "全部",
    hot: 14200,
    time: "2026-03-12",
    colorBg: "from-slate-900 via-slate-700 to-slate-400",
    tagText: "无复杂元素 专心收集最优质答案",
    hasPrize: false,
    percentage: 79,
    stats: { conversions: "2.5%", participants: "30k", difficulty: "★☆☆" },
    chartData: [15, 30, 48, 62, 79]
  },
  {
    id: "g71",
    title: "万圣节幽灵市集满意度",
    type: "问卷调查",
    style: "卡通",
    scene: "万圣节",
    hot: 15150,
    time: "2026-10-26",
    colorBg: "from-zinc-950 via-purple-950 to-orange-650",
    tagText: "奇幻庄园意见连连，回响大抽豪礼",
    hasPrize: false,
    percentage: 81,
    stats: { conversions: "2.9%", participants: "40k", difficulty: "★☆☆" },
    chartData: [20, 38, 52, 68, 81]
  },
  {
    id: "g72",
    title: "圣诞嘉年华精彩返图有礼",
    type: "问卷调查",
    style: "喜庆",
    scene: "圣诞节",
    hot: 22100,
    time: "2026-12-26",
    colorBg: "from-red-950 via-emerald-950 to-emerald-500",
    tagText: "感恩反馈 收集冬日快乐印记",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "6.5%", participants: "110k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 85, 94]
  },
  // 大型活动
  {
    id: "g73",
    title: "双十一星光宇宙狂欢节",
    type: "大型活动",
    style: "科技",
    scene: "全部",
    hot: 29900,
    time: "2026-11-01",
    colorBg: "from-[#1E1B4B] via-[#4338CA] to-pink-500",
    tagText: "全功能超级主会场 折算核销满减全套",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "14.8%", participants: "650k", difficulty: "★★★" },
    chartData: [70, 85, 92, 96, 99]
  },
  {
    id: "g74",
    title: "企业十周年璀璨岁月盛典",
    type: "大型活动",
    style: "喜庆",
    scene: "全部",
    hot: 24700,
    time: "2026-05-18",
    colorBg: "from-[#451A03] via-amber-800 to-amber-500",
    tagText: "黄金年代时光隧道 联动积分充值和回馈",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "9.5%", participants: "180k", difficulty: "★★★" },
    chartData: [55, 75, 88, 94, 97]
  },
  {
    id: "g75",
    title: "百舸争流端午星级博览",
    type: "大型活动",
    style: "国潮",
    scene: "端午节",
    hot: 21900,
    time: "2026-05-20",
    colorBg: "from-[#022C22] via-[#059669] to-cyan-500",
    tagText: "水上文化博览 集合了投票、抢红包玩法",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "7.2%", participants: "115k", difficulty: "★★★" },
    chartData: [45, 62, 78, 88, 94]
  },
  {
    id: "g76",
    title: "国潮大赏年货巅峰集结",
    type: "大型活动",
    style: "国潮",
    scene: "全部",
    hot: 26800,
    time: "2026-01-15",
    colorBg: "from-red-950 via-red-600 to-amber-500",
    tagText: "红红火火年货大促 精选大拼盘合家欢",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "11.5%", participants: "290k", difficulty: "★★★" },
    chartData: [60, 78, 88, 93, 98]
  },
  {
    id: "g77",
    title: "夏日避暑清凉海洋嘉年华",
    type: "大型活动",
    style: "清新",
    scene: "儿童节",
    hot: 21500,
    time: "2026-05-28",
    colorBg: "from-[#032B2F] via-teal-800 to-sky-400",
    tagText: "集福迎夏 适合儿童娱乐与消费引导",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "6.8%", participants: "112k", difficulty: "★★☆" },
    chartData: [40, 58, 75, 86, 93]
  },
  {
    id: "g78",
    title: "极简冷酷白领理财峰会",
    type: "大型活动",
    style: "简约",
    scene: "全部",
    hot: 15800,
    time: "2026-03-22",
    colorBg: "from-slate-900 via-slate-700 to-slate-400",
    tagText: "高客单理财沙龙 全程AI智慧向导签到",
    hasPrize: false,
    percentage: 82,
    stats: { conversions: "3.5%", participants: "35k", difficulty: "★★★" },
    chartData: [30, 48, 62, 72, 82]
  },
  {
    id: "g79",
    title: "万圣节南瓜迷城探索行",
    type: "大型活动",
    style: "卡通",
    scene: "万圣节",
    hot: 17400,
    time: "2026-10-26",
    colorBg: "from-zinc-950 via-purple-950 to-orange-655",
    tagText: "探寻古堡遗梦 百鬼抓捕集换大促狂欢",
    hasPrize: false,
    percentage: 85,
    stats: { conversions: "4.2%", participants: "59k", difficulty: "★★☆" },
    chartData: [25, 42, 60, 75, 85]
  },
  {
    id: "g80",
    title: "圣诞极地飘雪大派送",
    type: "大型活动",
    style: "喜庆",
    scene: "圣诞节",
    hot: 24950,
    time: "2026-12-22",
    colorBg: "from-red-950 via-red-700 to-emerald-500",
    tagText: "狂派千万福利 全民驯鹿越野兑神奖",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "8.1%", participants: "165k", difficulty: "★★★" },
    chartData: [45, 65, 82, 90, 96]
  }
];

const CALENDAR_NODES = [
  {
    id: "618",
    month: "6月",
    day: "18",
    title: "618年中爆款狂欢",
    gameName: "幸运大转盘抽奖",
    tag: "年中爆发 🎁",
    bgClass: "from-rose-50/90 to-white hover:to-rose-50/20 border-pink-100/80 hover:border-pink-300 hover:shadow-[0_12px_24px_rgba(244,63,94,0.12)]",
    textClass: "text-pink-600 bg-pink-100/70",
    headerBg: "bg-gradient-to-r from-pink-500 to-rose-500",
    btnClass: "bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-100 hover:shadow-pink-300/50",
    gameId: "618",
    decor: "🎁🎡",
    hotPill: "🔥 转化：+98%",
    status: "热烈进行中"
  },
  {
    id: "double11",
    month: "11月",
    day: "11",
    title: "双11超级红包雨",
    gameName: "拼手气裂变红包",
    tag: "裂变突围 🧧",
    bgClass: "from-emerald-50/90 to-white hover:to-emerald-50/20 border-emerald-100/80 hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(16,185,129,0.12)]",
    textClass: "text-emerald-700 bg-emerald-100/70",
    headerBg: "bg-gradient-to-r from-emerald-600 to-teal-600",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100 hover:shadow-emerald-300/50",
    gameId: "double11",
    decor: "🧧🏮",
    hotPill: "🔥 热度：★★★★★",
    status: "即将开启"
  },
  {
    id: "anniversary",
    month: "周年",
    day: "庆",
    title: "周年庆感恩回馈",
    gameName: "每日签到领神券",
    tag: "高额留存 📈",
    bgClass: "from-amber-50/90 to-white hover:to-amber-50/20 border-amber-100/80 hover:border-amber-300 hover:shadow-[0_12px_24px_rgba(245,158,11,0.12)]",
    textClass: "text-amber-700 bg-amber-100/70",
    headerBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    btnClass: "bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-100 hover:shadow-amber-300/50",
    gameId: "anniversary",
    decor: "📈💎",
    hotPill: "🔥 留存：+150%",
    status: "策划上线"
  }
];

const PLACEHOLDER_PHRASES = [
  "搜索 儿童节趣味闯关游戏",
  "搜索 商场端午节集客消除玩法",
  "搜索 暑期狂欢叠叠乐爆款模板",
  "搜索 品牌大促高转化营销游戏",
  "搜索 接物狂欢抓抓乐"
];

const HOT_SEARCHES = [
  { text: "儿童节接糖果", icon: "🎈", hot: true },
  { text: "端午粽情赛划艇", icon: "🛶", hot: true },
  { text: "清凉西瓜大作战", icon: "🍉", hot: true },
  { text: "520浪漫飞行棋", icon: "💖", hot: false },
  { text: "超级消除大满贯", icon: "🎮", hot: false },
  { text: "集福卡赢好礼", icon: "🎁", hot: false }
];

const getTemplateImage = (id: string, idx = 0) => {
  const images = [imgTemplateCover1, imgTemplateCover2, imgTemplateCover3];
  return images[idx % images.length];
};

const getTemplateStyle = (id: string) => {
  const stylesMap: Record<string, { bg: string; text: string; border: string }> = {
    g1: { bg: "from-[#eef3fb] to-[#f8faff]", text: "text-[#3D63BB]", border: "border-[#e2eaf8]" },
    g2: { bg: "from-[#fdf1f5] to-[#fef8fa]", text: "text-[#DF427C]", border: "border-[#fce7f0]" },
    g3: { bg: "from-[#ecf9f4] to-[#f7fdfb]", text: "text-[#069D7B]", border: "border-[#d1fae5]" },
    g4: { bg: "from-[#fff7ed] to-[#fffdfa]", text: "text-[#EA580C]", border: "border-[#ffedd5]" },
    g5: { bg: "from-[#ecf9f4] to-[#f7fdfb]", text: "text-[#069D7B]", border: "border-[#d1fae5]" },
    g6: { bg: "from-[#fff1f2] to-[#fffafd]", text: "text-[#E11D48]", border: "border-[#ffe4e6]" },
    g7: { bg: "from-[#faf1fe] to-[#fdf9ff]", text: "text-[#9333EA]", border: "border-[#f3e8ff]" },
    g8: { bg: "from-[#fff7ed] to-[#fffdfa]", text: "text-[#EA580C]", border: "border-[#ffedd5]" },
    g9: { bg: "from-[#faf1fe] to-[#fdf9ff]", text: "text-[#9333EA]", border: "border-[#f3e8ff]" },
    g10: { bg: "from-[#eef3fb] to-[#f8faff]", text: "text-[#3D63BB]", border: "border-[#e2eaf8]" },
    g11: { bg: "from-[#f1f5f9] to-[#f8fafc]", text: "text-[#475569]", border: "border-[#e2e8f0]" },
    g12: { bg: "from-[#ecf9f4] to-[#f7fdfb]", text: "text-[#069D7B]", border: "border-[#d1fae5]" },
    g13: { bg: "from-[#fff1f2] to-[#fffafd]", text: "text-[#E11D48]", border: "border-[#ffe4e6]" },
    g14: { bg: "from-[#f1f5f9] to-[#f8fafc]", text: "text-[#475569]", border: "border-[#e2e8f0]" },
    g15: { bg: "from-[#fdf1f5] to-[#fef8fa]", text: "text-[#DF427C]", border: "border-[#fce7f0]" }
  };
  return stylesMap[id] || { bg: "from-[#eef3fb] to-[#f8faff]", text: "text-[#3D63BB]", border: "border-[#e2eaf8]" };
};

export default function AiMarketingCenter() {
  // Unified page theme helper properties (Hardcoded to website consistent standard blue)
  const themeBtn = "bg-blue-600 hover:bg-blue-700";
  const themeText = "text-blue-600";
  const themeBgLight = "bg-blue-50";
  const themeBorder = "border-blue-200 flex-wrap";
  const themeFocusRing = "focus:ring-blue-500/20 focus:border-blue-500";

  // Navigation State
  const [activeSidebar, setActiveSidebar] = useState("center");

  // Template Details Route State
  const [detailTemplateId, setDetailTemplateId] = useState<string | null>(null);

  const getGameModeForTemplate = (template: any) => {
    if (!template) return "candy";
    const type = template.type;
    const title = template.title;
    if (type === "接物类" || title.includes("接")) {
      return "candy";
    }
    if (type === "动作类" || type === "闯关类" || title.includes("跑酷") || title.includes("船") || title.includes("龙舟") || title.includes("避")) {
      return "dragon";
    }
    return "watermelon";
  };

  const handleSelectTemplateDetail = (templateId: string) => {
    setDetailTemplateId(templateId);
    const currentTemplate = TEMPLATES_DATA.find(t => t.id === templateId);
    if (currentTemplate) {
      const resolvedMode = getGameModeForTemplate(currentTemplate);
      setTrialGameId(resolvedMode);
      setGameState("start");
      setGameScore(0);
      setGameLives(3);
      setGameTimer(resolvedMode === "watermelon" ? 25 : 30);
      setPlayerX(50);
      setPlayerLane(1);
      setGameEntities([]);
    } else {
      setTrialGameId(null);
    }
  };

  const handlePlayCalendar = (gameId: string) => {
    const mapping: Record<string, string> = {
      "618": "g13",
      "double11": "g5",
      "anniversary": "g15"
    };
    const targetId = mapping[gameId] || "g5";
    handleSelectTemplateDetail(targetId);
  };

  // Content Filter States
  const [selectedType, setSelectedType] = useState("全部");
  const [selectedStyle, setSelectedStyle] = useState("全部");
  const [selectedSort, setSelectedSort] = useState("综合排序");
  const [selectedFestival, setSelectedFestival] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  // Category specific page states
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [selectedCategorySubFilter, setSelectedCategorySubFilter] = useState("全部");

  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [previewModalTemplateId, setPreviewModalTemplateId] = useState<string | null>(null);
  const [isShortScreen, setIsShortScreen] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      // If screen height is too small, dock the service and support block dynamically as absolute at the bottom.
      // Otherwise, keep it inline as natural flow. Threshold set at 860px.
      setIsShortScreen(window.innerHeight < 860);
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    // Perform initial check
    checkScrollLimits();
    const timer = setTimeout(checkScrollLimits, 300);
    window.addEventListener("resize", checkScrollLimits);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      // Prompt quick updates immediately after standard animation tick
      setTimeout(checkScrollLimits, 350);
    }
  };

  // --- 1. Typewriter input placeholder states & logic ---
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    if (searchFocused) {
      setTypedPlaceholder("搜索更多好玩游戏");
      return;
    }

    let timer: NodeJS.Timeout;
    const currentFull = PLACEHOLDER_PHRASES[phraseIdx];

    if (isTyping) {
      if (typedPlaceholder.length < currentFull.length) {
        timer = setTimeout(() => {
          setTypedPlaceholder(currentFull.substring(0, typedPlaceholder.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, 2200); // stay typed fully
      }
    } else {
      if (typedPlaceholder.length > 0) {
        timer = setTimeout(() => {
          setTypedPlaceholder(typedPlaceholder.substring(0, typedPlaceholder.length - 1));
        }, 50);
      } else {
        setIsTyping(true);
        setPhraseIdx((prev) => (prev + 1) % PLACEHOLDER_PHRASES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedPlaceholder, isTyping, phraseIdx, searchFocused]);

  // --- 2. Interactive Trial Play State & Core Game Engine ---
  const [trialGameId, setTrialGameId] = useState<string | null>(null); // "candy" | "dragon" | "watermelon"
  const [gameState, setGameState] = useState<"start" | "playing" | "win" | "gameover">("start");
  const [gameScore, setGameScore] = useState(0);
  const [gameLives, setGameLives] = useState(3);
  const [gameTimer, setGameTimer] = useState(30);

  // Entities and positions
  const [playerX, setPlayerX] = useState(50); // candy basket position (5 to 95)
  const [playerLane, setPlayerLane] = useState(1); // 0, 1, 2 for dragon boat
  const [gameEntities, setGameEntities] = useState<any[]>([]); // falling / rising objects
  const [gameAudioAlert, setGameAudioAlert] = useState<string | null>(null); // visual sound cue

  const listGameIds = ["candy", "dragon", "watermelon"];

  const handlePlayGame = (gameId: string) => {
    let finalGameId = gameId;
    if (gameId === "random") {
      finalGameId = listGameIds[Math.floor(Math.random() * listGameIds.length)];
    }
    setTrialGameId(finalGameId);
    setGameState("start");
    setGameScore(0);
    setGameLives(3);
    setGameTimer(finalGameId === "watermelon" ? 25 : 30);
    setPlayerX(50);
    setPlayerLane(1);
    setGameEntities([]);
  };

  const handleCloseGame = () => {
    setTrialGameId(null);
    setGameState("start");
  };

  const triggerAudioNotification = (message: string, isPositive: boolean) => {
    setGameAudioAlert(message);
    setTimeout(() => {
      setGameAudioAlert((curr) => curr === message ? null : curr);
    }, 1100);
  };

  // Keyboard controls listener for the playing state
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (trialGameId === "candy") {
        if (e.key === "ArrowLeft" || e.key === "a") {
          setPlayerX((prev) => Math.max(8, prev - 8));
        } else if (e.key === "ArrowRight" || e.key === "d") {
          setPlayerX((prev) => Math.min(92, prev + 8));
        }
      } else if (trialGameId === "dragon") {
        if (e.key === "ArrowLeft" || e.key === "a") {
          setPlayerLane((prev) => Math.max(0, prev - 1));
        } else if (e.key === "ArrowRight" || e.key === "d") {
          setPlayerLane((prev) => Math.min(2, prev + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, trialGameId]);

  // Main high-performance game loop tick
  useEffect(() => {
    if (gameState !== "playing" || !trialGameId) return;

    const tickInterval = setInterval(() => {
      // 1. Update countdown timer
      setGameTimer((prev) => {
        if (prev <= 1) {
          // Timer ended!
          if (trialGameId === "watermelon") {
            setGameState(gameScore >= 50 ? "win" : "gameover");
          } else {
            setGameState(gameScore >= 60 ? "win" : "gameover");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tickInterval);
  }, [gameState, trialGameId, gameScore]);

  // High-frequency physics and positioning loop
  useEffect(() => {
    if (gameState !== "playing" || !trialGameId) return;

    const physInterval = setInterval(() => {
      setGameEntities((prev) => {
        let current = [...prev];

        // Entity Spawner Logic
        if (current.length < 7 && Math.random() < 0.15) {
          if (trialGameId === "candy") {
            const isBomb = Math.random() < 0.22;
            current.push({
              id: Math.random().toString(),
              x: Math.random() * 88 + 6,
              y: -5,
              speed: Math.random() * 2.5 + 2.5,
              type: isBomb ? "bomb" : "candy",
              emoji: isBomb ? "💣" : ["🍬", "🍭", "🍩", "🧁", "🍪"][Math.floor(Math.random() * 5)]
            });
          } else if (trialGameId === "dragon") {
            const lane = Math.floor(Math.random() * 3);
            const isRock = Math.random() < 0.35;
            current.push({
              id: Math.random().toString(),
              lane: lane,
              x: lane === 0 ? 18 : lane === 1 ? 50 : 82,
              y: -8,
              speed: 4.5,
              type: isRock ? "rock" : "zongzi",
              emoji: isRock ? "🪵" : "🍙"
            });
          } else if (trialGameId === "watermelon") {
            const isBomb = Math.random() < 0.25;
            current.push({
              id: Math.random().toString(),
              x: Math.random() * 76 + 12,
              y: 100, // Launch from bottom
              vx: (Math.random() - 0.5) * 6,
              vy: -15 - Math.random() * 5, // initial upward speed
              type: isBomb ? "bomb" : "fruit",
              emoji: isBomb ? "💣" : ["🍉", "🍊", "🍓", "🍍", "🍋"][Math.floor(Math.random() * 5)],
              isSliced: false
            });
          }
        }

        // Move items
        let alive: any[] = [];
        for (let ent of current) {
          if (trialGameId === "candy") {
            ent.y += ent.speed;

            // Check collision with basket at y in [80, 92]
            if (ent.y >= 81 && ent.y <= 91) {
              const dx = Math.abs(ent.x - playerX);
              if (dx < 12) {
                // Collided!
                if (ent.type === "bomb") {
                  setGameLives((currLives) => {
                    if (currLives <= 1) {
                      setGameState("gameover");
                    }
                    return currLives - 1;
                  });
                  triggerAudioNotification("💥 触碰炸弹，生命-1！", false);
                } else {
                  setGameScore((currS) => {
                    const nextS = currS + 10;
                    if (nextS >= 80) setGameState("win");
                    return nextS;
                  });
                  triggerAudioNotification("接住糖果，得分+10！🍭", true);
                }
                continue; // delete/collect
              }
            }

            if (ent.y < 105) alive.push(ent);
          } else if (trialGameId === "dragon") {
            ent.y += ent.speed;

            // Check collision with boat in lane at y [78, 90]
            if (ent.y >= 78 && ent.y <= 90) {
              if (ent.lane === playerLane) {
                if (ent.type === "rock") {
                  setGameLives((currLives) => {
                    if (currLives <= 1) {
                      setGameState("gameover");
                    }
                    return currLives - 1;
                  });
                  triggerAudioNotification("🪵 撞击障碍，生命-1！", false);
                } else {
                  setGameScore((currS) => {
                    const nextS = currS + 15;
                    if (nextS >= 90) setGameState("win");
                    return nextS;
                  });
                  triggerAudioNotification("吃粽子，契机冲刺！🍙 +15", true);
                }
                continue;
              }
            }

            if (ent.y < 105) alive.push(ent);
          } else if (trialGameId === "watermelon") {
            // physics step
            ent.y += ent.vy;
            ent.vy += 0.8; // gravity drop velocity
            ent.x += ent.vx;

            if (ent.y < 108 && ent.x > -5 && ent.x < 105) {
              alive.push(ent);
            }
          }
        }

        return alive;
      });
    }, 60);

    return () => clearInterval(physInterval);
  }, [gameState, trialGameId, playerX, playerLane]);

  // Click handler specifically for watermelon slice
  const handleSliceWatermelon = (entId: string, type: string) => {
    setGameEntities((prev) => {
      return prev.map((ent) => {
        if (ent.id === entId && !ent.isSliced) {
          if (type === "bomb") {
            setGameLives((currLives) => {
              if (currLives <= 1) setGameState("gameover");
              return currLives - 1;
            });
            triggerAudioNotification("💥 触碰炸弹，生命-1！", false);
          } else {
            setGameScore((currS) => {
              const nextS = currS + 10;
              if (nextS >= 80) setGameState("win");
              return nextS;
            });
            triggerAudioNotification("果实切开，多汁得分+10！🍉", true);
          }
          return { ...ent, isSliced: true };
        }
        return ent;
      });
    });
  };

  // Left sidebar handler
  const handleSidebarClick = (id: string, name: string) => {
    setActiveSidebar(id);
    setDetailTemplateId(null);
    setTrialGameId(null);
    setCategorySearchQuery("");
    setSelectedCategorySubFilter("全部");
    if (id === "all") {
      setSelectedType("全部");
      setSelectedStyle("全部");
      setSelectedFestival("全部");
    } else if (id === "center") {
      setSelectedType("全部");
    } else {
      // Map category ID straight to play type
      setSelectedType(name);
    }
  };

  // Safe category sync back if filter type changes
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Real-time reactive search & filtering algorithm
  const filteredTemplates = useMemo(() => {
    let result = [...TEMPLATES_DATA];

    // Filter by type
    if (selectedType !== "全部") {
      result = result.filter(item => item.type === selectedType);
    }

    // Filter by style
    if (selectedStyle !== "全部") {
      result = result.filter(item => item.style === selectedStyle);
    }

    // Filter by festival scene
    if (selectedFestival !== "全部") {
      result = result.filter(item => item.scene === selectedFestival);
    }

    // Filter by search keyword
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (normalizedQuery !== "") {
      result = result.filter(
        item => 
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.type.toLowerCase().includes(normalizedQuery) ||
          item.style.toLowerCase().includes(normalizedQuery) ||
          item.tagText.toLowerCase().includes(normalizedQuery)
      );
    }

    // Sort mode
    if (selectedSort === "模板热度") {
      result.sort((a, b) => b.hot - a.hot);
    } else if (selectedSort === "上架时间") {
      result.sort((a, b) => b.time.localeCompare(a.time));
    } else {
      // default composite sorting
      result.sort((a, b) => b.percentage - a.percentage);
    }

    return result;
  }, [selectedType, selectedStyle, selectedFestival, searchQuery, selectedSort]);

  // Real-time reactive subcategory filter algorithm for category page
  const categoryFiltered = useMemo(() => {
    let result = TEMPLATES_DATA.filter(item => item.type === activeSidebar);
    
    if (categorySearchQuery) {
      const norm = categorySearchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(norm) ||
        (item.tagText && item.tagText.toLowerCase().includes(norm))
      );
    }
    
    if (selectedCategorySubFilter !== "全部") {
      result = result.filter(item => matchSubPlaystyle(item, selectedCategorySubFilter));
    }
    
    result.sort((a, b) => b.percentage - a.percentage);
    return result;
  }, [activeSidebar, categorySearchQuery, selectedCategorySubFilter]);

  return (
    <div className="flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden bg-[#F8FAFC]">
      {/* 1. Left Sidebar specifically for Gamified Games (游戏玩法) */}
      <aside className="w-[190px] shrink-0 bg-white flex flex-col h-full relative border-r border-slate-100 select-none">
        
        {/* Scrollable area for Navigation + Banners */}
        <div className={cn(
          "flex-1 overflow-y-auto no-scrollbar flex flex-col",
          isShortScreen ? "pb-[220px]" : "pb-4"
        )}>
          <div className="h-4 shrink-0" />
          <div className="px-4 pb-2">
            
          </div>

          {/* Regular sidebar navigation */}
          <nav className="p-2 space-y-0.5 shrink-0">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeSidebar === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.id, item.name)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[14px] font-bold transition-all relative group cursor-pointer text-left",
                    isActive 
                      ? `${themeBtn} text-white shadow-soft` 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-105", isActive ? "text-white animate-pulse" : "text-slate-500")} />
                  <span>{item.name}</span>
                  {item.id === "center" && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 block animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Premium Promotion Banners directly under 动作类 (一行一个) */}
          <div className="px-2 mt-3 space-y-1.5 text-left shrink-0">
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

          {/* Normal flow Service and Support when height is sufficient */}
          {!isShortScreen && (
            <div className="mt-auto pt-3 px-2 space-y-0.5 text-left shrink-0">
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
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md pt-2 pb-3 px-2 border-t border-slate-100 shadow-[0_-8px_20px_rgba(0,0,0,0.03)] z-20 space-y-0.5 text-left">
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
      </aside>

      {/* 2. Right Content Block */}
      <section id="ai-marketing-scroll" className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
        {detailTemplateId ? (
          // --- TEMPLATE DETAILS ROUTE PAGE ---
          <div className="max-w-[1440px] w-full mx-auto p-6 md:p-8 space-y-6 animate-in fade-in duration-300">

            {/* Main Interactive Details Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              
              {/* Left Column: Fixed Phone Mockup containing the active game screen */}
              <div className="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-4 flex flex-col items-center">
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
                      <span>● WIFI</span>
                      <span className="text-emerald-400">100%</span>
                    </div>
                  </div>

                  {/* Simulated Mobile screen content */}
                  <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col justify-between pt-4">
                    {/* HUD Stats */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 z-40 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 text-white font-mono text-[9px]">
                      <div className="flex items-center gap-1 text-yellow-300 font-extrabold">
                        <span>得分:</span>
                        <span className="text-[10px]">{gameScore}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-blue-300">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{gameTimer}s</span>
                      </div>

                      <div className="flex gap-0.5">
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <span 
                            key={idx} 
                            className={cn(
                              "text-[9px] transition-all", 
                              idx < gameLives ? "opacity-100 scale-105" : "opacity-25 scale-90 grayscale"
                            )}
                          >
                            ❤️
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* EVENT SOUND NOTIFICATION */}
                    {gameAudioAlert && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[45] bg-blue-600/90 text-white text-[8px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap animate-bounce shadow">
                        {gameAudioAlert}
                      </div>
                    )}

                    {/* START VIEW FOR INLINE PREVIEW */}
                    {gameState === "start" && (
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-[#19153A] z-30 flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-3 shadow animate-pulse">
                          {trialGameId === "candy" && "🍭"}
                          {trialGameId === "dragon" && "🐉"}
                          {trialGameId === "watermelon" && "🍉"}
                        </div>
                        <h4 className="text-[11px] font-black text-white tracking-wide">{TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.title}</h4>
                        <p className="text-[8px] text-slate-400 max-w-[170px] mt-1.5 leading-relaxed font-semibold">
                          左右移动设备按键或轻踩方向键盘 [A]/[D]，接取道具或躲避障碍，即可快速试玩！
                        </p>
                        <button 
                          onClick={() => {
                            setGameState("playing");
                            setGameScore(0);
                            setGameLives(3);
                            setGameTimer(trialGameId === "watermelon" ? 22 : 28);
                            setGameEntities([]);
                          }}
                          className={cn("mt-5 px-5 py-2 text-white text-[9.5px] font-black rounded-full transition-all duration-300 shadow cursor-pointer", themeBtn)}
                        >
                          立即开启试玩
                        </button>
                      </div>
                    )}

                    {/* PLAYING VIEW */}
                    {gameState === "playing" && (
                      <div className="flex-1 w-full relative h-full bg-[#1A1438]">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 to-slate-950 pointer-events-none opacity-50" />
                        {/* Dragon Boat grids */}
                        {trialGameId === "dragon" && (
                          <div className="absolute inset-0 flex select-none pointer-events-none">
                            <div className="w-1/3 h-full border-r border-[#312E81]/25" />
                            <div className="w-1/3 h-full border-r border-[#312E81]/25" />
                          </div>
                        )}
                        {/* Candy Basket Ground line */}
                        {trialGameId === "candy" && (
                          <div className="absolute bottom-10 inset-x-0 h-[1px] border-t border-dashed border-white/5 pointer-events-none" />
                        )}

                        {/* Game entities looping */}
                        {gameEntities.map((ent) => {
                          if (trialGameId === "watermelon") {
                            return (
                              <div 
                                key={ent.id}
                                onClick={() => handleSliceWatermelon(ent.id, ent.type)}
                                onMouseEnter={() => handleSliceWatermelon(ent.id, ent.type)}
                                className={cn("absolute text-xl select-none cursor-pointer flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2", ent.isSliced && "opacity-0 scale-125")}
                                style={{ left: `${ent.x}%`, top: `${ent.y}%` }}
                              >
                                {ent.emoji}
                              </div>
                            );
                          } else {
                            return (
                              <div 
                                key={ent.id}
                                className="absolute text-lg select-none flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `${ent.x}%`, top: `${ent.y}%` }}
                              >
                                {ent.emoji}
                              </div>
                            );
                          }
                        })}

                        {/* Player icons */}
                        {trialGameId === "candy" && (
                          <div className="absolute bottom-8 w-10 h-4 -translate-x-1/2 transition-all duration-75 flex flex-col items-center" style={{ left: `${playerX}%` }}>
                            <div className="w-full h-3 bg-pink-500 rounded-b-md border-t border-pink-400 flex items-center justify-center text-[5.5px] text-white font-black uppercase">
                              BASKET
                            </div>
                          </div>
                        )}

                        {trialGameId === "dragon" && (
                          <div className="absolute bottom-6 w-8 h-10 -translate-x-1/2 transition-all duration-150 flex flex-col items-center" style={{ left: `${playerLane === 0 ? 18 : playerLane === 1 ? 50 : 82}%` }}>
                            <span className="text-sm">🐲</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* WIN STATE */}
                    {gameState === "win" && (
                      <div className="absolute inset-0 bg-slate-900/98 z-30 flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-300">
                        <span className="text-3xl animate-bounce">🏆</span>
                        <div className="text-[8px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider mb-1">
                          VICTORY
                        </div>
                        <h4 className="text-[11px] font-black text-white">试玩通关成功！</h4>
                        <p className="text-[8px] text-slate-400 max-w-[170px] mt-1 font-semibold">
                          营销效果评估优秀，最高转化提升达 <strong>98%</strong>，立即配置规则上线！
                        </p>
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl w-full max-w-[180px] mt-3 flex items-center justify-between text-left text-[9px] font-mono leading-none">
                          <div>
                            <span className="text-slate-500 block text-[8px] font-sans">成绩:</span>
                            <span className="text-emerald-400 font-bold ml-0.5">{gameScore} Pts</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500 block text-[8px] font-sans">通关线:</span>
                            <span className="text-white font-bold">{trialGameId === "watermelon" ? "50" : "60"}分</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 w-full max-w-[180px] mt-4">
                          <button 
                            onClick={() => handlePlayGame(trialGameId!)}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-[8px] font-bold py-1.8 rounded-lg cursor-pointer"
                          >
                            誓雪再战
                          </button>
                          <button 
                            onClick={() => alert(`一键套用玩法：${TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.title}！方案初始化成功。`)}
                            className={cn("flex-1 text-white text-[8px] font-bold py-1.8 rounded-lg cursor-pointer", themeBtn)}
                          >
                            AI 套用
                          </button>
                        </div>
                      </div>
                    )}

                    {/* GAMEOVER STATE */}
                    {gameState === "gameover" && (
                      <div className="absolute inset-0 bg-slate-900/98 z-30 flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-2xl">👾</span>
                        <h4 className="text-[11px] font-black text-white mt-1">挑战未通过</h4>
                        <p className="text-[8px] text-slate-400 max-w-[170px] mt-1 font-semibold">
                          最终得分: <span className="text-red-400 font-extrabold">{gameScore} Pts</span>. 改写不服!
                        </p>
                        <div className="flex gap-1.5 w-full max-w-[180px] mt-4">
                          <button 
                            onClick={() => { setGameState("start"); setGameScore(0); }}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-[8px] font-bold py-1.5 rounded-lg cursor-pointer"
                          >
                            返回
                          </button>
                          <button 
                            onClick={() => handlePlayGame(trialGameId!)}
                            className={cn("flex-1 text-white text-[8px] font-bold py-1.5 rounded-lg cursor-pointer", themeBtn)}
                          >
                            再来一局
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Directions inside phone mockup */}
                    {gameState === "playing" && (trialGameId === "candy" || trialGameId === "dragon") && (
                      <div className="absolute bottom-2 inset-x-2 bg-slate-900/95 py-1 px-2 border-t border-slate-800 rounded-xl flex items-center justify-between gap-2 z-40 select-none">
                        <button 
                          onClick={() => {
                            if (trialGameId === "candy") setPlayerX(p => Math.max(8, p - 12));
                            else setPlayerLane(p => Math.max(0, p - 1));
                          }}
                          className="flex-grow py-1 bg-slate-800 text-[8px] text-white font-bold rounded-md active:scale-95 cursor-pointer"
                        >
                          ◀
                        </button>
                        <button 
                          onClick={() => {
                            if (trialGameId === "candy") setPlayerX(p => Math.min(92, p + 12));
                            else setPlayerLane(p => Math.min(2, p + 1));
                          }}
                          className="flex-grow py-1 bg-slate-800 text-[8px] text-white font-bold rounded-md active:scale-95 cursor-pointer"
                        >
                          ▶
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar floating icons dock (absolute on desktop, horizontal below phone on mobile) */}
                <div className="xl:absolute xl:top-8 xl:-right-14 xl:left-auto flex xl:flex-col flex-row gap-3 mt-4 xl:mt-0 z-45">
                  {/* Favorite Button */}
                  <button 
                    onClick={() => toggleFavorite(detailTemplateId!)}
                    className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center w-11 h-11"
                    title={favorites.has(detailTemplateId!) ? "取消收藏" : "收藏模板"}
                  >
                    <Heart className={cn("w-5 h-5 transition-colors", favorites.has(detailTemplateId!) ? "fill-red-500 text-red-500 border-transparent animate-pulse" : "text-slate-650")} />
                  </button>

                  {/* Share Button with Hover QR code popup */}
                  <div className="relative group/share">
                    <button 
                      className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 bg-white text-slate-650 transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center w-11 h-11"
                      title="查看/分享二维码"
                    >
                      <Share2 className="w-5 h-5 text-slate-600" />
                    </button>
                    
                    {/* Hover QR Card */}
                    <div className="absolute right-0 xl:right-auto xl:left-1/2 xl:-translate-x-1/2 top-full mt-2 w-[200px] p-4 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 pointer-events-none opacity-0 group-hover/share:opacity-100 group-hover/share:pointer-events-auto transition-all duration-300 transform scale-95 group-hover/share:scale-100 origin-top flex flex-col items-center gap-2 bg-white/98 backdrop-blur-md">
                      <span className="text-[11px] font-black text-slate-700 flex items-center gap-1 leading-none whitespace-nowrap">
                        <ScanLine className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                        手机微信 扫码发布
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

                          <rect x="42" y="42" width="16" height="16" rx="3" fill="#2563eb" />
                          <text x="50" y="54" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">📱</text>

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

              {/* Right Column: Game Details tags and grid recommended templates */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                
                {/* 1. Core Header and Description Card with Tags and actions */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full pointer-events-none" />
                  
                  <div className="flex items-start justify-between flex-wrap gap-4 z-10">
                    <div className="flex items-center">
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-md leading-none">
                          {TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.type} • 节日大促特荐
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2.5 leading-none">
                          {TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Tags displayed directly below Title (max 3 tags) */}
                  <div className="flex flex-wrap gap-2 mt-4 z-10">
                    {[
                      TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.type,
                      `${TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.style}风格`,
                      TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.scene !== "全部" 
                        ? TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.scene 
                        : "通用节日"
                    ].filter(Boolean).slice(0, 3).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] font-bold px-2.5 py-1.5 bg-slate-100 text-slate-650 rounded-xl hover:bg-slate-200/60 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons directly below Tags: AI做同款, 立即发布 */}
                  <div className="mt-16 flex gap-4 flex-wrap z-10">
                    <button 
                      onClick={() => alert(`已一键导入【${TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.title}】！玩法对应的AI策划、前端画风资源和默认积分奖池已同步下发至您的主后台，可进入玩法编辑台二次调整参数。`)}
                      className={cn("px-8 py-4 text-white text-[13.5px] font-black rounded-xl transition-all duration-300 shadow-md active:scale-95 flex items-center gap-2.5 cursor-pointer hover:shadow-lg", themeBtn)}
                    >
                      <Sparkles className="w-5 h-5 fill-white" />
                      AI 做同款
                    </button>
                    
                    <button 
                      onClick={() => alert(`恭喜，【${TEMPLATES_DATA.find(t => t.id === detailTemplateId)?.title}】一键线上发布成功！活动海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`)}
                      className="px-8 py-4 text-white bg-slate-900 hover:bg-slate-800 font-extrabold rounded-xl text-[13.5px] transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <Rocket className="w-5 h-5 text-emerald-400" />
                      立即发布
                    </button>
                  </div>
                </div>

                {/* 2. "相似玩法推荐" using unified template cards list style */}
                <div className="space-y-4 pt-6">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-500 fill-rose-500/10" />
                    相似玩法推荐
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-5">
                    {TEMPLATES_DATA.filter(t => t.id !== detailTemplateId).map((item) => {
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
                          className="group flex flex-col bg-transparent rounded-xl transition-all duration-300 hover:-translate-y-1 w-full cursor-pointer text-left"
                        >
                          {/* Card Cover matching Homepage aspect-[3/5] */}
                          <div 
                            onClick={(e) => { e.stopPropagation(); setPreviewModalTemplateId(item.id); }}
                            className={cn("relative aspect-[3/5] w-full overflow-hidden rounded-xl bg-gradient-to-br cursor-pointer", item.colorBg)}
                          >
                            {/* Geometric overlay meshes */}
                            <div className="absolute inset-0 bg-[#ffffff0c] pointer-events-none mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-20 pointer-events-none"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none"></div>

                            {/* Top Hot Badge */}
                            {isHot && (
                              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-500/90 text-white text-[10px] font-bold rounded z-10 backdrop-blur-sm shadow-sm">
                                爆款
                              </div>
                            )}

                            {/* Actions on top right */}
                            <div className="absolute top-2 right-2 flex items-center gap-1.5 z-30">
                              <button 
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                                className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all cursor-pointer"
                              >
                                <Heart className={cn("h-3.5 w-3.5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "")} />
                              </button>
                            </div>

                            {/* Active hover slide menu with "扫码预览" & "查看详情" consistent triggers */}
                            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 z-20">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setPreviewModalTemplateId(item.id); }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 shadow-lg text-xs transition-all duration-300 cursor-pointer"
                              >
                                扫码预览 <ScanLine className="h-3.5 w-3.5" />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleSelectTemplateDetail(item.id); }}
                                className="flex items-center justify-center w-full max-w-[110px] py-2 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 text-xs transition-all duration-300 delay-75 shadow-sm cursor-pointer"
                              >
                                查看详情
                              </button>
                            </div>
                          </div>

                          {/* Template Card details under the cover */}
                          <div className="flex flex-col pt-3 pb-1 z-20 relative bg-transparent rounded-b-xl gap-1.5">
                            <h3 className="text-[14px] font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors" title={item.title}>
                              {item.title}
                            </h3>
                            
                            {/* Premium Pill Tags */}
                            <div className="flex flex-wrap items-center gap-1 mt-0.5">
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
        ) : activeSidebar === "center" ? (
          <div className="max-w-[1440px] w-full mx-auto p-6 md:p-8 space-y-6">
          
          {/* Header Row: Expanded redesigned Calendar cards & Premium search input */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-2">
            
            {/* Expanded Calendar cards carousel / deck */}
            <div className="flex-grow flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
              
              {/* Redesigned responsive Atmospheric festive calendar cards */}
              <div className="flex flex-row gap-4 flex-grow">
                {CALENDAR_NODES.map((node) => (
                  <div 
                    key={node.id} 
                    className={cn(
                      "flex-1 flex items-center gap-4 p-3.5 rounded-2xl border bg-gradient-to-br shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-transparent shrink-0 min-w-[280px] relative overflow-hidden group/card",
                      node.bgClass
                    )}
                  >
                    {/* Atmospheric decorative soft shine backdrop */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/30 to-transparent rounded-full pointer-events-none opacity-40" />

                    {/* Highly aesthetic backwater seasonal decor sticker */}
                    <div className="absolute -bottom-1 -right-1 text-5xl opacity-10 select-none group-hover/card:scale-130 transition-transform duration-500 pointer-events-none font-sans font-black">
                      {node.decor}
                    </div>

                    {/* Classic Aesthetic Tear-off Calendar Block */}
                    <div className="w-12 h-14 rounded-xl border border-slate-200/50 overflow-hidden flex flex-col shrink-0 bg-white shadow-xs select-none">
                      <div className={cn("text-white text-[10px] font-extrabold text-center py-0.5 uppercase tracking-wider font-mono", node.headerBg)}>
                        {node.month}
                      </div>
                      <div className="flex-grow flex items-center justify-center text-slate-800 text-lg font-black font-mono leading-none">
                        {node.day}
                      </div>
                    </div>

                    {/* Content text metadata matching high marketing specifications */}
                    <div className="flex flex-col min-w-[130px] flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none shadow-xs uppercase", node.textClass)}>
                          {node.tag}
                        </span>
                      </div>
                      <span className="text-[14px] font-black text-slate-800 mt-1.5 leading-none">{node.title}</span>
                      
                      <div className="flex items-center gap-1.5 mt-1 leading-none">
                        <span className="text-[11px] text-slate-500 font-extrabold flex items-center gap-0.5">
                          <Gift className="w-3 h-3 text-slate-400" />
                          {node.gameName}
                        </span>
                      </div>
                    </div>

                    {/* Play trigger button with responsive pulsing shadow */}
                    <button 
                      onClick={() => handlePlayCalendar(node.gameId)}
                      title="点击进入该玩法详情及试玩"
                      className={cn(
                        "ml-auto w-9 h-9 rounded-full text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 group/btn cursor-pointer shrink-0 relative overflow-hidden z-10",
                        node.btnClass
                      )}
                    >
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Re-designed elegant capsule search input conforming to professional UI guidelines */}
            <div className="relative w-full xl:w-[410px] shrink-0 group">
              {/* Premium right-side game console style decoration */}
              <div className="absolute -right-2 top-[-10px] pointer-events-none select-none z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-black px-1.8 py-0.6 rounded-md shadow-sm transform rotate-3 uppercase tracking-wider scale-95 flex items-center gap-0.5 animate-pulse">
                🎮 LIVE GAMEPLAY
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4.5 z-10">
                <Search className="h-4.5 w-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchFocused ? "搜索更多好玩游戏" : typedPlaceholder}
                className={cn(
                  "w-full pl-11 pr-26 h-[48px] sm:h-[52px] text-[12.5px] bg-white border border-slate-200/90 rounded-2xl focus:outline-none text-slate-900 placeholder:text-slate-400 font-extrabold shadow-sm hover:border-slate-350 transition-all duration-300 relative bg-white/70 backdrop-blur-md"
                )}
              />

              {/* Integrated right-side controls inside input field */}
              <div className="absolute inset-y-1.5 right-1.5 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
                    title="清空内容"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => alert(`已根据关键词 "${searchQuery || "全部"}" 检索匹配玩法中...`)}
                  className={cn(
                    "px-4 h-[35px] sm:h-[39px] text-white text-[11px] font-black rounded-xl shadow-xs transition-all tracking-wider cursor-pointer flex items-center justify-center",
                    themeBtn
                  )}
                >
                  搜索
                </button>
              </div>

              {/* Floating suggestions dropdown panel with modern festive card design */}
              {searchFocused && (
                <div 
                  onMouseDown={(e) => e.preventDefault()} // Prevents loss of focus before clicks register
                  className="absolute top-full left-0 right-0 mt-2.5 bg-gradient-to-br from-rose-50/95 via-slate-50/85 to-white/98 rounded-2xl border border-pink-100/90 shadow-[0_16px_36px_rgba(244,63,94,0.15)] z-50 p-4.5 animate-in fade-in slide-in-from-top-1.5 duration-200 overflow-hidden"
                >
                  {/* Atmospheric decorative soft shine backdrop */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/40 to-transparent rounded-full pointer-events-none opacity-50 z-0" />

                  {/* Aesthetic watermarked seasonal decor sticker matching the calendar cards */}
                  <div className="absolute -bottom-1 -right-1 text-7xl opacity-15 select-none pointer-events-none z-0 font-sans transform rotate-6">
                    🍬🎈
                  </div>

                  <div className="flex items-center gap-1.5 mb-3 text-slate-800 relative z-10">
                    <Flame className="w-4 h-4 text-pink-500 fill-pink-500/20" />
                    <span className="text-[12px] font-black uppercase tracking-wider text-pink-600">热推玩法推荐 • 节日大促专区</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 relative z-10">
                    {HOT_SEARCHES.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(item.text);
                          setSearchFocused(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2.5 text-[12px] font-bold text-slate-700 hover:text-pink-600 bg-white/70 hover:bg-rose-50/60 rounded-xl border border-pink-100/30 hover:border-pink-200 shadow-2xs hover:shadow-xs transition-all duration-200 text-left group/btn cursor-pointer"
                      >
                        <span className="text-[14px] group-hover/btn:scale-110 transition-transform">{item.icon}</span>
                        <span className="truncate">{item.text}</span>
                        {item.hot ? (
                          <span className="ml-auto px-1.5 py-0.5 text-[8px] font-black text-rose-500 bg-rose-50 rounded-md uppercase tracking-wider animate-pulse shrink-0 border border-rose-100/50">
                            HOT
                          </span>
                        ) : (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/btn:bg-pink-400 shrink-0 transition-colors" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Playway picture-categories visual slider representation */}
          <div className="space-y-3.5 relative group/slider">
            {/* Left Scroll Pagination Arrow - selectively rendered */}
            {canScrollLeft && (
              <button
                onClick={() => scrollSlider("left")}
                className="absolute left-1 top-[60px] sm:top-[70px] -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-800 shadow-md border border-slate-200/80 flex items-center justify-center cursor-pointer z-30 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-slate-50"
                title="向左翻页"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600 font-bold" />
              </button>
            )}

            {/* Right Scroll Pagination Arrow - selectively rendered */}
            {canScrollRight && (
              <button
                onClick={() => scrollSlider("right")}
                className="absolute right-1 top-[60px] sm:top-[70px] -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-800 shadow-md border border-slate-200/80 flex items-center justify-center cursor-pointer z-30 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-slate-50"
                title="向右翻页"
              >
                <ArrowRight className="w-4 h-4 text-slate-600 font-bold" />
              </button>
            )}

            <div 
              ref={sliderRef}
              onScroll={checkScrollLimits}
              className="flex items-end gap-4 overflow-x-auto no-scrollbar pt-4 pb-7 -mx-1 px-1 scroll-smooth"
            >
              {GAMEPLAY_CATEGORIES.map((cat) => {
                const isActive = selectedType === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleTypeSelect(cat.id)}
                    className={cn(
                      "group relative w-[135px] sm:w-[155px] cursor-pointer shrink-0 transition-all duration-300 z-10",
                      isActive 
                        ? "h-[124px] sm:h-[140px] scale-[1.01]" 
                        : "h-[110px] sm:h-[122px] hover:scale-[1.01]"
                    )}
                  >
                    {/* Full background picture wrapper */}
                    <div className={cn(
                      "relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-end shadow-sm",
                      isActive 
                        ? "border-slate-800 dark:border-slate-900 ring-2 ring-slate-950/10" 
                        : "border-slate-200/85 hover:border-slate-350 shadow-xs"
                    )}>
                      {/* Background Image - full size, slow zoom on hover */}
                      <img 
                        src={cat.image} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 z-0" 
                        alt={cat.name} 
                        referrerPolicy="no-referrer"
                      />

                      {/* Bottom-to-middle linear dark gradient for superior white text readability */}
                      <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-slate-950/95 via-slate-900/65 to-transparent z-10" />

                      {/* Text details in modern high-contrast overlay */}
                      <div className="relative z-20 p-3 flex flex-col select-none">
                        <span className="text-[13.2px] sm:text-[14.2px] font-black tracking-tight text-white leading-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                          {cat.name}
                        </span>
                        <span className="text-[9px] sm:text-[9.5px] font-extrabold mt-0.5 tracking-tight text-slate-200/90 leading-tight drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.45)]">
                          {cat.desc}
                        </span>
                      </div>
                    </div>

                    {/* Highly polished pointer nub blending with the bottom of the card */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-[10px] w-[50px] h-[12px] z-30 pointer-events-none overflow-visible">
                        <svg width="50" height="12" viewBox="0 0 50 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_2.5px_rgba(0,0,0,0.22)]">
                          <path d="M 0 0 C 10 0, 12 11, 25 11 C 38 11, 40 0, 50 0 Z" fill="#020617" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* List Heading Info with Sort option aligned on right */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 pt-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-black text-slate-800 tracking-tight">
                  {selectedType === "全部" ? "精选" : selectedType}玩法
                </h2>
              </div>
              
              <div className="relative">
                <select 
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="text-xs font-extrabold text-slate-600 bg-white border border-slate-250 rounded-xl px-3.5 py-1.5 focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 cursor-pointer"
                >
                  <option value="综合排序">综合排序</option>
                  <option value="模板热度">最热排行</option>
                  <option value="上架时间">最新上架</option>
                </select>
              </div>
            </div>
          </div>

          {/* REALTEMPLATES WORKFLOW GRID - Configured in exact accordance with Homepage Template Card Styles */}
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-1.5 pb-8">
              {filteredTemplates.map((item) => {
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
                    className="group flex flex-col bg-transparent rounded-xl transition-all duration-300 hover:-translate-y-1 w-full cursor-pointer text-left"
                  >
                    {/* Card Cover matching Homepage aspect-[3/5] & clean colorful background gradients */}
                    <div 
                      onClick={(e) => { e.stopPropagation(); setPreviewModalTemplateId(item.id); }}
                      className={cn("relative aspect-[3/5] w-full overflow-hidden rounded-xl bg-gradient-to-br cursor-pointer", item.colorBg)}
                    >
                      {/* Geometric grid mesh pattern overlay */}
                      <div className="absolute inset-0 bg-[#ffffff0c] pointer-events-none mix-blend-overlay"></div>
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-20 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none"></div>

                      {/* Top Hot Badge */}
                      {isHot && (
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-500/90 text-white text-[10px] font-bold rounded z-10 backdrop-blur-sm shadow-sm">
                          爆款
                        </div>
                      )}

                      {/* Tooltip actions on top right */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-30">
                        {/* Info Tooltip Icon */}
                        <div className="relative group/tip">
                          <button className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all cursor-pointer">
                            <Info className="h-3.5 w-3.5" />
                          </button>
                          <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
                            可商用
                            <div className="absolute -top-1 right-2.5 w-2 h-2 bg-slate-800 rotate-45 border-t border-l border-white/10"></div>
                          </div>
                        </div>

                        {/* Favorite Heart trigger */}
                        <div className="relative group/tip">
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                            className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all cursor-pointer"
                          >
                            <Heart className={cn("h-3.5 w-3.5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "")} />
                          </button>
                          <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
                            {isLiked ? "取消收藏" : "收藏模板"}
                            <div className="absolute -top-1 right-2.5 w-2 h-2 bg-slate-800 rotate-45 border-t border-l border-white/10"></div>
                          </div>
                        </div>
                      </div>

                      {/* Active hover slide menu with "扫码预览" & "查看详情" consistent actions */}
                      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 z-20">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setPreviewModalTemplateId(item.id); }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 shadow-lg text-xs transition-all duration-300 cursor-pointer"
                        >
                          扫码预览 <ScanLine className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleSelectTemplateDetail(item.id); }}
                          className="flex items-center justify-center w-full max-w-[110px] py-2 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 text-xs transition-all duration-300 delay-75 shadow-sm cursor-pointer"
                        >
                          查看详情
                        </button>
                      </div>
                    </div>

                    {/* Template Card details under the cover matching the exact Homepage text elements */}
                    <div className="flex flex-col pt-3 pb-1 z-20 relative bg-transparent rounded-b-xl gap-1.5">
                      <h3 className="text-[14px] font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors" title={item.title}>
                        {item.title}
                      </h3>
                      
                      {/* Premium Pill Tags replacing the reading statistics row */}
                      <div className="flex flex-wrap items-center gap-1 mt-0.5">
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
          ) : (
            <div className="w-full text-center py-16 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 ring-4 ring-slate-100/50">
                <Info className="w-8 h-8 opacity-75" />
              </div>
              <p className="text-slate-500 font-bold text-[15px] mb-1">未找到匹配该过滤条件的玩法模板</p>
              <p className="text-sm text-slate-400">请尝试更换分类或搜索其他关键词</p>
              <button 
                onClick={() => {
                  setSelectedType("全部");
                  setSelectedStyle("全部");
                  setSelectedFestival("全部");
                  setSearchQuery("");
                  setActiveSidebar("center");
                }}
                className={cn(
                  "mt-5 px-6 py-2.5 text-white text-[13px] font-extrabold rounded-full transition-colors active:scale-95 cursor-pointer shadow-sm",
                  themeBtn
                )}
              >
                重置一切过滤
              </button>
            </div>
          )}
        </div>
        ) : (
          /* Game Category Page (游戏分类页面) */
          <div className="max-w-[1440px] w-full mx-auto p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
            {(() => {
              const catConfig = CATEGORY_CONFIGS[activeSidebar];
              if (!catConfig) return null;

              // High-quality gameplay center cover images mapping to each active category for perfect styling consistency
              const categoryBgUrls: Record<string, string> = {
                "抽奖营销": imgMarketingLuckyDraw,
                "红包营销": imgMarketingRedEnvelope,
                "投票评选": imgMarketingVoting,
                "裂变营销": imgMarketingEcommerce,
                "签到打卡": imgMarketingCheckin,
                "节日营销": imgMarketingHoliday,
                "电商支付": imgMarketingEcommerce,
                "活动报名": imgMarketingVoting,
                "问卷调查": imgMarketingSurvey,
                "大型活动": imgMarketingCarnival
              };
              const bgUrl = categoryBgUrls[activeSidebar] || imgMarketingSurvey;


              return (
                <div className="space-y-6">
                  {/* Top Header Row of Category details mirroring Game center: Double Banners (left) + capsule search box (right) */}
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-2">
                    
                    {/* Double deck matching gameplay center cards format */}
                    <div className="flex-grow flex flex-col md:flex-row gap-4 items-stretch">
                      
                      {/* Card 1: Specific category banner (refined illustration style, no bottom small text) */}
                      <div className="flex-1 min-w-[280px] sm:min-w-[340px] rounded-2xl border border-slate-200/40 relative overflow-hidden group/card h-[130px] sm:h-[142px] flex flex-col justify-center p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        {/* Immersive background illustration image from gameplay center */}
                        <img 
                          src={bgUrl} 
                          alt={activeSidebar} 
                          className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {/* Dark sleek gradient layer for pristine text contrast */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent z-5" />

                        <div className="z-10 relative">
                          <span className={cn(
                            "text-[8.5px] font-black px-2 py-0.6 rounded-md leading-none shadow-xs uppercase tracking-wider text-white bg-blue-600/90"
                          )}>
                            {activeSidebar}专区
                          </span>
                          <h2 className="text-white text-[15px] sm:text-base font-black mt-2 leading-none tracking-tight">
                            {catConfig.bannerTitle}
                          </h2>
                          <p className="text-[11px] text-slate-300/90 mt-2 line-clamp-2 leading-relaxed font-semibold max-w-[90%]">
                            {catConfig.bannerDesc}
                          </p>
                        </div>
                      </div>

                      {/* Card 2: Stacked Featured Templates (动态展示本分类精选模板封面) */}
                      <div className="flex-1 min-w-[280px] sm:min-w-[340px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black border border-slate-700 relative overflow-hidden group/card h-[130px] sm:h-[142px] flex items-center p-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />
                        
                        <div className="relative z-10 flex flex-col justify-center min-w-[70px] shrink-0 mr-1">
                          <span className="text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 w-max mb-1 shadow-sm">
                            HOT
                          </span>
                          <h2 className="text-white text-[14px] font-black leading-tight tracking-tight mt-0.5 drop-shadow-sm">
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
                                  "relative w-[70px] sm:w-[82px] h-[95px] sm:h-[110px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-slate-600/50 flex flex-col overflow-hidden transition-all duration-500 bg-slate-800 group-hover/card:-translate-y-1",
                                  idx === 1 && "sm:-translate-y-1.5",
                                  idx === 2 && "hidden sm:flex"
                                )}
                              >
                                {coverImg && (
                                  <img 
                                    src={coverImg}
                                    alt="Mockup"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
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

                    {/* Capsule Search Input matching Gameplay center exactly */}
                    <div className="relative w-full xl:w-[410px] shrink-0 group">
                      <div className="absolute -right-2 top-[-10px] pointer-events-none select-none z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-black px-1.8 py-0.6 rounded-md shadow-sm transform rotate-3 uppercase tracking-wider scale-95 flex items-center gap-0.5">
                        🎮 FILTER ENABLED
                      </div>

                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4.5 z-10">
                        <Search className="h-4.5 w-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={categorySearchQuery}
                        onChange={(e) => setCategorySearchQuery(e.target.value)}
                        placeholder="搜索玩法模板..."
                        className="w-full pl-11 pr-5 h-[48px] sm:h-[52px] text-[12.5px] bg-white border border-slate-200/90 rounded-2xl focus:outline-none text-slate-900 placeholder:text-slate-400 font-extrabold shadow-sm hover:border-slate-350 transition-all duration-300 relative bg-white/70 backdrop-blur-md"
                      />
                    </div>

                  </div>

                  {/* Independent single row containing subcategories directly above the template grid for intuitive UX */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white shadow-sm border border-slate-100 p-4 rounded-2xl select-none">
                    <span className="text-[12px] font-black text-slate-700 tracking-wider shrink-0 flex items-center gap-1.5 min-w-[70px]">
                      <Gamepad2 className="w-4 h-4 text-blue-500" />
                      具体玩法：
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {catConfig.subPlaystyles.map((sub, idx) => {
                        const isSel = selectedCategorySubFilter === sub;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedCategorySubFilter(sub)}
                            className={cn(
                              "px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer border shadow-2xs hover:scale-102 active:scale-98 relative overflow-hidden",
                              isSel
                                ? `${themeBtn} text-white border-transparent`
                                : "bg-transparent hover:bg-slate-100 border-slate-200/65 text-slate-650 hover:text-slate-900 animate-in fade-in zoom-in-95 duration-200"
                            )}
                          >
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Template Card List Grid Display without redundant headers */}
                  <div className="pt-2">
                    {categoryFiltered.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                        {categoryFiltered.map((item) => {
                          const isLiked = favorites.has(item.id);
                          const isHot = item.percentage >= 95;
                          const tags = [
                            item.type,
                            `${item.style}风`,
                            item.tagText?.split(" ")[0] || item.scene
                          ].filter(Boolean).slice(0, 3);

                          return (
                            <div 
                              key={item.id} 
                              onClick={() => handleSelectTemplateDetail(item.id)}
                              className="group flex flex-col bg-transparent rounded-xl transition-all duration-300 hover:-translate-y-1 w-full cursor-pointer text-left"
                            >
                              {/* Card Cover (aspect-[3/5], borderless) */}
                              <div 
                                onClick={(e) => { e.stopPropagation(); setPreviewModalTemplateId(item.id); }}
                                className={cn("relative aspect-[3/5] w-full overflow-hidden rounded-xl bg-gradient-to-br shadow-xs cursor-pointer", item.colorBg)}
                              >
                                <div className="absolute inset-0 bg-[#ffffff0c] pointer-events-none mix-blend-overlay" />
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-20 pointer-events-none" />
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

                                {isHot && (
                                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-red-500/90 text-white text-[10.5px] font-bold rounded z-10 backdrop-blur-sm shadow-sm">
                                    爆款
                                  </div>
                                )}

                                {/* Action Tooltips */}
                                <div className="absolute top-2 right-2 flex items-center gap-1.5 z-30">
                                  <div className="relative group/tip">
                                    <button className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all cursor-pointer">
                                      <Info className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 z-50">
                                      可商用
                                    </div>
                                  </div>

                                  <div className="relative group/tip">
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                                      className="p-1.5 rounded-full bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-md text-white transition-all cursor-pointer"
                                    >
                                      <Heart className={cn("h-3.5 w-3.5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "")} />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 z-50">
                                      {isLiked ? "取消收藏" : "收藏模板"}
                                    </div>
                                  </div>
                                </div>

                                {/* Hover actions */}
                                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 z-20">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setPreviewModalTemplateId(item.id); }}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 shadow-lg text-xs transition-all duration-300 cursor-pointer"
                                  >
                                    扫码预览 <ScanLine className="h-3.5 w-3.5" />
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleSelectTemplateDetail(item.id); }}
                                    className="flex items-center justify-center w-full max-w-[110px] py-1.5 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 text-xs transition-all duration-300 delay-75 shadow-sm cursor-pointer"
                                  >
                                    查看详情
                                  </button>
                                </div>
                              </div>

                              {/* Template Card details (borderless) */}
                              <div className="flex flex-col pt-3 pb-1 z-20 relative bg-transparent rounded-b-xl gap-1.5">
                                <h3 className="text-[14px] font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors" title={item.title}>
                                  {item.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-1 mt-0.5">
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
                    ) : (
                      <div className="w-full text-center py-16 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 ring-4 ring-slate-100/50">
                          <Info className="w-8 h-8 opacity-75" />
                        </div>
                        <p className="text-slate-500 font-bold text-[15px] mb-1">该细分玩法或搜索目录下，暂无对应的配置模板</p>
                        <p className="text-xs text-slate-400">请尝试切换到其他玩法筛选项，或者清除本专区搜索框内容</p>
                        <button 
                          onClick={() => {
                            setCategorySearchQuery("");
                            setSelectedCategorySubFilter("全部");
                          }}
                          className={cn(
                            "mt-5 px-6 py-2.5 text-white text-[13px] font-extrabold rounded-full transition-colors active:scale-95 cursor-pointer shadow-sm",
                            themeBtn
                          )}
                        >
                          重置过滤
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* 3. Interactive Pop-Up Trial Game Modal */}
      {trialGameId && !detailTemplateId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-700/60 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8)] relative flex flex-col h-[580px]">
            
            {/* Header portion of Game Cabinet */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                <h3 className="font-black text-white text-[15px] tracking-wide">
                  {trialGameId === "candy" && "🍬 欢乐接糖果（儿童节特供）"}
                  {trialGameId === "dragon" && "🚣‍♂️ 粽情划龙舟（端午节特供）"}
                  {trialGameId === "watermelon" && "🍉 清凉切西瓜（暑期狂欢版）"}
                </h3>
              </div>
              <button 
                onClick={handleCloseGame}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Live Viewport Area */}
            <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col justify-between">
              
              {/* Stat Indicators HUD inside Game */}
              <div className="absolute top-3 left-3 right-3 z-50 flex items-center justify-between bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white font-mono text-[12px] select-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-400 font-bold">SCORE:</span>
                  <span className="font-black text-[14px] text-yellow-300">{gameScore}</span>
                  <span className="text-slate-500 text-[10px]">/{trialGameId === "watermelon" ? "50" : "60"}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span className={cn(gameTimer <= 5 ? "text-red-400 animate-pulse font-extrabold" : "text-blue-300")}>
                    {gameTimer}s
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <span 
                      key={idx} 
                      className={cn(
                        "text-[13px] transition-all", 
                        idx < gameLives ? "opacity-100 scale-110 grayscale-0 text-red-500" : "opacity-30 scale-95 grayscale text-slate-500"
                      )}
                    >
                      ❤️
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating score text flash notification overlay */}
              {gameAudioAlert && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-blue-600/90 backdrop-blur-md border border-blue-400/30 text-white text-[12px] font-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 antialiased animate-bounce">
                  <span>{gameAudioAlert}</span>
                </div>
              )}

              {/* --- GAME VIEWS BASED ON GAMESTATE --- */}

              {/* 1. START STATE */}
              {gameState === "start" && (
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-[#1E1B4B] z-40 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-5xl mb-5 shadow-lg shadow-blue-500/10 animate-pulse">
                    {trialGameId === "candy" && "🍭"}
                    {trialGameId === "dragon" && "🐉"}
                    {trialGameId === "watermelon" && "🍉"}
                  </div>

                  <h2 className="text-xl font-black text-white tracking-wide">
                    {trialGameId === "candy" && "欢乐接糖果大作战"}
                    {trialGameId === "dragon" && "粽情赛龙舟·极限避障"}
                    {trialGameId === "watermelon" && "夏日清凉·狂切西瓜"}
                  </h2>
                  
                  <p className="text-xs text-slate-400 max-w-[280px] mt-2.5 leading-relaxed font-semibold">
                    {trialGameId === "candy" && "左右操控小篮子，接住落下的甜美糖果！小心避开黑色炸弹 💣。目标：80分！"}
                    {trialGameId === "dragon" && "点击下方方向或按 [A]/[D] 左右滑行航道，搜集粽子，躲避障碍木桩！目标：90分！"}
                    {trialGameId === "watermelon" && "点击或滑动鼠标，切开所有抛出的缤纷西瓜和水果！绝对不能触碰黑色骷髅炸弹！目标：80分！"}
                  </p>

                  <div className="bg-slate-950/50 rounded-xl p-3 border border-white/5 text-[11px] text-slate-400 font-mono mt-4 font-bold">
                    <span>键盘操控：[A] / [◀] 左移 ，[D] / [▶] 右移</span>
                  </div>

                  <button 
                    onClick={() => {
                      setGameState("playing");
                      setGameScore(0);
                      setGameLives(3);
                      setGameTimer(trialGameId === "watermelon" ? 22 : 28);
                      setGameEntities([]);
                    }}
                    className={cn(
                      "mt-8 px-8 py-3.5 text-white font-extrabold rounded-full transition-all duration-300 cursor-pointer shadow-lg active:scale-95 text-[14px]",
                      themeBtn
                    )}
                  >
                    开启试玩 (START GAME)
                  </button>
                </div>
              )}

              {/* 2. PLAYING GAME VIEWPORT */}
              {gameState === "playing" && (
                <div className="flex-1 w-full relative h-full bg-[#1E1B4B]">
                  {/* Specialized Animated Background Gradients & Lane Grid lines */}
                  <div className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/60 via-slate-950 to-slate-950" />
                  
                  {/* Lane lines specifically for Dragon Boat Game */}
                  {trialGameId === "dragon" && (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/3 h-full border-r border-[#312E81]/30" />
                      <div className="w-1/3 h-full border-r border-[#312E81]/30" />
                      <div className="w-1/3 h-full" />
                    </div>
                  )}

                  {/* Ground area marker for basket */}
                  {trialGameId === "candy" && (
                    <div className="absolute bottom-16 inset-x-0 h-[1px] bg-white/5 border-t border-dashed border-white/10" />
                  )}

                  {/* Dynamic Entities Rendered using absolute percentage values */}
                  {gameEntities.map((ent) => {
                    if (trialGameId === "watermelon") {
                      // Watermelon slice visual splitting representation
                      return (
                        <div 
                          key={ent.id}
                          onClick={() => handleSliceWatermelon(ent.id, ent.type)}
                          onMouseEnter={() => handleSliceWatermelon(ent.id, ent.type)}
                          className={cn(
                            "absolute text-3xl select-none cursor-pointer transition-all duration-300 flex items-center justify-center w-12 h-12 -translate-x-1/2 -translate-y-1/2",
                            ent.isSliced && "opacity-0 scale-125 pointer-events-none"
                          )}
                          style={{ left: `${ent.x}%`, top: `${ent.y}%` }}
                        >
                          {ent.emoji}
                        </div>
                      );
                    } else {
                      // Regular falling candies and obstacles
                      return (
                        <div 
                          key={ent.id}
                          className="absolute text-2.5xl select-none transition-all duration-75 flex items-center justify-center w-10 h-10 -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${ent.x}%`, top: `${ent.y}%` }}
                        >
                          {ent.emoji}
                        </div>
                      );
                    }
                  })}

                  {/* Sliced Watermelon Splatter Splash effect representation */}
                  {trialGameId === "watermelon" && gameEntities.filter(e => e.isSliced).map((ent) => (
                    <div 
                      key={`splat-${ent.id}`}
                      className="absolute text-xs pointer-events-none font-bold text-orange-400 font-mono -translate-x-1/2 animate-ping"
                      style={{ left: `${ent.x}%`, top: `${ent.y}%` }}
                    >
                      💦 SLICE! +10
                    </div>
                  ))}

                  {/* 3. Player Character (Basket or Boat) */}
                  
                  {/* A. Candy Basket Handler */}
                  {trialGameId === "candy" && (
                    <div 
                      className="absolute bottom-12 w-16 h-8 -translate-x-1/2 transition-all duration-75 flex flex-col items-center justify-end"
                      style={{ left: `${playerX}%` }}
                    >
                      {/* Interactive Basket display */}
                      <div className="w-full h-5 bg-gradient-to-t from-pink-600 to-pink-500 rounded-b-xl rounded-t-sm flex items-center justify-center border-t border-pink-400 shadow-lg shadow-pink-500/20 relative">
                        <div className="absolute -top-3 w-4 h-4 rounded-full border border-pink-400/60" />
                        <span className="text-[10px] text-white/90 font-black font-sans leading-none uppercase">🍬BASKET🍬</span>
                      </div>
                    </div>
                  )}

                  {/* B. Dragon Boat Handler */}
                  {trialGameId === "dragon" && (
                    <div 
                      className="absolute bottom-12 w-14 h-16 -translate-x-1/2 transition-all duration-150 flex flex-col items-center justify-between"
                      style={{ left: `${playerLane === 0 ? 18 : playerLane === 1 ? 50 : 82}%` }}
                    >
                      <div className="flex flex-col items-center justify-end h-full">
                        {/* Beautiful Dragon Boat Visual Symbol */}
                        <div className="w-1.5 h-7 bg-emerald-400 rounded-full animate-pulse flex items-center justify-center" />
                        <div className="w-5 h-8 bg-gradient-to-t from-emerald-600 to-emerald-500 rounded-b-xl rounded-t-lg shadow-lg flex items-center justify-center text-lg relative border border-emerald-400">
                          🐉
                          <span className="absolute -bottom-1.5 text-[8px] font-mono font-black text-white leading-none uppercase">LANE {playerLane+1}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* C. Watermelon Touch helper text */}
                  {trialGameId === "watermelon" && (
                    <div className="absolute inset-x-0 bottom-4 text-center text-slate-500 text-[10px] font-black pointer-events-none select-none tracking-widest uppercase">
                      💡 鼠标滑过或点击飞出的水果即可切开！
                    </div>
                  )}
                </div>
              )}

              {/* 3. WIN SCREEN */}
              {gameState === "win" && (
                <div className="absolute inset-0 bg-[#0F172A]/95 z-40 flex flex-col items-center justify-center p-6 text-center animate-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-5xl mb-4 text-yellow-400 animate-bounce">
                    🏆
                  </div>

                  <span className="text-[10px] bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-black tracking-widest uppercase leading-none mb-2 animate-pulse">
                    SUCCESS VICTORY
                  </span>
                  
                  <h2 className="text-2xl font-black text-white">试玩挑战大获全胜！</h2>
                  <p className="text-xs text-slate-400 font-semibold max-w-[280px] mt-2 leading-relaxed">
                    您已通关该试玩营销节点，活动最高转化率预估提升了 <span className="text-emerald-400 font-extrabold font-mono text-[14px]">98%</span> ！是否一键复制该节点模板到您的场景？
                  </p>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl w-full max-w-[320px] mt-6 grid grid-cols-2 gap-3 text-left">
                    <div>
                      <span className="text-[10px] block text-slate-500 font-black tracking-wide">最终得分</span>
                      <span className="text-lg font-mono font-black text-yellow-400">{gameScore} Pts</span>
                    </div>
                    <div>
                      <span className="text-[10px] block text-slate-500 font-black tracking-wide">生成游戏类型</span>
                      <span className="text-xs font-bold text-white block mt-1">{trialGameId === "candy" ? "儿童节接糖果" : trialGameId === "dragon" ? "国潮龙舟避障" : "暑期清凉切水果"}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full max-w-[320px] mt-8">
                    <button 
                      onClick={() => handlePlayGame(trialGameId)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer border border-slate-700 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      重新试玩
                    </button>
                    
                    <button 
                      onClick={() => {
                        alert(`已成功将【${trialGameId === "candy" ? "儿童节欢乐接糖果" : trialGameId === "dragon" ? "国潮粽情划龙舟" : "暑假清凉切西瓜"}】一键导入至您的AI工作台！`);
                        handleCloseGame();
                      }}
                      className={cn("flex-1 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-1.5", themeBtn)}
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-white" />
                      一键 AI 套用
                    </button>
                  </div>
                </div>
              )}

              {/* 4. GAMEOVER SCREEN */}
              {gameState === "gameover" && (
                <div className="absolute inset-0 bg-[#0F172A]/95 z-40 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center text-4xl mb-4 text-red-500 animate-pulse">
                    👾
                  </div>
                  
                  <span className="text-[9px] bg-red-500 text-white px-2.5 py-0.5 rounded-full font-black tracking-widest uppercase mb-1">
                    GAME OVER
                  </span>

                  <h2 className="text-xl font-black text-white">很遗憾，挑战未完成</h2>
                  <p className="text-xs text-slate-400 font-semibold max-w-[280px] mt-2 leading-relaxed">
                    需要满足目标分数方可解锁营销礼品卡包！生命值已经耗尽、或倒计时结束。
                  </p>

                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl w-full max-w-[280px] mt-5 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[10px] text-slate-500 font-black block">挑战成绩</span>
                      <span className="text-[15px] font-mono font-black text-red-500">{gameScore} Pts</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 font-black block">合格目标</span>
                      <span className="text-xs text-white font-bold">{trialGameId === "watermelon" ? "50" : "60"} 分</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 w-full max-w-[280px] mt-8">
                    <button 
                      onClick={handleCloseGame}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-[12px] py-3 rounded-xl transition-all cursor-pointer active:scale-95"
                    >
                      退出试玩
                    </button>
                    <button 
                      onClick={() => handlePlayGame(trialGameId)}
                      className={cn("flex-1 text-white font-extrabold text-[12px] py-3 rounded-xl transition-all cursor-pointer active:scale-95", themeBtn)}
                    >
                      不服再战
                    </button>
                  </div>
                </div>
              )}

              {/* GUI Direction Controls at bottom block only when playing regular scroll games */}
              {gameState === "playing" && (trialGameId === "candy" || trialGameId === "dragon") && (
                <div className="bg-slate-900/90 backdrop-blur-md px-6 py-4.5 border-t border-slate-800 flex items-center justify-between gap-4 z-40 select-none">
                  <button 
                    onClick={() => {
                      if (trialGameId === "candy") {
                        setPlayerX((prev) => Math.max(8, prev - 12));
                      } else {
                        setPlayerLane((prev) => Math.max(0, prev - 1));
                      }
                    }}
                    className="flex-1 bg-slate-800 border border-slate-700 text-white font-extrabold py-3.5 px-4 rounded-2xl active:scale-95 transition-all text-[13px] flex items-center justify-center gap-1 cursor-pointer select-none"
                  >
                    ◀ 向左移动
                  </button>

                  <button 
                    onClick={() => {
                      if (trialGameId === "candy") {
                        setPlayerX((prev) => Math.min(92, prev + 12));
                      } else {
                        setPlayerLane((prev) => Math.min(2, prev + 1));
                      }
                    }}
                    className="flex-1 bg-slate-800 border border-slate-700 text-white font-extrabold py-3.5 px-4 rounded-2xl active:scale-95 transition-all text-[13px] flex items-center justify-center gap-1 cursor-pointer select-none"
                  >
                    向右移动 ▶
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Elegant High-Fidelity Game Preview Pop-Up Modal */}
      {previewModalTemplateId && (() => {
        const previewItem = TEMPLATES_DATA.find(t => t.id === previewModalTemplateId);
        if (!previewItem) return null;

        return (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity cursor-pointer" 
              onClick={() => setPreviewModalTemplateId(null)}
            />

            {/* Main Container Card */}
            <div className="relative w-full max-w-[860px] bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-200 border border-slate-100">
              
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
                  <div className={cn("flex-1 rounded-[26px] overflow-hidden relative flex flex-col bg-gradient-to-br", previewItem.colorBg)}>
                    <div className="absolute inset-0 bg-[#ffffff0a] pointer-events-none mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-15 pointer-events-none" />

                    {/* Central ring graphic elements inspired by top-tier gaming assets */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <div className="w-24 h-24 rounded-full border-8 border-sky-400/40 animate-pulse flex items-center justify-center shadow-lg relative mt-4">
                        <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-sky-300/40" />
                        <span className="text-[9px] font-black tracking-wider text-sky-200">ACTIVE</span>
                      </div>

                      {/* Display Texts */}
                      <div className="mt-8 text-center px-2">
                        <h4 className="text-[14px] font-black text-white leading-tight tracking-wide drop-shadow-md">
                          {previewItem.title}
                        </h4>
                        <p className="text-[9px] font-bold text-white/50 tracking-widest mt-1 uppercase">
                          {previewItem.type} • AI GENERATED
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

              {/* Right Side: Description description and QR actions */}
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
                    <Gamepad2 className="w-3.5 h-3.5 text-[#1C68F5]" />
                    <span>{previewItem.type}</span>
                  </div>

                  {/* Details block */}
                  <div>
                    <h2 className="text-2.5xl md:text-3xl font-black text-slate-800 tracking-tight leading-none text-left">
                      {previewItem.title}
                    </h2>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed font-semibold mt-3.5 text-left">
                      支持通过 AI 创作生成个性化同款游戏，或直接使用此模板快速设置并发布活动。
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

                        <rect x="42" y="4" width="8" height="8" />
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
                      <h4 className="text-[14px] font-black text-slate-800 text-left">
                        扫码手机预览
                      </h4>
                      <p className="text-[11px] text-slate-400 font-bold mt-1 text-left">
                        扫码体验真实游戏效果
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirm buttons and actions */}
                <div className="flex items-center gap-3 mt-7">
                  <button 
                    onClick={() => {
                      alert(`已一键导入【${previewItem.title}】！玩法对应的AI策划、前端画风资源已同步下发至您的主后台，可进入玩法编辑台二次调整参数。`);
                      setPreviewModalTemplateId(null);
                    }}
                    className="flex-1 py-3 px-5 font-black text-white text-[13px] rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-205 shadow-md flex items-center justify-center gap-1.5 cursor-pointer shadow-blue-500/20"
                  >
                    <Sparkles className="w-4 h-4 fill-white" />
                    做同款
                  </button>
                  <button 
                    onClick={() => {
                      alert(`恭喜，【${previewItem.title}】一键线上发布成功！活动海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`);
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
        );
      })()}
    </div>
  );
}
