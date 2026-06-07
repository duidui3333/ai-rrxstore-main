import { 
  Brain, Calendar, Trophy, Users, Video, Sparkles, 
  GraduationCap, FileText, Book, Award, LayoutTemplate 
} from "lucide-react";

export interface TemplateType {
  id: string;
  title: string;
  type: string;
  style: string;
  scene: string;
  hot: number;
  time: string;
  colorBg: string;
  tagText: string;
  hasPrize: boolean;
  percentage: number;
  stats: { conversions: string; participants: string; difficulty: string };
  chartData: number[];
}

export const CATEGORY_CONFIGS: Record<string, {
  bannerTitle: string;
  bannerDesc: string;
  subPlaystyles: string[];
  bannerColor: string;
}> = {
  "知识投票": {
    bannerTitle: "知识投票专区",
    bannerDesc: "脑力狂欢，科学知识、社情民意、行业规章大比拼！支持秒级响应题目生成与投票等级证书荣誉颁发限制。",
    subPlaystyles: ["全部", "百科问答", "科普知识", "文史常识", "智力开发", "生活常识"],
    bannerColor: "from-blue-500/10 to-indigo-500/10 border-blue-100 text-blue-900"
  },
  "照片投票": {
    bannerTitle: "照片投票专区",
    bannerDesc: "评选风采，长期培养用户习惯！融合积分、金币及签到奖励，深度唤醒沉睡粉丝促活留存。",
    subPlaystyles: ["全部", "评选风采", "签到赢奖", "单词打卡", "趣味问答", "理财早班车"],
    bannerColor: "from-amber-500/10 to-yellow-600/10 border-yellow-100 text-amber-900"
  },
  "闯关投票": {
    bannerTitle: "闯关投票专区",
    bannerDesc: "成就攀升，通关大闯关！极具仪式感的递进关卡，内置游戏化音效，极大提升答完率与留存周期。",
    subPlaystyles: ["全部", "安全闯关", "传统古语", "成语高手", "常识大赛", "极速升级"],
    bannerColor: "from-purple-500/10 to-fuchsia-600/10 border-fuchsia-100 text-fuchsia-900"
  },
  "PK投票": {
    bannerTitle: "PK投票专区",
    bannerDesc: "热血智斗，匹配PK比脑力！实时段位排名或者双人好友局，裂变速度快，互动极其频繁。",
    subPlaystyles: ["全部", "王者对决", "排位挑战", "默契测试", "群英激斗", "情侣测试"],
    bannerColor: "from-rose-500/10 to-pink-650/10 border-pink-100 text-pink-900"
  },
  "视频投票": {
    bannerTitle: "视频投票专区",
    bannerDesc: "视听联动，情景模拟沉浸式演练！突破传统纯文字限制，寓教于乐，极大提升安全教育和品牌营销效果。",
    subPlaystyles: ["全部", "看片投票", "情景还原", "安全教学", "名场面还原", "视听演练"],
    bannerColor: "from-violet-500/10 to-indigo-500/10 border-indigo-100 text-indigo-900"
  },
  "趣味投票": {
    bannerTitle: "趣味投票专区",
    bannerDesc: "测一测你最契合哪种超级身份？朋友圈现象级裂变源泉，轻松捕获千万级传播曝光和裂变引流。",
    subPlaystyles: ["全部", "性格测试", "命运罗盘", "星座运势", "神仙体质", "穿越时空"],
    bannerColor: "from-emerald-500/10 to-teal-500/10 border-teal-100 text-teal-900"
  },
  "学习投票": {
    bannerTitle: "学习投票专区",
    bannerDesc: "学练一体，以答带学！包含新员工培训、新政策宣贯等商务场景，提供详细解析机制，轻量化学习神器。",
    subPlaystyles: ["全部", "入职通关", "核心条令", "常识提分", "英语精炼", "行测特训"],
    bannerColor: "from-cyan-500/10 to-blue-600/10 border-blue-100 text-blue-900"
  },
  "练习": {
    bannerTitle: "练习训练专区",
    bannerDesc: "错题精炼，智能批改，支持自主刷题！可关联个人云错题本，模拟实际场景进行投票演练。",
    subPlaystyles: ["全部", "驾校考试", "常识训练", "周练测试", "模拟真题", "专项提分"],
    bannerColor: "from-slate-500/10 to-slate-700/10 border-slate-100 text-slate-900"
  },
  "考试": {
    bannerTitle: "正规大考专区",
    bannerDesc: "高规格在线考试，人脸认证及防作弊机制，严格限时交卷！支持生成官方电子认证证书体系。",
    subPlaystyles: ["全部", "卓越员工", "消防大考", "知识竞赛", "安全生产", "年度大考"],
    bannerColor: "from-red-500/10 to-red-650/10 border-red-100 text-red-900"
  },
  "课程": {
    bannerTitle: "课程投票专区",
    bannerDesc: "微课精讲视频配合课后选择题！完整课时管理，助力知识体系沉淀、全员综合素质系统性跃迁。",
    subPlaystyles: ["全部", "小白进阶", "编程实战", "AI核心课", "新媒体运营", "技能认证"],
    bannerColor: "from-pink-500/10 to-rose-500/10 border-rose-100 text-rose-800"
  },
  "语音投票": {
    bannerTitle: "语音音频投票专区",
    bannerDesc: "用声音传递情感，好声音、朗诵朗读、外声/配音大比拼！支持高保真高音试听与观众快捷多路投票打赏。",
    subPlaystyles: ["全部", "唱作之星", "配音大赛", "经典朗读", "有声读信"],
    bannerColor: "from-purple-500/10 to-fuchsia-600/10 border-fuchsia-100 text-fuchsia-900"
  }
};

export const VOTING_CATEGORIES = [
  { id: "全部", name: "精选推荐", icon: LayoutTemplate, count: 85, desc: "爆款投票玩法推荐", bg: "from-blue-50/90 to-white", color: "text-blue-700", subColor: "text-blue-500/85", activeBg: "bg-blue-600", activeTextColor: "text-white", activeSubColor: "text-blue-100", fillColor: "#2563eb" },
  { id: "照片投票", name: "照片投票", icon: Brain, count: 42, desc: "照片展示秀", bg: "from-blue-50/80 to-white", color: "text-sky-700", subColor: "text-sky-500/85", activeBg: "bg-sky-600", activeTextColor: "text-white", activeSubColor: "text-sky-100", fillColor: "#0284c7" },
  { id: "视频投票", name: "视频投票", icon: Video, count: 28, desc: "短片段多媒体盛宴", bg: "from-amber-50/90 to-white", color: "text-amber-700", subColor: "text-amber-500/85", activeBg: "bg-amber-600", activeTextColor: "text-white", activeSubColor: "text-amber-100", fillColor: "#d97706" },
  { id: "语音投票", name: "语音投票", icon: Trophy, count: 36, desc: "好声音大赏", bg: "from-purple-50/90 to-white", color: "text-purple-700", subColor: "text-purple-500/85", activeBg: "bg-purple-600", activeTextColor: "text-white", activeSubColor: "text-purple-100", fillColor: "#9333ea" }
];

export const TEMPLATES_DATA: TemplateType[] = [
  {
    id: "q1",
    title: "最美校园风光摄影大赛",
    type: "照片投票",
    style: "国潮",
    scene: "活动评选",
    hot: 42100,
    time: "2026-05-18",
    colorBg: "from-[#111827] via-[#1E1B4B] to-[#311042]",
    tagText: "记录美好 定格瞬间",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "6.9%", participants: "154k", difficulty: "★★★" },
    chartData: [40, 55, 75, 90, 98]
  },
  {
    id: "q2",
    title: "年度优秀员工评选投票",
    type: "照片投票",
    style: "简约",
    scene: "评选风采",
    hot: 32050,
    time: "2026-05-10",
    colorBg: "from-[#450A0A] via-[#7F1D1D] to-[#991B1B]",
    tagText: "致敬榜样 见证力量",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "5.4%", participants: "108k", difficulty: "★☆☆" },
    chartData: [30, 50, 65, 80, 94]
  },
  {
    id: "q3",
    title: "才艺之星短视频展播季",
    type: "视频投票",
    style: "商务",
    scene: "企业级",
    hot: 28900,
    time: "2026-05-20",
    colorBg: "from-[#022C22] via-[#064E3B] to-[#047857]",
    tagText: "记录才华 展现风采",
    hasPrize: false,
    percentage: 92,
    stats: { conversions: "4.8%", participants: "89k", difficulty: "★★☆" },
    chartData: [40, 60, 75, 85, 92]
  },
  {
    id: "q4",
    title: "王者投票热血排位赛",
    type: "语音投票",
    style: "卡通",
    scene: "活动评选",
    hot: 49400,
    time: "2026-05-22",
    colorBg: "from-[#0F172A] via-[#1E3A8A] to-[#1D4ED8]",
    tagText: "实时PK 智胜群雄",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "8.1%", participants: "210k", difficulty: "★★★" },
    chartData: [50, 70, 85, 95, 99]
  },
  {
    id: "q5",
    title: "安全出行规范视频投票",
    type: "视频投票",
    style: "可爱",
    scene: "附带解析",
    hot: 18400,
    time: "2026-05-02",
    colorBg: "from-[#111827] via-[#5C21B6] to-[#7C3AED]",
    tagText: "情境演练 视听联动",
    hasPrize: true,
    percentage: 86,
    stats: { conversions: "3.7%", participants: "45k", difficulty: "★★☆" },
    chartData: [35, 45, 60, 75, 86]
  },
  {
    id: "q6",
    title: "你的神仙体质趣味测评",
    type: "照片投票",
    style: "国潮",
    scene: "活动评选",
    hot: 55200,
    time: "2026-05-25",
    colorBg: "from-[#0F172A] via-[#581C87] to-[#7E22CE]",
    tagText: "爆款刷屏 梦境测试",
    hasPrize: false,
    percentage: 97,
    stats: { conversions: "9.2%", participants: "340k", difficulty: "★☆☆" },
    chartData: [60, 75, 85, 94, 97]
  },
  {
    id: "q7",
    title: "入职培训团建风采通关",
    type: "视频投票",
    style: "商务",
    scene: "企业级",
    hot: 21500,
    time: "2026-04-18",
    colorBg: "from-[#0F172A] via-[#334155] to-[#475569]",
    tagText: "以学带答 快速融入",
    hasPrize: false,
    percentage: 89,
    stats: { conversions: "4.1%", participants: "59k", difficulty: "★☆☆" },
    chartData: [30, 45, 60, 78, 89]
  },
  {
    id: "q8",
    title: "行测常识高频考点训练",
    type: "语音投票",
    style: "简约",
    scene: "附带解析",
    hot: 23400,
    time: "2026-05-15",
    colorBg: "from-[#020617] via-[#0F172A] to-[#1E3A8A]",
    tagText: "错题精练 深度点拨",
    hasPrize: false,
    percentage: 91,
    stats: { conversions: "5.1%", participants: "92k", difficulty: "★★☆" },
    chartData: [45, 60, 70, 85, 91]
  },
  {
    id: "q9",
    title: "员工行为章程合规半年度大考",
    type: "照片投票",
    style: "商务",
    scene: "防作弊",
    hot: 15600,
    time: "2026-05-01",
    colorBg: "from-[#1E3A8A] via-[#0D9488] to-[#115E59]",
    tagText: "人脸实名 规避舞弊",
    hasPrize: true,
    percentage: 84,
    stats: { conversions: "3.2%", participants: "31k", difficulty: "★★★" },
    chartData: [20, 40, 55, 75, 84]
  },
  {
    id: "q10",
    title: "Python核心数据结构与AI实战",
    type: "语音投票",
    style: "科技",
    scene: "荣誉证书",
    hot: 27500,
    time: "2026-05-12",
    colorBg: "from-[#064E3B] via-[#047857] to-[#0D9488]",
    tagText: "边学边练 一键结课",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "5.9%", participants: "78k", difficulty: "★★★" },
    chartData: [40, 55, 75, 88, 95]
  },
  {
    id: "q11",
    title: "消防安全规范全国大测试",
    type: "照片投票",
    style: "简约",
    scene: "荣誉证书",
    hot: 31200,
    time: "2026-05-14",
    colorBg: "from-[#7F1D1D] via-[#B91C1C] to-[#ea580c]",
    tagText: "官方权威 投票认证",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "6.3%", participants: "128k", difficulty: "★★☆" },
    chartData: [40, 60, 78, 88, 96]
  },
  {
    id: "q12",
    title: "新媒体卓越运营精讲微课",
    type: "语音投票",
    style: "简约",
    scene: "企业级",
    hot: 19800,
    time: "2026-04-25",
    colorBg: "from-[#0F172A] via-[#1E1B4B] to-[#4F46E5]",
    tagText: "知识大课堂 随堂测验",
    hasPrize: false,
    percentage: 88,
    stats: { conversions: "4.2%", participants: "64k", difficulty: "★☆☆" },
    chartData: [25, 45, 60, 75, 88]
  },
  {
    id: "q13",
    title: "年度最佳萌娃萌宠照片大赛",
    type: "照片投票",
    style: "卡通",
    scene: "活动评选",
    hot: 62450,
    time: "2026-05-23",
    colorBg: "from-[#FDF2F8] via-[#FCE7F3] to-[#F472B6]",
    tagText: "晒出你的可爱瞬间",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "10.2%", participants: "310k", difficulty: "★☆☆" },
    chartData: [35, 60, 80, 95, 99]
  },
  {
    id: "q14",
    title: "寻找最美抗疫志愿者摄影作品",
    type: "照片投票",
    style: "简约",
    scene: "评选风采",
    hot: 37800,
    time: "2026-05-19",
    colorBg: "from-[#F0FDFA] via-[#CCFBF1] to-[#14B8A6]",
    tagText: "致敬逆行者 传递大爱",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "6.1%", participants: "95k", difficulty: "★★☆" },
    chartData: [25, 50, 75, 88, 93]
  },
  {
    id: "q15",
    title: "员工创意家庭晚餐照片投票",
    type: "照片投票",
    style: "可爱",
    scene: "活动评选",
    hot: 28400,
    time: "2026-05-18",
    colorBg: "from-[#FFFBEB] via-[#FEF3C7] to-[#F59E0B]",
    tagText: "晒出幸福 舌尖留香",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.8%", participants: "52k", difficulty: "★☆☆" },
    chartData: [40, 55, 78, 85, 91]
  },
  {
    id: "q16",
    title: "少儿绘画大赛获奖照片风采展示",
    type: "照片投票",
    style: "国潮",
    scene: "荣誉证书",
    hot: 45600,
    time: "2026-05-24",
    colorBg: "from-[#FAF5FF] via-[#F3E8FF] to-[#A855F7]",
    tagText: "放飞梦想 自由涂鸦",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "8.7%", participants: "180k", difficulty: "★★☆" },
    chartData: [35, 60, 80, 92, 98]
  },
  {
    id: "q17",
    title: "青年健美先生风采照片大评比",
    type: "照片投票",
    style: "商务",
    scene: "活动评选",
    hot: 31200,
    time: "2026-05-21",
    colorBg: "from-[#EFF6FF] via-[#DBEAFE] to-[#3B82F6]",
    tagText: "力量与美 展现自我",
    hasPrize: false,
    percentage: 92,
    stats: { conversions: "4.9%", participants: "74k", difficulty: "★★☆" },
    chartData: [30, 45, 65, 82, 92]
  },
  {
    id: "q18",
    title: "元宵佳节花灯大赛照片线上评选",
    type: "照片投票",
    style: "国潮",
    scene: "活动评选",
    hot: 39500,
    time: "2026-05-15",
    colorBg: "from-[#FEF2F2] via-[#FEE2E2] to-[#EF4444]",
    tagText: "天涯共此时 华灯初上",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "7.1%", participants: "115k", difficulty: "★☆☆" },
    chartData: [45, 60, 78, 89, 96]
  },
  {
    id: "q19",
    title: "企业年度演讲比赛视频展示投票",
    type: "视频投票",
    style: "商务",
    scene: "企业级",
    hot: 29800,
    time: "2026-05-17",
    colorBg: "from-[#111827] via-[#1E293B] to-[#475569]",
    tagText: "激扬风采 汇聚智慧",
    hasPrize: true,
    percentage: 94,
    stats: { conversions: "5.5%", participants: "82k", difficulty: "★★☆" },
    chartData: [30, 50, 72, 85, 94]
  },
  {
    id: "q20",
    title: "高校毕业季创意温情短视频征集",
    type: "视频投票",
    style: "青春",
    scene: "活动评选",
    hot: 43200,
    time: "2026-05-25",
    colorBg: "from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF]",
    tagText: "留住青春 不负昭华",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "8.1%", participants: "160k", difficulty: "★☆☆" },
    chartData: [40, 60, 78, 90, 98]
  },
  {
    id: "q21",
    title: "萌宠搞笑瞬间情景短视频投票赛",
    type: "视频投票",
    style: "可爱",
    scene: "活动评选",
    hot: 51200,
    time: "2026-05-26",
    colorBg: "from-[#ECFDF5] via-[#D1FAE5] to-[#10B981]",
    tagText: "宠物逗趣 治愈瞬间",
    hasPrize: false,
    percentage: 97,
    stats: { conversions: "9.5%", participants: "220k", difficulty: "★☆☆" },
    chartData: [50, 70, 85, 93, 97]
  },
  {
    id: "q22",
    title: "职业技能操作标准示范视频大赛",
    type: "视频投票",
    style: "商务",
    scene: "企业级",
    hot: 19500,
    time: "2026-05-11",
    colorBg: "from-[#F8FAFC] via-[#F1F5F9] to-[#64748B]",
    tagText: "精益求精 匠心传承",
    hasPrize: true,
    percentage: 86,
    stats: { conversions: "3.5%", participants: "38k", difficulty: "★★★" },
    chartData: [20, 40, 60, 75, 86]
  },
  {
    id: "q23",
    title: "少儿英文诗歌朗诵微视频线上评选",
    type: "视频投票",
    style: "卡通",
    scene: "荣誉证书",
    hot: 39800,
    time: "2026-05-24",
    colorBg: "from-[#FDF4FF] via-[#FAE8FF] to-[#D946EF]",
    tagText: "童言无忌 响亮世界",
    hasPrize: true,
    percentage: 95,
    stats: { conversions: "7.2%", participants: "131k", difficulty: "★★☆" },
    chartData: [35, 55, 78, 88, 95]
  },
  {
    id: "q24",
    title: "安全出行公益宣传剧视频线上投票",
    type: "视频投票",
    style: "简约",
    scene: "活动评选",
    hot: 24700,
    time: "2026-05-14",
    colorBg: "from-[#FFF7ED] via-[#FFEDD5] to-[#F97316]",
    tagText: "守法出行 平安回家",
    hasPrize: false,
    percentage: 90,
    stats: { conversions: "4.8%", participants: "62k", difficulty: "★☆☆" },
    chartData: [30, 45, 68, 82, 90]
  },
  {
    id: "q25",
    title: "厨艺大师创意烹饪秀短视频大赛",
    type: "视频投票",
    style: "国潮",
    scene: "活动评选",
    hot: 34100,
    time: "2026-05-22",
    colorBg: "from-[#FEF3C7] via-[#FDE68A] to-[#D97706]",
    tagText: "百味人生 实至名归",
    hasPrize: true,
    percentage: 93,
    stats: { conversions: "6.2%", participants: "89k", difficulty: "★☆☆" },
    chartData: [40, 58, 75, 86, 93]
  },
  {
    id: "q26",
    title: "太极武术风采演练短视频线上选拔",
    type: "视频投票",
    style: "国潮",
    scene: "活动评选",
    hot: 28900,
    time: "2026-05-16",
    colorBg: "from-[#ECE9E6] to-[#FFFFFF]",
    tagText: "刚柔并济 弘扬国粹",
    hasPrize: true,
    percentage: 91,
    stats: { conversions: "5.1%", participants: "74k", difficulty: "★★☆" },
    chartData: [25, 48, 70, 85, 91]
  },
  {
    id: "q27",
    title: "中国好声音年度方言歌谣配音赛",
    type: "语音投票",
    style: "国潮",
    scene: "活动评选",
    hot: 48900,
    time: "2026-05-24",
    colorBg: "from-[#111827] via-[#311042] to-[#4F46E5]",
    tagText: "方言回响 乡情真挚",
    hasPrize: true,
    percentage: 98,
    stats: { conversions: "8.4%", participants: "192k", difficulty: "★★★" },
    chartData: [40, 60, 80, 92, 98]
  },
  {
    id: "q28",
    title: "电台主播年度十佳新声极速海选",
    type: "语音投票",
    style: "商务",
    scene: "活动评选",
    hot: 31500,
    time: "2026-05-20",
    colorBg: "from-[#0F172A] via-[#1E293B] to-[#3B82F6]",
    tagText: "音为你 越声无界",
    hasPrize: true,
    percentage: 92,
    stats: { conversions: "5.2%", participants: "81k", difficulty: "★★☆" },
    chartData: [35, 52, 70, 84, 92]
  },
  {
    id: "q29",
    title: "最美读书声经典名著朗读网络评选",
    type: "语音投票",
    style: "简约",
    scene: "活动评选",
    hot: 36200,
    time: "2026-05-22",
    colorBg: "from-[#022C22] via-[#0D9488] to-[#047857]",
    tagText: "书声琅琅 墨香悠长",
    hasPrize: false,
    percentage: 94,
    stats: { conversions: "6.0%", participants: "105k", difficulty: "★☆☆" },
    chartData: [30, 55, 75, 88, 94]
  },
  {
    id: "q30",
    title: "青少年英语配音大赛人气线上竞逐",
    type: "语音投票",
    style: "卡通",
    scene: "荣誉证书",
    hot: 42300,
    time: "2026-05-26",
    colorBg: "from-[#FFF5F5] via-[#FED7D7] to-[#FEB2B2]",
    tagText: "纯正口音 妙趣配音",
    hasPrize: true,
    percentage: 97,
    stats: { conversions: "7.9%", participants: "142k", difficulty: "★★☆" },
    chartData: [40, 62, 81, 93, 97]
  },
  {
    id: "q31",
    title: "企业客服话术金牌配音大激战",
    type: "语音投票",
    style: "商务",
    scene: "企业级",
    hot: 21550,
    time: "2026-05-13",
    colorBg: "from-[#F8FAFC] via-[#E2E8F0] to-[#94A3B8]",
    tagText: "温情沟通 卓越服务",
    hasPrize: true,
    percentage: 86,
    stats: { conversions: "3.9%", participants: "49k", difficulty: "★★★" },
    chartData: [25, 45, 62, 78, 86]
  },
  {
    id: "q32",
    title: "母亲节感恩温情有声读信大集赞",
    type: "语音投票",
    style: "可爱",
    scene: "活动评选",
    hot: 49800,
    time: "2026-05-10",
    colorBg: "from-[#FFF1F2] via-[#FFE4E6] to-[#FDA4AF]",
    tagText: "让爱发声 听见感动",
    hasPrize: true,
    percentage: 99,
    stats: { conversions: "9.8%", participants: "235k", difficulty: "★☆☆" },
    chartData: [45, 65, 83, 95, 99]
  },
  {
    id: "q33",
    title: "原创网络歌曲人气唱作之星海选",
    type: "语音投票",
    style: "青春",
    scene: "活动评选",
    hot: 45100,
    time: "2026-05-27",
    colorBg: "from-[#EEF2F6] via-[#E2E8F0] to-[#6366F1]",
    tagText: "旋律跃动 梦想起航",
    hasPrize: true,
    percentage: 96,
    stats: { conversions: "8.5%", participants: "172k", difficulty: "★★★" },
    chartData: [35, 58, 78, 90, 96]
  },
  {
    id: "q34",
    title: "传统非遗古诗词吟唱大赛评选战",
    type: "语音投票",
    style: "国潮",
    scene: "荣誉证书",
    hot: 38200,
    time: "2026-05-19",
    colorBg: "from-[#FAF7F2] to-[#E6DFD3]",
    tagText: "古韵长流 声声不息",
    hasPrize: false,
    percentage: 93,
    stats: { conversions: "5.7%", participants: "91k", difficulty: "★★☆" },
    chartData: [30, 52, 72, 87, 93]
  }
];

export const CALENDAR_NODES = [
  {
    id: "exam_p1",
    month: "6月",
    day: "07",
    title: "高考百科大冲关",
    gameName: "高考百科大PK",
    tag: "考前热点 🎯",
    bgClass: "from-rose-50/90 to-white hover:to-rose-50/20 border-pink-100/80 hover:border-pink-300 hover:shadow-[0_12px_24px_rgba(244,63,94,0.12)]",
    textClass: "text-pink-600 bg-pink-100/70",
    headerBg: "bg-gradient-to-r from-pink-500 to-rose-500",
    btnClass: "bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-100 hover:shadow-pink-300/50",
    gameId: "q1",
    decor: "🎓📝",
    hotPill: "🔥 转化：+98%",
    status: "大促热推中"
  },
  {
    id: "exam_p2",
    month: "6月",
    day: "15",
    title: "全国安全生产月大考",
    gameName: "企业安全规章大闯关",
    tag: "合规内训 🛡️",
    bgClass: "from-emerald-50/90 to-white hover:to-emerald-50/20 border-emerald-100/80 hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(16,185,129,0.12)]",
    textClass: "text-emerald-700 bg-emerald-100/70",
    headerBg: "bg-gradient-to-r from-emerald-600 to-teal-600",
    btnClass: "bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100 hover:shadow-emerald-300/50",
    gameId: "q3",
    decor: "🛡️🚨",
    hotPill: "🔥 热度：★★★★★",
    status: "行业高标杆"
  },
  {
    id: "exam_p3",
    month: "7-8月",
    day: "暑",
    title: "暑期趣味心理评测",
    gameName: "神仙体质趣味测评",
    tag: "夏日趣味 ✨",
    bgClass: "from-amber-50/90 to-white hover:to-amber-50/20 border-amber-100/80 hover:border-amber-300 hover:shadow-[0_12px_24px_rgba(245,158,11,0.12)]",
    textClass: "text-amber-700 bg-amber-100/70",
    headerBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    btnClass: "bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-100 hover:shadow-amber-300/50",
    gameId: "q6",
    decor: "🔮🏄",
    hotPill: "🔥 裂变：+150%",
    status: "热推风向标"
  }
];

export const PLACEHOLDER_PHRASES = [
  "搜索 毕业生高考百科知识大PK",
  "搜索 企业安全生产趣味突击大闯关",
  "搜索 每日英语词汇签到打卡挑战",
  "搜索 趣味性格以及命运体质测评",
  "搜索 新员工入职合规宣贯考试系统",
  "搜索 绿色低碳环保与垃圾分类普及积分赛",
  "搜索 2026年消防与高层防震避险自救评估",
  "搜索 端午屈原传统文化与养生民俗竞答",
  "搜索 全员网络安全与个人防诈骗攻防PK",
  "搜索 职场高情商沟通与谈判技巧极速评测"
];

export const HOT_SEARCHES = [
  { text: "萌娃大赛", icon: "👶", hot: true },
  { text: "年度评选", icon: "🏆", hot: true },
  { text: "摄影大赛", icon: "📸", hot: true },
  { text: "才艺评选", icon: "🎭", hot: false },
  { text: "视频投票", icon: "🎬", hot: false },
  { text: "语音投票", icon: "🎙️", hot: false }
];

import templateImage1 from "../../assets/images/template_image_01.png";
import templateImage2 from "../../assets/images/template_image_02.png";
import templateImage3 from "../../assets/images/template_image_03.png";
import templateImage4 from "../../assets/images/template_image_04.png";
import templateImage5 from "../../assets/images/template_image_05.png";
import templateImage6 from "../../assets/images/template_image_06.png";
import templateImage7 from "../../assets/images/template_image_07.png";
import templateImage8 from "../../assets/images/template_image_08.png";
import templateImage9 from "../../assets/images/template_image_09.png";
import templateImage10 from "../../assets/images/template_image_10.png";
import templateImage11 from "../../assets/images/template_image_11.png";
import templateImage12 from "../../assets/images/template_image_12.png";

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
  templateImage12,
];

const CATEGORY_IMAGE_OFFSETS: Record<string, number> = {
  全部: 0,
  照片投票: 2,
  视频投票: 5,
  语音投票: 8,
  知识投票: 1,
  闯关投票: 6,
  PK投票: 9,
  趣味投票: 4,
  学习投票: 7,
  练习: 3,
  考试: 10,
  课程: 11,
};

export const getTemplateImage = (id: string, idx = 0, categoryKey = "全部") => {
  const offset = CATEGORY_IMAGE_OFFSETS[categoryKey] ?? 0;
  return TEMPLATE_IMAGE_POOL[(offset + idx) % TEMPLATE_IMAGE_POOL.length];
};

export const getTemplateStyle = (id: string) => {
  const stylesMap: Record<string, { bg: string; text: string; border: string }> = {
    q1: { bg: "from-[#eef3fb] to-[#f8faff]", text: "text-blue-700", border: "border-blue-100" },
    q2: { bg: "from-[#fff7ed] to-[#fffdfa]", text: "text-amber-700", border: "border-amber-100" },
    q3: { bg: "from-[#ecf9f4] to-[#f7fdfb]", text: "text-emerald-700", border: "border-emerald-100" },
    q4: { bg: "from-[#fdf1f5] to-[#fef8fa]", text: "text-indigo-700", border: "border-indigo-100" },
    q5: { bg: "from-[#faf1fe] to-[#fdf9ff]", text: "text-purple-700", border: "border-purple-100" },
    q6: { bg: "from-[#ecf9f4] to-[#f7fdfb]", text: "text-teal-700", border: "border-teal-100" },
    q7: { bg: "from-[#f1f5f9] to-[#f8fafc]", text: "text-[#475569]", border: "border-slate-100" },
  };
  return stylesMap[id] || { bg: "from-[#eef3fb] to-[#f8faff]", text: "text-blue-700", border: "border-blue-105" };
};

export const matchSubPlaystyle = (template: any, subPlaystyle: string) => {
  if (subPlaystyle === "全部") return true;
  if (template.title.includes(subPlaystyle) || template.tagText?.includes(subPlaystyle)) return true;
  return false;
};
