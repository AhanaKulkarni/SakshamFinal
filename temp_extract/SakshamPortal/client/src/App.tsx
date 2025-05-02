import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ProtectedRoute } from "@/components/protected-route";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Resources from "@/pages/resources";
import AcademicProgress from "@/pages/academic-progress";
import ExamPerformance from "@/pages/exam-performance";
import TodoList from "@/pages/todo-list";
import AddExamScore from "@/pages/add-exam-score";
import Achievements from "@/pages/achievements";
import { AuthProvider } from "@/contexts/auth-context";
import MainLayout from "@/layouts/main-layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/register" component={Register} />
      
      <Route path="/dashboard" component={() => (
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      )} />
      
      <Route path="/resources" component={() => (
        <ProtectedRoute>
          <MainLayout>
            <Resources />
          </MainLayout>
        </ProtectedRoute>
      )} />
      
      <Route path="/academic-progress" component={() => (
        <ProtectedRoute>
          <MainLayout>
            <AcademicProgress />
          </MainLayout>
        </ProtectedRoute>
      )} />
      
      <Route path="/exam-performance" component={() => (
        <ProtectedRoute>
          <MainLayout>
            <ExamPerformance />
          </MainLayout>
        </ProtectedRoute>
      )} />
      
      <Route path="/achievements" component={() => (
        <ProtectedRoute>
          <MainLayout>
            <Achievements />
          </MainLayout>
        </ProtectedRoute>
      )} />
      
      <Route path="/add-exam-score" component={() => (
        <ProtectedRoute>
          <MainLayout>
            <AddExamScore />
          </MainLayout>
        </ProtectedRoute>
      )} />
      
      <Route path="/todo-list" component={() => (
        <ProtectedRoute>
          <MainLayout>
            <TodoList />
          </MainLayout>
        </ProtectedRoute>
      )} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="saksham-theme">
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
