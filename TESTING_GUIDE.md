# Testing Guide - Dynamic Filter System

This guide will help you test the new dynamic filter and category system.

---

## ✅ What Changed

We transformed the website from **hardcoded** filters to a **fully dynamic** system:

### **Before (Old System):**
- ❌ Filter buttons hardcoded in `config.js`
- ❌ Had to edit code to add new filters
- ❌ Accordion sections hardcoded in `config.js`
- ❌ Confusing "Section" and "Categories" columns

### **After (New System):**
- ✅ Filter buttons auto-generated from Google Sheet data
- ✅ Accordion sections auto-generated from Categories
- ✅ Clear 3-tier system: Brand → Category → Tags
- ✅ Just update Google Sheet, website updates automatically!

---

## 🧪 Testing Checklist

### **Step 1: Start Local Server**

```bash
cd "/Users/renana/Documents/2025/Brand/Web Design /Hub/BrandHubWebsite"
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

---

### **Step 2: Test with Sample Data (No Google Sheet Needed)**

The website has built-in sample data, so you can test WITHOUT setting up Google Sheets first!

#### **What You Should See:**

1. **Filter Buttons** (in this exact order):
   ```
   [All] [Facetune] [Legacy Brands] [Lightricks Brand] [LTX] [Assets] [Guidelines] [Presentations] [Templates] [Archive] [Logo Kits] [Resources] [Tools] [Training] [Videos]
   ```
   - "All" should be active (highlighted) by default
   - Groups: Brands, then Categories, then Tags (alphabetical within each group)

2. **Accordion Sections**:
   - 📁 Assets (closed by default)
   - 📁 Guidelines (closed by default)
   - 📁 Presentations (closed by default)
   - 📁 Templates (closed by default)

3. **Highlights Sidebar** (right side):
   - Should show 4 items
   - 2 items with green "NEW" badges

4. **Console Log** (press F12 → Console tab):
   - Should see debug messages like:
     ```
     [Brand Hub] 🔍 Scanning data to extract unique filter values...
     [Brand Hub] ✅ Found unique values:
     [Brand Hub]   - Brands: ['Facetune', 'Legacy Brands', 'Lightricks Brand', 'LTX']
     ```

---

### **Step 3: Test Filter Interactions**

#### **Test 1: Click "All" Button**
- ✅ Should show all accordion sections (closed)
- ✅ Highlights sidebar visible
- ✅ "All" button highlighted

#### **Test 2: Click a Brand Filter (e.g., "Facetune")**
- ✅ Index section should hide
- ✅ Filtered section appears with title "Facetune"
- ✅ Should show: "Facetune Logo Kit"
- ✅ Highlights sidebar should hide
- ✅ "Facetune" button highlighted

#### **Test 3: Click a Category Filter (e.g., "Presentations")**
- ✅ Should show items from the Presentations category
- ✅ Should display: "Main Brand Presentation Template"
- ✅ "Presentations" button highlighted

#### **Test 4: Click a Tag Filter (e.g., "Resources")**
- ✅ Should show all items tagged with "Resources"
- ✅ Should display multiple items (cross-category)
- ✅ "Resources" button highlighted

#### **Test 5: Click Logo/Header**
- ✅ Should reset to "All" view
- ✅ Same as clicking "All" button

---

### **Step 4: Test Accordion Interactions**

#### **When on "All" View:**
1. **Click an accordion header** (e.g., "Presentations")
   - ✅ Should expand and show items
   - ✅ Arrow should point down (↓)
   
2. **Click the header again**
   - ✅ Should close
   - ✅ Arrow should point right (→)

3. **Click an item's "Open" button**
   - ✅ Should open the link in a new tab

---

### **Step 5: Test NEW Badges**

Check that green "NEW" badges appear on:
- ✅ "Facetune Logo Kit" (in Assets accordion)
- ✅ "Training Video Library" (in Templates accordion)
- ✅ Same items in Highlights sidebar

---

### **Step 6: Test Dark Mode**

1. **Click the dark mode toggle** (top right)
   - ✅ Background changes to dark
   - ✅ Text changes to light
   - ✅ Buttons invert colors

2. **Refresh the page**
   - ✅ Dark mode should persist (saved to localStorage)

---

### **Step 7: Test with Your Google Sheet**

#### **Setup:**
1. Create a Google Sheet with these columns:
   ```
   Item Name | URL | Brand | Category | Tags | Highlight | Is New
   ```

2. Add test data:
   ```csv
   Item Name,URL,Brand,Category,Tags,Highlight,Is New
   Test Item,https://example.com,Facetune,Assets,Resources,Yes,Yes
   ```

3. Publish to CSV:
   - File → Share → Publish to web
   - Format: CSV
   - Copy the URL

4. Update `js/config.js`:
   ```javascript
   csvUrl: 'YOUR_GOOGLE_SHEETS_CSV_URL_HERE',
   ```

5. Refresh website

#### **What to Test:**
- ✅ Your test item appears in the Assets accordion
- ✅ "Facetune" filter button appears
- ✅ "Assets" filter button appears
- ✅ "Resources" filter button appears
- ✅ Clicking each button shows your item
- ✅ Item appears in Highlights sidebar (Highlight = Yes)
- ✅ Item has green "NEW" badge (Is New = Yes)

---

### **Step 8: Test Dynamic Additions**

#### **Add a New Brand:**
1. Add item to Google Sheet with `Brand: "New Brand"`
2. Refresh website
3. ✅ "New Brand" filter button should appear automatically

#### **Add a New Category:**
1. Add item with `Category: "Videos"`
2. Refresh website
3. ✅ "Videos" filter button appears
4. ✅ "Videos" accordion section appears in Index

#### **Add a New Tag:**
1. Add item with `Tags: "Training, Archives"`
2. Refresh website
3. ✅ "Training" and "Archives" filter buttons appear

---

## 🐛 Troubleshooting

### **Problem: No filter buttons appear**
- Check console for errors (F12 → Console)
- Verify `extractUniqueFilters` function is being called
- Check that items have Brand/Category/Tags data

### **Problem: Filtering doesn't work**
- Check that items have `data-categories` attribute
- Look in HTML inspector (F12 → Elements)
- Each item should have: `data-categories="Brand,Category,Tag1,Tag2"`

### **Problem: Accordion sections missing**
- Check that items have a `category` property
- Check console for "Found X categories:" message
- Verify `groupItemsByCategory` function is working

### **Problem: Google Sheet not loading**
- Check `js/config.js` has correct CSV URL
- Verify sheet is published (not just shared)
- Check console for "Loading data from Google Sheets..." message
- Clear cache: `clearCache()` in console, then refresh

---

## 📝 Success Criteria

Your system is working correctly if:

✅ Filter buttons appear in order: All → Brands → Categories → Tags (alphabetical)  
✅ Clicking filters shows matching items  
✅ Accordion sections are created from Categories  
✅ Items can belong to multiple filters (Brand + Category + Tags)  
✅ Adding new data to Google Sheet automatically creates new filters  
✅ No code changes needed to add new Brands/Categories/Tags  
✅ "NEW" badges appear correctly  
✅ Highlights sidebar shows correct items  
✅ Dark mode toggles and persists  

---

## 🎉 You're Done!

If all tests pass, your dynamic filter system is working perfectly!

Now you can manage your entire brand hub just by updating your Google Sheet. No more code changes! 🚀

