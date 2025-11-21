
import React, { useState, useMemo } from 'react';
import { NavRail } from './components/NavRail';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FileDetailModal } from './components/FileDetailModal';
import { SystemModule as SystemModuleComponent } from './components/SystemModule';
import { BorrowModule as BorrowModuleComponent } from './components/BorrowModule';
import { StatsModule as StatsModuleComponent } from './components/StatsModule';
import { CollectionModule as CollectionModuleComponent } from './components/CollectionModule';
import { DisposalModule as DisposalModuleComponent } from './components/DisposalModule';
import { MOCK_FILE_SYSTEM } from './constants';
import { FileNode, FileType, BreadcrumbItem, SystemModule } from './types';
import { FileText, Folder, Image, MoreHorizontal, ChevronRight, SearchX, Lock, ShieldCheck } from 'lucide-react';
import { smartSearch } from './services/geminiService';

const getFileIcon = (type: FileType) => {
  switch (type) {
    case FileType.FOLDER: return <Folder className="w-5 h-5 text-yellow-500" fill="currentColor" fillOpacity={0.2} />;
    case FileType.PDF: return <FileText className="w-5 h-5 text-red-500" />;
    case FileType.DOCX: return <FileText className="w-5 h-5 text-blue-600" />;
    case FileType.XLSX: return <FileText className="w-5 h-5 text-green-600" />;
    case FileType.IMAGE: return <Image className="w-5 h-5 text-purple-600" />;
    default: return <FileText className="w-5 h-5 text-gray-400" />;
  }
};

export default function App() {
  const [activeModule, setActiveModule] = useState<SystemModule>('archives');
  
  // Archives State
  const [fileSystem, setFileSystem] = useState<Record<string, FileNode>>(MOCK_FILE_SYSTEM);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // System, Collection, Stats, Disposal Module State (Shared generic view state for sub-menus)
  const [activeSystemView, setActiveSystemView] = useState('users');
  
  // Handle module change reset
  const handleModuleChange = (module: SystemModule) => {
    setActiveModule(module);
    if (module === 'collection') {
      setActiveSystemView('batch');
    } else if (module === 'system') {
      setActiveSystemView('users');
    } else if (module === 'stats') {
      setActiveSystemView('general'); // Default for stats
    } else if (module === 'disposal') {
      setActiveSystemView('destruction'); // Default for disposal
    }
  };

  // Derived state for files
  const currentFiles = useMemo(() => {
    if (searchResults) {
      return searchResults.map(id => fileSystem[id]).filter(Boolean);
    }
    const folder = fileSystem[currentFolderId];
    if (!folder || !folder.children) return [];
    return folder.children.map(id => fileSystem[id]).filter(Boolean);
  }, [fileSystem, currentFolderId, searchResults]);

  // Breadcrumbs Logic
  const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
    if (searchResults) return [{ id: 'root', name: '智能检索结果' }];
    
    const path: BreadcrumbItem[] = [];
    let currentId: string | null = currentFolderId;
    while (currentId) {
      const node = fileSystem[currentId];
      if (node) {
        path.unshift({ id: node.id, name: node.name });
        currentId = node.parentId;
      } else {
        break;
      }
    }
    return path;
  }, [currentFolderId, fileSystem, searchResults]);

  const handleNavigate = (id: string) => {
    const node = fileSystem[id];
    if (node && node.type === FileType.FOLDER) {
      setCurrentFolderId(id);
      setSearchResults(null);
    } else {
      setSelectedFile(node);
    }
  };

  const handleSearch = async (query: string, isSmart: boolean) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    // Switch to archives module if searching
    setActiveModule('archives');
    setIsSearching(true);

    if (isSmart) {
      const context = Object.values(fileSystem)
        .map(f => `${f.id}: ${f.name} [${f.archiveCode || ''}] ${f.content ? `- ${f.content.substring(0, 50)}...` : ''}`)
        .join('\n');
      
      const matchedIds = await smartSearch(query, context);
      setSearchResults(matchedIds);
    } else {
      const lowerQuery = query.toLowerCase();
      const results = Object.values(fileSystem).filter(f => 
        f.name.toLowerCase().includes(lowerQuery) || 
        (f.archiveCode && f.archiveCode.toLowerCase().includes(lowerQuery))
      ).map(f => f.id);
      setSearchResults(results);
    }
    
    setIsSearching(false);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* 1. Functional Navigation Rail (Leftmost) */}
      <NavRail activeModule={activeModule} onChangeModule={handleModuleChange} />

      <div className="flex flex-col flex-1 min-w-0">
        {/* 2. Header */}
        <Header onSearch={handleSearch} currentModule={activeModule} />

        <div className="flex flex-1 overflow-hidden">
          {/* 3. Contextual Sidebar (Tree or Menu) */}
          <Sidebar 
            module={activeModule}
            fileSystem={fileSystem} 
            activeFolderId={searchResults ? '' : currentFolderId} 
            onNavigate={handleNavigate}
            onSystemNavigate={setActiveSystemView}
            activeSystemView={activeSystemView}
          />

          {/* 4. Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-white relative shadow-xl ml-px z-10">
            
            {activeModule === 'archives' && (
              <>
                {/* Breadcrumb Bar */}
                <div className="h-10 border-b border-gray-200 flex items-center px-4 bg-gray-50 flex-shrink-0">
                   <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                      {breadcrumbs.map((crumb, index) => (
                        <li key={crumb.id} className="flex items-center">
                          {index > 0 && <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />}
                          <button
                            onClick={() => handleNavigate(crumb.id)}
                            className={`text-xs font-medium transition-colors ${
                              index === breadcrumbs.length - 1
                                ? 'text-gray-800 pointer-events-none font-bold'
                                : 'text-gray-500 hover:text-blue-600'
                            }`}
                          >
                            {crumb.name}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </nav>
                  <div className="ml-auto flex items-center space-x-2 text-gray-400">
                    <span className="text-[10px] uppercase tracking-wider font-semibold">
                      {isSearching ? '搜索结果' : `包含 ${currentFiles.length} 个对象`}
                    </span>
                  </div>
                </div>

                {/* File List */}
                <div className="flex-1 overflow-y-auto bg-white">
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                       <p>正在检索企业档案库...</p>
                    </div>
                  ) : currentFiles.length === 0 ? (
                     <div className="flex flex-col items-center justify-center h-full text-gray-400">
                       <SearchX className="w-16 h-16 mb-4 opacity-20" />
                       <p>此位置暂无文件。</p>
                     </div>
                  ) : (
                    <div className="w-full min-w-[800px]">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                          <tr>
                            <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-8"></th>
                            <th className="px-2 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">档案名称</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-32">档号</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-24">密级</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-32">修改日期</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-24 text-right">大小</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-24 text-center">责任者</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-16 text-center">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {currentFiles.map((file) => (
                            <tr 
                              key={file.id} 
                              className="hover:bg-blue-50 group transition-colors cursor-pointer text-sm"
                              onClick={() => handleNavigate(file.id)}
                            >
                              <td className="px-4 py-2">
                                {getFileIcon(file.type)}
                              </td>
                              <td className="px-2 py-2">
                                <div className="font-medium text-gray-800 group-hover:text-blue-700 flex items-center">
                                  {file.name}
                                  {file.permissions === 'none' && <Lock className="w-3 h-3 ml-2 text-red-400" />}
                                </div>
                              </td>
                              <td className="px-4 py-2 text-gray-500 font-mono text-xs">
                                {file.archiveCode || '-'}
                              </td>
                              <td className="px-4 py-2">
                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                  file.securityLevel === '公开' ? 'bg-green-100 text-green-800' :
                                  file.securityLevel === '内部' ? 'bg-blue-100 text-blue-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {file.securityLevel}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-gray-500 text-xs">
                                {file.updatedAt}
                              </td>
                              <td className="px-4 py-2 text-gray-500 font-mono text-xs text-right">
                                {file.size || '-'}
                              </td>
                              <td className="px-4 py-2 text-center text-gray-600 text-xs">
                                {file.owner}
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button 
                                  className="text-gray-400 hover:text-blue-600 p-1 rounded"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Module Views */}
            {activeModule === 'borrow' && <BorrowModuleComponent />}
            {activeModule === 'collection' && <CollectionModuleComponent view={activeSystemView} />}
            {activeModule === 'stats' && <StatsModuleComponent view={activeSystemView} />}
            {activeModule === 'disposal' && <DisposalModuleComponent view={activeSystemView} />}
            {activeModule === 'system' && <SystemModuleComponent view={activeSystemView} />}

            {/* Footer Info */}
            <div className="h-6 bg-gray-50 border-t border-gray-200 flex items-center px-4 text-[10px] text-gray-400 justify-between flex-shrink-0 select-none">
              <span>多可档案管理系统 V6.0 | Enterprise Edition</span>
              <span>服务器: SRV-Archive-01 | 状态: 在线</span>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {selectedFile && (
        <FileDetailModal 
          file={selectedFile} 
          onClose={() => setSelectedFile(null)} 
        />
      )}
    </div>
  );
}
