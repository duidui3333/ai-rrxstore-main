import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export interface PreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INDUSTRY_PREFERENCES = [
  "互联网/IT", "制造/工厂", "教育培训", "医疗健康", 
  "金融服务", "零售/电商", "餐饮美食", "房地产/建筑", 
  "物流/运输", "媒体/广告", "休闲娱乐", "政府/非政府组织",
  "幼儿园", "婚庆", "门店/商超"
];

const USAGE_PREFERENCES = [
  "邀请函", "APP营销", "小程序营销", "招生", 
  "游戏营销", "活动促销", "节日营销", "招聘",
  "内容宣传", "产品介绍", "问卷调查", "现场互动",
  "长图文", "海报打卡"
];

export default function PreferenceModal({ isOpen, onClose }: PreferenceModalProps) {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedUsages, setSelectedUsages] = useState<string[]>(["邀请函", "内容宣传", "游戏营销"]);

  if (!isOpen) return null;

  const toggleSelection = (
    item: string, 
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">设置您的模板偏好</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar space-y-8">
          
          {/* 行业偏好 */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-base font-bold text-slate-800">行业偏好</h3>
              <span className="text-xs text-slate-500">选择您所在的行业，获取精准的风格推荐</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {INDUSTRY_PREFERENCES.map(industry => {
                const isSelected = selectedIndustries.includes(industry);
                return (
                  <button
                    key={industry}
                    onClick={() => toggleSelection(industry, selectedIndustries, setSelectedIndustries)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 border",
                      isSelected 
                        ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    {industry}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 用途偏好 */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="text-base font-bold text-slate-800">用途偏好</h3>
              <span className="text-xs text-slate-500">选择您常用的场景，获取对口的版块推荐</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {USAGE_PREFERENCES.map(usage => {
                const isSelected = selectedUsages.includes(usage);
                return (
                  <button
                    key={usage}
                    onClick={() => toggleSelection(usage, selectedUsages, setSelectedUsages)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 border",
                      isSelected 
                        ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-orange-600" />}
                    {usage}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200 transition-colors"
          >
            保存偏好设置
          </button>
        </div>
      </div>
    </div>
  );
}
