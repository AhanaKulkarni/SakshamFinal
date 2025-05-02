import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Trash2, Plus } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from "@/lib/queryClient";
import MainLayout from '@/layouts/main-layout';

interface Task {
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: string;
  completed: boolean;
}

export default function TodoList() {
  const { toast } = useToast();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: null as Date | null,
    priority: 'Medium'
  });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  
  // Fetch tasks
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['/api/tasks'],
    queryFn: () => fetch('/api/tasks').then(res => {
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    })
  });
  
  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: any) => {
      const res = await apiRequest('POST', '/api/tasks', taskData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      setNewTask({
        title: '',
        description: '',
        dueDate: null,
        priority: 'Medium'
      });
      setShowNewTaskForm(false);
      toast({
        title: "Task created",
        description: "Your task has been added to the list",
      });
      
      // Create activity for new task
      createActivityMutation.mutate({
        title: "Added a new task",
        type: "info"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create task",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number, completed: boolean }) => {
      const res = await apiRequest('POST', `/api/tasks/${id}`, { completed });
      return await res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      
      // Create activity for completed task
      if (variables.completed) {
        const task = tasks.find((t: Task) => t.id === variables.id);
        createActivityMutation.mutate({
          title: `Completed task: ${task?.title}`,
          type: "success"
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update task",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Create activity mutation
  const createActivityMutation = useMutation({
    mutationFn: async (activityData: any) => {
      const res = await apiRequest('POST', '/api/activities', activityData);
      return await res.json();
    },
    onError: (error: Error) => {
      console.error("Failed to create activity:", error);
    }
  });
  
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) {
      toast({
        title: "Task title required",
        description: "Please enter a title for your task",
        variant: "destructive",
      });
      return;
    }
    
    createTaskMutation.mutate({
      title: newTask.title,
      description: newTask.description || null,
      dueDate: newTask.dueDate ? newTask.dueDate.toISOString() : null,
      priority: newTask.priority
    });
  };
  
  const handleTaskToggle = (task: Task) => {
    updateTaskMutation.mutate({
      id: task.id,
      completed: !task.completed
    });
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 hover:bg-red-600';
      case 'Medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Low':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">To-Do List</h1>
          <Button 
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
            variant="default"
            className="flex items-center gap-2"
          >
            {showNewTaskForm ? 'Cancel' : 'New Task'} {!showNewTaskForm && <Plus size={16} />}
          </Button>
        </div>
        
        {showNewTaskForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
              <CardDescription>Enter the details of your new task</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateTask}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Task title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Input 
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Task description"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date (optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTask.dueDate ? format(newTask.dueDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTask.dueDate || undefined}
                          onSelect={(date) => setNewTask({...newTask, dueDate: date || null})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newTask.priority} 
                      onValueChange={(value) => setNewTask({...newTask, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewTaskForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createTaskMutation.isPending}
                >
                  {createTaskMutation.isPending ? 'Adding...' : 'Add Task'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="text-center text-red-500">
                <p>Failed to load tasks. Please try again later.</p>
              </div>
            </CardContent>
          </Card>
        ) : tasks.length === 0 ? (
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 my-10">
                <p className="text-lg">You don't have any tasks yet.</p>
                <p className="mt-2">Click the 'New Task' button to add your first task.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tasks.map((task: Task) => (
              <Card key={task.id} className="overflow-hidden">
                <div className="flex items-start p-4">
                  <div className="mr-4 pt-1">
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task)}
                      id={`task-${task.id}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {task.dueDate && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CalendarIcon size={12} />
                            {format(new Date(task.dueDate), 'MMM d, yyyy')}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}