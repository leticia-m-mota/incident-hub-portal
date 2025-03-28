
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IncidentStatus } from '@/types/incident';

interface StatusBadgeProps {
  status: IncidentStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = (status: IncidentStatus) => {
    switch (status) {
      case 'open':
        return { label: 'Open', variant: 'destructive' };
      case 'investigating':
        return { label: 'Investigating', variant: 'default' };
      case 'identified':
        return { label: 'Identified', variant: 'warning' };
      case 'monitoring':
        return { label: 'Monitoring', variant: 'outline' };
      case 'resolved':
        return { label: 'Resolved', variant: 'success' };
      default:
        return { label: status, variant: 'default' };
    }
  };

  const config = getStatusConfig(status);
  
  return (
    <Badge 
      variant={config.variant as any} 
      className={cn(
        status === 'open' && 'bg-incident-critical hover:bg-incident-critical/90',
        status === 'investigating' && 'bg-incident-high hover:bg-incident-high/90',
        status === 'identified' && 'bg-incident-medium hover:bg-incident-medium/90 text-black',
        status === 'monitoring' && 'bg-blue-400 hover:bg-blue-400/90 text-white',
        status === 'resolved' && 'bg-incident-resolved hover:bg-incident-resolved/90',
        className
      )}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
