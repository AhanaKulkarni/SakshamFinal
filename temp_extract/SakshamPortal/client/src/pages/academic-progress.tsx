import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { subjectGroups } from "@/lib/utils";

interface SubjectProgress {
  id: number;
  name: string;
  icon: string;
  group: string;
  practicals: {
    completed: number;
    total: number;
  };
  tutorials: {
    completed: number;
    total: number;
  };
  overall: number;
}

export default function AcademicProgress() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const { data: progressData, isLoading } = useQuery<{
    group1Progress: number;
    group2Progress: number;
    subjectProgress: SubjectProgress[];
  }>({
    queryKey: ['/api/academic-progress'],
  });

  const filteredSubjects = progressData?.subjectProgress.filter(subject => {
    if (selectedFilter === "all") return true;
    return subject.group === selectedFilter;
  });

  return (
    <section className="mt-6 space-y-6">
      <div>
        <h2 className="text-2xl font-poppins font-bold text-neutral-800 dark:text-neutral-100">
          Academic Progress Tracker
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Monitor your practical completions and tutorial progress
        </p>
      </div>
      
      {isLoading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p>Loading progress data...</p>
          </CardContent>
        </Card>
      ) : progressData ? (
        <>
          {/* Progress Summary */}
          <Card>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Group 1 Progress */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-medium text-lg text-neutral-800 dark:text-neutral-100">Group 1</h3>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {progressData.group1Progress}% Complete
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={progressData.group1Progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    {subjectGroups.group1.slice(0, 3).map(subject => {
                      const subjectData = progressData.subjectProgress.find(s => s.id === subject.id);
                      if (!subjectData) return null;
                      
                      return (
                        <div key={subject.id}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-700 dark:text-neutral-300">{subject.name}</span>
                            <span className="text-neutral-600 dark:text-neutral-400">
                              {subjectData.practicals.completed}/{subjectData.practicals.total}
                            </span>
                          </div>
                          <div className="mt-1">
                            <Progress 
                              value={(subjectData.practicals.completed / subjectData.practicals.total) * 100} 
                              className="h-1.5" 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Group 2 Progress */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-medium text-lg text-neutral-800 dark:text-neutral-100">Group 2</h3>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {progressData.group2Progress}% Complete
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={progressData.group2Progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    {subjectGroups.group2.slice(0, 3).map(subject => {
                      const subjectData = progressData.subjectProgress.find(s => s.id === subject.id);
                      if (!subjectData) return null;
                      
                      return (
                        <div key={subject.id}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-700 dark:text-neutral-300">{subject.name}</span>
                            <span className="text-neutral-600 dark:text-neutral-400">
                              {subjectData.practicals.completed}/{subjectData.practicals.total}
                            </span>
                          </div>
                          <div className="mt-1">
                            <Progress 
                              value={(subjectData.practicals.completed / subjectData.practicals.total) * 100} 
                              className="h-1.5" 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Milestone */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 bg-primary bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center mb-3">
                    <i className="ri-trophy-line text-3xl text-primary"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-neutral-800 dark:text-neutral-100">
                    68% Complete!
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                    Keep going! You're making great progress.
                  </p>
                  <div className="mt-4 w-full bg-white dark:bg-dark-surface bg-opacity-70 dark:bg-opacity-20 rounded-lg px-4 py-3">
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Next milestone: <span className="text-primary">75%</span>
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Complete 3 more practicals to reach it!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Detailed Subject Progress */}
          <Card>
            <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="font-poppins font-semibold text-neutral-800 dark:text-neutral-100">
                Subject-wise Progress Details
              </h3>
              <div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 w-[140px]">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="group1">Group 1</SelectItem>
                    <SelectItem value="group2">Group 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Practicals
                    </th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Tutorials
                    </th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Overall
                    </th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-surface divide-y divide-neutral-200 dark:divide-neutral-700">
                  {filteredSubjects && filteredSubjects.map(subject => (
                    <tr key={subject.id}>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                            <i className={`${subject.icon} text-primary`}></i>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{subject.name}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{subject.group}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-neutral-700 dark:text-neutral-300 mr-2">
                            {subject.practicals.completed}/{subject.practicals.total}
                          </span>
                          <div className="w-24 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary dark:bg-primary rounded-full" 
                              style={{width: `${(subject.practicals.completed / subject.practicals.total) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-neutral-700 dark:text-neutral-300 mr-2">
                            {subject.tutorials.completed}/{subject.tutorials.total}
                          </span>
                          <div className="w-24 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary dark:bg-primary rounded-full" 
                              style={{width: `${(subject.tutorials.completed / subject.tutorials.total) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <Badge className="px-2 py-1 bg-primary bg-opacity-10 text-primary dark:bg-opacity-20">
                          {subject.overall}%
                        </Badge>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-sm">
                        <Button variant="link" className="text-primary p-0">Update</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p>No progress data available.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
