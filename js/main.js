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
 * Sets up click handlers for accordion headers and sections
 */
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const accordionCategories = document.querySelectorAll('.accordion-category');
    
    // Handle header clicks (open/close toggle)
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            const category = this.parentElement;
            toggleAccordion(category);
        });
    });
    
    // Handle clicks on the entire category section (close when open)
    accordionCategories.forEach(category => {
        category.addEventListener('click', function(e) {
            // Only close if section is open and click wasn't on a link or button
            if (this.classList.contains('open')) {
                // Check if the click was on an item link or its children
                const clickedOnItem = e.target.closest('.item-link');
                const clickedOnButton = e.target.closest('.item-open-button');
                const clickedOnHeader = e.target.closest('.accordion-header');
                
                // If clicked on item or button, don't close
                if (clickedOnItem || clickedOnButton) {
                    return;
                }
                
                // If clicked on header, let the header handler deal with it
                if (clickedOnHeader) {
                    return;
                }
                
                // Otherwise, close the section
                this.classList.remove('open');
                console.log('Accordion closed by clicking section');
            }
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

