
import React from 'react';
import { format } from 'date-fns';
import { IncidentUpdate } from '@/types/incident';
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from './StatusBadge';

interface IncidentTimelineProps {
  updates: IncidentUpdate[];
}

const IncidentTimeline: React.FC<IncidentTimelineProps> = ({ updates }) => {
  // Sort updates by createdAt in descending order (newest first)
  const sortedUpdates = [...updates].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Incident Timeline</h3>
      
      <div className="space-y-3">
        {sortedUpdates.map((update, index) => (
          <Card key={update.id} className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" 
                 style={{ display: index === sortedUpdates.length - 1 ? 'none' : 'block' }} />
            
            <CardContent className="pt-6 pl-12 relative">
              <div className="absolute left-5 top-6 w-3 h-3 rounded-full bg-primary z-10" />
              
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium text-sm flex items-center gap-3">
                  <span>{update.createdBy}</span>
                  <StatusBadge status={update.status} className="text-xs" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(update.createdAt), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
              
              <p className="text-sm">{update.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IncidentTimeline;
