
import React, { useState } from 'react';
import { Hash, Play, Box, ArrowRight, FolderPlus, Trash2, Clock, AlertTriangle, Sparkles, FileText } from 'lucide-react';

interface OrganizeModuleProps {
  view: string;
}

export const OrganizeModule: React.FC<OrganizeModuleProps> = ({ view }) => {

  // --- Sub-component: Auto Cataloging ---
  const AutoCatalog = () => {
    const [files, setFiles] = useState([
      { id: 1, name: '2023年度行政工作总结.docx', dept: '行政部', type: '文书', code: '', status: '待编目' },
      { id: 2, name: '技术中心设备采购合同_202311.pdf', dept: '技术部', type: '合同', code: '', status: '待编目' },
      { id: 3, name: '关于春节放假的通知.doc', dept: '人资部', type: '文书', code: '', status: '待编目' },
    ]);

    const generateCode = () => {
      const newFiles = files.map((f, index) => {
        const typeCode = f.type === '文书' ? 'WS' : 'HT';
        const deptCode = f.dept === '行政部' ? 'XZ' : f.dept === '技术部' ? 'JS' : 'HR';
        const year = '2023';
        const seq = String(index + 1).padStart(3, '0');
        return {
          ...f,
          code: `${typeCode}-${deptCode}-${year}-${seq}`,
          status: '已生成'
        };
      });
      setFiles(newFiles);
    };

    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">自动编目</h2>
            <p className="text-sm text-gray-500">基于预设规则（分类-部门-年份-流水号）自动生成档案号。</p>
          </div>
          <div className="flex space-x-2">
             <select className="px-3 py-2 border border-gray-300 rounded text-sm bg-white">
               <option>规则：通用文书档案编码规则</option>
               <option>规则：科技档案编码规则</option>
             </select>
             <button 
               onClick={generateCode}
               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm text-sm font-medium hover:bg-blue-700"
             >
               <Play className="w-4 h-4 mr-2" /> 执行编目
             </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase w-10">
                  <input type="checkbox" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">文件名称</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">归档部门</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">档案类别</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase text-blue-600">生成档号 (预览)</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><input type="checkbox" /></td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{f.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{f.dept}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{f.type}</td>
                  <td className="px-6 py-4 text-sm font-mono text-blue-700 font-bold bg-blue-50">{f.code || '-'}</td>
                  <td className="px-6 py-4 text-xs">
                    <span className={`px-2 py-1 rounded ${f.status === '已生成' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- Sub-component: Virtual Boxing ---
  const VirtualBoxing = () => {
    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50 flex flex-col">
         <div className="mb-4 flex justify-between items-center">
            <div>
               <h2 className="text-xl font-bold text-gray-800">虚拟组卷/装盒</h2>
               <p className="text-sm text-gray-500">拖拽文件到右侧档案盒，模拟实体归档操作。</p>
            </div>
            <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm hover:bg-gray-50">
              <FolderPlus className="w-4 h-4 mr-2" /> 新建档案盒
            </button>
         </div>

         <div className="flex-1 flex space-x-6 overflow-hidden">
            {/* Left: Loose Files */}
            <div className="flex-1 bg-white rounded-lg shadow border border-gray-200 flex flex-col">
               <div className="p-3 border-b border-gray-200 bg-gray-100 font-bold text-gray-700 text-sm flex justify-between">
                 <span>待装盒散件 (3)</span>
                 <span className="text-xs font-normal text-gray-500">全选</span>
               </div>
               <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {['2023年技术部会议纪要.pdf', '服务器采购发票_No8823.jpg', '技术部年度预算表.xlsx'].map((f, i) => (
                    <div key={i} className="p-3 border border-gray-200 rounded bg-white hover:bg-blue-50 cursor-move flex items-center">
                       <FileText className="w-4 h-4 text-gray-400 mr-3" />
                       <span className="text-sm text-gray-700 truncate">{f}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Middle: Action */}
            <div className="flex flex-col justify-center">
               <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            {/* Right: Boxes */}
            <div className="flex-1 bg-white rounded-lg shadow border border-gray-200 flex flex-col">
               <div className="p-3 border-b border-gray-200 bg-gray-100 font-bold text-gray-700 text-sm">
                 档案盒列表
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 relative group cursor-pointer hover:shadow-md transition-shadow">
                     <div className="absolute top-0 right-0 bg-yellow-200 text-yellow-800 text-[10px] px-2 py-0.5 rounded-bl">盒号: 2023-001</div>
                     <div className="flex items-center mb-2">
                        <Box className="w-8 h-8 text-yellow-600 mr-3" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">2023年行政文书一类</div>
                           <div className="text-xs text-gray-500">保管期限: 永久 | 容量: 45/50</div>
                        </div>
                     </div>
                     <div className="h-2 bg-yellow-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full" style={{ width: '90%' }}></div>
                     </div>
                  </div>

                  <div className="border border-gray-200 bg-white rounded-lg p-4 relative group cursor-pointer hover:shadow-md transition-shadow border-dashed">
                     <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-bl">盒号: 2023-002</div>
                     <div className="flex items-center mb-2">
                        <Box className="w-8 h-8 text-gray-400 mr-3" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">2023年财务凭证(1月)</div>
                           <div className="text-xs text-gray-500">保管期限: 30年 | 容量: 12/50</div>
                        </div>
                     </div>
                     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '24%' }}></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  };

  // --- Sub-component: Value Appraisal ---
  const ValueAppraisal = () => {
    return (
      <div className="p-6 h-full overflow-y-auto bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-2">档案价值鉴定</h2>
        <p className="text-sm text-gray-500 mb-6">对已到期或即将到期的档案进行价值评估，决定其销毁或延长保管期限。</p>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
             <button className="px-6 py-3 text-sm font-bold text-red-600 border-b-2 border-red-600 bg-red-50">待销毁 (2)</button>
             <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">待移交 (0)</button>
             <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">延期审核 (1)</button>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">档号</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">档案名称</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">保管期限</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">到期时间</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase text-purple-600"><Sparkles className="w-3 h-3 inline mr-1"/>AI 建议</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-red-50 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-gray-500">XZ-2013-005</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">2013年车辆维修记录单</td>
                <td className="px-6 py-4 text-sm text-gray-600">10年</td>
                <td className="px-6 py-4 text-sm text-red-600 font-bold">2023-12-31</td>
                <td className="px-6 py-4 text-sm text-purple-700">
                   <div className="bg-purple-50 border border-purple-100 p-2 rounded text-xs max-w-[200px]">
                      内容无历史价值，建议销毁。
                   </div>
                </td>
                <td className="px-6 py-4 text-sm">
                   <button className="text-red-600 hover:text-red-800 font-medium text-xs border border-red-200 bg-white px-2 py-1 rounded shadow-sm flex items-center">
                      <Trash2 className="w-3 h-3 mr-1" /> 确认销毁
                   </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  switch (view) {
    case 'catalog': return <AutoCatalog />;
    case 'boxing': return <VirtualBoxing />;
    case 'appraisal': return <ValueAppraisal />;
    default: return <AutoCatalog />;
  }
};
