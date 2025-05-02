import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { validateEmail } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import tcetOfficialLogo from "@/assets/tcet-official-logo.png";

const loginSchema = z.object({
  email: z.string()
    .email("Invalid email address format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 bg-opacity-70 backdrop-blur-sm p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <img src={tcetOfficialLogo} alt="TCET Official Logo" className="h-24 w-auto" />
            </div>
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-primary">TCET SAKSHAM PORTAL</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Sign in with your TCET account</p>
          </div>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-4 pr-10"
                  {...form.register("email")}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="ri-mail-line text-neutral-500"></i>
                </div>
              </div>
              {form.formState.errors.email && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
              )}
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Any valid email address can be used</p>
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10"
                  {...form.register("password")}
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <EyeOff className="h-4 w-4 text-neutral-500" /> : 
                    <Eye className="h-4 w-4 text-neutral-500" />
                  }
                </div>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  {...form.register("rememberMe")}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium"
              disabled={isLoading}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="relative flex items-center justify-center my-6">
            <Separator className="flex-grow" />
            <span className="mx-4 text-sm text-neutral-500 dark:text-neutral-400">OR</span>
            <Separator className="flex-grow" />
          </div>

          <div className="flex justify-center">
            <button 
              type="button" 
              onClick={() => setLocation("/register")}
              className="text-primary hover:underline text-sm font-medium"
            >
              Don't have an account? Register now
            </button>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Need help? <a href="#" className="text-primary font-medium hover:underline">Contact support</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
