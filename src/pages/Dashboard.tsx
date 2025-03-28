
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
  Line
} from 'recharts';
import { AlertTriangle, CheckCircle2, Clock, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IncidentCard from '@/components/incidents/IncidentCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const activeIncidents = mockIncidents.filter(incident => incident.status !== 'resolved');
  const resolvedIncidents = mockIncidents.filter(incident => incident.status === 'resolved');
  
  const criticalIncidents = mockIncidents.filter(incident => incident.severity === 'critical');
  const openIncidentsCount = mockIncidents.filter(incident => incident.status !== 'resolved').length;
  
  const severityColors = {
    Critical: '#FF3A33',
    High: '#FF8C00',
    Medium: '#FFD700',
    Low: '#90EE90'
  };
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-incident-high" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openIncidentsCount}</div>
            <p className="text-xs text-muted-foreground">
              {openIncidentsCount > 0 
                ? `${criticalIncidents.length} critical needs attention` 
                : 'All systems operational'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h 15m</div>
            <p className="text-xs text-muted-foreground">
              -12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              Overall availability last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-incident-low" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedIncidents.length}</div>
            <p className="text-xs text-muted-foreground">
              +8% from previous month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Incidents by Month</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
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
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Incidents by Severity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockMetricsData.incidentsBySeverity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="severity"
                  label={({ severity, count, percent }) => `${severity}: ${(percent * 100).toFixed(0)}%`}
                >
                  {mockMetricsData.incidentsBySeverity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={severityColors[entry.severity as keyof typeof severityColors]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Incidents</CardTitle>
            <Link to="/incidents">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="resolved">Recently Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="pt-4">
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {activeIncidents.slice(0, 4).map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="resolved" className="pt-4">
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {resolvedIncidents.slice(0, 4).map(incident => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
