
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Filter, MoreHorizontal, Plus, Search, Shield, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const mockUsers = [
    { 
      id: '1', 
      name: 'Alex Johnson', 
      email: 'alex.johnson@example.com', 
      role: 'Admin', 
      department: 'IT Operations',
      avatarUrl: '',
      status: 'active',
      lastActive: '2 minutes ago'
    },
    { 
      id: '2', 
      name: 'Sam Wilson', 
      email: 'sam.wilson@example.com', 
      role: 'Incident Manager', 
      department: 'DevOps',
      avatarUrl: '',
      status: 'active',
      lastActive: '5 hours ago'
    },
    { 
      id: '3', 
      name: 'Maria Rodriguez', 
      email: 'maria.r@example.com', 
      role: 'Viewer', 
      department: 'Customer Support',
      avatarUrl: '',
      status: 'inactive',
      lastActive: '3 days ago'
    },
    { 
      id: '4', 
      name: 'John Smith', 
      email: 'john.smith@example.com', 
      role: 'Incident Manager', 
      department: 'Engineering',
      avatarUrl: '',
      status: 'active',
      lastActive: '1 day ago'
    },
    { 
      id: '5', 
      name: 'Priya Patel', 
      email: 'priya.p@example.com', 
      role: 'Responder', 
      department: 'Infrastructure',
      avatarUrl: '',
      status: 'active',
      lastActive: '30 minutes ago'
    },
    { 
      id: '6', 
      name: 'David Kim', 
      email: 'david.k@example.com', 
      role: 'Admin', 
      department: 'Security',
      avatarUrl: '',
      status: 'active',
      lastActive: '15 minutes ago'
    },
    { 
      id: '7', 
      name: 'Lisa Wang', 
      email: 'lisa.w@example.com', 
      role: 'Viewer', 
      department: 'Product Management',
      avatarUrl: '',
      status: 'active',
      lastActive: '4 hours ago'
    },
  ];
  
  const mockRoles = [
    { 
      id: '1', 
      name: 'Admin', 
      description: 'Full access to all features and settings',
      userCount: 2,
      permissions: [
        'Create/Edit/Delete incidents',
        'Manage users and roles',
        'Configure system settings',
        'Access all reports and analytics',
        'Manage integrations'
      ]
    },
    { 
      id: '2', 
      name: 'Incident Manager', 
      description: 'Can manage incidents and assign responders',
      userCount: 2,
      permissions: [
        'Create/Edit/Delete incidents',
        'Assign responders',
        'Update incident status',
        'View reports and analytics',
        'Create postmortems'
      ]
    },
    { 
      id: '3', 
      name: 'Responder', 
      description: 'Responds to incidents they are assigned to',
      userCount: 1,
      permissions: [
        'View assigned incidents',
        'Update incident status',
        'Add comments and updates',
        'View basic reports',
        'Use knowledge base'
      ]
    },
    { 
      id: '4', 
      name: 'Viewer', 
      description: 'Read-only access to incidents and updates',
      userCount: 2,
      permissions: [
        'View incidents',
        'View status updates',
        'Subscribe to notifications',
        'View basic reports',
        'Use knowledge base'
      ]
    },
  ];
  
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-dark">User Management</h1>
        <Button className="gap-2 bg-purple-medium hover:bg-purple-dark">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Incident Manager">Incident Manager</SelectItem>
                  <SelectItem value="Responder">Responder</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback className="bg-purple-light/30 text-purple-dark">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          user.role === 'Admin' 
                            ? 'bg-purple-light/20 text-purple-dark border-purple-light' 
                            : user.role === 'Incident Manager'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : user.role === 'Responder'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                        }>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem>View Activity Log</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-6 pt-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-purple-dark">Roles & Permissions</h2>
              <p className="text-muted-foreground">Configure user roles and their access levels</p>
            </div>
            <Button className="gap-2 bg-purple-medium hover:bg-purple-dark">
              <Plus className="h-4 w-4" />
              Create Role
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {mockRoles.map(role => (
              <Card key={role.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {role.name}
                        <Badge variant="outline" className="ml-2 bg-purple-light/10 text-purple-dark">
                          {role.userCount} users
                        </Badge>
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                        <DropdownMenuItem>View Users</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete Role</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                      {role.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-medium"></div>
                          <span className="text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
