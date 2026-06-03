import { Image, Layers, Search, Sparkles } from "lucide-react";
import FeatureHighlights from "./FeatureHighlights";

export default function StoreBanner({ palette }: { palette: any }) {
  const hotSearches = ["儿童节", "端午节", "中秋节", "抽奖", "答题", "消除", "夺宝", "口红机"];

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-gradient-to-b from-white via-blue-50/65 to-[#F5F7FA] transition-colors duration-500">
      <div className={`absolute inset-0 bg-gradient-to-b ${palette.from} ${palette.via} to-[#F5F7FA] opacity-80 transition-colors duration-500`}></div>
      
      <div className={`absolute -top-24 left-20 h-72 w-72 rounded-full ${palette.orb1} blur-3xl transition-colors duration-500 opacity-55`}></div>
      <div className={`absolute bottom-0 right-12 h-80 w-80 rounded-full ${palette.orb2} blur-3xl transition-colors duration-500 opacity-35`}></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(37,99,235,0.07),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(20,184,166,0.08),transparent_24%)]"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[#F5F7FA]/70 to-[#F5F7FA]"></div>
      
      <div className="pointer-events-none absolute left-[8%] top-[82px] hidden h-[150px] w-[230px] -rotate-6 rounded-[28px] border border-blue-100/80 bg-white/45 shadow-[0_20px_50px_rgba(37,99,235,0.08)] backdrop-blur-sm lg:block">
        <div className="absolute left-6 top-6 h-9 w-9 rounded-2xl bg-blue-600/90 text-white shadow-lg shadow-blue-500/20">
          <Layers className="absolute left-2 top-2 h-5 w-5" />
        </div>
        <div className="absolute left-6 top-[82px] h-3 w-28 rounded-full bg-slate-300/70"></div>
        <div className="absolute left-6 top-[104px] h-3 w-40 rounded-full bg-slate-200/80"></div>
        <div className="absolute right-7 top-7 h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-200 to-blue-300"></div>
        <div className="absolute right-11 top-11 h-8 w-8 rounded-full bg-white/75"></div>
        <Sparkles className="absolute right-6 bottom-6 h-5 w-5 text-amber-400" />
      </div>

      <div className="pointer-events-none absolute right-[9%] top-[70px] hidden h-[168px] w-[196px] rotate-6 rounded-[30px] border border-cyan-100/80 bg-white/50 shadow-[0_20px_50px_rgba(14,165,233,0.10)] backdrop-blur-sm lg:block">
        <div className="absolute left-6 top-6 h-20 w-[148px] rounded-3xl bg-gradient-to-br from-emerald-100 via-cyan-100 to-blue-100"></div>
        <Image className="absolute left-14 top-12 h-9 w-9 text-cyan-500" />
        <div className="absolute left-6 bottom-12 h-3 w-32 rounded-full bg-slate-300/70"></div>
        <div className="absolute left-6 bottom-8 h-3 w-24 rounded-full bg-slate-200/80"></div>
        <div className="absolute -right-5 -top-5 h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 shadow-[0_10px_24px_rgba(244,63,94,0.20)]"></div>
        <div className="absolute right-7 bottom-7 h-7 w-7 rounded-full bg-blue-500/90"></div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[345px] w-full max-w-[1280px] flex-col items-center justify-center px-6 pb-20 pt-12 text-center lg:pt-16">
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.02em] text-slate-950 sm:text-[42px]">
          搜索你想要的<span className="text-blue-600">模板</span>
        </h1>

        <div className="mt-7 flex h-[60px] w-full max-w-[820px] items-center gap-3 rounded-full border border-blue-100 bg-white px-5 shadow-[0_16px_34px_rgba(40,98,255,0.14)]">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            type="text"
            className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-slate-800 outline-none placeholder:text-slate-400"
            placeholder="搜索儿童节、抽奖、答题、消除、夺宝等玩法"
          />
          <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition hover:bg-blue-700 active:scale-95">
            <Search className="h-6 w-6" />
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
