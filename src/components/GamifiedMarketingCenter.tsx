import React, { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { 
  Gamepad2, Search, ArrowLeft, ArrowRight, Play, Eye, Heart, Info, Sparkles, 
  Flame, Clock, TrendingUp, Trophy, Stars, Users, Zap, Shield, 
  LayoutTemplate, Check, HelpCircle, Calendar, X, RotateCcw, Award,
  ScanLine, Share2, Rocket, Layers, BookOpen, Code, Briefcase, MessagesSquare,
  Link, Smartphone
} from "lucide-react";

import imgFeatured from "../assets/images/cat_featured_1779523249218.png";
import imgElimination from "../assets/images/cat_elimination_1779523103546.png";
import imgShooting from "../assets/images/cat_shooting_1779523124555.png";
import imgPuzzle from "../assets/images/cat_puzzle_1779523142523.png";
import imgSynthesis from "../assets/images/cat_synthesis_1779523162184.png";
import imgStage from "../assets/images/cat_stage_1779523182209.png";
import imgReaction from "../assets/images/cat_reaction_1779523199030.png";
import imgCatching from "../assets/images/cat_catching_1779523213920.png";
import imgAction from "../assets/images/cat_action_1779523229602.png";
import imgTemplateCover1 from "../assets/images/marketing_template_cover_1_1779935600707.png";
import imgTemplateCover2 from "../assets/images/marketing_template_cover_2_1779935619140.png";
import imgTemplateCover3 from "../assets/images/marketing_template_cover_3_1779935640170.png";
import IntegrationOptionsSection from "./IntegrationOptionsSection";
import templateImage1 from "../assets/images/template_image_01.png";
import templateImage2 from "../assets/images/template_image_02.png";
import templateImage3 from "../assets/images/template_image_03.png";
import templateImage4 from "../assets/images/template_image_04.png";
import templateImage5 from "../assets/images/template_image_05.png";
import templateImage6 from "../assets/images/template_image_06.png";
import templateImage7 from "../assets/images/template_image_07.png";
import templateImage8 from "../assets/images/template_image_08.png";
import templateImage9 from "../assets/images/template_image_09.png";
import templateImage10 from "../assets/images/template_image_10.png";
import templateImage11 from "../assets/images/template_image_11.png";
import templateImage12 from "../assets/images/template_image_12.png";
import categoryTabAll from "../assets/images/category-tabs/tab_all.png";
import categoryTabElimination from "../assets/images/category-tabs/tab_elimination.png";
import categoryTabShooting from "../assets/images/category-tabs/tab_shooting.png";
import categoryTabPuzzle from "../assets/images/category-tabs/tab_puzzle.png";
import categoryTabSynthesis from "../assets/images/category-tabs/tab_synthesis.png";
import categoryTabStage from "../assets/images/category-tabs/tab_stage.png";
import categoryTabReaction from "../assets/images/category-tabs/tab_reaction.png";
import categoryTabCatching from "../assets/images/category-tabs/tab_catching.png";
import categoryTabAction from "../assets/images/category-tabs/tab_action.png";
import TemplateCard from "./TemplateCard";
import SiteTemplateDetailPage from "./SiteTemplateDetailPage";


// Dictionary mapping gameplay categories to sub-playstyles, banners, and descriptions
const CATEGORY_CONFIGS: Record<string, {
  bannerTitle: string;
  bannerDesc: string;
  subPlaystyles: string[];
  bannerColor: string;
}> = {
  "消除类": {
    bannerTitle: "消除类游戏专区",
    bannerDesc: "连消狂欢，碎片时间聚客神器，高频率视觉反馈激发用户参与热情，支持多级关卡及兑奖机制联动。",
    subPlaystyles: ["全部", "消除大作战", "消消乐", "方块消除", "水果消除", "糖果派对"],
    bannerColor: "from-pink-500/10 to-rose-500/10 border-rose-100 text-rose-800"
  },
  "射击类": {
    bannerTitle: "射击类游戏专区",
    bannerDesc: "热血蓄力，指向性爽快比拼，支持限时射击、道具掉落与弹幕互动，拉高独立用户会话时长和复刷率。",
    subPlaystyles: ["全部", "射手大师", "经典射击", "空战英豪", "泡泡龙射击", "弹球大作战"],
    bannerColor: "from-violet-500/10 to-indigo-500/10 border-indigo-100 text-indigo-850"
  },
  "益智类": {
    bannerTitle: "益智类游戏专区",
    bannerDesc: "脑力全开，智力猜谜！结合答题、汉字迷宫等多元交互，沉浸式促留存，全渠道客群全场景通吃方案。",
    subPlaystyles: ["全部", "脑力大碰撞", "智力迷宫", "算术闯关", "猜灯谜", "词汇达人"],
    bannerColor: "from-emerald-500/10 to-teal-500/10 border-teal-100 text-teal-850"
  },
  "合成类": {
    bannerTitle: "合成类游戏专区",
    bannerDesc: "经典减压合成，内置裂变西瓜玩法机制！支持品牌元素和吉祥物深度配置，一键生成趣味大促主KV。",
    subPlaystyles: ["全部", "合成大西瓜", "幻兽合成", "宝石合并", "神器堆叠", "糖果消消乐"],
    bannerColor: "from-amber-500/10 to-yellow-600/10 border-yellow-100 text-yellow-850"
  },
  "闯关类": {
    bannerTitle: "闯关类游戏专区",
    bannerDesc: "终极跳跃与高能竞客！支持品牌专属里程碑设计、成就徽章收集展示及跨平台排名竞赛统计。",
    subPlaystyles: ["全部", "经典跑酷", "年兽大作战", "赛艇争霸", "地铁大冲锋", "极速穿越"],
    bannerColor: "from-purple-500/10 to-fuchsia-600/10 border-fuchsia-100 text-fuchsia-850"
  },
  "反应类": {
    bannerTitle: "反应类游戏专区",
    bannerDesc: "手速比拼，极速反应！以紧凑、刺激的视听特效和连续成就提示，帮助商户高效实现活动核销翻倍。",
    subPlaystyles: ["全部", "极速闪避", "乐曲点击", "黄金矿工", "节奏大作战", "手速达人"],
    bannerColor: "from-orange-500/10 to-red-650/10 border-red-100 text-red-850"
  },
  "接物类": {
    bannerTitle: "接物类游戏专区",
    bannerDesc: "天降福气，满屏好礼接不停！非常契合大促、节假日发券场景，直观促进购买和活跃度数据膨胀。",
    subPlaystyles: ["全部", "水果接接乐", "接金币大作战", "礼物雨", "疯狂接元宝", "财神掉红包"],
    bannerColor: "from-cyan-500/10 to-blue-600/10 border-blue-105 text-blue-900"
  },
  "动作类": {
    bannerTitle: "动作类游戏专区",
    bannerDesc: "流畅的动力学引擎赋能！爽利指尖切划交互、避障操作，深度沉淀高忠诚度深度营销核心用户群。",
    subPlaystyles: ["全部", "切水果", "水果大作战", "极速狂飙", "街头格斗", "快乐跑酷"],
    bannerColor: "from-rose-500/10 to-pink-650/10 border-pink-100 text-pink-900"
  }
};

// Helper function to dynamically map mock templates to category sub-playstyles
const matchSubPlaystyle = (template: any, subPlaystyle: string) => {
  if (subPlaystyle === "全部") return true;
  // Fallback to match elements dynamically to ensure each sub-playstyle page displays at least 2 rows
  return true;
};

const CATEGORY_IMAGE_OFFSETS: Record<string, number> = {
  center: 0,
  "消除类": 3,
  "射击类": 7,
  "益智类": 1,
  "合成类": 9,
  "闯关类": 5,
  "反应类": 10,
  "接物类": 2,
  "动作类": 6,
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) >>> 0;
  }
  return hash >>> 0;
};

const getTemplateImage = (index: number, categoryKey = "center") => {
  const offset = CATEGORY_IMAGE_OFFSETS[categoryKey] ?? 0;
  return TEMPLATE_IMAGE_POOL[(offset + index) % TEMPLATE_IMAGE_POOL.length];
};

const shuffleBySeed = <T,>(items: T[], seedKey: string) => {
  const seeded = items.map((item, index) => {
    const key = `${seedKey}:${index}:${JSON.stringify(item)}`;
    return { item, score: hashString(key) };
  });
  return seeded.sort((a, b) => a.score - b.score).map(entry => entry.item);
};

// Sidebar categories
const SIDEBAR_ITEMS = [
  { id: "center", name: "玩法中心", icon: Gamepad2, bg: "from-blue-500 to-indigo-600" },
  { id: "消除类", name: "消除类", icon: Zap, bg: "from-pink-500 to-rose-500" },
  { id: "射击类", name: "射击类", icon: Shield, bg: "from-violet-500 to-indigo-500" },
  { id: "益智类", name: "益智类", icon: HelpCircle, bg: "from-emerald-500 to-teal-500" },
  { id: "合成类", name: "合成类", icon: Trophy, bg: "from-amber-400 to-yellow-600" },
  { id: "闯关类", name: "闯关类", icon: Stars, bg: "from-purple-500 to-fuchsia-600" },
  { id: "反应类", name: "反应类", icon: Zap, bg: "from-orange-500 to-red-600" },
  { id: "接物类", name: "接物类", icon: Users, bg: "from-cyan-500 to-blue-600" },
  { id: "动作类", name: "动作类", icon: Sparkles, bg: "from-rose-500 to-pink-600" }
];

// Visual cards category data mapping with custom-generated scenario illustration images
const GAMEPLAY_CATEGORIES = [
  { 
    id: "全部", 
    name: "精选", 
    count: 75, 
    desc: "爆款玩法推荐", 
    image: imgFeatured, 
    bg: "from-blue-50/90 to-white", 
    color: "text-blue-700", 
    subColor: "text-blue-500/85",
    activeBg: "bg-blue-600",
    activeTextColor: "text-white",
    activeSubColor: "text-blue-100",
    fillColor: "#2563eb"
  },
  { 
    id: "消除类", 
    name: "消除类", 
    count: 40, 
    desc: "爽快连消裂变", 
    image: imgElimination, 
    bg: "from-pink-50/90 to-white", 
    color: "text-pink-700", 
    subColor: "text-pink-500/85",
    activeBg: "bg-[#db2777]",
    activeTextColor: "text-white",
    activeSubColor: "text-pink-100",
    fillColor: "#db2777"
  },
  { 
    id: "射击类", 
    name: "射击类", 
    count: 21, 
    desc: "硬核射击避障", 
    image: imgShooting, 
    bg: "from-indigo-50/90 to-white", 
    color: "text-indigo-700", 
    subColor: "text-indigo-500/85",
    activeBg: "bg-indigo-600",
    activeTextColor: "text-white",
    activeSubColor: "text-indigo-100",
    fillColor: "#4f46e5"
  },
  { 
    id: "益智类", 
    name: "益智类", 
    count: 69, 
    desc: "答题测试引流", 
    image: imgPuzzle, 
    bg: "from-emerald-50/90 to-white", 
    color: "text-emerald-700", 
    subColor: "text-emerald-500/85",
    activeBg: "bg-emerald-600",
    activeTextColor: "text-white",
    activeSubColor: "text-emerald-100",
    fillColor: "#059669"
  },
  { 
    id: "合成类", 
    name: "合成类", 
    count: 75, 
    desc: "趣味合成常青", 
    image: imgSynthesis, 
    bg: "from-amber-50/90 to-white", 
    color: "text-amber-700", 
    subColor: "text-amber-500/85",
    activeBg: "bg-amber-600",
    activeTextColor: "text-white",
    activeSubColor: "text-amber-100",
    fillColor: "#d97706"
  },
  { 
    id: "闯关类", 
    name: "闯关类", 
    count: 65, 
    desc: "大促过关解锁", 
    image: imgStage, 
    bg: "from-fuchsia-50/90 to-white", 
    color: "text-fuchsia-700", 
    subColor: "text-fuchsia-500/85",
    activeBg: "bg-fuchsia-600",
    activeTextColor: "text-white",
    activeSubColor: "text-fuchsia-100",
    fillColor: "#c026d3"
  },
  { 
    id: "反应类", 
    name: "反应类", 
    count: 46, 
    desc: "手速极限抢券", 
    image: imgReaction, 
    bg: "from-purple-50/90 to-white", 
    color: "text-purple-700", 
    subColor: "text-purple-500/85",
    activeBg: "bg-purple-600",
    activeTextColor: "text-white",
    activeSubColor: "text-purple-100",
    fillColor: "#9333ea"
  },
  { 
    id: "接物类", 
    name: "接物类", 
    count: 39, 
    desc: "抓取宝物满仓", 
    image: imgCatching, 
    bg: "from-teal-50/90 to-white", 
    color: "text-teal-700", 
    subColor: "text-teal-500/85",
    activeBg: "bg-teal-600",
    activeTextColor: "text-white",
    activeSubColor: "text-teal-100",
    fillColor: "#0d9488"
  },
  { 
    id: "动作类", 
    name: "动作类", 
    count: 52, 
    desc: "燃情跑酷翻倍", 
    image: imgAction, 
    bg: "from-orange-50/90 to-white", 
    color: "text-orange-700", 
    subColor: "text-orange-500/85",
    activeBg: "bg-orange-600",
    activeTextColor: "text-white",
    activeSubColor: "text-orange-100",
    fillColor: "#ea580c"
  }
];

// Content filters
const GAME_TYPES = ["全部", "消除类", "射击类", "益智类", "合成类", "闯关类", "反应类", "接物类", "动作类"];
const GAME_STYLES = ["全部", "科技", "插画", "商务", "简约", "国潮", "卡通", "可爱", "时尚", "清新", "喜庆"];
const SORT_MODES = ["综合排序", "模板热度", "上架时间"];
const FESTIVALS = ["全部", "劳动节", "儿童节", "端午节", "中秋节", "万圣节", "圣诞节"];
const TEMPLATE_IMAGE_POOL = [
  templateImage1,
  templateImage2,
  templateImage3,
  templateImage4,
  templateImage5,
  templateImage6,
  templateImage7,
  templateImage8,
  templateImage9,
  templateImage10,
  templateImage11,
  templateImage12
];

// Beautiful Interactive templates with custom diagram/infographic UI definitions
const TEMPLATES_DATA = [
  {
    id: "g1",
    title: "圣诞太空之旅",
    type: "射击类",
    style: "卡通",
    scene: "圣诞节",
    hot: 19420,
    time: "2026-11-20",
    colorBg: "from-[#0F172A] via-[#1E1B4B] to-[#311042]",
    tagText: "圣诞专属 射击过关",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "4.8%", participants: "89k", difficulty: "★☆☆" },
    chartData: [45, 60, 55, 80, 94]
  },
  {
    id: "g2",
    title: "圣诞欢乐消除",
    type: "消除类",
    style: "可爱",
    scene: "圣诞节",
    hot: 18750,
    time: "2026-11-15",
    colorBg: "from-[#450A0A] via-[#7F1D1D] to-[#991B1B]",
    tagText: "经典连消 节日聚客",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.2%", participants: "102k", difficulty: "★★☆" },
    chartData: [30, 45, 70, 85, 91]
  },
  {
    id: "g3",
    title: "端午太空行",
    type: "益智类",
    style: "国潮",
    scene: "端午节",
    hot: 22050,
    time: "2026-05-18",
    colorBg: "from-[#022C22] via-[#064E3B] to-[#1E3A8A]",
    tagText: "国风机械 龙舟飞驰",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "6.1%", participants: "145k", difficulty: "★★★" },
    chartData: [50, 65, 80, 85, 98]
  },
  {
    id: "g4",
    title: "劳动节金球挑战",
    type: "反应类",
    style: "插画",
    scene: "劳动节",
    hot: 17420,
    time: "2026-04-20",
    colorBg: "from-[#7C2D12] via-[#9A3412] to-[#1E3A8A]",
    tagText: "快速抓取 劳动最炫",
    hasPrize: false,
    percentage: 86,
    stats: { conversions: "3.9%", participants: "65k", difficulty: "★★☆" },
    chartData: [40, 50, 60, 75, 86]
  },
  {
    id: "g5",
    title: "粽情端午龙舟竞渡",
    type: "动作类",
    style: "国潮",
    scene: "端午节",
    hot: 25600,
    time: "2026-05-22",
    colorBg: "from-[#0F172A] via-[#065F46] to-[#047857]",
    tagText: "热血竞渡 激浪狂飙",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "7.4%", participants: "180k", difficulty: "★★★" },
    chartData: [60, 70, 85, 95, 99]
  },
  {
    id: "g6",
    title: "元宵猜灯谜",
    type: "益智类",
    style: "国潮",
    scene: "全部",
    hot: 16200,
    time: "2026-02-10",
    colorBg: "from-[#7F1D1D] via-[#991B1B] to-[#D97706]",
    tagText: "传承经典 答题赢奖",
    hasPrize: true,
    percentage: 82,
    stats: { conversions: "4.1%", participants: "54k", difficulty: "★☆☆" },
    chartData: [20, 40, 60, 75, 82]
  },
  {
    id: "g7",
    title: "中秋萌兔接月饼",
    type: "接物类",
    style: "可爱",
    scene: "中秋节",
    hot: 21200,
    time: "2026-09-15",
    colorBg: "from-[#1E1B4B] via-[#311042] to-[#581C87]",
    tagText: "广寒玉兔 接福满仓",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "5.8%", participants: "120k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 90, 95]
  },
  {
    id: "g8",
    title: "万圣节南瓜大作战",
    type: "射击类",
    style: "卡通",
    scene: "万圣节",
    hot: 15400,
    time: "2026-10-25",
    colorBg: "from-[#111827] via-[#1F2937] to-[#7C2D12]",
    tagText: "奇幻庄园 捣蛋精灵",
    hasPrize: false,
    percentage: 84,
    stats: { conversions: "3.5%", participants: "48k", difficulty: "★★☆" },
    chartData: [35, 45, 60, 70, 84]
  },
  {
    id: "g9",
    title: "儿童节萌宠大闯关",
    type: "动作类",
    style: "卡通",
    scene: "儿童节",
    hot: 19800,
    time: "2026-05-28",
    colorBg: "from-[#1E3A8A] via-[#3B82F6] to-[#DB2777]",
    tagText: "童心狂狂 趣味跳跃",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "4.9%", participants: "95k", difficulty: "★★☆" },
    chartData: [40, 55, 70, 85, 92]
  },
  {
    id: "g10",
    title: "科技跑酷达人",
    type: "动作类",
    style: "科技",
    scene: "全部",
    hot: 18120,
    time: "2026-03-12",
    colorBg: "from-[#020617] via-[#0F172A] to-[#1E3A8A]",
    tagText: "极速未来 赛博竞速",
    hasPrize: false,
    percentage: 89,
    stats: { conversions: "4.3%", participants: "72k", difficulty: "★★★" },
    chartData: [30, 50, 65, 80, 89]
  },
  {
    id: "g11",
    title: "极简商务连连看",
    type: "消除类",
    style: "商务",
    scene: "全部",
    hot: 14300,
    time: "2026-01-05",
    colorBg: "from-[#0F172A] via-[#334155] to-[#475569]",
    tagText: "轻量白领 闲暇消除",
    hasPrize: false,
    percentage: 78,
    stats: { conversions: "3.1%", participants: "39k", difficulty: "★☆☆" },
    chartData: [20, 35, 50, 70, 78]
  },
  {
    id: "g12",
    title: "清新叶子合成大作战",
    type: "合成类",
    style: "清新",
    scene: "全部",
    hot: 23900,
    time: "2026-04-01",
    colorBg: "from-[#064E3B] via-[#047857] to-[#065F46]",
    tagText: "合成解压 满屏生机",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "6.8%", participants: "160k", difficulty: "★☆☆" },
    chartData: [55, 70, 80, 90, 97]
  },
  {
    id: "g13",
    title: "喜庆黄金接财神",
    type: "接物类",
    style: "喜庆",
    scene: "全部",
    hot: 24800,
    time: "2026-01-20",
    colorBg: "from-[#7F1D1D] via-[#B91C1C] to-[#D97706]",
    tagText: "恭喜发财 金福临门",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "7.1%", participants: "172k", difficulty: "★☆☆" },
    chartData: [50, 65, 80, 95, 98]
  },
  {
    id: "g14",
    title: "像素风拼图大赛",
    type: "益智类",
    style: "简约",
    scene: "全部",
    hot: 15150,
    time: "2026-02-28",
    colorBg: "from-[#111827] via-[#1F2937] to-[#374151]",
    tagText: "经典极简 合二为一",
    hasPrize: false,
    percentage: 81,
    stats: { conversions: "3.4%", participants: "45k", difficulty: "★★☆" },
    chartData: [30, 45, 60, 72, 81]
  },
  {
    id: "g15",
    title: "温情感恩节爱心接力",
    type: "反应类",
    style: "可爱",
    scene: "全部",
    hot: 18900,
    time: "2026-05-08",
    colorBg: "from-[#4C0519] via-[#881337] to-[#BE123C]",
    tagText: "温情感恩 爱心传递",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "5.5%", participants: "110k", difficulty: "★☆☆" },
    chartData: [40, 55, 75, 88, 93]
  },
  // --- New Templates to ensure at least 2 rows (8 items) per category/playstyle ---
  // 消除类 (消除大作战 / 方块消除 / 水果消除 / 糖果派对)
  {
    id: "g16",
    title: "糖果极速消消乐",
    type: "消除类",
    style: "可爱",
    scene: "全部",
    hot: 23100,
    time: "2026-05-12",
    colorBg: "from-pink-600 via-purple-600 to-pink-500",
    tagText: "缤纷糖果 畅快消除",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "6.8%", participants: "150k", difficulty: "★☆☆" },
    chartData: [50, 70, 80, 90, 96]
  },
  {
    id: "g17",
    title: "狂野方块大消除",
    type: "消除类",
    style: "科技",
    scene: "全部",
    hot: 19800,
    time: "2026-05-10",
    colorBg: "from-[#1E1B4B] via-[#4338CA] to-[#60A5FA]",
    tagText: "霓虹美学 极限手速",
    hasPrize: false,
    percentage: 88,
    stats: { conversions: "4.2%", participants: "80k", difficulty: "★★☆" },
    chartData: [35, 55, 70, 80, 88]
  },
  {
    id: "g18",
    title: "盛夏水果甜消消",
    type: "消除类",
    style: "清新",
    scene: "全部",
    hot: 21500,
    time: "2026-05-01",
    colorBg: "from-[#064E3B] via-[#10B981] to-[#F59E0B]",
    tagText: "酷爽夏日 果香满屏",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "5.9%", participants: "110k", difficulty: "★☆☆" },
    chartData: [40, 60, 75, 88, 94]
  },
  {
    id: "g19",
    title: "国潮京剧脸谱消除",
    type: "消除类",
    style: "国潮",
    scene: "端午节",
    hot: 20100,
    time: "2026-05-18",
    colorBg: "from-[#7F1D1D] via-[#DC2626] to-[#F59E0B]",
    tagText: "京剧文化 指尖连消",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.1%", participants: "95k", difficulty: "★★☆" },
    chartData: [45, 60, 70, 82, 91]
  },
  {
    id: "g20",
    title: "简约智联方块消除",
    type: "消除类",
    style: "简约",
    scene: "全部",
    hot: 17200,
    time: "2026-04-15",
    colorBg: "from-slate-800 via-slate-600 to-slate-400",
    tagText: "极简设计 解压连线",
    hasPrize: false,
    percentage: 83,
    stats: { conversions: "3.2%", participants: "50k", difficulty: "★★☆" },
    chartData: [30, 45, 60, 75, 83]
  },
  {
    id: "g21",
    title: "圣诞彩灯派消消",
    type: "消除类",
    style: "喜庆",
    scene: "圣诞节",
    hot: 24700,
    time: "2026-12-20",
    colorBg: "from-red-800 via-red-600 to-emerald-600",
    tagText: "节日彩灯 惊喜大奖",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "7.9%", participants: "165k", difficulty: "★☆☆" },
    chartData: [55, 75, 85, 92, 97]
  },
  // 射击类 (射手大师 / 经典射击 / 空战英豪 / 泡泡龙射击 / 弹球大作战)
  {
    id: "g22",
    title: "赛博空战英豪",
    type: "射击类",
    style: "科技",
    scene: "全部",
    hot: 22100,
    time: "2026-05-14",
    colorBg: "from-[#0F172A] via-[#1E1B4B] to-[#3B82F6]",
    tagText: "极速未来 激光弹幕",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "6.2%", participants: "130k", difficulty: "★★★" },
    chartData: [40, 60, 78, 88, 95]
  },
  {
    id: "g23",
    title: "梦幻多彩泡泡龙",
    type: "射击类",
    style: "可爱",
    scene: "全部",
    hot: 18500,
    time: "2026-05-05",
    colorBg: "from-purple-900 via-fuchsia-800 to-pink-500",
    tagText: "多彩泡泡 欢乐撞击",
    hasPrize: false,
    percentage: 86,
    stats: { conversions: "3.8%", participants: "72k", difficulty: "★☆☆" },
    chartData: [30, 50, 65, 78, 86]
  },
  {
    id: "g24",
    title: "极简弹球大作战",
    type: "射击类",
    style: "简约",
    scene: "全部",
    hot: 16900,
    time: "2026-04-22",
    colorBg: "from-slate-900 via-zinc-800 to-[#64748B]",
    tagText: "极致碰撞 经典解压",
    hasPrize: false,
    percentage: 81,
    stats: { conversions: "3.0%", participants: "45k", difficulty: "★★☆" },
    chartData: [25, 40, 55, 70, 81]
  },
  {
    id: "g25",
    title: "神枪手夺宝特训",
    type: "射击类",
    style: "时尚",
    scene: "全部",
    hot: 20500,
    time: "2026-05-20",
    colorBg: "from-[#111827] via-[#059669] to-[#10B981]",
    tagText: "精准打击 万物皆可靶",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "5.4%", participants: "105k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 85, 92]
  },
  {
    id: "g26",
    title: "中秋萌兔射击赛",
    type: "射击类",
    style: "卡通",
    scene: "中秋节",
    hot: 19400,
    time: "2026-09-10",
    colorBg: "from-indigo-950 via-[#311042] to-amber-600",
    tagText: "发射胡萝卜 赢取团圆券",
    hasPrize: true,
    percentage: 90,
    stats: { conversions: "4.8%", participants: "88k", difficulty: "★★☆" },
    chartData: [35, 55, 70, 82, 90]
  },
  {
    id: "g27",
    title: "元旦喜庆爆竹射击",
    type: "射击类",
    style: "喜庆",
    scene: "劳动节",
    hot: 23800,
    time: "2026-01-01",
    colorBg: "from-red-950 via-red-700 to-amber-500",
    tagText: "噼里啪啦 爆竹迎新",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "7.2%", participants: "140k", difficulty: "★☆☆" },
    chartData: [50, 68, 80, 92, 97]
  },
  // 益智类 (脑力大碰撞 / 智力迷宫 / 算术闯关 / 猜灯谜 / 词汇达人)
  {
    id: "g28",
    title: "脑力迷宫大逃脱",
    type: "益智类",
    style: "商务",
    scene: "全部",
    hot: 17800,
    time: "2026-04-18",
    colorBg: "from-[#0F172A] via-[#1E293B] to-[#475569]",
    tagText: "严谨迷宫 智商大挑战",
    hasPrize: false,
    percentage: 84,
    stats: { conversions: "3.7%", participants: "68k", difficulty: "★★★" },
    chartData: [35, 50, 65, 76, 84]
  },
  {
    id: "g29",
    title: "全民趣味算术闯关",
    type: "益智类",
    style: "卡通",
    scene: "全部",
    hot: 18900,
    time: "2026-05-15",
    colorBg: "from-emerald-900 via-teal-700 to-sky-600",
    tagText: "口算心算 妙趣连连",
    hasPrize: true,
    percentage: 89,
    stats: { conversions: "4.5%", participants: "85k", difficulty: "★★☆" },
    chartData: [40, 55, 70, 80, 89]
  },
  {
    id: "g30",
    title: "成语接龙大词海",
    type: "益智类",
    style: "国潮",
    scene: "全部",
    hot: 21900,
    time: "2026-05-09",
    colorBg: "from-[#451A03] via-[#78350F] to-[#D97706]",
    tagText: "弘扬国学 妙语连珠",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "5.8%", participants: "128k", difficulty: "★★☆" },
    chartData: [45, 65, 80, 90, 95]
  },
  {
    id: "g31",
    title: "端午拼字包粽子",
    type: "益智类",
    style: "清新",
    scene: "端午节",
    hot: 22800,
    time: "2026-05-25",
    colorBg: "from-[#022C22] via-[#047857] to-[#10B981]",
    tagText: "拼出好运 包出香甜",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "6.3%", participants: "135k", difficulty: "★☆☆" },
    chartData: [50, 65, 78, 88, 96]
  },
  {
    id: "g32",
    title: "奇幻极简脑筋急转弯",
    type: "益智类",
    style: "简约",
    scene: "全部",
    hot: 15600,
    time: "2026-03-30",
    colorBg: "from-[#111827] via-slate-800 to-slate-500",
    tagText: "打破常规 趣味大猜想",
    hasPrize: false,
    percentage: 80,
    stats: { conversions: "2.9%", participants: "38k", difficulty: "★☆☆" },
    chartData: [20, 38, 55, 68, 80]
  },
  // 合成类 (合成大西瓜 / 幻兽合成 / 宝石合并 / 神器堆叠 / 糖果消消乐)
  {
    id: "g33",
    title: "全民狂热合成大西瓜",
    type: "合成类",
    style: "可爱",
    scene: "全部",
    hot: 29800,
    time: "2026-05-27",
    colorBg: "from-[#064E3B] via-[#059669] to-[#F59E0B]",
    tagText: "顶流降临 指尖合成",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "10.2%", participants: "450k", difficulty: "★★☆" },
    chartData: [60, 75, 88, 95, 99]
  },
  {
    id: "g34",
    title: "神之幻兽世界合成",
    type: "合成类",
    style: "卡通",
    scene: "全部",
    hot: 21100,
    time: "2026-05-24",
    colorBg: "from-[#1E1B4B] via-[#4338CA] to-[#A855F7]",
    tagText: "魔幻生物 双生成长",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.2%", participants: "102k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 84, 91]
  },
  {
    id: "g35",
    title: "璀璨宝石超级合并",
    type: "合成类",
    style: "奢华",
    scene: "全部",
    hot: 18400,
    time: "2026-04-20",
    colorBg: "from-[#311042] via-[#581C87] to-[#EC4899]",
    tagText: "高贵珠宝 消除合成",
    hasPrize: false,
    percentage: 86,
    stats: { conversions: "3.9%", participants: "65k", difficulty: "★☆☆" },
    chartData: [30, 48, 65, 76, 86]
  },
  {
    id: "g36",
    title: "上古神器堆叠大战",
    type: "合成类",
    style: "国潮",
    scene: "端午节",
    hot: 19900,
    time: "2026-05-16",
    colorBg: "from-[#451A03] via-[#9A3412] to-[#B45309]",
    tagText: "国仙神器 叠高合成",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "5.4%", participants: "92k", difficulty: "★★★" },
    chartData: [35, 55, 72, 85, 93]
  },
  {
    id: "g37",
    title: "彩虹糖果大合并",
    type: "合成类",
    style: "可爱",
    scene: "全部",
    hot: 20200,
    time: "2026-05-02",
    colorBg: "from-[#F43F5E] via-purple-600 to-amber-500",
    tagText: "童话色彩 幸福升温",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "4.9%", participants: "88k", difficulty: "★☆☆" },
    chartData: [40, 52, 68, 80, 92]
  },
  {
    id: "g38",
    title: "极简方块向上升级",
    type: "合成类",
    style: "简约",
    scene: "全部",
    hot: 16100,
    time: "2026-02-18",
    colorBg: "from-zinc-900 via-zinc-700 to-zinc-400",
    tagText: "极简数字 翻倍进化",
    hasPrize: false,
    percentage: 81,
    stats: { conversions: "2.8%", participants: "35k", difficulty: "★★☆" },
    chartData: [25, 40, 55, 68, 81]
  },
  {
    id: "g39",
    title: "中秋团圆月饼大合成",
    type: "合成类",
    style: "喜庆",
    scene: "中秋节",
    hot: 25100,
    time: "2026-09-22",
    colorBg: "from-[#7F1D1D] via-amber-700 to-amber-500",
    tagText: "千层月饼 合并大吉",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "7.7%", participants: "160k", difficulty: "★★☆" },
    chartData: [55, 70, 85, 92, 98]
  },
  // 闯关类 (经典跑酷 / 年兽大作战 / 赛艇争霸 / 地铁大冲锋 / 极速穿越)
  {
    id: "g40",
    title: "地铁金币大冲锋",
    type: "闯关类",
    style: "卡通",
    scene: "全部",
    hot: 22800,
    time: "2026-05-23",
    colorBg: "from-indigo-600 via-sky-600 to-rose-400",
    tagText: "左右滑动 极速穿梭",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "6.5%", participants: "142k", difficulty: "★★☆" },
    chartData: [40, 60, 75, 88, 95]
  },
  {
    id: "g41",
    title: "新春年兽大作战",
    type: "闯关类",
    style: "国潮",
    scene: "全部",
    hot: 26800,
    time: "2026-01-25",
    colorBg: "from-[#7F1D1D] via-[#B91C1C] to-[#F59E0B]",
    tagText: "爆竹赶年兽 岁岁平安",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "8.5%", participants: "210k", difficulty: "★★★" },
    chartData: [50, 70, 85, 92, 98]
  },
  {
    id: "g42",
    title: "端午龙舟赛艇争霸",
    type: "闯关类",
    style: "国潮",
    scene: "端午节",
    hot: 21900,
    time: "2026-05-18",
    colorBg: "from-[#064E3B] via-[#047857] to-[#1E3A8A]",
    tagText: "千帆竞渡 勇往直前",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "5.8%", participants: "95k", difficulty: "★★★" },
    chartData: [35, 55, 70, 82, 93]
  },
  {
    id: "g43",
    title: "未来时空极速穿越",
    type: "闯关类",
    style: "科技",
    scene: "全部",
    hot: 19400,
    time: "2026-03-15",
    colorBg: "from-[#172554] via-[#1E3A8A] to-[#3b82f6]",
    tagText: "赛博太空 障碍闪避",
    hasPrize: false,
    percentage: 86,
    stats: { conversions: "3.9%", participants: "60k", difficulty: "★★★" },
    chartData: [30, 48, 62, 75, 86]
  },
  {
    id: "g44",
    title: "儿童节能能量泡泡越野",
    type: "闯关类",
    style: "可爱",
    scene: "儿童节",
    hot: 20100,
    time: "2026-05-26",
    colorBg: "from-[#EC4899] via-[#F43F5E] to-yellow-500",
    tagText: "童心未泯 快乐越野",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.0%", participants: "88k", difficulty: "★★☆" },
    chartData: [45, 60, 72, 83, 91]
  },
  {
    id: "g45",
    title: "极简迷宫线条穿梭",
    type: "闯关类",
    style: "简约",
    scene: "全部",
    hot: 15400,
    time: "2026-04-05",
    colorBg: "from-zinc-950 via-zinc-800 to-zinc-500",
    tagText: "一触即发 线条极简",
    hasPrize: false,
    percentage: 79,
    stats: { conversions: "2.5%", participants: "32k", difficulty: "★☆☆" },
    chartData: [20, 35, 50, 65, 79]
  },
  {
    id: "g46",
    title: "万圣节幽灵城堡冒险",
    type: "闯关类",
    style: "卡通",
    scene: "万圣节",
    hot: 18200,
    time: "2026-10-28",
    colorBg: "from-amber-950 via-[#4C0519] to-amber-650",
    tagText: "南瓜灯指引 神秘探险",
    hasPrize: false,
    percentage: 84,
    stats: { conversions: "3.2%", participants: "45k", difficulty: "★★☆" },
    chartData: [28, 42, 58, 70, 84]
  },
  {
    id: "g47",
    title: "盛典惊喜礼物狂奔",
    type: "闯关类",
    style: "喜庆",
    scene: "全部",
    hot: 23600,
    time: "2026-05-15",
    colorBg: "from-[#881337] via-[#DC2626] to-[#F59E0B]",
    tagText: "飞跃商场 抢领爆款神券",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "7.1%", participants: "155k", difficulty: "★★☆" },
    chartData: [45, 65, 80, 90, 96]
  },
  // 反应类 (极速闪避 / 乐曲点击 / 黄金矿工 / 节奏大作战 / 手速达人)
  {
    id: "g48",
    title: "手速极限大比拼",
    type: "反应类",
    style: "时尚",
    scene: "全部",
    hot: 21500,
    time: "2026-05-18",
    colorBg: "from-[#111827] via-indigo-900 to-pink-600",
    tagText: "指尖狂飙 反应挑战",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "6.0%", participants: "124k", difficulty: "★★★" },
    chartData: [40, 60, 75, 86, 94]
  },
  {
    id: "g49",
    title: "音律乐曲钢琴师",
    type: "反应类",
    style: "科技",
    scene: "全部",
    hot: 19100,
    time: "2026-05-06",
    colorBg: "from-[#0F172A] via-[#311042] to-indigo-600",
    tagText: "钢琴律动 弹奏大奖",
    hasPrize: false,
    percentage: 87,
    stats: { conversions: "3.8%", participants: "78k", difficulty: "★★★" },
    chartData: [30, 48, 62, 75, 87]
  },
  {
    id: "g50",
    title: "老字号黄金矿工经典",
    type: "反应类",
    style: "卡通",
    scene: "全部",
    hot: 24200,
    time: "2026-05-24",
    colorBg: "from-[#451A03] via-[#B45309] to-[#F59E0B]",
    tagText: "精准出钩 满载而归",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "7.5%", participants: "185k", difficulty: "★★☆" },
    chartData: [50, 70, 82, 92, 97]
  },
  {
    id: "g51",
    title: "端午雄黄酒极速一击",
    type: "反应类",
    style: "国潮",
    scene: "端午节",
    hot: 18500,
    time: "2026-05-19",
    colorBg: "from-[#022C22] via-[#047857] to-[#B45309]",
    tagText: "古风竞渡 激情一拍",
    hasPrize: true,
    percentage: 89,
    stats: { conversions: "4.6%", participants: "70k", difficulty: "★★☆" },
    chartData: [35, 52, 68, 80, 89]
  },
  {
    id: "g52",
    title: "极简点击黑白棋",
    type: "反应类",
    style: "简约",
    scene: "全部",
    hot: 14800,
    time: "2026-04-01",
    colorBg: "from-slate-900 via-slate-700 to-slate-400",
    tagText: "只点黑块 极致纯粹",
    hasPrize: false,
    percentage: 78,
    stats: { conversions: "2.3%", participants: "30k", difficulty: "★☆☆" },
    chartData: [15, 30, 48, 65, 78]
  },
  {
    id: "g53",
    title: "中秋探月极速飞仙",
    type: "反应类",
    style: "插画",
    scene: "中秋节",
    hot: 22600,
    time: "2026-09-18",
    colorBg: "from-indigo-950 via-[#581C87] to-amber-450",
    tagText: "嫦娥奔月 极速闪耀",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "6.2%", participants: "135k", difficulty: "★★☆" },
    chartData: [45, 60, 75, 88, 95]
  },
  // 接物类 (水果接接乐 / 接金币大作战 / 礼物雨 / 疯狂接元宝 / 财神掉红包)
  {
    id: "g54",
    title: "天降大促神券雨",
    type: "接物类",
    style: "时尚",
    scene: "全部",
    hot: 23500,
    time: "2026-05-15",
    colorBg: "from-[#881337] via-[#DC2626] to-[#EF4444]",
    tagText: "满屏好券 抢领不停",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "7.0%", participants: "150k", difficulty: "★☆☆" },
    chartData: [45, 65, 80, 90, 96]
  },
  {
    id: "g55",
    title: "疯狂财富接元宝",
    type: "接物类",
    style: "喜庆",
    scene: "全部",
    hot: 27900,
    time: "2026-05-22",
    colorBg: "from-red-900 via-red-600 to-yellow-500",
    tagText: "天降祥瑞 金玉满堂",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "8.9%", participants: "235k", difficulty: "★☆☆" },
    chartData: [55, 75, 88, 95, 98]
  },
  {
    id: "g56",
    title: "国风锦鲤接福运",
    type: "接物类",
    style: "国潮",
    scene: "端午节",
    hot: 20100,
    time: "2026-05-18",
    colorBg: "from-[#042F1A] via-[#059669] to-[#F59E0B]",
    tagText: "金鳞吐瑞 岁岁长流",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.2%", participants: "82k", difficulty: "★★☆" },
    chartData: [40, 55, 70, 82, 91]
  },
  {
    id: "g57",
    title: "万圣节天降糖果大收割",
    type: "接物类",
    style: "卡通",
    scene: "万圣节",
    hot: 16900,
    time: "2026-10-26",
    colorBg: "from-zinc-950 via-purple-950 to-amber-600",
    tagText: "不给糖就捣蛋 快乐接礼",
    hasPrize: false,
    percentage: 82,
    stats: { conversions: "3.1%", participants: "52k", difficulty: "★☆☆" },
    chartData: [20, 38, 52, 68, 82]
  },
  {
    id: "g58",
    title: "简约金币平衡木",
    type: "接物类",
    style: "简约",
    scene: "全部",
    hot: 14200,
    time: "2026-01-10",
    colorBg: "from-slate-800 via-slate-600 to-slate-400",
    tagText: "优雅平衡 纯粹接金",
    hasPrize: false,
    percentage: 76,
    stats: { conversions: "2.1%", participants: "28k", difficulty: "★★☆" },
    chartData: [15, 30, 45, 62, 76]
  },
  {
    id: "g59",
    title: "劳动节丰收麦穗大丰收",
    type: "接物类",
    style: "清新",
    scene: "劳动节",
    hot: 19800,
    time: "2026-04-28",
    colorBg: "from-amber-900 via-emerald-800 to-amber-500",
    tagText: "金色麦浪 丰收献礼",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "4.8%", participants: "90k", difficulty: "★☆☆" },
    chartData: [35, 52, 70, 85, 92]
  },
  // 动作类 (切水果 / 水果大作战 / 极速狂飙 / 街头格斗 / 快乐跑酷)
  {
    id: "g60",
    title: "超级指尖切切切",
    type: "动作类",
    style: "可爱",
    scene: "全部",
    hot: 25100,
    time: "2026-05-25",
    colorBg: "from-[#4C0519] via-[#E11D48] to-[#F59E0B]",
    tagText: "爽快一刀 连击不断",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "7.7%", participants: "192k", difficulty: "★★☆" },
    chartData: [50, 70, 85, 92, 97]
  },
  {
    id: "g61",
    title: "极速极夜狂飙竞速",
    type: "动作类",
    style: "科技",
    scene: "全部",
    hot: 20900,
    time: "2026-05-11",
    colorBg: "from-[#0F172A] via-blue-950 to-cyan-500",
    tagText: "氮气喷射 终极冲线",
    hasPrize: false,
    percentage: 90,
    stats: { conversions: "4.9%", participants: "96k", difficulty: "★★★" },
    chartData: [35, 55, 72, 83, 90]
  },
  {
    id: "g62",
    title: "国风太极八卦掌击",
    type: "动作类",
    style: "国潮",
    scene: "全部",
    hot: 18200,
    time: "2026-04-05",
    colorBg: "from-zinc-950 via-zinc-800 to-slate-400",
    tagText: "行云流水 唯快不破",
    hasPrize: false,
    percentage: 84,
    stats: { conversions: "3.4%", participants: "58k", difficulty: "★★★" },
    chartData: [25, 40, 58, 70, 84]
  },
  {
    id: "g63",
    title: "圣诞老人快乐礼物跑",
    type: "动作类",
    style: "喜庆",
    scene: "圣诞节",
    hot: 24200,
    time: "2026-12-18",
    colorBg: "from-red-900 via-red-650 to-emerald-600",
    tagText: "雪地狂奔 礼包相赠",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "7.1%", participants: "148k", difficulty: "★★☆" },
    chartData: [45, 65, 80, 90, 96]
  },
  {
    id: "g64",
    title: "端午粽叶水上漂漂流",
    type: "动作类",
    style: "清新",
    scene: "端午节",
    hot: 21200,
    time: "2026-05-12",
    colorBg: "from-[#022C22] via-[#0D9488] to-sky-500",
    tagText: "粽子激流 避障漂流记",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "5.1%", participants: "89k", difficulty: "★★☆" },
    chartData: [35, 55, 72, 84, 92]
  }
];

const CALENDAR_NODES = [
  {
    id: "child",
    month: "6月",
    day: "01",
    title: "儿童节狂欢",
    gameName: "欢乐接糖果",
    tag: "童心大促 ✨",
    bgClass: "from-rose-50/90 to-white hover:to-rose-50/20 border-pink-100/80 hover:border-pink-300 hover:shadow-[0_12px_24px_rgba(244,63,94,0.12)]",
    textClass: "text-pink-600 bg-pink-100/70",
    headerBg: "bg-gradient-to-r from-pink-500 to-rose-500",
    btnClass: "bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-100 hover:shadow-pink-300/50",
    gameId: "candy",
    decor: "🍬🎈",
    hotPill: "🔥 转化：+98%",
    status: "大促筹备中"
  },
  {
    id: "dragon",
    month: "6月",
    day: "19",
    title: "端午拼客节",
    gameName: "粽情划龙舟",
    tag: "国潮传统 🎋",
    bgClass: "from-emerald-50/90 to-white hover:to-emerald-50/20 border-emerald-100/80 hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(16,185,129,0.12)]",
    textClass: "text-emerald-700 bg-emerald-100/70",
    headerBg: "bg-gradient-to-r from-emerald-600 to-teal-600",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100 hover:shadow-emerald-300/50",
    gameId: "dragon",
    decor: "🎋🐉",
    hotPill: "🔥 热度：★★★★★",
    status: "新品首发"
  },
  {
    id: "summer",
    month: "7-8月",
    day: "暑",
    title: "暑期狂欢季",
    gameName: "清凉切西瓜",
    tag: "夏日避暑 🍹",
    bgClass: "from-amber-50/90 to-white hover:to-amber-50/20 border-amber-100/80 hover:border-amber-300 hover:shadow-[0_12px_24px_rgba(245,158,11,0.12)]",
    textClass: "text-amber-700 bg-amber-100/70",
    headerBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    btnClass: "bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-100 hover:shadow-amber-300/50",
    gameId: "watermelon",
    decor: "🍹🌊",
    hotPill: "🔥 裂变：+120%",
    status: "流量峰值"
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

const HOT_SEARCH_EMOJI_MAP: Record<string, string> = {
  儿童节: "🍬",
  端午节: "🛶",
  中秋节: "🥮",
  抽奖: "🎁",
  答题: "🧠",
  消除: "✨",
  夺宝: "🏆",
  全部: "✨"
};

const getHotSearchEmoji = (value: string) => HOT_SEARCH_EMOJI_MAP[value] || "🔥";

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

const categoryTabImageMap: Record<string, string> = {
  "全部": categoryTabAll,
  "消除类": categoryTabElimination,
  "射击类": categoryTabShooting,
  "益智类": categoryTabPuzzle,
  "合成类": categoryTabSynthesis,
  "闯关类": categoryTabStage,
  "反应类": categoryTabReaction,
  "接物类": categoryTabCatching,
  "动作类": categoryTabAction
};

const categoryColorMap: Record<string, { bg: string; icon: string; active: string }> = {
  "全部": { bg: "bg-blue-50", icon: "text-blue-600", active: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]" },
  "精选": { bg: "bg-blue-50", icon: "text-blue-600", active: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]" },
  "消除类": { bg: "bg-red-50", icon: "text-red-500", active: "bg-red-500 text-white shadow-[0_12px_24px_rgba(239,68,68,0.18)]" },
  "射击类": { bg: "bg-violet-50", icon: "text-violet-600", active: "bg-violet-600 text-white shadow-[0_12px_24px_rgba(124,58,237,0.18)]" },
  "益智类": { bg: "bg-amber-50", icon: "text-amber-500", active: "bg-amber-500 text-white shadow-[0_12px_24px_rgba(245,158,11,0.18)]" },
  "合成类": { bg: "bg-emerald-50", icon: "text-emerald-500", active: "bg-emerald-500 text-white shadow-[0_12px_24px_rgba(16,185,129,0.18)]" },
  "闯关类": { bg: "bg-indigo-50", icon: "text-indigo-500", active: "bg-indigo-500 text-white shadow-[0_12px_24px_rgba(99,102,241,0.18)]" },
  "反应类": { bg: "bg-rose-50", icon: "text-rose-500", active: "bg-rose-500 text-white shadow-[0_12px_24px_rgba(244,63,94,0.18)]" },
  "接物类": { bg: "bg-yellow-50", icon: "text-yellow-500", active: "bg-yellow-500 text-white shadow-[0_12px_24px_rgba(234,179,8,0.18)]" },
  "动作类": { bg: "bg-sky-50", icon: "text-sky-600", active: "bg-sky-600 text-white shadow-[0_12px_24px_rgba(14,165,233,0.18)]" }
};

const getUsageText = (hot: number) => `${(hot / 10000).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}万`;

function GameSearchHero({
  title,
  searchValue,
  onSearchChange,
  placeholder,
  hotSearches,
  onHotSearch,
  category = "center"
}: {
  title: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  hotSearches: Array<{ text: string; emoji: string }>;
  onHotSearch: (value: string) => void;
  category?: string;
}) {
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let raf = 0;

    const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const drawGamepad = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 1.25) * 5);
      ctx.rotate(-0.13 + Math.sin(t * 0.8) * 0.035);

      const glow = ctx.createRadialGradient(0, 0, 20, 0, 0, 126);
      glow.addColorStop(0, "rgba(74,144,255,0.22)");
      glow.addColorStop(1, "rgba(74,144,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-140, -120, 280, 240);

      const body = ctx.createLinearGradient(-96, -66, 96, 76);
      body.addColorStop(0, "#ffffff");
      body.addColorStop(0.56, "#eaf3ff");
      body.addColorStop(1, "#cfe3ff");
      ctx.fillStyle = body;
      roundedRect(ctx, -98, -62, 196, 124, 32);
      ctx.fill();
      ctx.strokeStyle = "rgba(130,160,230,0.24)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.lineCap = "round";
      ctx.strokeStyle = "#2f6cff";
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.moveTo(-68, -8);
      ctx.lineTo(-26, -8);
      ctx.moveTo(-47, -29);
      ctx.lineTo(-47, 13);
      ctx.stroke();

      const pulse = 1 + Math.sin(t * 2.6) * 0.1;
      [
        [48, -27, "#ff5aa7", 10 * pulse],
        [74, -9, "#f4d12f", 10],
        [40, 13, "#31c5ec", 10],
        [65, 21, "#5edb80", 8]
      ].forEach(([x, y, color, r]) => {
        ctx.beginPath();
        ctx.fillStyle = String(color);
        ctx.arc(Number(x), Number(y), Number(r), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawArcade = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.cos(t * 1.1) * 4);
      ctx.rotate(0.12 + Math.sin(t * 0.75) * 0.035);

      const glow = ctx.createRadialGradient(0, -18, 10, 0, -8, 132);
      glow.addColorStop(0, "rgba(138,107,255,0.24)");
      glow.addColorStop(1, "rgba(138,107,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-145, -140, 290, 280);

      const base = ctx.createLinearGradient(-82, -74, 84, 82);
      base.addColorStop(0, "#f5f3ff");
      base.addColorStop(0.58, "#cddcff");
      base.addColorStop(1, "#91c5ff");
      ctx.fillStyle = base;
      roundedRect(ctx, -82, -70, 164, 138, 34);
      ctx.fill();
      ctx.strokeStyle = "rgba(118,119,218,0.24)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const stickTilt = Math.sin(t * 1.8) * 8;
      ctx.strokeStyle = "#f05aa9";
      ctx.lineWidth = 22;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(stickTilt, -58);
      ctx.lineTo(stickTilt + 9, -5);
      ctx.stroke();

      const knob = ctx.createRadialGradient(stickTilt - 7, -78, 4, stickTilt, -72, 28);
      knob.addColorStop(0, "#ffd3ec");
      knob.addColorStop(1, "#ff5eaa");
      ctx.beginPath();
      ctx.fillStyle = knob;
      ctx.arc(stickTilt, -78, 24, 0, Math.PI * 2);
      ctx.fill();

      const slot = ctx.createLinearGradient(-40, -20, 46, 16);
      slot.addColorStop(0, "rgba(255,255,255,0.92)");
      slot.addColorStop(1, "rgba(255,255,255,0.46)");
      ctx.fillStyle = slot;
      roundedRect(ctx, -48, -24, 96, 40, 22);
      ctx.fill();

      [
        [-48, 34, "#ff6b5f"],
        [48, 38, "#ff6b5f"],
        [0, 44, "#5b8dff"]
      ].forEach(([x, y, color], i) => {
        const r = 10 + Math.sin(t * 2.4 + i) * 1.6;
        ctx.beginPath();
        ctx.fillStyle = String(color);
        ctx.arc(Number(x), Number(y), r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawPuzzlePiece = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color;
      roundedRect(ctx, x, y, size, size, 10);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.arc(x + size, y + size * 0.5, size * 0.15, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawThemeShape = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, side: "left" | "right") => {
      if (category === "center") {
        if (side === "left") drawGamepad(ctx, w, h, t);
        else drawArcade(ctx, w, h, t);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 1.2 + (side === "left" ? 0 : 1)) * 4);
      ctx.rotate((side === "left" ? -0.12 : 0.12) + Math.sin(t * 0.8) * 0.03);

      const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
      glow.addColorStop(0, "rgba(82,130,255,0.16)");
      glow.addColorStop(1, "rgba(82,130,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-130, -110, 260, 220);

      const bob = Math.sin(t * 2) * 4;

      switch (category) {
        case "消除类": {
          const colors = ["#ff5d7a", "#ffcc3d", "#32d2b3", "#4e8cff", "#9b6cff", "#ff8a3d"];
          for (let i = 0; i < 9; i++) {
            const x = -62 + (i % 3) * 48;
            const y = -44 + Math.floor(i / 3) * 44 + Math.sin(t * 2 + i) * 3;
            roundedRect(ctx, x, y, 34, 34, 9);
            ctx.fillStyle = colors[(i + (side === "left" ? 0 : 2)) % colors.length];
            ctx.fill();
          }
          if (side === "right") {
            ctx.strokeStyle = "#2563eb";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(-70, 62);
            ctx.lineTo(70, 62);
            ctx.stroke();
          }
          break;
        }
        case "射击类": {
          if (side === "left") {
            ctx.fillStyle = "#3b82f6";
            ctx.beginPath();
            ctx.moveTo(0, -64 + bob);
            ctx.lineTo(58, 40 + bob);
            ctx.lineTo(12, 22 + bob);
            ctx.lineTo(0, 72 + bob);
            ctx.lineTo(-12, 22 + bob);
            ctx.lineTo(-58, 40 + bob);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#93c5fd";
            ctx.beginPath();
            ctx.arc(0, -2 + bob, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#f97316";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(0, -80 + bob);
            ctx.lineTo(0, -112 + bob - Math.sin(t * 6) * 8);
            ctx.stroke();
          } else {
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 8;
            [54, 34, 15].forEach((r) => {
              ctx.beginPath();
              ctx.arc(0, 0, r, 0, Math.PI * 2);
              ctx.stroke();
            });
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(Math.sin(t * 2) * 10, Math.cos(t * 2) * 10, 8, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        case "益智类": {
          if (side === "left") {
            ctx.fillStyle = "#fbbf24";
            ctx.beginPath();
            ctx.arc(0, -20 + bob, 48, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fff7ed";
            roundedRect(ctx, -22, 28 + bob, 44, 28, 10);
            ctx.fill();
            ctx.strokeStyle = "#f59e0b";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(-18, 0 + bob);
            ctx.lineTo(0, 16 + bob);
            ctx.lineTo(23, -14 + bob);
            ctx.stroke();
          } else {
            drawPuzzlePiece(ctx, -58, -42 + bob, 54, "#8b5cf6");
            drawPuzzlePiece(ctx, 5, -26 - bob, 54, "#22c55e");
            drawPuzzlePiece(ctx, -22, 38 + bob, 54, "#38bdf8");
          }
          break;
        }
        case "合成类": {
          if (side === "left") {
            [
              { x: -46, y: 18, r: 26, color: "#ef4444" },
              { x: 0, y: -10, r: 36, color: "#f59e0b" },
              { x: 46, y: 24, r: 26, color: "#22c55e" },
            ].forEach((item, index) => {
              ctx.beginPath();
              ctx.fillStyle = item.color;
              ctx.arc(item.x, item.y + Math.sin(t * 1.7 + index) * 3, item.r, 0, Math.PI * 2);
              ctx.fill();
            });
            ctx.strokeStyle = "#2563eb";
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(-18, -56);
            ctx.quadraticCurveTo(14, -78, 52, -44);
            ctx.stroke();
          } else {
            const layers = [
              { x: -36, y: 26, r: 28, color: "#facc15" },
              { x: 0, y: 0, r: 34, color: "#fb7185" },
              { x: 36, y: 28, r: 28, color: "#34d399" },
            ];
            layers.forEach((item, index) => {
              ctx.beginPath();
              ctx.fillStyle = item.color;
              ctx.arc(item.x, item.y + Math.cos(t * 1.5 + index) * 3, item.r, 0, Math.PI * 2);
              ctx.fill();
            });
          }
          break;
        }
        case "闯关类": {
          if (side === "left") {
            const steps = [
              { x: -62, y: 36, w: 40, h: 18 },
              { x: -12, y: 10, w: 40, h: 18 },
              { x: 38, y: -16, w: 40, h: 18 },
            ];
            ctx.fillStyle = "#cbd5e1";
            steps.forEach((step) => {
              roundedRect(ctx, step.x, step.y, step.w, step.h, 8);
              ctx.fill();
            });
            ctx.fillStyle = "#2563eb";
            ctx.beginPath();
            ctx.arc(-24, 10 + bob, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#2563eb";
            ctx.lineWidth = 7;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(-10, 22 + bob);
            ctx.lineTo(18, 0 + bob);
            ctx.lineTo(44, -20 + bob);
            ctx.stroke();
          } else {
            ctx.fillStyle = "#94a3b8";
            for (let i = 0; i < 3; i++) {
              roundedRect(ctx, -60 + i * 48, 28 - i * 28, 46, 22, 8);
              ctx.fill();
            }
            ctx.fillStyle = "#f97316";
            ctx.beginPath();
            ctx.arc(58, -56 + bob, 20, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        case "反应类": {
          if (side === "left") {
            ctx.fillStyle = "#f43f5e";
            ctx.beginPath();
            ctx.arc(0, 0, 56, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#2563eb";
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const r = 54 + Math.sin(t * 4) * 4;
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#2563eb";
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.26, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        case "接物类": {
          if (side === "left") {
            ctx.strokeStyle = "#0ea5e9";
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.moveTo(-76, 34);
            ctx.quadraticCurveTo(0, 72, 76, 34);
            ctx.stroke();
            ctx.fillStyle = "#bae6fd";
            roundedRect(ctx, -72, 30, 144, 34, 16);
            ctx.fill();
            [
              { x: -34, y: -34, color: "#f59e0b" },
              { x: 8, y: -8, color: "#facc15" },
              { x: 44, y: -42, color: "#fb7185" },
            ].forEach((item, index) => {
              ctx.beginPath();
              ctx.fillStyle = item.color;
              ctx.arc(item.x, item.y + ((t * 26 + index * 18) % 24), 16, 0, Math.PI * 2);
              ctx.fill();
            });
          } else {
            for (let i = 0; i < 6; i++) {
              ctx.fillStyle = i % 2 ? "#f59e0b" : "#facc15";
              ctx.beginPath();
              ctx.arc(-58 + i * 24, -54 + ((i * 29 + t * 38) % 100), 12, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.fillStyle = "#ef4444";
            roundedRect(ctx, -54, 46, 108, 28, 12);
            ctx.fill();
          }
          break;
        }
        case "动作类": {
          if (side === "left") {
            ctx.fillStyle = "#22c55e";
            ctx.beginPath();
            ctx.ellipse(-20, 8, 46, 28, -0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.arc(-20, 8, 46, -0.5, 2.6);
            ctx.stroke();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 7;
            ctx.beginPath();
            ctx.moveTo(-78 + Math.sin(t * 2) * 16, -48);
            ctx.lineTo(82, 62);
            ctx.stroke();
          } else {
            ctx.strokeStyle = "#2563eb";
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(-60, 46);
            ctx.quadraticCurveTo(-8, -78, 60, 36);
            ctx.stroke();
            ctx.fillStyle = "#f97316";
            ctx.beginPath();
            ctx.arc(52 + Math.sin(t * 3) * 8, 34, 18, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        default:
          if (side === "left") drawGamepad(ctx, w, h, t);
          else drawArcade(ctx, w, h, t);
      }

      ctx.restore();
    };

    const render = () => {
      frame += 1;
      const t = frame / 60;
      [
        { canvas: leftCanvasRef.current, side: "left" as const },
        { canvas: rightCanvasRef.current, side: "right" as const }
      ].forEach(({ canvas, side }) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.save();
        ctx.scale(dpr, dpr);
        drawThemeShape(ctx, rect.width, rect.height, t, side);
        ctx.restore();
      });
      raf = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, [category]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#f4f7ff_0%,#ffffff_48%,#eef4ff_100%)] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="pointer-events-none absolute left-7 top-14 hidden h-44 w-52 rounded-[45%] bg-blue-200/20 blur-3xl md:block" />
      <div className="pointer-events-none absolute right-7 top-8 hidden h-52 w-56 rounded-[45%] bg-violet-200/28 blur-3xl md:block" />
      <div className="pointer-events-none absolute left-[6%] top-[18%] hidden overflow-visible md:block">
        <canvas ref={leftCanvasRef} className="h-[260px] w-[320px] overflow-visible" aria-hidden="true" />
      </div>
      <div className="pointer-events-none absolute right-[6%] top-[16%] hidden overflow-visible md:block">
        <canvas ref={rightCanvasRef} className="h-[260px] w-[320px] overflow-visible" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-[30px] font-black leading-tight tracking-normal text-slate-900 sm:text-[40px]">
          {title}
        </h1>
        <div className="mt-7 flex h-[60px] w-full max-w-[720px] items-center gap-3 rounded-full border border-blue-100 bg-white px-5 shadow-[0_16px_34px_rgba(40,98,255,0.14)]">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] font-normal text-slate-800 outline-none placeholder:text-slate-400"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange("")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              title="清空搜索"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition hover:bg-blue-700">
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5 flex max-w-[720px] flex-wrap items-center justify-center gap-2 text-[12px] font-bold text-slate-500">
          <span className="mr-1 text-slate-600">热门搜索:</span>
          {hotSearches.map((term) => (
            <button
              key={term.text}
              onClick={() => onHotSearch(term.text)}
              className="rounded-full bg-slate-100/80 px-3 py-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <span className="mr-1.5">{term.emoji}</span>
              {term.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameCategoryTabs({
  items,
  active,
  onSelect,
  showIcons = true,
}: {
  items: Array<{ id: string; name: string }>;
  active: string;
  onSelect: (id: string) => void;
  showIcons?: boolean;
}) {
  return (
    <div className="relative z-20 -mt-9 flex justify-center px-6 sm:px-8 lg:px-10">
      <div className="inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-3xl border border-slate-100 bg-white/95 px-3 py-2 shadow-[0_16px_40px_rgba(30,58,138,0.08)] backdrop-blur no-scrollbar">
        {items.map((item, index) => {
          const colors = categoryColorMap[item.id] || categoryColorMap["全部"];
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                showIcons
                  ? "relative flex h-11 min-w-[104px] items-center justify-center rounded-2xl px-5 text-[13px] font-black transition-all cursor-pointer"
                  : "relative flex h-10 min-w-[92px] items-center justify-center rounded-2xl px-4 text-[13px] font-black transition-all cursor-pointer",
                isActive ? colors.active : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {showIcons ? (
                <span className={cn(
                  "mr-2 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full",
                  isActive ? "bg-white/16" : colors.bg
                )}>
                  <img
                    src={categoryTabImageMap[item.id] || categoryTabImageMap["全部"]}
                    alt={item.name}
                    className="h-full w-full scale-[1.06] rounded-full object-cover object-center"
                    draggable={false}
                  />
                </span>
              ) : null}
              <span>{item.name}</span>
              {index < items.length - 1 && !isActive && (
                <span className="pointer-events-none absolute right-[-5px] top-1/2 hidden h-4 w-px -translate-y-1/2 bg-slate-200 lg:block" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MarketingTemplateCard({
  item,
  index,
  categoryKey = "center",
  onDetail
}: {
  key?: React.Key;
  item: any;
  index: number;
  categoryKey?: string;
  onDetail: () => void;
}) {
  const image = getTemplateImage(index, categoryKey);
  const tags = [item.type, item.scene === "全部" ? item.style : item.scene].filter(Boolean).slice(0, 2);

  return (
    <TemplateCard
      key={item.id}
      title={item.title}
      image={image}
      category={tags[0] || item.type}
      subCategory={tags[1] || (item.scene === "全部" ? item.style : item.scene)}
      usageText={item.hot > 10000 ? `${(item.hot / 10000).toFixed(1)}w` : `${item.hot}`}
      onClick={onDetail}
      badgeText={item.percentage >= 95 ? "爆款" : undefined}
      badgeClassName="bg-red-500/90"
      imageWrapperClassName={cn("bg-gradient-to-br", item.colorBg)}
    />
  );
}

function TemplateGalleryPanel({
  title,
  subtitle,
  templates,
  categoryKey = "center",
  selectedSort,
  onSortChange,
  onDetail,
  emptyTitle,
  emptyDesc,
  onReset
}: {
  title: string;
  subtitle: string;
  templates: any[];
  categoryKey?: string;
  selectedSort: string;
  onSortChange: (value: string) => void;
  onDetail: (id: string) => void;
  emptyTitle: string;
  emptyDesc: string;
  onReset: () => void;
}) {
  const orderedTemplates = shuffleBySeed(templates, categoryKey);
  const displayTemplates = orderedTemplates.length === 0
    ? []
    : orderedTemplates.length >= 16
      ? orderedTemplates.slice(0, 16)
      : Array.from({ length: 16 }, (_, index) => orderedTemplates[index % orderedTemplates.length]);

  return (
    <section className="px-6 pb-10 pt-6 sm:px-8 lg:px-10">
      <div className="rounded-[28px] bg-white/92 p-4 shadow-[0_18px_60px_rgba(30,58,138,0.08)] ring-1 ring-slate-100 sm:p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-end gap-3">
            <h2 className="text-[20px] font-black tracking-normal text-slate-900">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              <option value="综合排序">综合排序</option>
              <option value="模板热度">最热排行</option>
              <option value="上架时间">最新上线</option>
            </select>
          </div>
        </div>

        {displayTemplates.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6 2xl:grid-cols-7 min-[1800px]:grid-cols-8">
            {displayTemplates.map((item, index) => (
              <MarketingTemplateCard
                key={`${item.id}-${index}`}
                item={item}
                index={index}
                categoryKey={categoryKey}
                onDetail={() => onDetail(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
              <Info className="h-8 w-8" />
            </div>
            <p className="text-[15px] font-black text-slate-600">{emptyTitle}</p>
            <p className="mt-1 text-sm font-bold text-slate-400">{emptyDesc}</p>
            <button
              onClick={onReset}
              className="mt-5 rounded-full bg-blue-600 px-6 py-2.5 text-[13px] font-black text-white shadow-sm transition hover:bg-blue-700"
            >
              重置过滤
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function GamifiedMarketingCenter() {
  // Unified page theme helper properties (Hardcoded to website consistent standard blue)
  const themeBtn = "bg-blue-600 hover:bg-blue-700";
  const themeText = "text-blue-600";
  const themeBgLight = "bg-blue-50";
  const themeBorder = "border-blue-200 flex-wrap";
  const themeFocusRing = "focus:ring-blue-500/20 focus:border-blue-500";
  const integrationItems = [
    {
      title: "微信小程序对接",
      subtitle: "无需开发 极速嵌接",
      onClick: () => alert("微信小程序对接：支持一键将微端和游戏发布为独立微信小程序，多级缓存秒级响应。如需具体对接技术文档，请点击下方「定制服务」联系技术支持人员。"),
      icon: MessagesSquare,
      iconClassName: "text-emerald-500",
      subtitleClassName: "text-emerald-600/80",
    },
    {
      title: "APP 集成安全方案",
      subtitle: "iOS & Android 无缝嵌入",
      onClick: () => alert("APP集成方案：全面支持 iOS/Android Native App 集成、Flutter/React Native 混合架构。轻量级 SDK 方案可使研发在 3 小时内实现首款游戏落地接入。"),
      icon: Smartphone,
      iconClassName: "text-blue-500",
      subtitleClassName: "text-blue-600/75",
    },
    {
      title: "活动接口打通",
      subtitle: "资产互通 数据同步",
      onClick: () => alert("活动接口打通：可接入现有 CRM 以及会员积分体系，完美实现游戏金币、成长值、优惠券等道具资产与核心用户库的实时结算流。"),
      icon: Code,
      iconClassName: "text-amber-500",
      subtitleClassName: "text-amber-600/80",
    },
  ];

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
      candy: "g9",
      dragon: "g5",
      watermelon: "g12"
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

  const currentDetailTemplate = useMemo(() => {
    if (!detailTemplateId) return null;
    return TEMPLATES_DATA.find((item) => item.id === detailTemplateId) || null;
  }, [detailTemplateId]);

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

          {!isShortScreen && (
            <div className="mt-auto px-2 pb-4 space-y-3 text-left shrink-0">
              <IntegrationOptionsSection items={integrationItems} />

              <div className="space-y-0.5">
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
            </div>
          )}
        </div>

        {/* Floating/Absolute Service and Support only when screen height is small/short */}
        {isShortScreen && (
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md pt-2 pb-3 px-2 border-t border-slate-100 shadow-[0_-8px_20px_rgba(0,0,0,0.03)] z-20 space-y-3 text-left">
            <IntegrationOptionsSection items={integrationItems} />
            <div className="space-y-0.5">
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
          </div>
        )}
      </aside>

      {/* 2. Right Content Block */}
      <section id="gamified-scroll" className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
        {detailTemplateId && currentDetailTemplate ? (
          <SiteTemplateDetailPage
            template={currentDetailTemplate}
            previewImage={getTemplateImage(
              Math.max(
                0,
                TEMPLATES_DATA.findIndex((t) => t.id === detailTemplateId)
              ),
              currentDetailTemplate.type
            )}
            recommendations={TEMPLATES_DATA.filter((t) => t.id !== detailTemplateId).map((item) => ({ id: item.id }))}
            renderRecommendationCard={(item, index) => {
              const target = TEMPLATES_DATA.find((t) => t.id === item.id)!;
              return (
                <MarketingTemplateCard
                  key={target.id}
                  item={target}
                  index={index}
                  onDetail={() => handleSelectTemplateDetail(target.id)}
                />
              );
            }}
            onBack={() => {
              setDetailTemplateId(null);
              setTrialGameId(null);
              setGameState("start");
            }}
            onPrimaryAction={() => alert(`已一键导入【${currentDetailTemplate.title}】！玩法对应的AI策划、前端画风资源和默认积分奖池已同步下发至您的主后台，可进入玩法编辑台二次调整参数。`)}
            onSecondaryAction={() => alert(`恭喜，【${currentDetailTemplate.title}】一键线上发布成功！活动海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`)}
            onToggleFavorite={() => toggleFavorite(detailTemplateId!)}
            isFavorite={favorites.has(detailTemplateId!)}
            themeButtonClassName={themeBtn}
          />
        ) : activeSidebar === "center" ? (
          <div className="w-full animate-in fade-in duration-300">
            <GameSearchHero
              title={<>搜索你想要的<span className="text-blue-600">小游戏模板</span></>}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="搜索儿童节、抽奖、答题、消除、夺宝等玩法"
              hotSearches={["儿童节", "端午节", "中秋节", "抽奖", "答题", "消除", "夺宝"].map((text) => ({
                text,
                emoji: getHotSearchEmoji(text)
              }))}
              onHotSearch={setSearchQuery}
              category="center"
            />

            <GameCategoryTabs
              items={GAMEPLAY_CATEGORIES.map((cat) => ({ id: cat.id, name: cat.id === "全部" ? "全部" : cat.name }))}
              active={selectedType}
              onSelect={handleTypeSelect}
            />

            <TemplateGalleryPanel
              title={selectedType === "全部" ? "全部模板" : selectedType + "模板"}
              subtitle={"共 " + filteredTemplates.length.toLocaleString() + " 个模板"}
              templates={filteredTemplates}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              onDetail={handleSelectTemplateDetail}
              emptyTitle="未找到匹配该过滤条件的玩法模板"
              emptyDesc="请尝试更换分类或搜索其他关键词"
              onReset={() => {
                setSelectedType("全部");
                setSelectedStyle("全部");
                setSelectedFestival("全部");
                setSearchQuery("");
                setActiveSidebar("center");
              }}
            />
          </div>
        ) : (
          <div className="w-full animate-in fade-in duration-300">
            {(() => {
              const catConfig = CATEGORY_CONFIGS[activeSidebar];
              if (!catConfig) return null;

              return (
                <>
                  <GameSearchHero
                    title={<><span className="text-blue-600">{activeSidebar}</span>小游戏模板</>}
                    searchValue={categorySearchQuery}
                    onSearchChange={setCategorySearchQuery}
                    placeholder={"搜索" + activeSidebar + "玩法模板、节日场景、活动主题"}
                    hotSearches={catConfig.subPlaystyles.slice(0, 6).map((text) => ({
                      text,
                      emoji: getHotSearchEmoji(text)
                    }))}
                    category={activeSidebar}
                    onHotSearch={(value) => {
                      if (catConfig.subPlaystyles.includes(value)) {
                        setSelectedCategorySubFilter(value);
                      } else {
                        setCategorySearchQuery(value);
                      }
                    }}
                  />

                  <GameCategoryTabs
                    items={catConfig.subPlaystyles.map((sub) => ({ id: sub === "全部" ? activeSidebar : sub, name: sub }))}
                    active={selectedCategorySubFilter === "全部" ? activeSidebar : selectedCategorySubFilter}
                    onSelect={(id) => setSelectedCategorySubFilter(id === activeSidebar ? "全部" : id)}
                    showIcons={false}
                  />

                  <TemplateGalleryPanel
                    title={activeSidebar + "模板"}
                    subtitle={"共 " + categoryFiltered.length.toLocaleString() + " 个模板"}
                    templates={categoryFiltered}
                    categoryKey={activeSidebar}
                    selectedSort={selectedSort}
                    onSortChange={setSelectedSort}
                    onDetail={handleSelectTemplateDetail}
                    emptyTitle="该细分玩法或搜索目录下，暂无对应的配置模板"
                    emptyDesc="请尝试切换到其他玩法筛选项，或者清除本专区搜索框内容"
                    onReset={() => {
                      setCategorySearchQuery("");
                      setSelectedCategorySubFilter("全部");
                    }}
                  />
                </>
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

    </div>
  );
}
