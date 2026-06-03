import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Heart, CheckCircle2, AlertCircle, Clock, Award } from "lucide-react";

interface Question {
  q: string;
  opts: string[];
  correct: number;
}

interface VotingAppSimulatorProps {
  templateId: string;
  title: string;
  colorBg: string;
  themeBtn: string;
}

const QUIZ_DICTIONARY: Record<string, Question[]> = {
  q1: [
    { q: "《阿Q正传》中，阿Q最为忌讳的是什么？", opts: ["别人骂他", "别人说他穷", "头上的疤疮", "别人认错人"], correct: 2 },
    { q: "地球上水体最深、面积最大的大洋是？", opts: ["大西洋", "印度洋", "太平洋", "北冰洋"], correct: 2 },
    { q: "以下哪位文学家创作了著名作《悲惨世界》？", opts: ["雨果", "巴尔扎克", "莫泊桑", "莎士比亚"], correct: 0 }
  ],
  q2: [
    { q: "Which word represents '奇妙的/极其火爆的' in English?", opts: ["Spectacular", "Trivial", "Gloomy", "Severe"], correct: 0 },
    { q: "英语中的 'Metropolitan' 代表什么含义？", opts: ["大都市的", "虚无的", "微小的", "古老的"], correct: 0 },
    { q: "单词 'Aesthetic' 与以下哪个词意思最相近？", opts: ["美学的", "病态的", "多变的", "枯燥的"], correct: 0 }
  ],
  q3: [
    { q: "我国安全生产宣传月是每年的哪一个月份？", opts: ["5月", "6月", "7月", "11月"], correct: 1 },
    { q: "发生大规模火灾逃生时，以下哪项千万不能做？", opts: ["用湿毛巾捂住口鼻", "走步道疏散阀", "搭乘箱式电梯", "往背风方向逃生"], correct: 2 },
    { q: "生产岗位的常设‘安全三原则’不包含？", opts: ["整理整顿", "严格穿戴劳保鞋帽", "带病加班坚持战斗", "设备检修断电警示"], correct: 2 }
  ],
  q4: [
    { q: "游戏常识：中国四大发明中哪个被最早用于战争？", opts: ["造纸术", "印刷术", "火药", "指南针"], correct: 2 },
    { q: "《滕王阁序》的名句‘秋水共长天一色’上一句是？", opts: ["海内存知己", "落霞与孤鹜齐飞", "天涯若比邻", "城阙辅三秦"], correct: 1 },
    { q: "世界上平均海拔最高、落差最大的陆地山脉是？", opts: ["落基山脉", "喜马拉雅山脉", "安第斯山脉", "阿尔卑斯山脉"], correct: 1 }
  ],
  q5: [
    { q: "骑行共享电动单车时，为了人身安全必须？", opts: ["逆行抄近路", "佩戴安全头盔", "手持手机导航", "双人同骑"], correct: 1 },
    { q: "机动车右拐弯礼让行人时，正确应该？", opts: ["狂按喇叭警示", "加速从行人前穿过", "减速减档停车让行", "强行占道逼停"], correct: 2 },
    { q: "道路行驶交通标志中的‘黄底三角形’一般是表示？", opts: ["指示标志", "警告标志", "禁止标志", "禁令解除标志"], correct: 1 }
  ],
  q6: [
    { q: "当你面临巨大工作压力时，你通常下意识会？", opts: ["冷静分析制订甘特图", "买张机票说走就走", "狂买零食并开启大吃", "找朋友狂唠嗑宣泄"], correct: 1 },
    { q: "假设意外获得100万，你绝大部分会用来？", opts: ["全部存在银行吃利息", "投资股票及先锋技术", "资助旅行与高端奢享", "全款给家里买好物"], correct: 1 },
    { q: "朋友在深夜哭诉遇到情感危机，你的本能是？", opts: ["冷静帮她盘逻辑分析", "陪她狂痛骂那个人渣", "给她送夜宵带她散心", "建议她直接换下一任"], correct: 0 }
  ]
};

const DEFAULT_QUESTIONS: Question[] = [
  { q: "知识投票：中国领土最东端位于哪里？", opts: ["黑龙江与乌苏里江主航道中心线汇合处", "漠河县北端黑龙江航道", "曾母暗沙", "帕米尔高原"], correct: 0 },
  { q: "防作弊技巧：关于在线投票防作弊，以下哪项最有效？", opts: ["随机更换题目顺序及人脸核身", "限制只能在晚上十点投票", "只给前十名发奖品", "把题目数量设置到100道"], correct: 0 },
  { q: "营销数据：投票平均转化率比普通九宫格领券约合？", opts: ["低50%", "基本持平", "提升30% - 150%不等", "不明确"], correct: 2 }
];

export const VotingAppSimulator: React.FC<VotingAppSimulatorProps> = ({
  templateId,
  title,
  colorBg,
  themeBtn
}) => {
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timer, setTimer] = useState(12);

  const questions = QUIZ_DICTIONARY[templateId] || DEFAULT_QUESTIONS;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart Quiz
  const handleStartQuiz = () => {
    setGameState("playing");
    setCurrentQIdx(0);
    setScore(0);
    setHearts(3);
    setSelectedAns(null);
    setIsAnswering(false);
    setTimer(12);
  };

  // Timer logic for interactive gaming
  useEffect(() => {
    if (gameState !== "playing" || isAnswering) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimer(12);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Time out! Counts as wrong answer
          handleWrongAnswer(-1);
          return 12;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, currentQIdx, isAnswering]);

  const handleWrongAnswer = (idx: number) => {
    setIsAnswering(true);
    setSelectedAns(idx);
    setHearts((prev) => {
      const nextH = prev - 1;
      if (nextH <= 0) {
        setTimeout(() => {
          setGameState("finished");
        }, 1200);
      } else {
        setTimeout(() => {
          nextQuestion();
        }, 1200);
      }
      return nextH;
    });
  };

  const nextQuestion = () => {
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
      setSelectedAns(null);
      setIsAnswering(false);
    } else {
      setGameState("finished");
    }
  };

  const handleOptionClick = (optIdx: number) => {
    if (isAnswering) return;

    const correctIdx = questions[currentQIdx].correct;
    if (optIdx === correctIdx) {
      setIsAnswering(true);
      setSelectedAns(optIdx);
      setScore((prev) => prev + 25);
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else {
      handleWrongAnswer(optIdx);
    }
  };

  const renderHeartIcons = () => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(
        <Heart 
          key={i} 
          className={`w-3.5 h-3.5 transition-all ${
            i < hearts ? "text-rose-500 fill-rose-500 scale-100" : "text-white/30 scale-90"
          }`} 
        />
      );
    }
    return arr;
  };

  return (
    <div id="quiz-mobile-frame-container" className="relative mx-auto my-auto w-[250px] h-[480px] bg-[#1E293B] rounded-[40px] p-2.5 border-[4.5px] border-[#475569] shadow-[0_24px_50px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden">
      {/* Notch Speaker Pill */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-18 h-4 bg-slate-950 rounded-b-xl z-30 flex items-center justify-center">
        <div className="w-8 h-1 bg-[#475569] rounded-full" />
      </div>

      {/* Screen area */}
      <div className={`flex-1 rounded-[30px] overflow-hidden flex flex-col justify-between py-6 px-4 text-center text-white relative bg-gradient-to-b z-10 select-none ${colorBg}`}>
        {/* Sky Mesh grid overlay */}
        <div className="absolute inset-0 bg-[#ffffff0c] pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-20 pointer-events-none"></div>

        {/* Top bar */}
        <div className="flex justify-between items-center text-[9px] font-black text-white/50 px-1 relative z-20">
          <span className="bg-black/25 px-1.5 py-0.5 rounded-md">人人秀投票</span>
          <span className="flex items-center gap-1">
            <span className="sm:inline hidden">信号 🔋</span> 10:30
          </span>
        </div>

        {/* Start Game View */}
        {gameState === "start" && (
          <div className="flex-1 flex flex-col justify-between pt-6 pb-2 relative z-20">
            <div className="space-y-2 my-auto">
              <div className="w-13 h-13 bg-white/15 rounded-3xl flex items-center justify-center mx-auto border border-white/10 text-2.5xl animate-bounce mb-3 shadow-md">
                💡
              </div>
              <span className="text-[10px] text-amber-300 font-extrabold tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                ⚡ 投票挑战赛
              </span>
              <h5 className="text-[15.5px] font-black tracking-tight leading-snug mt-2 text-white max-w-[180px] mx-auto drop-shadow-md">
                {title}
              </h5>
              <p className="text-[9px] text-white/70 max-w-[160px] mx-auto leading-normal font-medium">
                共 {questions.length} 道挑战题，答错3次出局，满分或优胜可获得积分及神秘奖券！
              </p>
            </div>

            <div className="space-y-1.5 mt-auto">
              <button 
                onClick={handleStartQuiz}
                className={`w-full py-2.5 rounded-xl text-white text-[11.5px] font-black tracking-widest flex items-center justify-center gap-1 shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ${themeBtn}`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                立即开始试玩
              </button>
              
              <div className="text-[8px] text-white/40 leading-none">
                已有超过 142k 人在玩此模板
              </div>
            </div>
          </div>
        )}

        {/* Playing Game View */}
        {gameState === "playing" && (
          <div className="flex-1 flex flex-col justify-between pt-4 pb-1 relative z-20 text-left">
            {/* Playing Status Hud */}
            <div className="flex items-center justify-between text-[10px] bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 shrink-0">
              <span className="font-extrabold text-amber-300 flex items-center gap-1 shadow-sm">
                <Clock className="w-3 h-3 animate-spin" />
                {timer}秒
              </span>
              
              <div className="flex gap-0.5 items-center">
                {renderHeartIcons()}
              </div>

              <span className="font-black text-white/90">
                进度: {currentQIdx + 1}/{questions.length}
              </span>
            </div>

            {/* Question Card Box */}
            <div className="my-auto space-y-4 pt-3">
              <div className="bg-white/15 backdrop-blur-lg rounded-2.5xl p-4.5 border border-white/10 shadow-lg">
                <span className="inline-block bg-indigo-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md mb-2">
                  Q{currentQIdx + 1} 单选题
                </span>
                <p className="text-[12.5px] font-black text-white leading-relaxed tracking-tight">
                  {questions[currentQIdx].q}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-1.5 pt-1">
                {questions[currentQIdx].opts.map((opt, oIdx) => {
                  const isCorrect = oIdx === questions[currentQIdx].correct;
                  const isClicked = selectedAns === oIdx;

                  let optBtnClass = "bg-white/10 hover:bg-white/20 border-white/10 text-white/90";
                  let endIcon = null;

                  if (isAnswering) {
                    if (isCorrect) {
                      optBtnClass = "bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/20";
                      endIcon = <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 ml-auto" />;
                    } else if (isClicked) {
                      optBtnClass = "bg-rose-500 border-rose-400 text-white shadow-md shadow-rose-500/20";
                      endIcon = <AlertCircle className="w-3.5 h-3.5 text-white shrink-0 ml-auto" />;
                    } else {
                      optBtnClass = "bg-white/5 border-white/5 text-white/40 pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswering}
                      onClick={() => handleOptionClick(oIdx)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-[11px] font-bold text-left flex items-center gap-2 select-none active:scale-[0.98] transition-all cursor-pointer ${optBtnClass}`}
                    >
                      <span className="w-4.5 h-4.5 rounded-full bg-black/20 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="truncate flex-1 pr-1">{opt}</span>
                      {endIcon}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint bottom text */}
            <div className="text-[8px] text-white/30 text-center select-none pt-1">
              * 试玩中无法提取实物奖赏，请发布后体验
            </div>
          </div>
        )}

        {/* Game Finished Summary View */}
        {gameState === "finished" && (
          <div className="flex-1 flex flex-col justify-between pt-5 pb-1 relative z-20">
            <div className="my-auto space-y-4">
              <div className="w-13 h-13 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-2xl animate-pulse">
                🏆
              </div>

              <div>
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full inline-block">
                  {hearts > 0 ? "🎉 闯关大成功" : "👻 试玩挑战终结"}
                </span>
                
                <h5 className="text-[15.5px] font-black tracking-tight mt-2 text-white">
                  {hearts > 0 ? "恭喜，获得荣誉题神！" : "再接再厉，还需努力哦"}
                </h5>

                <p className="text-[10px] text-white/60 mt-1 font-semibold">
                  您的作答终极评分详情：
                </p>
              </div>

              {/* Simple Stats Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-left space-y-2">
                <div className="flex justify-between items-center text-[11px] font-bold text-white/80">
                  <span>最终得分:</span>
                  <span className="text-amber-400 font-black">{score} 分</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold text-white/80">
                  <span>剩余生命数:</span>
                  <span className="flex gap-0.5">{renderHeartIcons()}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center text-[11px] font-semibold text-white/60 leading-none">
                  <span>解锁福利:</span>
                  <span className="text-emerald-400 font-black text-[11px]">{score >= 50 ? "【10元神券】已解锁" : "未达解锁条件"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 mt-auto">
              <button
                onClick={handleStartQuiz}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 text-[11.5px] font-black tracking-widest flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                重新挑战一次
              </button>
              <div className="text-[8px] text-white/40 leading-none text-center">
                点击上方重置即可继续试玩该游戏模板
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
