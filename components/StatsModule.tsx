
import React, { useState } from 'react';
import { BarChart, Download, Printer, Book, FilePlus, Filter, Search } from 'lucide-react';
import { MOCK_COMPILATION_TOPICS } from '../constants';

interface StatsModuleProps {
  view: string;
}

export const StatsModule: React.FC<StatsModuleProps> = ({ view }) => {

  // --- Sub-component: General Stats ---
  const GeneralStats = () => (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">综合统计报表</h2>
        <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm text-gray-700 hover:bg-gray-50">
          <Printer className="w-4 h-4 mr-2" /> 打印报表
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-blue-500">
           <div className="text-gray-500 text-sm uppercase font-semibold mb-1">馆藏总量</div>
           <div className="text-3xl font-bold text-gray-800">12,450 <span className="text-sm font-normal text-gray-400">卷</span></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-green-500">
           <div className="text-gray-500 text-sm uppercase font-semibold mb-1">数字化率</div>
           <div className="text-3xl font-bold text-gray-800">98.5 <span className="text-sm font-normal text-gray-400">%</span></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-purple-500">
           <div className="text-gray-500 text-sm uppercase font-semibold mb-1">本月借阅人次</div>
           <div className="text-3xl font-bold text-gray-800">342 <span className="text-sm font-normal text-gray-400">次</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">各部门档案数量统计</h3>
          <div className="space-y-4">
            {['人力资源部', '财务部', '信息技术部', '研发部', '行政部'].map((dept, idx) => {
               const w = [65, 40, 80, 90, 30][idx];
               const count = [1200, 850, 2400, 3100, 400][idx];
               return (
                 <div key={dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{dept}</span>
                      <span className="text-gray-500">{count} 份</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${w}%` }}></div>
                    </div>
                 </div>
               )
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">存储空间使用情况</h3>
           <div className="flex items-center justify-center h-48">
              <div className="w-32 h-32 rounded-full border-8 border-gray-200 border-t-blue-600 border-r-blue-600 transform -rotate-45 flex items-center justify-center">
                 <div className="text-center">
                   <div className="text-2xl font-bold text-gray-800">75%</div>
                   <div className="text-xs text-gray-500">已使用</div>
                 </div>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4 text-center mt-4">
              <div>
                <div className="text-xs text-gray-500">图片/视频</div>
                <div className="font-semibold">450 GB</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">文档/PDF</div>
                <div className="font-semibold">300 GB</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  // --- Sub-component: Custom Reports ---
  const CustomReports = () => (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">自定义报表生成器</h2>
          <p className="text-sm text-gray-500">选择统计维度和指标，实时生成业务报表。</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">统计维度 (X轴)</label>
             <select className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm">
                <option>归档部门</option>
                <option>档案年度</option>
                <option>保管期限</option>
                <option>档案密级</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">统计指标 (Y轴)</label>
             <select className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm">
                <option>档案数量 (卷/件)</option>
                <option>存储大小 (MB/GB)</option>
                <option>借阅次数</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">图表类型</label>
             <div className="flex space-x-2">
               <button className="flex-1 border border-blue-500 bg-blue-50 text-blue-700 rounded px-3 py-2 text-sm font-medium">柱状图</button>
               <button className="flex-1 border border-gray-300 bg-white text-gray-700 rounded px-3 py-2 text-sm font-medium">饼图</button>
               <button className="flex-1 border border-gray-300 bg-white text-gray-700 rounded px-3 py-2 text-sm font-medium">折线图</button>
             </div>
           </div>
        </div>
        <div className="flex justify-end border-t border-gray-100 pt-4">
           <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 font-medium text-sm">
             <BarChart className="w-4 h-4 mr-2" /> 生成报表
           </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col items-center justify-center h-64 text-gray-400">
         <BarChart className="w-16 h-16 mb-3 opacity-20" />
         <p>请配置统计条件并点击“生成报表”</p>
      </div>
    </div>
  );

  // --- Sub-component: Compilation ---
  const Compilation = () => (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">专题汇编</h2>
          <p className="text-sm text-gray-500">将分散的档案信息汇编成专题目录或电子出版物。</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm font-medium text-sm hover:bg-blue-700">
          <FilePlus className="w-4 h-4 mr-2" /> 新建汇编专题
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_COMPILATION_TOPICS.map(topic => (
          <div key={topic.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex justify-between items-center">
             <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                   <Book className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-gray-800">{topic.title}</h3>
                   <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                   <div className="flex items-center mt-3 space-x-4 text-xs text-gray-400">
                      <span>创建人: {topic.creator}</span>
                      <span>创建时间: {topic.createDate}</span>
                      <span>包含文件: {topic.fileCount} 份</span>
                   </div>
                </div>
             </div>
             <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${topic.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {topic.status === 'published' ? '已发布' : '草稿'}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">
                  查看详情
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  switch (view) {
    case 'custom': return <CustomReports />;
    case 'compilation': return <Compilation />;
    case 'general':
    default: return <GeneralStats />;
  }
};
