import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import tcetOfficialLogo from "@/assets/tcet-official-logo.png";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
}

interface Activity {
  id: number;
  title: string;
  timestamp: string;
  type: "success" | "primary" | "info" | "warning";
}

export default function Dashboard() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (user?.name) {
      setFirstName(user.name.split(' ')[0]);
    }
  }, [user]);

  const { data: tasks, isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  return (
    <section className="space-y-6">
      {/* Official TCET Logo and Header */}
      <div className="flex justify-between items-center mb-6">
        <Badge className="px-3 py-1 rounded-full bg-primary bg-opacity-20 text-primary dark:bg-opacity-20">
          <i className="ri-calendar-line mr-1"></i> SEMESTER 1 - 2023
        </Badge>
        <img src={tcetOfficialLogo} alt="TCET Official Logo" className="h-24 w-auto" />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-neutral-800 dark:text-neutral-100">
            Welcome back, {firstName}!
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Here's your academic progress at a glance
          </p>
        </div>
      </div>
      
      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Overall Progress</p>
                <h3 className="mt-1 text-2xl font-bold text-neutral-800 dark:text-neutral-100">68%</h3>
              </div>
              <div className="bg-primary bg-opacity-20 dark:bg-opacity-30 p-2 rounded-lg">
                <i className="ri-pie-chart-line text-xl text-primary"></i>
              </div>
            </div>
            
            <div className="mt-4">
              <Progress value={68} className="h-2" />
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                <i className="ri-arrow-up-line text-success"></i> 12% improvement since last month
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Practicals Status */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Practicals Completed</p>
                <h3 className="mt-1 text-2xl font-bold text-neutral-800 dark:text-neutral-100">24/40</h3>
              </div>
              <div className="bg-info bg-opacity-20 p-2 rounded-lg">
                <i className="ri-flask-line text-xl text-info"></i>
              </div>
            </div>
            
            <div className="mt-4">
              <Progress value={60} className="h-2" />
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">60% complete</span> - 16 more to go
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Average Score */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Average Score</p>
                <h3 className="mt-1 text-2xl font-bold text-neutral-800 dark:text-neutral-100">76%</h3>
              </div>
              <div className="bg-success bg-opacity-20 p-2 rounded-lg">
                <i className="ri-award-line text-xl text-success"></i>
              </div>
            </div>
            
            <div className="mt-4">
              <Progress value={76} className="h-2" />
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Grade: <span className="font-medium text-success">A</span> (First Class)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Tasks & Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card>
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="font-poppins font-semibold text-neutral-800 dark:text-neutral-100">Upcoming Tasks</h3>
            <a href="/todos" className="text-sm text-primary dark:text-primary hover:underline">View All</a>
          </div>
          
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {tasksLoading ? (
              <div className="p-4 text-center">Loading tasks...</div>
            ) : tasks && tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.id} className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full border-2 border-primary mr-3"></div>
                    <div className="flex-1">
                      <p className="text-neutral-800 dark:text-neutral-200">{task.title}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{task.dueDate}</p>
                    </div>
                    <Badge variant={
                      task.priority === "High" ? "warning" :
                      task.priority === "Medium" ? "default" : "info"
                    } className="px-2 py-1 rounded text-xs bg-opacity-20">
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-neutral-500">No upcoming tasks</div>
            )}
          </div>
        </Card>
        
        {/* Recent Activities */}
        <Card>
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="font-poppins font-semibold text-neutral-800 dark:text-neutral-100">Recent Activities</h3>
          </div>
          
          <div className="relative px-4 py-2">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
            
            {activitiesLoading ? (
              <div className="p-4 text-center">Loading activities...</div>
            ) : activities && activities.length > 0 ? (
              <ul className="space-y-4">
                {activities.map(activity => (
                  <li key={activity.id} className="relative pl-6">
                    <div className={`absolute left-0 top-1 h-3 w-3 rounded-full bg-${activity.type} border-2 border-white dark:border-dark-surface z-10`}></div>
                    <div>
                      <p className="text-neutral-800 dark:text-neutral-200">{activity.title}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{activity.timestamp}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-neutral-500">No recent activities</div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
