
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockIncidents, mockMetricsData } from '@/data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { AlertTriangle, CheckCircle2, Clock, Activity, TrendingUp, Calendar, Users, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, subDays } from 'date-fns';
import StatusBadge from '@/components/incidents/StatusBadge';
import SeverityBadge from '@/components/incidents/SeverityBadge';

const Dashboard = () => {
  const activeIncidents = mockIncidents.filter(incident => incident.status !== 'resolved');
  const criticalIncidents = mockIncidents.filter(incident => incident.severity === 'critical');
  
  const today = new Date();
  const lastWeek = subDays(today, 7);
  
  const recentIncidents = [...mockIncidents]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  const trending = [
    { name: 'Mon', incidents: 5 },
    { name: 'Tue', incidents: 7 },
    { name: 'Wed', incidents: 4 },
    { name: 'Thu', incidents: 8 },
    { name: 'Fri', incidents: 6 },
    { name: 'Sat', incidents: 3 },
    { name: 'Sun', incidents: 5 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-dark">Incident Hub Home</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="text-purple-medium border-purple-medium hover:bg-purple-light/20">
            Weekly Report
          </Button>
          <Button className="bg-purple-medium hover:bg-purple-dark">New Incident</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-light/30 to-grey-light border-purple-light/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-dark">Incident Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-grey-dark font-medium">Active Incidents</span>
                <span className="text-3xl font-bold text-purple-dark">{activeIncidents.length}</span>
                <span className="text-xs text-grey-medium mt-1">
                  {criticalIncidents.length > 0 ? 
                    `${criticalIncidents.length} critical needs attention` : 
                    'All systems operational'}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-grey-dark font-medium">YTD Incidents</span>
                <span className="text-3xl font-bold text-purple-dark">142</span>
                <span className="text-xs text-grey-medium mt-1">
                  <span className="text-green-600">↓ 8%</span> from last year
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-grey-dark font-medium">MTD Incidents</span>
                <span className="text-3xl font-bold text-purple-dark">23</span>
                <span className="text-xs text-grey-medium mt-1">
                  <span className="text-red-600">↑ 12%</span> from last month
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-grey-dark font-medium">Today</span>
                <span className="text-3xl font-bold text-purple-dark">3</span>
                <span className="text-xs text-grey-medium mt-1">
                  1 new in the past hour
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-medium" />
              Weekly Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trending}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="#7e69ab" 
                  fillOpacity={1} 
                  fill="url(#colorIncidents)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-medium" />
              Top Impacted Teams
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { team: 'Frontend', incidents: 12 },
                  { team: 'Backend', incidents: 19 },
                  { team: 'API', incidents: 7 },
                  { team: 'Database', incidents: 14 },
                  { team: 'DevOps', incidents: 10 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis 
                  dataKey="team" 
                  type="category" 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar dataKey="incidents" fill="#9b87f5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-purple-medium" />
            Recent Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-3 text-left font-medium">Incident</th>
                  <th className="p-3 text-left font-medium">Severity</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Created</th>
                  <th className="p-3 text-left font-medium">Assigned</th>
                  <th className="p-3 text-left font-medium">Tags</th>
                </tr>
              </thead>
              <tbody>
                {recentIncidents.map((incident) => (
                  <tr key={incident.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <Link to={`/incidents/${incident.id}`} className="hover:text-purple-medium transition-colors">
                        <div className="font-medium">{incident.title}</div>
                        <div className="text-xs text-muted-foreground">{incident.id}</div>
                      </Link>
                    </td>
                    <td className="p-3">
                      <SeverityBadge severity={incident.severity} />
                    </td>
                    <td className="p-3">
                      <StatusBadge status={incident.status} />
                    </td>
                    <td className="p-3 text-grey-dark">
                      {format(new Date(incident.createdAt), 'MMM d, h:mm a')}
                    </td>
                    <td className="p-3">
                      <div className="flex -space-x-2">
                        {incident.assignees.slice(0, 3).map(assignee => (
                          <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={assignee.avatarUrl} />
                            <AvatarFallback className="text-[10px]">
                              {assignee.name.split(' ').map(name => name[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {incident.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-purple-light/20 text-purple-dark hover:bg-purple-light/30">
                            {tag}
                          </Badge>
                        ))}
                        {incident.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{incident.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Link to="/incidents">
              <Button variant="outline">View All Incidents</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-medium" />
              Important Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-light/20 text-purple-dark rounded p-2 flex flex-col items-center">
                  <span className="text-xs font-bold">JUN</span>
                  <span className="text-lg font-bold">15</span>
                </div>
                <div>
                  <h4 className="font-medium">Quarterly Incident Review</h4>
                  <p className="text-sm text-grey-dark">Executive meeting to review Q2 incidents</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-light/20 text-purple-dark rounded p-2 flex flex-col items-center">
                  <span className="text-xs font-bold">JUN</span>
                  <span className="text-lg font-bold">22</span>
                </div>
                <div>
                  <h4 className="font-medium">System Maintenance</h4>
                  <p className="text-sm text-grey-dark">Scheduled downtime for DB cluster updates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-light/20 text-purple-dark rounded p-2 flex flex-col items-center">
                  <span className="text-xs font-bold">JUL</span>
                  <span className="text-lg font-bold">05</span>
                </div>
                <div>
                  <h4 className="font-medium">New Response Protocol</h4>
                  <p className="text-sm text-grey-dark">Updated incident response procedures go live</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-medium" />
              Service Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">API Gateway</span>
                </div>
                <span className="text-sm text-grey-dark">99.99% uptime</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">Authentication Service</span>
                </div>
                <span className="text-sm text-grey-dark">98.72% uptime</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">Database Cluster</span>
                </div>
                <span className="text-sm text-grey-dark">99.95% uptime</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">Frontend Web App</span>
                </div>
                <span className="text-sm text-grey-dark">100% uptime</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="font-medium">Notification Service</span>
                </div>
                <span className="text-sm text-grey-dark">96.35% uptime</span>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/services">
                <Button variant="outline" className="w-full">View All Services</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Hash className="h-5 w-5 text-purple-medium" />
              Top Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">23</span> api-failure
              </Badge>
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">19</span> database
              </Badge>
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">17</span> authentication
              </Badge>
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">14</span> network
              </Badge>
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">12</span> frontend
              </Badge>
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">10</span> deployment
              </Badge>
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">8</span> performance
              </Badge>
              <Badge variant="outline" className="bg-purple-light/10 border-purple-light text-purple-dark hover:bg-purple-light/20 py-2 px-3">
                <span className="mr-2 font-bold">7</span> scaling
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
