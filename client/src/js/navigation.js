/**
 * Navigation JavaScript file for Saksham Portal
 * Manages navigation between different views/pages
 */

import { updateActiveLink } from './main.js';

// DOM loaded event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation
  initNavigation();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  // Get all navigation links with data-view attribute
  const navLinks = document.querySelectorAll('[data-view]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const viewName = this.getAttribute('data-view');
      
      // Navigate to the selected view
      navigateToView(viewName, this);
    });
  });
}

/**
 * Navigate to a specific view
 * @param {string} viewName - The name of the view to navigate to
 * @param {HTMLElement} linkElement - The link element that was clicked
 */
function navigateToView(viewName, linkElement) {
  // Log navigation for debugging/future backend integration
  console.log(`Navigating to view: ${viewName}`);
  
  // Handle main views (dashboard views)
  if (viewName === 'student-dashboard' || viewName === 'teacher-dashboard') {
    handleDashboardView(viewName);
  }
  
  // Update the active link in the sidebar (if it's a sidebar link)
  if (linkElement.parentElement && 
      (linkElement.parentElement.id === 'student-nav' || 
       linkElement.parentElement.id === 'teacher-nav')) {
    updateActiveLink(linkElement);
  }
  
  // This is where you would integrate with backend in the future
  // For example, fetching data for the selected view
  
  // Example of how backend integration would work:
  /*
  if (viewName === 'courses') {
    fetch('/api/courses')
      .then(response => response.json())
      .then(courses => {
        // Update the UI with the courses data
        displayCourses(courses);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }
  */
}

/**
 * Handle dashboard view changes
 * @param {string} dashboardType - The type of dashboard to show ('student-dashboard' or 'teacher-dashboard')
 */
function handleDashboardView(dashboardType) {
  const studentDashboardView = document.getElementById('student-dashboard-view');
  const teacherDashboardView = document.getElementById('teacher-dashboard-view');
  const roleToggle = document.getElementById('role-toggle');
  
  if (!studentDashboardView || !teacherDashboardView || !roleToggle) return;
  
  if (dashboardType === 'student-dashboard') {
    studentDashboardView.classList.remove('hidden');
    teacherDashboardView.classList.add('hidden');
    
    // Update the role toggle if needed
    if (roleToggle.checked) {
      roleToggle.checked = false;
      
      // Update navigation visibility
      const studentNav = document.getElementById('student-nav');
      const teacherNav = document.getElementById('teacher-nav');
      
      if (studentNav && teacherNav) {
        studentNav.classList.remove('hidden');
        teacherNav.classList.add('hidden');
      }
    }
  } else if (dashboardType === 'teacher-dashboard') {
    studentDashboardView.classList.add('hidden');
    teacherDashboardView.classList.remove('hidden');
    
    // Update the role toggle if needed
    if (!roleToggle.checked) {
      roleToggle.checked = true;
      
      // Update navigation visibility
      const studentNav = document.getElementById('student-nav');
      const teacherNav = document.getElementById('teacher-nav');
      
      if (studentNav && teacherNav) {
        studentNav.classList.add('hidden');
        teacherNav.classList.remove('hidden');
      }
    }
  }
}

// Export functions that might be needed by other modules
export { navigateToView };
