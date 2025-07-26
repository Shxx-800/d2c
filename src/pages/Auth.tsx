import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand Info */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-white">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold">D2C Booster</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">
            Manage your D2C brand like a pro.
          </h1>
          
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Unlock insights, streamline operations, and boost engagement.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Real-time feedback analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Automated order management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Smart DM automation</span>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-accent/30 rounded-full blur-lg"></div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">D2C Booster</span>
          </div>

          <Card className="card-modern">
            <CardHeader className="text-center">
              <div className="flex justify-center space-x-2 mb-4">
                <Button
                  variant={isLogin ? "default" : "outline"}
                  onClick={() => setIsLogin(true)}
                  className="flex-1"
                >
                  Login
                </Button>
                <Button
                  variant={!isLogin ? "default" : "outline"}
                  onClick={() => setIsLogin(false)}
                  className="flex-1"
                >
                  Sign Up
                </Button>
              </div>
              <CardTitle className="text-2xl">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? "Enter your credentials to access your account." 
                  : "Create your new account to get started."
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
                        formButtonPrimary: "btn-gradient",
                        card: "shadow-none border-none bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-border hover:bg-muted",
                        dividerLine: "bg-border",
                        dividerText: "text-muted-foreground",
                        formFieldInput: "border-border",
                        footerActionLink: "text-primary hover:text-primary/80"
                      }
                    }}
                  />
                ) : (
                  <SignUp 
                    fallbackRedirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        formButtonPrimary: "btn-gradient",
                        card: "shadow-none border-none bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-border hover:bg-muted",
                        dividerLine: "bg-border",
                        dividerText: "text-muted-foreground",
                        formFieldInput: "border-border",
                        footerActionLink: "text-primary hover:text-primary/80"
                      }
                    }}
                  />
                )}
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {isLogin ? "New to D2C Booster?" : "Already have an account?"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline text-sm"
                  >
                    {isLogin ? "Create an account" : "Sign in instead"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-foreground">
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