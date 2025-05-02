/**
 * Main JavaScript file for Saksham Portal
 * Handles core functionality and initialization
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all core functionality
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    // Initialize user menu dropdown functionality
    initUserMenu();
    
    // Initialize mobile sidebar toggle functionality
    initMobileSidebar();
    
    // Initialize role toggle between student and teacher views
    initRoleToggle();
    
    // Update progress bars and stats
    initProgressBars();
}

/**
 * Initialize user menu dropdown functionality
 */
function initUserMenu() {
    const userProfile = document.getElementById('userProfileMenu');
    const dropdown = document.getElementById('userDropdown');
    
    if (userProfile && dropdown) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
}

/**
 * Initialize mobile sidebar toggle functionality
 */
function initMobileSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking on a link (mobile view)
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });
}

/**
 * Initialize role toggle between student and teacher views
 */
function initRoleToggle() {
    const roleToggle = document.getElementById('roleToggle');
    const roleLabel = document.getElementById('roleLabel');
    const studentDashboard = document.querySelector('.dashboard-content > div:not(.teacher-dashboard)');
    const teacherDashboard = document.getElementById('teacherDashboard');
    const pageHeader = document.querySelector('.page-header h1');
    
    if (roleToggle && teacherDashboard && studentDashboard) {
        roleToggle.addEventListener('change', function() {
            if (this.checked) {
                // Switch to teacher view
                roleLabel.textContent = 'Teacher View';
                studentDashboard.style.display = 'none';
                teacherDashboard.style.display = 'block';
                if (pageHeader) {
                    pageHeader.textContent = 'Teacher Dashboard';
                }
            } else {
                // Switch to student view
                roleLabel.textContent = 'Student View';
                studentDashboard.style.display = 'block';
                teacherDashboard.style.display = 'none';
                if (pageHeader) {
                    pageHeader.textContent = 'Student Dashboard';
                }
            }
        });
    }
}

/**
 * Initialize progress bars to ensure they display correctly
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        // Make sure the percentage is shown correctly
        const value = bar.getAttribute('data-value');
        bar.style.width = value;
    });
}

/**
 * Update active link in the sidebar
 * @param {HTMLElement} link - The link to set as active
 */
function updateActiveLink(link) {
    // Remove active class from all links
    document.querySelectorAll('.sidebar-nav a').forEach(navLink => {
        navLink.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (link) {
        link.classList.add('active');
    }
}