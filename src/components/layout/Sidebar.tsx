
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AlertTriangle, 
  Bell, 
  BarChart, 
  Search, 
  Settings, 
  MessageSquareText,
  Home,
  Users,
  BookOpen,
  Cpu,
  BookMarked,
  Lightbulb,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = React.useState(isMobile);

  React.useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const NavigationItem = ({ to, icon: Icon, label }: { to: string, icon: React.ElementType, label: string }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors',
        isActive ? 'bg-sidebar-accent' : '',
        collapsed ? 'justify-center' : ''
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <div 
      className={cn(
        'h-screen bg-sidebar flex flex-col border-r border-sidebar-border',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center">
            <AlertTriangle size={20} className="text-purple-light mr-2" />
            <h1 className="font-bold text-xl text-sidebar-foreground">Incident Hub</h1>
          </div>
        ) : (
          <AlertTriangle size={24} className="text-purple-light mx-auto" />
        )}
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setCollapsed(true)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        )}
        {collapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute -right-3 top-10 h-7 w-7 p-0 bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent rounded-full"
            onClick={() => setCollapsed(false)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.1584 3.13514C5.95694 3.32401 5.94673 3.64042 6.13559 3.84188L9.565 7.49991L6.13559 11.1579C5.94673 11.3594 5.95694 11.6758 6.1584 11.8647C6.35986 12.0535 6.67627 12.0433 6.86514 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86514 3.15794C6.67627 2.95648 6.35986 2.94628 6.1584 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        )}
      </div>
      
      <div className="p-2">
        <p className={cn("text-xs uppercase text-sidebar-foreground/70 font-medium mb-2 mt-2", collapsed && "text-center")}>Main</p>
        <nav className="flex-1 space-y-1">
          <NavigationItem to="/" icon={Home} label="Home" />
          <NavigationItem to="/dashboard" icon={BarChart} label="Executive Dashboard" />
          <NavigationItem to="/incidents" icon={AlertTriangle} label="Incidents" />
          <NavigationItem to="/notifications" icon={Bell} label="Notifications" />
          <NavigationItem to="/analytics" icon={BarChart} label="Analytics & Metrics" />
        </nav>
      </div>
      
      <div className="p-2">
        <p className={cn("text-xs uppercase text-sidebar-foreground/70 font-medium mb-2 mt-2", collapsed && "text-center")}>Resources</p>
        <nav className="flex-1 space-y-1">
          <NavigationItem to="/knowledge" icon={BookOpen} label="Knowledge Base" />
          <NavigationItem to="/services" icon={Cpu} label="Services" />
          <NavigationItem to="/playbooks" icon={BookMarked} label="Playbooks" />
          <NavigationItem to="/suggestions" icon={Lightbulb} label="AI Suggestions" />
        </nav>
      </div>
      
      <div className="p-2">
        <p className={cn("text-xs uppercase text-sidebar-foreground/70 font-medium mb-2 mt-2", collapsed && "text-center")}>System</p>
        <nav className="flex-1 space-y-1">
          <NavigationItem to="/integrations" icon={GitBranch} label="Integrations" />
          <NavigationItem to="/users" icon={Users} label="User Management" />
          <NavigationItem to="/settings" icon={Settings} label="Settings" />
        </nav>
      </div>
      
      <div className="mt-auto p-2 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-2 p-2", collapsed && "justify-center")}>
          <div className="h-6 w-6 rounded-full bg-purple-light flex items-center justify-center text-xs font-medium text-purple-dark">
            TU
          </div>
          {!collapsed && (
            <div>
              <p className="text-xs font-medium text-sidebar-foreground">Team User</p>
              <p className="text-xs text-sidebar-foreground/70">Incident Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
