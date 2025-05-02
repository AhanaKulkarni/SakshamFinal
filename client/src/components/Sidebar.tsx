import { useState } from 'react';
import { Link, useLocation } from 'wouter';

interface SidebarProps {
  isTeacherView: boolean;
  setIsTeacherView: (value: boolean) => void;
}

export default function Sidebar({ isTeacherView, setIsTeacherView }: SidebarProps) {
  const [location] = useLocation();
  
  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">Saksham</h1>
        <button className="close-sidebar" id="closeSidebar"><i className="fas fa-times"></i></button>
      </div>
      
      <div className="role-selector">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isTeacherView}
            onChange={() => setIsTeacherView(!isTeacherView)}
          />
          <span className="slider round"></span>
        </label>
        <span className="role-label">{isTeacherView ? 'Teacher View' : 'Student View'}</span>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li><Link href="/">
            <a className={location === '/' ? 'active' : ''}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </a>
          </Link></li>
          <li><Link href="/courses">
            <a className={location === '/courses' ? 'active' : ''}>
              <i className="fas fa-book"></i> Courses
            </a>
          </Link></li>
          <li><Link href="/assignments">
            <a className={location === '/assignments' ? 'active' : ''}>
              <i className="fas fa-tasks"></i> Assignments
            </a>
          </Link></li>
          <li><Link href="/grades">
            <a className={location === '/grades' ? 'active' : ''}>
              <i className="fas fa-chart-bar"></i> Grades
            </a>
          </Link></li>
          <li><Link href="/calendar">
            <a className={location === '/calendar' ? 'active' : ''}>
              <i className="fas fa-calendar"></i> Calendar
            </a>
          </Link></li>
          <li><Link href="/resources">
            <a className={location === '/resources' ? 'active' : ''}>
              <i className="fas fa-folder"></i> Resources
            </a>
          </Link></li>
          <li><Link href="/messages">
            <a className={location === '/messages' ? 'active' : ''}>
              <i className="fas fa-envelope"></i> Messages
            </a>
          </Link></li>
          <li><Link href="/profile">
            <a className={location === '/profile' ? 'active' : ''}>
              <i className="fas fa-user"></i> Profile
            </a>
          </Link></li>
        </ul>
      </nav>
    </aside>
  );
}