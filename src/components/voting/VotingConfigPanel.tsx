import React, { useState } from "react";
import { 
  Settings, Check, Compass, Plus, Trash2, Gift, BarChart3, 
  Sparkles, ShieldCheck, CheckSquare, PlusCircle, Layout, HelpCircle, ArrowUpRight 
} from "lucide-react";
import { cn } from "../../lib/utils";

interface VotingConfigPanelProps {
  templateId: string;
  initialTitle: string;
  onTitleChange: (newTitle: string) => void;
  themeBtn: string;
}

interface QuestionItem {
  q: string;
  opts: string[];
  correct: number;
}

export const VotingConfigPanel: React.FC<VotingConfigPanelProps> = ({
  templateId,
  initialTitle,
  onTitleChange,
  themeBtn
}) => {
  const [activeTab, setActiveTab] = useState<"settings" | "questions" | "prizes" | "dashboard">("settings");
  
  // Tab 1 state settings
  const [localTitle, setLocalTitle] = useState(initialTitle);
  const [desc, setDesc] = useState("内置千万精美题库，支持 AI 一捷配题。拥有多重防刷和审计策略，助力打造高倍率私域流量转换闭环。");
  const [rules, setRules] = useState("1. 每位人每日最多可投票3次。\n2. 答对2道及以上即可获得高级轮盘抽奖资质。\n3. 全程开启人脸AI风控作弊安全预警拦截。");
  const [themeColor, setThemeColor] = useState("indigo");
  const [cheatPrevention, setCheatPrevention] = useState(true);

  // Tab 2 state questions (editable!)
  const [questions, setQuestions] = useState<QuestionItem[]>([
    { q: "企业员工核心条令宣贯中，不违规的红线包括？", opts: ["严守商业机密", "非授权向外透露保密文件", "代签字虚开报销单", "在无关公共群传播公司数据"], correct: 0 },
    { q: "防刷反爬：当系统识别多重异常设备并发请求在线大考，系统会自动？", opts: ["放行并全额补单", "秒级响应拉起验证安全盾或作弊硬封锁", "不记录任何日志", "立即清空所有用户排行榜数据"], correct: 1 }
  ]);
  const [aiKeyword, setAiKeyword] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);

  // Tab 3 state prizes
  const [winProb, setWinProb] = useState(35);
  const [prizeName, setPrizeName] = useState("10元满减大促特权券");
  const [pointThreshold, setPointThreshold] = useState(50);

  const handleTitleBlur = () => {
    onTitleChange(localTitle);
  };

  // AI question auto generator simulation
  const handleAiSpawnQuestion = () => {
    if (!aiKeyword.trim()) {
      alert("请输入关键词，列如：‘垃圾分类安全考试’、‘销售话术内测’ 等");
      return;
    }

    setAiGenerating(true);
    setTimeout(() => {
      const generatedPool: Record<string, QuestionItem> = {
        "垃圾": {
          q: `常说的垃圾分类中，「过期化妆品或指甲油」通常应归入？`,
          opts: ["可回收垃圾", "有害垃圾", "厨余垃圾", "其他干垃圾"],
          correct: 1
        },
        "安全": {
          q: `消防逃生中，当门外通道火光熊红滚烟极大时，正确的防烟举措是？`,
          opts: ["裹湿棉被强行跳楼", "用浸湿的毛巾衣物死死堵塞门角缝隙等待救援", "在卧室大喊大叫跑动", "乘坐最近的自动扶梯下撤"],
          correct: 1
        },
        "销售": {
          q: `在标准销售沟通SPIN模型中，‘I’通常深度代表什么探求？`,
          opts: ["问题（Problem）", "暗示骨牌效应后果（Implication）", "明确需要回报（Need-payoff）", "现状调查（Situation）"],
          correct: 1
        }
      };

      // Match key
      let matched: QuestionItem | null = null;
      for (const k of Object.keys(generatedPool)) {
        if (aiKeyword.includes(k)) {
          matched = generatedPool[k];
          break;
        }
      }

      if (!matched) {
        matched = {
          q: `【${aiKeyword}核心考核】：以下关于该领域的专业常识，哪项表述绝对科学合理？`,
          opts: ["通过本中台 AI 智能配对生成的标准核心考题 A", "基础预备规章条例选项 B", "以答带学随堂精炼多选 C", "该描述错误不值得推荐选项 D"],
          correct: 0
        };
      }

      setQuestions((prev) => [...prev, matched!]);
      setAiGenerating(false);
      setAiKeyword("");
      alert(`✨ AI 已经为您围绕「${aiKeyword}」定制并配齐多项选择单选题！题干、解析及作弊阻断机制均配置就绪，已成功插入试卷末尾。`);
    }, 1800);
  };

  const deleteQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const addEmptyQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        q: "请点击此处编辑您的新题目干？",
        opts: ["新建选项A", "新建选项B", "新建选项C", "新建选项D"],
        correct: 0
      }
    ]);
  };

  const editQuestionText = (qIdx: number, text: string) => {
    setQuestions((prev) => prev.map((item, i) => i === qIdx ? { ...item, q: text } : item));
  };

  const editOptionText = (qIdx: number, optIdx: number, text: string) => {
    setQuestions((prev) => prev.map((item, i) => {
      if (i === qIdx) {
        const nextOpts = [...item.opts];
        nextOpts[optIdx] = text;
        return { ...item, opts: nextOpts };
      }
      return item;
    }));
  };

  const selectCorrectOption = (qIdx: number, optIdx: number) => {
    setQuestions((prev) => prev.map((item, i) => i === qIdx ? { ...item, correct: optIdx } : item));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden text-left">
      {/* 4 Tabs Selector Navigation Header */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 shrink-0 select-none">
        {[
          { id: "settings", label: "基础配置", icon: Settings },
          { id: "questions", label: "题目配置 (AI出题)", icon: Compass },
          { id: "prizes", label: "派奖设置", icon: Gift },
          { id: "dashboard", label: "数据大盘", icon: BarChart3 },
        ].map((tab) => {
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 py-3.5 px-3 flex items-center justify-center gap-1.5 fs-15 font-black border-b-2 tracking-wide transition-all cursor-pointer text-xs sm:text-[13px]",
                isSel 
                  ? "border-indigo-600 text-indigo-700 bg-white" 
                  : "border-transparent text-slate-450 hover:text-slate-700 hover:bg-slate-100/40"
              )}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels Content */}
      <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-5 text-sm">
        
        {/* PANEL A: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">投票活动大标题</label>
              <input 
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleTitleBlur}
                className="w-full bg-slate-50 border border-slate-200/90 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 outline-hidden transition-all text-sm font-semibold text-slate-800"
                placeholder="名称不能为空..."
              />
            </div>

            {/* Campaign description */}
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">分享引流描述介绍 (元描述)</label>
              <textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200/90 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 outline-hidden transition-all text-sm font-semibold text-slate-800 resize-none leading-relaxed"
                placeholder="内置投票游戏分享封面描述..."
              />
            </div>

            {/* Rules Textarea */}
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">活动玩法及作风规则说明</label>
              <textarea
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                rows={3.5}
                className="w-full bg-slate-50 border border-slate-200/90 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 outline-hidden transition-all text-slate-800 text-[12.5px] leading-relaxed resize-none font-mono"
              />
            </div>

            {/* Color selection dropdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">主视觉基调配色</label>
                <select 
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-2.5 text-xs font-semibold outline-hidden cursor-pointer"
                >
                  <option value="indigo">极客靛蓝 (Indigo)</option>
                  <option value="emerald">国潮翡绿 (Emerald)</option>
                  <option value="amber">华丽香槟 (Amber)</option>
                  <option value="rose">倾心玫瑰 (Rose)</option>
                  <option value="slate">科技深灰 (Dark Slate)</option>
                </select>
              </div>

              {/* Secure switch */}
              <div className="space-y-1.5">
                <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">风控等级</label>
                <div 
                  onClick={() => setCheatPrevention(!cheatPrevention)}
                  className="w-full flex items-center justify-between bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-slate-100/50 transition-colors"
                >
                  <span className="text-[11px] font-black text-slate-700 select-none">AI 防刷作弊拦截</span>
                  <div className={cn(
                    "w-9 h-5 rounded-full p-0.5 transition-colors duration-200",
                    cheatPrevention ? "bg-[#10B981]" : "bg-slate-300"
                  )}>
                    <div className={cn(
                      "w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform duration-200",
                      cheatPrevention ? "translate-x-4" : "translate-x-0"
                    )} />
                  </div>
                </div>
              </div>
            </div>

            {/* System Info alert box */}
            <div className="rounded-2xl border border-[#3B82F6]/10 bg-[#3B82F6]/5 p-4 flex items-start gap-3 text-[12.5px] leading-relaxed text-blue-800">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-extrabold block text-blue-900">安全合规技术支撑</span>
                <p className="text-blue-950/70 font-medium">
                  该投票内置多级风控反刷，可深度审计微信环境或外部浏览器非法注入作答。一键绑定企业专属中台。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PANEL B: QUESTIONS (AI GENERATOR FORM!) */}
        {activeTab === "questions" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Elegant AI generator capsule block */}
            <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E2E8F0] border border-indigo-100 rounded-2.5xl p-4.5 space-y-3 shadow-xs">
              <div className="flex items-center gap-1.5 text-indigo-800">
                <Sparkles className="w-4 h-4 text-indigo-600 fill-indigo-400/30 animate-pulse" />
                <span className="text-xs font-black tracking-wider uppercase">AI 智能一键配题助手</span>
              </div>
              <p className="text-[11.5px] text-indigo-950/70 leading-normal font-semibold">
                缺乏合适题库？输入主题，AI 10秒内为您配齐合规多选或者单选题目！
              </p>
              
              <div className="flex gap-2 text-xs">
                <input 
                  type="text"
                  value={aiKeyword}
                  onChange={(e) => setAiKeyword(e.target.value)}
                  placeholder="如：‘垃圾分类安全’、‘公司企业文化’、‘高考百科’"
                  className="flex-1 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs font-semibold outline-hidden placeholder:text-slate-400"
                  disabled={aiGenerating}
                />
                <button
                  onClick={handleAiSpawnQuestion}
                  disabled={aiGenerating}
                  className={cn(
                    "px-4 rounded-xl text-white font-black flex items-center gap-1 cursor-pointer transition-all active:scale-95 text-xs h-9",
                    aiGenerating ? "bg-slate-400 cursor-not-allowed" : themeBtn
                  )}
                >
                  {aiGenerating ? "AI 组卷中..." : "一键出题"}
                </button>
              </div>
            </div>

            {/* List header list */}
            <div className="flex items-center justify-between pt-1 select-none">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                试卷包含题目数 (<span className="text-indigo-600">{questions.length}</span>)
              </span>
              <button 
                onClick={addEmptyQuestion}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-extrabold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                手动追加题目
              </button>
            </div>

            {/* Editable Questions Listing */}
            <div className="space-y-4">
              {questions.map((qItem, qIdx) => (
                <div key={qIdx} className="bg-slate-50/75 border border-slate-150 rounded-2.5xl p-4.5 space-y-3 relative group">
                  {/* Floating delete button */}
                  <button 
                    onClick={() => deleteQuestion(qIdx)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-100 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    title="删除题目"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-start gap-2 pr-6 text-xs font-black">
                    <span className="w-6 h-6 rounded-full bg-slate-200/80 border border-slate-300/40 text-[10.5px] font-black text-slate-700 flex items-center justify-center shrink-0">
                      Q{qIdx + 1}
                    </span>
                    <input 
                      type="text"
                      value={qItem.q}
                      onChange={(e) => editQuestionText(qIdx, e.target.value)}
                      className="flex-1 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:bg-white px-1 py-0.5 outline-none font-bold text-slate-800 select-all"
                    />
                  </div>

                  {/* Options row */}
                  <div className="space-y-1.5 pl-8">
                    {qItem.opts.map((optText, optIdx) => {
                      const isCorrect = qItem.correct === optIdx;
                      return (
                        <div key={optIdx} className="flex items-center gap-2">
                          {/* Correct marker check */}
                          <button 
                            onClick={() => selectCorrectOption(qIdx, optIdx)}
                            className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center border transition-all cursor-pointer shrink-0 text-[9px] font-bold",
                              isCorrect 
                                ? "bg-emerald-500 border-emerald-500 text-white shadow-xs" 
                                : "bg-white hover:bg-slate-50 border-slate-200 text-slate-400"
                            )}
                            title={isCorrect ? "当前为正确答案" : "设为正确答案"}
                          >
                            {isCorrect ? <Check className="w-3 h-3" /> : String.fromCharCode(65 + optIdx)}
                          </button>

                          <input 
                            type="text"
                            value={optText}
                            onChange={(e) => editOptionText(qIdx, optIdx, e.target.value)}
                            className="flex-1 bg-white border border-slate-200/80 focus:border-indigo-500 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL C: PRIZES */}
        {activeTab === "prizes" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Probability slider wrapper */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">
                <span>综合派奖中奖概率</span>
                <span className="text-indigo-600 font-black">{winProb}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={winProb}
                onChange={(e) => setWinProb(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[11px] text-slate-400 leading-normal font-bold">建议设置在 15% - 40% 之间，以保证玩家投票的热度与裂变动力。</p>
            </div>

            {/* Price Name option */}
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">奖品定制名称</label>
              <input 
                type="text"
                value={prizeName}
                onChange={(e) => setPrizeName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 outline-hidden transition-all text-sm font-semibold text-slate-850"
              />
            </div>

            {/* Threshold Score */}
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">优胜派发及起跑资质阀值分数</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  min="0"
                  max="100"
                  value={pointThreshold}
                  onChange={(e) => setPointThreshold(Number(e.target.value))}
                  className="w-24 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl px-3 py-2 text-center text-sm font-black text-slate-800"
                />
                <span className="text-xs text-slate-500 font-bold">达标玩家自动接入并派发抽奖礼券</span>
              </div>
            </div>

            {/* Quick Coupon type picker */}
            <div className="space-y-2">
              <label className="text-[12.5px] font-black text-slate-500 block uppercase tracking-wider">奖项发放载体形式</label>
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { name: "人人秀微信红包", desc: "商户自动分发，到账微信零钱" },
                  { name: "商户实物抵口券", desc: "电子核销，支持核销员一键扫码" },
                  { name: "第三方游戏KEY池", desc: "支持卡密Excel批量导入" },
                  { name: "会员中台积分/金币", desc: "零门槛打通API发放自研积分" },
                ].map((item, idx) => (
                  <div key={idx} className={cn(
                    "p-3 rounded-xl border relative cursor-pointer text-left transition-all hover:border-slate-350 select-none",
                    idx === 1 
                      ? "bg-indigo-50/50 border-indigo-200" 
                      : "bg-white border-slate-200"
                  )}>
                    <h5 className="text-[12px] font-extrabold text-slate-800">{item.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium leading-normal mt-1">{item.desc}</p>
                    {idx === 1 && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL D: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-5 animate-in fade-in duration-200 text-left">
            {/* Quick Metrics Cards and UV Funnel */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: "累计投票UV", num: "12,854", diff: "+15.2%", isUp: true },
                { title: "游戏完答率", num: "92.4%", diff: "+4.1%", isUp: true },
                { title: "奖券核销量", num: "1,541", diff: "+28.5%", isUp: true },
              ].map((m, idx) => (
                <div key={idx} className="bg-slate-50/75 border border-slate-150 rounded-2xl p-3 shadow-2xs">
                  <span className="text-[9.5px] font-bold text-slate-400 block tracking-wide">{m.title}</span>
                  <strong className="text-slate-800 text-[16px] font-black block mt-1.5 leading-none">{m.num}</strong>
                  <span className={cn(
                    "text-[9px] font-black inline-block mt-1.5",
                    m.isUp ? "text-rose-500" : "text-[#10B981]"
                  )}>
                    {m.diff}
                  </span>
                </div>
              ))}
            </div>

            {/* Funnel chart visual with SVG */}
            <div className="bg-white border border-slate-150 rounded-2xl p-4.5 space-y-3 shadow-xs">
              <div className="flex justify-between items-center text-xs font-black select-none text-slate-450 block uppercase tracking-widest leading-none">
                <span>转化漏斗可视化分析 (Funnel)</span>
                <span className="text-indigo-600 font-extrabold flex items-center gap-0.5">
                  综合转化录: 42.5% <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>

              {/* Progress visual loops */}
              <div className="space-y-3.5 pt-1.5">
                {[
                  { name: "1. 触达点击活动 (Total UV)", pct: 100, label: "25,482 (100%)", color: "bg-blue-600" },
                  { name: "2. 发起作答按钮 (Start Click)", pct: 81, label: "20,640 (81.0%)", color: "bg-indigo-600" },
                  { name: "3. 累计通关完答 (Completed)", pct: 75, label: "15,480 (75.0%)", color: "bg-purple-600" },
                  { name: "4. 点击分享/留存 (Conversions)", pct: 42.5, label: "8,751 (42.5%)", color: "bg-rose-500" },
                ].map((f, fIdx) => (
                  <div key={fIdx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-700 leading-none">
                      <span>{f.name}</span>
                      <span className="text-slate-500 shrink-0 font-extrabold">{f.label}</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-1000", f.color)} style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export and data options */}
            <div className="pt-2 flex gap-2">
              <button 
                onClick={() => alert("正在筹备并打包您的『投票流失行为漏斗』Excel精简包，包含高精度作弊轨迹审计...")}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-[11.5px] font-extrabold tracking-wide text-center text-slate-600 cursor-pointer active:scale-95 transition-transform"
              >
                下载作答Excel大底包
              </button>
              <button 
                onClick={() => alert("配置数据保存成功！配置将自动全量同步至各端嵌入代码。")}
                className={cn("flex-1 py-2.5 rounded-xl text-white text-[11.5px] font-black tracking-wide cursor-pointer flex items-center justify-center gap-1 active:scale-95 transition-transform shadow-xs", themeBtn)}
              >
                一键保存更改
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
