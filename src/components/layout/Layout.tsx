
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useToast } from '@/components/ui/use-toast';

const Layout = () => {
  const { toast } = useToast();

  const handleIntegrationClick = (service: string) => {
    toast({
      title: `${service} Integration`,
      description: `The ${service} integration would open here in a production environment.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex items-center justify-between border-b border-border px-6 py-2 bg-secondary/50">
          <div className="flex space-x-2">
            <button 
              onClick={() => handleIntegrationClick('Jira')}
              className="px-3 py-1 text-xs rounded border border-border bg-background hover:bg-purple-light transition-colors flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" height="16" width="16" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005z"></path>
                <path d="M5.943 6.33H17.53c0 2.873-2.342 5.201-5.232 5.201H10.17V13.59a5.215 5.215 0 0 1-5.215 5.214V7.335c0-.554.45-1.005 1.005-1.005z" fill="currentColor" opacity=".5"></path>
                <path d="M11.572 1.005h11.57a5.218 5.218 0 0 1-5.23 5.215h-2.131v2.057A5.216 5.216 0 0 1 10.568 13.5V2.01c0-.555.45-1.005 1.004-1.005z" fill="currentColor" opacity=".2"></path>
              </svg>
              Jira
            </button>
            <button 
              onClick={() => handleIntegrationClick('Opsgenie')}
              className="px-3 py-1 text-xs rounded border border-border bg-background hover:bg-purple-light transition-colors flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" height="16" width="16" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.942 6.413a10 10 0 0 0-1.065 3.8H6.49A14.754 14.754 0 0 1 5.9 6.8a27.42 27.42 0 0 1-2.958-.387zm.236 8.81a10.107 10.107 0 0 0 1.006 2.775A14.972 14.972 0 0 1 6.6 16.987a14.106 14.106 0 0 1-3.422.236zm8.29 6.888a10.1 10.1 0 0 0 3.007-.68c-.222-1.386-.4-2.792-.6-4.208a14.587 14.587 0 0 1-2.407.428zm-1.468-.07a9.866 9.866 0 0 0 .877.07H11a9.847 9.847 0 0 0 1.102-.063v-4.6c-.367.018-.73.028-1.102.028s-.735-.01-1.102-.027zm-5.039-1.2a10 10 0 0 0 2.52 1.028c.068-1.483.157-2.962.272-4.438a15.56 15.56 0 0 1-2.391-.417 15.58 15.58 0 0 1-.401 3.826zm13.996-4.073a15.535 15.535 0 0 1-2.4.413c.119 1.477.207 2.96.278 4.442a9.952 9.952 0 0 0 2.508-1.023 15.539 15.539 0 0 1-.386-3.832zm2.03.249a14.11 14.11 0 0 1-3.415-.236 14.994 14.994 0 0 1 2.408 1.01 10.176 10.176 0 0 0 1.007-2.774zm2.031-4.987a10.09 10.09 0 0 0-1.064-3.8 27.243 27.243 0 0 1-2.946.386c-.392 1.13-.762 2.246-1.104 3.413h5.114zM11 1.5h-.123a9.866 9.866 0 0 0-.877.07v4.46c.367-.018.73-.03 1.102-.03s.735.012 1.102.03V1.57A9.847 9.847 0 0 0 11 1.507zm-2.068.23a9.99 9.99 0 0 0-3 .679c.222 1.386.4 2.792.6 4.208a14.456 14.456 0 0 1 2.4-.429zm-5.019 1.2a10.063 10.063 0 0 0-2.518 1.008c-.069 1.472-.162 2.945-.277 4.434a14.322 14.322 0 0 1 2.384.416 15.523 15.523 0 0 1 .41-3.826zM19.095 2.93a9.974 9.974 0 0 0-2.517-1.008 15.533 15.533 0 0 1 .413 3.826 14.07 14.07 0 0 1 2.377-.416 29.262 29.262 0 0 1-.273-2.402zm-7.993 5.826c-3.003 0-5.01 1.946-5.01 4.326 0 2.191 1.636 3.322 3.358 4.1 1.066-1.06 2.618-1.736 4.302-1.824a2.754 2.754 0 0 1-1.142-2.276 2.701 2.701 0 1 1 5.402 0 2.75 2.75 0 0 1-1.14 2.276c1.679.088 3.23.764 4.3 1.824 1.723-.778 3.36-1.909 3.36-4.1 0-2.38-2.008-4.326-5.01-4.326zM11 0a11 11 0 1 0 11 11A11.013 11.013 0 0 0 11 0z"></path>
              </svg>
              Opsgenie
            </button>
            <button 
              onClick={() => handleIntegrationClick('Slack')}
              className="px-3 py-1 text-xs rounded border border-border bg-background hover:bg-purple-light transition-colors flex items-center gap-1"
            >
              <svg viewBox="0 0 24 24" height="16" width="16" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"></path>
              </svg>
              Slack
            </button>
          </div>
          <div>
            <button 
              onClick={() => handleIntegrationClick('API Documentation')}
              className="px-3 py-1 text-xs rounded border border-border bg-background hover:bg-accent transition-colors"
            >
              API Docs
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
