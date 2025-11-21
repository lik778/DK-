
import React, { useState } from 'react';
import { Trash2, ArrowRightLeft, FileWarning, CheckCircle, FileText, AlertTriangle } from 'lucide-react';
import { MOCK_DISPOSAL_RECORDS } from '../constants';

interface DisposalModuleProps {
  view: string;
}

export const DisposalModule: React.FC<DisposalModuleProps> = ({ view }) => {
  
  // --- Destruction Management ---
  const DestructionManagement = () => {
    const [activeTab, setActiveTab] = useState<'pending' | 'registry'>('pending');
    
    const pendingList = MOCK_DISPOSAL_RECORDS.filter(r => r.type === 'destruction' && r.status === 'pending_approval');
    const registryList = MOCK_DISPOSAL_RECORDS.filter(r => r.type === 'destruction' && r.status === 'destroyed');

    return (
      <div className="p-6 bg-gray-50 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">档案销毁管理</h2>
            <p className="text-sm text-gray-500">对保管期满的档案进行销毁流程管理，确保合规性。</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-1 flex space-x-1">
             <button 
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-1.5 text-sm font-medium rounded ${activeTab === 'pending' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
             >
               销毁申请
             </button>
             <button 
                onClick={() => setActiveTab('registry')}
                className={`px-4 py-1.5 text-sm font-medium rounded ${activeTab === 'registry' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
             >
               销毁清册
             </button>
          </div>
        </div>

        {activeTab === 'pending' ? (
           <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-red-50 flex items-center text-red-800 text-sm font-medium">
                 <AlertTriangle className="w-4 h-4 mr-2" />
                 注意：销毁申请需经鉴定小组、部门负责人和主管领导三级审批后方可执行。
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">档号</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">题名</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">到期时间</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">申请人</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">状态</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                   {pendingList.map(record => (
                     <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-gray-500">{record.archiveCode}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{record.fileName}</td>
                        <td className="px-6 py-4 text-red-600 font-bold">{record.expireDate}</td>
                        <td className="px-6 py-4">{record.applicant}</td>
                        <td className="px-6 py-4">
                           <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">审批中</span>
                        </td>
                        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">查看流程</td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        ) : (
           <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">档号</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">题名</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">销毁时间</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">经办人</th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">监销人</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                   {registryList.map(record => (
                     <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-gray-500">{record.archiveCode}</td>
                        <td className="px-6 py-4 font-medium text-gray-500 line-through">{record.fileName}</td>
                        <td className="px-6 py-4 text-gray-500">2021-01-20</td>
                        <td className="px-6 py-4">{record.applicant}</td>
                        <td className="px-6 py-4">王总监</td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        )}
      </div>
    );
  };

  // --- Transfer Management ---
  const TransferManagement = () => {
    const transferList = MOCK_DISPOSAL_RECORDS.filter(r => r.type === 'transfer');

    return (
      <div className="p-6 bg-gray-50 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">档案移交管理</h2>
            <p className="text-sm text-gray-500">管理向档案馆或其他机构移交的档案。</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm font-medium text-sm hover:bg-blue-700">
             <FileText className="w-4 h-4 mr-2" /> 生成移交清册
          </button>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-gray-50">
               <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">档号</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">题名</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">保管期限</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">移交接收单位</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">状态</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 text-sm">
                {transferList.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                     <td className="px-6 py-4 font-mono text-gray-500">{record.archiveCode}</td>
                     <td className="px-6 py-4 font-medium text-gray-900">{record.fileName}</td>
                     <td className="px-6 py-4 text-blue-600 font-bold">{record.retentionPeriod}</td>
                     <td className="px-6 py-4">市档案馆</td>
                     <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">移交审批中</span>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    );
  };

  switch (view) {
    case 'transfer': return <TransferManagement />;
    case 'destruction': 
    default: return <DestructionManagement />;
  }
};
