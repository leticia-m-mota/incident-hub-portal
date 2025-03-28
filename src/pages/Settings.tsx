
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Lock, 
  Bell, 
  Settings2, 
  Shield, 
  Globe, 
  LucideIcon,
  LogOut,
  Users,
  Key,
  Webhook,
  GitBranch,
  LayoutDashboard
} from 'lucide-react';

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection = ({ icon: Icon, title, description, children }: SettingsSectionProps) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="account">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="teams">Teams & Permissions</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="account">
          <SettingsSection
            icon={User}
            title="Profile Settings"
            description="Manage your personal information and preferences"
          >
            <div className="space-y-6">
              <div className="flex flex-col gap-8 sm:flex-row">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>TU</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Taylor" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="User" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="taylor@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" defaultValue="Senior SRE" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={Lock}
            title="Security"
            description="Manage your password and security preferences"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Active Sessions</Label>
                    <p className="text-sm text-muted-foreground">
                      Manage devices where you're currently logged in
                    </p>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Update Password</Button>
              </div>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={Bell}
            title="Preferences"
            description="Configure your user experience preferences"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Default Dashboard</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose which page to show when you first login
                  </p>
                </div>
                <Select defaultValue="overview">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview Dashboard</SelectItem>
                    <SelectItem value="incidents">Incidents List</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark mode
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Time Zone</Label>
                  <p className="text-sm text-muted-foreground">
                    Display times in your preferred time zone
                  </p>
                </div>
                <Select defaultValue="utc">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>
        
        <TabsContent value="notifications">
          <SettingsSection
            icon={Bell}
            title="Notification Channels"
            description="Manage how you receive notifications"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive incident updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your mobile device
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Slack Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications in Slack
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Connected</Badge>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive critical alerts via SMS
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={Settings2}
            title="Notification Settings"
            description="Configure your notification preferences"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Critical Incidents Only</Label>
                  <p className="text-sm text-muted-foreground">
                    Only notify for critical severity incidents
                  </p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of all incidents
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Quiet Hours</Label>
                  <p className="text-sm text-muted-foreground">
                    Don't send non-critical notifications during these hours
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <span className="text-sm text-muted-foreground">22:00 - 08:00</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Save Preferences</Button>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>
        
        <TabsContent value="integrations">
          <SettingsSection
            icon={Webhook}
            title="Service Integrations"
            description="Connect external services to enhance incident management"
          >
            <div className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Slack</CardTitle>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-600">Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Receive notifications and take actions directly from Slack.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Configure</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">PagerDuty</CardTitle>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-600">Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Sync incidents and on-call schedules with PagerDuty.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Configure</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Jira</CardTitle>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Create Jira issues from incidents automatically.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Connect</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Datadog</CardTitle>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Pull metrics and alerts from Datadog into incidents.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Connect</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Button variant="outline" className="mt-4">
                View All Integrations
              </Button>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={Key}
            title="API Access"
            description="Manage API tokens for programmatic access"
          >
            <div className="space-y-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Automation Token</TableCell>
                      <TableCell>2 months ago</TableCell>
                      <TableCell>2 days ago</TableCell>
                      <TableCell>Never</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Revoke</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Monitoring Integration</TableCell>
                      <TableCell>1 week ago</TableCell>
                      <TableCell>3 hours ago</TableCell>
                      <TableCell>11 months</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Revoke</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <Button>Generate New Token</Button>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={GitBranch}
            title="Source Control Integration"
            description="Link incident data with your source control"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">GitHub Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Link incidents to GitHub commits and pull requests
                  </p>
                </div>
                <Button variant="outline">Connect GitHub</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Repository Watching</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitor changes to specific repositories
                  </p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">CI/CD Events</Label>
                  <p className="text-sm text-muted-foreground">
                    Track deployment events for incident correlation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </SettingsSection>
        </TabsContent>
        
        <TabsContent value="teams">
          <SettingsSection
            icon={Users}
            title="Team Members"
            description="Manage users with access to the incident portal"
          >
            <div className="space-y-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Jane Doe</div>
                            <div className="text-xs text-muted-foreground">jane@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Administrator</TableCell>
                      <TableCell>Platform</TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">John Smith</div>
                            <div className="text-xs text-muted-foreground">john@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Responder</TableCell>
                      <TableCell>Payments</TableCell>
                      <TableCell>1 day ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>AM</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Alex Miller</div>
                            <div className="text-xs text-muted-foreground">alex@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Viewer</TableCell>
                      <TableCell>Customer Support</TableCell>
                      <TableCell>3 days ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <Button>Invite Team Member</Button>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={Shield}
            title="Roles & Permissions"
            description="Configure access levels and capabilities"
          >
            <div className="space-y-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Administrator</TableCell>
                      <TableCell>Full system access</TableCell>
                      <TableCell>Create, Read, Update, Delete</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Responder</TableCell>
                      <TableCell>Can manage incidents</TableCell>
                      <TableCell>Create, Read, Update</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Viewer</TableCell>
                      <TableCell>Read-only access</TableCell>
                      <TableCell>Read</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <Button>Create Custom Role</Button>
            </div>
          </SettingsSection>
        </TabsContent>
        
        <TabsContent value="advanced">
          <SettingsSection
            icon={LayoutDashboard}
            title="Status Page Settings"
            description="Configure your public and internal status pages"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Status Page</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable a public-facing status page
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="statusPageUrl">Status Page URL</Label>
                <div className="flex gap-2">
                  <Input id="statusPageUrl" defaultValue="status.company.com" readOnly />
                  <Button variant="outline">Configure Domain</Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-publish Incidents</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically publish approved incidents to status page
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Service Catalog</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage which services appear on the status page
                  </p>
                </div>
                <Button variant="outline">Configure Services</Button>
              </div>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={Globe}
            title="Data Export & Backup"
            description="Configure backups and data exports"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Data Export</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically export incident data weekly
                  </p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Export Format</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose the format for data exports
                  </p>
                </div>
                <Select defaultValue="json">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="outline">Export Current Data</Button>
              </div>
            </div>
          </SettingsSection>
          
          <SettingsSection
            icon={LogOut}
            title="Account Management"
            description="Manage account-level settings"
          >
            <div className="space-y-4">
              <Button variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </SettingsSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
