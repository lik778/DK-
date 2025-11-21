import React, { useEffect, useState } from 'react';
import { FileNode, FileType } from '../types';
import { summarizeDocument, autoTagDocument } from '../services/geminiService';
import { X, FileText, Sparkles, Tag, Clock, User, Lock, ShieldAlert, Key } from 'lucide-react';

interface FileDetailModalProps {
  file: FileNode;
  onClose: () => void;
}

export const FileDetailModal: React.FC<FileDetailModalProps> = ({ file, onClose }) => {
  const [summary, setSummary] = useState<string>('');
  const [tags, setTags] = useState<string[]>(file.tags || []);
  const [loading, setLoading] = useState(false);
  const [borrowRequested, setBorrowRequested] = useState(false);

  const hasPermission = file.permissions === 'read' || file.permissions === 'write' || file.permissions === 'admin';

  useEffect(() => {
    const fetchAIInsights = async () => {
      if (!file.content || !hasPermission) return;
      
      setLoading(true);
      try {
        const [summaryRes, tagsRes] = await Promise.all([
          summarizeDocument(file.name, file.content),
          autoTagDocument(file.name, file.content)
        ]);
        setSummary(summaryRes);
        setTags(tagsRes);
      } catch (e) {
        console.error(e);
        setSummary("无法加载智能分析结果。");
      } finally {
        setLoading(false);
      }
    };

    if (file.type !== FileType.FOLDER) {
      fetchAIInsights();
    }
  }, [file, hasPermission]);

  if (!file) return null;

  const handleBorrow = () => {
    setBorrowRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 truncate max-w-md">{file.name}</h2>
              <div className="flex items-center space-x-2">
                 <span className="text-xs text-gray-500 uppercase tracking-wide border px-1 rounded border-gray-300 bg-white">
                   {file.archiveCode || '暂无档号'}
                 </span>
                 <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                   file.securityLevel === '公开' ? 'bg-green-100 text-green-700' :
                   file.securityLevel === '内部' ? 'bg-blue-100 text-blue-700' :
                   'bg-red-100 text-red-700'
                 }`}>
                   {file.securityLevel}
                 </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 relative min-h-[300px]">
          
          {/* Watermark */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
             <div className="w-full h-full flex flex-wrap content-start transform -rotate-12 scale-150">
                {Array.from({ length: 20 }).map((_, i) => (
                   <div key={i} className="w-48 h-32 flex items-center justify-center text-lg font-bold text-slate-800 whitespace-nowrap">
                     内部资料 严禁外传
                   </div>
                ))}
             </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="flex items-center p-3 bg-gray-50 rounded border border-gray-100">
              <User className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <div className="text-xs text-gray-500">责任者</div>
                <div className="text-sm font-medium text-gray-800">{file.owner}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded border border-gray-100">
              <Clock className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <div className="text-xs text-gray-500">归档时间</div>
                <div className="text-sm font-medium text-gray-800">{file.updatedAt}</div>
              </div>
            </div>
             <div className="flex items-center p-3 bg-gray-50 rounded border border-gray-100">
              <Lock className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <div className="text-xs text-gray-500">当前权限</div>
                <div className="text-sm font-medium text-gray-800 capitalize flex items-center">
                    {hasPermission ? (
                      <span className="text-green-600">允许访问</span>
                    ) : (
                      <span className="text-red-600 flex items-center"><ShieldAlert className="w-3 h-3 mr-1"/> 无权限</span>
                    )}
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded border border-gray-100">
              <div className="w-4 h-4 flex items-center justify-center text-gray-400 mr-3 text-xs border rounded border-gray-400">V</div>
              <div>
                <div className="text-xs text-gray-500">版本</div>
                <div className="text-sm font-medium text-gray-800">{file.version || 'v1.0'}</div>
              </div>
            </div>
          </div>

          {/* Content Preview / No Permission State */}
          {!hasPermission ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center relative z-10">
               <Lock className="w-12 h-12 text-red-400 mx-auto mb-3" />
               <h3 className="text-red-800 font-bold text-lg mb-1">访问受限</h3>
               <p className="text-red-600 text-sm mb-4">您没有权限预览该机密文档内容。</p>
               
               {!borrowRequested ? (
                 <button 
                   onClick={handleBorrow}
                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow-sm text-sm font-medium flex items-center mx-auto"
                 >
                   <Key className="w-4 h-4 mr-2" /> 申请借阅权限
                 </button>
               ) : (
                 <div className="text-sm font-medium text-green-600 bg-white py-2 px-4 rounded inline-block border border-green-200">
                   借阅申请已提交，请等待审批。
                 </div>
               )}
            </div>
          ) : (
            /* AI Insights Section */
            file.type !== FileType.FOLDER && (
              <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-5 relative overflow-hidden z-10">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>
                
                <div className="flex items-center space-x-2 mb-4 relative z-10">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-md font-bold text-indigo-900">智能摘要 (Gemini AI)</h3>
                </div>

                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
                    <div className="h-4 bg-indigo-200 rounded w-1/2"></div>
                    <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
                  </div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    <div>
                      <h4 className="text-xs font-bold text-indigo-700 uppercase mb-1">内容概要</h4>
                      <div className="text-sm text-indigo-900 leading-relaxed whitespace-pre-line">
                        {summary || "暂无摘要内容。"}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-bold text-indigo-700 uppercase mb-2 flex items-center">
                        <Tag className="w-3 h-3 mr-1" /> 智能标签
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.length > 0 ? tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-white text-indigo-600 text-xs font-medium rounded border border-indigo-200 shadow-sm">
                            {tag}
                          </span>
                        )) : <span className="text-xs text-indigo-400 italic">未生成标签</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
        
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end relative z-20">
           <button 
             onClick={onClose}
             className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
           >
             关闭
           </button>
           {hasPermission && (
             <button className="ml-3 px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none flex items-center">
               <FileText className="w-4 h-4 mr-2"/> 
               在线预览
             </button>
           )}
        </div>
      </div>
    </div>
  );
};
