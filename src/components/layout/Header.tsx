
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BellRing, 
  PlusCircle, 
  Search
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

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = (path: string) => {
    switch (true) {
      case path === '/':
        return 'Dashboard';
      case path.includes('/incidents'):
        return 'Incidents';
      case path.includes('/notifications'):
        return 'Notifications';
      case path.includes('/analytics'):
        return 'Analytics';
      case path.includes('/knowledge'):
        return 'Knowledge Base';
      case path.includes('/search'):
        return 'Search';
      case path.includes('/settings'):
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="border-b border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{getPageTitle(location.pathname)}</h1>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search incidents..." 
              className="pl-9 w-[240px]" 
            />
          </div>

          <Button variant="outline" size="icon" className="relative">
            <BellRing className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-incident-critical" />
          </Button>
          
          <Button variant="default" size="sm" className="gap-2 hidden sm:flex">
            <PlusCircle className="h-4 w-4" />
            New Incident
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>TU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
              <DropdownMenuItem>API Access</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
