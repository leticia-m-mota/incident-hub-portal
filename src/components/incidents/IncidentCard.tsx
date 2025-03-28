
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Incident } from '@/types/incident';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import SeverityBadge from './SeverityBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const {
    id,
    title,
    status,
    severity,
    createdAt,
    updatedAt,
    assignees,
    affectedServices,
    tags
  } = incident;

  const formattedDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Link to={`/incidents/${id}`} className="text-lg font-medium hover:text-primary transition-colors">
              {title}
            </Link>
            <p className="text-sm text-muted-foreground">{id} • {formattedDate(createdAt)}</p>
          </div>
          <div className="flex gap-2">
            <StatusBadge status={status} />
            <SeverityBadge severity={severity} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">Affected Services:</p>
            <div className="flex flex-wrap gap-2">
              {affectedServices.map((service) => (
                <Badge key={service.id} variant="outline" className="text-xs">
                  {service.name}
                  <span className={`ml-1 w-2 h-2 rounded-full inline-block ${
                    service.status === 'operational' ? 'bg-incident-low' :
                    service.status === 'degraded' ? 'bg-incident-medium' : 'bg-incident-critical'
                  }`}></span>
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Assignees:</p>
            <div className="flex -space-x-2">
              {assignees.map((assignee) => (
                <Avatar key={assignee.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={assignee.avatarUrl} />
                  <AvatarFallback>
                    {assignee.name.split(' ').map(name => name[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
        <Link to={`/incidents/${id}`}>
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            Details <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default IncidentCard;
