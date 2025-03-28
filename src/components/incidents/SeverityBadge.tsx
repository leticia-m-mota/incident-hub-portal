
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IncidentSeverity } from '@/types/incident';

interface SeverityBadgeProps {
  severity: IncidentSeverity;
  className?: string;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, className }) => {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium',
        severity === 'critical' && 'border-incident-critical text-incident-critical',
        severity === 'high' && 'border-incident-high text-incident-high',
        severity === 'medium' && 'border-incident-medium text-incident-medium',
        severity === 'low' && 'border-incident-low text-incident-low',
        className
      )}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
};

export default SeverityBadge;
