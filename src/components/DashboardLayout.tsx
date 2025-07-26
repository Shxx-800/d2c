import { ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BarChart3, MessageSquare, ShoppingCart, Home, LogOut, Zap } from "lucide-react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser, useClerk } from "@clerk/clerk-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Feedback", url: "/feedback", icon: BarChart3 },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Auto-Reply", url: "/auto-reply", icon: MessageSquare },
];

function AppSidebar() {
  const location = useLocation();
  const { signOut } = useClerk();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted/50";

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">D2C Booster</span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isSignedIn, isLoaded, user } = useUser();

  // Redirect to auth if not signed in
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Show loading while checking auth status
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background flex items-center px-6">
            <SidebarTrigger />
            <div className="ml-auto">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome back, {user?.firstName || 'User'}!
                </span>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </header>
          <div className="flex-1 p-6 bg-slate-50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}