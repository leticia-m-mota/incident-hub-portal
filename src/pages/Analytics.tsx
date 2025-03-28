
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockMetricsData, mockIncidents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { FileText, DownloadCloud, Share2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState('6m');
  
  const mttrByMonth = [
    { month: 'Jan', critical: 120, high: 180, medium: 300, low: 480 },
    { month: 'Feb', critical: 110, high: 170, medium: 320, low: 460 },
    { month: 'Mar', critical: 130, high: 190, medium: 280, low: 500 },
    { month: 'Apr', critical: 100, high: 160, medium: 270, low: 450 },
    { month: 'May', critical: 90, high: 150, medium: 260, low: 430 },
    { month: 'Jun', critical: 85, high: 140, medium: 250, low: 420 },
  ];
  
  // Calculate some basic statistics
  const totalIncidents = mockIncidents.length;
  const resolvedIncidents = mockIncidents.filter(i => i.status === 'resolved').length;
  const criticalIncidents = mockIncidents.filter(i => i.severity === 'critical').length;
  const highIncidents = mockIncidents.filter(i => i.severity === 'high').length;
  
  const resolvedRate = Math.round((resolvedIncidents / totalIncidents) * 100);
  
  const COLORS = ['#FF3A33', '#FF8C00', '#FFD700', '#90EE90'];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Analytics & Reporting</h1>
        
        <div className="flex gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIncidents}</div>
            <p className="text-xs text-muted-foreground">
              +{mockMetricsData.incidentsByMonth[5].count} in the last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3h 45m</div>
            <p className="text-xs text-muted-foreground">
              -15% from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedRate}%</div>
            <p className="text-xs text-muted-foreground">
              {resolvedIncidents} of {totalIncidents} incidents resolved
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalIncidents}</div>
            <p className="text-xs text-muted-foreground">
              {highIncidents} high severity incidents
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="services">Service Health</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Incidents by Month</CardTitle>
                <CardDescription>Total incident volume over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMetricsData.incidentsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Incidents by Severity</CardTitle>
                <CardDescription>Distribution across severity levels</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockMetricsData.incidentsBySeverity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="severity"
                      label={({ severity, count, percent }) => `${severity}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockMetricsData.incidentsBySeverity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Mean Time to Resolution by Severity</CardTitle>
                <CardDescription>Average resolution time in minutes</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMetricsData.resolutionTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="severity" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} minutes`, 'Avg Resolution Time']} />
                    <Legend />
                    <Bar dataKey="avgTime" name="Average Resolution Time (minutes)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Mean Time to Resolution Trends</CardTitle>
                <CardDescription>Resolution times by severity over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mttrByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} minutes`, 'MTTR']} />
                    <Legend />
                    <Line type="monotone" dataKey="critical" name="Critical" stroke="#FF3A33" strokeWidth={2} />
                    <Line type="monotone" dataKey="high" name="High" stroke="#FF8C00" strokeWidth={2} />
                    <Line type="monotone" dataKey="medium" name="Medium" stroke="#FFD700" strokeWidth={2} />
                    <Line type="monotone" dataKey="low" name="Low" stroke="#90EE90" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Incident Detection Sources</CardTitle>
                <CardDescription>How incidents are being detected</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Monitoring Alerts', value: 45 },
                        { name: 'User Reports', value: 20 },
                        { name: 'Support Tickets', value: 15 },
                        { name: 'Manual Checks', value: 10 },
                        { name: 'External Sources', value: 10 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#0EA5E9" />
                      <Cell fill="#6366F1" />
                      <Cell fill="#8B5CF6" />
                      <Cell fill="#EC4899" />
                      <Cell fill="#F43F5E" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Incident Response SLAs</CardTitle>
                <CardDescription>Performance against service level agreements</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Critical', target: 30, actual: 25, met: 92 },
                      { name: 'High', target: 60, actual: 52, met: 88 },
                      { name: 'Medium', target: 120, actual: 125, met: 80 },
                      { name: 'Low', target: 240, actual: 210, met: 95 }
                    ]}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="target" name="Target Response Time (min)" fill="#94A3B8" />
                    <Bar dataKey="actual" name="Actual Response Time (min)" fill="#0EA5E9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Service Availability</CardTitle>
                <CardDescription>Uptime percentage by service</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockMetricsData.serviceAvailability}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[99, 100]} />
                    <YAxis dataKey="service" type="category" width={150} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Availability']} />
                    <Bar dataKey="availability" fill="#0EA5E9" radius={[0, 4, 4, 0]}>
                      {mockMetricsData.serviceAvailability.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.availability > 99.95 ? '#4ADE80' : 
                                entry.availability > 99.9 ? '#0EA5E9' : '#F43F5E'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Impacted Services</CardTitle>
                <CardDescription>Services with most incidents</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'API Gateway', count: 12 },
                      { name: 'Authentication', count: 8 },
                      { name: 'Payment Processing', count: 7 },
                      { name: 'Database', count: 5 },
                      { name: 'Content Delivery', count: 4 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" name="Incident Count" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Recovery Time</CardTitle>
                <CardDescription>Average time to recover by service</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'API Gateway', time: 95 },
                      { name: 'Authentication', time: 65 },
                      { name: 'Payment Processing', time: 120 },
                      { name: 'Database', time: 180 },
                      { name: 'Content Delivery', time: 45 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value} minutes`, 'Recovery Time']} />
                    <Bar dataKey="time" name="Average Recovery Time" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Incident Trend Analysis</CardTitle>
                    <CardDescription>Year-over-year comparison</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <DownloadCloud className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', current: 12, previous: 15 },
                      { month: 'Feb', current: 8, previous: 10 },
                      { month: 'Mar', current: 15, previous: 12 },
                      { month: 'Apr', current: 10, previous: 8 },
                      { month: 'May', current: 7, previous: 9 },
                      { month: 'Jun', current: 5, previous: 7 },
                      { month: 'Jul', current: 8, previous: 9 },
                      { month: 'Aug', current: 9, previous: 11 },
                      { month: 'Sep', current: 11, previous: 13 },
                      { month: 'Oct', current: 14, previous: 10 },
                      { month: 'Nov', current: 10, previous: 7 },
                      { month: 'Dec', current: 7, previous: 8 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="current" name="Current Year" stroke="#0EA5E9" strokeWidth={2} />
                    <Line type="monotone" dataKey="previous" name="Previous Year" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Root Causes</CardTitle>
                <CardDescription>Primary incident triggers</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Configuration Changes', value: 35 },
                        { name: 'Software Bugs', value: 25 },
                        { name: 'Infrastructure Failures', value: 20 },
                        { name: 'External Dependency', value: 15 },
                        { name: 'Human Error', value: 5 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#0EA5E9" />
                      <Cell fill="#6366F1" />
                      <Cell fill="#8B5CF6" />
                      <Cell fill="#EC4899" />
                      <Cell fill="#F43F5E" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Improvement Opportunities</CardTitle>
                <CardDescription>Areas for reducing incidents</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { area: 'Automated Testing', impact: 85 },
                      { area: 'Redundancy', impact: 75 },
                      { area: 'Monitoring', impact: 70 },
                      { area: 'Documentation', impact: 60 },
                      { area: 'Training', impact: 50 }
                    ]}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="area" type="category" width={150} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Potential Impact']} />
                    <Bar dataKey="impact" name="Potential Impact %" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Monthly Incident Report</CardTitle>
              <CardDescription>Comprehensive analysis for stakeholders</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" className="gap-1">
                <DownloadCloud className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-md flex flex-col items-center justify-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">June 2023 Incident Report</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              This report contains detailed analysis of all incidents, response times, and recommendations for improvement.
            </p>
            <Button>Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
