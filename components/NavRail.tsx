
import React from 'react';
import { Files, BookOpen, BarChart3, Settings, Layers, ArchiveRestore, Recycle } from 'lucide-react';
import { SystemModule } from '../types';

interface NavRailProps {
  activeModule: SystemModule;
  onChangeModule: (module: SystemModule) => void;
}

export const NavRail: React.FC<NavRailProps> = ({ activeModule, onChangeModule }) => {
  const navItems = [
    { id: 'archives', icon: Files, label: '档案中心' },
    { id: 'collection', icon: ArchiveRestore, label: '档案收集' },
    { id: 'borrow', icon: BookOpen, label: '借阅中心' },
    { id: 'stats', icon: BarChart3, label: '统计编研' },
    { id: 'disposal', icon: Recycle, label: '档案处置' },
    { id: 'system', icon: Settings, label: '系统管理' },
  ];

  return (
    <div className="w-16 bg-primary-900 flex flex-col items-center py-4 flex-shrink-0 z-30 shadow-lg">
      <div className="mb-6">
        <Layers className="w-8 h-8 text-white" />
      </div>
      <div className="flex flex-col space-y-6 w-full">
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeModule(item.id as SystemModule)}
              className={`flex flex-col items-center justify-center w-full py-3 transition-all relative group ${
                isActive ? 'bg-primary-800 text-white' : 'text-blue-300 hover:bg-primary-800 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r"></div>
              )}
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'text-blue-400' : ''}`} />
              <span className="text-[10px] font-medium transform scale-90">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
