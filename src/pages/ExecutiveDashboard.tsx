
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Clock, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ExecutiveDashboard = () => {
  // Count incidents by status
  const incidentsByStatus = {
    open: mockIncidents.filter(i => i.status === 'open').length,
    investigating: mockIncidents.filter(i => i.status === 'investigating').length,
    identified: mockIncidents.filter(i => i.status === 'identified').length,
    monitoring: mockIncidents.filter(i => i.status === 'monitoring').length,
    resolved: mockIncidents.filter(i => i.status === 'resolved').length,
  };
  
  // Count incidents by severity
  const incidentsBySeverity = {
    critical: mockIncidents.filter(i => i.severity === 'critical').length,
    high: mockIncidents.filter(i => i.severity === 'high').length,
    medium: mockIncidents.filter(i => i.severity === 'medium').length,
    low: mockIncidents.filter(i => i.severity === 'low').length,
  };
  
  const timeToResolve = [
    { name: 'Critical', time: 4.2 },
    { name: 'High', time: 8.5 },
    { name: 'Medium', time: 24.0 },
    { name: 'Low', time: 48.3 },
  ];
  
  const mttrTrend = [
    { month: 'Jan', critical: 5.1, high: 9.3, medium: 25.2, low: 50.1 },
    { month: 'Feb', critical: 4.8, high: 9.0, medium: 24.5, low: 49.0 },
    { month: 'Mar', critical: 4.9, high: 8.9, medium: 24.0, low: 48.5 },
    { month: 'Apr', critical: 4.5, high: 8.7, medium: 24.3, low: 49.2 },
    { month: 'May', critical: 4.3, high: 8.6, medium: 24.2, low: 48.8 },
    { month: 'Jun', critical: 4.2, high: 8.5, medium: 24.0, low: 48.3 },
  ];
  
  const incidentVolume = [
    { month: 'Jan', count: 28 },
    { month: 'Feb', count: 22 },
    { month: 'Mar', count: 25 },
    { month: 'Apr', count: 31 },
    { month: 'May', count: 27 },
    { month: 'Jun', count: 23 },
  ];
  
  const COLORS = ['#FF3A33', '#FF8C00', '#FFD700', '#90EE90', '#7e69ab'];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-dark">Executive Dashboard</h1>
        <div className="flex gap-2">
          <Select defaultValue="last30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="last90">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Total Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockIncidents.length}</div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="text-red-500 h-4 w-4 mr-1" />
              <span className="text-red-500 font-medium">12%</span>
              <span className="text-muted-foreground ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Critical Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{incidentsBySeverity.critical}</div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowDown className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">5%</span>
              <span className="text-muted-foreground ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Avg. Time to Resolve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4h 12m</div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowDown className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">15%</span>
              <span className="text-muted-foreground ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">System Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.94%</div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
              <span className="text-green-500 font-medium">0.2%</span>
              <span className="text-muted-foreground ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Incident Volume Trend</CardTitle>
            <CardDescription>Monthly comparison of incident count</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={incidentVolume}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="count" 
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
            <CardTitle>Incidents by Status</CardTitle>
            <CardDescription>Current status distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Open', value: incidentsByStatus.open },
                    { name: 'Investigating', value: incidentsByStatus.investigating },
                    { name: 'Identified', value: incidentsByStatus.identified },
                    { name: 'Monitoring', value: incidentsByStatus.monitoring },
                    { name: 'Resolved', value: incidentsByStatus.resolved }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={70}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {Object.values(incidentsByStatus).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Severity</CardTitle>
            <CardDescription>Distribution across severity levels</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Critical', value: incidentsBySeverity.critical },
                  { name: 'High', value: incidentsBySeverity.high },
                  { name: 'Medium', value: incidentsBySeverity.medium },
                  { name: 'Low', value: incidentsBySeverity.low },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {[
                    { name: 'Critical', fill: '#FF3A33' },
                    { name: 'High', fill: '#FF8C00' },
                    { name: 'Medium', fill: '#FFD700' },
                    { name: 'Low', fill: '#90EE90' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mean Time to Resolution (Hours)</CardTitle>
          <CardDescription>Average time to resolve incidents by severity</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mttrTrend}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="critical" 
                name="Critical" 
                stroke="#FF3A33" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="high" 
                name="High" 
                stroke="#FF8C00" 
              />
              <Line 
                type="monotone" 
                dataKey="medium" 
                name="Medium" 
                stroke="#FFD700" 
              />
              <Line 
                type="monotone" 
                dataKey="low" 
                name="Low" 
                stroke="#90EE90" 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Impact Areas</CardTitle>
            <CardDescription>Most affected business areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">API Services</span>
                <span className="text-sm">32%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-medium h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Database Cluster</span>
                <span className="text-sm">24%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-medium h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Authentication</span>
                <span className="text-sm">18%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-medium h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Frontend Services</span>
                <span className="text-sm">15%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-medium h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Notification System</span>
                <span className="text-sm">11%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-medium h-2 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Incident Origin</CardTitle>
            <CardDescription>Source of incident detection</CardDescription>
          </CardHeader>
          <CardContent className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Monitoring Alert', value: 42 },
                    { name: 'Customer Report', value: 28 },
                    { name: 'Internal User', value: 19 },
                    { name: 'Automated Test', value: 11 },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {[
                    { name: 'Monitoring Alert', fill: '#9b87f5' },
                    { name: 'Customer Report', fill: '#7e69ab' },
                    { name: 'Internal User', fill: '#6e59a5' },
                    { name: 'Automated Test', fill: '#d6bcfa' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Response efficiency by team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">DevOps Team</span>
                  <span className="text-sm text-green-600">90%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Backend Team</span>
                  <span className="text-sm text-green-600">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Frontend Team</span>
                  <span className="text-sm text-yellow-600">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">QA Team</span>
                  <span className="text-sm text-yellow-600">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Security Team</span>
                  <span className="text-sm text-red-600">65%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
