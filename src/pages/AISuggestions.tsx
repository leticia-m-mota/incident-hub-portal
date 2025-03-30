
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  AlertTriangle, 
  BookOpen, 
  Check, 
  Copy, 
  Database, 
  History, 
  Lightbulb, 
  MessagesSquare, 
  RefreshCcw, 
  Send, 
  Server, 
  ThumbsDown, 
  ThumbsUp, 
  X
} from 'lucide-react';

const AISuggestions = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const mockConversation = [
    {
      id: '1',
      type: 'user',
      message: 'What could be causing the API gateway timeout errors?',
      timestamp: '10:24 AM'
    },
    {
      id: '2',
      type: 'ai',
      message: 'Based on the current incident data, the API gateway timeouts could be caused by several factors:\n\n1. **Increased traffic load** - There\'s a 47% increase in traffic compared to normal baseline.\n2. **Database connection pool saturation** - The connection pool is at 92% capacity.\n3. **Memory leak in API services** - Memory usage is gradually increasing without corresponding traffic increase.\n\nI recommend:\n- Scaling up the API service instances temporarily\n- Checking for recent deployments that could have introduced the memory leak\n- Reviewing database query performance for slow queries',
      timestamp: '10:25 AM',
      sources: [
        { title: 'API Gateway Best Practices', type: 'knowledge' },
        { title: 'INC-2023-42: Similar API Timeout Issue', type: 'incident' }
      ],
      confidence: 'high'
    },
    {
      id: '3',
      type: 'user',
      message: 'How can we quickly mitigate this while we investigate?',
      timestamp: '10:27 AM'
    },
    {
      id: '4',
      type: 'ai',
      message: 'For immediate mitigation, I suggest the following steps:\n\n1. **Enable circuit breaker pattern** on non-critical API endpoints to prevent cascading failures\n2. **Increase timeout thresholds** temporarily from 10s to 30s\n3. **Scale up API instances** by at least 3 additional nodes\n4. **Implement request throttling** for non-essential traffic\n\nThese steps should stabilize the system while you investigate. Based on previous similar incidents, this approach resolved 85% of timeout issues within 15 minutes.',
      timestamp: '10:28 AM',
      sources: [
        { title: 'Emergency Response Playbook', type: 'playbook' },
        { title: 'API Scaling Procedures', type: 'procedure' }
      ],
      confidence: 'high'
    }
  ];
  
  const mockSuggestions = [
    'Check recent deployment changes that could affect API performance',
    'Review database connection pool settings',
    'Analyze traffic patterns for unusual activity',
    'Look for memory leaks in the API service',
    'Enable additional logging for detailed diagnostics'
  ];
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setLoading(true);
    // In a real implementation, this would call an API to get the AI response
    setTimeout(() => {
      setLoading(false);
      setMessage('');
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-dark">AI Assistant</h1>
            <p className="text-muted-foreground">Get intelligent suggestions and analysis for incident resolution</p>
          </div>
          
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-purple-light/20">
                    <AvatarFallback className="text-purple-dark">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Incident Assistant</CardTitle>
                    <CardDescription>Powered by AI</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <History className="h-4 w-4" />
                  History
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockConversation.map(item => (
                <div key={item.id} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${item.type === 'user' ? 'bg-purple-medium text-white' : 'bg-muted'} rounded-lg p-3`}>
                    <div className="flex items-start gap-3">
                      {item.type === 'ai' && (
                        <Avatar className="h-8 w-8 mt-0.5 bg-purple-light/20">
                          <AvatarFallback className="text-purple-dark">AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="space-y-2">
                        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br /><br />') }} />
                        
                        {item.type === 'ai' && item.sources && (
                          <div className="pt-2">
                            <p className="text-xs text-muted-foreground mb-1">Sources:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.sources.map((source, index) => (
                                <div key={index} className="flex items-center text-xs px-2 py-1 rounded-full bg-background">
                                  {source.type === 'knowledge' && <BookOpen className="h-3 w-3 mr-1" />}
                                  {source.type === 'incident' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                  {source.type === 'playbook' && <BookOpen className="h-3 w-3 mr-1" />}
                                  {source.type === 'procedure' && <Check className="h-3 w-3 mr-1" />}
                                  {source.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {item.type === 'ai' && (
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>{item.timestamp}</span>
                              {item.confidence && (
                                <span className="flex items-center ml-2">
                                  <span className={`w-2 h-2 rounded-full ${
                                    item.confidence === 'high' ? 'bg-green-500' : 
                                    item.confidence === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                                  } mr-1`}></span>
                                  {item.confidence.charAt(0).toUpperCase() + item.confidence.slice(1)} confidence
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {item.type === 'user' && (
                          <div className="flex justify-end text-xs opacity-70 pt-1">
                            {item.timestamp}
                          </div>
                        )}
                      </div>
                      {item.type === 'user' && (
                        <Avatar className="h-8 w-8 mt-0.5">
                          <AvatarFallback className="bg-purple-dark text-white">U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-purple-light/20">
                        <AvatarFallback className="text-purple-dark">AI</AvatarFallback>
                      </Avatar>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-purple-medium animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-medium animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-purple-medium animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ask a question about the current incident..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!message.trim() || loading}
                  className="bg-purple-medium hover:bg-purple-dark"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {mockSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    onClick={() => setMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-medium" />
                AI Suggestions
              </CardTitle>
              <CardDescription>Based on current incidents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50 hover:bg-muted transition-colors">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">API Gateway Connection Pool</p>
                    <p className="text-sm text-muted-foreground">
                      Connection pool utilization is at 92%. Consider increasing the pool size from 100 to 250 connections.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50 hover:bg-muted transition-colors">
                  <Database className="h-5 w-5 text-purple-medium mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Database Query Optimization</p>
                    <p className="text-sm text-muted-foreground">
                      Query 'GetUserTransactions' is running 3x slower than normal. Consider adding index on 'timestamp' column.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50 hover:bg-muted transition-colors">
                  <Server className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Auto-Scaling Recommendation</p>
                    <p className="text-sm text-muted-foreground">
                      Enable auto-scaling for the authentication service. Current CPU utilization is consistently above 80%.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refresh Suggestions
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessagesSquare className="h-5 w-5 text-purple-medium" />
                Knowledge Base
              </CardTitle>
              <CardDescription>Related articles and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <BookOpen className="h-5 w-5 text-purple-medium mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">API Gateway Troubleshooting Guide</p>
                    <p className="text-xs text-muted-foreground">Last updated 2 weeks ago</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">View Guide</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <BookOpen className="h-5 w-5 text-purple-medium mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Connection Pool Best Practices</p>
                    <p className="text-xs text-muted-foreground">Last updated 1 month ago</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">View Article</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <BookOpen className="h-5 w-5 text-purple-medium mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Database Query Optimization</p>
                    <p className="text-xs text-muted-foreground">Last updated 3 weeks ago</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">View Article</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;
