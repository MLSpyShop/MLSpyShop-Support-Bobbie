export type AudienceRole = 'client' | 'visitor' | 'staff';

export interface GroundingSource {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  audienceRole?: AudienceRole;
  sources?: GroundingSource[];
  searchQueries?: string[];
  browsedTarget?: string;
  isStreaming?: boolean;
}

export interface SiteIntelCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface SiteStatus {
  online: boolean;
  status?: number;
  latencyMs?: number;
  target: string;
  checkedAt: string;
  simulated?: boolean;
}
