import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { subjectGroups } from "@/lib/utils";

interface Resource {
  id: number;
  type: string;
  title: string;
  url: string;
  icon: string;
}

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
  resourceCount: number;
  resources: Resource[];
}

export default function Resources() {
  const [selectedGroup, setSelectedGroup] = useState<string>("group1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [resourceType, setResourceType] = useState<string>("all");

  const { data: subjects, isLoading } = useQuery<Subject[]>({
    queryKey: ['/api/resources', selectedGroup],
  });

  const filteredSubjects = subjects?.map(subject => ({
    ...subject,
    resources: subject.resources.filter(resource => {
      const matchesType = resourceType === "all" || resource.type === resourceType;
      const matchesSearch = !searchQuery || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
  }));

  return (
    <section className="mt-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-neutral-800 dark:text-neutral-100">
            Study Resources
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Access all your study materials organized by subject groups
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            variant={selectedGroup === "group1" ? "default" : "outline"}
            onClick={() => setSelectedGroup("group1")}
          >
            Group 1
          </Button>
          <Button 
            variant={selectedGroup === "group2" ? "default" : "outline"}
            onClick={() => setSelectedGroup("group2")}
          >
            Group 2
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="border-b border-neutral-200 dark:border-neutral-700">
          <Tabs defaultValue="all" onValueChange={setResourceType}>
            <TabsList className="flex overflow-x-auto">
              <TabsTrigger value="all" className="px-4 py-3 whitespace-nowrap">
                All Resources
              </TabsTrigger>
              <TabsTrigger value="ebook" className="px-4 py-3 whitespace-nowrap">
                E-books & PDFs
              </TabsTrigger>
              <TabsTrigger value="video" className="px-4 py-3 whitespace-nowrap">
                YouTube Playlists
              </TabsTrigger>
              <TabsTrigger value="online" className="px-4 py-3 whitespace-nowrap">
                Online Resources
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search resources..." 
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-neutral-500"></i>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <p>Loading resources...</p>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects && filteredSubjects.map(subject => (
              <div key={subject.id} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className={`h-2 bg-${subject.color}`}></div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-poppins font-medium text-neutral-800 dark:text-neutral-100">
                        {subject.name}
                      </h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {subject.resourceCount} resources available
                      </p>
                    </div>
                    <div className={`bg-${subject.color} bg-opacity-20 p-2 rounded-lg`}>
                      <i className={`${subject.icon} text-${subject.color}`}></i>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {subject.resources.slice(0, 3).map(resource => (
                      <a 
                        key={resource.id}
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition"
                      >
                        <i className={`${resource.icon} mr-2`}></i>
                        <span>{resource.title}</span>
                      </a>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full py-2 text-sm text-primary border-primary border-opacity-50"
                  >
                    View All Resources
                  </Button>
                </div>
              </div>
            ))}
            
            {/* View more button */}
            {filteredSubjects && filteredSubjects.length > 0 && (
              <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-2">
                <Button variant="link" className="text-primary">
                  <span>View More Subjects</span>
                  <i className="ri-arrow-right-line ml-1"></i>
                </Button>
              </div>
            )}
            
            {/* No results found */}
            {filteredSubjects && filteredSubjects.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 p-8 text-center">
                <p className="text-neutral-500">No resources found matching your criteria. Try adjusting your search.</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </section>
  );
}
