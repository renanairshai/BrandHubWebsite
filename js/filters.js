/**
 * FILTERS.JS
 * ==================================================
 * Handles filtering logic for the brand hub
 * 
 * This file:
 * - Manages filter button states (active/inactive)
 * - Filters items based on selected categories/tags
 * - Updates the display to show only matching items
 * - Handles the "ALL" button to reset filters
 */

console.log('✅ filters.js loaded successfully');

// Keep track of the currently active filter
let activeFilter = null; // null means "ALL" is active

/**
 * Initializes filter buttons
 * Sets up click handlers for all filter pills
 */
function initializeFilters() {
    console.log('🔧 Initializing filters...');
    
    const filterButtons = document.querySelectorAll('.filter-button');
    console.log('🔍 Found filter buttons:', filterButtons.length);
    
    if (filterButtons.length === 0) {
        console.error('❌ No filter buttons found! Check if HTML has .filter-button elements');
        return;
    }
    
    filterButtons.forEach((button, index) => {
        const filterValue = button.getAttribute('data-filter');
        console.log(`  Button ${index + 1}: data-filter="${filterValue}"`);
        
        button.addEventListener('click', function() {
            const clickedFilterValue = this.getAttribute('data-filter');
            console.log('🖱️ Button clicked!', clickedFilterValue);
            handleFilterClick(clickedFilterValue);
        });
    });
    
    console.log(`✅ Initialized ${filterButtons.length} filter buttons`);
}

/**
 * Handles filter button clicks
 * Updates active filter and shows/hides appropriate sections
 */
function handleFilterClick(filterValue) {
    console.log(`🎯 Filter clicked: ${filterValue}`);
    
    // Update active filter
    if (filterValue === 'all') {
        console.log('  → Showing ALL (Index section)');
        activeFilter = null;
        showIndexSection();
    } else {
        console.log(`  → Showing filtered results for: ${filterValue}`);
        activeFilter = filterValue;
        showFilteredSection(filterValue);
    }
    
    // Update button states
    updateFilterButtonStates(filterValue);
}

/**
 * Shows the Index section (all accordions)
 * Hides the filtered section
 * Closes all open accordion sections to reset to original state
 * Shows Highlights section (visible in default view)
 */
function showIndexSection() {
    const indexSection = document.getElementById('indexSection');
    const filteredSection = document.getElementById('filteredSection');
    const highlightSection = document.querySelector('.highlight-section');
    
    if (indexSection) indexSection.style.display = 'block';
    if (filteredSection) filteredSection.style.display = 'none';
    if (highlightSection) highlightSection.style.display = 'block'; // Show Highlights in default view
    
    // Close all accordion sections to reset to original state
    const openAccordions = document.querySelectorAll('.accordion-category.open');
    openAccordions.forEach(accordion => {
        accordion.classList.remove('open');
    });
    
    console.log('Showing Index section - all accordions closed (original state)');
}

/**
 * Shows the filtered section with matching items
 * Hides the Index section
 * Hides Highlights section to focus on filtered results
 * ==================================================
 * This is where the magic happens! When a user clicks a filter button,
 * this function finds all items that match and displays them.
 * 
 * HOW MATCHING WORKS:
 * Each item has a data-categories attribute that contains:
 * - Its Brand (e.g., "Lightricks Brand")
 * - Its Category (e.g., "Presentations")
 * - All its Tags (e.g., "Resources, Tools")
 * 
 * When filtering by "Facetune", it shows items where data-categories includes "Facetune"
 * When filtering by "Presentations", it shows items where data-categories includes "Presentations"
 * And so on!
 * 
 * @param {string} filterValue - The filter to apply (e.g., "Facetune", "Presentations")
 */
function showFilteredSection(filterValue) {
    const indexSection = document.getElementById('indexSection');
    const filteredSection = document.getElementById('filteredSection');
    const highlightSection = document.querySelector('.highlight-section');
    
    // STEP 1: Hide Index and Highlights, show filtered section
    if (indexSection) indexSection.style.display = 'none';
    if (filteredSection) filteredSection.style.display = 'block';
    if (highlightSection) highlightSection.style.display = 'none';
    
    // STEP 2: Find all items in the index section
    const allItems = document.querySelectorAll('.index-section .item-link');
    const matchingItems = [];
    
    // STEP 3: Check each item to see if it matches the filter
    allItems.forEach(item => {
        // Get the data-categories attribute
        // This contains: "Brand,Category,Tag1,Tag2"
        const categories = item.getAttribute('data-categories');
        
        // Check if the filter value appears anywhere in the list
        // Example: If filterValue is "Facetune" and categories is "Facetune,Assets,Logo Kits"
        // then .includes() returns true!
        if (categories && categories.includes(filterValue)) {
            matchingItems.push(item);
        }
    });
    
    console.log(`Found ${matchingItems.length} items for filter: ${filterValue}`);
    
    // STEP 4: Display the matching items
    renderFilteredSection(filterValue, matchingItems);
}

/**
 * Renders the filtered section with a title and matching items
 * ==================================================
 * Creates a clean display of filtered results
 * Looks like an open accordion section
 * 
 * @param {string} filterTitle - The filter name to display as title
 * @param {Array} items - Array of HTML elements (the matching items)
 */
function renderFilteredSection(filterTitle, items) {
    const filteredSection = document.getElementById('filteredSection');
    
    if (!filteredSection) return;
    
    // STEP 1: Create the container HTML
    // This creates a section that looks like an open accordion
    let html = `
        <div class="filtered-section-inner">
            <h3 class="filtered-section-title">${filterTitle}</h3>
            <div class="filtered-section-items">
    `;
    
    // STEP 2: Add each matching item
    // We use outerHTML to copy the entire item element
    items.forEach(item => {
        html += item.outerHTML;
    });
    
    // STEP 3: Close the container
    html += `
            </div>
        </div>
    `;
    
    // STEP 4: Insert the HTML into the page
    filteredSection.innerHTML = html;
    
    console.log(`Rendered filtered section for: ${filterTitle}`);
}

/**
 * Updates filter button visual states
 * Shows which filter is currently active
 */
function updateFilterButtonStates(activeFilterValue) {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        const buttonValue = button.getAttribute('data-filter');
        
        if (buttonValue === activeFilterValue) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

