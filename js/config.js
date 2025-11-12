/**
 * CONFIG.JS
 * ==================================================
 * Configuration settings for Lightricks Brand Hub
 * 
 * This file contains settings that control how the website works.
 * You can change these values without touching other code.
 */

const CONFIG = {
    /**
     * GOOGLE SHEET CSV URL
     * ==================================================
     * Replace this with your published Google Sheets CSV URL
     * 
     * How to get this URL:
     * 1. Open your Google Sheet
     * 2. File → Share → Publish to web
     * 3. Choose "Comma-separated values (.csv)"
     * 4. Copy the URL and paste it below
     */
    csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIPZHDwy7zjVdnmXMzqrzgzi_N5Emv8UkHN-P7Yl9FEU15qON2yew5IZLwkiOz9U7RRS7LNeM3VSE6/pub?output=csv',
    
    /**
     * NOTE: Filter buttons and accordion sections are now FULLY DYNAMIC!
     * ==================================================
     * The website automatically generates them from your Google Sheet data.
     * No need to configure them here anymore.
     * 
     * Filter buttons appear in this order:
     * 1. "All" (fixed)
     * 2. All unique Brands (alphabetical)
     * 3. All unique Categories (alphabetical)
     * 4. All unique Tags (alphabetical)
     * 
     * Accordion sections are created from unique Categories.
     * 
     * Just update your Google Sheet and everything updates automatically! ✨
     */
    
    /**
     * DEBUG MODE
     * ==================================================
     * Set to true to see console logs (helpful for troubleshooting)
     * Set to false for production (cleaner console)
     */
    debug: true,
    
    /**
     * CACHE TIMEOUT
     * ==================================================
     * How long to cache Google Sheets data (in milliseconds)
     * 300000 = 5 minutes
     * 
     * This prevents fetching the sheet on every page load
     * Set to 0 to disable caching (fetch every time)
     */
    cacheTimeout: 300000
};

/**
 * Helper function to log debug messages
 * Only shows messages when CONFIG.debug is true
 */
function debugLog(...args) {
    if (CONFIG.debug) {
        console.log('[Brand Hub]', ...args);
    }
}

/**
 * Make CONFIG available globally
 * This allows other JavaScript files to access these settings
 */
window.CONFIG = CONFIG;
window.debugLog = debugLog;

