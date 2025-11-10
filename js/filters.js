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
 * Shows What's New section (visible in default view)
 */
function showIndexSection() {
    const indexSection = document.getElementById('indexSection');
    const filteredSection = document.getElementById('filteredSection');
    const whatsNewSection = document.querySelector('.whats-new-section');
    
    if (indexSection) indexSection.style.display = 'block';
    if (filteredSection) filteredSection.style.display = 'none';
    if (whatsNewSection) whatsNewSection.style.display = 'block'; // Show What's New in default view
    
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
 * Hides What's New section to focus on filtered results
 */
function showFilteredSection(filterValue) {
    const indexSection = document.getElementById('indexSection');
    const filteredSection = document.getElementById('filteredSection');
    const whatsNewSection = document.querySelector('.whats-new-section');
    
    // Hide Index and What's New, show filtered section
    if (indexSection) indexSection.style.display = 'none';
    if (filteredSection) filteredSection.style.display = 'block';
    if (whatsNewSection) whatsNewSection.style.display = 'none'; // Hide What's New when filtering
    
    // Get all items with matching categories
    const allItems = document.querySelectorAll('.index-section .item-link');
    const matchingItems = [];
    
    allItems.forEach(item => {
        const categories = item.getAttribute('data-categories');
        if (categories && categories.includes(filterValue)) {
            matchingItems.push(item);
        }
    });
    
    console.log(`Found ${matchingItems.length} items for filter: ${filterValue}`);
    
    // Render the filtered section
    renderFilteredSection(filterValue, matchingItems);
}

/**
 * Renders the filtered section with a title and matching items
 */
function renderFilteredSection(filterTitle, items) {
    const filteredSection = document.getElementById('filteredSection');
    
    if (!filteredSection) return;
    
    // Create the HTML structure (looks like an open accordion)
    let html = `
        <div class="filtered-section-inner">
            <h3 class="filtered-section-title">${filterTitle}</h3>
            <div class="filtered-section-items">
    `;
    
    // Clone each matching item
    items.forEach(item => {
        // Clone the item and add it to the filtered section
        html += item.outerHTML;
    });
    
    html += `
            </div>
        </div>
    `;
    
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

