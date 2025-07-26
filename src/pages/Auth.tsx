import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Zap } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isSignedIn, isLoaded } = useUser();

  // Redirect if already signed in
  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading while checking auth status
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center space-y-4">
          <LoadingSpinner size="xl" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Left Panel - Brand Info */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
        <div className="relative z-10 text-white">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-2xl">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold">D2C Booster</span>
              <div className="text-sm opacity-80">Professional Dashboard</div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Manage your D2C brand 
            <span className="block text-accent">like a pro.</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Unlock powerful insights, streamline operations, and boost customer engagement with our comprehensive analytics platform.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 bg-accent rounded-full shadow-lg"></div>
              <span className="font-medium">Real-time feedback analytics with AI insights</span>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 bg-accent rounded-full shadow-lg"></div>
              <span className="font-medium">Automated order management & tracking</span>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 bg-accent rounded-full shadow-lg"></div>
              <span className="font-medium">Smart DM automation & customer support</span>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-background to-muted/20">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                D2C Booster
              </span>
              <div className="text-xs text-muted-foreground">Professional Dashboard</div>
            </div>
          </div>

          <Card className="card-modern shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center space-x-1 mb-6 p-1 bg-muted/50 rounded-xl">
                <Button
                  variant={isLogin ? "default" : "ghost"}
                  onClick={() => setIsLogin(true)}
                  className={cn(
                    "flex-1 rounded-lg transition-all duration-200",
                    isLogin && "bg-primary text-primary-foreground shadow-md"
                  )}
                >
                  Login
                </Button>
                <Button
                  variant={!isLogin ? "default" : "ghost"}
                  onClick={() => setIsLogin(false)}
                  className={cn(
                    "flex-1 rounded-lg transition-all duration-200",
                    !isLogin && "bg-primary text-primary-foreground shadow-md"
                  )}
                >
                  Sign Up
                </Button>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-base">
                {isLogin 
                  ? "Enter your credentials to access your professional dashboard." 
                  : "Join thousands of successful D2C brands today."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Clerk Auth Components */}
              <div className="flex justify-center">
                {isLogin ? (
                  <SignIn 
                    fallbackRedirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105",
                        card: "shadow-none border-none bg-transparent p-0",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-border hover:bg-muted/50 rounded-xl transition-all duration-200",
                        dividerLine: "bg-gradient-to-r from-transparent via-border to-transparent",
                        dividerText: "text-muted-foreground",
                        formFieldInput: "border-border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-200",
                        footerActionLink: "text-primary hover:text-primary/80 font-medium"
                      }
                    }}
                  />
                ) : (
                  <SignUp 
                    fallbackRedirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105",
                        card: "shadow-none border-none bg-transparent p-0",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-border hover:bg-muted/50 rounded-xl transition-all duration-200",
                        dividerLine: "bg-gradient-to-r from-transparent via-border to-transparent",
                        dividerText: "text-muted-foreground",
                        formFieldInput: "border-border rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-200",
                        footerActionLink: "text-primary hover:text-primary/80 font-medium"
                      }
                    }}
                  />
                )}
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-muted-foreground font-medium">
                      {isLogin ? "New to D2C Booster?" : "Already have an account?"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200 hover:underline"
                  >
                    {isLogin ? "Create an account" : "Sign in instead"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;