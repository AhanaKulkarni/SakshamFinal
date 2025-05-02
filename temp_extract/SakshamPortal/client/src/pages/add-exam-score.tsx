import React, { useState } from 'react';
import { useLocation } from 'wouter';
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from "@/lib/queryClient";
import MainLayout from '@/layouts/main-layout';
import { calculateGrade } from '@/lib/utils';

interface Subject {
  id: number;
  name: string;
}

export default function AddExamScore() {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    subjectId: 0,
    testName: '',
    marks: '',
    totalMarks: '',
    date: new Date()
  });
  
  // Fetch subjects for the dropdown
  const { data: subjects = [], isLoading: isLoadingSubjects } = useQuery({
    queryKey: ['/api/subjects'],
    queryFn: async () => {
      const res = await fetch('/api/subjects');
      if (!res.ok) throw new Error('Failed to fetch subjects');
      return res.json();
    }
  });
  
  // Calculate percentage and grade
  const percentage = formData.marks && formData.totalMarks 
    ? Math.round((parseInt(formData.marks) / parseInt(formData.totalMarks)) * 100) 
    : 0;
  
  const grade = calculateGrade(percentage);
  
  // Create exam score mutation
  const createScoreMutation = useMutation({
    mutationFn: async (scoreData: any) => {
      const res = await apiRequest('POST', '/api/exam-performance', scoreData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exam-performance'] });
      toast({
        title: "Score added",
        description: "Your exam score has been recorded successfully",
      });
      
      // Create activity for new score
      createActivityMutation.mutate({
        title: `Added new exam score: ${formData.testName}`,
        type: "primary"
      });
      
      // Navigate back to exam performance page
      setLocation('/exam-performance');
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add score",
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subjectId) {
      toast({
        title: "Subject required",
        description: "Please select a subject",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.testName.trim()) {
      toast({
        title: "Test name required",
        description: "Please enter the name of the test",
        variant: "destructive",
      });
      return;
    }
    
    const marks = parseInt(formData.marks);
    const totalMarks = parseInt(formData.totalMarks);
    
    if (isNaN(marks) || marks < 0) {
      toast({
        title: "Invalid marks",
        description: "Please enter a valid positive number for marks",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(totalMarks) || totalMarks <= 0) {
      toast({
        title: "Invalid total marks",
        description: "Total marks must be a positive number greater than zero",
        variant: "destructive",
      });
      return;
    }
    
    if (marks > totalMarks) {
      toast({
        title: "Invalid marks",
        description: "Marks obtained cannot be greater than total marks",
        variant: "destructive",
      });
      return;
    }
    
    createScoreMutation.mutate({
      subjectId: parseInt(formData.subjectId.toString()),
      testName: formData.testName,
      marks: marks,
      totalMarks: totalMarks,
      date: formData.date.toISOString()
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Add Exam Score</h1>
            <Button 
              variant="outline"
              onClick={() => setLocation('/exam-performance')}
            >
              Back to Scores
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>New Exam Score</CardTitle>
              <CardDescription>Record a new examination score</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={formData.subjectId.toString()} 
                    onValueChange={value => handleSelectChange('subjectId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingSubjects ? (
                        <SelectItem value="loading" disabled>Loading subjects...</SelectItem>
                      ) : subjects.length === 0 ? (
                        <SelectItem value="none" disabled>No subjects available</SelectItem>
                      ) : (
                        subjects.map((subject: Subject) => (
                          <SelectItem key={subject.id} value={subject.id.toString()}>
                            {subject.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="testName">Test Name</Label>
                  <Input 
                    id="testName"
                    name="testName"
                    value={formData.testName}
                    onChange={handleInputChange}
                    placeholder="e.g., Mid-term Exam, Quiz 1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marks">Marks Obtained</Label>
                    <Input 
                      id="marks"
                      name="marks"
                      type="number"
                      min="0"
                      value={formData.marks}
                      onChange={handleInputChange}
                      placeholder="e.g., 85"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input 
                      id="totalMarks"
                      name="totalMarks"
                      type="number"
                      min="1"
                      value={formData.totalMarks}
                      onChange={handleInputChange}
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date || undefined}
                        onSelect={(date) => setFormData({...formData, date: date || new Date()})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {formData.marks && formData.totalMarks && (
                  <div className="pt-2">
                    <div className="bg-muted rounded-md p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Percentage</p>
                          <p className="text-2xl font-bold">{percentage}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Grade</p>
                          <p className="text-2xl font-bold">{grade}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setLocation('/exam-performance')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createScoreMutation.isPending}
                >
                  {createScoreMutation.isPending ? 'Saving...' : 'Save Score'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}