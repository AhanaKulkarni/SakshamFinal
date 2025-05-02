/**
 * Main JavaScript file for Saksham Portal
 * This file initializes all necessary components and manages the application
 */

// Import modules
import './navigation.js';
import './views.js';
import './dashboard.js';

// DOM loaded event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the application when the DOM is fully loaded
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  // Initialize user menu dropdown
  initUserMenu();
  
  // Initialize mobile sidebar
  initMobileSidebar();
  
  // Initialize role toggle
  initRoleToggle();
}

/**
 * Initialize user menu dropdown functionality
 */
function initUserMenu() {
  const userMenuButton = document.getElementById('userMenuButton');
  const userMenu = document.getElementById('userMenu');
  
  if (!userMenuButton || !userMenu) return;
  
  userMenuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    userMenu.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
      userMenu.classList.add('hidden');
    }
  });
}

/**
 * Initialize mobile sidebar toggle functionality
 */
function initMobileSidebar() {
  const sidebarToggle = document.getElementById('closeSidebar');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.add('hidden');
    });
  }
}

/**
 * Initialize role toggle between student and teacher views
 */
function initRoleToggle() {
  const roleToggle = document.getElementById('role-toggle');
  const studentNav = document.getElementById('student-nav');
  const teacherNav = document.getElementById('teacher-nav');
  const studentDashboardView = document.getElementById('student-dashboard-view');
  const teacherDashboardView = document.getElementById('teacher-dashboard-view');
  
  if (!roleToggle || !studentNav || !teacherNav || !studentDashboardView || !teacherDashboardView) return;
  
  roleToggle.addEventListener('change', function() {
    if (this.checked) {
      // Teacher view
      studentNav.classList.add('hidden');
      teacherNav.classList.remove('hidden');
      studentDashboardView.classList.add('hidden');
      teacherDashboardView.classList.remove('hidden');
      
      // Update active link
      const teacherDashboardLink = document.querySelector('[data-view="teacher-dashboard"]');
      if (teacherDashboardLink) {
        updateActiveLink(teacherDashboardLink);
      }
    } else {
      // Student view
      studentNav.classList.remove('hidden');
      teacherNav.classList.add('hidden');
      studentDashboardView.classList.remove('hidden');
      teacherDashboardView.classList.add('hidden');
      
      // Update active link
      const studentDashboardLink = document.querySelector('[data-view="student-dashboard"]');
      if (studentDashboardLink) {
        updateActiveLink(studentDashboardLink);
      }
    }
  });
}

/**
 * Update active link in the sidebar
 * @param {HTMLElement} link - The link to set as active
 */
function updateActiveLink(link) {
  // Remove active class from all links
  document.querySelectorAll('.sidebar-active').forEach(el => {
    el.classList.remove('sidebar-active');
  });
  
  // Add active class to the selected link
  link.classList.add('sidebar-active');
}

// Export functions that might be needed by other modules
export { updateActiveLink };
