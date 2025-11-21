import React from 'react';
import { User, AuditLog } from '../types';
import { MOCK_USERS, MOCK_LOGS } from '../constants';
import { UserPlus, Shield, Download, RefreshCw } from 'lucide-react';

interface SystemModuleProps {
  view: string;
}

export const SystemModule: React.FC<SystemModuleProps> = ({ view }) => {
  
  if (view === 'users') {
    return (
      <div className="p-6 bg-gray-50 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">用户与组织架构管理</h2>
          <div className="flex space-x-2">
             <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm text-gray-700 hover:bg-gray-50">
               <RefreshCw className="w-4 h-4 mr-2" /> 同步AD域
             </button>
             <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded shadow-sm text-sm hover:bg-blue-700">
               <UserPlus className="w-4 h-4 mr-2" /> 新增用户
             </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">用户ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">姓名</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">部门</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">角色</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role === 'admin' ? '系统管理员' : user.role === 'manager' ? '部门主管' : '普通用户'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="text-green-600 font-medium">正常</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900">编辑</a>
                    <span className="mx-2 text-gray-300">|</span>
                    <a href="#" className="text-red-600 hover:text-red-900">停用</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (view === 'logs') {
    return (
      <div className="p-6 bg-gray-50 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">系统审计日志</h2>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" /> 导出日志
          </button>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">时间</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">用户</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">动作</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">对象</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">IP地址</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">{log.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.userName} ({log.userId})</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      log.action === 'DELETE' ? 'bg-red-100 text-red-800' : 
                      log.action === 'MODIFY' ? 'bg-yellow-100 text-yellow-800' :
                      log.action === 'LOGIN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">{log.target}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <div className="p-10 text-center text-gray-500">请选择左侧菜单项进行管理</div>;
};
