
import React, { useState } from 'react';
import { mockIncidents } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, Plus, Search } from 'lucide-react';
import { Incident, IncidentSeverity, IncidentStatus } from '@/types/incident';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import StatusBadge from '@/components/incidents/StatusBadge';
import SeverityBadge from '@/components/incidents/SeverityBadge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Incidents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<IncidentStatus[]>([]);
  const [severityFilter, setSeverityFilter] = useState<IncidentSeverity[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const handleStatusFilterChange = (status: IncidentStatus) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  const handleSeverityFilterChange = (severity: IncidentSeverity) => {
    if (severityFilter.includes(severity)) {
      setSeverityFilter(severityFilter.filter(s => s !== severity));
    } else {
      setSeverityFilter([...severityFilter, severity]);
    }
  };

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(incident.status);
    const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(incident.severity);
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'severity') {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return 0;
  });

  const formattedDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search incidents..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2 font-medium">Status</div>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('open')}
                  onCheckedChange={() => handleStatusFilterChange('open')}
                >
                  Open
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('investigating')}
                  onCheckedChange={() => handleStatusFilterChange('investigating')}
                >
                  Investigating
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('identified')}
                  onCheckedChange={() => handleStatusFilterChange('identified')}
                >
                  Identified
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('monitoring')}
                  onCheckedChange={() => handleStatusFilterChange('monitoring')}
                >
                  Monitoring
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('resolved')}
                  onCheckedChange={() => handleStatusFilterChange('resolved')}
                >
                  Resolved
                </DropdownMenuCheckboxItem>
                
                <div className="p-2 font-medium">Severity</div>
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('critical')}
                  onCheckedChange={() => handleSeverityFilterChange('critical')}
                >
                  Critical
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('high')}
                  onCheckedChange={() => handleSeverityFilterChange('high')}
                >
                  High
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('medium')}
                  onCheckedChange={() => handleSeverityFilterChange('medium')}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('low')}
                  onCheckedChange={() => handleSeverityFilterChange('low')}
                >
                  Low
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="severity">Severity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Incident
        </Button>
      </div>
      
      {sortedIncidents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No incidents found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Incident</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[120px]">Severity</TableHead>
                <TableHead className="w-[180px]">Created</TableHead>
                <TableHead className="w-[160px]">Services</TableHead>
                <TableHead className="w-[130px]">Assignees</TableHead>
                <TableHead className="w-[130px]">Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedIncidents.map(incident => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">
                    <Link to={`/incidents/${incident.id}`} className="hover:text-primary transition-colors">
                      <div className="font-medium">{incident.title}</div>
                      <div className="text-sm text-muted-foreground">{incident.id}</div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={incident.status} />
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={incident.severity} />
                  </TableCell>
                  <TableCell>
                    {formattedDate(incident.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {incident.affectedServices.slice(0, 2).map(service => (
                        <Badge key={service.id} variant="outline" className="text-xs">
                          {service.name}
                          <span className={`ml-1 w-2 h-2 rounded-full inline-block ${
                            service.status === 'operational' ? 'bg-incident-low' :
                            service.status === 'degraded' ? 'bg-incident-medium' : 'bg-incident-critical'
                          }`}></span>
                        </Badge>
                      ))}
                      {incident.affectedServices.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{incident.affectedServices.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {incident.assignees.slice(0, 3).map(assignee => (
                        <Avatar key={assignee.id} className="h-7 w-7 border-2 border-background">
                          <AvatarImage src={assignee.avatarUrl} />
                          <AvatarFallback>
                            {assignee.name.split(' ').map(name => name[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {incident.assignees.length > 3 && (
                        <Avatar className="h-7 w-7 border-2 border-background">
                          <AvatarFallback>+{incident.assignees.length - 3}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {incident.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {incident.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{incident.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Incidents;
