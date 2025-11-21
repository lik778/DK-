import React from 'react';
import { MOCK_BORROW_REQUESTS } from '../constants';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export const BorrowModule: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">我的借阅申请</h3>
          <p className="text-sm text-gray-500">查看您发起的借阅申请状态及有效期。</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">待办审批</h3>
          <p className="text-sm text-gray-500">您当前有 <span className="text-red-600 font-bold">0</span> 条待审批任务。</p>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-700 mb-4">最近借阅记录</h3>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">单号</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">档案名称</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">申请人</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">申请日期</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">借阅原因</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_BORROW_REQUESTS.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{req.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{req.fileName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{req.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.requestDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {req.status === 'approved' ? (
                    <span className="flex items-center text-green-600 font-medium">
                      <CheckCircle className="w-4 h-4 mr-1" /> 已归还
                    </span>
                  ) : req.status === 'pending' ? (
                    <span className="flex items-center text-yellow-600 font-medium">
                      <Clock className="w-4 h-4 mr-1" /> 审批中
                    </span>
                  ) : (
                     <span className="flex items-center text-red-600 font-medium">
                      <XCircle className="w-4 h-4 mr-1" /> 已驳回
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
