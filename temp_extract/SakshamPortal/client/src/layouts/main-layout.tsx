import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { useAuth } from "@/contexts/auth-context";
import { getInitials } from "@/lib/utils";
import { Moon, Sun, Menu, LogOut } from "lucide-react";
import tcetOfficialLogo from "@/assets/tcet-official-logo.png";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "ri-dashboard-line" },
    { path: "/resources", label: "Study Resources", icon: "ri-book-open-line" },
    { path: "/academic-progress", label: "Academic Progress", icon: "ri-line-chart-line" },
    { path: "/exam-performance", label: "Exam Performance", icon: "ri-file-list-3-line" },
    { path: "/todo-list", label: "To-Do Lists", icon: "ri-checkbox-line" },
    { path: "/achievements", label: "Achievements", icon: "ri-trophy-line" },
  ];

  const subjectGroups = [
    { path: "/group1", label: "Group 1", icon: "ri-folder-line" },
    { path: "/group2", label: "Group 2", icon: "ri-folder-line" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-neutral-300 dark:border-neutral-700 overflow-y-auto">
        <div className="p-4 border-b border-neutral-300 dark:border-neutral-700 relative">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="font-bold text-xl text-primary dark:text-primary">TCET SAKSHAM PORTAL</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Your Academic Hub</p>
            </div>
            <img src={tcetOfficialLogo} alt="TCET Official Logo" className="h-20 w-auto absolute top-2 right-2" />
          </div>
        </div>
        
        <nav className="flex-1 pt-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <a
                    className={`flex items-center py-2 px-3 rounded-lg ${
                      location === item.path
                        ? "text-white bg-primary"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 hover:text-primary dark:hover:bg-neutral-800 dark:hover:text-white transition duration-150"
                    }`}
                  >
                    <i className={`${item.icon} mr-3 text-lg`}></i>
                    <span>{item.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="pt-4 mt-4 border-t border-neutral-300 dark:border-neutral-700 px-4">
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Subject Groups
            </h3>
            <div className="mt-2 space-y-1">
              {subjectGroups.map((group) => (
                <Link key={group.path} href={group.path}>
                  <a className="flex items-center py-2 px-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition duration-150">
                    <i className={`${group.icon} mr-3`}></i>
                    <span>{group.label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-neutral-300 dark:border-neutral-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary text-white flex items-center justify-center font-medium">
              <span>{user ? getInitials(user.name) : "U"}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium dark:text-neutral-200">{user?.name || "User"}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{user?.email || "user@tcetmumbai.in"}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-neutral-300 dark:border-neutral-700 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <h1 className="font-bold text-lg text-primary dark:text-primary">TCET SAKSHAM</h1>
          </div>
          <img src={tcetOfficialLogo} alt="TCET Official Logo" className="h-14 w-auto mr-3" />
          <div className="flex items-center space-x-3">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-neutral-700 dark:text-neutral-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={toggleMobileMenu}
              className="text-neutral-700 dark:text-neutral-300"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="bg-white dark:bg-slate-900 border-b border-neutral-300 dark:border-neutral-700">
            <nav className="py-2 px-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <a 
                        className={`flex items-center py-2 px-3 rounded-lg ${
                          location === item.path
                            ? "text-white bg-primary"
                            : "text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-white"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className={`${item.icon} mr-3`}></i>
                        <span>{item.label}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="pt-3 mt-3 border-t border-neutral-300 dark:border-neutral-700">
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Subject Groups
                </h3>
                <div className="mt-2 space-y-1">
                  {subjectGroups.map((group) => (
                    <Link key={group.path} href={group.path}>
                      <a 
                        className="flex items-center py-2 text-neutral-700 dark:text-neutral-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <i className={`${group.icon} mr-3`}></i>
                        <span>{group.label}</span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-3 mt-3 border-t border-neutral-300 dark:border-neutral-700">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary dark:bg-primary text-white flex items-center justify-center font-medium">
                    <span>{user ? getInitials(user.name) : "U"}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium dark:text-neutral-200">{user?.name || "User"}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{user?.email || "user@tcetmumbai.in"}</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={handleLogout}
                  className="mt-3 w-full flex items-center justify-center py-2 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-4 md:pt-0">
        <div className="px-4 py-4 md:py-6 pb-16 md:pb-6 max-w-7xl mx-auto mt-16 md:mt-0">
          {children}
          
          {/* Developer attribution */}
          <div className="mt-8 text-center border-t border-neutral-200 dark:border-neutral-700 pt-4">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Developed by <span className="font-medium text-primary">Ahana Kulkarni</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
