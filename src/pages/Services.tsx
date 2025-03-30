
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Coffee, 
  Cpu, 
  Database, 
  MoreHorizontal, 
  Plus, 
  RefreshCcw, 
  Server, 
  Settings, 
  Shield 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const mockServices = [
    {
      id: '1',
      name: 'API Gateway',
      description: 'Main API gateway service',
      status: 'operational',
      uptime: '99.99%',
      incidentCount: 1,
      lastIncident: '14 days ago',
      lastChecked: '2 minutes ago',
      responseTime: 120,
      category: 'Infrastructure',
      icon: <Server className="h-5 w-5" />
    },
    {
      id: '2',
      name: 'Authentication Service',
      description: 'User authentication and authorization',
      status: 'degraded',
      uptime: '98.72%',
      incidentCount: 4,
      lastIncident: '2 days ago',
      lastChecked: '2 minutes ago',
      responseTime: 350,
      category: 'Security',
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: '3',
      name: 'Database Cluster',
      description: 'Primary database cluster',
      status: 'operational',
      uptime: '99.95%',
      incidentCount: 2,
      lastIncident: '7 days ago',
      lastChecked: '3 minutes ago',
      responseTime: 40,
      category: 'Data',
      icon: <Database className="h-5 w-5" />
    },
    {
      id: '4',
      name: 'Frontend Web App',
      description: 'Customer-facing web application',
      status: 'operational',
      uptime: '100%',
      incidentCount: 0,
      lastIncident: 'N/A',
      lastChecked: '1 minute ago',
      responseTime: 200,
      category: 'Frontend',
      icon: <Coffee className="h-5 w-5" />
    },
    {
      id: '5',
      name: 'Notification Service',
      description: 'Email and notification delivery',
      status: 'outage',
      uptime: '96.35%',
      incidentCount: 6,
      lastIncident: 'Ongoing',
      lastChecked: '30 seconds ago',
      responseTime: 0,
      category: 'Communication',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      id: '6',
      name: 'Processing Engine',
      description: 'Background job processing',
      status: 'operational',
      uptime: '99.87%',
      incidentCount: 3,
      lastIncident: '5 days ago',
      lastChecked: '2 minutes ago',
      responseTime: 180,
      category: 'Processing',
      icon: <Cpu className="h-5 w-5" />
    },
    {
      id: '7',
      name: 'Config Service',
      description: 'Configuration management',
      status: 'operational',
      uptime: '99.93%',
      incidentCount: 1,
      lastIncident: '18 days ago',
      lastChecked: '3 minutes ago',
      responseTime: 90,
      category: 'Infrastructure',
      icon: <Settings className="h-5 w-5" />
    },
  ];
  
  const filteredServices = mockServices.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'outage':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const performanceData = [
    { time: '00:00', api: 120, auth: 200, db: 30, web: 180, notif: 90 },
    { time: '04:00', api: 130, auth: 210, db: 35, web: 190, notif: 95 },
    { time: '08:00', api: 170, auth: 250, db: 40, web: 210, notif: 120 },
    { time: '12:00', api: 190, auth: 350, db: 45, web: 230, notif: 150 },
    { time: '16:00', api: 160, auth: 330, db: 35, web: 200, notif: 0 },
    { time: '20:00', api: 120, auth: 280, db: 30, web: 180, notif: 0 },
    { time: 'Now', api: 110, auth: 270, db: 25, web: 170, notif: 0 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-dark">Services</h1>
          <p className="text-muted-foreground">Monitor and manage your service health</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="gap-2 bg-purple-medium hover:bg-purple-dark">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            {mockServices.filter(s => s.status === 'operational').length} of {mockServices.length} services operational
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-green-800">Operational</h3>
              <p className="text-2xl font-bold text-green-600">
                {mockServices.filter(s => s.status === 'operational').length}
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-medium text-yellow-800">Degraded</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {mockServices.filter(s => s.status === 'degraded').length}
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-medium text-red-800">Outage</h3>
              <p className="text-2xl font-bold text-red-600">
                {mockServices.filter(s => s.status === 'outage').length}
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-2">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-purple-800">Average Response</h3>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(mockServices.filter(s => s.responseTime > 0).reduce((acc, service) => acc + service.responseTime, 0) / 
                mockServices.filter(s => s.responseTime > 0).length)} ms
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Response Time (ms)</CardTitle>
          <CardDescription>24-hour service performance</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="api" name="API Gateway" stroke="#9b87f5" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="auth" name="Authentication" stroke="#7e69ab" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="db" name="Database" stroke="#6e59a5" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="web" name="Web App" stroke="#d6bcfa" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="notif" name="Notification" stroke="#ff3333" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredServices.map(service => (
          <Card key={service.id} className={service.status === 'outage' ? 'border-red-300' : ''}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-md ${
                    service.status === 'operational' ? 'bg-green-100' : 
                    service.status === 'degraded' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {service.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{service.name}</h3>
                      <Badge variant="outline" className={getStatusColor(service.status)}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Uptime: {service.uptime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>Incidents: {service.incidentCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs font-normal">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Cpu className="h-4 w-4" />
                    Check
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Incidents
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Service Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Service</DropdownMenuItem>
                      <DropdownMenuItem>Configure Alerts</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Maintenance Mode</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Remove Service</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {service.status !== 'operational' && (
                <div className={`px-6 py-3 border-t ${
                  service.status === 'degraded' ? 'bg-yellow-50 border-yellow-100' : 
                  'bg-red-50 border-red-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`h-4 w-4 ${
                      service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                    <span className="text-sm font-medium">
                      {service.status === 'degraded' 
                        ? 'Performance degraded. Investigating the issue.' 
                        : 'Service outage. Teams are working on a fix.'}
                    </span>
                    <Button variant="link" size="sm" className="ml-auto gap-1 h-auto p-0">
                      View Incident
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
