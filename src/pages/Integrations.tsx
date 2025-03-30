
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GitBranch, Plus, RefreshCcw, Settings } from 'lucide-react';

const Integrations = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-dark">Integrations</h1>
          <p className="text-muted-foreground">Connect and manage external tools</p>
        </div>
        <Button className="gap-2 bg-purple-medium hover:bg-purple-dark">
          <Plus className="h-4 w-4" />
          Add Integration
        </Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="available">Available Integrations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0052CC]/10 rounded-md">
                      <svg viewBox="0 0 24 24" height="28" width="28" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#0052CC]">
                        <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005z"></path>
                        <path d="M5.943 6.33H17.53c0 2.873-2.342 5.201-5.232 5.201H10.17V13.59a5.215 5.215 0 0 1-5.215 5.214V7.335c0-.554.45-1.005 1.005-1.005z" fill="currentColor" opacity=".5"></path>
                        <path d="M11.572 1.005h11.57a5.218 5.218 0 0 1-5.23 5.215h-2.131v2.057A5.216 5.216 0 0 1 10.568 13.5V2.01c0-.555.45-1.005 1.004-1.005z" fill="currentColor" opacity=".2"></path>
                      </svg>
                    </div>
                    <div>
                      <CardTitle>Jira</CardTitle>
                      <CardDescription>Issue tracking & project management</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Workspace</p>
                    <p className="text-sm text-muted-foreground">techco.atlassian.net</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Connected By</p>
                    <p className="text-sm text-muted-foreground">admin@example.com</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="jira-sync" className="text-sm">Sync incidents automatically</Label>
                      <Switch id="jira-sync" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="jira-comments" className="text-sm">Sync comments</Label>
                      <Switch id="jira-comments" defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <RefreshCcw className="h-4 w-4" />
                      Sync Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0D83CD]/10 rounded-md">
                      <svg viewBox="0 0 24 24" height="28" width="28" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#0D83CD]">
                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"></path>
                      </svg>
                    </div>
                    <div>
                      <CardTitle>Slack</CardTitle>
                      <CardDescription>Team communication & notifications</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Workspace</p>
                    <p className="text-sm text-muted-foreground">techco.slack.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Channels</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="bg-purple-light/10">#incidents</Badge>
                      <Badge variant="secondary" className="bg-purple-light/10">#alerts</Badge>
                      <Badge variant="secondary" className="bg-purple-light/10">#general</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="slack-incidents" className="text-sm">Send incident alerts</Label>
                      <Switch id="slack-incidents" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="slack-updates" className="text-sm">Send status updates</Label>
                      <Switch id="slack-updates" defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <RefreshCcw className="h-4 w-4" />
                      Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#172B4D]/10 rounded-md">
                      <svg viewBox="0 0 24 24" height="28" width="28" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#172B4D]">
                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"></path>
                      </svg>
                    </div>
                    <div>
                      <CardTitle>Opsgenie</CardTitle>
                      <CardDescription>Alerting & on-call management</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Instance</p>
                    <p className="text-sm text-muted-foreground">techco.opsgenie.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Teams</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="bg-purple-light/10">Ops</Badge>
                      <Badge variant="secondary" className="bg-purple-light/10">Engineering</Badge>
                      <Badge variant="secondary" className="bg-purple-light/10">Security</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="opsgenie-incidents" className="text-sm">Create alerts</Label>
                      <Switch id="opsgenie-incidents" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="opsgenie-escalation" className="text-sm">Use escalation policies</Label>
                      <Switch id="opsgenie-escalation" defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <RefreshCcw className="h-4 w-4" />
                      Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#333]/10 rounded-md">
                      <GitBranch className="h-7 w-7 text-[#333]" />
                    </div>
                    <div>
                      <CardTitle>GitHub</CardTitle>
                      <CardDescription>Code repository & issue tracking</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Connected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Organization</p>
                    <p className="text-sm text-muted-foreground">github.com/techco</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Repositories</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="bg-purple-light/10">api-service</Badge>
                      <Badge variant="secondary" className="bg-purple-light/10">frontend</Badge>
                      <Badge variant="secondary" className="bg-purple-light/10">+3 more</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="github-issues" className="text-sm">Create issues</Label>
                      <Switch id="github-issues" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="github-commits" className="text-sm">Link to commits</Label>
                      <Switch id="github-commits" defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <RefreshCcw className="h-4 w-4" />
                      Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="available" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <svg viewBox="0 0 24 24" height="28" width="28" focusable="false" role="img" fill="#5865F2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                    </svg>
                  </div>
                  <div>
                    <CardTitle>Discord</CardTitle>
                    <CardDescription>Communication & collaboration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2 bg-purple-medium hover:bg-purple-dark">
                  <Plus className="h-4 w-4" />
                  Connect
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <svg viewBox="0 0 24 24" height="28" width="28" focusable="false" role="img" fill="#FF6550" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm7.369 19.369a1.626 1.626 0 0 1-.282.037c-.377 0-.736-.152-.998-.418l-4.601-4.601-4.601 4.601c-.262.266-.621.418-.998.418a1.427 1.427 0 0 1-.282-.037 1.436 1.436 0 0 1-1.08-1.366V6.63c0-.521.285-.986.742-1.23a1.414 1.414 0 0 1 1.437.053L12 8.17l3.294-2.717a1.376 1.376 0 0 1 .865-.301c.19 0 .38.044.572.154.457.244.732.709.732 1.23v11.298a1.44 1.44 0 0 1-1.094 1.397z"></path>
                    </svg>
                  </div>
                  <div>
                    <CardTitle>PagerDuty</CardTitle>
                    <CardDescription>On-call management & alerting</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2 bg-purple-medium hover:bg-purple-dark">
                  <Plus className="h-4 w-4" />
                  Connect
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-md">
                    <svg viewBox="0 0 24 24" height="28" width="28" focusable="false" role="img" fill="#1C9CEA" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.252.002c-1.125.006-4.15 3.893-4.15 3.893l-.002.003c-.71 1.12-1.574 2.048-1.967 3.436l-.001.003c-.301 1.062-.376 2.25-.376 3.062v.011l.001.01c.002.064.003.129.003.194 0 .227-.009.453-.024.678l.002-.028c-.127 1.887-.7 3.853-1.608 6.134 0 0-.503 1.208-.657 1.58l-.009.022v.002c-.122.322-.298.598-.523.829l.001-.001c-.311.3-.658.563-1.042.77l-.016.008-1.882 1-1.06-1.986 1.91-1.014c.053-.029.109-.063.134-.08.232-.157.426-.362.57-.602l.005-.009c.168-.294.407-1.011.41-1.011.828-1.996 1.357-3.747 1.457-5.38.007-.15.012-.35.012-.551 0-.116-.002-.231-.005-.346v.017l.001-.016v-.013c.001-.47-.034-1.439.326-2.489.07-.205.152-.401.246-.587l-.009.019c.3-.587.856-1.283 1.502-2.298L5 3.728l2.167-2.38c.65.736 1.277 1.398 1.877 2.089l-.025-.029C9.696 4.256 10.21 4.751 10.602 5.3c.236.329.415.713.518 1.126l.003.019c.252 1.075.278 2.149.287 2.633v.011l.001.004v.041l-.001.043c0 .013-.001.029-.001.044 0 .185.006.367.016.548l-.001-.024c.09 1.465.542 2.758 1.142 4.193l.001.004c.3.722.64 1.518.9 2.304.125.375.211.808.235 1.255l.001.014c.002.04.003.088.003.136 0 .35-.065.686-.184.995l.006-.019c-.17.438-.575.756-1.115.756-.015 0-.029 0-.043-.001h.002a5.346 5.346 0 0 1-.544-.16l.042.01c-.447-.116-.863-.299-1.244-.54l.011.007c-.412-.265-.767-.578-1.077-.932a8.383 8.383 0 0 1-.816-1.023l-.01-.016c-.24-.37-.578-1.186-.578-1.186l-1.982 1.073 1 1.86s.25.635.406.919c.17.304.376.618.571.857.437.534.941 1.038 1.441 1.385.513.351 1.105.67 1.741.912l.045.015c.482.18 1.04.291 1.62.304h.006c.054.003.118.005.182.005.805 0 1.53-.328 2.055-.857l.001-.001c.572-.534.943-1.266 1.033-2.077l.001-.014c.023-.266.01-.55-.037-.863-.028-.201-.07-.403-.124-.6-.2-.778-.461-1.459-.786-2.399-.483-1.372-.905-2.553-.982-3.754-.011-.195-.017-.421-.017-.65v-.042c0-.021 0-.045.001-.069v.003c.008-.427.035-1.289.221-2.147a3.495 3.495 0 0 1 .315-.774l-.01.017c.29-.539.793-1.036 1.472-1.88.632-.8 1.251-1.529 1.897-2.232l-.024.027 2.154 2.4L19 3.728S13.37-.004 12.252.002z"></path>
                    </svg>
                  </div>
                  <div>
                    <CardTitle>Statuspage</CardTitle>
                    <CardDescription>Public status communication</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2 bg-purple-medium hover:bg-purple-dark">
                  <Plus className="h-4 w-4" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure API access for integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" type="password" value="••••••••••••••••••••••" readOnly className="font-mono" />
                  <Button variant="outline">Generate New</Button>
                  <Button variant="outline">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this API key to authenticate integration requests
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input id="webhook-url" value="https://incidents.example.com/api/webhooks/callback" readOnly className="font-mono" />
                  <Button variant="outline">Copy</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Configure external services to send data to this URL
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-connect" className="font-medium">Auto-connect new integrations</Label>
                  <Switch id="auto-connect" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically approve new integration requests from trusted sources
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sync-preferences" className="font-medium">Bi-directional sync</Label>
                  <Switch id="sync-preferences" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow changes from integrations to modify local data
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
