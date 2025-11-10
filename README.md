# Lightricks Brand Hub

A minimalist, Swiss-design-inspired web repository for Lightricks brand materials and documentation. This hub provides company-wide access to brand assets through an organized directory of links to Google Drive, Figma, and other resources. **The website is a link directory** - it doesn't host files, but rather provides easy, filterable access to assets stored in their original locations.

---

## 📋 Project Overview

The Lightricks Brand Hub is a dynamic, filterable repository that allows teams across the company to easily access brand materials. **Each item in the hub is a clickable link** that opens external resources (Google Drive files/folders, Figma files, etc.) - the website itself doesn't host any files, making it lightweight and easy to maintain.

The website features:

- **Link-Based Repository**: Every item is a link to external resources (Google Drive, Figma, etc.)
- **No File Hosting**: The website is purely a directory/index - all assets remain in their original locations
- **Dynamic Content Management**: All items and categories are managed through Google Sheets/CSV files
- **Smart Filtering**: Filter assets by sub-brands and media types
- **What's New Section**: Highlight frequently requested or newly added materials
- **Dark Mode**: Toggle between light and dark themes
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
- **Sidebar**: 1/3 width - "What's New" / "Easy Access"
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
├── index.html                # Main HTML structure
├── css/
│   ├── styles.css           # Main stylesheet
│   ├── themes.css           # Light/Dark mode themes
│   └── fonts.css            # Font declarations
├── js/
│   ├── main.js              # Core functionality
│   ├── dataLoader.js        # Google Sheets/CSV integration
│   ├── filters.js           # Category and tag filtering logic
│   └── darkMode.js          # Theme toggle functionality
├── fonts/
│   └── aeonik/              # Aeonik font files
├── data/
│   └── sample-data.csv      # Sample data structure
└── assets/
    └── icons/               # UI icons (if needed)
```

---

## 📊 Data Structure

### Google Sheet / CSV Format

The content is managed through a Google Sheet with the following columns. **The `link` column is crucial** - it contains the URL that opens when users click the item.

| Column | Description | Example |
|--------|-------------|---------|
| `title` | Asset/Item name (clickable text shown to users) | "Main Brand Presentation Template" |
| `category` | Main category | "Presentations" |
| `subcategory` | Sub-brand or type | "Lightricks Brand" |
| `tags` | Comma-separated tags for filtering | "Presentations, Lightricks Brand, Template" |
| `link` | **URL to external asset** (Google Drive, Figma, etc.) | "https://drive.google.com/file/d/..." or "https://figma.com/file/..." |
| `isNew` | **Automatically adds green "NEW" badge** | "TRUE" or "FALSE" |
| `isFeatured` | Show in "What's New" sidebar | "TRUE" or "FALSE" |
| `dateAdded` | Date added | "2025-11-10" |

### Supported Link Types
Each item can link to:
- **Google Drive Files**: Individual presentations, PDFs, images
- **Google Drive Folders**: Collections of related assets
- **Figma Files**: Design files, logo kits, brand guidelines
- **Any URL**: Documentation sites, shared drives, etc.

**Example Data Rows**:
```csv
title,category,subcategory,tags,link,isNew,isFeatured,dateAdded
Main Brand Presentation,Presentations,Lightricks,"Presentations,Lightricks",https://drive.google.com/file/d/example1,FALSE,TRUE,2025-11-10
New Q4 Board Deck,Presentations,Lightricks,"Presentations,Board",https://drive.google.com/file/d/example2,TRUE,TRUE,2025-11-08
```

**Visual Result**: The second item will display with a green "NEW" badge next to its title automatically!

---

## 🎯 Key Features

### 1. Dynamic Filtering System
- Filter by sub-brands: Lightricks Brand, LTX, Facetune, etc.
- Filter by media type: Presentations, Logo Kits, Guidelines, etc.
- Combination filtering: Show only "Presentations" for "Facetune"
- "ALL" button to reset filters

### 2. Accordion Navigation
- Expandable/collapsible category sections
- Smooth animations
- Shows all items as clickable links when expanded
- Each link opens the asset in a new tab (Google Drive, Figma, etc.)
- Clean, organized presentation

### 3. What's New Section
- Curated list of featured items (also clickable links)
- Automatically displays items marked as "Featured" in the CSV
- Quick access to most frequently requested assets
- Easy to update priority items

### 4. Automatic "New" Badge
- Set `isNew` to "TRUE" in the CSV/Google Sheet
- Website automatically displays a bright lime green "NEW" badge
- Works in both Index and What's New sections
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
4. Add a new row with:
   - **title**: What users will see (e.g., "Q4 Brand Presentation")
   - **category**: Type of asset (e.g., "Presentations")
   - **subcategory**: Sub-brand or type (e.g., "Lightricks Brand")
   - **tags**: Comma-separated for filtering (e.g., "Presentations,Lightricks Brand")
   - **link**: The URL you copied
   - **isNew**: Set to "TRUE" to display the green "NEW" badge (or "FALSE" if not new)
   - **isFeatured**: Set to "TRUE" to show in "What's New" sidebar (or "FALSE")
   - **dateAdded**: Date in YYYY-MM-DD format (e.g., "2025-11-10")
5. Save - the website updates automatically (refresh to see changes)

**Pro Tip**: Set both `isNew` and `isFeatured` to "TRUE" for maximum visibility of new assets!

### To Update or Remove Items:
1. Open your Google Sheet
2. Edit or delete rows as needed
3. The website updates automatically (may need page refresh)

### To Change Categories:
- Just use new category names in your Google Sheet
- The filter buttons update automatically

### To Feature an Item in "What's New":
- Set the `isFeatured` column to `TRUE` in your Google Sheet

### To Mark Something as New:
- Set the `isNew` column to `TRUE` in your Google Sheet

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


