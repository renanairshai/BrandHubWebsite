# Google Sheets Setup Guide

## 📊 Sheet Structure

Your Google Sheet should have the following columns:

| Column | Type | Description | Dropdown Options | Creates Filter? | Creates Accordion? |
|--------|------|-------------|------------------|-----------------|-------------------|
| **Item Name** | Text | The name/title of the item | (free text) | ❌ No | ❌ No |
| **URL** | Text | The link when item is clicked | (free text) | ❌ No | ❌ No |
| **Brand** | Dropdown (single) | Which sub-brand this belongs to | Lightricks Brand, Facetune, LTX, Legacy Brands | ✅ Yes | ❌ No |
| **Category** | Dropdown (single) | What TYPE of asset (main filing system) | Presentations, Guidelines, Assets, Templates | ✅ Yes | ✅ YES |
| **Tags** | Text (multiple, comma-separated) | Additional keywords for filtering | Resources, Tools, Videos, Training, Logo Kits | ✅ Yes | ❌ No |
| **Highlight** | Dropdown | Display in Highlights section? | Yes, No | ❌ No | ❌ No |
| **Is New** | Dropdown | Show "New" badge? | Yes, No | ❌ No | ❌ No |

---

## 📝 Example Data

Here's what your sheet should look like:

| Item Name | URL | Brand | Category | Tags | Highlight | Is New |
|-----------|-----|-------|----------|------|-----------|--------|
| Brand Presentation 2024 | https://example.com/brand-deck | Lightricks Brand | Presentations | Resources | Yes | Yes |
| Facetune Logo Kit | https://example.com/logos | Facetune | Assets | Logo Kits, Resources | Yes | No |
| LTX Guidelines | https://example.com/ltx-guide | LTX | Guidelines | | No | No |
| Training Video | https://example.com/video | Lightricks Brand | Templates | Videos, Training | Yes | Yes |

---

## 🎯 How the Column System Works

### **Brand Column (Dropdown - Single Value):**
- **Purpose**: Which sub-brand does this asset belong to?
- **Options**: Lightricks Brand, Facetune, LTX, Legacy Brands
- **Rule**: Choose ONE brand per item
- **Creates**: Filter buttons in the "Brands" group
- **Example**: "Lightricks Brand"

### **Category Column (Dropdown - Single Value):**
- **Purpose**: What TYPE of asset is this? (Main filing system)
- **Options**: Presentations, Guidelines, Assets, Templates
- **Rule**: Choose ONE category per item
- **Creates**: BOTH filter buttons (Category group) AND accordion sections
- **Example**: "Presentations"
- **Important**: This is the main organization system - items are grouped by Category in the Index!

### **Tags Column (Text - Multiple Values OK):**
- **Purpose**: Additional keywords for flexible filtering
- **Options**: Any keywords (Resources, Tools, Videos, Training, Logo Kits, etc.)
- **Rule**: Can enter MULTIPLE, comma-separated
- **Creates**: Filter buttons in the "Tags" group
- **Example**: "Resources, Tools"
- **How it works**: Item appears when ANY matching filter is clicked

### **Highlight Dropdown:**
- **Purpose**: Should this item appear in the "Highlights" section?
- **Options**: Yes, No
- **Rule**: Select "Yes" for recent items OR frequently accessed items you want to feature

### **Is New Dropdown:**
- **Purpose**: Show the bright green "NEW" badge?
- **Options**: Yes, No
- **Rule**: Use for brand new items to draw attention

---

## 🎨 How Filter Buttons Are Generated

The website **automatically scans your Google Sheet** and creates filter buttons in this order:

### **1. Fixed Filter (Always First):**
- **"All"** - Always shows everything, always appears first

### **2. Brand Filters (Alphabetical):**
- Scans the "Brand" column for all unique values
- Creates a filter button for each unique brand
- Sorted alphabetically
- **Example**: Facetune, Legacy Brands, Lightricks Brand, LTX

### **3. Category Filters (Alphabetical):**
- Scans the "Category" column for all unique values
- Creates a filter button for each unique category
- Sorted alphabetically
- **Example**: Assets, Guidelines, Presentations, Templates

### **4. Tag Filters (Alphabetical):**
- Scans the "Tags" column for all unique values
- Creates a filter button for each unique tag
- Sorted alphabetically
- **Example**: Logo Kits, Resources, Tools, Training, Videos

### **Visual Example:**

If your sheet has the example data above, the filter buttons will appear like this:

```
[All] [Facetune] [Lightricks Brand] [LTX] [Assets] [Guidelines] [Presentations] [Templates] [Logo Kits] [Resources] [Training] [Videos]
 ↑         Brands (alphabetical)                Categories (alphabetical)                    Tags (alphabetical)
Fixed
```

**Key Point:** You don't need to update any code! Just add items to your Google Sheet with new Brands, Categories, or Tags, and the filter buttons appear automatically. ✨

---

## 🔧 Setting Up Dropdowns in Google Sheets

### Step 1: Create a "Settings" Sheet (Optional but Recommended)
Create a second sheet tab called "Settings" with your dropdown options listed:

```
Brand Options:
- Lightricks Brand
- Facetune
- LTX
- Legacy Brands

Category Options:
- Presentations
- Guidelines
- Assets
- Templates

Yes/No Options:
- Yes
- No
```

**Note:** Tags don't need a dropdown since they're free text (but you can create one if you want consistency).

### Step 2: Add Data Validation
1. Select the column (e.g., "Section" column)
2. **Data** → **Data validation**
3. **Criteria**: List from a range (e.g., `Settings!A2:A6` for Section options)
4. **On invalid data**: Reject input
5. **Show dropdown list**: Checked
6. Click **Save**

### Step 3: Repeat for All Dropdown Columns
- **Brand**: Validation with Brand options (single value only)
- **Category**: Validation with Category options (single value only)
- **Tags**: Optional - either free text or validation with Tag options (can be comma-separated)
- **Highlight**: Validation with Yes/No
- **Is New**: Validation with Yes/No

---

## 📤 Publishing Your Sheet as CSV

### Step 1: Publish to Web
1. **File** → **Share** → **Publish to web**
2. **Link**: Select "Entire Document" or specific sheet
3. **Format**: Choose **Comma-separated values (.csv)**
4. Click **Publish**
5. Copy the generated URL

### Step 2: Use the URL
The URL will look like:
```
https://docs.google.com/spreadsheets/d/e/[LONG_ID]/pub?output=csv
```

Paste this URL into your website's configuration file (we'll set this up next).

---

## ✅ Testing Your Sheet

Before connecting to the website:
1. Fill in at least 5-10 items
2. Test different combinations of Categories
3. Verify dropdowns only allow valid options
4. Check that URLs are complete (include https://)
5. Preview your published CSV to ensure it looks correct

---

## 🎨 Tips for Managing Content

### **Adding New Sections:**
If you need a new accordion section (e.g., "Training Materials"):
1. Add it to your Settings sheet
2. Update the Section dropdown validation
3. Update the website's category list (we'll show you where)

### **Adding New Filter Categories:**
If you need a new filter button (e.g., "Videos"):
1. Add it to your Settings sheet
2. Update the Categories dropdown validation
3. The website will automatically generate the filter button!

### **Updating Content:**
Simply edit the Google Sheet - changes appear on the website within seconds (after refresh).

---

## 🚨 Common Mistakes to Avoid

❌ **Wrong**: Typing "yes" (lowercase)  
✅ **Right**: Select "Yes" from dropdown

❌ **Wrong**: Multiple sections: "Presentations, Guidelines"  
✅ **Right**: ONE section: "Presentations"

❌ **Wrong**: Categories: "Presentations Guidelines" (space-separated)  
✅ **Right**: Categories: "Presentations, Guidelines" (comma-separated)

❌ **Wrong**: URL: "example.com"  
✅ **Right**: URL: "https://example.com"

---

## 🎓 Why This Structure?

**Dropdowns reduce errors**: No typos, no inconsistent capitalization, no invalid values.

**Flexible categories**: One item can appear in multiple filters (e.g., a presentation can be in both "Presentations" AND "Resources").

**Easy updates**: Change content in Google Sheets, refresh website - done!

**Scalable**: Add new sections and categories easily without coding.

---

Next step: We'll build the code that reads this sheet and generates your website dynamically! 🚀

