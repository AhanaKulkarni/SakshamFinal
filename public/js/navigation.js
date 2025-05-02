/**
 * Navigation JavaScript file for Saksham Portal
 * Manages navigation between different views/pages
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initNavigation();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Set active link based on current page
    setActiveNavLink();
    
    // Handle sidebar link clicks
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only intercept relative links within the app
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const viewName = this.getAttribute('href').substring(1);
                navigateToView(viewName, this);
                // Update browser history so back button works correctly
                history.pushState({view: viewName}, '', `#${viewName}`);
            }
            
            // Update active link
            updateActiveLink(this);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.view) {
            navigateToView(e.state.view, null);
        }
    });
}

/**
 * Set active navigation link based on current URL
 */
function setActiveNavLink() {
    // Get current path
    const currentPath = window.location.pathname;
    
    // Find the matching link in the navigation
    const links = document.querySelectorAll('.sidebar-nav a');
    let activeLink = null;
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if the href matches the current path
        if (currentPath === href || currentPath.endsWith(href)) {
            activeLink = link;
        }
    });
    
    // If we found a match, set it as active
    if (activeLink) {
        updateActiveLink(activeLink);
    } else {
        // Default to dashboard if no match
        const dashboardLink = document.querySelector('.sidebar-nav a[href="index.html"]');
        if (dashboardLink) {
            updateActiveLink(dashboardLink);
        }
    }
}

/**
 * Navigate to a specific view
 * @param {string} viewName - The name of the view to navigate to
 * @param {HTMLElement} linkElement - The link element that was clicked
 */
function navigateToView(viewName, linkElement) {
    console.log('Navigating to view:', viewName);
    
    // You can add specific logic here for different views
    // For now, we'll just update the active link
    if (linkElement) {
        updateActiveLink(linkElement);
    }
    
    // Handle special views
    if (viewName === 'dashboard') {
        // Show dashboard view
        // This could toggle between student/teacher dashboard based on role
        const roleToggle = document.getElementById('roleToggle');
        if (roleToggle && roleToggle.checked) {
            handleDashboardView('teacher-dashboard');
        } else {
            handleDashboardView('student-dashboard');
        }
    }
    
    // Load content for the view
    loadViewContent(viewName);
}

/**
 * Handle dashboard view changes
 * @param {string} dashboardType - The type of dashboard to show ('student-dashboard' or 'teacher-dashboard')
 */
function handleDashboardView(dashboardType) {
    const studentDashboard = document.querySelector('.dashboard-content > div:not(.teacher-dashboard)');
    const teacherDashboard = document.getElementById('teacherDashboard');
    
    if (dashboardType === 'teacher-dashboard' && teacherDashboard && studentDashboard) {
        studentDashboard.style.display = 'none';
        teacherDashboard.style.display = 'block';
    } else if (studentDashboard && teacherDashboard) {
        studentDashboard.style.display = 'block';
        teacherDashboard.style.display = 'none';
    }
}

/**
 * Load content for a view via AJAX (for future backend integration)
 * @param {string} viewName - The name of the view to load
 */
function loadViewContent(viewName) {
    // This function would be used for backend integration
    // It could fetch data specific to the view from the server
    
    // For now, it's a placeholder for future implementation
    // You would typically make an AJAX call here to get data
    
    // Example:
    /*
    fetch(`/api/views/${viewName}`)
        .then(response => response.json())
        .then(data => {
            // Update the view with the fetched data
            updateViewWithData(viewName, data);
        })
        .catch(error => {
            console.error('Error loading view content:', error);
        });
    */
}