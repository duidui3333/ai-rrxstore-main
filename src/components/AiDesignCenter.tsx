import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Album,
  BookOpen,
  Briefcase,
  Code,
  FileText,
  HelpCircle,
  Images,
  Info,
  LayoutTemplate,
  MessageSquareCode,
  MonitorSmartphone,
  Newspaper,
  Paintbrush2,
  PenTool,
  Search,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import IntegrationOptionsSection from "./IntegrationOptionsSection";
import TemplateCard from "./TemplateCard";
import SiteTemplateDetailPage from "./SiteTemplateDetailPage";
import categoryTabAll from "../assets/images/category-tabs/tab_all.png";
import designH5Icon from "../assets/images/design-icons/h5.png";
import designPosterIcon from "../assets/images/design-icons/poster.png";
import designArticleIcon from "../assets/images/design-icons/article.png";
import designAlbumIcon from "../assets/images/design-icons/album.png";
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

type DesignSectionId = "center" | "h5" | "poster" | "article" | "album";
type DesignTemplateType = "H5" | "海报" | "文章";

type DesignTemplate = {
  id: string;
  title: string;
  type: DesignTemplateType;
  scene: string;
  style: string;
  tags: string[];
  usageText: string;
  image: string;
  hot: number;
  time: string;
  badgeText?: string;
};

const TEMPLATE_IMAGES = [
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
  templateImage12,
];

const LEFT_NAV_ITEMS: Array<{
  id: DesignSectionId;
  label: string;
  icon: typeof LayoutTemplate;
  heroTitle: React.ReactNode;
  placeholder: string;
  hotSearches: Array<{ text: string; emoji: string }>;
}> = [
  {
    id: "center",
    label: "模板中心",
    icon: LayoutTemplate,
    heroTitle: <>搜索你想要的<span className="text-blue-600">设计模板</span></>,
    placeholder: "搜索邀请函、教育培训、招聘招生、品牌宣传",
    hotSearches: [
      { text: "邀请函", emoji: "🎉" },
      { text: "教育培训", emoji: "🎓" },
      { text: "招聘招生", emoji: "💼" },
      { text: "酒店民宿", emoji: "🏨" },
      { text: "电商促销", emoji: "🛍️" },
      { text: "医疗健康", emoji: "🏥" },
    ],
  },
  {
    id: "h5",
    label: "H5模板",
    icon: MonitorSmartphone,
    heroTitle: <>搜索你想要的<span className="text-blue-600">H5模板</span></>,
    placeholder: "搜索品牌宣传 H5、活动邀请、招生招聘、节日营销",
    hotSearches: [
      { text: "活动邀请", emoji: "📱" },
      { text: "品牌宣传", emoji: "🚀" },
      { text: "招生招聘", emoji: "📚" },
      { text: "节日营销", emoji: "🎊" },
      { text: "企业介绍", emoji: "🏢" },
      { text: "电商推广", emoji: "🛒" },
    ],
  },
  {
    id: "poster",
    label: "海报模板",
    icon: Paintbrush2,
    heroTitle: <>搜索你想要的<span className="text-blue-600">海报模板</span></>,
    placeholder: "搜索节日海报、活动海报、门店促销、招聘海报",
    hotSearches: [
      { text: "节日海报", emoji: "🖼️" },
      { text: "活动海报", emoji: "🎫" },
      { text: "门店促销", emoji: "🏪" },
      { text: "品牌传播", emoji: "📢" },
      { text: "招聘海报", emoji: "👩‍💼" },
      { text: "美业海报", emoji: "💄" },
    ],
  },
  {
    id: "article",
    label: "文章模板",
    icon: Newspaper,
    heroTitle: <>搜索你想要的<span className="text-blue-600">文章模板</span></>,
    placeholder: "搜索公众号封面、长图推文、活动宣传、课程内容",
    hotSearches: [
      { text: "公众号头图", emoji: "📰" },
      { text: "长图推文", emoji: "📖" },
      { text: "品牌内容", emoji: "🏷️" },
      { text: "课程宣传", emoji: "🎓" },
      { text: "行业分析", emoji: "📈" },
      { text: "活动预热", emoji: "🌟" },
    ],
  },
  {
    id: "album",
    label: "电子画册",
    icon: Album,
    heroTitle: <>上传图片生成<span className="text-blue-600">电子画册</span></>,
    placeholder: "",
    hotSearches: [],
  },
];

const BLUE_CATEGORY_ITEMS = [
  { id: "all", name: "全部", icon: categoryTabAll },
  { id: "h5", name: "H5", icon: designH5Icon },
  { id: "poster", name: "海报", icon: designPosterIcon },
  { id: "article", name: "文章", icon: designArticleIcon },
  { id: "album", name: "电子画册", icon: designAlbumIcon },
];

const TAGS_BY_SECTION: Record<Exclude<DesignSectionId, "album">, string[]> = {
  center: ["全部", "邀请函", "教育培训", "招聘招生", "文娱旅游", "餐饮美食", "汽车", "房产", "酒店", "电商", "美业", "金融理财", "医疗健康", "IT互联网", "更多"],
  h5: ["全部", "品牌宣传", "活动邀请", "会议会展", "课程招生", "企业招聘", "门店营销", "节日祝福", "旅游推广", "产品发布", "周年庆", "更多"],
  poster: ["全部", "节日海报", "活动促销", "招聘海报", "课程海报", "会议会展", "品牌海报", "门店海报", "新品上市", "美业海报", "餐饮海报", "更多"],
  article: ["全部", "公众号封面", "长图文章", "品牌故事", "课程内容", "活动宣传", "通知公告", "案例复盘", "企业资讯", "行业解读", "节日专题", "更多"],
};

const TEMPLATE_DATA_BY_SECTION: Record<Exclude<DesignSectionId, "album">, DesignTemplate[]> = {
  center: [
    { id: "design-center-1", title: "幼儿园毕业典礼邀请函", type: "H5", scene: "教育培训", style: "简约", tags: ["邀请函", "教育培训"], usageText: "2.8w", image: TEMPLATE_IMAGES[0], hot: 28000, time: "2026-05-20", badgeText: "精选" },
    { id: "design-center-2", title: "企业春季招聘宣传海报", type: "海报", scene: "招聘招生", style: "商务", tags: ["招聘招生"], usageText: "1.6w", image: TEMPLATE_IMAGES[1], hot: 16000, time: "2026-05-18" },
    { id: "design-center-3", title: "门店周年庆活动长图推文", type: "文章", scene: "餐饮美食", style: "清新", tags: ["餐饮美食"], usageText: "1.1w", image: TEMPLATE_IMAGES[2], hot: 11000, time: "2026-05-22" },
    { id: "design-center-4", title: "酒店夏季特惠活动邀请函", type: "H5", scene: "酒店", style: "时尚", tags: ["邀请函", "酒店"], usageText: "1.9w", image: TEMPLATE_IMAGES[3], hot: 19000, time: "2026-05-17" },
    { id: "design-center-5", title: "医美开业庆典视觉海报", type: "海报", scene: "美业", style: "高级", tags: ["美业"], usageText: "9.6k", image: TEMPLATE_IMAGES[4], hot: 9600, time: "2026-05-12" },
    { id: "design-center-6", title: "品牌新品上市公众号长图", type: "文章", scene: "电商", style: "科技", tags: ["电商"], usageText: "1.3w", image: TEMPLATE_IMAGES[5], hot: 13000, time: "2026-05-15" },
    { id: "design-center-7", title: "汽车试驾会预约 H5", type: "H5", scene: "汽车", style: "酷黑", tags: ["汽车"], usageText: "8.8k", image: TEMPLATE_IMAGES[6], hot: 8800, time: "2026-05-09" },
    { id: "design-center-8", title: "文旅活动宣传视觉海报", type: "海报", scene: "文娱旅游", style: "国潮", tags: ["文娱旅游"], usageText: "7.9k", image: TEMPLATE_IMAGES[7], hot: 7900, time: "2026-05-21" },
    { id: "design-center-9", title: "地产项目开盘推文模板", type: "文章", scene: "房产", style: "商务", tags: ["房产"], usageText: "1.0w", image: TEMPLATE_IMAGES[8], hot: 10000, time: "2026-05-11" },
    { id: "design-center-10", title: "金融理财用户邀约 H5", type: "H5", scene: "金融理财", style: "简约", tags: ["金融理财", "邀请函"], usageText: "6.7k", image: TEMPLATE_IMAGES[9], hot: 6700, time: "2026-05-06" },
    { id: "design-center-11", title: "连锁门店促销活动海报", type: "海报", scene: "电商", style: "活力", tags: ["电商"], usageText: "1.2w", image: TEMPLATE_IMAGES[10], hot: 12000, time: "2026-05-23" },
    { id: "design-center-12", title: "互联网产品更新公告长图", type: "文章", scene: "IT互联网", style: "极简", tags: ["IT互联网"], usageText: "5.5k", image: TEMPLATE_IMAGES[11], hot: 5500, time: "2026-05-04" },
  ],
  h5: [
    { id: "design-h5-1", title: "品牌宣传发布会 H5", type: "H5", scene: "品牌宣传", style: "商务", tags: ["品牌宣传"], usageText: "1.7w", image: TEMPLATE_IMAGES[1], hot: 17000, time: "2026-05-20", badgeText: "推荐" },
    { id: "design-h5-2", title: "暑期课程招生邀约 H5", type: "H5", scene: "课程招生", style: "活力", tags: ["课程招生", "邀请函"], usageText: "1.4w", image: TEMPLATE_IMAGES[2], hot: 14000, time: "2026-05-14" },
    { id: "design-h5-3", title: "门店开业预约报名 H5", type: "H5", scene: "门店营销", style: "清新", tags: ["门店营销", "邀请函"], usageText: "1.1w", image: TEMPLATE_IMAGES[3], hot: 11000, time: "2026-05-10" },
    { id: "design-h5-4", title: "企业招聘启事 H5", type: "H5", scene: "企业招聘", style: "简约", tags: ["企业招聘"], usageText: "8.4k", image: TEMPLATE_IMAGES[4], hot: 8400, time: "2026-05-08" },
    { id: "design-h5-5", title: "旅游节宣传推广 H5", type: "H5", scene: "旅游推广", style: "文艺", tags: ["旅游推广"], usageText: "9.1k", image: TEMPLATE_IMAGES[5], hot: 9100, time: "2026-05-13" },
    { id: "design-h5-6", title: "节日祝福互动 H5", type: "H5", scene: "节日祝福", style: "国潮", tags: ["节日祝福"], usageText: "1.5w", image: TEMPLATE_IMAGES[6], hot: 15000, time: "2026-05-16" },
  ],
  poster: [
    { id: "design-poster-1", title: "商场周年庆促销海报", type: "海报", scene: "活动促销", style: "潮流", tags: ["活动促销"], usageText: "1.3w", image: TEMPLATE_IMAGES[7], hot: 13000, time: "2026-05-19", badgeText: "热门" },
    { id: "design-poster-2", title: "公司招聘纳新海报", type: "海报", scene: "招聘海报", style: "商务", tags: ["招聘海报"], usageText: "8.9k", image: TEMPLATE_IMAGES[8], hot: 8900, time: "2026-05-11" },
    { id: "design-poster-3", title: "母亲节门店活动海报", type: "海报", scene: "节日海报", style: "温暖", tags: ["节日海报"], usageText: "1.2w", image: TEMPLATE_IMAGES[9], hot: 12000, time: "2026-05-17" },
    { id: "design-poster-4", title: "教育讲座报名海报", type: "海报", scene: "课程海报", style: "简约", tags: ["课程海报"], usageText: "7.5k", image: TEMPLATE_IMAGES[10], hot: 7500, time: "2026-05-07" },
    { id: "design-poster-5", title: "新品上市传播海报", type: "海报", scene: "新品上市", style: "高级", tags: ["新品上市"], usageText: "9.8k", image: TEMPLATE_IMAGES[11], hot: 9800, time: "2026-05-15" },
    { id: "design-poster-6", title: "连锁门店店庆海报", type: "海报", scene: "门店海报", style: "活力", tags: ["门店海报"], usageText: "6.6k", image: TEMPLATE_IMAGES[0], hot: 6600, time: "2026-05-12" },
  ],
  article: [
    { id: "design-article-1", title: "公众号活动预热长图", type: "文章", scene: "活动宣传", style: "清新", tags: ["活动宣传"], usageText: "1.0w", image: TEMPLATE_IMAGES[2], hot: 10000, time: "2026-05-22", badgeText: "新上" },
    { id: "design-article-2", title: "品牌故事图文模板", type: "文章", scene: "品牌故事", style: "文艺", tags: ["品牌故事"], usageText: "7.3k", image: TEMPLATE_IMAGES[4], hot: 7300, time: "2026-05-09" },
    { id: "design-article-3", title: "课程内容推文长图", type: "文章", scene: "课程内容", style: "极简", tags: ["课程内容"], usageText: "8.2k", image: TEMPLATE_IMAGES[6], hot: 8200, time: "2026-05-18" },
    { id: "design-article-4", title: "企业资讯公告模板", type: "文章", scene: "企业资讯", style: "商务", tags: ["企业资讯"], usageText: "6.9k", image: TEMPLATE_IMAGES[8], hot: 6900, time: "2026-05-08" },
    { id: "design-article-5", title: "节日专题内容页", type: "文章", scene: "节日专题", style: "国潮", tags: ["节日专题"], usageText: "9.0w", image: TEMPLATE_IMAGES[10], hot: 9000, time: "2026-05-16" },
    { id: "design-article-6", title: "行业观察分析长图", type: "文章", scene: "行业解读", style: "科技", tags: ["行业解读"], usageText: "5.8k", image: TEMPLATE_IMAGES[1], hot: 5800, time: "2026-05-13" },
  ],
};

const TYPE_TO_SECTION: Record<Exclude<DesignTemplateType, never>, DesignSectionId> = {
  H5: "h5",
  海报: "poster",
  文章: "article",
};

const CATEGORY_COLOR_MAP: Record<string, { bg: string; active: string }> = {
  all: { bg: "bg-blue-50", active: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]" },
  h5: { bg: "bg-sky-50", active: "bg-sky-600 text-white shadow-[0_12px_24px_rgba(2,132,199,0.18)]" },
  poster: { bg: "bg-fuchsia-50", active: "bg-fuchsia-600 text-white shadow-[0_12px_24px_rgba(192,38,211,0.18)]" },
  article: { bg: "bg-amber-50", active: "bg-amber-600 text-white shadow-[0_12px_24px_rgba(217,119,6,0.18)]" },
  album: { bg: "bg-emerald-50", active: "bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.18)]" },
};

function openDesignAlert(message: string) {
  window.alert(message);
}

function shuffleBySeed<T>(items: T[], seedKey: string) {
  return [...items]
    .map((item, index) => ({
      item,
      score: `${seedKey}-${index}-${JSON.stringify(item)}`.split("").reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) >>> 0, 0),
    }))
    .sort((a, b) => a.score - b.score)
    .map((entry) => entry.item);
}

function ServiceSupportSection() {
  return (
    <div className="space-y-0.5">
      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 select-none">服务与支持</div>
      <button onClick={() => openDesignAlert("人人秀帮助中心：为您提供全方位的技术指导、方案部署细节、以及模版编辑疑问。")} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left">
        <HelpCircle className="w-4 h-4 text-slate-400" />
        帮助中心
      </button>
      <button onClick={() => openDesignAlert("客户案例看板：查阅大型跨国零售商、大促电商、本地生活等各板块优秀落地转化案例。")} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left">
        <BookOpen className="w-4 h-4 text-slate-400" />
        客户案例
      </button>
      <button onClick={() => openDesignAlert("开放平台开发者门户：可提供统一的 OAuth2 会员鉴权、营销引擎调用接口 API 和安全回调机制。")} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left">
        <Code className="w-4 h-4 text-slate-400" />
        开放平台
      </button>
      <button onClick={() => openDesignAlert("定制服务专家：支持提供专属节日营销IP设计、深层系统打通等高级服务，我们将安排专门资深顾问联系您。")} className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left">
        <Briefcase className="w-4 h-4 text-slate-400" />
        定制服务
      </button>
    </div>
  );
}

function DesignSearchHero({
  title,
  searchValue,
  onSearchChange,
  placeholder,
  hotSearches,
  onHotSearch,
  variant,
}: {
  title: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  hotSearches: Array<{ text: string; emoji: string }>;
  onHotSearch: (value: string) => void;
  variant: DesignSectionId;
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

    const drawChip = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, radius = 16) => {
      ctx.fillStyle = color;
      roundedRect(ctx, x, y, w, h, radius);
      ctx.fill();
    };

    const drawFloatingSpark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.32, -size * 0.32);
      ctx.lineTo(size, 0);
      ctx.lineTo(size * 0.32, size * 0.32);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.32, size * 0.32);
      ctx.lineTo(-size, 0);
      ctx.lineTo(-size * 0.32, -size * 0.32);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawCenterLeft = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 1.1) * 5);
      ctx.rotate(-0.08);
      drawChip(ctx, -108, -78, 216, 156, "#ffffff", 36);

      const board = ctx.createLinearGradient(-88, -58, 88, 58);
      board.addColorStop(0, "#f8fbff");
      board.addColorStop(1, "#edf4ff");
      ctx.fillStyle = board;
      roundedRect(ctx, -92, -64, 184, 128, 30);
      ctx.fill();

      const leftCard = ctx.createLinearGradient(-74, -28, -12, 38);
      leftCard.addColorStop(0, "#5aa7ff");
      leftCard.addColorStop(1, "#34d399");
      ctx.fillStyle = leftCard;
      roundedRect(ctx, -78, -30, 62, 78, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-30, -6, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.moveTo(-72, 26);
      ctx.lineTo(-50, 4);
      ctx.lineTo(-34, 18);
      ctx.lineTo(-16, -2);
      ctx.lineTo(-16, 34);
      ctx.closePath();
      ctx.fill();

      const rightCard = ctx.createLinearGradient(6, -40, 74, 26);
      rightCard.addColorStop(0, "#fb7185");
      rightCard.addColorStop(1, "#f472b6");
      ctx.fillStyle = rightCard;
      roundedRect(ctx, 8, -42, 70, 62, 16);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      roundedRect(ctx, 20, -26, 42, 7, 3.5);
      ctx.fill();
      roundedRect(ctx, 20, -12, 46, 7, 3.5);
      ctx.fill();
      roundedRect(ctx, 20, 2, 38, 7, 3.5);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -6, 28, 88, 14, 7);
      ctx.fill();
      roundedRect(ctx, -6, 50, 72, 12, 6);
      ctx.fill();
      roundedRect(ctx, -6, 8, 12, 60, 6);
      ctx.fill();

      drawFloatingSpark(ctx, -84, -50, 9 + Math.sin(t * 2) * 1.5, "#60a5fa", t);
      drawFloatingSpark(ctx, 84, 54, 10 + Math.cos(t * 2.1) * 1.5, "#a78bfa", -t);
      ctx.restore();
    };

    const drawCenterRight = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.cos(t * 1.15) * 4);
      ctx.rotate(0.09);
      drawChip(ctx, -98, -82, 196, 164, "#ffffff", 36);

      const bg = ctx.createLinearGradient(-80, -62, 80, 62);
      bg.addColorStop(0, "#f8fbff");
      bg.addColorStop(1, "#eef4ff");
      ctx.fillStyle = bg;
      roundedRect(ctx, -84, -68, 168, 136, 30);
      ctx.fill();

      const poster = ctx.createLinearGradient(-42, -26, 20, 36);
      poster.addColorStop(0, "#f59e0b");
      poster.addColorStop(1, "#fb923c");
      ctx.fillStyle = poster;
      roundedRect(ctx, -48, -30, 42, 52, 14);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-20, -14, 5, 0, Math.PI * 2);
      ctx.fill();
      drawChip(ctx, -42, 30, 32, 7, "#cbd5e1", 3.5);

      const article = ctx.createLinearGradient(18, -18, 54, 42);
      article.addColorStop(0, "#f472b6");
      article.addColorStop(1, "#ec4899");
      ctx.fillStyle = article;
      roundedRect(ctx, 20, -20, 38, 50, 12);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      roundedRect(ctx, 28, -8, 20, 6, 3);
      ctx.fill();
      roundedRect(ctx, 28, 4, 18, 6, 3);
      ctx.fill();

      drawChip(ctx, -4, 40, 34, 24, "#ffffff", 12);
      ctx.fillStyle = "#5b8dff";
      ctx.beginPath();
      ctx.arc(2, 52, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.arc(22, 54, 7, 0, Math.PI * 2);
      ctx.fill();

      drawFloatingSpark(ctx, -64, -48, 9 + Math.sin(t * 2) * 1.4, "#f59e0b", t);
      drawFloatingSpark(ctx, 66, 58, 8 + Math.cos(t * 1.8) * 1.5, "#818cf8", -t);
      ctx.restore();
    };

    const drawH5Left = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 1.1) * 4);
      ctx.scale(0.88, 0.88);
      ctx.rotate(-0.1);

      const shell = ctx.createLinearGradient(-88, -132, 88, 132);
      shell.addColorStop(0, "#3b82f6");
      shell.addColorStop(1, "#8b5cf6");
      drawChip(ctx, -74, -122, 148, 244, shell as unknown as string, 36);

      ctx.fillStyle = shell;
      roundedRect(ctx, -74, -122, 148, 244, 36);
      ctx.fill();

      drawChip(ctx, -64, -108, 128, 216, "#ffffff", 30);
      drawChip(ctx, -54, -92, 108, 184, "#ffffff", 24);

      const darkPanel = ctx.createLinearGradient(-46, -84, 46, 84);
      darkPanel.addColorStop(0, "#4f7df7");
      darkPanel.addColorStop(1, "#2f5fda");
      ctx.fillStyle = darkPanel;
      roundedRect(ctx, -46, -84, 92, 168, 22);
      ctx.fill();

      const pageHeight = 168;
      const cycle = 2.2;
      const phase = (t % cycle) / cycle;
      const activePage = Math.floor(t / cycle) % 2;
      const swipeProgress = phase < 0.62 ? 0 : Math.min(1, (phase - 0.62) / 0.18);
      const easeInOut = swipeProgress <= 0
        ? 0
        : swipeProgress >= 1
          ? 1
          : swipeProgress < 0.5
            ? 4 * swipeProgress * swipeProgress * swipeProgress
            : 1 - Math.pow(-2 * swipeProgress + 2, 3) / 2;
      const scroll = easeInOut * pageHeight;

      const drawInvitePage = (offsetY: number, kind: "cover" | "detail") => {
        ctx.save();
        ctx.translate(0, offsetY);
        const pageBg = ctx.createLinearGradient(-30, -62, 30, 62);
        pageBg.addColorStop(0, kind === "cover" ? "#f8fbff" : "#ffffff");
        pageBg.addColorStop(1, kind === "cover" ? "#edf4ff" : "#eef4ff");
        ctx.fillStyle = pageBg;
        roundedRect(ctx, -30, -60, 60, 120, 16);
        ctx.fill();

        if (kind === "cover") {
          const hero = ctx.createLinearGradient(-20, -44, 20, 8);
          hero.addColorStop(0, "#7aa2ff");
          hero.addColorStop(1, "#4f46e5");
          ctx.fillStyle = hero;
          roundedRect(ctx, -20, -44, 40, 52, 14);
          ctx.fill();
          drawChip(ctx, -15, 18, 30, 8, "#bcd5ff", 4);
          drawChip(ctx, -15, 32, 24, 8, "#d6e6ff", 4);
          drawChip(ctx, -15, 46, 18, 8, "#e5efff", 4);
        } else {
          drawChip(ctx, -18, -40, 36, 7, "#8b5cf6", 4);
          drawChip(ctx, -14, -24, 28, 7, "#c4b5fd", 4);
          drawChip(ctx, -20, -2, 40, 30, "#f1f5ff", 10);
          drawChip(ctx, -14, 36, 28, 7, "#bfd7ff", 4);
          drawChip(ctx, -14, 48, 22, 7, "#dbeafe", 4);
        }
        ctx.restore();
      };

      ctx.save();
      ctx.beginPath();
      roundedRect(ctx, -46, -84, 92, 168, 22);
      ctx.clip();
      const currentKind = activePage === 0 ? "cover" : "detail";
      const nextKind = activePage === 0 ? "detail" : "cover";
      drawInvitePage(-scroll, currentKind);
      drawInvitePage(pageHeight - scroll, nextKind);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.22 + (1 - easeInOut) * 0.68;
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.moveTo(0, 74);
      ctx.lineTo(-7, 86);
      ctx.lineTo(7, 86);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      const fingerTravel = easeInOut <= 0 ? 0 : Math.min(1, easeInOut * 1.06);
      const fingerOpacity = phase < 0.54 ? 0 : phase < 0.62 ? (phase - 0.54) / 0.08 : phase < 0.8 ? 1 : Math.max(0, 1 - (phase - 0.8) / 0.12);
      ctx.save();
      ctx.globalAlpha = fingerOpacity * 0.95;
      ctx.translate(20, 18 - fingerTravel * 44);
      ctx.rotate(-0.18);
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -8, -20, 16, 32, 8);
      ctx.fill();
      ctx.fillStyle = "#dbeafe";
      roundedRect(ctx, -5, -14, 10, 18, 5);
      ctx.fill();
      ctx.restore();

      drawChip(ctx, -16, 96, 32, 8, "#93c5fd", 6);
      drawFloatingSpark(ctx, -82, -84, 10 + Math.sin(t * 2) * 2, "#fbbf24", t);
      drawFloatingSpark(ctx, 82, 76, 9 + Math.cos(t * 2.2) * 2, "#60a5fa", -t);
      ctx.restore();
    };

    const drawH5Right = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.cos(t * 1.05) * 4);
      ctx.scale(0.88, 0.88);
      ctx.rotate(0.08);

      const shell = ctx.createLinearGradient(-88, -132, 88, 132);
      shell.addColorStop(0, "#c4b5fd");
      shell.addColorStop(1, "#93c5fd");
      ctx.fillStyle = shell;
      roundedRect(ctx, -74, -122, 148, 244, 36);
      ctx.fill();

      drawChip(ctx, -64, -108, 128, 216, "#ffffff", 30);
      const screen = ctx.createLinearGradient(-52, -90, 52, 92);
      screen.addColorStop(0, "#faf5ff");
      screen.addColorStop(1, "#eef4ff");
      ctx.fillStyle = screen;
      roundedRect(ctx, -52, -90, 104, 180, 24);
      ctx.fill();

      const progress = (Math.sin(t * 0.95) + 1) / 2;
      const stage = (offset: number) => Math.max(0, Math.min(1, (progress - offset) / 0.22));
      const easeOut = (n: number) => 1 - Math.pow(1 - n, 3);
      const titleStage = easeOut(stage(0.02));
      const subStage = easeOut(stage(0.14));
      const infoStage = easeOut(stage(0.28));
      const buttonStage = easeOut(stage(0.42));
      const decorStage = easeOut(stage(0.56));

      ctx.save();
      ctx.globalAlpha = titleStage;
      ctx.translate(0, (1 - titleStage) * 12);
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-26, -52);
      ctx.bezierCurveTo(-2, -64, 14, -42, 32, -50);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = subStage;
      ctx.translate(0, (1 - subStage) * 12);
      drawChip(ctx, -24, -32, 48, 8, "#c4b5fd", 4);
      drawChip(ctx, -14, -16, 28, 8, "#ddd6fe", 4);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = infoStage;
      ctx.translate(0, (1 - infoStage) * 14);
      drawChip(ctx, -30, 0, 60, 34, "#ffffff", 12);
      ctx.save();
      ctx.fillStyle = "#7aa2ff";
      ctx.beginPath();
      ctx.arc(-16, 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      drawChip(ctx, -6, 5, 26, 6, "#bfd7ff", 3);
      drawChip(ctx, -6, 18, 36, 6, "#dbeafe", 3);
      drawChip(ctx, -28, 46, 56, 22, "#f8fbff", 10);
      drawChip(ctx, -20, 54, 16, 6, "#8b5cf6", 3);
      drawChip(ctx, 0, 54, 24, 6, "#c4b5fd", 3);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = buttonStage;
      ctx.translate(0, (1 - buttonStage) * 10);
      const btn = ctx.createLinearGradient(-18, 74, 18, 90);
      btn.addColorStop(0, "#5b8dff");
      btn.addColorStop(1, "#4f46e5");
      ctx.fillStyle = btn;
      roundedRect(ctx, -20, 72, 40, 14, 7);
      ctx.fill();
      ctx.restore();

      ctx.restore();
    };

    const drawPosterLeft = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 0.9) * 4);
      ctx.rotate(-0.14);
      drawChip(ctx, -88, -72, 176, 144, "#ffffff", 28);
      const bg = ctx.createLinearGradient(-68, -52, 68, 52);
      bg.addColorStop(0, "#fef3c7");
      bg.addColorStop(0.45, "#fda4af");
      bg.addColorStop(1, "#c4b5fd");
      ctx.fillStyle = bg;
      roundedRect(ctx, -72, -56, 144, 112, 20);
      ctx.fill();
      drawChip(ctx, -54, -30, 92, 18, "rgba(255,255,255,0.4)", 8);
      drawChip(ctx, -54, -2, 108, 48, "rgba(255,255,255,0.18)", 18);
      drawFloatingSpark(ctx, 54, -40, 12 + Math.sin(t * 2) * 2, "#f59e0b", t);
      drawFloatingSpark(ctx, -60, 42, 10 + Math.cos(t * 2.2) * 2, "#ec4899", -t);
      ctx.restore();
    };

    const drawPosterRight = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.cos(t * 1.15) * 4);
      ctx.rotate(0.08);
      drawChip(ctx, -68, -98, 136, 196, "#ffffff", 30);
      const bg = ctx.createLinearGradient(-44, -74, 44, 74);
      bg.addColorStop(0, "#fb7185");
      bg.addColorStop(0.5, "#f59e0b");
      bg.addColorStop(1, "#fde68a");
      ctx.fillStyle = bg;
      roundedRect(ctx, -52, -82, 104, 164, 22);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.font = "900 26px sans-serif";
      ctx.fillText("POST", -30, -28);
      drawChip(ctx, -36, 6, 72, 18, "rgba(255,255,255,0.28)", 9);
      drawChip(ctx, -24, 36, 48, 48, "rgba(255,255,255,0.2)", 14);
      ctx.restore();
    };

    const drawArticleLeft = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 0.85) * 4);
      ctx.scale(0.84, 0.84);
      ctx.rotate(-0.08);
      drawChip(ctx, -94, -114, 188, 228, "#ffffff", 32);
      const hero = ctx.createLinearGradient(-78, -100, 78, -28);
      hero.addColorStop(0, "#dc2626");
      hero.addColorStop(0.48, "#ef4444");
      hero.addColorStop(1, "#f97316");
      ctx.fillStyle = hero;
      roundedRect(ctx, -78, -100, 156, 68, 24);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      ctx.beginPath();
      ctx.arc(0, -92, 58, Math.PI, 2 * Math.PI);
      ctx.fill();
      drawChip(ctx, -56, -4, 112, 20, "#fff2cf", 10);
      drawChip(ctx, -34, 2, 68, 8, "#d1d5db", 4);

      drawChip(ctx, -70, 34, 140, 88, "#ffffff", 14);
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2;
      roundedRect(ctx, -70, 34, 140, 88, 14);
      ctx.stroke();
      [
        [-52, 50, 104],
        [-52, 64, 96],
        [-52, 78, 98],
        [-52, 92, 88],
        [-52, 106, 76],
      ].forEach(([x, y, width], index) => {
        ctx.fillStyle = index === 0 ? "#94a3b8" : "#cbd5e1";
        roundedRect(ctx, Number(x), Number(y), Number(width), 7, 3.5);
        ctx.fill();
      });

      drawFloatingSpark(ctx, -90, -96, 9 + Math.sin(t * 1.7) * 1.4, "#f59e0b", t);
      drawFloatingSpark(ctx, 90, 104, 8 + Math.cos(t * 1.9) * 1.4, "#fb7185", -t);
      ctx.restore();
    };

    const drawArticleRight = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.cos(t * 0.8) * 4);
      ctx.scale(0.84, 0.84);
      ctx.rotate(0.08);
      drawChip(ctx, -94, -102, 188, 204, "#ffffff", 32);
      const articleBg = ctx.createLinearGradient(-78, -88, 78, 86);
      articleBg.addColorStop(0, "#f8fafc");
      articleBg.addColorStop(1, "#eef2ff");
      ctx.fillStyle = articleBg;
      roundedRect(ctx, -80, -88, 160, 176, 24);
      ctx.fill();

      const thumb = ctx.createLinearGradient(-60, -70, 60, -8);
      thumb.addColorStop(0, "#fb7185");
      thumb.addColorStop(1, "#f59e0b");
      ctx.fillStyle = thumb;
      roundedRect(ctx, -62, -72, 124, 48, 16);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      roundedRect(ctx, -48, -58, 68, 7, 3.5);
      ctx.fill();
      roundedRect(ctx, -48, -44, 48, 7, 3.5);
      ctx.fill();

      const blocks = [
        { y: -2, w: 102 },
        { y: 14, w: 110 },
        { y: 30, w: 88 },
        { y: 58, w: 116 },
        { y: 74, w: 104 },
      ];
      blocks.forEach((block, index) => {
        ctx.fillStyle = index === 0 ? "#475569" : "#cbd5e1";
        roundedRect(ctx, -56, block.y, block.w, 9, 4.5);
        ctx.fill();
      });

      drawFloatingSpark(ctx, -92, -94, 9 + Math.sin(t * 1.6) * 1.2, "#60a5fa", t);
      drawFloatingSpark(ctx, 92, 96, 9 + Math.cos(t * 1.7) * 1.2, "#f59e0b", -t);
      ctx.restore();
    };

    const drawAlbumLeft = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 0.6) * 4);
      ctx.rotate(-0.04);

      const pageFlip = (Math.sin(t * 0.9) + 1) / 2;
      drawChip(ctx, -122, -78, 244, 156, "#ffffff", 34);
      drawChip(ctx, -112, -68, 224, 136, "#f8fafc", 28);

      const spine = ctx.createLinearGradient(-8, -68, 8, 68);
      spine.addColorStop(0, "#dbe4f5");
      spine.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = spine;
      roundedRect(ctx, -6, -66, 12, 132, 6);
      ctx.fill();

      const leftPage = ctx.createLinearGradient(-106, -58, -12, 58);
      leftPage.addColorStop(0, "#ffffff");
      leftPage.addColorStop(1, "#eff6ff");
      ctx.fillStyle = leftPage;
      roundedRect(ctx, -108, -60, 98, 120, 18);
      ctx.fill();

      const leftPhoto = ctx.createLinearGradient(-96, -44, -22, 20);
      leftPhoto.addColorStop(0, "#93c5fd");
      leftPhoto.addColorStop(1, "#34d399");
      ctx.fillStyle = leftPhoto;
      roundedRect(ctx, -96, -46, 74, 54, 14);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-38, -26, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.moveTo(-92, 6);
      ctx.lineTo(-70, -12);
      ctx.lineTo(-52, 2);
      ctx.lineTo(-24, -22);
      ctx.lineTo(-22, 8);
      ctx.closePath();
      ctx.fill();
      drawChip(ctx, -96, 20, 62, 8, "#bfdbfe", 4);
      drawChip(ctx, -96, 36, 52, 8, "#dbeafe", 4);

      const rightPageWidth = 98;
      ctx.save();
      ctx.translate(10, 0);
      ctx.scale(1 - pageFlip * 0.18, 1);
      const rightPage = ctx.createLinearGradient(0, -58, rightPageWidth, 58);
      rightPage.addColorStop(0, "#ffffff");
      rightPage.addColorStop(1, "#ecfeff");
      ctx.fillStyle = rightPage;
      roundedRect(ctx, 0, -60, rightPageWidth, 120, 18);
      ctx.fill();
      const rightPhoto = ctx.createLinearGradient(10, -44, 80, 20);
      rightPhoto.addColorStop(0, "#f9a8d4");
      rightPhoto.addColorStop(1, "#c4b5fd");
      ctx.fillStyle = rightPhoto;
      roundedRect(ctx, 10, -46, 76, 50, 14);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(64, -28, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fb7185";
      ctx.beginPath();
      ctx.moveTo(14, 4);
      ctx.lineTo(36, -10);
      ctx.lineTo(54, 4);
      ctx.lineTo(82, -18);
      ctx.lineTo(86, 10);
      ctx.closePath();
      ctx.fill();
      drawChip(ctx, 10, 20, 64, 8, "#ddd6fe", 4);
      drawChip(ctx, 10, 36, 46, 8, "#e9d5ff", 4);
      ctx.restore();

      drawFloatingSpark(ctx, -126, -72, 10 + Math.sin(t * 1.6) * 1.5, "#60a5fa", t);
      drawFloatingSpark(ctx, 126, 70, 10 + Math.cos(t * 1.8) * 1.5, "#34d399", -t);
      ctx.restore();
    };

    const drawAlbumRight = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.cos(t * 0.55) * 4);
      ctx.rotate(0.05);

      const pageFlip = (Math.sin(t * 0.82 + 0.8) + 1) / 2;
      drawChip(ctx, -126, -80, 252, 160, "#ffffff", 34);
      drawChip(ctx, -116, -70, 232, 140, "#f8fafc", 28);

      const leftPage = ctx.createLinearGradient(-108, -60, -8, 60);
      leftPage.addColorStop(0, "#ffffff");
      leftPage.addColorStop(1, "#eef2ff");
      ctx.fillStyle = leftPage;
      roundedRect(ctx, -110, -62, 100, 124, 18);
      ctx.fill();
      const leftImage = ctx.createLinearGradient(-98, -48, -24, 18);
      leftImage.addColorStop(0, "#fde68a");
      leftImage.addColorStop(1, "#fb7185");
      ctx.fillStyle = leftImage;
      roundedRect(ctx, -98, -50, 76, 52, 14);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-42, -30, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.moveTo(-94, 4);
      ctx.lineTo(-70, -8);
      ctx.lineTo(-52, 8);
      ctx.lineTo(-24, -18);
      ctx.lineTo(-22, 10);
      ctx.closePath();
      ctx.fill();
      drawChip(ctx, -98, 18, 66, 8, "#fed7aa", 4);
      drawChip(ctx, -98, 34, 52, 8, "#ffedd5", 4);

      const rightPage = ctx.createLinearGradient(8, -60, 104, 60);
      rightPage.addColorStop(0, "#ffffff");
      rightPage.addColorStop(1, "#ecfeff");
      ctx.fillStyle = rightPage;
      roundedRect(ctx, 8, -62, 102, 124, 18);
      ctx.fill();

      ctx.save();
      ctx.translate(8, 0);
      const flipInset = 12 + pageFlip * 8;
      const albumPhoto = ctx.createLinearGradient(flipInset, -46, 90, 18);
      albumPhoto.addColorStop(0, "#93c5fd");
      albumPhoto.addColorStop(1, "#34d399");
      ctx.fillStyle = albumPhoto;
      roundedRect(ctx, flipInset, -48, 78, 54, 14);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(72, -30, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.moveTo(flipInset + 4, 4);
      ctx.lineTo(flipInset + 28, -12);
      ctx.lineTo(flipInset + 46, 2);
      ctx.lineTo(flipInset + 74, -20);
      ctx.lineTo(flipInset + 78, 8);
      ctx.closePath();
      ctx.fill();
      drawChip(ctx, flipInset, 18, 66, 8, "#a7f3d0", 4);
      drawChip(ctx, flipInset, 34, 50, 8, "#d1fae5", 4);
      ctx.restore();

      const spine = ctx.createLinearGradient(-6, -68, 6, 68);
      spine.addColorStop(0, "#dbe4f5");
      spine.addColorStop(1, "#cbd5e1");
      ctx.fillStyle = spine;
      roundedRect(ctx, -6, -66, 12, 132, 6);
      ctx.fill();

      drawFloatingSpark(ctx, -132, -74, 10 + Math.sin(t * 1.7) * 1.4, "#93c5fd", t);
      drawFloatingSpark(ctx, 130, 72, 10 + Math.cos(t * 1.6) * 1.4, "#34d399", -t);
      ctx.restore();
    };

    const drawVariant = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, side: "left" | "right") => {
      if (variant === "h5") return side === "left" ? drawH5Left(ctx, w, h, t) : drawH5Right(ctx, w, h, t);
      if (variant === "poster") return side === "left" ? drawPosterLeft(ctx, w, h, t) : drawPosterRight(ctx, w, h, t);
      if (variant === "article") return side === "left" ? drawArticleLeft(ctx, w, h, t) : drawArticleRight(ctx, w, h, t);
      if (variant === "album") return side === "left" ? drawAlbumLeft(ctx, w, h, t) : drawAlbumRight(ctx, w, h, t);
      return side === "left" ? drawCenterLeft(ctx, w, h, t) : drawCenterRight(ctx, w, h, t);
    };

    const render = () => {
      frame += 1;
      const t = frame / 60;
      [
        { canvas: leftCanvasRef.current, side: "left" as const },
        { canvas: rightCanvasRef.current, side: "right" as const },
      ].forEach(({ canvas, side }) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.save();
        ctx.scale(dpr, dpr);
        drawVariant(ctx, rect.width, rect.height, t, side);
        ctx.restore();
      });
      raf = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, [variant]);

  return (
    <section
      className={cn(
        "relative bg-[linear-gradient(135deg,#f4f7ff_0%,#ffffff_48%,#eef4ff_100%)] px-6 py-14 sm:px-10 lg:px-16 lg:py-20",
        variant === "album" ? "min-h-[300px] overflow-visible py-12 lg:py-14" : "overflow-hidden"
      )}
    >
      <div className="pointer-events-none absolute left-7 top-14 hidden h-44 w-52 rounded-[45%] bg-blue-200/20 blur-3xl md:block" />
      <div className="pointer-events-none absolute right-7 top-8 hidden h-52 w-56 rounded-[45%] bg-violet-200/28 blur-3xl md:block" />
      <div className={cn("pointer-events-none absolute hidden md:block overflow-visible", variant === "album" ? "left-[7%] top-[10%]" : "left-[6%] top-[18%]")}>
        <canvas ref={leftCanvasRef} className={cn("overflow-visible", variant === "album" ? "h-[300px] w-[360px]" : "h-[260px] w-[320px]")} aria-hidden="true" />
      </div>
      <div className={cn("pointer-events-none absolute hidden md:block overflow-visible", variant === "album" ? "right-[7%] top-[8%]" : "right-[6%] top-[16%]")}>
        <canvas ref={rightCanvasRef} className={cn("overflow-visible", variant === "album" ? "h-[300px] w-[360px]" : "h-[260px] w-[320px]")} aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-[30px] font-black leading-tight tracking-normal text-slate-900 sm:text-[40px]">{title}</h1>
        {variant !== "album" ? (
          <>
            <div className="mt-7 flex h-[60px] w-full max-w-[720px] items-center gap-3 rounded-full border border-blue-100 bg-white px-5 shadow-[0_16px_34px_rgba(40,98,255,0.14)]">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input value={searchValue} onChange={(e) => onSearchChange(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-[15px] font-normal text-slate-800 outline-none placeholder:text-slate-400" />
              {searchValue ? (
                <button onClick={() => onSearchChange("")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              ) : null}
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition hover:bg-blue-700">
                <Search className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 flex max-w-[720px] flex-wrap items-center justify-center gap-2 text-[12px] font-bold text-slate-500">
              <span className="mr-1 text-slate-600">热门搜索:</span>
              {hotSearches.map((term) => (
                <button key={term.text} onClick={() => onHotSearch(term.text)} className="rounded-full bg-slate-100/80 px-3 py-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600">
                  <span className="mr-1.5">{term.emoji}</span>
                  {term.text}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function DesignCategoryTabs({
  items,
  active,
  onSelect,
  variant,
}: {
  items: Array<{ id: string; name: string; icon: string }>;
  active: string;
  onSelect: (id: string) => void;
  variant?: DesignSectionId;
}) {
  return (
    <div
      className={cn(
        "relative z-20 flex justify-center",
        variant === "album" ? "-mt-[39px] mb-10 px-[26px]" : "-mt-9 px-6 sm:px-8 lg:px-10"
      )}
    >
      <div
        className={cn(
          "inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-3xl border border-slate-100 bg-white/95 px-3 py-2 shadow-[0_16px_40px_rgba(30,58,138,0.08)] backdrop-blur no-scrollbar",
          variant === "album" ? "-mt-[68px] mb-5" : ""
        )}
      >
        {items.map((item, index) => {
          const colors = CATEGORY_COLOR_MAP[item.id] || CATEGORY_COLOR_MAP.all;
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onSelect(item.id)} className={cn("relative flex h-11 min-w-[104px] items-center justify-center rounded-2xl px-5 text-[13px] font-black transition-all cursor-pointer", isActive ? colors.active : "text-slate-700 hover:bg-slate-50")}>
              <span className={cn("mr-2 flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full", isActive ? "bg-white/16" : colors.bg)}>
                <img
                  src={item.icon}
                  alt={item.name}
                  className={cn(
                    "rounded-full object-cover object-center",
                    item.id === "all" ? "h-[88%] w-[88%] scale-100" : "h-full w-full scale-[1.06]"
                  )}
                  draggable={false}
                />
              </span>
              <span>{item.name}</span>
              {index < items.length - 1 && !isActive ? <span className="pointer-events-none absolute right-[-5px] top-1/2 hidden h-4 w-px -translate-y-1/2 bg-slate-200 lg:block" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TemplateGalleryPanel({
  title,
  templates,
  selectedSort,
  onSortChange,
  filterTabs,
  onDetail,
  emptyTitle,
  emptyDesc,
  onReset,
}: {
  title: string;
  templates: DesignTemplate[];
  selectedSort: string;
  onSortChange: (value: string) => void;
  filterTabs?: React.ReactNode;
  onDetail: (id: string) => void;
  emptyTitle: string;
  emptyDesc: string;
  onReset: () => void;
}) {
  const orderedTemplates = shuffleBySeed(templates, title);
  const displayTemplates = orderedTemplates.length === 0 ? [] : orderedTemplates.length >= 16 ? orderedTemplates.slice(0, 16) : Array.from({ length: 16 }, (_, index) => orderedTemplates[index % orderedTemplates.length]);

  return (
    <section className="px-6 pb-10 pt-6 sm:px-8 lg:px-10">
      <div className="rounded-[28px] bg-white/92 p-4 shadow-[0_18px_60px_rgba(30,58,138,0.08)] ring-1 ring-slate-100 sm:p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[20px] font-black tracking-normal text-slate-900">{title}</h2>
          <select value={selectedSort} onChange={(e) => onSortChange(e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100">
            <option value="综合排序">综合排序</option>
            <option value="模板热度">最热排行</option>
            <option value="上架时间">最新上线</option>
          </select>
        </div>
        {filterTabs ? <div className="mb-5">{filterTabs}</div> : null}
        {displayTemplates.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6 2xl:grid-cols-7 min-[1800px]:grid-cols-8">
            {displayTemplates.map((item) => (
              <TemplateCard
                key={item.id}
                title={item.title}
                image={item.image}
                category={item.type}
                subCategory={item.scene}
                usageText={item.usageText}
                onClick={() => onDetail(item.id)}
                badgeText={item.badgeText}
                badgeClassName={item.badgeText ? "bg-red-500/90" : undefined}
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
            <button onClick={onReset} className="mt-5 rounded-full bg-blue-600 px-6 py-2.5 text-[13px] font-black text-white shadow-sm transition hover:bg-blue-700 cursor-pointer">
              重置过滤
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function DesignAlbumPage() {
  return (
    <section className="px-6 pb-10 pt-6 sm:px-8 lg:px-10">
      <div className="rounded-[28px] bg-white/92 p-6 shadow-[0_18px_60px_rgba(30,58,138,0.08)] ring-1 ring-slate-100 lg:p-8">
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 lg:p-10">
          <div className="flex min-h-[290px] flex-col items-center justify-center text-center">
            <div className="flex h-18 w-18 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <UploadCloud className="h-9 w-9" />
            </div>
            <h3 className="mt-7 text-[18px] font-black text-slate-900">点击或拖拽上传图片/PDF</h3>
            <p className="mt-3 text-[13px] leading-6 text-slate-500">支持多张 JPG/PNG 图片或单份 PDF 文件，AI 将自动为您排版</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openDesignAlert("上传入口已预留，可接入文件上传能力。")}
                className="rounded-2xl bg-blue-600 px-6 py-3 text-[13px] font-black text-white transition-colors hover:bg-blue-700 cursor-pointer"
              >
                上传文件
              </button>
              <button
                onClick={() => openDesignAlert("演示画册入口已预留，可接入示例预览。")}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[13px] font-bold text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                查看功能演示
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-8">
          <div className="flex items-center gap-2 text-[15px] font-black text-slate-900">
            <BookOpen className="h-4.5 w-4.5 text-rose-500" />
            功能演示：生成翻页电子画册
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2 items-stretch">
            <div className="flex flex-col">
              <div className="mb-4 flex items-center gap-2 text-[13px] font-bold text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                处理前：多张静态图片或 PDF
              </div>
              <div className="flex-1 rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex h-full items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-[250px] w-[192px] overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                      <img src={TEMPLATE_IMAGES[3]} alt="" className="aspect-[4/5] h-full w-full object-cover object-top" />
                    </div>
                    <div className="h-[250px] w-[192px] overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                      <img src={TEMPLATE_IMAGES[4]} alt="" className="aspect-[4/5] h-full w-full object-cover object-top" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-4 flex items-center gap-2 text-[13px] font-bold text-rose-500">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                处理后：3D 翻页电子画册
              </div>
              <div className="flex-1 rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex h-full min-h-[292px] items-center justify-center bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)]">
                  <div className="relative flex gap-4 rounded-[6px] bg-white p-3 shadow-[0_14px_32px_rgba(15,23,42,0.12)]">
                    <div className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-slate-200" />
                    <div className="h-[250px] w-[192px] overflow-hidden border border-slate-200 bg-white p-1.5">
                      <img src={TEMPLATE_IMAGES[3]} alt="" className="h-full w-full object-cover object-top" />
                    </div>
                    <div className="h-[250px] w-[192px] overflow-hidden border border-slate-200 bg-white p-1.5">
                      <img src={TEMPLATE_IMAGES[4]} alt="" className="h-full w-full object-cover object-top" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AiDesignCenter() {
  const [activeSection, setActiveSection] = useState<DesignSectionId>("center");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("综合排序");
  const [detailTemplateId, setDetailTemplateId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isShortScreen, setIsShortScreen] = useState(() => window.innerHeight < 860);

  useEffect(() => {
    const handleResize = () => setIsShortScreen(window.innerHeight < 860);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeNav = LEFT_NAV_ITEMS.find((item) => item.id === activeSection) || LEFT_NAV_ITEMS[0];

  const integrationItems = [
    {
      title: "微信小程序对接",
      subtitle: "无需开发 极速嵌接",
      onClick: () => openDesignAlert("微信小程序对接：支持一键将微端和营销活动发布为独立微信小程序，多级缓存秒级响应。如需具体对接技术文档，请点击下方「定制服务」联系技术支持人员。"),
      icon: MessageSquareCode,
      iconClassName: "text-emerald-500",
      subtitleClassName: "text-emerald-600/80",
    },
    {
      title: "APP 集成安全方案",
      subtitle: "iOS & Android 无缝嵌入",
      onClick: () => openDesignAlert("APP集成方案：全面支持 iOS/Android Native App 集成、Flutter/React Native 混合架构。轻量级 SDK 方案可使研发在 3 小时内实现首款营销活动落地接入。"),
      icon: MonitorSmartphone,
      iconClassName: "text-blue-500",
      subtitleClassName: "text-blue-600/75",
    },
    {
      title: "活动接口打通",
      subtitle: "资产互通 数据同步",
      onClick: () => openDesignAlert("活动接口打通：可接入现有 CRM 以及会员积分体系，完美实现优惠券、积分值、抽奖次数等活动资产与核心用户库的实时结算流。"),
      icon: Code,
      iconClassName: "text-amber-500",
      subtitleClassName: "text-amber-600/80",
    },
  ];

  const detailTemplate = useMemo(() => {
    if (!detailTemplateId) return null;
    return Object.values(TEMPLATE_DATA_BY_SECTION).flat().find((item) => item.id === detailTemplateId) || null;
  }, [detailTemplateId]);

  const recommendationTemplates = useMemo(() => {
    if (!detailTemplate) return [];
    return Object.values(TEMPLATE_DATA_BY_SECTION).flat().filter((item) => item.id !== detailTemplate.id).slice(0, 9);
  }, [detailTemplate]);

  const currentTags = activeSection === "album" ? [] : TAGS_BY_SECTION[activeSection];

  const currentTemplates = useMemo(() => {
    if (activeSection === "album") return [];
    let result = [...TEMPLATE_DATA_BY_SECTION[activeSection]];

    if (activeSection === "center") {
      if (activeCategory === "h5") result = result.filter((item) => item.type === "H5");
      if (activeCategory === "poster") result = result.filter((item) => item.type === "海报");
      if (activeCategory === "article") result = result.filter((item) => item.type === "文章");
      if (activeCategory === "album") result = [];
    }

    if (activeTag !== "全部" && activeTag !== "更多") {
      result = result.filter((item) => item.tags.includes(activeTag) || item.scene === activeTag || item.type === activeTag);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((item) => `${item.title}${item.scene}${item.style}${item.type}`.toLowerCase().includes(q));
    }

    if (selectedSort === "模板热度") result.sort((a, b) => b.hot - a.hot);
    else if (selectedSort === "上架时间") result.sort((a, b) => b.time.localeCompare(a.time));
    else result.sort((a, b) => b.hot - a.hot);

    return result;
  }, [activeSection, activeCategory, activeTag, searchQuery, selectedSort]);

  const handleSectionChange = (nextSection: DesignSectionId) => {
    setActiveSection(nextSection);
    setDetailTemplateId(null);
    setSearchQuery("");
    setSelectedSort("综合排序");
    setActiveTag("全部");
    if (nextSection === "center") setActiveCategory("all");
    else if (nextSection === "album") setActiveCategory("album");
    else setActiveCategory(nextSection);
  };

  const handleCategoryChange = (nextId: string) => {
    setActiveCategory(nextId);
    setActiveTag("全部");
    if (nextId === "album") {
      setActiveSection("album");
      return;
    }
    if (nextId === "all") {
      setActiveSection("center");
      return;
    }
    setActiveSection(nextId as DesignSectionId);
  };

  if (detailTemplate) {
    return (
      <div className="flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden bg-[#F8FAFC]">
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC] px-4 py-5 lg:px-6">
          <SiteTemplateDetailPage
            template={{ id: detailTemplate.id, title: detailTemplate.title, type: detailTemplate.type, style: detailTemplate.style, scene: detailTemplate.scene }}
            previewImage={detailTemplate.image}
            recommendations={recommendationTemplates.map((item) => ({ id: item.id }))}
            renderRecommendationCard={(item) => {
              const matched = recommendationTemplates.find((entry) => entry.id === item.id);
              if (!matched) return null;
              return <TemplateCard key={matched.id} title={matched.title} image={matched.image} category={matched.type} subCategory={matched.scene} usageText={matched.usageText} onClick={() => setDetailTemplateId(matched.id)} badgeText={matched.badgeText} badgeClassName="bg-blue-600/90" />;
            }}
            onBack={() => setDetailTemplateId(null)}
            onPrimaryAction={() => openDesignAlert("AI 做同款能力入口已预留，可继续接入生成流程。")}
            onSecondaryAction={() => openDesignAlert("发布入口已预留，可继续接入发布流程。")}
            onToggleFavorite={() => {
              setFavorites((prev) => {
                const next = new Set(prev);
                if (next.has(detailTemplate.id)) next.delete(detailTemplate.id);
                else next.add(detailTemplate.id);
                return next;
              });
            }}
            isFavorite={favorites.has(detailTemplate.id)}
            themeButtonClassName="bg-blue-600 hover:bg-blue-700"
            eyebrowSuffix="AI设计模板"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden bg-[#F8FAFC]">
      <aside className="w-[190px] shrink-0 bg-white flex flex-col h-full relative border-r border-slate-100 select-none">
        <div className={cn("flex-1 overflow-y-auto no-scrollbar flex flex-col", isShortScreen ? "pb-[220px]" : "pb-4")}>
          <div className="h-4 shrink-0" />
          <nav className="p-2 space-y-0.5 shrink-0">
            {LEFT_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => handleSectionChange(item.id)} className={cn("w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[14px] font-bold transition-all relative group cursor-pointer text-left", isActive ? "bg-blue-600 hover:bg-blue-700 text-white shadow-soft" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")}>
                  <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-105", isActive ? "text-white" : "text-slate-500")} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          {!isShortScreen ? (
            <div className="mt-auto px-2 pb-4 space-y-3 text-left shrink-0">
              <IntegrationOptionsSection items={integrationItems} />
              <ServiceSupportSection />
            </div>
          ) : null}
        </div>
        {isShortScreen ? (
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md pt-2 pb-3 px-2 border-t border-slate-100 shadow-[0_-8px_20px_rgba(0,0,0,0.03)] z-20 space-y-3 text-left">
            <IntegrationOptionsSection items={integrationItems} />
            <ServiceSupportSection />
          </div>
        ) : null}
      </aside>

      <section className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
        {activeSection === "album" ? (
          <>
            <DesignSearchHero title={activeNav.heroTitle} searchValue="" onSearchChange={() => undefined} placeholder="" hotSearches={[]} onHotSearch={() => undefined} variant={activeSection} />
            <DesignCategoryTabs items={BLUE_CATEGORY_ITEMS} active="album" onSelect={handleCategoryChange} variant={activeSection} />
            <DesignAlbumPage />
          </>
        ) : (
          <div className="w-full animate-in fade-in duration-300">
            <DesignSearchHero title={activeNav.heroTitle} searchValue={searchQuery} onSearchChange={setSearchQuery} placeholder={activeNav.placeholder} hotSearches={activeNav.hotSearches} onHotSearch={setSearchQuery} variant={activeSection} />
            <DesignCategoryTabs items={BLUE_CATEGORY_ITEMS} active={activeCategory} onSelect={handleCategoryChange} variant={activeSection} />

            <TemplateGalleryPanel
              title="全部模板"
              templates={currentTemplates}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              filterTabs={
                <div className="flex flex-wrap items-center gap-2">
                  {currentTags.map((tag) => {
                    const isSel = activeTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={cn(
                          "px-3.5 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer text-[13.5px] items-center justify-center flex shadow-[0_1px_2px_rgba(0,0,0,0.05)] border outline-hidden whitespace-nowrap",
                          isSel ? "bg-blue-50/80 border-blue-500 text-blue-600 shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              }
              onDetail={setDetailTemplateId}
              emptyTitle="未找到匹配该过滤条件的设计模板"
              emptyDesc="请尝试更换分类、标签或搜索其他关键词"
              onReset={() => {
                setSearchQuery("");
                setActiveTag("全部");
                setSelectedSort("综合排序");
                setActiveCategory(activeSection === "center" ? "all" : activeSection);
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}
