/**
 * RENDERER.JS
 * ==================================================
 * Handles rendering dynamic content from data
 * 
 * This file:
 * - Generates filter buttons dynamically
 * - Generates accordion sections dynamically  
 * - Generates What's New section dynamically
 * - Creates HTML from data objects
 */

/**
 * RENDER FILTER BUTTONS (DYNAMIC VERSION)
 * ==================================================
 * Creates filter buttons automatically by scanning the data
 * No hardcoded lists needed - everything comes from your Google Sheet!
 * 
 * Button Order:
 * 1. "All" (fixed, always first)
 * 2. Brands (alphabetical)
 * 3. Categories (alphabetical)
 * 4. Tags (alphabetical)
 * 
 * @param {Array} items - Array of item objects from loadBrandData()
 */
function renderFilterButtons(items) {
    debugLog('🎨 Rendering filter buttons dynamically...');
    
    // STEP 1: Find the filter section in the HTML
    const filterSection = document.querySelector('.filter-section');
    if (!filterSection) {
        console.error('❌ Filter section not found');
        return;
    }
    
    // STEP 2: Clear any existing buttons
    filterSection.innerHTML = '';
    
    // STEP 3: Extract unique filter values from the data
    // This scans all items and finds all unique Brands, Categories, and Tags
    const filterData = extractUniqueFilters(items);
    
    // STEP 4: Create buttons in the correct order
    let buttonCount = 0;
    
    // --- FIXED FILTER: "All" (Always first) ---
    createFilterButton(filterSection, 'all', 'All', buttonCount === 0);
    buttonCount++;
    
    // --- BRAND FILTERS (Alphabetical) ---
    // Loop through each unique brand and create a button
    filterData.brands.forEach(brand => {
        createFilterButton(filterSection, brand, brand, false);
        buttonCount++;
    });
    
    // --- CATEGORY FILTERS (Alphabetical) ---
    // Loop through each unique category and create a button
    filterData.categories.forEach(category => {
        createFilterButton(filterSection, category, category, false);
        buttonCount++;
    });
    
    // --- TAG FILTERS (Alphabetical) ---
    // Loop through each unique tag and create a button
    filterData.tags.forEach(tag => {
        createFilterButton(filterSection, tag, tag, false);
        buttonCount++;
    });
    
    debugLog(`✅ Filter buttons rendered: ${buttonCount} total`);
    debugLog(`   - 1 fixed (All)`);
    debugLog(`   - ${filterData.brands.length} brands`);
    debugLog(`   - ${filterData.categories.length} categories`);
    debugLog(`   - ${filterData.tags.length} tags`);
}

/**
 * Helper function to create a single filter button
 * ==================================================
 * @param {HTMLElement} container - Where to add the button
 * @param {string} value - The filter value (used for filtering logic)
 * @param {string} label - The text to display on the button
 * @param {boolean} isActive - Should this button be active by default?
 */
function createFilterButton(container, value, label, isActive) {
    // Create the button element
    const button = document.createElement('button');
    
    // Add CSS class for styling
    button.className = 'filter-button';
    
    // Set the display text
    button.textContent = label;
    
    // Store the filter value in a data attribute
    // This is used by the filtering logic to know what to filter
    button.dataset.filter = value;
    
    // Mark as active if this is the default button (usually "All")
    if (isActive) {
        button.classList.add('active');
    }
    
    // Add the button to the page
    container.appendChild(button);
}

/**
 * RENDER INDEX SECTION (ACCORDION) - DYNAMIC VERSION
 * ==================================================
 * Creates accordion sections automatically from Categories in your data
 * No hardcoded lists needed - everything comes from your Google Sheet!
 * 
 * How it works:
 * 1. Scan data to find all unique Categories
 * 2. For each Category, find all items that belong to it
 * 3. Create an accordion section with those items
 * 4. Display them alphabetically
 * 
 * @param {Array} items - Array of item objects from loadBrandData()
 */
function renderIndexSection(items) {
    debugLog('🎨 Rendering index section dynamically...');
    
    // STEP 1: Find the index section in the HTML
    const indexSection = document.querySelector('.index-section');
    if (!indexSection) {
        console.error('❌ Index section not found');
        return;
    }
    
    // STEP 2: Clear existing content
    indexSection.innerHTML = '';
    
    // STEP 3: Group items by their category
    // This creates an object like: { "Presentations": [item1, item2], "Assets": [item3] }
    const itemsByCategory = groupItemsByCategory(items);
    
    // STEP 4: Get the category names and sort them alphabetically
    const categories = Object.keys(itemsByCategory).sort();
    
    debugLog(`Found ${categories.length} categories:`, categories);
    
    // STEP 5: Create an accordion for each category
    categories.forEach(categoryName => {
        const categoryItems = itemsByCategory[categoryName];
        
        // Skip if no items (shouldn't happen, but safety check)
        if (!categoryItems || categoryItems.length === 0) {
            debugLog(`⚠️ Category "${categoryName}" has no items, skipping`);
            return;
        }
        
        // Create the accordion HTML for this category
        const accordionHTML = createAccordionHTML(categoryName, categoryItems);
        indexSection.innerHTML += accordionHTML;
        
        debugLog(`  ✓ Created accordion: "${categoryName}" with ${categoryItems.length} items`);
    });
    
    debugLog('✅ Index section rendered');
}

/**
 * Group items by their category
 * ==================================================
 * Takes an array of items and organizes them into an object
 * grouped by category name.
 * 
 * Input:  [{ category: "Assets", ... }, { category: "Assets", ... }, { category: "Guidelines", ... }]
 * Output: { "Assets": [item1, item2], "Guidelines": [item3] }
 * 
 * @param {Array} items - Array of item objects
 * @returns {Object} Object with category names as keys, arrays of items as values
 */
function groupItemsByCategory(items) {
    const grouped = {};
    
    items.forEach(item => {
        // Get the category (or use 'Uncategorized' if missing)
        const categoryName = item.category || 'Uncategorized';
        
        // Create the array for this category if it doesn't exist yet
        if (!grouped[categoryName]) {
            grouped[categoryName] = [];
        }
        
        // Add this item to the category's array
        grouped[categoryName].push(item);
    });
    
    return grouped;
}

/**
 * Create HTML for a single accordion section
 * ==================================================
 * Generates the HTML for one expandable accordion category
 * 
 * @param {string} categoryName - The name of the category (e.g., "Presentations")
 * @param {Array} items - Array of items that belong to this category
 * @returns {string} HTML string for the accordion section
 */
function createAccordionHTML(categoryName, items) {
    // Build a list of all filter values this section should respond to
    // This includes: the category itself, plus all brands and tags of items within
    const allFilterValues = new Set();
    
    // Add the category name itself
    allFilterValues.add(categoryName);
    
    // Add each item's brand and tags
    items.forEach(item => {
        if (item.brand) allFilterValues.add(item.brand);
        if (item.tags) item.tags.forEach(tag => allFilterValues.add(tag));
    });
    
    // Convert Set to comma-separated string for the data attribute
    const filterAttr = Array.from(allFilterValues).join(',');
    
    // Generate the HTML
    return `
        <div class="accordion-category" data-categories="${filterAttr}">
            <div class="accordion-header">
                <h3 class="accordion-title">${categoryName}</h3>
                <span class="accordion-arrow">→</span>
            </div>
            <div class="accordion-content">
                ${items.map(item => createItemLinkHTML(item)).join('')}
            </div>
        </div>
    `;
}

/**
 * Create HTML for a single item link (for accordion sections)
 * ==================================================
 * Generates the HTML for one clickable item within an accordion
 * 
 * @param {Object} item - Item object with title, link, brand, category, tags, etc.
 * @returns {string} HTML string for the item link
 */
function createItemLinkHTML(item) {
    // Build a list of all filter values this item should respond to
    // This includes: brand, category, and all tags
    const filterValues = [];
    
    if (item.brand) filterValues.push(item.brand);
    if (item.category) filterValues.push(item.category);
    if (item.tags && Array.isArray(item.tags)) {
        filterValues.push(...item.tags);
    }
    
    // Join into comma-separated string for data attribute
    const filterAttr = filterValues.join(',');
    
    // Add "NEW" badge if item is marked as new
    const newBadge = item.isNew ? '<span class="badge-new">New</span>' : '';
    
    // Generate the HTML
    return `
        <a href="${item.link}" class="item-link" target="_blank" data-categories="${filterAttr}">
            <span class="item-title">
                ${item.title}
                ${newBadge}
            </span>
            <button class="item-open-button" onclick="event.preventDefault(); window.open('${item.link}', '_blank');">Open</button>
        </a>
    `;
}

/**
 * RENDER HIGHLIGHTS SECTION
 * ==================================================
 * Creates Highlights section from items marked as showInHighlight: true
 * Shows both new items (with badge) and featured items (frequently accessed)
 */
function renderHighlightSection(items) {
    debugLog('🎨 Rendering Highlights section...');
    
    const highlightSection = document.querySelector('.highlight-section');
    if (!highlightSection) {
        console.error('❌ Highlights section not found');
        return;
    }
    
    // Filter items that should show in Highlights
    const highlightItems = items.filter(item => item.showInHighlight);
    
    if (highlightItems.length === 0) {
        debugLog('⚠️ No items marked for Highlights section');
        highlightSection.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem; padding: 1rem 0;">No highlighted items at this time.</p>';
        return;
    }
    
    // Clear existing content
    highlightSection.innerHTML = '';
    
    // Create item links
    highlightItems.forEach(item => {
        highlightSection.innerHTML += createHighlightItemHTML(item);
    });
    
    debugLog('✅ Highlights section rendered:', highlightItems.length, 'items');
}

/**
 * Create HTML for Highlight item (with arrow instead of Open button)
 * ==================================================
 * Generates the HTML for one item in the Highlights sidebar
 * Similar to accordion items but with an arrow instead of "Open" button
 * 
 * @param {Object} item - Item object with title, link, brand, category, tags, etc.
 * @returns {string} HTML string for the highlight item
 */
function createHighlightItemHTML(item) {
    // Build a list of all filter values this item should respond to
    const filterValues = [];
    
    if (item.brand) filterValues.push(item.brand);
    if (item.category) filterValues.push(item.category);
    if (item.tags && Array.isArray(item.tags)) {
        filterValues.push(...item.tags);
    }
    
    // Join into comma-separated string
    const filterAttr = filterValues.join(',');
    
    // Add "NEW" badge if item is marked as new
    const newBadge = item.isNew ? '<span class="badge-new">New</span>' : '';
    
    // Generate the HTML (note the arrow instead of button)
    return `
        <a href="${item.link}" class="item-link" target="_blank" data-categories="${filterAttr}">
            <span class="item-title">
                ${item.title}
                ${newBadge}
            </span>
            <span class="item-arrow">→</span>
        </a>
    `;
}

/**
 * RENDER ALL SECTIONS
 * ==================================================
 * Main function to render everything
 * Called when page loads or data is refreshed
 */
/**
 * RENDER ALL SECTIONS
 * ==================================================
 * Main function to render everything
 * Called when page loads or data is refreshed
 * 
 * This is the "conductor" that coordinates all the rendering functions
 */
async function renderAllSections() {
    try {
        debugLog('🎨 Starting full render...');
        
        // STEP 1: Load data from Google Sheets (or sample data)
        const items = await loadBrandData();
        
        // STEP 2: Render each section
        // Now renderFilterButtons receives the data to scan for unique values
        renderFilterButtons(items);      // Creates filter buttons dynamically
        renderIndexSection(items);       // Creates accordion sections
        renderHighlightSection(items);   // Creates highlights sidebar
        
        debugLog('✅ Full render complete!');
        
        // STEP 3: Re-initialize interactive features after rendering
        // These add click handlers and make things interactive
        initializeAccordions();
        initializeFilters();
        
    } catch (error) {
        console.error('❌ Error rendering sections:', error);
    }
}

/**
 * REFRESH DATA
 * ==================================================
 * Force reload data from Google Sheets (ignores cache)
 * Useful for testing or when you know data has changed
 */
async function refreshData() {
    debugLog('🔄 Refreshing data...');
    clearCache();
    await renderAllSections();
    debugLog('✅ Data refreshed!');
}

/**
 * Make functions available globally
 */
window.renderAllSections = renderAllSections;
window.renderFilterButtons = renderFilterButtons;
window.renderIndexSection = renderIndexSection;
window.renderHighlightSection = renderHighlightSection;
window.refreshData = refreshData;

