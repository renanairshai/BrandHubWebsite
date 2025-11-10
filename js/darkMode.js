/**
 * DARKMODE.JS
 * ==================================================
 * Handles dark mode toggle functionality
 * 
 * This file:
 * - Toggles between light and dark themes
 * - Saves user preference to browser storage
 * - Restores preference when user returns to site
 */

// Key for storing preference in browser's localStorage
const THEME_STORAGE_KEY = 'lightricks-brand-hub-theme';

/**
 * Initializes dark mode functionality
 * Restores saved theme preference and sets up toggle button
 */
function initializeDarkMode() {
    console.log('Initializing dark mode...');
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    // Set up click handler for dark mode toggle button
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
}

/**
 * Toggles between light and dark mode
 * Called when user clicks the toggle button
 */
function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

/**
 * Enables dark mode
 * Adds 'dark-mode' class to body and saves preference
 */
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    console.log('Dark mode enabled');
}

/**
 * Disables dark mode
 * Removes 'dark-mode' class from body and saves preference
 */
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    console.log('Dark mode disabled');
}

