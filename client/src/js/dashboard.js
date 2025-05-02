/**
 * Dashboard JavaScript file for Saksham Portal
 * Manages dashboard-specific functionality like charts, progress bars, and dynamic updates
 */

// DOM loaded event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize dashboard components
  initDashboard();
});

/**
 * Initialize dashboard functionality
 */
function initDashboard() {
  // Initialize any charts, progress bars, or other dashboard components
  initProgressBars();
  
  // Setup event listeners for dashboard-specific interactions
  setupDashboardEvents();
}

/**
 * Initialize progress bars to ensure they display correctly
 */
function initProgressBars() {
  // Make sure all progress bars have correct widths set based on their data
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    // The width should already be set in inline style
    // This function can be used to dynamically update progress bars later
    
    // Example of how you might update a progress bar dynamically:
    /*
    const percentage = bar.getAttribute('data-percentage');
    if (percentage) {
      bar.style.width = `${percentage}%`;
    }
    */
  });
}

/**
 * Setup event listeners for dashboard components
 */
function setupDashboardEvents() {
  // Setup event listeners for any interactive dashboard elements
  
  // For example, handling calendar button clicks
  const calendarButton = document.querySelector('button:has(.fa-calendar-plus)');
  if (calendarButton) {
    calendarButton.addEventListener('click', function() {
      console.log('Calendar function clicked - Ready for backend integration');
      // This would be where you'd integrate with a calendar API
    });
  }
  
  // Add event listeners for notification buttons
  const notificationButton = document.querySelector('button:has(.fa-bell)');
  if (notificationButton) {
    notificationButton.addEventListener('click', function() {
      console.log('Notification center clicked - Ready for backend integration');
      // This would be where you'd show a notifications panel
    });
  }
  
  // Teacher-specific: New Assignment button
  const newAssignmentButton = document.querySelector('button:has(.fa-plus)');
  if (newAssignmentButton) {
    newAssignmentButton.addEventListener('click', function() {
      console.log('New assignment button clicked - Ready for backend integration');
      // This would be where you'd open a form to create a new assignment
    });
  }
}

/**
 * Update dashboard stats with live data
 * This would be called after fetching data from the backend
 * @param {Object} dashboardData - Data for the dashboard
 */
function updateDashboardStats(dashboardData) {
  // This is a placeholder function that would be implemented 
  // when backend integration is added
  
  /* Example implementation:
  
  if (dashboardData.activeCoursesCount) {
    document.querySelector('.stat-value[data-stat="active-courses"]').textContent = 
      dashboardData.activeCoursesCount;
  }
  
  if (dashboardData.pendingAssignmentsCount) {
    document.querySelector('.stat-value[data-stat="pending-assignments"]').textContent = 
      dashboardData.pendingAssignmentsCount;
  }
  
  // And so on for other stats
  */
}

/**
 * Update recent activity feed with new activities
 * This would be called after fetching data from the backend
 * @param {Array} activities - List of recent activities
 */
function updateRecentActivities(activities) {
  // This is a placeholder function that would be implemented 
  // when backend integration is added
  
  /* Example implementation:
  
  const activityList = document.querySelector('.activity-list');
  
  // Clear existing activities
  activityList.innerHTML = '';
  
  // Add each activity to the list
  activities.forEach(activity => {
    const activityItem = document.createElement('li');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <div class="activity-content">
        <div class="activity-icon bg-${activity.iconColor}">
          <i class="fas fa-${activity.icon} icon-white"></i>
        </div>
        <div class="activity-details">
          <p class="activity-title">${activity.title}</p>
          <p class="activity-subtitle">${activity.subtitle}</p>
        </div>
        <div class="activity-time">
          <span class="badge badge-${activity.badgeColor}">
            ${activity.timeAgo}
          </span>
        </div>
      </div>
    `;
    
    activityList.appendChild(activityItem);
  });
  */
}

// Export functions that might be needed by other modules
export { updateDashboardStats, updateRecentActivities };
