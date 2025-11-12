/**
 * DATALOADER.JS
 * ==================================================
 * Handles loading and parsing data from Google Sheets CSV
 * 
 * This file:
 * - Fetches data from your published Google Sheet
 * - Parses CSV format into JavaScript objects
 * - Caches data to reduce repeated fetches
 * - Provides cleaned data to other parts of the application
 */

/**
 * MAIN FUNCTION: Load Brand Data
 * ==================================================
 * This is the main function that other files call to get data
 * It handles fetching, parsing, caching, and error handling
 */
async function loadBrandData() {
    try {
        debugLog('🔄 Loading data from Google Sheets...');
        
        // Check if we have cached data that's still fresh
        const cachedData = getCachedData();
        if (cachedData) {
            debugLog('✅ Using cached data');
            return cachedData;
        }
        
        // Check if CSV URL is configured
        if (!CONFIG.csvUrl || CONFIG.csvUrl === 'PASTE_YOUR_GOOGLE_SHEETS_CSV_URL_HERE') {
            debugLog('⚠️ Google Sheets URL not configured, using sample data');
            return getSampleData();
        }
        
        // Fetch the CSV file from Google Sheets
        const response = await fetch(CONFIG.csvUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        debugLog('📥 CSV downloaded successfully');
        
        // Parse CSV into array of objects
        const parsedData = parseCSV(csvText);
        debugLog('✅ Data parsed:', parsedData.length, 'items');
        
        // Cache the data
        cacheData(parsedData);
        
        return parsedData;
        
    } catch (error) {
        console.error('❌ Error loading data:', error);
        debugLog('⚠️ Falling back to sample data');
        // Return sample data as fallback
        return getSampleData();
    }
}

/**
 * CSV PARSER
 * ==================================================
 * Converts CSV text into an array of JavaScript objects
 * 
 * Expected CSV columns (from Google Sheets):
 * - Item Name: The title/name of the asset
 * - URL: The link to open when clicked
 * - Brand: Sub-brand (Lightricks Brand, Facetune, LTX, Legacy Brands)
 * - Category: Type of asset - creates BOTH filters AND accordion sections
 * - Tags: Additional keywords (comma-separated) - creates filters only
 * - Highlight: "Yes" or "No" - show in Highlights sidebar?
 * - Is New: "Yes" or "No" - show green "NEW" badge?
 */
function parseCSV(csvText) {
    // Split into lines and remove empty lines
    const lines = csvText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    if (lines.length < 2) {
        debugLog('⚠️ CSV file is empty or has no data rows');
        return [];
    }
    
    // First line is the header
    const headers = parseCSVLine(lines[0]);
    debugLog('📋 CSV Headers:', headers);
    
    // Parse each data row
    const items = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        
        // Skip empty rows
        if (values.length === 0 || values.every(v => !v)) {
            continue;
        }
        
        // Create object from this row
        const item = {};
        headers.forEach((header, index) => {
            item[header] = values[index] || '';
        });
        
        // Transform into our internal format
        const transformedItem = transformItem(item);
        if (transformedItem) {
            items.push(transformedItem);
        }
    }
    
    debugLog('✅ Parsed items:', items);
    return items;
}

/**
 * Parse a single CSV line (handles quoted values with commas)
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            // Toggle quote state
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            // End of field
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    // Push the last field
    result.push(current.trim());
    
    return result;
}

/**
 * Transform CSV row into internal item format
 * ==================================================
 * Converts from Google Sheets columns to our app's data structure
 * This is the "translator" that turns spreadsheet rows into JavaScript objects
 */
function transformItem(csvRow) {
    // STEP 1: Required fields check
    // Every item MUST have a name and URL, otherwise skip it
    if (!csvRow['Item Name'] || !csvRow['URL']) {
        debugLog('⚠️ Skipping row with missing Item Name or URL:', csvRow);
        return null;
    }
    
    // STEP 2: Transform the row into our internal format
    return {
        // ===== BASIC INFO =====
        title: csvRow['Item Name'].trim(),  // The display name
        link: csvRow['URL'].trim(),         // Where to go when clicked
        
        // ===== BRAND (Single Value) =====
        // Which sub-brand this belongs to (Lightricks, Facetune, LTX, etc.)
        // Creates filter buttons in the "Brand" group
        brand: csvRow['Brand'] ? csvRow['Brand'].trim() : null,
        
        // ===== CATEGORY (Single Value) =====
        // What TYPE of asset this is (Presentations, Assets, Guidelines, etc.)
        // This is IMPORTANT because it:
        // 1. Creates filter buttons in the "Category" group
        // 2. Creates accordion sections in the Index
        // If no category is provided, put it in "Uncategorized"
        category: csvRow['Category'] ? csvRow['Category'].trim() : 'Uncategorized',
        
        // ===== TAGS (Multiple Values) =====
        // Additional keywords for filtering (Resources, Tools, Videos, etc.)
        // Can be comma-separated: "Resources, Tools"
        // Creates filter buttons in the "Tags" group
        // Process: Split by comma, trim whitespace, remove empty strings
        tags: csvRow['Tags'] 
            ? csvRow['Tags'].split(',').map(t => t.trim()).filter(t => t)
            : [],
        
        // ===== DISPLAY OPTIONS =====
        // Display in Highlights section?
        showInHighlight: isYes(csvRow['Highlight']),
        
        // Show "NEW" badge?
        isNew: isYes(csvRow['Is New'])
    };
}

/**
 * Helper: Check if value is "Yes"
 */
function isYes(value) {
    if (!value) return false;
    return value.toString().toLowerCase().trim() === 'yes';
}

/**
 * CACHING FUNCTIONS
 * ==================================================
 * Store data in browser's localStorage to reduce repeated fetches
 */

function getCachedData() {
    if (CONFIG.cacheTimeout === 0) {
        return null; // Caching disabled
    }
    
    try {
        const cached = localStorage.getItem('brandHubData');
        if (!cached) return null;
        
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        // Check if cache is still fresh
        if (age < CONFIG.cacheTimeout) {
            return data;
        }
        
        // Cache expired
        return null;
    } catch (error) {
        debugLog('⚠️ Error reading cache:', error);
        return null;
    }
}

function cacheData(data) {
    if (CONFIG.cacheTimeout === 0) {
        return; // Caching disabled
    }
    
    try {
        const cacheObject = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem('brandHubData', JSON.stringify(cacheObject));
        debugLog('💾 Data cached successfully');
    } catch (error) {
        debugLog('⚠️ Error caching data:', error);
    }
}

/**
 * Clear cached data (useful for testing)
 */
function clearCache() {
    localStorage.removeItem('brandHubData');
    debugLog('🗑️ Cache cleared');
}

/**
 * SAMPLE DATA
 * ==================================================
 * Used when Google Sheet is not configured or fails to load
 * This lets you test the website before connecting your sheet
 * 
 * This sample data demonstrates the new 3-tier structure:
 * - Brand: Sub-brand (Lightricks Brand, Facetune, LTX, Legacy Brands)
 * - Category: Type of asset (Presentations, Assets, Guidelines, Templates)
 * - Tags: Additional keywords (Resources, Tools, etc.)
 */
function getSampleData() {
    return [
        {
            title: 'Main Brand Presentation Template',
            link: 'https://drive.google.com/example1',
            brand: 'Lightricks Brand',          // Sub-brand
            category: 'Presentations',           // Type (creates accordion)
            tags: ['Resources'],                 // Additional keywords
            showInHighlight: true,
            isNew: true
        },
        {
            title: 'Facetune Logo Kit',
            link: 'https://drive.google.com/example2',
            brand: 'Facetune',
            category: 'Assets',
            tags: ['Logo Kits', 'Resources'],   // Multiple tags
            showInHighlight: true,
            isNew: true
        },
        {
            title: 'LTX Brand Guidelines',
            link: 'https://drive.google.com/example3',
            brand: 'LTX',
            category: 'Guidelines',
            tags: [],                            // No tags
            showInHighlight: false,
            isNew: false
        },
        {
            title: 'Training Video Library',
            link: 'https://drive.google.com/example4',
            brand: 'Lightricks Brand',
            category: 'Templates',
            tags: ['Videos', 'Training'],        // Multiple tags
            showInHighlight: true,
            isNew: true
        },
        {
            title: 'Email Signature Templates',
            link: 'https://drive.google.com/example5',
            brand: 'Lightricks Brand',
            category: 'Templates',
            tags: ['Tools'],
            showInHighlight: false,
            isNew: false
        },
        {
            title: 'Social Media Guidelines',
            link: 'https://drive.google.com/example6',
            brand: 'Lightricks Brand',
            category: 'Guidelines',
            tags: ['Resources'],
            showInHighlight: false,
            isNew: false
        },
        {
            title: 'My Test Item',
            link: 'https://example.com/test',
            brand: 'Test Brand',              // NEW BRAND!
            category: 'Videos',                // NEW CATEGORY!
            tags: ['New Tag', 'Testing'],     // NEW TAGS!
            showInHighlight: true,
            isNew: true
        },
        {
            title: 'Legacy Brand Archive',
            link: 'https://drive.google.com/example7',
            brand: 'Legacy Brands',
            category: 'Assets',
            tags: ['Archive'],
            showInHighlight: false,
            isNew: false
        }
    ];
}

/**
 * EXTRACT UNIQUE FILTER VALUES
 * ==================================================
 * This is the "magic" function that scans all your data and automatically
 * discovers what Brands, Categories, and Tags exist.
 * 
 * This makes the system fully dynamic - you never need to update code,
 * just add items to your Google Sheet!
 * 
 * @param {Array} items - Array of item objects from loadBrandData()
 * @returns {Object} Object with three arrays: brands, categories, tags
 */
function extractUniqueFilters(items) {
    debugLog('🔍 Scanning data to extract unique filter values...');
    
    // STEP 1: Create Sets to store unique values
    // Why Sets? They automatically prevent duplicates!
    // If you add "Facetune" 5 times, the Set only keeps one copy
    const brandsSet = new Set();
    const categoriesSet = new Set();
    const tagsSet = new Set();
    
    // STEP 2: Loop through every item in the data
    items.forEach(item => {
        
        // ===== EXTRACT BRAND =====
        // If this item has a brand, add it to our brands Set
        if (item.brand) {
            brandsSet.add(item.brand);
        }
        
        // ===== EXTRACT CATEGORY =====
        // If this item has a category, add it to our categories Set
        if (item.category) {
            categoriesSet.add(item.category);
        }
        
        // ===== EXTRACT TAGS =====
        // Tags is an array (can have multiple), so loop through each tag
        if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => {
                if (tag) {  // Only add non-empty tags
                    tagsSet.add(tag);
                }
            });
        }
    });
    
    // STEP 3: Convert Sets to Arrays and sort alphabetically
    // Sets are great for collecting unique values, but we need arrays for the UI
    // .sort() puts them in alphabetical order (A-Z)
    const brands = Array.from(brandsSet).sort();
    const categories = Array.from(categoriesSet).sort();
    const tags = Array.from(tagsSet).sort();
    
    // STEP 4: Log what we found (helpful for debugging)
    debugLog('✅ Found unique values:');
    debugLog('  - Brands:', brands);
    debugLog('  - Categories:', categories);
    debugLog('  - Tags:', tags);
    
    // STEP 5: Return the organized lists
    return {
        brands: brands,       // All unique brands, alphabetical
        categories: categories,  // All unique categories, alphabetical
        tags: tags            // All unique tags, alphabetical
    };
}

/**
 * Make functions available globally
 * This allows other JavaScript files to use these functions
 */
window.loadBrandData = loadBrandData;
window.clearCache = clearCache;
window.extractUniqueFilters = extractUniqueFilters;
