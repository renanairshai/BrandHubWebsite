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
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Lightricks Brand Hub initialized');
    
    // Initialize dark mode first (doesn't depend on data)
    initializeDarkMode();
    
    // Load data and render all dynamic content
    // This will create filter buttons, accordion sections, and What's New items
    await renderAllSections();
    
    // Set up H1 header as home button
    initializeHomeButton();
    
    console.log('✅ Brand Hub ready!');
});

/**
 * Makes the H1 header clickable as a "home" button
 * Clicking it resets the website to default view (same as "All" filter)
 */
function initializeHomeButton() {
    const header = document.querySelector('h1');
    
    if (header) {
        header.addEventListener('click', function() {
            console.log('🏠 Home button clicked - resetting to default view');
            
            // Reset to "All" filter view
            if (typeof handleFilterClick === 'function') {
                handleFilterClick('all');
            }
        });
        
        console.log('✅ H1 header configured as home button');
    }
}

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
    
    // Handle clicks on the entire category section (open when closed, close when open)
    accordionCategories.forEach(category => {
        category.addEventListener('click', function(e) {
            const isOpen = this.classList.contains('open');
            
            // Check if the click was on an item link or button (only relevant when open)
            const clickedOnItem = e.target.closest('.item-link');
            const clickedOnButton = e.target.closest('.item-open-button');
            const clickedOnHeader = e.target.closest('.accordion-header');
            
            if (isOpen) {
                // Section is open - close it (unless clicking on items/buttons)
                if (clickedOnItem || clickedOnButton) {
                    return; // Let items work normally
                }
                
                if (clickedOnHeader) {
                    return; // Let header handler deal with it
                }
                
                // Close the section
                this.classList.remove('open');
                console.log('Accordion closed by clicking section');
            } else {
                // Section is closed - open it on any click
                if (clickedOnHeader) {
                    return; // Let header handler deal with it to avoid double-toggle
                }
                
                this.classList.add('open');
                console.log('Accordion opened by clicking section');
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
 * Renders the "Highlights" sidebar
 * Shows featured items and recently added materials
 */
function renderHighlight(data) {
    // TODO: Implementation coming soon (or handled by renderer.js)
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
 * Helper function to create a "Highlight" item link with optional "New" badge
 * @param {Object} item - Item data from CSV
 * @returns {string} HTML string for the item link with arrow
 */
function createHighlightItemHTML(item) {
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

