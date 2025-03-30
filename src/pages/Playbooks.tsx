
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookMarked, 
  Clock, 
  Copy, 
  Download, 
  FileText, 
  Filter, 
  List, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Star, 
  Users
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Playbooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const mockPlaybooks = [
    {
      id: '1',
      title: 'API Outage Response',
      description: 'Steps to diagnose and resolve API service disruptions',
      lastUpdated: '2 days ago',
      author: 'Alex Johnson',
      category: 'Incidents',
      tags: ['api', 'critical', 'outage'],
      starred: true,
      usageCount: 12
    },
    {
      id: '2',
      title: 'Database Failure Recovery',
      description: 'Procedures for database cluster recovery and data verification',
      lastUpdated: '1 week ago',
      author: 'Maria Rodriguez',
      category: 'Recovery',
      tags: ['database', 'data-recovery', 'backup'],
      starred: true,
      usageCount: 8
    },
    {
      id: '3',
      title: 'Authentication System Troubleshooting',
      description: 'Diagnosing and resolving user login and authentication issues',
      lastUpdated: '3 days ago',
      author: 'John Smith',
      category: 'Security',
      tags: ['auth', 'security', 'users'],
      starred: false,
      usageCount: 5
    },
    {
      id: '4',
      title: 'Network Connectivity Issues',
      description: 'Steps to identify and resolve network related incidents',
      lastUpdated: '5 days ago',
      author: 'Priya Patel',
      category: 'Infrastructure',
      tags: ['network', 'connectivity', 'dns'],
      starred: false,
      usageCount: 7
    },
    {
      id: '5',
      title: 'Frontend Service Degradation',
      description: 'Handling user interface and experience degradation incidents',
      lastUpdated: '2 weeks ago',
      author: 'David Kim',
      category: 'Frontend',
      tags: ['ui', 'frontend', 'performance'],
      starred: false,
      usageCount: 3
    },
    {
      id: '6',
      title: 'Payment Processing Failure',
      description: 'Steps to resolve payment gateway and transaction failures',
      lastUpdated: '1 week ago',
      author: 'Lisa Wang',
      category: 'Business',
      tags: ['payments', 'transactions', 'critical'],
      starred: true,
      usageCount: 9
    },
  ];
  
  const filteredPlaybooks = mockPlaybooks.filter(playbook => 
    playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playbook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playbook.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-dark">Incident Playbooks</h1>
          <p className="text-muted-foreground">Step-by-step procedures for incident resolution</p>
        </div>
        <Button className="gap-2 bg-purple-medium hover:bg-purple-dark">
          <Plus className="h-4 w-4" />
          New Playbook
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search playbooks..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="icon"
            className={view === 'grid' ? 'bg-purple-medium hover:bg-purple-dark' : ''}
            onClick={() => setView('grid')}
          >
            <div className="grid grid-cols-2 gap-1">
              <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
              <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
              <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
              <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
            </div>
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="icon"
            className={view === 'list' ? 'bg-purple-medium hover:bg-purple-dark' : ''}
            onClick={() => setView('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlaybooks.map(playbook => (
            <Card key={playbook.id} className="hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{playbook.title}</CardTitle>
                      {playbook.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <CardDescription>{playbook.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Star className="h-4 w-4 mr-2" />
                        {playbook.starred ? 'Remove star' : 'Star playbook'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{playbook.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{playbook.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-purple-light/10 text-purple-dark">
                      {playbook.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-light/20 text-purple-dark">
                      Used {playbook.usageCount} times
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 pt-2">
                    {playbook.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="default" className="mt-2 w-full bg-purple-medium hover:bg-purple-dark">
                    View Playbook
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 py-3 px-4 border-b bg-muted/50">
                <div className="col-span-5 font-medium">Playbook</div>
                <div className="col-span-2 font-medium">Category</div>
                <div className="col-span-2 font-medium">Last Updated</div>
                <div className="col-span-2 font-medium">Usage</div>
                <div className="col-span-1 text-right font-medium">Actions</div>
              </div>
              {filteredPlaybooks.map(playbook => (
                <div key={playbook.id} className="grid grid-cols-12 py-4 px-4 border-b hover:bg-muted/20 transition-colors">
                  <div className="col-span-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <BookMarked className="h-5 w-5 text-purple-medium" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{playbook.title}</span>
                          {playbook.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{playbook.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {playbook.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 self-center">
                    <Badge variant="outline" className="bg-purple-light/10 text-purple-dark">
                      {playbook.category}
                    </Badge>
                  </div>
                  <div className="col-span-2 self-center text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{playbook.lastUpdated}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      by {playbook.author}
                    </div>
                  </div>
                  <div className="col-span-2 self-center">
                    <Badge variant="secondary" className="bg-purple-light/20 text-purple-dark">
                      Used {playbook.usageCount} times
                    </Badge>
                  </div>
                  <div className="col-span-1 self-center text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Star className="h-4 w-4 mr-2" />
                            {playbook.starred ? 'Remove star' : 'Star playbook'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Playbooks;
