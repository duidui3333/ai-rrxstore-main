import React, { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import {
  Brain, BookOpen, Trophy, Video, Sparkles, Search, ArrowLeft,
  Heart, Info, Flame, LayoutTemplate, HelpCircle, X, RotateCcw, ScanLine, Share2,
  Rocket, Code, Briefcase, MessagesSquare, ChevronRight, Home, Smartphone
} from "lucide-react";

import {
  CATEGORY_CONFIGS, VOTING_CATEGORIES, TEMPLATES_DATA,
  HOT_SEARCHES, PLACEHOLDER_PHRASES, getTemplateImage, matchSubPlaystyle
} from "./voting/votingData";
import { VotingAppSimulator } from "./voting/VotingAppSimulator";
import { VotingConfigPanel } from "./voting/VotingConfigPanel";

import imgFeatured from "../assets/images/cat_featured_1779523249218.png";
import imgElimination from "../assets/images/cat_elimination_1779523103546.png";
import imgPuzzle from "../assets/images/cat_puzzle_1779523142523.png";
import imgSynthesis from "../assets/images/cat_synthesis_1779523162184.png";
import imgStage from "../assets/images/cat_stage_1779523182209.png";
import imgReaction from "../assets/images/cat_reaction_1779523199030.png";
import imgAction from "../assets/images/cat_action_1779523229602.png";

type RouteMode = "center" | string;
type TemplateType = typeof TEMPLATES_DATA[number];

const VOTING_SCENE_FILTERS = [
  "精选",
  "👶萌娃大赛",
  "🏆年度评选",
  "摄影大赛",
  "才艺评选",
  "萌宠评选",
  "员工评选",
  "人物评选",
  "活动评选",
  "作品评选",
  "晋级投票",
  "节日评选",
  "视频投票",
  "语音投票"
];

const categoryTabColorMap: Record<string, { bg: string; active: string }> = {
  全部: { bg: "bg-blue-50", active: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]" },
  照片投票: { bg: "bg-sky-50", active: "bg-sky-600 text-white shadow-[0_12px_24px_rgba(2,132,199,0.18)]" },
  视频投票: { bg: "bg-amber-50", active: "bg-amber-600 text-white shadow-[0_12px_24px_rgba(217,119,6,0.18)]" },
  语音投票: { bg: "bg-purple-50", active: "bg-purple-600 text-white shadow-[0_12px_24px_rgba(147,51,234,0.18)]" },
  知识投票: { bg: "bg-blue-50", active: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]" },
  闯关投票: { bg: "bg-fuchsia-50", active: "bg-fuchsia-600 text-white shadow-[0_12px_24px_rgba(192,38,211,0.18)]" },
  PK投票: { bg: "bg-rose-50", active: "bg-rose-600 text-white shadow-[0_12px_24px_rgba(225,29,72,0.18)]" },
  趣味投票: { bg: "bg-emerald-50", active: "bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.18)]" },
  学习投票: { bg: "bg-cyan-50", active: "bg-cyan-600 text-white shadow-[0_12px_24px_rgba(8,145,178,0.18)]" },
  练习: { bg: "bg-slate-50", active: "bg-slate-700 text-white shadow-[0_12px_24px_rgba(51,65,85,0.18)]" },
  考试: { bg: "bg-red-50", active: "bg-red-600 text-white shadow-[0_12px_24px_rgba(220,38,38,0.18)]" },
  课程: { bg: "bg-pink-50", active: "bg-pink-600 text-white shadow-[0_12px_24px_rgba(219,39,119,0.18)]" }
};

const HOT_SEARCH_EMOJI_MAP: Record<string, string> = {
  照片投票: "📸",
  视频投票: "🎬",
  语音投票: "🎙️",
  知识投票: "🧠",
  闯关投票: "🏁",
  PK投票: "⚔️",
  趣味投票: "✨",
  学习投票: "📘",
  练习: "📝",
  考试: "📋",
  课程: "🎓",
  全部: "🔥"
};

const getHotSearchEmoji = (value: string) => HOT_SEARCH_EMOJI_MAP[value] || "🔥";

const getUsageText = (hot: number) => `${(hot / 10000).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}万人使用`;

const matchSceneFilter = (template: TemplateType, renamedTitle: string, selectedScene: string) => {
  if (selectedScene === "精选") return true;
  const t = renamedTitle.toLowerCase();
  if (selectedScene === "👶萌娃大赛") return t.includes("萌娃") || t.includes("宝宝");
  if (selectedScene === "🏆年度评选") return t.includes("年度") || t.includes("百强") || t.includes("力量");
  if (selectedScene === "摄影大赛") return t.includes("摄影") || t.includes("风光") || t.includes("照片");
  if (selectedScene === "才艺评选") return t.includes("才艺") || t.includes("歌手") || t.includes("声音");
  if (selectedScene === "萌宠评选") return t.includes("萌宠") || t.includes("宠物");
  if (selectedScene === "员工评选") return t.includes("员工") || t.includes("优秀");
  if (selectedScene === "人物评选") return t.includes("人物") || t.includes("榜样");
  if (selectedScene === "活动评选") return t.includes("活动") || t.includes("比赛");
  if (selectedScene === "作品评选") return t.includes("作品") || t.includes("设计") || t.includes("创新");
  if (selectedScene === "晋级投票") return t.includes("晋级") || t.includes("排位") || t.includes("海选");
  if (selectedScene === "节日评选") return t.includes("节日") || t.includes("晚会") || t.includes("元宵") || t.includes("母亲节");
  if (selectedScene === "视频投票") return t.includes("视频") || t.includes("短片") || t.includes("电影");
  if (selectedScene === "语音投票") return t.includes("语音") || t.includes("声音") || t.includes("音乐") || t.includes("配音");
  return true;
};

type AiVotingHandlers = {
  setSelectedType: (value: string) => void;
  setSelectedScene: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

function VotingSearchHero({
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
    const theme = category || "center";

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

    const drawBadge = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string, fill: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = fill;
      roundedRect(ctx, -28, -14, 56, 28, 14);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 0, 1);
      ctx.restore();
    };

    const drawPhotoCard = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -76, -56, 152, 112, 24);
      ctx.fill();
      ctx.strokeStyle = "rgba(130,160,230,0.22)";
      ctx.stroke();
      const sky = ctx.createLinearGradient(-56, -34, 56, 26);
      sky.addColorStop(0, "#cfe6ff");
      sky.addColorStop(1, "#f8d9ff");
      ctx.fillStyle = sky;
      roundedRect(ctx, -56, -34, 112, 68, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(28, -14, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#67b67c";
      ctx.beginPath();
      ctx.moveTo(-50, 28);
      ctx.lineTo(-8, -4);
      ctx.lineTo(16, 18);
      ctx.lineTo(38, -2);
      ctx.lineTo(56, 28);
      ctx.closePath();
      ctx.fill();
      drawBadge(ctx, 44, 48, "投票", "#ff8a3d");
      ctx.save();
      ctx.translate(-62, -54);
      ctx.rotate(-0.14 + Math.sin(t * 1.4) * 0.03);
      ctx.fillStyle = "#ffb14a";
      roundedRect(ctx, -12, -12, 24, 24, 8);
      ctx.fill();
      ctx.restore();
    };

    const drawVideoCard = (ctx: CanvasRenderingContext2D) => {
      const body = ctx.createLinearGradient(-84, -54, 84, 54);
      body.addColorStop(0, "#ffffff");
      body.addColorStop(1, "#d9e7ff");
      ctx.fillStyle = body;
      roundedRect(ctx, -84, -54, 168, 108, 28);
      ctx.fill();
      ctx.strokeStyle = "rgba(130,160,230,0.22)";
      ctx.stroke();
      ctx.fillStyle = "#2f6cff";
      roundedRect(ctx, -58, -24, 116, 60, 20);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(-12, -8);
      ctx.lineTo(-12, 20);
      ctx.lineTo(18, 6);
      ctx.closePath();
      ctx.fill();
      for (let i = -72; i <= 72; i += 18) {
        ctx.fillStyle = i % 36 === 0 ? "#ffb14a" : "#ffd89a";
        ctx.fillRect(i, -58, 10, 10);
        ctx.fillRect(i, 48, 10, 10);
      }
      drawBadge(ctx, 56, -40, "TOP", "#ff8a3d");
    };

    const drawVoiceCard = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -54, 164, 108, 28);
      ctx.fill();
      ctx.strokeStyle = "rgba(130,160,230,0.22)";
      ctx.stroke();
      ctx.fillStyle = "#ff8a3d";
      roundedRect(ctx, -22, -30, 44, 62, 22);
      ctx.fill();
      ctx.fillStyle = "#ffd8be";
      roundedRect(ctx, -12, -42, 24, 18, 12);
      ctx.fill();
      ctx.strokeStyle = "#2f6cff";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      for (let i = 0; i < 5; i += 1) {
        const height = 10 + Math.sin(t * 2.1 + i) * 8 + i * 5;
        ctx.beginPath();
        ctx.moveTo(-56 + i * 16, 38);
        ctx.lineTo(-56 + i * 16, 38 - height);
        ctx.stroke();
      }
      drawBadge(ctx, 52, 42, "语音", "#2f6cff");
    };

    const drawBracketCard = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -60, 164, 120, 28);
      ctx.fill();
      ctx.strokeStyle = "rgba(130,160,230,0.22)";
      ctx.stroke();
      ctx.strokeStyle = "#2f6cff";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      [[-44, -20], [-44, 20], [20, -34], [20, 34]].forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.moveTo(-35, -20);
      ctx.lineTo(-6, -20);
      ctx.lineTo(-6, 0);
      ctx.lineTo(10, 0);
      ctx.lineTo(10, -34);
      ctx.lineTo(35, -34);
      ctx.moveTo(-35, 20);
      ctx.lineTo(-6, 20);
      ctx.lineTo(-6, 0);
      ctx.lineTo(10, 0);
      ctx.lineTo(10, 34);
      ctx.lineTo(35, 34);
      ctx.stroke();
      drawBadge(ctx, 0, 46, "晋级", "#ff8a3d");
    };

    const drawVotingPrimary = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 1.25) * 5);
      ctx.rotate(-0.13 + Math.sin(t * 0.8) * 0.035);
      const glow = ctx.createRadialGradient(0, 0, 20, 0, 0, 126);
      glow.addColorStop(0, "rgba(74,144,255,0.22)");
      glow.addColorStop(1, "rgba(74,144,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-140, -120, 280, 240);
      if (theme.includes("视频")) drawVideoCard(ctx);
      else if (theme.includes("语音")) drawVoiceCard(ctx, t);
      else if (theme.includes("晋级")) drawBracketCard(ctx);
      else drawPhotoCard(ctx, t);
      ctx.restore();
    };

    const drawVotingSecondary = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
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
      base.addColorStop(0, "#ffffff");
      base.addColorStop(0.58, "#f8f2ff");
      base.addColorStop(1, "#dbe8ff");
      ctx.fillStyle = base;
      roundedRect(ctx, -82, -70, 164, 138, 34);
      ctx.fill();
      ctx.strokeStyle = "rgba(118,119,218,0.24)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (theme.includes("语音")) {
        ctx.strokeStyle = "#2f6cff";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        for (let i = 0; i < 7; i += 1) {
          const bar = 12 + Math.sin(t * 2.1 + i * 0.6) * 10 + (i % 2 ? 8 : 0);
          ctx.beginPath();
          ctx.moveTo(-52 + i * 16, 34);
          ctx.lineTo(-52 + i * 16, 34 - bar);
          ctx.stroke();
        }
        ctx.fillStyle = "#ff8a3d";
        ctx.beginPath();
        ctx.arc(0, -28, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-5, -14, 10, 24);
        drawBadge(ctx, 0, 54, "人气", "#ff8a3d");
      } else {
        const colors = theme.includes("视频") ? ["#ff8a3d", "#2f6cff", "#ff8a3d"] : ["#2f6cff", "#ff8a3d", "#5ec46b"];
        colors.forEach((color, i) => {
          const bar = 34 + Math.sin(t * 1.6 + i) * 8;
          ctx.fillStyle = color;
          roundedRect(ctx, -48 + i * 36, 28 - bar, 22, bar, 11);
          ctx.fill();
        });
        ctx.strokeStyle = "#9f75ff";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(-42, 8);
        ctx.lineTo(-8, -8);
        ctx.lineTo(20, -20);
        ctx.lineTo(50, -36);
        ctx.stroke();
        drawBadge(ctx, 0, 54, theme.includes("视频") ? "播放" : "榜单", "#ff8a3d");
      }
      ctx.restore();
    };

    const render = () => {
      frame += 1;
      const t = frame / 60;
      [
        { canvas: leftCanvasRef.current, draw: drawVotingPrimary },
        { canvas: rightCanvasRef.current, draw: drawVotingSecondary }
      ].forEach(({ canvas, draw }) => {
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
        draw(ctx, rect.width, rect.height, t);
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
      <div className="pointer-events-none absolute left-[7%] top-[25%] hidden md:block">
        <canvas ref={leftCanvasRef} className="h-[210px] w-[280px]" aria-hidden="true" />
      </div>
      <div className="pointer-events-none absolute right-[7%] top-[22%] hidden md:block">
        <canvas ref={rightCanvasRef} className="h-[230px] w-[260px]" aria-hidden="true" />
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              title="清空搜索"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition hover:bg-blue-700 cursor-pointer">
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5 flex max-w-[720px] flex-wrap items-center justify-center gap-2 text-[12px] font-bold text-slate-500">
          <span className="mr-1 text-slate-600">热门搜索:</span>
          {hotSearches.map((term) => (
            <button
              key={term.text}
              onClick={() => onHotSearch(term.text)}
              className="rounded-full bg-slate-100/80 px-3 py-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
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

function VotingCategoryTabs({
  items,
  active,
  onSelect
}: {
  items: Array<{ id: string; name: string }>;
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative z-20 -mt-9 flex justify-center px-6 sm:px-8 lg:px-10">
      <div className="inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-3xl border border-slate-100 bg-white/95 p-3 shadow-[0_16px_40px_rgba(30,58,138,0.08)] backdrop-blur no-scrollbar">
        {items.map((item, index) => {
          const colorConfig = categoryTabColorMap[item.id] || categoryTabColorMap["全部"];
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex h-12 min-w-[112px] items-center justify-center gap-2 rounded-2xl px-4 text-[13px] font-black transition-all cursor-pointer",
                isActive ? colorConfig.active : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <span className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px]",
                isActive ? "bg-white/16" : colorConfig.bg
              )}>
                {getHotSearchEmoji(item.id)}
              </span>
              <span>{item.name}</span>
              {index < items.length - 1 && !isActive && (
                <span className="ml-3 hidden h-5 w-px bg-slate-100 lg:block" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VotingTemplateCard({
  item,
  index,
  renamedTitle,
  favorites,
  onToggleFavorite,
  onPreview,
  onDetail
}: {
  item: TemplateType;
  index: number;
  renamedTitle?: string;
  favorites: Set<string>;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onPreview: (id: string) => void;
  onDetail: (id: string) => void;
}) {
  const image = getTemplateImage(item.id, index);
  const title = renamedTitle || item.title;
  const badgeText = item.percentage >= 95 ? "热门" : "新品";
  const badgeClass = item.percentage >= 95 ? "bg-red-500" : "bg-blue-600";
  const tags = [item.type, item.scene === "全部" ? `${item.style}风` : item.scene].filter(Boolean).slice(0, 2);
  const isFav = favorites.has(item.id);

  return (
    <article
      onClick={() => onDetail(item.id)}
      className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(30,41,59,0.08)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(30,41,59,0.14)] cursor-pointer"
    >
      <div className={cn("relative aspect-[5/8] overflow-hidden bg-gradient-to-br", item.colorBg)}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/34" />
        <div className={cn("absolute left-3 top-3 rounded-md px-2.5 py-1 text-[12px] font-black text-white shadow-sm backdrop-blur-sm", badgeClass)}>
          {badgeText}
        </div>
        <button
          onClick={(e) => onToggleFavorite(item.id, e)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/22 text-white backdrop-blur-sm transition hover:bg-slate-900/40 cursor-pointer"
        >
          <Heart className={cn("h-4 w-4", isFav && "fill-rose-500 text-rose-500")} />
        </button>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-slate-950/58 opacity-0 backdrop-blur-[4px] transition-all duration-300 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(item.id);
            }}
            className="flex w-[110px] items-center justify-center gap-1.5 rounded-full bg-indigo-600 py-2 text-xs font-black text-white shadow-md transition hover:bg-indigo-700 cursor-pointer"
          >
            扫码预览 <ScanLine className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetail(item.id);
            }}
            className="flex w-[110px] items-center justify-center gap-1.5 rounded-full bg-white py-2 text-xs font-black text-slate-900 shadow-md transition hover:bg-slate-50 cursor-pointer"
          >
            查看详情
          </button>
        </div>
      </div>
      <div className="px-4 pb-4 pt-3">
        <h3 className="line-clamp-1 text-[14px] font-black text-slate-900" title={title}>
          {title}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-slate-500">
            <Flame className="h-3 w-3 fill-orange-500 text-orange-500" />
            {getUsageText(item.hot)}
          </div>
        </div>
      </div>
    </article>
  );
}

function VotingTemplateGallery({
  title,
  templates,
  selectedSort,
  onSortChange,
  filterTabs,
  renamedTitles,
  favorites,
  onToggleFavorite,
  onPreview,
  onDetail,
  emptyTitle,
  emptyDesc,
  onReset
}: {
  title: string;
  templates: TemplateType[];
  selectedSort: string;
  onSortChange: (value: string) => void;
  filterTabs?: React.ReactNode;
  renamedTitles: Record<string, string>;
  favorites: Set<string>;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onPreview: (id: string) => void;
  onDetail: (id: string) => void;
  emptyTitle: string;
  emptyDesc: string;
  onReset: () => void;
}) {
  return (
    <section className="px-6 pb-10 pt-6 sm:px-8 lg:px-10">
      <div className="rounded-[28px] bg-white/92 p-4 shadow-[0_18px_60px_rgba(30,58,138,0.08)] ring-1 ring-slate-100 sm:p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-end gap-3">
            <h2 className="text-[20px] font-black tracking-normal text-slate-900">{title}</h2>
          </div>
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

        {filterTabs ? (
          <div className="mb-5">
            {filterTabs}
          </div>
        ) : null}

        {templates.length > 0 ? (
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]">
            {templates.map((item, index) => (
              <VotingTemplateCard
                key={`${item.id}-${index}`}
                item={item}
                index={index}
                renamedTitle={renamedTitles[item.id]}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                onPreview={onPreview}
                onDetail={onDetail}
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
              className="mt-5 rounded-full bg-blue-600 px-6 py-2.5 text-[13px] font-black text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
            >
              重置过滤
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AiVotingCenter() {
  const [activeSidebar, setActiveSidebar] = useState<RouteMode>("center");
  const [activeSidebarName, setActiveSidebarName] = useState("首页");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("全部");
  const [selectedStyle, setSelectedStyle] = useState("全部");
  const [selectedScene, setSelectedScene] = useState("精选");
  const [selectedSort, setSelectedSort] = useState("综合排序");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [selectedCategorySubFilter, setSelectedCategorySubFilter] = useState("全部");
  const [detailTemplateId, setDetailTemplateId] = useState<string | null>(null);
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);
  const [previewModalTemplateId, setPreviewModalTemplateId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["q1", "q4", "q6"]));
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);

  const themeBtn = "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200/50";

  const checkSidebarHeight = () => {
    if (sidebarScrollRef.current) {
      const { scrollHeight, clientHeight } = sidebarScrollRef.current;
      setIsShortScreen(scrollHeight > clientHeight + 10);
    }
  };

  useEffect(() => {
    checkSidebarHeight();
    window.addEventListener("resize", checkSidebarHeight);
    return () => window.removeEventListener("resize", checkSidebarHeight);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = PLACEHOLDER_PHRASES[phraseIdx];

    if (!isDeleting) {
      if (charIdx < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedPlaceholder(currentPhrase.substring(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        }, 120);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else if (charIdx > 0) {
      timer = setTimeout(() => {
        setTypedPlaceholder(currentPhrase.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 60);
    } else {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % PLACEHOLDER_PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSidebarClick = (id: RouteMode, name: string) => {
    setActiveSidebar(id);
    setActiveSidebarName(name);
    setCategorySearchQuery("");
    setSelectedCategorySubFilter("全部");
    setDetailTemplateId(null);
    setIsWorkspaceMode(false);
  };

  const handleSelectTemplateDetail = (id: string) => {
    setDetailTemplateId(id);
    setIsWorkspaceMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [renamedTitles, setRenamedTitles] = useState<Record<string, string>>({});
  const handleTemplateTitleChange = (id: string, newTitle: string) => {
    setRenamedTitles((prev) => ({ ...prev, [id]: newTitle }));
  };

  const orderedTemplates = useMemo(() => {
    const result = TEMPLATES_DATA.filter((item) => {
      if (selectedType !== "全部" && item.type !== selectedType) return false;
      if (selectedStyle !== "全部" && item.style !== selectedStyle) return false;

      const renamedTitle = (renamedTitles[item.id] || item.title);
      if (!matchSceneFilter(item, renamedTitle, selectedScene)) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = renamedTitle.toLowerCase().includes(query);
        const matchTag = item.tagText.toLowerCase().includes(query);
        const matchCat = item.type.toLowerCase().includes(query);
        if (!matchTitle && !matchTag && !matchCat) return false;
      }

      return true;
    });

    return result.sort((a, b) => {
      if (selectedSort === "模板热度") return b.hot - a.hot;
      if (selectedSort === "上架时间") return b.time.localeCompare(a.time);
      return 0;
    });
  }, [renamedTitles, searchQuery, selectedScene, selectedSort, selectedStyle, selectedType]);

  const categoryFiltered = useMemo(() => {
    if (activeSidebar === "center") return [];

    return TEMPLATES_DATA.filter((item) => {
      if (item.type !== activeSidebar) return false;
      if (selectedCategorySubFilter !== "全部" && !matchSubPlaystyle(item, selectedCategorySubFilter)) return false;

      if (categorySearchQuery.trim()) {
        const q = categorySearchQuery.toLowerCase();
        const renamedTitle = (renamedTitles[item.id] || item.title).toLowerCase();
        return renamedTitle.includes(q) || item.tagText.toLowerCase().includes(q);
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === "模板热度") return b.hot - a.hot;
      if (selectedSort === "上架时间") return b.time.localeCompare(a.time);
      return 0;
    });
  }, [activeSidebar, categorySearchQuery, renamedTitles, selectedCategorySubFilter, selectedSort]);

  const previewTemplate = useMemo(() => {
    const activeId = previewModalTemplateId || detailTemplateId || "q1";
    const found = TEMPLATES_DATA.find((item) => item.id === activeId);
    if (!found) return null;
    return {
      ...found,
      title: renamedTitles[found.id] || found.title
    };
  }, [detailTemplateId, previewModalTemplateId, renamedTitles]);

  return (
    <div id="quiz-center-scope" className="flex h-screen w-full bg-[#FAFBFD] overflow-hidden select-text text-slate-800 font-sans">
      <aside className="w-[190px] shrink-0 bg-white flex flex-col h-full relative border-r border-slate-100 select-none">
        <div className={cn(
          "flex-1 overflow-y-auto no-scrollbar flex flex-col",
          isShortScreen ? "pb-[220px]" : "pb-4"
        )}>
          <div className="h-4 shrink-0" />

          <nav className="p-2 space-y-0.5 shrink-0">
            <button
              onClick={() => handleSidebarClick("center", "玩法中心")}
              className={cn(
                "w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[14px] font-bold transition-all relative group cursor-pointer text-left",
                activeSidebar === "center" && !detailTemplateId
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Home className={cn(
                "w-4 h-4 shrink-0 transition-transform group-hover:scale-105",
                activeSidebar === "center" && !detailTemplateId ? "text-white animate-pulse" : "text-slate-500"
              )} />
              <span>玩法中心</span>
            </button>

            {VOTING_CATEGORIES.slice(1).map((cat) => {
              const isActive = activeSidebar === cat.id && !detailTemplateId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSidebarClick(cat.id, cat.name)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[14px] font-bold transition-all relative group cursor-pointer text-left",
                    isActive
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-soft"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <cat.icon className={cn(
                    "w-4 h-4 shrink-0 transition-transform group-hover:scale-105",
                    isActive ? "text-white animate-pulse" : "text-slate-500"
                  )} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </nav>

          {!isShortScreen && (
            <div className="mt-auto px-2 pb-4 space-y-3 text-left shrink-0">
              <div className="space-y-0.5">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 select-none">
                  接入方案
                </div>
                <button
                  onClick={() => alert("微信小程序对接：支持一键将投票发布为独立微信小程序，多级缓存秒级响应。如需具体对接技术文档，请点击下方「定制服务」联系技术支持人员。")}
                  className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <MessagesSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">微信小程序对接</span>
                    <span className="block text-[10px] font-semibold text-emerald-600/80 normal-case tracking-normal">无需开发 极速嵌接</span>
                  </span>
                </button>
                <button
                  onClick={() => alert("APP集成方案：全面支持 iOS/Android Native App 集成、Flutter/React Native 混合架构。轻量级 SDK 方案可使研发在 3 小时内实现首款投票活动接入。")}
                  className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <Smartphone className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">APP 集成安全方案</span>
                    <span className="block text-[10px] font-semibold text-blue-600/75 normal-case tracking-normal">iOS & Android 无缝嵌入</span>
                  </span>
                </button>
                <button
                  onClick={() => alert("活动接口打通：可接入现有 CRM 以及会员积分体系，完美实现投票次数、道具资产与核心用户库的实时结算流。")}
                  className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <Code className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">活动接口打通</span>
                    <span className="block text-[10px] font-semibold text-amber-600/80 normal-case tracking-normal">资产互通 数据同步</span>
                  </span>
                </button>
              </div>

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
                  onClick={() => alert("客户案例看板：查阅各板块优秀投票活动落地案例。")}
                  className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  客户案例
                </button>
                <button
                  onClick={() => alert("开放平台开发者门户：可提供统一 OAuth2 会员鉴权、接口 API 和安全回调机制。")}
                  className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <Code className="w-4 h-4 text-slate-400" />
                  开放平台
                </button>
                <button
                  onClick={() => alert("定制服务专家：支持提供专属前端活动 IP 设计、深层架构迁移等高级服务。")}
                  className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                >
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  定制服务
                </button>
              </div>
            </div>
          )}
        </div>

        {isShortScreen && (
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md pt-2 pb-3 px-2 border-t border-slate-100 shadow-[0_-8px_20px_rgba(0,0,0,0.03)] z-20 space-y-3 text-left">
            <div className="space-y-0.5">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 select-none">
                接入方案
              </div>
              <button
                onClick={() => alert("微信小程序对接：支持一键将投票发布为独立微信小程序，多级缓存秒级响应。如需具体对接技术文档，请点击下方「定制服务」联系技术支持人员。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <MessagesSquare className="w-4 h-4 text-emerald-500" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">微信小程序对接</span>
                  <span className="block text-[10px] font-semibold text-emerald-600/80 normal-case tracking-normal">无需开发 极速嵌接</span>
                </span>
              </button>
              <button
                onClick={() => alert("APP集成方案：全面支持 iOS/Android Native App 集成、Flutter/React Native 混合架构。轻量级 SDK 方案可使研发在 3 小时内实现首款投票活动接入。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <Smartphone className="w-4 h-4 text-blue-500" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">APP 集成安全方案</span>
                  <span className="block text-[10px] font-semibold text-blue-600/75 normal-case tracking-normal">iOS & Android 无缝嵌入</span>
                </span>
              </button>
              <button
                onClick={() => alert("活动接口打通：可接入现有 CRM 以及会员积分体系，完美实现投票次数、道具资产与核心用户库的实时结算流。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <Code className="w-4 h-4 text-amber-500" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">活动接口打通</span>
                  <span className="block text-[10px] font-semibold text-amber-600/80 normal-case tracking-normal">资产互通 数据同步</span>
                </span>
              </button>
            </div>

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
                onClick={() => alert("客户案例看板：查阅各板块优秀投票活动落地案例。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                客户案例
              </button>
              <button
                onClick={() => alert("开放平台开发者门户：可提供统一 OAuth2 会员鉴权、接口 API 和安全回调机制。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <Code className="w-4 h-4 text-slate-400" />
                开放平台
              </button>
              <button
                onClick={() => alert("定制服务专家：支持提供专属前端活动 IP 设计、深层架构迁移等高级服务。")}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-left"
              >
                <Briefcase className="w-4 h-4 text-slate-400" />
                定制服务
              </button>
            </div>
          </div>
        )}
      </aside>

      <div id="voting-scroll-pane" className="flex-1 overflow-y-auto bg-[#FAFBFD] flex flex-col h-full">
        {detailTemplateId && previewTemplate ? (
          isWorkspaceMode ? (
            <div className="flex-grow flex flex-col h-full overflow-hidden text-left animate-in fade-in duration-300">
              <header className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsWorkspaceMode(false)}
                    className="w-8.5 h-8.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-350 flex items-center justify-center text-slate-500 cursor-pointer hover:translate-x-[-1px] transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold leading-none mb-1">
                      <button onClick={() => setDetailTemplateId(null)} className="hover:text-indigo-600 transition-colors cursor-pointer">投票中心</button>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      <button onClick={() => setIsWorkspaceMode(false)} className="hover:text-indigo-600 transition-colors cursor-pointer">模版详情</button>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      <span>工作台配置中心</span>
                    </div>
                    <h2 className="text-[15.5px] font-black text-slate-800 tracking-tight leading-none">
                      当前模版工作区：{previewTemplate.title}
                    </h2>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const link = `https://ais-share-j4uzupg2.run.app/quiz/${previewTemplate.id}`;
                      navigator.clipboard.writeText(link);
                      alert(`演示及核销二维码已复制成功！\n${link}`);
                    }}
                    className="px-3.5 py-1.8 h-9.5 rounded-xl border border-slate-250 hover:border-slate-350 hover:bg-slate-50 text-slate-600 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    活动宣传复制
                  </button>
                  <button
                    onClick={() => alert(`【${previewTemplate.title}】投票营销活动已在当前测试环境中一键编译并上线！`)}
                    className={cn("px-4.5 py-1.8 h-9.5 rounded-xl text-white text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer", themeBtn)}
                  >
                    <Rocket className="w-4 h-4 animate-bounce" />
                    立即编译上线
                  </button>
                </div>
              </header>

              <main className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-5 p-5">
                <section className="w-full lg:w-[320px] bg-slate-900 border border-slate-950 rounded-3xl p-6 flex flex-col justify-between shrink-0 h-full relative overflow-hidden shadow-inner">
                  <div className="space-y-1 mb-3 text-center">
                    <span className="text-[9.5px] font-black tracking-widest text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/25 px-2.5 py-1 rounded-md inline-block uppercase animate-pulse">
                      ● SIMULATING LIVE ENVIRONMENT
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold">试玩区域可实时反馈右侧面板修改</p>
                  </div>

                  <VotingAppSimulator
                    templateId={previewTemplate.id}
                    title={previewTemplate.title}
                    colorBg={previewTemplate.colorBg}
                    themeBtn={themeBtn}
                  />

                  <div className="text-center text-slate-550 text-[9.5px] select-none font-bold mt-3">
                    * 真实发布支持在微端、微信小程序及外部 APP 中一键嵌入
                  </div>
                </section>

                <section className="flex-1 h-full min-w-0">
                  <VotingConfigPanel
                    templateId={previewTemplate.id}
                    initialTitle={previewTemplate.title}
                    onTitleChange={(title) => handleTemplateTitleChange(previewTemplate.id, title)}
                    themeBtn={themeBtn}
                  />
                </section>
              </main>
            </div>
          ) : (
            <div className="max-w-[1440px] w-full mx-auto animate-in fade-in duration-300 text-left bg-[#FAFBFD]">
              <div className="sticky top-0 z-30 pt-6 md:pt-8 pb-4 px-6 md:px-8 flex items-center select-none bg-[#FAFBFD]">
                <div className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                  <button onClick={() => setDetailTemplateId(null)} className="hover:text-indigo-650 transition-colors cursor-pointer font-extrabold flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> 返回首页
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-slate-905 font-black">{previewTemplate.type}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-slate-500 font-medium truncate max-w-[150px] sm:max-w-xs" title={previewTemplate.title}>{previewTemplate.title}</span>
                </div>
              </div>

              <div className="px-6 md:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-[min(340px,44vh)] h-[min(660px,85vh)] rounded-[36px] border-[10px] border-slate-900 bg-slate-950 shadow-2xl flex flex-col overflow-hidden select-none ring-4 ring-slate-100/80">
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[68px] h-3 bg-slate-900 border border-slate-805 rounded-full z-50 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-slate-800" />
                        </div>
                        <div className="absolute top-0.5 inset-x-0 h-4 bg-transparent z-40 flex items-center justify-between px-5 text-white/90 text-[8.5px] font-mono select-none">
                          <span>08:53</span>
                          <div className="flex items-center gap-1">
                            <span>● WI-FI</span>
                            <span className="text-emerald-400">100%</span>
                          </div>
                        </div>
                        <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col justify-between pt-4">
                          <div className="flex-grow flex flex-col justify-center items-center scale-95 origin-center">
                            <VotingAppSimulator
                              templateId={previewTemplate.id}
                              title={previewTemplate.title}
                              colorBg={previewTemplate.colorBg}
                              themeBtn={themeBtn}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="xl:absolute xl:top-8 xl:-right-14 xl:left-auto flex xl:flex-col flex-row gap-3 mt-4 xl:mt-0 z-45">
                        <button
                          onClick={() => toggleFavorite(previewTemplate.id)}
                          className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center w-11 h-11"
                          title={favorites.has(previewTemplate.id) ? "取消收藏" : "收藏模板"}
                        >
                          <Heart className={cn("w-5 h-5 transition-colors", favorites.has(previewTemplate.id) ? "fill-red-500 text-red-500 border-transparent animate-pulse" : "text-slate-650")} />
                        </button>

                        <div className="relative group/share font-sans">
                          <button className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 bg-white text-slate-650 transition-all cursor-pointer active:scale-95 shadow-md flex items-center justify-center w-11 h-11" title="查看/分享二维码">
                            <Share2 className="w-5 h-5 text-slate-600" />
                          </button>
                          <div className="absolute right-0 xl:right-auto xl:left-1/2 xl:-translate-x-1/2 top-full mt-2 w-[200px] p-4 bg-white border border-slate-200 rounded-2xl shadow-xl z-55 pointer-events-none opacity-0 group-hover/share:opacity-100 group-hover/share:pointer-events-auto transition-all duration-300 transform scale-95 group-hover/share:scale-100 origin-top flex flex-col items-center gap-2 bg-white/98 backdrop-blur-md">
                            <span className="text-[11px] font-black text-slate-700 flex items-center gap-1 leading-none whitespace-nowrap">
                              <ScanLine className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                              微信扫码真机试玩
                            </span>
                            <div className="w-28 h-28 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-1.5 relative shadow-xs">
                              <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="5" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
                                <rect x="11" y="11" width="10" height="10" rx="1.5" fill="currentColor" />
                                <rect x="73" y="5" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
                                <rect x="79" y="11" width="10" height="10" rx="1.5" fill="currentColor" />
                                <rect x="5" y="73" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="4" />
                                <rect x="11" y="79" width="10" height="10" rx="1.5" fill="currentColor" />
                                <rect x="42" y="42" width="16" height="16" rx="3" fill="#4f46e5" />
                                <text x="50" y="54" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">💡</text>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden group text-left">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-full pointer-events-none" />
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-[#1C68F5] bg-[#EDF5FF] border border-[#E3EFFF] px-2.5 py-1 rounded-md leading-none">
                          {previewTemplate.type} • 精选智能投票
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2.5 leading-none">
                          {previewTemplate.title}
                        </h2>
                      </div>

                      <p className="text-slate-500 text-[13.5px] leading-relaxed font-semibold mt-4 z-10 text-left">
                        支持通过 AI 智能生成候选内容，生成个性化同款投票营销活动，或直接使用此模板快速设置并发布活动。内置高度适配当前题材的专业展示框架及防刷票逻辑。支持配置阶梯式投票奖励池、一键 OAuth 会员鉴权和精准倒计时控速。
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4 z-10">
                        {[previewTemplate.type, `${previewTemplate.style}风格`, previewTemplate.scene !== "全部" ? previewTemplate.scene : "通用场景"].filter(Boolean).slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[11px] font-bold px-2.5 py-1.5 bg-slate-100 text-slate-650 rounded-xl">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-10 flex gap-4 flex-wrap z-10">
                        <button
                          onClick={() => setIsWorkspaceMode(true)}
                          className={cn("px-8 py-4 text-white text-[13.5px] font-black rounded-xl transition-all duration-300 shadow-bold active:scale-95 flex items-center gap-2.5 cursor-pointer hover:shadow-lg", themeBtn)}
                        >
                          <Sparkles className="w-5 h-5 fill-white" />
                          AI 做同款
                        </button>
                        <button
                          onClick={() => alert(`恭喜，【${previewTemplate.title}】一端发布成功！投票海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`)}
                          className="px-8 py-4 text-white bg-slate-900 hover:bg-slate-800 font-extrabold rounded-xl text-[13.5px] transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg"
                        >
                          <Rocket className="w-5 h-5 text-emerald-400" />
                          立即发布
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2 text-left">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 select-none">
                        <Flame className="w-4 h-4 text-rose-500 fill-rose-500/10" />
                        相似爆款模板推荐
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {TEMPLATES_DATA.filter((t) => t.id !== previewTemplate.id).slice(0, 3).map((item, index) => (
                          <VotingTemplateCard
                            key={item.id}
                            item={item}
                            index={index}
                            renamedTitle={renamedTitles[item.id]}
                            favorites={favorites}
                            onToggleFavorite={toggleFavorite}
                            onPreview={setPreviewModalTemplateId}
                            onDetail={handleSelectTemplateDetail}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <>
            {activeSidebar === "center" ? (
              <div className="w-full animate-in fade-in duration-300">
                <VotingSearchHero
                  title={<>搜索你想要的<span className="text-blue-600">AI 投票模板</span></>}
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  placeholder={typedPlaceholder || "搜索照片投票、视频投票、语音投票、年度评选等玩法"}
                  hotSearches={HOT_SEARCHES.map((item) => ({ text: item.text, emoji: item.icon }))}
                  onHotSearch={setSearchQuery}
                  category="center"
                />

                <VotingCategoryTabs
                  items={VOTING_CATEGORIES.map((cat) => ({ id: cat.id, name: cat.id === "全部" ? "全部" : cat.name }))}
                  active={selectedType}
                  onSelect={(id) => setSelectedType(id)}
                />

                <VotingTemplateGallery
                  title={selectedType === "全部" ? "全部投票模板" : `${selectedType}模板`}
                  templates={orderedTemplates}
                  selectedSort={selectedSort}
                  onSortChange={setSelectedSort}
                  filterTabs={
                    <div className="flex flex-wrap items-center gap-2">
                      {VOTING_SCENE_FILTERS.map((sceneName) => {
                        const isSel = selectedScene === sceneName;
                        return (
                          <button
                            key={sceneName}
                            onClick={() => setSelectedScene(sceneName)}
                            className={cn(
                              "px-3.5 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer text-[13.5px] items-center justify-center flex shadow-[0_1px_2px_rgba(0,0,0,0.05)] border outline-hidden whitespace-nowrap",
                              isSel ? "bg-blue-50/80 border-blue-500 text-blue-600 shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                            )}
                          >
                            {sceneName}
                          </button>
                        );
                      })}
                    </div>
                  }
                  renamedTitles={renamedTitles}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onPreview={setPreviewModalTemplateId}
                  onDetail={handleSelectTemplateDetail}
                  emptyTitle="未找到匹配该过滤条件的投票模板"
                  emptyDesc="请尝试更换分类、场景或搜索其他关键词"
                  onReset={() => {
                    setSelectedType("全部");
                    setSelectedStyle("全部");
                    setSelectedScene("精选");
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
                  const hotTerms = catConfig.subPlaystyles.slice(0, 6).map((text) => ({ text, emoji: getHotSearchEmoji(activeSidebar) }));
                  const hideCategoryTabs = ["照片投票", "视频投票", "语音投票"].includes(activeSidebar);

                  return (
                    <>
                      <VotingSearchHero
                        title={<><span className="text-blue-600">{activeSidebar}</span>模板</>}
                        searchValue={categorySearchQuery}
                        onSearchChange={setCategorySearchQuery}
                        placeholder={`搜索${activeSidebar}玩法模板、活动主题、赛制场景`}
                        hotSearches={hotTerms}
                        onHotSearch={(value) => {
                          if (catConfig.subPlaystyles.includes(value)) setSelectedCategorySubFilter(value);
                          else setCategorySearchQuery(value);
                        }}
                        category={activeSidebar}
                      />

                      {!hideCategoryTabs && (
                        <VotingCategoryTabs
                          items={catConfig.subPlaystyles.map((sub) => ({ id: sub === "全部" ? activeSidebar : sub, name: sub }))}
                          active={selectedCategorySubFilter === "全部" ? activeSidebar : selectedCategorySubFilter}
                          onSelect={(id) => setSelectedCategorySubFilter(id === activeSidebar ? "全部" : id)}
                        />
                      )}

                      <VotingTemplateGallery
                        title={`${activeSidebar}模板`}
                        templates={categoryFiltered}
                        selectedSort={selectedSort}
                        onSortChange={setSelectedSort}
                        renamedTitles={renamedTitles}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onPreview={setPreviewModalTemplateId}
                        onDetail={handleSelectTemplateDetail}
                        emptyTitle="该细分玩法或搜索目录下暂无对应模板"
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
          </>
        )}
      </div>

      {previewModalTemplateId && previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setPreviewModalTemplateId(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300" />
          <div className="relative w-full max-w-[860px] bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-200 border border-slate-100 font-sans">
            <div className="w-full md:w-[48%] bg-[#1E293B] p-8 shrink-0 flex items-center justify-center relative overflow-hidden select-none">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative w-[235px] h-[430px] bg-slate-800 rounded-[36px] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-[4px] border-slate-700/80 flex flex-col overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-slate-700 rounded-full" />
                </div>

                <div className={cn("flex-1 rounded-[26px] overflow-hidden relative flex flex-col bg-gradient-to-br", previewTemplate.colorBg)}>
                  <div className="absolute inset-0 bg-[#ffffff0a] pointer-events-none mix-blend-overlay" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-15 pointer-events-none" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="w-24 h-24 rounded-full border-8 border-indigo-400/40 animate-pulse flex items-center justify-center shadow-lg relative mt-4">
                      <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-indigo-300/40" />
                      <span className="text-[9px] font-black tracking-wider text-indigo-200">ACTIVE</span>
                    </div>
                    <div className="mt-8 text-center px-2">
                      <h4 className="text-[14px] font-black text-white leading-tight tracking-wide drop-shadow-md">
                        {previewTemplate.title}
                      </h4>
                      <p className="text-[9px] font-bold text-white/50 tracking-widest mt-1 uppercase">
                        {previewTemplate.type} • AI GENERATED
                      </p>
                    </div>
                    <div className="absolute bottom-5 inset-x-8 py-2 rounded-xl bg-white/10 text-center text-white text-[9px] font-black tracking-widest uppercase border border-white/15 backdrop-blur-xs">
                      TAP TO START
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[52%] p-8 flex flex-col justify-between relative bg-white text-left">
              <button onClick={() => setPreviewModalTemplateId(null)} className="absolute top-4.5 right-4.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all z-20 cursor-pointer">
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="space-y-5.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EDF5FF] text-[#1C68F5] rounded-full text-[11.5px] font-bold select-none border border-[#E3EFFF]">
                  <Brain className="w-3.5 h-3.5 text-[#1C68F5]" />
                  <span>{previewTemplate.type}</span>
                </div>

                <div>
                  <h2 className="text-2.5xl md:text-3xl font-black text-slate-800 tracking-tight leading-none text-left">
                    {previewTemplate.title}
                  </h2>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed font-semibold mt-3.5 text-left">
                    支持通过 AI 智能生成候选内容，生成个性化同款投票营销活动，或直接使用此模板快速设置并发布活动。
                  </p>
                </div>

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
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-[14px] font-black text-slate-800 text-left leading-none">
                      扫码手机预览
                    </h4>
                    <p className="text-[11px] text-slate-400 font-bold mt-1.5 text-left leading-none">
                      扫码体验真实投票效果
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-7">
                <button
                  onClick={() => {
                    setPreviewModalTemplateId(null);
                    handleSelectTemplateDetail(previewTemplate.id);
                    setIsWorkspaceMode(true);
                  }}
                  className="flex-1 py-3 px-5 font-black text-white text-[13px] rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-205 shadow-md flex items-center justify-center gap-1.5 cursor-pointer shadow-indigo-500/20"
                >
                  <Sparkles className="w-4 h-4 fill-white animate-pulse" />
                  做同款
                </button>
                <button
                  onClick={() => {
                    alert(`恭喜，【${previewTemplate.title}】一端发布成功！投票海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`);
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
      )}
    </div>
  );
}
