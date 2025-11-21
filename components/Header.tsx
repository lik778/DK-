import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Settings, Sparkles, Grid, Menu, ListFilter } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string, isSmart: boolean) => void;
  onOpenAdvancedSearch: () => void;
  currentModule: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onOpenAdvancedSearch, currentModule }) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query, false);
    }
  };

  const handleSmartSearch = () => {
    if (query.trim()) {
      onSearch(query, true);
    }
  };

  const getModuleTitle = () => {
    switch (currentModule) {
      case 'archives': return '档案管理中心';
      case 'borrow': return '借阅审批中心';
      case 'stats': return '统计报表中心';
      case 'system': return '系统管理控制台';
      default: return '多可电子档案系统';
    }
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-20 flex-shrink-0">
      <div className="flex items-center space-x-3 w-64">
        <span className="font-bold text-lg tracking-tight text-slate-800 flex items-center">
           <span className="text-primary-600 mr-2">DK</span> {getModuleTitle()}
        </span>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-32 py-1.5 border border-gray-300 rounded-md leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
            placeholder="请输入档号、标题、文号或全文关键字..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
             <button 
               onClick={onOpenAdvancedSearch}
               className="flex items-center justify-center p-1.5 mr-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
               title="高级检索"
             >
               <ListFilter className="w-4 h-4" />
             </button>
             <div className="h-4 w-px bg-gray-300 mx-1"></div>
             <button 
              onClick={handleSmartSearch}
              className="flex items-center px-3 py-0.5 mr-1 bg-blue-600 hover:bg-blue-700 text-[11px] rounded text-white transition-colors shadow-sm"
              title="使用 Gemini AI 进行语义检索"
            >
               <Sparkles className="w-3 h-3 mr-1" />
               智能检索
             </button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors relative" title="待办任务">
          <Grid className="w-5 h-5" />
        </button>
        <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors relative" title="通知">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full ring-1 ring-white bg-red-500"></span>
        </button>
        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
           <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-medium text-xs">
             李
           </div>
           <div className="hidden md:block text-xs text-gray-700">
             <div className="font-bold">李经理</div>
             <div className="text-gray-500 scale-90 origin-left">人力资源部</div>
           </div>
        </div>
      </div>
    </header>
  );
};