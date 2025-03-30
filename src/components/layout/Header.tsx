
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BellRing, 
  PlusCircle, 
  Search,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Moon,
  Sun,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const getPageTitle = (path: string) => {
    switch (true) {
      case path === '/':
        return 'Home';
      case path === '/dashboard':
        return 'Executive Dashboard';
      case path.includes('/incidents') && !path.includes('/incidents/'):
        return 'Incidents';
      case path.includes('/incidents/'):
        return 'Incident Details';
      case path.includes('/notifications'):
        return 'Notifications';
      case path.includes('/analytics'):
        return 'Analytics & Metrics';
      case path.includes('/knowledge'):
        return 'Knowledge Base';
      case path.includes('/services'):
        return 'Services';
      case path.includes('/playbooks'):
        return 'Playbooks';
      case path.includes('/suggestions'):
        return 'AI Suggestions';
      case path.includes('/integrations'):
        return 'Integrations';
      case path.includes('/users'):
        return 'User Management';
      case path.includes('/settings'):
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    toast({
      title: `${theme === 'light' ? 'Dark' : 'Light'} mode activated`,
      description: "Theme preference has been updated.",
      duration: 3000,
    });
  };

  const handleNewIncident = () => {
    toast({
      title: "Create New Incident",
      description: "This would open the incident creation form in a production environment.",
      duration: 3000,
    });
  };

  return (
    <header className="border-b border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-purple-dark">{getPageTitle(location.pathname)}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search incidents..." 
              className="pl-9 w-[240px]" 
            />
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="relative border-purple-light/30 text-purple-dark hover:bg-purple-light/10 hover:text-purple-dark"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            className="relative border-purple-light/30 text-purple-dark hover:bg-purple-light/10 hover:text-purple-dark"
          >
            <BellRing className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-incident-critical" />
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            className="relative border-purple-light/30 text-purple-dark hover:bg-purple-light/10 hover:text-purple-dark"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="gap-2 hidden sm:flex bg-purple-medium hover:bg-purple-dark"
            onClick={handleNewIncident}
          >
            <PlusCircle className="h-4 w-4" />
            New Incident
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8 border-2 border-purple-light/30">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-purple-light/20 text-purple-dark">TU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <BellRing className="mr-2 h-4 w-4" />
                Notification Preferences
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
