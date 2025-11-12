# Lightricks Brand Hub

A minimalist, Swiss-design-inspired web repository for Lightricks brand materials and documentation. This hub provides company-wide access to brand assets through an organized directory of links to Google Drive, Figma, and other resources. **The website is a link directory** - it doesn't host files, but rather provides easy, filterable access to assets stored in their original locations.

---

## 📋 Project Overview

The Lightricks Brand Hub is a dynamic, filterable repository that allows teams across the company to easily access brand materials. **Each item in the hub is a clickable link** that opens external resources (Google Drive files/folders, Figma files, etc.) - the website itself doesn't host any files, making it lightweight and easy to maintain.

The website features:

- **Link-Based Repository**: Every item is a link to external resources (Google Drive, Figma, etc.)
- **No File Hosting**: The website is purely a directory/index - all assets remain in their original locations
- **Fully Dynamic System**: Filter buttons and accordion sections auto-generate from Google Sheet data
- **Smart Filtering**: Filter by brands, categories, and tags - items can appear in multiple filters
- **Easy Access Sidebar**: Showcase frequently requested or newly added materials
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Section titles appear when layout stacks (tablet/mobile)
- **Professional Branding**: Lightricks favicon appears in browser tabs
- **Request System**: Direct link to request form for brand team

---

## 🎨 Design Principles

### Visual Style
- **Inspiration**: Swiss design - minimalist, clean, functional
- **Typography**: 
  - Primary: Aeonik (custom font, server-hosted)
  - Fallback: Inter (Google Fonts - loads if Aeonik unavailable)
  - Code/Monospace: JetBrains Mono (Google Fonts)
- **Color Palette**:
  - Light Mode Background: `#FCFAFA` (soft white)
  - Light Mode Text: `#000000` (black)
  - Button Style: `#FCFAFA` background with 1px black border, rounded corners
  - Hover State: Inverted colors (black background, white text)

### Layout Structure
- **Main Content**: 2/3 width - Repository/Index of all assets
- **Sidebar**: 1/3 width - "Highlights" / "Easy Access"
- **Top Navigation**: Filter pills and action buttons (Dark Mode toggle, Request Form)

---

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Future Consideration**: Potential migration to React
- **Data Source**: Google Sheets / CSV files
- **Content Type**: External links only (no file hosting)
- **Asset Storage**: Google Drive, Figma, and other external platforms

### How It Works
The Brand Hub is a **link directory**, not a file repository. When users click on an item:
1. The click opens the URL stored in your Google Sheet
2. Users are taken directly to Google Drive, Figma, or wherever the asset lives
3. This keeps the website fast, lightweight, and easy to maintain
4. Assets can be updated in their original locations without touching the website

### Project Structure
```
BrandHubWebsite/
├── README.md                 # This file - project documentation
├── GOOGLE_SHEETS_SETUP.md   # Complete Google Sheets setup guide
├── TESTING_GUIDE.md         # Step-by-step testing instructions
├── index.html               # Main HTML structure
├── favicon.svg              # Lightricks logo favicon
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── themes.css          # Light/Dark mode themes
│   └── fonts.css           # Font declarations
├── js/
│   ├── config.js           # Configuration (Google Sheets URL)
│   ├── main.js             # Core functionality
│   ├── dataLoader.js       # Google Sheets/CSV integration & data parsing
│   ├── renderer.js         # Dynamic UI generation
│   ├── filters.js          # Category and tag filtering logic
│   └── darkMode.js         # Theme toggle functionality
├── fonts/
│   └── aeonik/             # Aeonik font files
├── data/
│   └── sample-data.csv     # Sample data structure
└── assets/
    └── icons/              # UI icons (if needed)
```

---

## 📊 Data Structure

### Google Sheet / CSV Format

The content is managed through a Google Sheet with the following columns. **The system is fully dynamic** - filter buttons and accordion sections are automatically generated from your data!

| Column | Description | Creates Filter? | Creates Accordion? | Example |
|--------|-------------|-----------------|-------------------|---------|
| `Item Name` | Asset/Item name (clickable text shown to users) | ❌ No | ❌ No | "Main Brand Presentation Template" |
| `URL` | **URL to external asset** (Google Drive, Figma, etc.) | ❌ No | ❌ No | "https://drive.google.com/file/d/..." |
| `Brand` | Sub-brand (single value) | ✅ Yes | ❌ No | "Lightricks Brand", "Facetune", "LTX" |
| `Category` | Type of asset (single value) | ✅ Yes | ✅ YES | "Presentations", "Assets", "Guidelines" |
| `Tags` | Additional keywords (comma-separated) | ✅ Yes | ❌ No | "Resources, Tools, Logo Kits" |
| `Highlight` | Show in Highlights sidebar? | ❌ No | ❌ No | "Yes" or "No" |
| `Is New` | **Automatically adds green "NEW" badge** | ❌ No | ❌ No | "Yes" or "No" |

### 🎯 The 3-Tier System Explained

This structure creates a smart, hierarchical organization:

1. **Brand** - Which sub-brand does this belong to?
   - Examples: Lightricks Brand, Facetune, LTX, Legacy Brands
   - Creates filter buttons automatically

2. **Category** - What TYPE of asset is this? (Main filing system)
   - Examples: Presentations, Assets, Guidelines, Templates
   - Creates BOTH filter buttons AND accordion sections
   - This is the primary organization structure

3. **Tags** - Additional keywords for flexible cross-filtering
   - Examples: Resources, Tools, Videos, Training, Logo Kits
   - Creates filter buttons automatically
   - Can have multiple per item (comma-separated)

**The Magic**: Add a new Brand, Category, or Tag to your Google Sheet → Filter buttons automatically appear! No code changes needed.

### Supported Link Types
Each item can link to:
- **Google Drive Files**: Individual presentations, PDFs, images
- **Google Drive Folders**: Collections of related assets
- **Figma Files**: Design files, logo kits, brand guidelines
- **Any URL**: Documentation sites, shared drives, etc.

**Example Data Rows**:
```csv
Item Name,URL,Brand,Category,Tags,Highlight,Is New
Main Brand Presentation,https://drive.google.com/file/d/example1,Lightricks Brand,Presentations,Resources,Yes,No
Q4 Board Deck,https://drive.google.com/file/d/example2,Lightricks Brand,Presentations,"Resources, Tools",Yes,Yes
Facetune Logo Kit,https://drive.google.com/file/d/example3,Facetune,Assets,"Logo Kits, Resources",Yes,No
LTX Guidelines,https://drive.google.com/file/d/example4,LTX,Guidelines,,No,No
Training Video,https://drive.google.com/file/d/example5,Lightricks Brand,Templates,"Videos, Training",Yes,Yes
```

**What Happens Automatically**:

1. **Filter Buttons Created** (in this order):
   ```
   [All] [Facetune] [Lightricks Brand] [LTX] [Assets] [Guidelines] [Presentations] [Templates] [Logo Kits] [Resources] [Tools] [Training] [Videos]
    ↑         Brands (alphabetical)            Categories (alphabetical)                    Tags (alphabetical)
   Fixed
   ```

2. **Accordion Sections Created** (from Categories):
   - 📁 Assets → Facetune Logo Kit
   - 📁 Guidelines → LTX Guidelines
   - 📁 Presentations → Main Brand Presentation, Q4 Board Deck
   - 📁 Templates → Training Video

3. **Filtering Examples**:
   - Click "Facetune" → Shows Facetune Logo Kit
   - Click "Presentations" → Shows Main Brand Presentation + Q4 Board Deck
   - Click "Resources" → Shows items with "Resources" tag (first 3 items)
   - Click "ALL" → Shows all items organized in accordion sections

4. **Visual Badges**:
   - Q4 Board Deck shows with green "NEW" badge (Is New = Yes)
   - Training Video shows with green "NEW" badge (Is New = Yes)

---

## 🎯 Key Features

### 1. Dynamic Filtering System
- **Filter Categories**: Each item can belong to multiple categories (e.g., "Lightricks Brand, Presentations")
- **Smart Display**: When a filter is selected, the Index section is replaced with a focused view showing only matching items
- **Unified Layout**: Filtered results appear in the same clean, open-accordion style as the Index
- **Filter Options**:
  - ALL: Shows complete Index with all accordion categories
  - Lightricks Brand, LTX, Facetune: Filter by sub-brand
  - Presentations, Logo Kits, Guidelines: Filter by media type
  - Legacy brands: Historical brand materials
- **Visual Feedback**: Active filter button is highlighted
- **Highlights Section**: Automatically hidden when filtering to focus on results

### 2. Accordion Navigation
- Expandable/collapsible category sections
- Smooth animations
- Shows all items as clickable links when expanded
- Each link opens the asset in a new tab (Google Drive, Figma, etc.)
- Clean, organized presentation

### 3. Easy Access Section (Highlights)
- **Display Name:** "Easy Access" (internal code name: "Highlights")
- Curated sidebar of featured items (also clickable links)
- Automatically displays items marked with "Highlight = Yes" in the Google Sheet
- Quick access to most frequently requested assets OR newly added items
- Can feature items with or without the "NEW" badge
- Easy to update priority items
- **Responsive:** Section title appears when layout stacks (tablet/mobile)

### 4. Automatic "New" Badge
- Set `isNew` to "TRUE" in the CSV/Google Sheet
- Website automatically displays a bright lime green "NEW" badge
- Works in both Index accordion sections and Highlights sidebar
- No manual HTML editing required - just update the spreadsheet!

### 5. Dark Mode Toggle
- One-click theme switching
- Smooth color transitions
- Persists user preference (localStorage)
- Inverted color scheme

### 6. Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive layout for different screen sizes
- Touch-friendly interaction

---

## 🚀 Getting Started

### Prerequisites
- Web server (local or hosted)
- Google Account (for Google Sheets integration)
- Aeonik font files

### Setup Instructions

1. **Clone or download the project files**
   ```bash
   # Navigate to your project directory
   cd /path/to/BrandHubWebsite
   ```

2. **Set up your Google Sheet**
   - Create a new Google Sheet with the column structure above
   - Populate with your brand assets
   - Publish to web as CSV (File → Share → Publish to web → CSV)
   - Copy the published CSV URL

3. **Configure the data source**
   - Open `js/dataLoader.js`
   - Replace the placeholder URL with your Google Sheet CSV URL
   - Save the file

4. **Install fonts**
   - Place Aeonik font files in `fonts/aeonik/` directory
   - Inter and JetBrains Mono load automatically from Google Fonts
   - Note: If Aeonik isn't available, Inter will automatically be used as fallback

5. **Run a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js
   npx serve
   ```

6. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Test filtering, dark mode, and links

---

## 🔧 Customization

### Adding New Categories
1. Add items with new category names to your Google Sheet
2. The system automatically detects and creates filter buttons
3. No code changes needed!

### Styling Adjustments
- Colors: Edit `css/themes.css`
- Typography: Edit `css/fonts.css`
- Layout: Edit `css/styles.css`
- Button styles: Look for `.filter-button` and `.action-button` classes

### Changing Fonts
- Update font declarations in `css/fonts.css`
- Replace font files in `fonts/` directory
- Update font-family values in CSS

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (not officially supported)

---

## 🎓 For Non-Developers

This project is designed to be easy to maintain without deep coding knowledge:

### To Add a New Asset/Link:
1. Upload or locate your file in Google Drive, Figma, etc.
2. Copy the shareable link (make sure it's accessible to your team)
3. Open your Google Sheet
4. Add a new row with these columns:
   - **Item Name**: What users will see (e.g., "Q4 Brand Presentation")
   - **URL**: The link you copied
   - **Brand**: Sub-brand (e.g., "Lightricks Brand", "Facetune", "LTX")
   - **Category**: Type of asset (e.g., "Presentations", "Assets", "Guidelines")
   - **Tags**: Additional keywords, comma-separated (e.g., "Resources, Tools")
   - **Highlight**: "Yes" to show in Easy Access sidebar, or "No"
   - **Is New**: "Yes" to display the green "NEW" badge, or "No"
5. **IMPORTANT:** After editing, go to **File → Share → Publish to web → Republish**
6. Wait 20 seconds, then refresh your website to see changes

**Pro Tip**: Set both `Highlight = Yes` and `Is New = Yes` for maximum visibility of new assets!

### To Update or Remove Items:
1. Open your Google Sheet
2. Edit or delete rows as needed
3. **Republish:** File → Share → Publish to web → Republish
4. Wait 20 seconds, then refresh website to see changes

**Note:** Google Sheets published data updates every ~5 minutes automatically, but republishing makes changes appear instantly!

### To Change Categories:
- Just use new category names in your Google Sheet
- The filter buttons update automatically

### To Feature an Item in "Easy Access" Sidebar:
- Set the `Highlight` column to `Yes` in your Google Sheet

### To Mark Something as New:
- Set the `Is New` column to `Yes` in your Google Sheet
- The green "NEW" badge will appear automatically

### Important Notes:
- **Every item must have a valid link** - without it, users can't access the asset
- Make sure links are accessible to everyone who needs them (check sharing settings)
- Test links periodically to ensure they still work

---

## 🛠️ Maintenance

### Regular Tasks
- Review and update featured items monthly
- Remove "New" badges from items older than 30 days
- **Check for broken links quarterly** - test that all URLs still work
- Verify Google Drive/Figma sharing permissions remain correct
- Update brand assets in their original locations (Drive/Figma)
- Archive outdated items by removing them from the Google Sheet

### Performance
- CSV file should stay under 1000 rows for optimal performance
- Consider archiving old/unused items (move to a separate "Archive" sheet)
- Keep asset links valid and accessible
- Since the website only hosts links (not files), it stays fast and lightweight

---

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Migration to React for better performance
- [ ] Image/thumbnail previews for linked assets
- [ ] Search functionality across titles and tags
- [ ] User favorites/bookmarks
- [ ] Analytics tracking (most clicked links)
- [ ] Link validation checker (automatically detect broken links)
- [ ] User comments/feedback on assets
- [ ] Version history tracking for materials
- [ ] Direct file hosting (would require major architecture change from current link-based system)

---

## 📞 Support

For questions, requests, or issues:
- Use the **Request Form** button on the website
- Contact the Brand Team directly
- Submit issues through your internal ticketing system

---

## 📄 License

Internal use only - Lightricks Company

---

## 👥 Credits

**Design & Development**: [Your Name]  
**Brand Team**: Lightricks  
**Last Updated**: November 10, 2025

---

## 📝 Notes

- This is a living document - update as the project evolves
- Keep this README in sync with actual implementation
- Document any customizations made for your specific needs
- Share learnings with the team!


