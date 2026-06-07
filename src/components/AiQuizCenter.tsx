import React, { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import {
  Brain, BookOpen, Calendar, Trophy, Users, Video, Sparkles, GraduationCap, FileText, Award, Search, ArrowLeft,
  Heart, Info, Flame, LayoutTemplate, HelpCircle, X, RotateCcw, ScanLine, Share2,
  Eye,
  Rocket, Code, Briefcase, MessagesSquare, ChevronRight, Home, Smartphone
} from "lucide-react";

import {
  CATEGORY_CONFIGS, QUIZ_CATEGORIES, TEMPLATES_DATA,
  HOT_SEARCHES, PLACEHOLDER_PHRASES, getTemplateImage, matchSubPlaystyle
} from "./quiz/quizData";
import { QuizAppSimulator } from "./quiz/QuizAppSimulator";
import { QuizConfigPanel } from "./quiz/QuizConfigPanel";
import IntegrationOptionsSection from "./IntegrationOptionsSection";
import TemplateCard from "./TemplateCard";
import SiteTemplateDetailPage from "./SiteTemplateDetailPage";
import categoryTabAll from "../assets/images/category-tabs/tab_all.png";
import imgKnowledgeQuizIcon from "../assets/images/quiz-icons/knowledge-quiz-v2.png";
import imgDailyQuizIcon from "../assets/images/quiz-icons/daily-quiz-v2.png";
import imgChallengeQuizIcon from "../assets/images/quiz-icons/challenge-quiz-v2.png";
import imgPkQuizIcon from "../assets/images/quiz-icons/pk-quiz-v2.png";
import imgVideoQuizIcon from "../assets/images/quiz-icons/video-quiz-v2.png";
import imgFunQuizIcon from "../assets/images/quiz-icons/fun-quiz-v2.png";
import imgStudyQuizIcon from "../assets/images/quiz-icons/study-quiz-v2.png";
import imgPracticeQuizIcon from "../assets/images/quiz-icons/practice-quiz-v2.png";
import imgExamQuizIcon from "../assets/images/quiz-icons/exam-quiz-v2.png";
import imgCourseQuizIcon from "../assets/images/quiz-icons/course-quiz-v2.png";

type RouteMode = "center" | string;
type TemplateType = typeof TEMPLATES_DATA[number];

const QUIZ_SCENE_FILTERS = [
  "全部",
  "节日答题",
  "党建学习",
  "企业文化",
  "知识竞赛",
  "百科答题",
  "行业答题"
];

const categoryTabColorMap: Record<string, { bg: string; active: string }> = {
  全部: { bg: "bg-blue-50", active: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)]" },
  知识答题: { bg: "bg-sky-50", active: "bg-sky-600 text-white shadow-[0_12px_24px_rgba(2,132,199,0.18)]" },
  每日一答: { bg: "bg-amber-50", active: "bg-amber-600 text-white shadow-[0_12px_24px_rgba(217,119,6,0.18)]" },
  闯关答题: { bg: "bg-purple-50", active: "bg-purple-600 text-white shadow-[0_12px_24px_rgba(147,51,234,0.18)]" },
  PK答题: { bg: "bg-rose-50", active: "bg-rose-600 text-white shadow-[0_12px_24px_rgba(225,29,72,0.18)]" },
  视频答题: { bg: "bg-amber-50", active: "bg-amber-600 text-white shadow-[0_12px_24px_rgba(217,119,6,0.18)]" },
  趣味答题: { bg: "bg-emerald-50", active: "bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.18)]" },
  学习答题: { bg: "bg-cyan-50", active: "bg-cyan-600 text-white shadow-[0_12px_24px_rgba(8,145,178,0.18)]" },
  练习: { bg: "bg-slate-50", active: "bg-slate-700 text-white shadow-[0_12px_24px_rgba(51,65,85,0.18)]" },
  考试: { bg: "bg-red-50", active: "bg-red-600 text-white shadow-[0_12px_24px_rgba(220,38,38,0.18)]" },
  课程: { bg: "bg-pink-50", active: "bg-pink-600 text-white shadow-[0_12px_24px_rgba(219,39,119,0.18)]" }
};

const HOT_SEARCH_EMOJI_MAP: Record<string, string> = {
  知识答题: "🧠",
  每日一答: "📅",
  闯关答题: "🏁",
  PK答题: "⚔️",
  视频答题: "🎬",
  趣味答题: "✨",
  学习答题: "📘",
  练习: "📝",
  考试: "📋",
  课程: "🎓",
  全部: "🔥"
};

const getHotSearchEmoji = (value: string) => HOT_SEARCH_EMOJI_MAP[value] || "🔥";

const QUIZ_CATEGORY_ICON_MAP: Record<string, string> = {
  全部: categoryTabAll,
  知识答题: imgKnowledgeQuizIcon,
  每日一答: imgDailyQuizIcon,
  闯关答题: imgChallengeQuizIcon,
  PK答题: imgPkQuizIcon,
  视频答题: imgVideoQuizIcon,
  趣味答题: imgFunQuizIcon,
  学习答题: imgStudyQuizIcon,
  练习: imgPracticeQuizIcon,
  考试: imgExamQuizIcon,
  课程: imgCourseQuizIcon,
};

const getUsageText = (hot: number) => `${(hot / 10000).toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}万人使用`;

const matchSceneFilter = (template: TemplateType, renamedTitle: string, selectedScene: string) => {
  if (selectedScene === "全部") return true;
  const t = renamedTitle.toLowerCase();
  if (selectedScene === "晋级答题") return t.includes("晋级") || t.includes("排位") || t.includes("海选");
  if (selectedScene === "节日答题") return t.includes("节日") || t.includes("高考") || t.includes("端午");
  if (selectedScene === "党建学习") return t.includes("党建") || t.includes("行为") || t.includes("规章");
  if (selectedScene === "企业文化") return t.includes("企业") || t.includes("培训") || t.includes("入职");
  if (selectedScene === "知识竞赛") return t.includes("竞赛") || t.includes("测试");
  if (selectedScene === "百科答题") return t.includes("百科");
  if (selectedScene === "行业答题") return t.includes("行业") || t.includes("安全") || t.includes("出行") || t.includes("规范") || t.includes("python");
  if (selectedScene === "视频答题") return t.includes("视频") || t.includes("短片") || t.includes("电影");
  return true;
};

function QuizSearchHero({
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

    const getThemeKey = () => {
      if (theme === "center" || theme === "全部") return "center";
      if (theme.includes("知识")) return "knowledge";
      if (theme.includes("每日")) return "daily";
      if (theme.includes("闯关")) return "challenge";
      if (theme.includes("PK")) return "pk";
      if (theme.includes("视频")) return "video";
      if (theme.includes("趣味")) return "fun";
      if (theme.includes("学习")) return "study";
      if (theme.includes("练习")) return "practice";
      if (theme.includes("考试")) return "exam";
      if (theme.includes("课程")) return "course";
      return "center";
    };
    const themeKey = getThemeKey();

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

    const fillMetricDots = (ctx: CanvasRenderingContext2D, dots: Array<{ x: number; y: number; color: string; r?: number }>) => {
      dots.forEach(({ x, y, color, r = 8 }) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawPill = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string) => {
      ctx.fillStyle = fill;
      roundedRect(ctx, x, y, w, h, Math.min(h / 2, 999));
      ctx.fill();
    };

    const drawCenterPrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -56, 164, 112, 28);
      ctx.fill();
      ctx.fillStyle = "#2f6cff";
      roundedRect(ctx, -54, -26, 88, 52, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-10, 1, 15, 0, Math.PI * 2);
      ctx.fill();
      drawPill(ctx, -26, 22, 32, 10, "#dbeafe");
      ctx.fillStyle = "#ffb14a";
      ctx.beginPath();
      ctx.arc(42, -18, 10 + Math.sin(t * 2) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#7bc98b";
      ctx.beginPath();
      ctx.arc(42, 18, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawKnowledgePrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -84, -58, 168, 116, 28);
      ctx.fill();
      ctx.fillStyle = "#e8f2ff";
      roundedRect(ctx, -62, -38, 58, 78, 18);
      ctx.fill();
      ctx.fillStyle = "#2f6cff";
      roundedRect(ctx, -50, -24, 34, 46, 12);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-33, -2, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      roundedRect(ctx, 12, -34, 48, 12, 6);
      ctx.fill();
      ctx.fillStyle = "#7db6ff";
      roundedRect(ctx, 12, -10, 56, 10, 5);
      ctx.fill();
      ctx.fillStyle = "#bfd7ff";
      roundedRect(ctx, 12, 12, 42, 10, 5);
      ctx.fill();
      ctx.strokeStyle = "#ffb14a";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-6, 34);
      ctx.lineTo(18, 20 + Math.sin(t * 2) * 3);
      ctx.lineTo(44, 30);
      ctx.stroke();
      fillMetricDots(ctx, [
        { x: -4, y: 34, color: "#5ec46b", r: 7 },
        { x: 18, y: 20 + Math.sin(t * 2) * 3, color: "#ffb14a", r: 7 },
        { x: 44, y: 30, color: "#2f6cff", r: 7 }
      ]);
    };

    const drawDailyPrimary = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -74, -56, 148, 112, 24);
      ctx.fill();
      ctx.fillStyle = "#ff8a3d";
      roundedRect(ctx, -74, -56, 148, 26, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-42, -66, 10, 20);
      ctx.fillRect(32, -66, 10, 20);
      for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 4; col += 1) {
          ctx.fillStyle = row === 1 && col === 2 ? "#2f6cff" : "#dbe8ff";
          roundedRect(ctx, -54 + col * 30, -14 + row * 24, 18, 16, 6);
          ctx.fill();
        }
      }
    };

    const drawChallengePrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -56, 164, 112, 28);
      ctx.fill();
      ctx.strokeStyle = "#2f6cff";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-52, 28);
      ctx.lineTo(-18, 4);
      ctx.lineTo(12, -14);
      ctx.lineTo(44, -36);
      ctx.stroke();
      [-52, -18, 12, 44].forEach((dot, i) => {
        ctx.fillStyle = i === 3 ? "#ff8a3d" : "#5ec46b";
        ctx.beginPath();
        ctx.arc(dot, 28 - i * 20 + Math.sin(t * 1.5 + i) * 2, 10, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "#ff8a3d";
      ctx.fillRect(42, -58, 8, 18);
      ctx.beginPath();
      ctx.moveTo(50, -58);
      ctx.lineTo(68, -50);
      ctx.lineTo(50, -42);
      ctx.closePath();
      ctx.fill();
    };

    const drawPkPrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -84, -56, 168, 112, 28);
      ctx.fill();
      [[-40, "#2f6cff"], [40, "#ff8a3d"]].forEach(([dx, color]) => {
        ctx.fillStyle = String(color);
        ctx.beginPath();
        ctx.arc(Number(dx), 0, 24 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(Number(dx), 0, 8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-10, -12);
      ctx.lineTo(0, 10);
      ctx.lineTo(10, -12);
      ctx.stroke();
    };

    const drawVideoPrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -84, -58, 168, 116, 28);
      ctx.fill();
      const player = ctx.createLinearGradient(-56, -24, 56, 30);
      player.addColorStop(0, "#153b8a");
      player.addColorStop(1, "#2f6cff");
      ctx.fillStyle = player;
      roundedRect(ctx, -56, -24, 112, 64, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(-8, -8);
      ctx.lineTo(-8, 20);
      ctx.lineTo(22, 6);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ffb14a";
      roundedRect(ctx, -50, -44, 40, 12, 6);
      ctx.fill();
      ctx.fillStyle = "#e6efff";
      roundedRect(ctx, 8, -44, 38, 12, 6);
      ctx.fill();
      ctx.fillStyle = "#c7d8ff";
      roundedRect(ctx, -24, 48, 48, 8, 4);
      ctx.fill();
      fillMetricDots(ctx, [
        { x: 52, y: -36 + Math.sin(t * 2.4) * 2, color: "#ff8a3d", r: 7 },
        { x: 58, y: 42, color: "#5ec46b", r: 7 }
      ]);
    };

    const drawFunPrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -56, 164, 112, 28);
      ctx.fill();
      const card = ctx.createLinearGradient(-50, -26, 40, 32);
      card.addColorStop(0, "#7c5cff");
      card.addColorStop(1, "#ff7fc3");
      ctx.fillStyle = card;
      roundedRect(ctx, -54, -28, 92, 62, 22);
      ctx.fill();
      drawPill(ctx, -20, -6, 28, 10, "#ffffff");
      ctx.strokeStyle = "#ffb14a";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-44, 24);
      ctx.quadraticCurveTo(-12, 8 + Math.sin(t * 1.7) * 6, 20, 22);
      ctx.quadraticCurveTo(36, 28, 52, 12);
      ctx.stroke();
      fillMetricDots(ctx, [
        { x: -46, y: -18, color: "#ffd96a", r: 7 },
        { x: 42, y: -16, color: "#78d6ff", r: 8 },
        { x: 54, y: 34, color: "#ff8fb3", r: 7 }
      ]);
    };

    const drawStudyPrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -84, -56, 168, 112, 28);
      ctx.fill();
      ctx.fillStyle = "#dff5ff";
      roundedRect(ctx, -62, -38, 54, 74, 18);
      ctx.fill();
      ctx.fillStyle = "#2aa9c8";
      roundedRect(ctx, -52, -26, 34, 50, 12);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-42, -16, 14, 3);
      ctx.fillRect(-42, -8, 14, 3);
      ctx.fillRect(-42, 0, 14, 3);
      ctx.fillStyle = "#0f172a";
      roundedRect(ctx, 12, -28, 48, 10, 5);
      ctx.fill();
      ctx.fillStyle = "#87d7e8";
      roundedRect(ctx, 12, -4, 52, 10, 5);
      ctx.fill();
      ctx.fillStyle = "#b8eaf5";
      roundedRect(ctx, 12, 20, 44, 10, 5);
      ctx.fill();
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(4, 36);
      ctx.lineTo(20, 50);
      ctx.lineTo(48, 18 + Math.sin(t * 2) * 2);
      ctx.stroke();
    };

    const drawPracticePrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -56, 164, 112, 28);
      ctx.fill();
      ctx.fillStyle = "#eef3ff";
      roundedRect(ctx, -46, -34, 72, 78, 18);
      ctx.fill();
      for (let i = 0; i < 4; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? "#8eb7ff" : "#c6d9ff";
        roundedRect(ctx, -34, -20 + i * 16, 48, 8, 4);
        ctx.fill();
      }
      ctx.save();
      ctx.translate(44, 18);
      ctx.rotate(-0.35 + Math.sin(t * 1.6) * 0.05);
      ctx.fillStyle = "#ffb14a";
      roundedRect(ctx, -8, -34, 16, 52, 8);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.moveTo(-8, -34);
      ctx.lineTo(0, -48);
      ctx.lineTo(8, -34);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      fillMetricDots(ctx, [
        { x: -52, y: -24, color: "#5ec46b", r: 6 },
        { x: 58, y: -20, color: "#2f6cff", r: 7 }
      ]);
    };

    const drawExamPrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -56, 164, 112, 28);
      ctx.fill();
      ctx.fillStyle = "#fff4f4";
      roundedRect(ctx, -54, -36, 96, 80, 20);
      ctx.fill();
      drawPill(ctx, -30, -20, 44, 10, "#f87171");
      for (let i = 0; i < 3; i += 1) {
        ctx.fillStyle = "#fca5a5";
        roundedRect(ctx, -32, 2 + i * 14, 54, 7, 3.5);
        ctx.fill();
      }
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(50, -22, 16 + Math.sin(t * 2) * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(49, -30, 3, 10);
      ctx.fillRect(49, -22, 8, 3);
    };

    const drawCoursePrimary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, -82, -56, 164, 112, 28);
      ctx.fill();
      const stackColors = ["#ffd7ea", "#cfe6ff", "#e9ddff"];
      stackColors.forEach((color, i) => {
        ctx.fillStyle = color;
        roundedRect(ctx, -52 + i * 10, -30 + i * 10, 88, 56, 16);
        ctx.fill();
      });
      ctx.fillStyle = "#0f172a";
      roundedRect(ctx, -26, -8, 44, 10, 5);
      ctx.fill();
      ctx.fillStyle = "#f472b6";
      roundedRect(ctx, -26, 12, 56, 8, 4);
      ctx.fill();
      fillMetricDots(ctx, [
        { x: 54, y: -32 + Math.sin(t * 2) * 2, color: "#f472b6", r: 7 },
        { x: -56, y: 34, color: "#60a5fa", r: 7 }
      ]);
    };

    const drawCenterSecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      const bars = ["#2f6cff", "#5ec46b", "#ffb14a"];
      bars.forEach((color, i) => {
        const x = -52 + i * 38;
        const height = 22 + Math.sin(t * 1.9 + i) * 8 + i * 10;
        ctx.fillStyle = color;
        roundedRect(ctx, x, 32 - height, 30, height, 10);
        ctx.fill();
      });
      ctx.strokeStyle = "#9f75ff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-46, -18);
      ctx.lineTo(-10, -28);
      ctx.lineTo(24, -8);
      ctx.lineTo(48, -24);
      ctx.stroke();
    };

    const drawKnowledgeSecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#f5f8ff";
      roundedRect(ctx, -56, -34, 112, 78, 20);
      ctx.fill();
      ctx.fillStyle = "#2f6cff";
      roundedRect(ctx, -40, -18, 28, 40, 10);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-26, 4, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      roundedRect(ctx, 2, -20, 36, 8, 4);
      ctx.fill();
      ctx.fillStyle = "#8ab4ff";
      roundedRect(ctx, 2, -2, 44, 8, 4);
      ctx.fill();
      ctx.fillStyle = "#c5d9ff";
      roundedRect(ctx, 2, 16, 32, 8, 4);
      ctx.fill();
      ctx.strokeStyle = "#ffb14a";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(-44, 32);
      ctx.lineTo(-8, 20 + Math.sin(t * 2) * 2);
      ctx.lineTo(26, 28);
      ctx.lineTo(50, 10);
      ctx.stroke();
    };

    const drawDailySecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#fff8f0";
      roundedRect(ctx, -56, -34, 112, 80, 20);
      ctx.fill();
      [-26, 6, 38].forEach((dx, index) => {
        ctx.fillStyle = index === 1 ? "#ff8a3d" : "#ffd4b0";
        roundedRect(ctx, Number(dx), -20, 24, 16, 6);
        ctx.fill();
      });
      const y = 20 + Math.sin(t * 1.8) * 4;
      ctx.fillStyle = "#2f6cff";
      roundedRect(ctx, -10, y - 18, 20, 20, 6);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, y - 8, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffb14a";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-42, 28);
      ctx.lineTo(-20, 8);
      ctx.lineTo(0, 18);
      ctx.lineTo(22, -2);
      ctx.lineTo(42, 8);
      ctx.stroke();
    };

    const drawChallengeSecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#f7f2ff";
      roundedRect(ctx, -56, -34, 112, 80, 20);
      ctx.fill();
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-42, 28);
      ctx.lineTo(-20, 10);
      ctx.lineTo(0, 18);
      ctx.lineTo(20, -6);
      ctx.lineTo(40, -18);
      ctx.stroke();
      [-42, -20, 0, 20, 40].forEach((x, i) => {
        ctx.fillStyle = i === 4 ? "#ffb14a" : "#a78bfa";
        ctx.beginPath();
        ctx.arc(x, [28, 10, 18, -6, -18][i] + Math.sin(t * 1.5 + i) * 1.5, 7, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawPkSecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      const bars = ["#2f6cff", "#ff8a3d"];
      bars.forEach((color, i) => {
        const x = -58 + i * 68;
        const height = 30 + Math.sin(t * 2 + i) * 8 + i * 4;
        ctx.fillStyle = color;
        roundedRect(ctx, x, 34 - height, 48, height, 12);
        ctx.fill();
      });
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-9, -18);
      ctx.lineTo(0, -2);
      ctx.lineTo(9, -18);
      ctx.stroke();
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-22, 24);
      ctx.lineTo(0, 10);
      ctx.lineTo(22, 24);
      ctx.stroke();
    };

    const drawVideoSecondary = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#2f6cff";
      roundedRect(ctx, -54, -30, 108, 62, 18);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(-8, -10);
      ctx.lineTo(-8, 16);
      ctx.lineTo(18, 3);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ffb14a";
      ctx.beginPath();
      ctx.arc(0, 52, 10, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawFunSecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      const hue = 280 + Math.sin(t * 1.2) * 18;
      ctx.fillStyle = `hsl(${hue} 82% 96%)`;
      roundedRect(ctx, -58, -34, 116, 80, 20);
      ctx.fill();
      ctx.fillStyle = "#7c3aed";
      roundedRect(ctx, -34, -18, 68, 32, 12);
      ctx.fill();
      drawPill(ctx, -18, -5, 36, 10, "#ffffff");
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 24, 20, Math.PI, 2 * Math.PI);
      ctx.stroke();
      fillMetricDots(ctx, [
        { x: -42, y: -16, color: "#fbbf24", r: 7 },
        { x: 46, y: -14, color: "#22d3ee", r: 7 },
        { x: 34, y: 26, color: "#fb7185", r: 7 }
      ]);
    };

    const drawStudySecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#effcff";
      roundedRect(ctx, -58, -34, 116, 82, 20);
      ctx.fill();
      ctx.fillStyle = "#0ea5b7";
      roundedRect(ctx, -42, -20, 84, 14, 7);
      ctx.fill();
      drawPill(ctx, -18, -13, 36, 6, "#ffffff");
      ["#67e8f9", "#a5f3fc", "#cffafe"].forEach((color, i) => {
        ctx.fillStyle = color;
        roundedRect(ctx, -44, 4 + i * 14, 88 - i * 12, 8, 4);
        ctx.fill();
      });
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(18, 32);
      ctx.lineTo(28, 42);
      ctx.lineTo(46, 18 + Math.sin(t * 2) * 2);
      ctx.stroke();
    };

    const drawPracticeSecondary = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#f8fafc";
      roundedRect(ctx, -58, -34, 116, 82, 20);
      ctx.fill();
      for (let i = 0; i < 5; i += 1) {
        ctx.fillStyle = i === 2 ? "#94a3b8" : "#d9e2ef";
        roundedRect(ctx, -42, -18 + i * 14, 84 - (i % 2) * 12, 7, 3.5);
        ctx.fill();
      }
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(34, 26, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(34, 26, 4.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawExamSecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#fff5f5";
      roundedRect(ctx, -58, -34, 116, 82, 20);
      ctx.fill();
      ctx.fillStyle = "#ef4444";
      roundedRect(ctx, -40, -20, 54, 14, 7);
      ctx.fill();
      drawPill(ctx, -22, -15, 18, 5, "#ffffff");
      ctx.fillStyle = "#fca5a5";
      roundedRect(ctx, -40, 4, 72, 8, 4);
      ctx.fill();
      ctx.fillStyle = "#fecaca";
      roundedRect(ctx, -40, 20, 52, 8, 4);
      ctx.fill();
      ctx.strokeStyle = "#b91c1c";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(34, 20, 14 + Math.sin(t * 2) * 1.5, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawCourseSecondary = (ctx: CanvasRenderingContext2D, t: number) => {
      ctx.fillStyle = "#fdf2f8";
      roundedRect(ctx, -58, -34, 116, 82, 20);
      ctx.fill();
      [0, 1, 2].forEach((i) => {
        ctx.fillStyle = ["#f9a8d4", "#c4b5fd", "#93c5fd"][i];
        roundedRect(ctx, -42, -16 + i * 22, 84, 14, 7);
        ctx.fill();
        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.arc(-28, -8 + i * 22, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
      fillMetricDots(ctx, [
        { x: 46, y: -20 + Math.sin(t * 2) * 2, color: "#ec4899", r: 6 },
        { x: 40, y: 30, color: "#60a5fa", r: 6 }
      ]);
    };

    const drawQuizPrimary = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2 + Math.sin(t * 1.25) * 5);
      ctx.rotate(-0.13 + Math.sin(t * 0.8) * 0.035);
      const glow = ctx.createRadialGradient(0, 0, 20, 0, 0, 126);
      glow.addColorStop(0, "rgba(74,144,255,0.22)");
      glow.addColorStop(1, "rgba(74,144,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-140, -120, 280, 240);
      if (themeKey === "knowledge") drawKnowledgePrimary(ctx, t);
      else if (themeKey === "daily") drawDailyPrimary(ctx);
      else if (themeKey === "challenge") drawChallengePrimary(ctx, t);
      else if (themeKey === "pk") drawPkPrimary(ctx, t);
      else if (themeKey === "video") drawVideoPrimary(ctx, t);
      else if (themeKey === "fun") drawFunPrimary(ctx, t);
      else if (themeKey === "study") drawStudyPrimary(ctx, t);
      else if (themeKey === "practice") drawPracticePrimary(ctx, t);
      else if (themeKey === "exam") drawExamPrimary(ctx, t);
      else if (themeKey === "course") drawCoursePrimary(ctx, t);
      else drawCenterPrimary(ctx, t);
      ctx.restore();
    };

    const drawQuizSecondary = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
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
      base.addColorStop(0.58, "#f7f3ff");
      base.addColorStop(1, "#dbe8ff");
      ctx.fillStyle = base;
      roundedRect(ctx, -82, -70, 164, 138, 34);
      ctx.fill();
      if (themeKey === "knowledge") drawKnowledgeSecondary(ctx, t);
      else if (themeKey === "daily") drawDailySecondary(ctx, t);
      else if (themeKey === "challenge") drawChallengeSecondary(ctx, t);
      else if (themeKey === "pk") drawPkSecondary(ctx, t);
      else if (themeKey === "video") drawVideoSecondary(ctx);
      else if (themeKey === "fun") drawFunSecondary(ctx, t);
      else if (themeKey === "study") drawStudySecondary(ctx, t);
      else if (themeKey === "practice") drawPracticeSecondary(ctx);
      else if (themeKey === "exam") drawExamSecondary(ctx, t);
      else if (themeKey === "course") drawCourseSecondary(ctx, t);
      else drawCenterSecondary(ctx, t);
      ctx.restore();
    };

    const render = () => {
      frame += 1;
      const t = frame / 60;
      [
        { canvas: leftCanvasRef.current, draw: drawQuizPrimary },
        { canvas: rightCanvasRef.current, draw: drawQuizSecondary }
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

function QuizCategoryTabs({
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
          const colorConfig = categoryTabColorMap[item.id] || categoryTabColorMap["全部"];
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                showIcons
                  ? "relative flex h-11 min-w-[108px] items-center justify-center rounded-2xl px-5 text-[13px] font-black transition-all cursor-pointer whitespace-nowrap"
                  : "relative flex h-10 min-w-[96px] items-center justify-center rounded-2xl px-4 text-[13px] font-black transition-all cursor-pointer whitespace-nowrap",
                isActive ? colorConfig.active : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {showIcons ? (
                <span className={cn(
                  "mr-2 flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full text-[15px]",
                  isActive ? "bg-white/16" : colorConfig.bg
                )}>
                  {QUIZ_CATEGORY_ICON_MAP[item.id] ? (
                    <img
                      src={QUIZ_CATEGORY_ICON_MAP[item.id]}
                      alt={item.name}
                      className={cn(
                        "rounded-full object-cover object-center",
                        item.id === "全部" ? "h-[88%] w-[88%] scale-100" : "h-full w-full scale-[1.06]"
                      )}
                      draggable={false}
                    />
                  ) : (
                    getHotSearchEmoji(item.id)
                  )}
                </span>
              ) : null}
              <span className="whitespace-nowrap leading-none">{item.name}</span>
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

function QuizTemplateCard({
  item,
  index,
  categoryKey,
  renamedTitle,
  favorites,
  onToggleFavorite,
  onPreview,
  onDetail
}: {
  key?: React.Key;
  item: TemplateType;
  index: number;
  categoryKey: string;
  renamedTitle?: string;
  favorites: Set<string>;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onPreview: (id: string) => void;
  onDetail: (id: string) => void;
}) {
  const image = getTemplateImage(item.id, index, categoryKey);
  const title = renamedTitle || item.title;
  const tags = [item.type, item.scene === "全部" ? `${item.style}风` : item.scene].filter(Boolean).slice(0, 2);
  const isFav = favorites.has(item.id);

  return (
    <TemplateCard
      key={item.id}
      title={title}
      image={image}
      category={item.type}
      subCategory={tags[1] || tags[0] || item.style}
      usageText={item.hot > 10000 ? `${(item.hot / 10000).toFixed(1)}w` : `${item.hot}`}
      onClick={() => onDetail(item.id)}
      badgeText={item.percentage >= 95 ? "爆款" : undefined}
      badgeClassName="bg-red-500/90"
      isFavorite={isFav}
      onToggleFavorite={(e) => onToggleFavorite(item.id, e)}
      imageWrapperClassName={cn("bg-gradient-to-br", item.colorBg)}
    />
  );
}

function QuizTemplateGallery({
  title,
  templates,
  categoryKey,
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
  categoryKey: string;
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
          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6 2xl:grid-cols-7 min-[1800px]:grid-cols-8">
            {templates.map((item, index) => (
              <QuizTemplateCard
                key={`${item.id}-${index}`}
                item={item}
                index={index}
                categoryKey={categoryKey}
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

export default function AiQuizCenter() {
  const [activeSidebar, setActiveSidebar] = useState<RouteMode>("center");
  const [activeSidebarName, setActiveSidebarName] = useState("首页");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("全部");
  const [selectedStyle, setSelectedStyle] = useState("全部");
  const [selectedScene, setSelectedScene] = useState("全部");
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
  const integrationItems = [
    {
      title: "微信小程序对接",
      subtitle: "无需开发 极速嵌接",
      onClick: () => alert("微信小程序对接：支持一键将答题发布为独立微信小程序，多级缓存秒级响应。如需具体对接技术文档，请点击下方「定制服务」联系技术支持人员。"),
      icon: MessagesSquare,
      iconClassName: "text-emerald-500",
      subtitleClassName: "text-emerald-600/80",
    },
    {
      title: "APP 集成安全方案",
      subtitle: "iOS & Android 无缝嵌入",
      onClick: () => alert("APP集成方案：全面支持 iOS/Android Native App 集成、Flutter/React Native 混合架构。轻量级 SDK 方案可使研发在 3 小时内实现首款答题活动接入。"),
      icon: Smartphone,
      iconClassName: "text-blue-500",
      subtitleClassName: "text-blue-600/75",
    },
    {
      title: "活动接口打通",
      subtitle: "资产互通 数据同步",
      onClick: () => alert("活动接口打通：可接入现有 CRM 以及会员积分体系，完美实现答题次数、道具资产与核心用户库的实时结算流。"),
      icon: Code,
      iconClassName: "text-amber-500",
      subtitleClassName: "text-amber-600/80",
    },
  ];

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

            {QUIZ_CATEGORIES.slice(1).map((cat) => {
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
                  onClick={() => alert("客户案例看板：查阅各板块优秀答题活动落地案例。")}
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
                onClick={() => alert("客户案例看板：查阅各板块优秀答题活动落地案例。")}
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
                      <button onClick={() => setDetailTemplateId(null)} className="hover:text-indigo-600 transition-colors cursor-pointer">答题中心</button>
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
                    onClick={() => alert(`【${previewTemplate.title}】答题营销活动已在当前测试环境中一键编译并上线！`)}
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

                  <QuizAppSimulator
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
                  <QuizConfigPanel
                    templateId={previewTemplate.id}
                    initialTitle={previewTemplate.title}
                    onTitleChange={(title) => handleTemplateTitleChange(previewTemplate.id, title)}
                    themeBtn={themeBtn}
                  />
                </section>
              </main>
            </div>
          ) : (
            <SiteTemplateDetailPage
              template={previewTemplate}
              previewImage={getTemplateImage(previewTemplate.id)}
              qrPreview={
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
              }
              recommendations={TEMPLATES_DATA.filter((t) => t.id !== previewTemplate.id).map((item) => ({ id: item.id }))}
              renderRecommendationCard={(item, index) => {
                const target = TEMPLATES_DATA.find((t) => t.id === item.id)!;
                return (
                  <QuizTemplateCard
                    key={target.id}
                    item={target}
                    index={index}
                    categoryKey={target.type}
                    renamedTitle={renamedTitles[target.id]}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onPreview={setPreviewModalTemplateId}
                    onDetail={handleSelectTemplateDetail}
                  />
                );
              }}
              onBack={() => setDetailTemplateId(null)}
              onPrimaryAction={() => setIsWorkspaceMode(true)}
              onSecondaryAction={() => alert(`恭喜，【${previewTemplate.title}】一端发布成功！答题海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`)}
              onToggleFavorite={() => toggleFavorite(previewTemplate.id)}
              isFavorite={favorites.has(previewTemplate.id)}
              themeButtonClassName={themeBtn}
            />
          )
        ) : (
          <>
            {activeSidebar === "center" ? (
              <div className="w-full animate-in fade-in duration-300">
                <QuizSearchHero
                  title={<>搜索你想要的<span className="text-blue-600">答题模板</span></>}
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  placeholder={typedPlaceholder || "搜索知识答题、闯关答题、PK答题、企业培训等玩法"}
                  hotSearches={HOT_SEARCHES.map((item) => ({ text: item.text, emoji: item.icon }))}
                  onHotSearch={setSearchQuery}
                  category="center"
                />

                <QuizCategoryTabs
                  items={QUIZ_CATEGORIES.map((cat) => ({ id: cat.id, name: cat.id === "全部" ? "全部" : cat.name }))}
                  active={selectedType}
                  onSelect={(id) => setSelectedType(id)}
                />

                <QuizTemplateGallery
                  title={selectedType === "全部" ? "全部模板" : `${selectedType}模板`}
                  templates={orderedTemplates}
                  categoryKey={selectedType}
                  selectedSort={selectedSort}
                  onSortChange={setSelectedSort}
                  filterTabs={
                    <div className="flex flex-wrap items-center gap-2">
                      {QUIZ_SCENE_FILTERS.map((sceneName) => {
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
                  emptyTitle="未找到匹配该过滤条件的答题模板"
                  emptyDesc="请尝试更换分类、场景或搜索其他关键词"
                  onReset={() => {
                    setSelectedType("全部");
                    setSelectedStyle("全部");
                    setSelectedScene("全部");
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
                  const hotTerms = catConfig.subPlaystyles.slice(0, 6).map((text) => ({ text, emoji: getHotSearchEmoji(text) }));
                  return (
                    <>
                      <QuizSearchHero
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

                      <QuizCategoryTabs
                        items={catConfig.subPlaystyles.map((sub) => ({ id: sub === "全部" ? activeSidebar : sub, name: sub }))}
                        active={selectedCategorySubFilter === "全部" ? activeSidebar : selectedCategorySubFilter}
                        onSelect={(id) => setSelectedCategorySubFilter(id === activeSidebar ? "全部" : id)}
                        showIcons={false}
                      />

                      <QuizTemplateGallery
                        title={`${activeSidebar}模板`}
                        templates={categoryFiltered}
                        categoryKey={String(activeSidebar)}
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
                    支持通过 AI 智能生成候选内容，生成个性化同款答题营销活动，或直接使用此模板快速设置并发布活动。
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
                      扫码体验真实答题效果
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
                    alert(`恭喜，【${previewTemplate.title}】一端发布成功！答题海报、微端落地页已同步上线，您可以扫码进行线上真实环境核销与试玩。`);
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
