import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AchievementCelebration } from "@/components/achievement-celebration";
import {
  Trophy,
  Award,
  Star,
  BookOpen,
  CheckCircle2,
  Lock,
  Flame,
  CheckSquare,
  BookOpenCheck,
  Beaker,
  Microscope,
  Atom,
  GraduationCap,
  Trophy as TrophyIcon,
  Sparkles,
  CalendarCheck,
  CalendarHeart,
  CalendarRange,
} from "lucide-react";
import { queryClient } from "@/lib/queryClient";

// Define achievement category colors
const categoryColors: Record<string, string> = {
  tasks: "bg-blue-500",
  practicals: "bg-green-500",
  tutorials: "bg-purple-500",
  exams: "bg-amber-500",
  streak: "bg-red-500",
};

// Map icon names to components
const iconMap: Record<string, React.ReactNode> = {
  "checkbox": <CheckSquare className="h-6 w-6" />,
  "check-all": <CheckCircle2 className="h-6 w-6" />,
  "award": <Award className="h-6 w-6" />,
  "flask": <Beaker className="h-6 w-6" />,
  "microscope": <Microscope className="h-6 w-6" />,
  "atom": <Atom className="h-6 w-6" />,
  "book": <BookOpen className="h-6 w-6" />,
  "books": <BookOpenCheck className="h-6 w-6" />,
  "graduation-cap": <GraduationCap className="h-6 w-6" />,
  "star": <Star className="h-6 w-6" />,
  "stars": <Sparkles className="h-6 w-6" />,
  "trophy": <TrophyIcon className="h-6 w-6" />,
  "calendar-check": <CalendarCheck className="h-6 w-6" />,
  "calendar-heart": <CalendarHeart className="h-6 w-6" />,
  "calendar-star": <CalendarRange className="h-6 w-6" />,
  "default": <Award className="h-6 w-6" />,
};

// Get the appropriate badge text and color based on level
const getLevelBadge = (level: number) => {
  switch (level) {
    case 1:
      return { text: "Bronze", color: "bg-amber-600" };
    case 2:
      return { text: "Silver", color: "bg-slate-400" };
    case 3:
      return { text: "Gold", color: "bg-yellow-500" };
    default:
      return { text: "Bronze", color: "bg-amber-600" };
  }
};

// Helper function to render the icon
const renderIcon = (iconName: string) => {
  return iconMap[iconName] || iconMap.default;
};

interface UserStats {
  user: {
    name: string;
    points: number;
    level: number;
    streak: number;
    lastActivityDate: string | null;
  };
  stats: {
    completedTasks: number;
    completedPracticals: number;
    completedTutorials: number;
    highScoringExams: number;
    unlockedAchievements: number;
    totalAchievements: number;
  };
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  pointsAwarded: number;
  requiredCount: number;
  level: number;
}

interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  currentCount: number;
  completed: boolean;
  unlockedAt: string | null;
  achievement: Achievement;
}

export default function Achievements() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State for newly unlocked achievements
  const [unlockedAchievements, setUnlockedAchievements] = useState<UserAchievement[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  
  // Fetch user achievements
  const { data: achievements, isLoading: achievementsLoading } = useQuery<UserAchievement[]>({
    queryKey: ["/api/achievements"],
    staleTime: 60000, // 1 minute
  });
  
  // Fetch user stats
  const { data: stats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ["/api/achievements/stats"],
    staleTime: 60000, // 1 minute
  });
  
  // Check for newly unlocked achievements
  const checkAchievementsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/achievements/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to check achievements");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      if (data.hasNewAchievements) {
        setUnlockedAchievements(data.unlockedAchievements);
        setShowAchievementModal(true);
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
        queryClient.invalidateQueries({ queryKey: ["/api/achievements/stats"] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Check for achievements when page loads
  useEffect(() => {
    checkAchievementsMutation.mutate();
  }, []);
  
  // Calculate the points needed for the next level
  const getPointsForNextLevel = (currentLevel: number) => {
    return currentLevel * 500; // Simple formula: level * 500
  };
  
  // Group achievements by category
  const groupedAchievements = achievements?.reduce((acc, achievement) => {
    const category = achievement.achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, UserAchievement[]>) || {};
  
  // Get human-readable category names
  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      tasks: "Task Completion",
      practicals: "Lab Work",
      tutorials: "Tutorials",
      exams: "Exams",
      streak: "Consistency",
    };
    return names[category] || category;
  };
  
  if (achievementsLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!achievements || !stats) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Achievements</h1>
        <p>Failed to load achievement data. Please try again later.</p>
      </div>
    );
  }
  
  const pointsForNextLevel = getPointsForNextLevel(stats.user.level);
  const progressPercentage = (stats.user.points / pointsForNextLevel) * 100;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Achievements</h1>
          <p className="text-muted-foreground">Track your progress and unlock rewards as you learn</p>
        </div>
        
        <Button 
          onClick={() => checkAchievementsMutation.mutate()} 
          disabled={checkAchievementsMutation.isPending}
          className="mt-4 md:mt-0"
        >
          {checkAchievementsMutation.isPending ? (
            <span className="flex items-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
              Checking...
            </span>
          ) : (
            <span className="flex items-center">
              <Trophy className="mr-2 h-5 w-5" />
              Check Achievements
            </span>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Stats Card */}
        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Student Profile
            </CardTitle>
            <CardDescription>Your current progress</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-5">
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Level {stats.user.level}</span>
                <span className="text-sm text-muted-foreground">Level {stats.user.level + 1}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between items-center text-sm">
                <span>{stats.user.points} points</span>
                <span>{pointsForNextLevel} points</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-3 flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">{stats.user.streak}</span>
                <span className="text-sm text-muted-foreground">Day Streak</span>
              </div>
              <div className="bg-muted rounded-lg p-3 flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">{stats.stats.unlockedAchievements}</span>
                <span className="text-sm text-muted-foreground">Achievements</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Your Stats</h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-blue-500" />
                    Tasks Completed
                  </span>
                  <span className="font-medium">{stats.stats.completedTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <Beaker className="mr-2 h-4 w-4 text-green-500" />
                    Practicals Completed
                  </span>
                  <span className="font-medium">{stats.stats.completedPracticals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
                    Tutorials Completed
                  </span>
                  <span className="font-medium">{stats.stats.completedTutorials}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <Star className="mr-2 h-4 w-4 text-amber-500" />
                    High Scoring Exams
                  </span>
                  <span className="font-medium">{stats.stats.highScoringExams}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Achievements Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>
              {stats.stats.unlockedAchievements} of {stats.stats.totalAchievements} achievements unlocked
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 grid grid-cols-6 w-full md:w-auto">
                <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
                <TabsTrigger value="tasks" className="text-xs md:text-sm">Tasks</TabsTrigger>
                <TabsTrigger value="practicals" className="text-xs md:text-sm">Lab</TabsTrigger>
                <TabsTrigger value="tutorials" className="text-xs md:text-sm">Tutorials</TabsTrigger>
                <TabsTrigger value="exams" className="text-xs md:text-sm">Exams</TabsTrigger>
                <TabsTrigger value="streak" className="text-xs md:text-sm">Streak</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {Object.keys(groupedAchievements).map((category) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-semibold">{getCategoryName(category)}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupedAchievements[category].map((achievement) => (
                        <AchievementCard 
                          key={achievement.id} 
                          achievement={achievement} 
                          categoryColor={categoryColors[achievement.achievement.category]}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              {Object.keys(groupedAchievements).map((category) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedAchievements[category].map((achievement) => (
                      <AchievementCard 
                        key={achievement.id} 
                        achievement={achievement} 
                        categoryColor={categoryColors[achievement.achievement.category]}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Achievement Unlocked Modal */}
      {showAchievementModal && unlockedAchievements.length > 0 && (
        <AchievementCelebration
          achievements={unlockedAchievements}
          onClose={() => setShowAchievementModal(false)}
          categoryColors={categoryColors}
          renderIcon={renderIcon}
        />
      )}
    </div>
  );
}

// Achievement card component
interface AchievementCardProps {
  achievement: UserAchievement;
  categoryColor: string;
}

function AchievementCard({ achievement, categoryColor }: AchievementCardProps) {
  const { achievement: achievementDetails, completed, currentCount } = achievement;
  const { level, requiredCount, name, description, icon, pointsAwarded } = achievementDetails;
  
  const levelBadge = getLevelBadge(level);
  const progressPercentage = Math.min((currentCount / requiredCount) * 100, 100);
  
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${completed ? 'border-2 border-primary' : 'opacity-90'}`}>
      <div className={`h-1.5 ${completed ? categoryColor : 'bg-gray-200 dark:bg-gray-700'}`}></div>
      <CardHeader className="pb-2 flex flex-row justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${completed ? categoryColor : 'bg-gray-200 dark:bg-gray-700'}`}>
            {completed ? (
              <div className="text-white">{renderIcon(icon)}</div>
            ) : (
              <Lock className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            )}
          </div>
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <Badge className={`mt-1 ${completed ? levelBadge.color : 'bg-gray-200 dark:bg-gray-700'}`}>
              {levelBadge.text}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 pb-2">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span>Progress</span>
            <span>{currentCount}/{requiredCount}</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-3 flex justify-between items-center">
        <div className="flex items-center">
          <Flame className={`h-4 w-4 mr-1 ${completed ? 'text-primary' : 'text-gray-400'}`} />
          <span className={`text-sm font-medium ${completed ? 'text-primary' : 'text-muted-foreground'}`}>
            {pointsAwarded} points
          </span>
        </div>
        {completed && (
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
            Unlocked
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}