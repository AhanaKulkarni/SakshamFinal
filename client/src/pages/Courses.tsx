import { useState } from 'react';
import { Link } from 'wouter';
import '../css/dashboard.css';
import '../css/courses.css';

export default function Courses() {
  const [isTeacherView, setIsTeacherView] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="portal-container">
      {/* Sidebar Navigation */}
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
            <li><Link href="/"><a><i className="fas fa-tachometer-alt"></i> Dashboard</a></Link></li>
            <li><Link href="/courses"><a className="active"><i className="fas fa-book"></i> Courses</a></Link></li>
            <li><Link href="/assignments"><a><i className="fas fa-tasks"></i> Assignments</a></Link></li>
            <li><Link href="/grades"><a><i className="fas fa-chart-bar"></i> Grades</a></Link></li>
            <li><Link href="/calendar"><a><i className="fas fa-calendar"></i> Calendar</a></Link></li>
            <li><Link href="/resources"><a><i className="fas fa-folder"></i> Resources</a></Link></li>
            <li><Link href="/messages"><a><i className="fas fa-envelope"></i> Messages</a></Link></li>
            <li><Link href="/profile"><a><i className="fas fa-user"></i> Profile</a></Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <button className="menu-toggle" id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          
          <div className="search-bar">
            <input type="text" placeholder="Search courses..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          
          <div className="user-menu">
            <div className="notifications">
              <button><i className="fas fa-bell"></i><span className="badge">3</span></button>
            </div>
            
            <div className="user-profile" id="userProfileMenu">
              <img src="/assets/images/default-avatar.png" alt="User Avatar" />
              <span>Jane Doe</span>
              <i className="fas fa-chevron-down"></i>
            </div>
            
            <div className="dropdown-menu" id="userDropdown">
              <ul>
                <li><Link href="/profile"><a><i className="fas fa-user"></i> View Profile</a></Link></li>
                <li><Link href="/settings"><a><i className="fas fa-cog"></i> Settings</a></Link></li>
                <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Courses Content */}
        <div className="dashboard-content">
          {!isTeacherView ? (
            <div className="student-courses-view">
              <div className="page-header">
                <h1>My Courses</h1>
                <p>View and access all your enrolled courses.</p>
              </div>
              
              <div className="tabs">
                <div 
                  className={`tab ${activeTab === 'all' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('all')}
                >
                  All Courses
                </div>
                <div 
                  className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('ongoing')}
                >
                  Ongoing
                </div>
                <div 
                  className={`tab ${activeTab === 'completed' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('completed')}
                >
                  Completed
                </div>
                <div 
                  className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </div>
              </div>
              
              <div className="course-grid">
                {/* Course Card 1 */}
                <div className="course-card" onClick={() => window.location.href='/course-detail/1'}>
                  <div className="course-banner" style={{ backgroundColor: '#4CAF50' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Calculus II</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">Prof. Robert Johnson</div>
                      <div className="course-dept"><i className="fas fa-circle"></i> Mathematics Department</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">85%</div>
                        <div className="stat-label">Progress</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">92%</div>
                        <div className="stat-label">Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">2</div>
                        <div className="stat-label">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Card 2 */}
                <div className="course-card" onClick={() => window.location.href='/course-detail/2'}>
                  <div className="course-banner" style={{ backgroundColor: '#2196F3' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">English Literature</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">Prof. Emily Williams</div>
                      <div className="course-dept"><i className="fas fa-circle"></i> Humanities Department</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">70%</div>
                        <div className="stat-label">Progress</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">88%</div>
                        <div className="stat-label">Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">1</div>
                        <div className="stat-label">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Card 3 */}
                <div className="course-card" onClick={() => window.location.href='/course-detail/3'}>
                  <div className="course-banner" style={{ backgroundColor: '#FF9800' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Physics 101</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">Prof. Michael Brown</div>
                      <div className="course-dept"><i className="fas fa-circle"></i> Science Department</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">60%</div>
                        <div className="stat-label">Progress</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">78%</div>
                        <div className="stat-label">Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">3</div>
                        <div className="stat-label">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Card 4 */}
                <div className="course-card" onClick={() => window.location.href='/course-detail/4'}>
                  <div className="course-banner" style={{ backgroundColor: '#9C27B0' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Business Management</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">Prof. Sarah Davis</div>
                      <div className="course-dept"><i className="fas fa-circle"></i> Commerce Department</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">45%</div>
                        <div className="stat-label">Progress</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">82%</div>
                        <div className="stat-label">Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">2</div>
                        <div className="stat-label">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Card 5 */}
                <div className="course-card" onClick={() => window.location.href='/course-detail/5'}>
                  <div className="course-banner" style={{ backgroundColor: '#F44336' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Introduction to Psychology</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">Prof. Jennifer Wilson</div>
                      <div className="course-dept"><i className="fas fa-circle"></i> Social Sciences Department</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">75%</div>
                        <div className="stat-label">Progress</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">90%</div>
                        <div className="stat-label">Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">1</div>
                        <div className="stat-label">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Card 6 */}
                <div className="course-card" onClick={() => window.location.href='/course-detail/6'}>
                  <div className="course-banner" style={{ backgroundColor: '#607D8B' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Computer Science 101</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">Prof. David Thompson</div>
                      <div className="course-dept"><i className="fas fa-circle"></i> Technology Department</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">90%</div>
                        <div className="stat-label">Progress</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">95%</div>
                        <div className="stat-label">Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">0</div>
                        <div className="stat-label">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="teacher-courses-view">
              <div className="page-header">
                <h1>My Teaching</h1>
                <p>Manage your courses and teaching materials.</p>
              </div>
              
              <div className="tabs">
                <div 
                  className={`tab ${activeTab === 'all' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('all')}
                >
                  Active Courses
                </div>
                <div 
                  className={`tab ${activeTab === 'archived' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('archived')}
                >
                  Archived
                </div>
                <div 
                  className={`tab ${activeTab === 'drafts' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('drafts')}
                >
                  Drafts
                </div>
              </div>
              
              <div className="course-grid teacher-course-grid">
                {/* Teacher Course Card 1 */}
                <div className="course-card">
                  <div className="teacher-controls">
                    <div className="teacher-control"><i className="fas fa-edit"></i></div>
                    <div className="teacher-control"><i className="fas fa-cog"></i></div>
                  </div>
                  <div className="course-banner" style={{ backgroundColor: '#4CAF50' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Advanced Mathematics</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">3rd Year • Mathematics</div>
                      <div className="course-dept"><i className="fas fa-users"></i> 32 Enrolled Students</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">78%</div>
                        <div className="stat-label">Avg. Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">12</div>
                        <div className="stat-label">Submissions</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">5</div>
                        <div className="stat-label">To Grade</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Teacher Course Card 2 */}
                <div className="course-card">
                  <div className="teacher-controls">
                    <div className="teacher-control"><i className="fas fa-edit"></i></div>
                    <div className="teacher-control"><i className="fas fa-cog"></i></div>
                  </div>
                  <div className="course-banner" style={{ backgroundColor: '#2196F3' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Computer Science 101</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">1st Year • Computer Science</div>
                      <div className="course-dept"><i className="fas fa-users"></i> 45 Enrolled Students</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">82%</div>
                        <div className="stat-label">Avg. Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">38</div>
                        <div className="stat-label">Submissions</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">7</div>
                        <div className="stat-label">To Grade</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Teacher Course Card 3 */}
                <div className="course-card">
                  <div className="teacher-controls">
                    <div className="teacher-control"><i className="fas fa-edit"></i></div>
                    <div className="teacher-control"><i className="fas fa-cog"></i></div>
                  </div>
                  <div className="course-banner" style={{ backgroundColor: '#FF9800' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Data Structures</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">2nd Year • Computer Science</div>
                      <div className="course-dept"><i className="fas fa-users"></i> 28 Enrolled Students</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">75%</div>
                        <div className="stat-label">Avg. Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">22</div>
                        <div className="stat-label">Submissions</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">6</div>
                        <div className="stat-label">To Grade</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Teacher Course Card 4 */}
                <div className="course-card">
                  <div className="teacher-controls">
                    <div className="teacher-control"><i className="fas fa-edit"></i></div>
                    <div className="teacher-control"><i className="fas fa-cog"></i></div>
                  </div>
                  <div className="course-banner" style={{ backgroundColor: '#9C27B0' }}>
                    <div className="course-banner-overlay">
                      <div className="course-banner-title">Algorithm Design</div>
                    </div>
                  </div>
                  <div className="course-content">
                    <div className="course-details">
                      <div className="course-instructor">3rd Year • Computer Science</div>
                      <div className="course-dept"><i className="fas fa-users"></i> 23 Enrolled Students</div>
                    </div>
                    <div className="course-stats">
                      <div className="stat">
                        <div className="stat-value">68%</div>
                        <div className="stat-label">Avg. Grade</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">18</div>
                        <div className="stat-label">Submissions</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">5</div>
                        <div className="stat-label">To Grade</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Add New Course Card */}
                <div className="course-card add-course-card">
                  <i className="fas fa-plus-circle"></i>
                  <h3>Create New Course</h3>
                  <p>Design and publish a new course</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
