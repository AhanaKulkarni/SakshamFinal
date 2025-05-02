import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { calculateGrade } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

interface ExamScore {
  id: number;
  subject: string;
  testName: string;
  marks: number;
  totalMarks: number;
  date: string;
}

interface SubjectPerformance {
  id: number;
  name: string;
  averageScore: number;
  trend: {
    testName: string;
    score: number;
  }[];
}

export default function ExamPerformance() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("current");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const { data: examData, isLoading, refetch } = useQuery<{
    examScores: ExamScore[];
    subjectPerformance: SubjectPerformance[];
    overallTrend: { month: string; score: number }[];
  }>({
    queryKey: ['/api/exam-performance', selectedPeriod],
  });
  
  // Reset exams mutation
  const resetExamsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/reset-exam-scores', {});
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Exam scores reset",
        description: "All your exam scores have been deleted successfully.",
        variant: "default",
      });
      
      // Refresh the exam data
      refetch();
    },
    onError: (error: Error) => {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Filter data based on selected subject
  const filteredScores = examData?.examScores.filter(
    score => selectedSubject === "all" || score.subject === selectedSubject
  );
  
  const filteredPerformance = examData?.subjectPerformance.find(
    subject => subject.name === selectedSubject
  );

  return (
    <section className="mt-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-neutral-800 dark:text-neutral-100">
            Exam Performance Analytics
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your scores and identify areas for improvement
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/add-exam-score"}
          >
            Add New Score
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Reset All Scores</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete all your exam scores. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => resetExamsMutation.mutate()}
                  disabled={resetExamsMutation.isPending}
                >
                  {resetExamsMutation.isPending ? 'Resetting...' : 'Yes, reset all scores'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">76%</h3>
              <Badge className="bg-success">Grade A</Badge>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Average</span>
                  <span>76%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "76%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Highest Score</span>
                  <span>92%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lowest Score</span>
                  <span>58%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: "58%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Performance Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[180px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p>Loading chart data...</p>
              </div>
            ) : examData?.overallTrend ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={examData.overallTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(33 100% 50%)" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p>No trend data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Exam Scores</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="previous">Previous Semester</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Mathematics 1">Mathematics 1</SelectItem>
                  <SelectItem value="BEE">BEE</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <div>
          <Tabs defaultValue="list">
            <div className="px-4 pt-2">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                {selectedSubject !== "all" && (
                  <TabsTrigger value="subject">Subject Analysis</TabsTrigger>
                )}
              </TabsList>
            </div>
            
            <TabsContent value="list" className="p-0">
              {isLoading ? (
                <div className="p-8 text-center">
                  <p>Loading exam data...</p>
                </div>
              ) : filteredScores && filteredScores.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-50 dark:bg-neutral-800">
                      <tr>
                        <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Subject
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Test
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Marks
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Percentage
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-dark-surface divide-y divide-neutral-200 dark:divide-neutral-700">
                      {filteredScores.map(score => {
                        const percentage = (score.marks / score.totalMarks) * 100;
                        const grade = calculateGrade(percentage);
                        
                        return (
                          <tr key={score.id}>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                                {score.subject}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                {score.testName}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                {score.date}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                {score.marks}/{score.totalMarks}
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                                {percentage.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <Badge variant={
                                grade === 'A+' || grade === 'A' ? 'success' :
                                grade === 'B+' || grade === 'B' ? 'default' :
                                grade === 'C' ? 'info' :
                                grade === 'D' ? 'warning' : 'destructive'
                              }>
                                {grade}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p>No exam scores found for the selected filters.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="chart" className="pt-4 px-4 pb-8">
              {isLoading ? (
                <div className="p-8 text-center">
                  <p>Loading chart data...</p>
                </div>
              ) : filteredScores && filteredScores.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        name="Score (%)" 
                        dataKey={(entry) => (entry.marks / entry.totalMarks) * 100} 
                        fill="hsl(33 100% 50%)" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p>No data available for chart view.</p>
                </div>
              )}
            </TabsContent>
            
            {selectedSubject !== "all" && (
              <TabsContent value="subject" className="pt-4 px-4 pb-8">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <p>Loading subject analysis...</p>
                  </div>
                ) : filteredPerformance ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-sm font-medium text-neutral-500">Average Score</h3>
                          <p className="text-2xl font-bold mt-2">{filteredPerformance.averageScore}%</p>
                          <p className="text-sm text-neutral-500">Grade: {calculateGrade(filteredPerformance.averageScore)}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-sm font-medium text-neutral-500">Trend</h3>
                          <p className="text-2xl font-bold mt-2 text-success">+8%</p>
                          <p className="text-sm text-neutral-500">Since last assessment</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-sm font-medium text-neutral-500">Total Tests</h3>
                          <p className="text-2xl font-bold mt-2">{filteredPerformance.trend.length}</p>
                          <p className="text-sm text-neutral-500">All assessments</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredPerformance.trend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="testName" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            name="Score (%)" 
                            type="monotone" 
                            dataKey="score" 
                            stroke="hsl(33 100% 50%)" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Add New Test Score</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input placeholder="Test Name" />
                        <Input type="number" placeholder="Marks Obtained" />
                        <Input type="number" placeholder="Total Marks" />
                        <Button>Add Score</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p>No data available for subject analysis.</p>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </Card>
    </section>
  );
}
