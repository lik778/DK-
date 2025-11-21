
import { FileNode, FileType, User, AuditLog, BorrowRequest, DisposalRecord, CompilationTopic } from './types';

export const MOCK_USERS: User[] = [
  { id: 'admin', name: '系统管理员', role: 'admin', department: '信息技术部', status: 'active' },
  { id: 'manager_li', name: '李经理', role: 'manager', department: '人力资源部', status: 'active' },
  { id: 'manager_wang', name: '王总监', role: 'manager', department: '财务部', status: 'active' },
  { id: 'user_zhang', name: '张工', role: 'user', department: '研发部', status: 'active' },
];

export const MOCK_LOGS: AuditLog[] = [
  { id: 'log-001', userId: 'manager_li', userName: '李经理', action: 'LOGIN', target: '系统', timestamp: '2023-11-28 08:30:00', ip: '192.168.1.101' },
  { id: 'log-002', userId: 'user_zhang', userName: '张工', action: 'VIEW', target: '技术规格说明书_v2.docx', timestamp: '2023-11-28 09:15:22', ip: '192.168.1.105' },
  { id: 'log-003', userId: 'manager_wang', userName: '王总监', action: 'DOWNLOAD', target: '2023_Q3财务分析报告.docx', timestamp: '2023-11-28 10:05:00', ip: '192.168.1.102' },
  { id: 'log-004', userId: 'admin', userName: '系统管理员', action: 'MODIFY', target: '系统配置', timestamp: '2023-11-28 11:00:00', ip: '192.168.1.100' },
];

export const MOCK_BORROW_REQUESTS: BorrowRequest[] = [
  { id: 'req-001', userId: 'user_zhang', userName: '张工', fileId: 'hr-policy', fileName: '2024员工行为规范手册.pdf', reason: '项目参考', status: 'approved', requestDate: '2023-11-27', expiryDate: '2023-12-04' },
  { id: 'req-002', userId: 'user_zhang', userName: '张工', fileId: 'fin-q3-report', fileName: '2023_Q3财务分析报告.docx', reason: '跨部门协作', status: 'pending', requestDate: '2023-11-28' },
];

export const MOCK_DISPOSAL_RECORDS: DisposalRecord[] = [
  { id: 'dsp-001', fileName: '2012年员工考勤表.xlsx', archiveCode: 'HR-2012-055', retentionPeriod: '10年', expireDate: '2022-12-31', status: 'pending_approval', type: 'destruction', applicant: '李经理', applyDate: '2023-11-01' },
  { id: 'dsp-002', fileName: '旧版服务器采购合同.pdf', archiveCode: 'IT-2010-003', retentionPeriod: '10年', expireDate: '2020-12-31', status: 'destroyed', type: 'destruction', applicant: '系统管理员', applyDate: '2021-01-15' },
  { id: 'trf-001', fileName: '公司成立批文原件.pdf', archiveCode: 'XZ-1998-001', retentionPeriod: '永久', expireDate: '-', status: 'pending_approval', type: 'transfer', applicant: '档案管理员', applyDate: '2023-11-20' }
];

export const MOCK_COMPILATION_TOPICS: CompilationTopic[] = [
  { id: 'top-001', title: '2023年度重大项目汇编', description: '包含Alpha项目、Beta项目的所有关键技术文档和验收报告。', fileCount: 45, creator: '张工', createDate: '2023-10-01', status: 'published' },
  { id: 'top-002', title: '公司制度汇编 (2024版)', description: '汇总行政、人事、财务最新发布的管理制度。', fileCount: 12, creator: '李经理', createDate: '2023-11-15', status: 'draft' }
];

export const MOCK_FILE_SYSTEM: Record<string, FileNode> = {
  'root': {
    id: 'root',
    parentId: null,
    name: '企业文档中心',
    type: FileType.FOLDER,
    updatedAt: '2023-01-01',
    owner: 'admin',
    securityLevel: '公开',
    permissions: 'admin',
    children: ['dept-hr', 'dept-finance', 'dept-it', 'project-alpha']
  },
  'dept-hr': {
    id: 'dept-hr',
    parentId: 'root',
    name: '人力资源部',
    type: FileType.FOLDER,
    updatedAt: '2023-10-15',
    owner: 'manager_li',
    securityLevel: '内部',
    permissions: 'read',
    children: ['hr-policy', 'hr-employees']
  },
  'hr-policy': {
    id: 'hr-policy',
    parentId: 'dept-hr',
    name: '2024员工行为规范手册.pdf',
    type: FileType.PDF,
    size: '2.4 MB',
    updatedAt: '2023-12-01',
    owner: 'manager_li',
    securityLevel: '公开',
    permissions: 'read',
    version: 'v2.1',
    archiveCode: 'HR-2023-001',
    content: "欢迎加入公司。本手册概述了我们的行为准则、福利待遇、休假制度以及IT安全规范。所有员工都应互相尊重，并严格遵守数据隐私相关法律法规。包括考勤制度、绩效考核标准等详细说明。"
  },
  'hr-employees': {
    id: 'hr-employees',
    parentId: 'dept-hr',
    name: 'Q4员工花名册.xlsx',
    type: FileType.XLSX,
    size: '45 KB',
    updatedAt: '2023-11-20',
    owner: 'manager_li',
    securityLevel: '机密',
    permissions: 'none', // User requires borrowing
    version: 'v1.0',
    archiveCode: 'HR-2023-002',
    content: "包含姓名、身份证号、薪资等级等敏感信息。"
  },
  'dept-finance': {
    id: 'dept-finance',
    parentId: 'root',
    name: '财务部',
    type: FileType.FOLDER,
    updatedAt: '2023-10-10',
    owner: 'manager_wang',
    securityLevel: '内部',
    permissions: 'read',
    children: ['fin-q3-report', 'fin-invoice-template']
  },
  'fin-q3-report': {
    id: 'fin-q3-report',
    parentId: 'dept-finance',
    name: '2023_Q3财务分析报告.docx',
    type: FileType.DOCX,
    size: '1.2 MB',
    updatedAt: '2023-10-25',
    owner: 'manager_wang',
    securityLevel: '秘密',
    permissions: 'none', // Requires borrowing
    version: 'v3.0',
    archiveCode: 'FIN-2023-Q3',
    content: "第三季度财务结果显示，收入同比增长15%。由于供应链管理的优化，运营费用下降了5%。净利润率目前保持在22%。主要增长点来自于华东市场的业务拓展。"
  },
  'fin-invoice-template': {
    id: 'fin-invoice-template',
    parentId: 'dept-finance',
    name: '增值税发票开具模板.docx',
    type: FileType.DOCX,
    size: '15 KB',
    updatedAt: '2023-01-15',
    owner: 'admin',
    securityLevel: '公开',
    permissions: 'read',
    version: 'v1.0',
    archiveCode: 'SYS-TMP-001'
  },
  'dept-it': {
    id: 'dept-it',
    parentId: 'root',
    name: '信息技术部',
    type: FileType.FOLDER,
    updatedAt: '2023-09-01',
    owner: 'admin',
    securityLevel: '内部',
    permissions: 'admin',
    children: ['it-server-logs', 'it-security-audit']
  },
  'it-server-logs': {
    id: 'it-server-logs',
    parentId: 'dept-it',
    name: '服务器运行日志_2023.txt',
    type: FileType.TEXT,
    size: '500 MB',
    updatedAt: '2023-10-27',
    owner: 'admin',
    securityLevel: '秘密',
    permissions: 'admin',
    version: 'v1.0',
    archiveCode: 'IT-LOG-2023',
    content: "[INFO] Server started at 00:00:01. [WARN] Memory usage high at 04:00:00. [ERROR] Database connection timeout at 04:05:00. [INFO] Service restarted successfully."
  },
  'it-security-audit': {
    id: 'it-security-audit',
    parentId: 'dept-it',
    name: '年度网络安全审计报告.pdf',
    type: FileType.PDF,
    size: '5.6 MB',
    updatedAt: '2023-11-05',
    owner: 'admin',
    securityLevel: '机密',
    permissions: 'read',
    version: 'v2.0',
    archiveCode: 'IT-AUD-2023',
    content: "年度安全审计结论显示，系统符合 ISO 27001 标准。在旧版薪资模块中发现了轻微漏洞，需要在30天内完成补丁更新。建议加强员工的双因素认证培训。"
  },
  'project-alpha': {
    id: 'project-alpha',
    parentId: 'root',
    name: '阿尔法(Alpha)项目组',
    type: FileType.FOLDER,
    updatedAt: '2023-11-01',
    owner: 'user_zhang',
    securityLevel: '内部',
    permissions: 'write',
    children: ['alpha-specs', 'alpha-design']
  },
  'alpha-specs': {
    id: 'alpha-specs',
    parentId: 'project-alpha',
    name: '技术规格说明书_v2.docx',
    type: FileType.DOCX,
    size: '3.4 MB',
    updatedAt: '2023-11-10',
    owner: 'user_zhang',
    securityLevel: '内部',
    permissions: 'write',
    version: 'v2.2',
    archiveCode: 'PRJ-ALP-001',
    content: "Alpha 项目旨在彻底改革我们的客户导入流程。关键组件包括 React 前端、Node.js 后端以及用于文档解析的 Gemini AI 集成。系统需支持高并发访问。"
  },
  'alpha-design': {
    id: 'alpha-design',
    parentId: 'project-alpha',
    name: 'UI_交互设计稿.png',
    type: FileType.IMAGE,
    size: '12 MB',
    updatedAt: '2023-11-12',
    owner: 'user_zhang',
    securityLevel: '内部',
    permissions: 'write',
    version: 'v1.5',
    archiveCode: 'PRJ-ALP-002'
  }
};
