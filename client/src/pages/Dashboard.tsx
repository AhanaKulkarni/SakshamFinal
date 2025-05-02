import { useState } from 'react';
import { Link } from 'wouter';
import '../css/dashboard.css';

export default function Dashboard() {
  const [isTeacherView, setIsTeacherView] = useState(false);

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
            <li><Link href="/"><a className="active"><i className="fas fa-tachometer-alt"></i> Dashboard</a></Link></li>
            <li><Link href="/courses"><a><i className="fas fa-book"></i> Courses</a></Link></li>
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
            <input type="text" placeholder="Search..." />
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

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {!isTeacherView ? (
            <>
              <div className="page-header">
                <h1>Student Dashboard</h1>
                <p>Welcome back, Jane! Here's an overview of your academic progress.</p>
              </div>
              
              {/* Stats Cards Row */}
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#4CAF50' }}>
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Enrolled Courses</h3>
                    <p className="stat-value">8</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#2196F3' }}>
                    <i className="fas fa-tasks"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Pending Assignments</h3>
                    <p className="stat-value">5</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#FF9800' }}>
                    <i className="fas fa-award"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Average Grade</h3>
                    <p className="stat-value">87%</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#9C27B0' }}>
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Attendance</h3>
                    <p className="stat-value">92%</p>
                  </div>
                </div>
              </div>
              
              {/* Content Rows */}
              <div className="content-row">
                {/* Upcoming Assignments */}
                <div className="card upcoming-assignments">
                  <div className="card-header">
                    <h2>Upcoming Assignments</h2>
                    <Link href="/assignments"><a className="view-all">View All</a></Link>
                  </div>
                  <div className="card-content">
                    <ul className="assignment-list">
                      <li>
                        <div className="assignment-info">
                          <h3>Mathematics Project</h3>
                          <p>Calculus II - Due Tomorrow</p>
                        </div>
                        <div className="assignment-status urgent">
                          <span>Urgent</span>
                        </div>
                      </li>
                      <li>
                        <div className="assignment-info">
                          <h3>Literature Analysis Essay</h3>
                          <p>English Literature - Due in 3 days</p>
                        </div>
                        <div className="assignment-status pending">
                          <span>Pending</span>
                        </div>
                      </li>
                      <li>
                        <div className="assignment-info">
                          <h3>Physics Lab Report</h3>
                          <p>Physics 101 - Due in 5 days</p>
                        </div>
                        <div className="assignment-status pending">
                          <span>Pending</span>
                        </div>
                      </li>
                      <li>
                        <div className="assignment-info">
                          <h3>Group Presentation</h3>
                          <p>Business Management - Due in 1 week</p>
                        </div>
                        <div className="assignment-status in-progress">
                          <span>In Progress</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Course Progress */}
                <div className="card course-progress">
                  <div className="card-header">
                    <h2>Course Progress</h2>
                    <Link href="/courses"><a className="view-all">View All</a></Link>
                  </div>
                  <div className="card-content">
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>Calculus II</h3>
                        <p>Mathematics Department</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '85%' }} data-value="85%"></div>
                      </div>
                    </div>
                    
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>English Literature</h3>
                        <p>Humanities Department</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '70%' }} data-value="70%"></div>
                      </div>
                    </div>
                    
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>Physics 101</h3>
                        <p>Science Department</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '60%' }} data-value="60%"></div>
                      </div>
                    </div>
                    
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>Business Management</h3>
                        <p>Commerce Department</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '45%' }} data-value="45%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="content-row">
                {/* Recent Announcements */}
                <div className="card announcements">
                  <div className="card-header">
                    <h2>Recent Announcements</h2>
                  </div>
                  <div className="card-content">
                    <div className="announcement-item">
                      <div className="announcement-header">
                        <h3>College Fest Coming Soon</h3>
                        <span className="date">2 hours ago</span>
                      </div>
                      <p>Annual college fest is scheduled for next month. Registration for various events will begin next week.</p>
                    </div>
                    
                    <div className="announcement-item">
                      <div className="announcement-header">
                        <h3>Library Hours Extended</h3>
                        <span className="date">1 day ago</span>
                      </div>
                      <p>The college library will remain open until 10 PM during the exam period starting from next week.</p>
                    </div>
                    
                    <div className="announcement-item">
                      <div className="announcement-header">
                        <h3>New Research Opportunity</h3>
                        <span className="date">2 days ago</span>
                      </div>
                      <p>Applications are open for student research assistants in the Physics department. Interested students can apply online.</p>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="card recent-activity">
                  <div className="card-header">
                    <h2>Recent Activity</h2>
                  </div>
                  <div className="card-content">
                    <ul className="activity-list">
                      <li>
                        <div className="activity-icon"><i className="fas fa-check-circle"></i></div>
                        <div className="activity-info">
                          <p><strong>Assignment Submitted:</strong> Computer Science Project</p>
                          <span className="time">Today, 9:30 AM</span>
                        </div>
                      </li>
                      <li>
                        <div className="activity-icon"><i className="fas fa-file-alt"></i></div>
                        <div className="activity-info">
                          <p><strong>New Grade Posted:</strong> Mathematics Quiz #3</p>
                          <span className="time">Yesterday, 3:15 PM</span>
                        </div>
                      </li>
                      <li>
                        <div className="activity-icon"><i className="fas fa-comment"></i></div>
                        <div className="activity-info">
                          <p><strong>New Comment:</strong> From Prof. Johnson on your essay</p>
                          <span className="time">Yesterday, 11:42 AM</span>
                        </div>
                      </li>
                      <li>
                        <div className="activity-icon"><i className="fas fa-book"></i></div>
                        <div className="activity-info">
                          <p><strong>Course Material Updated:</strong> Physics 101</p>
                          <span className="time">2 days ago, 10:30 AM</span>
                        </div>
                      </li>
                      <li>
                        <div className="activity-icon"><i className="fas fa-calendar-plus"></i></div>
                        <div className="activity-info">
                          <p><strong>Event Added to Calendar:</strong> Department Meeting</p>
                          <span className="time">3 days ago, 2:00 PM</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="page-header">
                <h1>Teacher Dashboard</h1>
                <p>Welcome back, Professor Jane! Here's an overview of your classes and student progress.</p>
              </div>
              
              {/* Teacher Stats Cards Row */}
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#4CAF50' }}>
                    <i className="fas fa-chalkboard-teacher"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Active Courses</h3>
                    <p className="stat-value">4</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#2196F3' }}>
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Total Students</h3>
                    <p className="stat-value">128</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#FF9800' }}>
                    <i className="fas fa-clipboard-check"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Pending Grading</h3>
                    <p className="stat-value">23</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#9C27B0' }}>
                    <i className="fas fa-comments"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Messages</h3>
                    <p className="stat-value">15</p>
                  </div>
                </div>
              </div>
              
              {/* Teacher Content */}
              <div className="content-row">
                {/* Class Performance */}
                <div className="card class-performance">
                  <div className="card-header">
                    <h2>Class Performance</h2>
                  </div>
                  <div className="card-content">
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>Advanced Mathematics</h3>
                        <p>Average: 78%</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '78%' }} data-value="78%"></div>
                      </div>
                    </div>
                    
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>Computer Science 101</h3>
                        <p>Average: 82%</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '82%' }} data-value="82%"></div>
                      </div>
                    </div>
                    
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>Data Structures</h3>
                        <p>Average: 75%</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '75%' }} data-value="75%"></div>
                      </div>
                    </div>
                    
                    <div className="progress-item">
                      <div className="course-info">
                        <h3>Algorithm Design</h3>
                        <p>Average: 68%</p>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: '68%' }} data-value="68%"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Submissions */}
                <div className="card recent-submissions">
                  <div className="card-header">
                    <h2>Recent Submissions</h2>
                    <Link href="/grading"><a className="view-all">View All</a></Link>
                  </div>
                  <div className="card-content">
                    <ul className="submissions-list">
                      <li>
                        <div className="submission-info">
                          <h3>John Smith</h3>
                          <p>Algorithm Design - Final Project</p>
                        </div>
                        <div className="submission-action">
                          <Link href="/grade-assignment"><a className="btn-grade">Grade</a></Link>
                        </div>
                      </li>
                      <li>
                        <div className="submission-info">
                          <h3>Emily Johnson</h3>
                          <p>Data Structures - Assignment #5</p>
                        </div>
                        <div className="submission-action">
                          <Link href="/grade-assignment"><a className="btn-grade">Grade</a></Link>
                        </div>
                      </li>
                      <li>
                        <div className="submission-info">
                          <h3>Michael Brown</h3>
                          <p>Computer Science 101 - Lab Report</p>
                        </div>
                        <div className="submission-action">
                          <Link href="/grade-assignment"><a className="btn-grade">Grade</a></Link>
                        </div>
                      </li>
                      <li>
                        <div className="submission-info">
                          <h3>Sarah Davis</h3>
                          <p>Advanced Mathematics - Mid-term Exam</p>
                        </div>
                        <div className="submission-action">
                          <Link href="/grade-assignment"><a className="btn-grade">Grade</a></Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="content-row">
                {/* Upcoming Classes */}
                <div className="card upcoming-classes">
                  <div className="card-header">
                    <h2>Upcoming Classes</h2>
                    <Link href="/schedule"><a className="view-all">Full Schedule</a></Link>
                  </div>
                  <div className="card-content">
                    <div className="class-item">
                      <div className="class-time">
                        <h3>8:30 AM</h3>
                        <p>Today</p>
                      </div>
                      <div className="class-details">
                        <h3>Computer Science 101</h3>
                        <p>Room 302, Building A</p>
                      </div>
                      <div className="class-duration">
                        <span>90 min</span>
                      </div>
                    </div>
                    
                    <div className="class-item">
                      <div className="class-time">
                        <h3>11:00 AM</h3>
                        <p>Today</p>
                      </div>
                      <div className="class-details">
                        <h3>Data Structures</h3>
                        <p>Room 405, Computer Lab</p>
                      </div>
                      <div className="class-duration">
                        <span>120 min</span>
                      </div>
                    </div>
                    
                    <div className="class-item">
                      <div className="class-time">
                        <h3>2:30 PM</h3>
                        <p>Tomorrow</p>
                      </div>
                      <div className="class-details">
                        <h3>Advanced Mathematics</h3>
                        <p>Room 201, Building B</p>
                      </div>
                      <div className="class-duration">
                        <span>90 min</span>
                      </div>
                    </div>
                    
                    <div className="class-item">
                      <div className="class-time">
                        <h3>9:30 AM</h3>
                        <p>May 5, 2025</p>
                      </div>
                      <div className="class-details">
                        <h3>Algorithm Design</h3>
                        <p>Room 405, Computer Lab</p>
                      </div>
                      <div className="class-duration">
                        <span>120 min</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Items */}
                <div className="card action-items">
                  <div className="card-header">
                    <h2>Action Items</h2>
                  </div>
                  <div className="card-content">
                    <div className="action-item">
                      <div className="action-icon"><i className="fas fa-exclamation-circle"></i></div>
                      <div className="action-info">
                        <h3>Grade Pending Assignments</h3>
                        <p>23 assignments awaiting your feedback</p>
                      </div>
                      <Link href="/grading"><a className="btn-action">Review</a></Link>
                    </div>
                    
                    <div className="action-item">
                      <div className="action-icon"><i className="fas fa-bell"></i></div>
                      <div className="action-info">
                        <h3>Final Exams Schedule</h3>
                        <p>Finalize and publish your exam schedule</p>
                      </div>
                      <Link href="/schedule"><a className="btn-action">Update</a></Link>
                    </div>
                    
                    <div className="action-item">
                      <div className="action-icon"><i className="fas fa-book-open"></i></div>
                      <div className="action-info">
                        <h3>Update Course Materials</h3>
                        <p>Computer Science 101 materials need updates</p>
                      </div>
                      <Link href="/course-edit"><a className="btn-action">Edit</a></Link>
                    </div>
                    
                    <div className="action-item">
                      <div className="action-icon"><i className="fas fa-envelope"></i></div>
                      <div className="action-info">
                        <h3>Respond to Student Messages</h3>
                        <p>15 unread messages from students</p>
                      </div>
                      <Link href="/messages"><a className="btn-action">Respond</a></Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
