import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BarChart3, MessageSquare, ShoppingCart, Home, LogOut, Zap, Search, Bell, Settings, User } from "lucide-react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommandPalette } from "@/components/ui/command-palette";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
    <Sidebar className="border-r bg-gradient-to-b from-background to-muted/20">
      <SidebarContent>
        <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                D2C Booster
              </span>
              <div className="text-xs text-muted-foreground">Pro Dashboard</div>
            </div>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={cn(
                        getNavCls({ isActive: isActive(item.url) }),
                        "group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-md"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                      {isActive(item.url) && (
                        <div className="absolute right-2 w-2 h-2 bg-primary rounded-full" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t bg-gradient-to-r from-muted/20 to-background">
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Usage</span>
              <Badge variant="secondary" className="text-xs">Pro</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-3/4" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">75% of monthly limit</p>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 transition-colors"
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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Command palette keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Redirect to auth if not signed in
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Show loading while checking auth status
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center space-y-4">
          <LoadingSpinner size="xl" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background/95 backdrop-blur-sm flex items-center px-6 sticky top-0 z-40">
            <SidebarTrigger />
            
            {/* Search Command Palette Trigger */}
            <Button
              variant="outline"
              className="ml-4 w-64 justify-start text-muted-foreground hover:bg-muted/50"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              Search commands...
              <Badge variant="secondary" className="ml-auto text-xs">⌘K</Badge>
            </Button>
            
            <div className="ml-auto">
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive">
                    3
                  </Badge>
                </Button>
                
                {/* Settings */}
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                
                {/* User Profile */}
                <span className="text-sm text-muted-foreground">
                  Welcome back, {user?.firstName || 'User'}!
                </span>
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg ring-2 ring-background">
                  <span className="text-sm font-medium text-white">
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </header>
          <div className="flex-1 p-6 bg-gradient-to-br from-background via-muted/10 to-background">
            {children}
          </div>
        </main>
      </div>
      
      <CommandPalette 
        open={commandPaletteOpen} 
        onOpenChange={setCommandPaletteOpen} 
      />
    </SidebarProvider>
  );
}