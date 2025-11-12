# How It Works - Simple Guide for Everyone 🎯

**Welcome to the Lightricks Brand Hub!** This guide explains everything in simple terms - no tech knowledge needed.

---

## 🤔 What Is This Website?

The Brand Hub is like a **smart directory** for all our brand materials. Think of it as:
- 📁 A filing cabinet for brand assets
- 🔗 Every item is a link to files in Google Drive, Figma, etc.
- 🎯 Easy to filter and find what you need
- ✨ Updates automatically when you edit a Google Sheet

**The magic:** You don't need to touch code or know how to build websites. Just edit a Google Sheet!

---

## 📊 How It Works (The Big Picture)

```
┌─────────────────┐
│  GOOGLE SHEET   │  ← You edit this (easy!)
│  (Our Content)  │
└────────┬────────┘
         │
         │ The website reads from here
         ↓
┌─────────────────┐
│   THE WEBSITE   │  ← Everyone sees this
│ (Brand Hub)     │
└─────────────────┘
```

**Simple version:**
1. You add items to a Google Sheet
2. The website reads that sheet
3. Items appear on the website automatically
4. No coding needed!

---

## 📝 What You Can Update (Without Code)

**✅ Things You Can Change by Editing the Google Sheet:**

- ✅ Add new assets (presentations, logos, guidelines, etc.)
- ✅ Remove old/outdated items
- ✅ Change what appears in the sidebar
- ✅ Add "NEW" badges to items
- ✅ Organize items by brand (Lightricks, Facetune, LTX)
- ✅ Organize items by category (Presentations, Assets, etc.)
- ✅ Add tags for filtering (Resources, Tools, Videos, etc.)
- ✅ Update links if files move
- ✅ Feature important items in the sidebar

**❌ Things You CAN'T Change (Need Developer):**

- ❌ Colors, fonts, design
- ❌ Layout or structure
- ❌ Adding new features
- ❌ Changing how things work

---

## 🚀 How to Add or Update Content

### **Step 1: Open the Google Sheet**

Ask your team lead for access to the Brand Hub Google Sheet.

You'll see columns like this:

| Item Name | URL | Brand | Category | Tags | Highlight | Is New |
|-----------|-----|-------|----------|------|-----------|--------|
| Brand Deck 2024 | https://... | Lightricks Brand | Presentations | Resources | Yes | Yes |

---

### **Step 2: Add Your Content**

**To add a new item, create a new row with:**

**Column A - Item Name:**
- What people will see on the website
- Example: "Q1 Brand Presentation 2025"

**Column B - URL:**
- The link to your file (Google Drive, Figma, etc.)
- Make sure it's a shareable link!
- Example: "https://drive.google.com/file/d/..."

**Column C - Brand:**
- Which sub-brand is this for?
- Pick one: Lightricks Brand, Facetune, LTX, or Legacy Brands
- Example: "Lightricks Brand"

**Column D - Category:**
- What type of asset is this?
- Pick one: Presentations, Assets, Guidelines, or Templates
- Example: "Presentations"

**Column E - Tags:**
- Extra keywords to help people find this
- You can use multiple, separated by commas
- Examples: "Resources, Tools" or "Logo Kits, Design"

**Column F - Highlight:**
- Should this appear in the sidebar for easy access?
- Type: "Yes" or "No"
- Use "Yes" for frequently requested items

**Column G - Is New:**
- Should this have a green "NEW" badge?
- Type: "Yes" or "No"
- Use "Yes" for recently added items

---

### **Step 3: IMPORTANT - Republish the Sheet! 🔄**

**This is the most important step!** Changes won't appear until you do this:

1. Click **File** (top left)
2. Click **Share**
3. Click **Publish to web**
4. Click the **"Republish"** button
5. Wait 20 seconds
6. Refresh the website

**Why?** Google Sheets has two versions:
- Your editable sheet (what you see)
- The public version (what the website reads)

Republishing updates the public version!

---

### **Step 4: Check the Website**

1. Open the Brand Hub website
2. Refresh the page (press Cmd+R on Mac or Ctrl+R on Windows)
3. Look for your new item!

**Not seeing it?**
- Did you republish? (Step 3)
- Wait 1-2 minutes and refresh again
- Check if there are any typos in your row

---

## 🎯 Common Tasks

### **Task: Add a NEW Badge**

1. Find the item in Google Sheet
2. Change "Is New" column to "Yes"
3. Republish (File → Share → Publish to web → Republish)
4. Refresh website

**Result:** Green "NEW" badge appears next to the item! ✨

---

### **Task: Feature Something in the Sidebar**

The sidebar is called "Easy Access" and shows important items.

1. Find the item in Google Sheet
2. Change "Highlight" column to "Yes"
3. Republish
4. Refresh website

**Result:** Item appears in the sidebar on the right! 📌

---

### **Task: Add Multiple Tags**

Tags help people find items in different ways.

1. In the "Tags" column, type tags separated by commas
2. Example: "Resources, Tools, Videos"
3. Republish
4. Refresh website

**Result:** Item appears when clicking ANY of those tag filters! 🏷️

---

### **Task: Update a Link**

If a file moves to a new location:

1. Find the item in Google Sheet
2. Update the "URL" column with the new link
3. Republish
4. Refresh website

**Result:** Item now opens the new location! 🔗

---

### **Task: Remove an Item**

1. Find the item in Google Sheet
2. Delete the entire row
3. Republish
4. Refresh website

**Result:** Item disappears from the website! 🗑️

---

## 🤓 Understanding the Columns

### **Brand Column:**
- **What it does:** Creates filter buttons for each brand
- **Example:** If you put "Facetune", a [Facetune] button appears
- **Tip:** Keep brand names consistent (don't mix "Facetune" and "Facetun")

### **Category Column:**
- **What it does:** Creates the big accordion sections
- **Example:** "Presentations" creates a "Presentations" section
- **Tip:** This is the main way items are organized!

### **Tags Column:**
- **What it does:** Creates extra filter buttons
- **Example:** "Resources, Tools" creates [Resources] and [Tools] buttons
- **Tip:** Use for cross-category organization (videos, training, etc.)

---

## 🔍 How Filtering Works

**Imagine this item:**
```
Item: Brand Deck
Brand: Lightricks Brand
Category: Presentations
Tags: Resources, Tools
```

**This item will appear when someone clicks:**
- [Lightricks Brand] button ✓
- [Presentations] button ✓
- [Resources] button ✓
- [Tools] button ✓

**One item can appear in multiple filter views!** This is the power of tags. 🎯

---

## ⏰ How Long Do Changes Take?

### **If You Republish:**
- ⚡ 20-30 seconds usually
- Refresh the website and you'll see changes

### **If You DON'T Republish:**
- ⏱️ About 5 minutes
- Google auto-syncs eventually
- But it's faster to just republish!

**Pro tip:** Always republish for instant updates! 🚀

---

## ❓ Troubleshooting

### **Problem: "My changes aren't showing up"**

**Check these things:**
1. ✅ Did you republish the sheet?
2. ✅ Did you wait 20-30 seconds after republishing?
3. ✅ Did you refresh the website page?
4. ✅ Are you looking at the right website URL?

**Still not working?** Wait 5 minutes (auto-sync time) and try again.

---

### **Problem: "The NEW badge isn't showing"**

**Check:**
- ✅ Is "Is New" column set to "Yes" (not "yes" or "YES")?
- ✅ Did you republish?
- ✅ Check for typos in the column

---

### **Problem: "Item isn't in the sidebar"**

**Check:**
- ✅ Is "Highlight" column set to "Yes"?
- ✅ Did you republish?
- ✅ The sidebar is on the right side (or below on mobile)

---

### **Problem: "I made a mistake, how do I undo?"**

**Google Sheets has version history!**

1. Click **File** → **Version history** → **See version history**
2. Browse previous versions
3. Click **Restore** to go back

---

## 🎓 Best Practices

### **DO:**
- ✅ **Always republish** after making changes
- ✅ **Use consistent naming** (pick "Lightricks Brand" and stick with it)
- ✅ **Test links** before adding them (make sure they're shareable)
- ✅ **Use descriptive names** (not "deck.pdf" but "Q1 Brand Deck 2025")
- ✅ **Remove old NEW badges** (after 30 days, change "Yes" to "No")
- ✅ **Update the Highlight column** to rotate featured items

### **DON'T:**
- ❌ **Don't mix naming** (don't use "Facetune" and "Facetun")
- ❌ **Don't use private links** (make sure others can access)
- ❌ **Don't delete columns** (the website needs all of them)
- ❌ **Don't rename columns** (keep "Item Name", "URL", etc.)
- ❌ **Don't skip republishing!** (your changes won't appear)

---

## 📱 What About Mobile?

**The website works on phones and tablets!**
- Everything adjusts automatically
- Sections stack vertically
- All filters and items work the same way
- No special setup needed

---

## 🔐 Who Can Edit?

**Anyone with "Edit" access to the Google Sheet can:**
- Add/remove items
- Change content
- Republish the sheet
- Affect what appears on the website

**Google Sheet "Viewers" can only:**
- Look at the sheet
- Can't make changes
- Can't affect the website

**Ask your team lead for Edit access if you need it!**

---

## 🎉 Summary - The Quick Version

**To update content:**

```
1. Edit Google Sheet (add/change rows)
   ↓
2. File → Share → Publish to web → Republish
   ↓
3. Wait 20 seconds
   ↓
4. Refresh website
   ↓
5. Done! Changes appear! ✨
```

**That's it! No code, no developers, no complexity.**

---

## 📞 Need Help?

**If something isn't working:**
1. Check this guide again (especially the republishing step!)
2. Wait 5 minutes (for auto-sync)
3. Ask your team lead
4. Contact the web team

---

## 💡 Remember:

- 📝 **You control the content** (via Google Sheet)
- 🤖 **The website updates automatically** (no coding needed)
- 🔄 **Always republish** (for instant changes)
- ✨ **It's that simple!** (really!)

**You've got this!** 🎊

---

**Last Updated:** November 2025

