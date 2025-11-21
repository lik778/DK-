
import React, { useState } from 'react';
import { HardDrive, ShieldCheck, Lock, History, RefreshCw, CheckCircle, AlertTriangle, FileType, ArrowRight, Play, Save } from 'lucide-react';

interface StorageModuleProps {
  view: string;
}

export const StorageModule: React.FC<StorageModuleProps> = ({ view }) => {

  // --- Sub-component: Digital Warehouse Monitoring ---
  const WarehouseMonitor = () => {
    const storages = [
      { name: '在线存储池 (Hot)', type: 'RAID 10 SSD', capacity: '2.0 TB', used: '1.2 TB', percent: 60, status: 'normal', secure: true },
      { name: '近线存储池 (Warm)', type: 'NAS HDD', capacity: '10.0 TB', used: '4.5 TB', percent: 45, status: 'normal', secure: true },
      { name: '离线冷存储 (Cold)', type: '磁带库', capacity: '50.0 TB', used: '8.0 TB', percent: 16, status: 'offline', secure: true },
    ];

    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-2">数字仓库监控</h2>
        <p className="text-sm text-gray-500 mb-6">实时监控多级存储架构的容量、健康状态及安全属性。</p>

        <div className="grid grid-cols-1 gap-6">
          {storages.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                   <div className={`p-3 rounded-lg mr-4 ${s.status === 'offline' ? 'bg-gray-100' : 'bg-blue-100'}`}>
                      <HardDrive className={`w-6 h-6 ${s.status === 'offline' ? 'text-gray-500' : 'text-blue-600'}`} />
                   </div>
                   <div>
                      <h3 className="font-bold text-gray-800 text-lg">{s.name}</h3>
                      <p className="text-xs text-gray-500">{s.type}</p>
                   </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                   <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${s.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                      {s.status === 'normal' ? '运行正常' : '离线/休眠'}
                   </span>
                   {s.secure && (
                     <span className="flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100">
                       <Lock className="w-3 h-3 mr-1" /> WORM (一写多读) 保护中
                     </span>
                   )}
                </div>
              </div>

              <div className="mb-2 flex justify-between text-sm font-medium text-gray-600">
                 <span>已用: {s.used}</span>
                 <span>总容量: {s.capacity}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                 <div 
                    className={`h-full rounded-full transition-all duration-500 ${s.percent > 80 ? 'bg-red-500' : s.percent > 50 ? 'bg-blue-500' : 'bg-green-500'}`} 
                    style={{ width: `${s.percent}%` }}
                 ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-component: Backup & Disaster Recovery ---
  const BackupRestore = () => {
    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50">
        <div className="flex justify-between items-center mb-6">
           <div>
              <h2 className="text-xl font-bold text-gray-800">备份与容灾</h2>
              <p className="text-sm text-gray-500">配置自动备份策略，查看备份历史日志。</p>
           </div>
           <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm text-sm font-medium hover:bg-blue-700">
             <Play className="w-4 h-4 mr-2" /> 立即执行全量备份
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center"><History className="w-5 h-5 mr-2 text-blue-500"/>当前备份策略</h3>
              <div className="space-y-3 text-sm">
                 <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">全量备份</span>
                    <span className="font-medium text-gray-800">每周日 02:00 AM</span>
                 </div>
                 <div className="flex justify-between pb-2">
                    <span className="text-gray-500">异地容灾同步</span>
                    <span className="font-medium text-green-600">已启用 (北京 -> 上海)</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  // --- Sub-component: Format Conversion ---
  const FormatConversion = () => {
    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-2">存储格式管理 (长期保存)</h2>
        <p className="text-sm text-gray-500 mb-6">扫描并不符合长期保存标准的电子文件格式，并将其转换为标准 PDF/A 或 OFD 格式。</p>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 flex items-start">
           <AlertTriangle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
           <div>
             <h4 className="font-bold text-blue-800 text-sm">格式合规性检查完成</h4>
             <p className="text-xs text-blue-600 mt-1">系统检测到 3 个文件属于过时格式，建议转换为 PDF/A-1b 以确保长期可读性。</p>
           </div>
        </div>
      </div>
    );
  };

  switch (view) {
    case 'backup': return <BackupRestore />;
    case 'format': return <FormatConversion />;
    case 'warehouse':
    default: return <WarehouseMonitor />;
  }
};
