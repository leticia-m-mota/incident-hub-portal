import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockIncidents } from '@/data/mockData';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Globe, 
  Tag, 
  User, 
  ChevronLeft,
  BarChart,
  MessageSquare,
  AlertCircle,
  Edit,
  Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StatusBadge from '@/components/incidents/StatusBadge';
import SeverityBadge from '@/components/incidents/SeverityBadge';
import IncidentTimeline from '@/components/incidents/IncidentTimeline';
import { format } from 'date-fns';
import { Input } from "antd";

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const incident = mockIncidents.find(inc => inc.id === id);
  
  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Incident Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The incident you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/incidents">
          <Button>Back to Incidents</Button>
        </Link>
      </div>
    );
  }
  
  const formattedDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/incidents">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-2xl font-bold">{incident.title}</h2>
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Edit className="h-4 w-4" /> Edit Incident
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <MessageSquare className="h-4 w-4" /> Add Update
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2 cursor-pointer text-destructive focus:text-destructive">
                <Trash className="h-4 w-4" /> Delete Incident
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      {incident.id}
                    </span>
                    <StatusBadge status={incident.status} />
                    <SeverityBadge severity={incident.severity} />
                  </div>
                  <CardTitle>{incident.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-6">{incident.description}</p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Opened</p>
                    <p className="text-muted-foreground">{formattedDate(incident.createdAt)}</p>
                  </div>
                </div>
                
                {incident.resolvedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Resolved</p>
                      <p className="text-muted-foreground">{formattedDate(incident.resolvedAt)}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Detection</p>
                    <p className="text-muted-foreground">{incident.detectionSource}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visibility</p>
                    <p className="text-muted-foreground capitalize">{incident.visibility}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="timeline">
            <TabsList className="mb-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="affected">Affected Services</TabsTrigger>
              <TabsTrigger value="related">Related Items</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline">
              <Card>
                <CardContent className="pt-6">
                  <IncidentTimeline updates={incident.updates} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="affected">
              <Card>
                <CardHeader>
                  <CardTitle>Affected Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {incident.affectedServices.map(service => (
                      <Card key={service.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              service.status === 'operational' ? 'bg-incident-low' :
                              service.status === 'degraded' ? 'bg-incident-medium' : 'bg-incident-critical'
                            }`} />
                            <span>{service.name}</span>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {service.status}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="related">
              <Card>
                <CardHeader>
                  <CardTitle>Related Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Related Links</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <span>Incident Postmortem Document</span>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Open
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <span>Runbook: API Gateway Recovery</span>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Related Metrics</h4>
                      <div className="p-3 border rounded-md text-center">
                        <div className="flex items-center justify-center p-12 text-muted-foreground">
                          <BarChart className="h-8 w-8 mr-2" />
                          <span>Metrics visualization would display here</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Assignees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incident.assignees.map(assignee => (
                  <div key={assignee.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={assignee.avatarUrl} />
                        <AvatarFallback>
                          {assignee.name.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{assignee.name}</p>
                        <p className="text-xs text-muted-foreground">{assignee.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  Assign More
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {incident.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <Input placeholder="Add tag..." className="text-sm h-8" />
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Subscribe to Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Email address" className="text-sm" />
                <Button>Subscribe</Button>
              </div>
              <div className="text-xs text-muted-foreground">
                You'll receive email notifications when this incident is updated.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
