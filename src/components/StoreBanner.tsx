import { Image, Layers, Search, Sparkles } from "lucide-react";
import FeatureHighlights from "./FeatureHighlights";
import bannerBackground from "../assets/images/storebanner_bg_bitmap1.png";

export default function StoreBanner({ palette }: { palette: any }) {
  const hotSearches = ["儿童节", "端午节", "中秋节", "抽奖", "答题", "投票", "大转盘", "消消乐"];

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-gradient-to-b from-white via-blue-50/65 to-[#F5F7FA] transition-colors duration-500">
      <div className={`absolute inset-0 bg-gradient-to-b ${palette.from} ${palette.via} to-[#F5F7FA] opacity-80 transition-colors duration-500`}></div>
      <div className="absolute inset-0">
        <img
          src={bannerBackground}
          alt=""
          className="h-full w-full object-cover object-center opacity-100"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.82),rgba(255,255,255,0.12)_42%,rgba(245,247,250,0.34)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[#F5F7FA]/55 to-[#F5F7FA]" />

      <div className="relative z-10 mx-auto flex min-h-[345px] w-full max-w-[1280px] flex-col items-center justify-center px-6 pb-20 pt-12 text-center lg:pt-16">
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.02em] text-slate-950 sm:text-[42px]">
          搜索你想要的<span className="text-blue-600">模板</span>
        </h1>

        <div className="mt-7 flex h-[60px] w-full max-w-[820px] items-center gap-3 rounded-full border border-blue-100 bg-white px-5 shadow-[0_16px_34px_rgba(40,98,255,0.14)]">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            type="text"
            className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-slate-800 outline-none placeholder:text-slate-400"
            placeholder="搜索抽奖、答题、投票、小游戏等玩法"
          />
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition hover:bg-blue-700">
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex max-w-[820px] flex-wrap items-center justify-center gap-2 text-[12px] font-bold text-slate-500">
          <span className="mr-1 text-slate-600">热门搜索:</span>
          {hotSearches.map((term) => (
            <button
              key={term}
              className="rounded-full bg-white/60 px-3 py-1.5 text-slate-500 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="mt-7">
          <FeatureHighlights />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-full max-w-[1180px] -translate-x-1/2 rounded-t-[48px] bg-[#F5F7FA]/40 blur-2xl"></div>
      </div>
    </section>
  );
}
