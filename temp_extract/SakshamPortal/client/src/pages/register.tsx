import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import tcetOfficialLogo from "@/assets/tcet-official-logo.png";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const { register: registerUser } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Remove confirm password before sending to API
      const { confirmPassword, ...registerData } = data;
      
      // Call the register function from auth context
      await registerUser(registerData);
      
      // After successful registration, redirect to dashboard
      setLocation("/dashboard");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
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
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-primary">Create Account</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Join TCET SAKSHAM PORTAL</p>
          </div>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                className="w-full"
                {...form.register("username")}
              />
              {form.formState.errors.username && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.username.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="w-full"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
              )}
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
                  className="w-full pr-10"
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
            
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pr-10"
                  {...form.register("confirmPassword")}
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 
                    <EyeOff className="h-4 w-4 text-neutral-500" /> : 
                    <Eye className="h-4 w-4 text-neutral-500" />
                  }
                </div>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium"
              disabled={isLoading}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => setLocation("/")}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}