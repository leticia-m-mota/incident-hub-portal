
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AlertTriangle, 
  Bell, 
  BarChart, 
  Search, 
  Settings, 
  MessageSquareText,
  Home
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
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      <div className="p-4 border-b border-sidebar-border flex items-center justify-center">
        {!collapsed ? (
          <h1 className="font-bold text-xl text-sidebar-foreground">Incident Hub</h1>
        ) : (
          <AlertTriangle size={24} className="text-sidebar-foreground" />
        )}
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        <NavigationItem to="/" icon={Home} label="Dashboard" />
        <NavigationItem to="/incidents" icon={AlertTriangle} label="Incidents" />
        <NavigationItem to="/notifications" icon={Bell} label="Notifications" />
        <NavigationItem to="/analytics" icon={BarChart} label="Analytics" />
        <NavigationItem to="/knowledge" icon={MessageSquareText} label="Knowledge Base" />
        <NavigationItem to="/search" icon={Search} label="Search" />
      </nav>
      
      <div className="p-2 border-t border-sidebar-border">
        <NavigationItem to="/settings" icon={Settings} label="Settings" />
      </div>
    </div>
  );
};

export default Sidebar;
