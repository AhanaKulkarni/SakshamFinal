/**
 * Views JavaScript file for Saksham Portal
 * Manages different views and content loading
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize views system
    initViews();
});

/**
 * Initialize views system
 */
function initViews() {
    // Set initial view on page load
    setInitialView();
    
    // Setup view-specific listeners
    setupViewListeners();
}

/**
 * Set the initial view on page load
 */
function setInitialView() {
    // Check if there's a specific view in the URL hash
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        const viewName = hash.substring(1); // Remove the # character
        showView(viewName);
    }
}

/**
 * Setup listeners for view-specific UI elements
 */
function setupViewListeners() {
    // This function would set up event listeners for elements
    // that are specific to different views
    
    // For now, it's mostly a placeholder
}

/**
 * Show a specific view and hide others
 * @param {string} viewName - The name of the view to show
 */
function showView(viewName) {
    console.log('Navigating to view:', viewName);
    
    // For a multi-page application, this would typically redirect to a new page
    // For a single-page application, this would show/hide different sections
    
    // For now, we'll just use it to update the active link in the sidebar
    // and would later add actual view switching logic
    const link = document.querySelector(`.sidebar-nav a[href*="${viewName}"]`);
    if (link) {
        updateActiveLink(link);
    }
}

/**
 * Load content for a view via AJAX
 * This would be used for backend integration when loading view-specific data
 * @param {string} viewName - The name of the view to load
 */
function loadViewContent(viewName) {
    // This function would fetch data from the backend
    // For now, it's a placeholder
    
    // If we were implementing dynamic content loading, we would
    // make an AJAX request here to fetch the appropriate content
}

/**
 * Get the current view name
 * @returns {string} The name of the current view
 */
function getCurrentView() {
    // First, try to get it from the URL hash
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        return hash.substring(1);
    }
    
    // If no hash, check the active link
    const activeLink = document.querySelector('.sidebar-nav a.active');
    if (activeLink) {
        const href = activeLink.getAttribute('href');
        // Extract view name from href
        if (href.includes('/')) {
            // For multi-page setup, extract page name from path
            const parts = href.split('/');
            return parts[parts.length - 1].replace('.html', '');
        } else {
            // For single-page setup
            return href.replace('#', '').replace('.html', '');
        }
    }
    
    // Default to dashboard
    return 'dashboard';
}