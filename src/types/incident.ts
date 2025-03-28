
export type IncidentStatus = 'open' | 'investigating' | 'identified' | 'monitoring' | 'resolved';
export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentVisibility = 'public' | 'internal' | 'restricted';

export interface IncidentUpdate {
  id: string;
  incidentId: string;
  message: string;
  status: IncidentStatus;
  createdAt: string;
  createdBy: string;
}

export interface IncidentAssignee {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface AffectedService {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage';
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  visibility: IncidentVisibility;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  detectionSource: string;
  assignees: IncidentAssignee[];
  affectedServices: AffectedService[];
  updates: IncidentUpdate[];
  tags: string[];
}
