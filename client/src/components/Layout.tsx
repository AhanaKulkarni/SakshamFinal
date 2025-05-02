import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import '../css/dashboard.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isTeacherView, setIsTeacherView] = useState(false);

  return (
    <div className="portal-container">
      <Sidebar isTeacherView={isTeacherView} setIsTeacherView={setIsTeacherView} />
      
      <main className="main-content">
        <TopNav />
        
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}