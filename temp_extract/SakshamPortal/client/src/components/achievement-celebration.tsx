import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, X, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';

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

interface AchievementCelebrationProps {
  achievements: UserAchievement[];
  onClose: () => void;
  categoryColors: Record<string, string>;
  renderIcon: (iconName: string) => React.ReactNode;
}

export function AchievementCelebration({ 
  achievements,
  onClose,
  categoryColors,
  renderIcon
}: AchievementCelebrationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
  
  // Trigger confetti effect when component mounts
  useEffect(() => {
    if (showConfetti) {
      // Create a colorful confetti burst
      const duration = 3 * 1000;
      const end = Date.now() + duration;
      
      const colors = ['#FFD700', '#FFA500', '#FF4500', '#9370DB', '#00BFFF'];
      
      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      // Stop confetti after duration
      setTimeout(() => {
        setShowConfetti(false);
      }, duration);
    }
  }, [showConfetti]);
  
  // Auto advance through achievements
  useEffect(() => {
    if (achievements.length > 1 && currentIndex < achievements.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 5000); // Show each achievement for 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, achievements.length]);
  
  if (achievements.length === 0) return null;
  
  const currentAchievement = achievements[currentIndex];
  const { achievement } = currentAchievement;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <AnimatePresence mode="wait">
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-yellow-500">
            <motion.div 
              className="p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Achievement badge */}
              <motion.div 
                className={`rounded-full p-4 mb-6 ${categoryColors[achievement.category]} shadow-lg`}
                initial={{ scale: 0.5 }}
                animate={{ scale: [0.5, 1.2, 1] }}
                transition={{ 
                  times: [0, 0.7, 1],
                  duration: 0.8 
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="text-white h-16 w-16 flex items-center justify-center">
                  {renderIcon(achievement.icon)}
                </div>
              </motion.div>
              
              {/* Achievement info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h2>
                <h3 className="text-xl font-semibold mb-2 text-yellow-400">{achievement.name}</h3>
                <p className="text-gray-300 mb-4">{achievement.description}</p>
                
                {/* Points awarded */}
                <motion.div 
                  className="flex items-center justify-center space-x-2 mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Star className="text-yellow-400 h-6 w-6" />
                  <motion.span 
                    className="text-yellow-400 text-xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    +{achievement.pointsAwarded} points
                  </motion.span>
                </motion.div>
              </motion.div>
              
              {/* Navigation/close buttons */}
              <div className="flex justify-between w-full pt-4">
                {achievements.length > 1 ? (
                  <>
                    <Button 
                      variant="outline" 
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {achievements.map((_, index) => (
                        <motion.div 
                          key={index}
                          className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-600'}`}
                          whileHover={{ scale: 1.5 }}
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (currentIndex === achievements.length - 1) {
                          onClose();
                        } else {
                          setCurrentIndex(prev => Math.min(achievements.length - 1, prev + 1));
                        }
                      }}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      {currentIndex === achievements.length - 1 ? 'Close' : 'Next'}
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
                  >
                    Awesome!
                  </Button>
                )}
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      {/* Close button in top-right corner */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}