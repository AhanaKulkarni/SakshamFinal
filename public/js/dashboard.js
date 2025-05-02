/**
 * Dashboard JavaScript file for Saksham Portal
 * Handles dashboard-specific functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initDashboard();
});

/**
 * Initialize dashboard functionality
 */
function initDashboard() {
    // Initialize progress bars
    initProgressBars();
    
    // Setup dashboard-specific event listeners
    setupDashboardEvents();
}

/**
 * Initialize progress bars to ensure they display correctly
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        // Get the value from data attribute
        const value = bar.getAttribute('data-value');
        
        // Set the width of the progress bar
        bar.style.width = value;
        
        // Animate the progress bar (optional)
        animateProgressBar(bar, value);
    });
}

/**
 * Animate a progress bar from 0 to its target value
 * @param {HTMLElement} bar - The progress bar element
 * @param {string} targetValue - The target width (e.g. "75%")
 */
function animateProgressBar(bar, targetValue) {
    // Parse the target value as a number (remove % sign)
    const target = parseInt(targetValue);
    
    // Start from 0
    let width = 0;
    
    // Get the current computed style to respect any transitions
    const computedStyle = window.getComputedStyle(bar);
    
    // If there's a transition, let CSS handle the animation
    if (computedStyle.transitionDuration !== '0s') {
        bar.style.width = targetValue;
        return;
    }
    
    // Otherwise, animate it with JavaScript
    const interval = setInterval(function() {
        if (width >= target) {
            clearInterval(interval);
        } else {
            width++;
            bar.style.width = width + '%';
        }
    }, 10);
}

/**
 * Setup event listeners for dashboard components
 */
function setupDashboardEvents() {
    // Example: Handle click on assignment items
    const assignmentItems = document.querySelectorAll('.assignment-list li');
    assignmentItems.forEach(item => {
        item.addEventListener('click', function() {
            // This would navigate to the specific assignment
            // For now, just log the action
            const assignmentName = this.querySelector('.assignment-info h3').textContent;
            console.log(`Assignment clicked: ${assignmentName}`);
        });
    });
    
    // Example: Handle click on course progress items
    const courseItems = document.querySelectorAll('.progress-item');
    courseItems.forEach(item => {
        item.addEventListener('click', function() {
            // This would navigate to the specific course
            // For now, just log the action
            const courseName = this.querySelector('.course-info h3').textContent;
            console.log(`Course clicked: ${courseName}`);
        });
    });
}

/**
 * Update dashboard stats with live data
 * This would be called after fetching data from the backend
 * @param {Object} dashboardData - Data for the dashboard
 */
function updateDashboardStats(dashboardData) {
    // This function would update the dashboard with real data
    // For now, it's a placeholder for future implementation
    
    // Example:
    /*
    if (dashboardData.enrolledCourses) {
        document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = dashboardData.enrolledCourses;
    }
    
    if (dashboardData.pendingAssignments) {
        document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = dashboardData.pendingAssignments;
    }
    
    if (dashboardData.averageGrade) {
        document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = dashboardData.averageGrade + '%';
    }
    
    if (dashboardData.attendance) {
        document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = dashboardData.attendance + '%';
    }
    */
}

/**
 * Update recent activity feed with new activities
 * This would be called after fetching data from the backend
 * @param {Array} activities - List of recent activities
 */
function updateRecentActivities(activities) {
    // This function would update the recent activity list with real data
    // For now, it's a placeholder for future implementation
    
    // Example:
    /*
    const activityList = document.querySelector('.activity-list');
    activityList.innerHTML = ''; // Clear existing items
    
    activities.forEach(activity => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="activity-icon"><i class="fas fa-${activity.icon}"></i></div>
            <div class="activity-info">
                <p><strong>${activity.title}:</strong> ${activity.description}</p>
                <span class="time">${activity.time}</span>
            </div>
        `;
        activityList.appendChild(li);
    });
    */
}