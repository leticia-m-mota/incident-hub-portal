
import { ConfigProvider } from "antd";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import Incidents from "./pages/Incidents";
import IncidentDetail from "./pages/IncidentDetail";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import KnowledgeBase from "./pages/KnowledgeBase";
import UserManagement from "./pages/UserManagement";
import Services from "./pages/Services";
import Playbooks from "./pages/Playbooks";
import AISuggestions from "./pages/AISuggestions";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useState } from "react";

// Ant Design custom theme configuration
const antTheme = {
  token: {
    colorPrimary: '#9b87f5',
    colorInfo: '#9b87f5',
    colorSuccess: '#90EE90',
    colorWarning: '#FFD700',
    colorError: '#FF3A33',
    colorTextBase: '#403e43',
    fontFamily: 'inherit',
    borderRadius: 6,
  },
  components: {
    Button: {
      colorPrimary: '#9b87f5',
      algorithm: true,
    },
    Table: {
      colorPrimary: '#9b87f5',
    },
  },
};

const queryClient = new QueryClient();

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ConfigProvider theme={antTheme}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<ExecutiveDashboard />} />
                <Route path="incidents" element={<Incidents />} />
                <Route path="incidents/:id" element={<IncidentDetail />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="knowledge" element={<KnowledgeBase />} />
                <Route path="services" element={<Services />} />
                <Route path="playbooks" element={<Playbooks />} />
                <Route path="suggestions" element={<AISuggestions />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
