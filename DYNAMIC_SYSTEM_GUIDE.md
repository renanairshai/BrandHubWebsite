# Dynamic System Guide 🚀

## 📖 Overview

Your Brand Hub is now **almost completely dynamic**! Content is loaded from Google Sheets, and you can add/edit/remove items without touching any code.

---

## ⚙️ How It Works

### **1. Google Sheets** (Your Content Database)
- You maintain a Google Sheet with all your brand materials
- Each row = one brand material (presentation, guideline, asset, etc.)
- Dropdowns ensure data consistency and prevent typos

### **2. Publish as CSV**
- Google Sheets can publish your sheet as a live CSV file
- This CSV updates automatically when you edit the sheet
- The website fetches this CSV to load content

### **3. JavaScript Loads & Parses**
- When someone visits your website, JavaScript fetches the CSV
- It parses the CSV into data objects
- Data is cached for 5 minutes to improve performance

### **4. Dynamic Rendering**
- Filter buttons are generated from the data
- Accordion sections are created automatically
- What's New section populated with flagged items
- Everything styled consistently

---

## 🎯 Current Status

### ✅ **What's Dynamic:**
- Filter buttons (generated from `config.js`)
- All accordion sections (Index area)
- All item links with "Open" buttons
- "New" badges (based on CSV data)
- What's New section (based on CSV flag)

### 📝 **What's Still Manual:**
- Filter category list (`config.js`)
- Accordion section list (`config.js`)
- Dark mode toggle
- Request Form button

---

## 🔧 Configuration Files

### **1. config.js** - Your Control Panel

Located at: `js/config.js`

**What you can edit:**

#### **CSV URL:**
```javascript
csvUrl: 'YOUR_GOOGLE_SHEETS_CSV_URL_HERE'
```
Replace with your published Google Sheets URL.

#### **Filter Categories:**
```javascript
filterCategories: [
    { value: 'all', label: 'All' },
    { value: 'Presentations', label: 'Presentations' },
    // Add more filters here
]
```
- `value`: Must match categories in your Google Sheet
- `label`: What users see on the button

#### **Accordion Sections:**
```javascript
accordionSections: [
    { id: 'Presentations', title: 'Presentations' },
    // Add more sections here
]
```
- `id`: Must match "Section" column in your Google Sheet
- `title`: What users see in the accordion

#### **Debug Mode:**
```javascript
debug: true  // See console logs
debug: false // Hide console logs
```

#### **Cache Timeout:**
```javascript
cacheTimeout: 300000  // 5 minutes (in milliseconds)
cacheTimeout: 0       // Disable caching (fetch every time)
```

---

## 📊 Google Sheets Structure

Your sheet should have these columns:

| Column | Description | Example |
|--------|-------------|---------|
| **Item Name** | Display name | "Brand Presentation 2024" |
| **URL** | Link to material | "https://drive.google.com/..." |
| **Section** | Accordion category | "Presentations" |
| **Categories** | Filter tags (comma-separated) | "Presentations, Resources" |
| **Show in What's New** | Featured? | "Yes" or "No" |
| **Is New** | Show NEW badge? | "Yes" or "No" |

**Important Rules:**
- Section: Choose ONE per item
- Categories: Can have MULTIPLE (comma-separated)
- Must match exactly what's in `config.js`

---

## 🔄 Adding New Content

### **Adding a New Brand Material:**
1. Open your Google Sheet
2. Add a new row with all columns filled
3. Select appropriate dropdowns
4. Save (Google Sheets auto-saves)
5. Refresh your website (data updates within 5 min or immediately if cache cleared)

### **Adding a New Filter Category:**
1. Add items to your sheet with the new category in "Categories" column
2. Open `js/config.js`
3. Add to `filterCategories` array:
   ```javascript
   { value: 'NewCategory', label: 'New Category' }
   ```
4. Save and refresh website

### **Adding a New Accordion Section:**
1. Add items to your sheet with the new section in "Section" column
2. Open `js/config.js`
3. Add to `accordionSections` array:
   ```javascript
   { id: 'New Section', title: 'New Section' }
   ```
4. Save and refresh website

---

## 🐛 Debugging

### **Open Browser Console:**
- **Chrome**: `Cmd + Option + J` (Mac) / `Ctrl + Shift + J` (Windows)
- **Safari**: `Cmd + Option + C` (Mac, enable in Preferences first)

### **Check Console Logs:**
If `debug: true` in config.js, you'll see:
```
[Brand Hub] 🔄 Loading data from Google Sheets...
[Brand Hub] 📥 CSV downloaded successfully
[Brand Hub] ✅ Data parsed: 15 items
[Brand Hub] 🎨 Rendering filter buttons...
[Brand Hub] ✅ Filter buttons rendered: 8
[Brand Hub] 🎨 Rendering index section...
[Brand Hub] ✅ Index section rendered
```

### **Common Issues:**

#### **"Using cached data"**
- Normal behavior (improves performance)
- To force fresh data: Open console and type `refreshData()`

#### **"Google Sheets URL not configured, using sample data"**
- You haven't added your CSV URL to `config.js`
- Add your published Google Sheets URL

#### **Filters not working**
- Check that category values in `config.js` match your sheet exactly
- Check browser console for errors

#### **Items not appearing**
- Check that "Section" value matches `accordionSections` in `config.js`
- Verify CSV is published and URL is correct

#### **What's New is empty**
- Make sure some items have "Yes" in "Show in What's New" column
- Check that dropdowns are using exactly "Yes" (not "yes" or "YES")

---

## 🎨 Customization

### **Changing Filter Button Order:**
In `config.js`, reorder the `filterCategories` array. The order in the array = order on screen.

### **Changing Accordion Section Order:**
In `config.js`, reorder the `accordionSections` array. The order in the array = order on screen.

### **Changing Styles:**
All styling is in `css/styles.css`. The dynamic content uses the same classes as before, so all your styling still applies.

---

## ⚡ Advanced Features

### **Refresh Data Manually:**
Open browser console and type:
```javascript
refreshData()
```
This clears cache and reloads from Google Sheets immediately.

### **Clear Cache:**
Open browser console and type:
```javascript
clearCache()
```
Then refresh the page normally.

### **Check Current Data:**
Open browser console and type:
```javascript
loadBrandData().then(data => console.log(data))
```
See exactly what data the website is using.

---

## 📝 Next Steps

### **To Go Live:**
1. ✅ Create your Google Sheet (see `GOOGLE_SHEETS_SETUP.md`)
2. ✅ Add your content rows
3. ✅ Set up dropdown validation
4. ✅ Publish sheet as CSV
5. ✅ Copy CSV URL to `config.js`
6. ✅ Update filter categories in `config.js` to match your needs
7. ✅ Update accordion sections in `config.js` to match your needs
8. ✅ Test on localhost
9. 🔲 Deploy to your hosting (coming next!)

### **For Testing:**
Right now the site shows **sample data** because no Google Sheet is connected. This is intentional - it lets you see how everything works before setting up your sheet.

---

## 🆘 Getting Help

### **Check These Files:**
- `GOOGLE_SHEETS_SETUP.md` - How to structure your Google Sheet
- `README.md` - Overall project documentation
- `js/config.js` - Your main configuration file

### **Console Logs:**
Enable debug mode in `config.js` and watch the browser console for detailed information about what's happening.

### **Still Stuck?**
Check that:
1. Your Google Sheet has the correct column names (exact spelling)
2. Your CSV is published (not just shared)
3. The URL in `config.js` is the CSV URL (not the regular sheet URL)
4. Dropdowns in your sheet use exact values (case-sensitive)
5. Browser cache is cleared (hard refresh: `Cmd + Shift + R`)

---

## 🎓 Understanding the Code (For Learning)

### **File Structure:**
```
js/
├── config.js          ← Your settings (edit this!)
├── dataLoader.js      ← Fetches & parses CSV
├── renderer.js        ← Creates HTML from data
├── filters.js         ← Handles filter button clicks
├── darkMode.js        ← Dark/light mode toggle
└── main.js            ← Coordinates everything
```

### **Load Sequence:**
1. Page loads → `main.js` runs
2. `main.js` calls `renderAllSections()`
3. `renderAllSections()` calls `loadBrandData()`
4. `loadBrandData()` fetches CSV, parses it
5. Data passed to `renderFilterButtons()`, `renderIndexSection()`, `renderWhatsNewSection()`
6. Each renderer creates HTML and injects it into the page
7. `initializeAccordions()` and `initializeFilters()` add click handlers
8. Website is ready!

### **How Filtering Works:**
1. User clicks a filter button
2. `filters.js` reads the `data-filter` attribute
3. Finds all items with matching category in `data-categories`
4. Creates a filtered view that looks like an open accordion
5. Hides the main index, shows the filtered section
6. "All" button reverses this (shows everything)

---

## 🎉 You're All Set!

Your Brand Hub now dynamically loads content from Google Sheets. Just maintain your sheet, and the website updates automatically!

Remember:
- ✅ Edit content = Edit Google Sheet
- ✅ Add filters = Edit `config.js`
- ✅ Add sections = Edit `config.js`
- ✅ Change styles = Edit `css/styles.css`

**No HTML editing needed for day-to-day content management!** 🚀

