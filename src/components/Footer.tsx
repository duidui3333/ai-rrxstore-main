import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 mt-8 overflow-x-auto custom-scrollbar">
      <div className="w-full flex items-center justify-center gap-x-8 text-[13px] text-slate-400 whitespace-nowrap min-w-max">
        <span>Copyright © 2014-2026 合肥星爵互动信息科技有限公司版权所有</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">皖ICP备14022481号</a>
        <span>增值电信业务经营许可证：皖B2-20200055</span>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34010402701575" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
          <img 
            src="https://rrx-cdn.renrenxiu.cn/system/beian.png" 
            alt="备案" 
            className="w-4 h-4 opacity-70"
          />
          备案皖公网安备 34010402701575号
        </a>
      </div>
    </footer>
  );
}
