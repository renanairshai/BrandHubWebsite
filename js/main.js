/**
 * MAIN.JS
 * ==================================================
 * Core application logic and initialization
 * 
 * This file:
 * - Initializes the application when page loads
 * - Coordinates between different modules (dataLoader, filters, darkMode)
 * - Handles main UI interactions
 * - Renders the content on the page
 */

// Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Lightricks Brand Hub initialized');
    
    // Initialize the application
    initializeDarkMode();      // Set up dark mode toggle
    initializeAccordions();    // Set up accordion click handlers
    
    // TODO: Load data from Google Sheets/CSV and render dynamically
    // For now, the static HTML content will work
});

/**
 * Initializes accordion functionality
 * Sets up click handlers for accordion headers
 */
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.parentElement;
            toggleAccordion(category);
        });
    });
    
    console.log(`Initialized ${accordionHeaders.length} accordions`);
}

/**
 * Handles clicks on category accordions
 * Opens/closes the accordion to show/hide items
 */
function toggleAccordion(categoryElement) {
    // Toggle the 'open' class on the category
    categoryElement.classList.toggle('open');
    
    const isOpen = categoryElement.classList.contains('open');
    console.log(`Accordion ${isOpen ? 'opened' : 'closed'}`);
}

/**
 * Renders the main repository/index section
 * This will display all categories and items in accordion format
 */
function renderRepository(data) {
    // TODO: Implementation coming soon
    // This will dynamically generate accordion categories from Google Sheets data
}

/**
 * Renders the "What's New" sidebar
 * Shows featured items and recently added materials
 */
function renderWhatsNew(data) {
    // TODO: Implementation coming soon
    // This will dynamically generate featured items from Google Sheets data
}

/**
 * Helper function to create an item link with optional "New" badge (for Index section)
 * @param {Object} item - Item data from CSV
 * @returns {string} HTML string for the item link with "Open" button
 */
function createItemHTML(item) {
    const newBadge = (item.isNew === true || item.isNew === 'TRUE') 
        ? '<span class="badge-new">New</span>' 
        : '';
    
    return `
        <a href="${item.link}" class="item-link" target="_blank" rel="noopener">
            <span class="item-title">
                ${item.title}
                ${newBadge}
            </span>
            <span class="item-open-button">Open</span>
        </a>
    `;
}

/**
 * Helper function to create a "What's New" item link with optional "New" badge
 * @param {Object} item - Item data from CSV
 * @returns {string} HTML string for the item link with arrow
 */
function createWhatsNewItemHTML(item) {
    const newBadge = (item.isNew === true || item.isNew === 'TRUE') 
        ? '<span class="badge-new">New</span>' 
        : '';
    
    return `
        <a href="${item.link}" class="item-link" target="_blank" rel="noopener">
            <span class="item-title">
                ${item.title}
                ${newBadge}
            </span>
            <span class="item-arrow">→</span>
        </a>
    `;
}

