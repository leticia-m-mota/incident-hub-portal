
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  BookOpen, 
  Book, 
  FileText, 
  MessageSquare, 
  Star,
  ChevronRight,
  HelpCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse(null);
    
    // Simulate AI response delay
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse(
        "Based on our incident knowledge base, API Gateway outages are often caused by configuration changes or traffic spikes. Check the load balancer configuration first, then verify scaling policies. Common fixes include rolling back recent changes, adjusting rate limiting, or enabling additional redundancy paths.\n\nRelevant runbook: API-001 API Gateway Recovery Procedures"
      );
    }, 1500);
  };

  const categories = [
    { id: 'runbooks', name: 'Runbooks', icon: Book, count: 24 },
    { id: 'postmortems', name: 'Postmortems', icon: FileText, count: 18 },
    { id: 'guides', name: 'How-to Guides', icon: BookOpen, count: 12 },
    { id: 'faq', name: 'FAQs', icon: HelpCircle, count: 30 },
  ];

  const popularArticles = [
    { id: 'a1', title: 'API Gateway Recovery Procedures', category: 'Runbooks', views: 1240 },
    { id: 'a2', title: 'Database Failover Process', category: 'Runbooks', views: 890 },
    { id: 'a3', title: 'Payment Processing Outage - May 2023', category: 'Postmortems', views: 750 },
    { id: 'a4', title: 'Authentication Service Monitoring Guide', category: 'How-to Guides', views: 680 },
    { id: 'a5', title: 'Common Alert Troubleshooting Steps', category: 'FAQ', views: 560 },
  ];

  const recentArticles = [
    { id: 'r1', title: 'CDN Cache Invalidation Process', category: 'Runbooks', date: '2 days ago' },
    { id: 'r2', title: 'Load Balancer Configuration Best Practices', category: 'How-to Guides', date: '5 days ago' },
    { id: 'r3', title: 'Search Service Degradation - June 2023', category: 'Postmortems', date: '1 week ago' },
    { id: 'r4', title: 'Kubernetes Pod Eviction Troubleshooting', category: 'FAQ', date: '2 weeks ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Search our documentation, runbooks, and past incident reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search for incidents, runbooks, or knowledge articles..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="browse">
            <TabsList className="mb-4">
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="ai-assist">AI Assistant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div 
                          key={category.id}
                          className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <category.icon className="h-5 w-5 text-primary" />
                            <span>{category.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{category.count}</Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      {popularArticles.map(article => (
                        <div 
                          key={article.id}
                          className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{article.title}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">{article.category}</Badge>
                              <span>{article.views} views</span>
                            </div>
                          </div>
                          <Star className="h-4 w-4 text-amber-400 ml-2 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {recentArticles.map(article => (
                      <Card key={article.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="font-medium mb-1">{article.title}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                            <Badge variant="outline" className="text-xs">{article.category}</Badge>
                            <span>Added {article.date}</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full gap-1">
                            <BookOpen className="h-4 w-4" />
                            Read Article
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-assist">
              <Card>
                <CardHeader>
                  <CardTitle>AI Knowledge Assistant</CardTitle>
                  <CardDescription>
                    Ask questions about incidents, procedures, or best practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Ask about incident procedures, troubleshooting steps, etc." 
                      className="pl-9" 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAiSearch();
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex gap-2 mb-6">
                    <Button
                      onClick={handleAiSearch}
                      disabled={isAiLoading || !aiQuery.trim()}
                      className="gap-2"
                    >
                      {isAiLoading ? "Searching..." : "Get Answer"}
                    </Button>
                    
                    <Button variant="outline" className="gap-2" disabled={isAiLoading} onClick={() => {
                      setAiQuery("What's the process for handling API Gateway outages?");
                    }}>
                      Example Question
                    </Button>
                  </div>
                  
                  {isAiLoading && (
                    <div className="p-6 border rounded-md flex flex-col items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-muted mb-4"></div>
                        <div className="h-4 w-64 bg-muted rounded mb-2"></div>
                        <div className="h-4 w-48 bg-muted rounded"></div>
                      </div>
                    </div>
                  )}
                  
                  {aiResponse && (
                    <div className="border rounded-md p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">Response</h4>
                          <div className="text-sm whitespace-pre-line mb-4">
                            {aiResponse}
                          </div>
                          <Separator className="my-4" />
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              Was this response helpful?
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                Yes
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <ThumbsDown className="h-4 w-4" />
                                No
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:w-1/4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm">Incident Response Guide</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                  <Book className="h-4 w-4 text-primary" />
                  <span className="text-sm">On-Call Procedures</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">Postmortem Template</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Contact List</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recently Viewed</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  <div className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                    <div className="text-sm font-medium">API Gateway Failover Procedure</div>
                    <div className="text-xs text-muted-foreground">3 hours ago</div>
                  </div>
                  <div className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                    <div className="text-sm font-medium">Database Backup and Recovery</div>
                    <div className="text-xs text-muted-foreground">Yesterday</div>
                  </div>
                  <div className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                    <div className="text-sm font-medium">Payment Processing Incident - June 2023</div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </div>
                  <div className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                    <div className="text-sm font-medium">Kubernetes Health Checks</div>
                    <div className="text-xs text-muted-foreground">3 days ago</div>
                  </div>
                  <div className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                    <div className="text-sm font-medium">Authentication Service Setup</div>
                    <div className="text-xs text-muted-foreground">1 week ago</div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contribute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Help improve our knowledge base by contributing your expertise.
                </div>
                <Button className="w-full">Add New Article</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
