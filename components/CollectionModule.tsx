
import React, { useState } from 'react';
import { Upload, FilePlus, Smartphone, Server, CheckCircle, Loader2, AlertCircle, QrCode, RefreshCw, Save, FileText, ScanLine, Link } from 'lucide-react';

interface CollectionModuleProps {
  view: string;
}

export const CollectionModule: React.FC<CollectionModuleProps> = ({ view }) => {
  
  // --- Sub-component: Batch Import ---
  const BatchImport = () => {
    const [importing, setImporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState<{name: string, size: string, status: 'pending' | 'success'}[]>([
      { name: '2023年度财务审计报告_初稿.pdf', size: '2.4 MB', status: 'pending' },
      { name: '人力资源部_新员工入职材料_批量.zip', size: '15 MB', status: 'pending' },
      { name: '项目Alpha_会议纪要_Q3.docx', size: '450 KB', status: 'pending' },
    ]);

    const handleImport = () => {
      setImporting(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 10;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setImporting(false);
          setFiles(prev => prev.map(f => ({ ...f, status: 'success' })));
        }
      }, 200);
    };

    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50">
        <div className="flex justify-between items-center mb-6">
           <div>
             <h2 className="text-xl font-bold text-gray-800 mb-1">批量挂接与导入</h2>
             <p className="text-sm text-gray-500">支持上传电子文件或挂接数字化扫描件。系统将自动解析文件名进行预归档。</p>
           </div>
           <div className="flex space-x-2">
             <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm text-gray-700 hover:bg-gray-50">
               <Link className="w-4 h-4 mr-2" /> 挂接本地文件夹
             </button>
             <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm text-gray-700 hover:bg-gray-50">
               <ScanLine className="w-4 h-4 mr-2" /> 连接扫描仪
             </button>
           </div>
        </div>
        
        <div className="bg-white p-10 border-2 border-dashed border-blue-200 rounded-lg flex flex-col items-center justify-center mb-6 hover:border-blue-500 transition-colors cursor-pointer bg-blue-50/30">
          <Upload className="w-12 h-12 text-blue-400 mb-4" />
          <p className="text-gray-700 font-medium text-lg">点击选择文件 或 将文件拖拽至此</p>
          <p className="text-sm text-gray-500 mt-2">支持 PDF, Office, 图片, CAD, ZIP 等多种格式</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <span className="font-bold text-gray-700 text-sm flex items-center">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              待入库列表 ({files.length})
            </span>
            <button 
              onClick={handleImport}
              disabled={importing || files.every(f => f.status === 'success')}
              className={`px-4 py-1.5 rounded text-xs font-bold text-white flex items-center transition-all shadow-sm ${importing || files.every(f => f.status === 'success') ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {importing ? <Loader2 className="w-3 h-3 mr-2 animate-spin"/> : <Upload className="w-3 h-3 mr-2"/>}
              {files.every(f => f.status === 'success') ? '全部入库完成' : '开始执行入库'}
            </button>
          </div>
          
          {importing && (
             <div className="w-full bg-gray-200 h-1">
               <div className="bg-green-500 h-1 transition-all duration-200" style={{ width: `${progress}%` }}></div>
             </div>
          )}

          <ul className="divide-y divide-gray-100">
            {files.map((f, idx) => (
              <li key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded mr-3">
                     <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">{f.name}</div>
                    <div className="text-xs text-gray-500">{f.size}</div>
                  </div>
                </div>
                <div>
                   {f.status === 'success' ? (
                     <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-100"><CheckCircle className="w-3 h-3 mr-1"/> 入库成功</span>
                   ) : (
                     <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded">等待处理</span>
                   )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // --- Sub-component: Manual Entry ---
  const ManualEntry = () => {
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    };

    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50">
         <h2 className="text-xl font-bold text-gray-800 mb-2">新建档案（单件录入）</h2>
         <p className="text-sm text-gray-500 mb-6">手动填写元数据并上传电子附件，适用于零散文件的即时归档。</p>

         <form onSubmit={handleSave} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-5xl">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">基本信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">档案题名 <span className="text-red-500">*</span></label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="请输入文件标题..." required />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">档号 <span className="text-red-500">*</span></label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="系统自动生成" disabled />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">文号</label>
                 <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">责任者/归档部门</label>
                 <div className="relative">
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" defaultValue="行政部" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">归档日期</label>
                 <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">密级</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>公开</option>
                    <option>内部</option>
                    <option>秘密</option>
                    <option>机密</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">保管期限</label>
                 <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>永久</option>
                    <option>30年</option>
                    <option>10年</option>
                 </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">紧急程度</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>普通</option>
                    <option>加急</option>
                    <option>特急</option>
                  </select>
               </div>

               <div className="md:col-span-3">
                 <label className="block text-sm font-medium text-gray-700 mb-1">内容摘要 / 备注</label>
                 <textarea className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-24 resize-none" placeholder="填写文件简要内容..."></textarea>
               </div>
            </div>

            <div className="border-b border-gray-100 pb-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">电子附件</h3>
            </div>
            <div className="mb-6">
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer">
                  <FilePlus className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">点击上传文件 (PDF, Word, Excel, 图片)</span>
               </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-lg">
               {saved && <span className="text-green-600 text-sm font-bold flex items-center animate-pulse"><CheckCircle className="w-4 h-4 mr-1"/> 保存成功！</span>}
               <button type="button" className="px-5 py-2 text-gray-600 text-sm font-medium hover:bg-white hover:shadow-sm rounded border border-transparent hover:border-gray-200 transition-all">重置表单</button>
               <button type="submit" className="px-8 py-2 bg-blue-600 text-white text-sm font-bold rounded shadow hover:bg-blue-700 flex items-center transition-colors">
                 <Save className="w-4 h-4 mr-2" /> 保存并归档
               </button>
            </div>
         </form>
      </div>
    );
  };

  // --- Sub-component: API Integration ---
  const ApiIntegration = () => {
    const systems = [
      { name: '企业OA系统 (Seeyon)', status: 'active', lastSync: '5分钟前', pending: 0 },
      { name: 'ERP系统 (SAP)', status: 'active', lastSync: '1小时前', pending: 12 },
      { name: 'CRM系统 (Salesforce)', status: 'error', lastSync: '2天前', pending: 5 },
    ];

    return (
       <div className="p-6 h-full overflow-y-auto bg-gray-50">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="text-xl font-bold text-gray-800">API 接口集成监控</h2>
               <p className="text-sm text-gray-500">实时监控外部业务系统归档接口的运行状态与日志。</p>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm text-gray-700 hover:bg-gray-50">
                 <Server className="w-4 h-4 mr-2" /> 接口文档
               </button>
              <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded shadow-sm text-sm hover:bg-blue-700 font-medium">
                 <RefreshCw className="w-4 h-4 mr-2" /> 立即同步
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           {systems.map((sys, idx) => (
             <div key={idx} className="bg-white p-5 rounded-lg shadow border border-gray-200 flex items-center justify-between relative overflow-hidden">
               {sys.status === 'active' && <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>}
               {sys.status === 'error' && <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>}
               <div>
                 <h4 className="font-bold text-gray-700 text-lg">{sys.name}</h4>
                 <div className="text-xs text-gray-500 mt-2 flex items-center">
                   <RefreshCw className="w-3 h-3 mr-1" /> 上次同步: {sys.lastSync}
                 </div>
               </div>
               <div className="text-right">
                 <div className={`text-xs font-bold uppercase px-2 py-1 rounded mb-2 inline-block ${
                   sys.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                 }`}>
                   {sys.status === 'active' ? '运行中' : '异常'}
                 </div>
                 {sys.pending > 0 ? (
                   <div className="text-sm text-blue-600 font-bold">{sys.pending} 份待归档</div>
                 ) : (
                   <div className="text-sm text-gray-400">无等待队列</div>
                 )}
               </div>
             </div>
           ))}
         </div>

         <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 font-bold text-gray-700">最近自动归档记录</div>
            <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">来源系统</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">文件标题</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">处理时间</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">状态</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 text-sm">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">企业OA系统</td>
                    <td className="px-6 py-4">公文-关于中秋节放假的通知.pdf</td>
                    <td className="px-6 py-4 text-gray-500">2023-11-28 10:23:11</td>
                    <td className="px-6 py-4"><span className="text-green-600 font-bold flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> 成功</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">ERP系统</td>
                    <td className="px-6 py-4">采购订单_PO20239981.pdf</td>
                    <td className="px-6 py-4 text-gray-500">2023-11-28 09:15:00</td>
                    <td className="px-6 py-4"><span className="text-green-600 font-bold flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> 成功</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">CRM系统</td>
                    <td className="px-6 py-4">客户合同_TechCorp.pdf</td>
                    <td className="px-6 py-4 text-gray-500">2023-11-27 16:45:22</td>
                    <td className="px-6 py-4"><span className="text-red-500 font-bold flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> 失败 (元数据缺失)</span></td>
                  </tr>
               </tbody>
            </table>
         </div>
       </div>
    );
  };

  // --- Sub-component: Mobile Capture ---
  const MobileCapture = () => {
    return (
       <div className="p-6 h-full overflow-y-auto bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-2">移动端采集工作台</h2>
          <p className="text-sm text-gray-500 mb-6">使用“多可档案APP”扫描下方二维码，将手机拍摄的文件或照片实时传输至此。</p>

          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center w-full md:w-auto">
                <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center mb-4 border border-gray-300 shadow-inner relative overflow-hidden">
                   <QrCode className="w-36 h-36 text-gray-800 relative z-10" />
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-scan pointer-events-none h-full w-full"></div>
                </div>
                <p className="text-sm font-bold text-gray-700">扫描二维码连接</p>
                <p className="text-xs text-green-600 mt-1 font-mono bg-green-50 px-2 py-0.5 rounded border border-green-100">连接状态: 监听中...</p>
             </div>

             <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 w-full h-full min-h-[300px]">
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                   <span className="font-bold text-gray-700 text-sm">已接收文件队列</span>
                   <span className="text-xs text-blue-600 font-medium flex items-center">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      自动刷新
                   </span>
                </div>
                <div className="p-8 text-center text-gray-400 flex flex-col items-center justify-center h-64">
                   <Smartphone className="w-16 h-16 mb-4 text-gray-200" />
                   <p className="font-medium text-gray-500">暂无接收到的文件</p>
                   <p className="text-xs mt-2 text-gray-400">请在手机端拍摄并点击“上传”</p>
                </div>
             </div>
          </div>
       </div>
    );
  };

  // Main Render Switch
  switch (view) {
    case 'manual': return <ManualEntry />;
    case 'api': return <ApiIntegration />;
    case 'mobile': return <MobileCapture />;
    case 'batch':
    default: 
      return <BatchImport />;
  }
};
