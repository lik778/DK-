
export enum FileType {
  FOLDER = 'FOLDER',
  PDF = 'PDF',
  DOCX = 'DOCX',
  XLSX = 'XLSX',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  DWG = 'DWG',
  UNKNOWN = 'UNKNOWN'
}

export type SecurityLevel = '公开' | '内部' | '秘密' | '机密';

export interface FileNode {
  id: string;
  parentId: string | null;
  name: string;
  type: FileType;
  size?: string;
  updatedAt: string;
  owner: string; // User ID
  securityLevel: SecurityLevel;
  permissions: 'read' | 'write' | 'admin' | 'none'; // Current user's permission
  content?: string;
  children?: string[];
  tags?: string[];
  version?: string; // v1.0
  archiveCode?: string; // 档号
  canDownload?: boolean;
  canPrint?: boolean;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  status: 'active' | 'disabled';
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: 'LOGIN' | 'VIEW' | 'DOWNLOAD' | 'MODIFY' | 'DELETE' | 'BORROW_APPLY' | 'BORROW_APPROVE';
  target: string;
  timestamp: string;
  ip: string;
}

export interface BorrowRequest {
  id: string;
  userId: string;
  userName: string;
  fileId: string;
  fileName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  expiryDate?: string;
  approver?: string;
  approveDate?: string;
}

export interface DisposalRecord {
  id: string;
  fileName: string;
  archiveCode: string;
  retentionPeriod: string; 
  expireDate: string;
  status: 'pending_approval' | 'approved' | 'destroyed' | 'transferred';
  type: 'destruction' | 'transfer';
  applicant: string;
  applyDate: string;
}

export interface CompilationTopic {
  id: string;
  title: string;
  description: string;
  fileCount: number;
  creator: string;
  createDate: string;
  status: 'draft' | 'published';
}

export interface AdvancedSearchParams {
  keyword?: string;
  archiveCode?: string;
  owner?: string;
  dateFrom?: string;
  dateTo?: string;
  securityLevel?: string;
}

export type SystemModule = 'archives' | 'collection' | 'organize' | 'storage' | 'borrow' | 'stats' | 'disposal' | 'system';
