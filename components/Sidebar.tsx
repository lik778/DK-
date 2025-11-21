
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Shield, Database, UserCog, FileText, UploadCloud, FilePlus, Server, Smartphone, PieChart, FileBarChart, BookText, Trash2, ArrowRightLeft, Hash, Package, Scale, HardDrive, Save, FileType as FileTypeIcon } from 'lucide-react';
import { FileNode, FileType, SystemModule } from '../types';

interface SidebarProps {
  module: SystemModule;
  fileSystem: Record<string, FileNode>;
  activeFolderId: string;
  onNavigate: (folderId: string) => void;
  onSystemNavigate?: (view: string) => void;
  activeSystemView?: string;
}

const FolderItem: React.FC<{
  node: FileNode;
  fileSystem: Record<string, FileNode>;
  activeFolderId: string;
  depth: number;
  onNavigate: (id: string) => void;
}> = ({ node, fileSystem, activeFolderId, depth, onNavigate }) => {
  const [expanded, setExpanded] = useState(true); 
  const hasChildren = node.children && node.children.length > 0;
  const isActive = activeFolderId === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleClick = () => {
    onNavigate(node.id);
  };

  const folderChildren = node.children
    ? node.children
        .map((childId) => fileSystem[childId])
        .filter((child) => child && child.type === FileType.FOLDER)
    : [];

  return (
    <div>
      <div
        className={`flex items-center py-1.5 pr-2 cursor-pointer select-none transition-colors duration-150 border-l-2 ${
          isActive ? 'bg-blue-50 border-blue-600 text-blue-700' : 'border-transparent hover:bg-gray-100 text-gray-700'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
      >
        <div
          className={`p-0.5 mr-1 rounded hover:bg-gray-200 ${
            hasChildren ? 'visible' : 'invisible'
          }`}
          onClick={handleToggle}
        >
          {expanded ? (
            <ChevronDown className="w-3 h-3 text-gray-400" />
          ) : (
            <ChevronRight className="w-3 h-3 text-gray-400" />
          )}
        </div>
        <div className="mr-2">
          {expanded || isActive ? (
            <FolderOpen className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-yellow-500'}`} />
          ) : (
            <Folder className="w-4 h-4 text-yellow-500" />
          )}
        </div>
        <span className="text-sm truncate font-medium">{node.name}</span>
      </div>
      
      {expanded && hasChildren && (
        <div>
          {folderChildren.map((child) => (
            <FolderItem
              key={child.id}
              node={child}
              fileSystem={fileSystem}
              activeFolderId={activeFolderId}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MenuList: React.FC<{ 
  items: { id: string, icon: React.ElementType, label: string }[], 
  activeView?: string, 
  onNavigate?: (view: string) => void 
}> = ({ items, activeView, onNavigate }) => {
  return (
    <div className="py-2">
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => onNavigate?.(item.id)}
          className={`flex items-center px-4 py-3 cursor-pointer text-sm font-medium transition-colors border-l-4 ${
            activeView === item.id ? 'bg-blue-50 text-blue-700 border-blue-600' : 'border-transparent text-gray-700 hover:bg-gray-100'
          }`}
        >
          <item.icon className={`w-4 h-4 mr-3 ${activeView === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
          {item.label}
        </div>
      ))}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  module, 
  fileSystem, 
  activeFolderId, 
  onNavigate,
  onSystemNavigate,
  activeSystemView
}) => {
  const rootNode = fileSystem['root'];

  const systemMenuItems = [
    { id: 'users', icon: UserCog, label: '用户管理' },
    { id: 'roles', icon: Shield, label: '角色权限' },
    { id: 'logs', icon: FileText, label: '系统日志' },
    { id: 'backup', icon: Database, label: '备份恢复' },
  ];

  const collectionMenuItems = [
    { id: 'batch', icon: UploadCloud, label: '批量挂接' },
    { id: 'manual', icon: FilePlus, label: '新建档案' },
    { id: 'api', icon: Server, label: '接口集成' },
    { id: 'mobile', icon: Smartphone, label: '移动采集' },
  ];

  const statsMenuItems = [
    { id: 'general', icon: PieChart, label: '综合统计报表' },
    { id: 'custom', icon: FileBarChart, label: '自定义报表' },
    { id: 'compilation', icon: BookText, label: '专题汇编' },
  ];

  const disposalMenuItems = [
    { id: 'destruction', icon: Trash2, label: '档案销毁管理' },
    { id: 'transfer', icon: ArrowRightLeft, label: '档案移交管理' },
  ];

  const organizeMenuItems = [
    { id: 'catalog', icon: Hash, label: '自动编目' },
    { id: 'boxing', icon: Package, label: '虚拟组卷/装盒' },
    { id: 'appraisal', icon: Scale, label: '价值鉴定' },
  ];

  const storageMenuItems = [
    { id: 'warehouse', icon: HardDrive, label: '数字仓库监控' },
    { id: 'backup', icon: Save, label: '备份与容灾' },
    { id: 'format', icon: FileTypeIcon, label: '存储格式管理' },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden flex-shrink-0 shadow-inner">
      
      {module === 'archives' && (
        <>
          <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 tracking-wide">全宗目录</span>
            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded">公开</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
            {rootNode && (
              <FolderItem
                node={rootNode}
                fileSystem={fileSystem}
                activeFolderId={activeFolderId}
                depth={0}
                onNavigate={onNavigate}
              />
            )}
          </div>
        </>
      )}

      {module === 'system' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">系统配置</div>
          <MenuList items={systemMenuItems} activeView={activeSystemView} onNavigate={onSystemNavigate} />
        </div>
      )}

      {module === 'collection' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">收集与整理</div>
          <MenuList items={collectionMenuItems} activeView={activeSystemView} onNavigate={onSystemNavigate} />
        </div>
      )}

      {module === 'organize' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">档案库房作业</div>
          <MenuList items={organizeMenuItems} activeView={activeSystemView} onNavigate={onSystemNavigate} />
        </div>
      )}

      {module === 'storage' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">存储与安全</div>
          <MenuList items={storageMenuItems} activeView={activeSystemView} onNavigate={onSystemNavigate} />
        </div>
      )}

      {module === 'stats' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">统计与编研</div>
          <MenuList items={statsMenuItems} activeView={activeSystemView} onNavigate={onSystemNavigate} />
        </div>
      )}

      {module === 'disposal' && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">档案处置</div>
          <MenuList items={disposalMenuItems} activeView={activeSystemView} onNavigate={onSystemNavigate} />
        </div>
      )}

      {module === 'borrow' && (
        <div className="p-4 text-sm text-gray-500 text-center mt-10">
          此模块无需左侧树形导航，请在主区域操作。
        </div>
      )}

      <div className="p-4 border-t border-gray-200 bg-gray-50 mt-auto">
        <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
           <h4 className="text-xs font-semibold text-gray-600 mb-2">电子仓库状态</h4>
           <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
             <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
           </div>
           <div className="flex justify-between text-[10px] text-gray-500">
             <span>已归档 750GB</span>
             <span>总量 1TB</span>
           </div>
        </div>
      </div>
    </aside>
  );
};
