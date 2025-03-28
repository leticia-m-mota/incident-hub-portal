
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
import IncidentCard from '@/components/incidents/IncidentCard';
import { Incident, IncidentSeverity, IncidentStatus } from '@/types/incident';

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
      
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {sortedIncidents.map(incident => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
        
        {sortedIncidents.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No incidents found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Incidents;
