
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  BellOff,
  BookOpen,
  Mail,
  MessageSquare,
  Smartphone,
  Check,
  X,
  AlertTriangle,
  Trash
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockIncidents } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      incidents: true,
      resolved: true,
      dailyDigest: false,
    },
    push: {
      incidents: true,
      resolved: false,
      dailyDigest: false,
    },
    slack: {
      incidents: true,
      resolved: true,
      dailyDigest: true,
    }
  });

  // Generate mock notifications from the incident data
  const mockNotifications = mockIncidents.flatMap(incident => [
    {
      id: `notif-${incident.id}-1`,
      incidentId: incident.id,
      title: `New incident: ${incident.title}`,
      message: `A new ${incident.severity} severity incident has been created`,
      type: 'incident',
      timestamp: incident.createdAt,
      read: false,
      avatar: incident.assignees[0]?.name.split(' ').map(n => n[0]).join('') || 'SY'
    },
    {
      id: `notif-${incident.id}-2`,
      incidentId: incident.id,
      title: `Update on ${incident.id}`,
      message: incident.updates[incident.updates.length - 1]?.message || 'Status changed',
      type: 'update',
      timestamp: incident.updatedAt,
      read: Math.random() > 0.5,
      avatar: incident.assignees[0]?.name.split(' ').map(n => n[0]).join('') || 'SY'
    },
    ...(incident.status === 'resolved' ? [{
      id: `notif-${incident.id}-3`,
      incidentId: incident.id,
      title: `Incident ${incident.id} resolved`,
      message: `The ${incident.severity} severity incident has been marked as resolved`,
      type: 'resolved',
      timestamp: incident.resolvedAt || incident.updatedAt,
      read: true,
      avatar: incident.assignees[0]?.name.split(' ').map(n => n[0]).join('') || 'SY'
    }] : [])
  ]).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const unreadNotifications = mockNotifications.filter(n => !n.read);
  const readNotifications = mockNotifications.filter(n => n.read);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
  };

  const NotificationItem = ({ notification }: { notification: typeof mockNotifications[0] }) => {
    return (
      <div className={`p-4 flex gap-3 ${notification.read ? '' : 'bg-primary/5'}`}>
        <Avatar className="h-10 w-10">
          <AvatarFallback>{notification.avatar}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <Link to={`/incidents/${notification.incidentId}`} className="font-medium hover:text-primary">
              {notification.title}
            </Link>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{notification.message}</p>
          <div className="flex items-center gap-2 mt-1">
            {notification.type === 'incident' && (
              <Badge variant="outline" className="text-xs border-incident-critical text-incident-critical">
                New Incident
              </Badge>
            )}
            {notification.type === 'update' && (
              <Badge variant="outline" className="text-xs border-incident-high text-incident-high">
                Update
              </Badge>
            )}
            {notification.type === 'resolved' && (
              <Badge variant="outline" className="text-xs border-incident-resolved text-incident-resolved">
                Resolved
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Notification Preferences</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Check className="h-4 w-4" />
              Mark All as Read
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="unread">
                <div className="border-b px-4">
                  <TabsList className="mb-0 -mb-px">
                    <TabsTrigger value="unread" className="data-[state=active]:border-b-primary">
                      Unread ({unreadNotifications.length})
                    </TabsTrigger>
                    <TabsTrigger value="all" className="data-[state=active]:border-b-primary">
                      All ({mockNotifications.length})
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="unread" className="mt-0">
                  <ScrollArea className="h-[600px]">
                    {unreadNotifications.length > 0 ? (
                      <div className="divide-y">
                        {unreadNotifications.map(notification => (
                          <NotificationItem key={notification.id} notification={notification} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="rounded-full bg-primary/10 p-3 mb-4">
                          <BellOff className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">No unread notifications</h3>
                        <p className="text-muted-foreground mt-1">
                          You've read all your notifications!
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="all" className="mt-0">
                  <ScrollArea className="h-[600px]">
                    <div className="divide-y">
                      {mockNotifications.map(notification => (
                        <NotificationItem key={notification.id} notification={notification} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">New Incidents</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when new incidents are created
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.email.incidents}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({
                      ...notificationSettings,
                      email: { ...notificationSettings.email, incidents: checked }
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Resolved Incidents</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when incidents are resolved
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.email.resolved}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({
                      ...notificationSettings,
                      email: { ...notificationSettings.email, resolved: checked }
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of all incident activity
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.email.dailyDigest}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({
                      ...notificationSettings,
                      email: { ...notificationSettings.email, dailyDigest: checked }
                    })
                  }
                />
              </div>
              
              <div className="pt-4 flex items-center gap-2">
                <Input 
                  placeholder="Email address" 
                  defaultValue="user@example.com" 
                  className="max-w-sm" 
                />
                <Button>Update</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Incidents</Label>
                    <p className="text-sm text-muted-foreground">
                      Push alerts for new incidents
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.push.incidents}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({
                        ...notificationSettings,
                        push: { ...notificationSettings.push, incidents: checked }
                      })
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Resolved Incidents</Label>
                    <p className="text-sm text-muted-foreground">
                      Push alerts when incidents are resolved
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.push.resolved}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({
                        ...notificationSettings,
                        push: { ...notificationSettings.push, resolved: checked }
                      })
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Critical Only</Label>
                    <p className="text-sm text-muted-foreground">
                      Only send for critical severity incidents
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-2 flex items-center gap-2">
                  <Button className="w-full" variant="outline">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Manage Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Slack Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Incidents</Label>
                    <p className="text-sm text-muted-foreground">
                      Send to Slack when new incidents are created
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.slack.incidents}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({
                        ...notificationSettings,
                        slack: { ...notificationSettings.slack, incidents: checked }
                      })
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Resolved Incidents</Label>
                    <p className="text-sm text-muted-foreground">
                      Send to Slack when incidents are resolved
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.slack.resolved}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({
                        ...notificationSettings,
                        slack: { ...notificationSettings.slack, resolved: checked }
                      })
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Send a daily summary to Slack
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.slack.dailyDigest}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({
                        ...notificationSettings,
                        slack: { ...notificationSettings.slack, dailyDigest: checked }
                      })
                    }
                  />
                </div>
                
                <div className="pt-2 flex items-center gap-2">
                  <Button className="w-full">
                    Configure Slack Channels
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium bg-muted/50">
                    <div>Rule Name</div>
                    <div>Conditions</div>
                    <div>Channels</div>
                    <div>Created</div>
                    <div></div>
                  </div>
                  
                  <div className="divide-y">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">Critical Incidents</div>
                      <div className="text-sm">
                        Severity: Critical
                      </div>
                      <div className="text-sm flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Smartphone className="h-4 w-4" />
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">API Gateway Issues</div>
                      <div className="text-sm">
                        Service: API Gateway
                      </div>
                      <div className="text-sm flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-muted-foreground">5 days ago</div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">
                  Create New Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
