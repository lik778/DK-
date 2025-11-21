
import React, { useState } from 'react';
import { Search, X, Calendar, User, Hash, FileText, Shield } from 'lucide-react';
import { AdvancedSearchParams } from '../types';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (params: AdvancedSearchParams) => void;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [formData, setFormData] = useState<AdvancedSearchParams>({
    keyword: '',
    archiveCode: '',
    owner: '',
    dateFrom: '',
    dateTo: '',
    securityLevel: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 bg-blue-600 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Search className="w-5 h-5 mr-2" /> 高级检索
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-2 gap-6">
            
            <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">全文关键字 (支持OCR内容)</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <FileText className="h-4 w-4 text-gray-400" />
                 </div>
                 <input 
                   type="text" 
                   name="keyword"
                   value={formData.keyword}
                   onChange={handleChange}
                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                   placeholder="输入文件内容、标题或备注..." 
                 />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">档号</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Hash className="h-4 w-4 text-gray-400" />
                 </div>
                 <input 
                   type="text" 
                   name="archiveCode"
                   value={formData.archiveCode}
                   onChange={handleChange}
                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                   placeholder="精确或模糊匹配" 
                 />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">责任者/创建人</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <User className="h-4 w-4 text-gray-400" />
                 </div>
                 <input 
                   type="text" 
                   name="owner"
                   value={formData.owner}
                   onChange={handleChange}
                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                   placeholder="创建人姓名" 
                 />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">归档日期范围 (开始)</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Calendar className="h-4 w-4 text-gray-400" />
                 </div>
                 <input 
                   type="date" 
                   name="dateFrom"
                   value={formData.dateFrom}
                   onChange={handleChange}
                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                 />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">归档日期范围 (结束)</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Calendar className="h-4 w-4 text-gray-400" />
                 </div>
                 <input 
                   type="date" 
                   name="dateTo"
                   value={formData.dateTo}
                   onChange={handleChange}
                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                 />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">密级</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Shield className="h-4 w-4 text-gray-400" />
                 </div>
                 <select
                    name="securityLevel"
                    value={formData.securityLevel}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 >
                   <option value="">全部</option>
                   <option value="公开">公开</option>
                   <option value="内部">内部</option>
                   <option value="秘密">秘密</option>
                   <option value="机密">机密</option>
                 </select>
               </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => setFormData({ keyword: '', archiveCode: '', owner: '', dateFrom: '', dateTo: '', securityLevel: '' })}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              重置
            </button>
            <button 
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              开始检索
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
