# 🚀 HOW TO USE IndiaBriefed - SIMPLE GUIDE

## ⚡ FASTEST WAY TO START

**Just double-click:** `start-all.bat`

This will automatically:
- ✅ Start backend server
- ✅ Start frontend server
- ✅ Open in 2 terminal windows

**Then visit:**
- **Website:** http://localhost:3000
- **Admin:** http://localhost:8000/admin

---

## 📝 STEP-BY-STEP GUIDE

### Step 1: Start Everything (30 seconds)

**Option A: Use Script (Easiest)**
- Double-click: `start-all.bat`
- Wait 5 seconds
- Done!

**Option B: Manual**
```bash
# Terminal 1
cd D:\indiabriefed\backend
php artisan serve

# Terminal 2
cd D:\indiabriefed\frontend
npm run dev
```

### Step 2: Create Your First Article (2 minutes)

1. **Go to Admin Panel**
   - URL: http://localhost:8000/admin
   - Login: admin@indiabriefed.com
   - Password: password123

2. **Create an Author**
   - Click "Authors" in sidebar
   - Click "Create" button
   - Name: Your Name
   - Click "Create"

3. **Create an Article**
   - Click "Articles" in sidebar
   - Click "Create" button
   - Fill in:
     - Title: "Your First Article"
     - Content: Write something
     - Category: Select "National"
     - Author: Select your author
     - Status: "Published"
   - Click "Create"

### Step 3: View on Website (10 seconds)

1. **Open Frontend**
   - Go to: http://localhost:3000
   - You'll see your article!

2. **Click the Article**
   - Read full content
   - See it looks professional!

---

## 🎯 DAILY WORKFLOW

### Morning: Create Content
1. Login to admin
2. Create 2-3 articles
3. Upload images
4. Publish

### Afternoon: Check Website
1. Visit frontend
2. See your articles
3. Test search
4. Browse categories

### Evening: Manage
1. Edit articles
2. Check statistics
3. Plan tomorrow's content

---

## 📱 WHAT YOU CAN DO

### On Admin Panel (http://localhost:8000/admin)
- ✅ Create articles
- ✅ Upload images
- ✅ Manage categories
- ✅ Add authors
- ✅ View statistics
- ✅ Edit content
- ✅ Delete articles
- ✅ Search articles
- ✅ Filter by category/status

### On Website (http://localhost:3000)
- ✅ Read articles
- ✅ Browse categories
- ✅ Search news
- ✅ View breaking news
- ✅ See featured articles
- ✅ Read related articles
- ✅ Share on social media

---

## 🎨 CUSTOMIZATION

### Change Colors
Edit: `frontend/components/Header.tsx`
Find: `#c62828` (red color)
Replace with your color

### Change Logo
Edit: `frontend/components/Header.tsx`
Replace "IndiaBriefed" text with your logo

### Change About Page
Edit: `frontend/app/about/page.tsx`
Update the content

### Change Footer
Edit: `frontend/components/Footer.tsx`
Update links and text

---

## 🔧 COMMON TASKS

### Add a New Category
1. Admin → Categories → Create
2. Name: "Technology"
3. Color: Pick a color
4. Save

### Upload Article Image
1. Admin → Articles → Create/Edit
2. Scroll to "Thumbnail"
3. Click "Choose file"
4. Select image
5. Save

### Mark Article as Featured
1. Admin → Articles → Edit
2. Toggle "Featured Article" ON
3. Save
4. It appears on homepage!

### Mark Article as Breaking
1. Admin → Articles → Edit
2. Toggle "Breaking News" ON
3. Save
4. It appears in red banner!

---

## 📊 UNDERSTANDING THE DASHBOARD

### Statistics Cards
- **Total Articles:** All articles in database
- **Published:** Live on website
- **Draft:** Not published yet
- **Categories:** Total categories (8 default)
- **Authors:** Total authors
- **Total Views:** All-time views

### Popular Articles Chart
- Shows top 10 most viewed articles
- Updates automatically

### Recent Articles Table
- Shows latest 5 articles
- Quick overview

---

## 🎯 TIPS & TRICKS

### For Better Articles
- ✅ Use clear titles
- ✅ Add good images
- ✅ Write short excerpts
- ✅ Use tags
- ✅ Fill SEO fields
- ✅ Set read time

### For Better SEO
- ✅ Fill meta title (60 chars)
- ✅ Fill meta description (160 chars)
- ✅ Use relevant tags
- ✅ Add good images
- ✅ Write quality content

### For More Views
- ✅ Mark important as "Featured"
- ✅ Use "Breaking" for urgent news
- ✅ Update regularly
- ✅ Share on social media

---

## 🚨 TROUBLESHOOTING

### Frontend Not Loading?
**Check:** Is backend running?
**Solution:** Start backend first

### No Articles Showing?
**Check:** Have you created articles?
**Solution:** Create articles in admin

### Images Not Loading?
**Check:** Did you upload images?
**Solution:** Upload images or use placeholders

### Can't Login to Admin?
**Check:** Did you run setup?
**Solution:** Run `admin-setup.bat`

---

## 📞 QUICK REFERENCE

### URLs
```
Frontend:  http://localhost:3000
Admin:     http://localhost:8000/admin
API:       http://localhost:8000/api/v1
```

### Login
```
Email:    admin@indiabriefed.com
Password: password123
```

### Start Commands
```bash
# Backend
cd D:\indiabriefed\backend
php artisan serve

# Frontend
cd D:\indiabriefed\frontend
npm run dev
```

---

## 🎉 YOU'RE READY!

**Everything is set up and working!**

**Just:**
1. Double-click `start-all.bat`
2. Login to admin
3. Create articles
4. View on website
5. Enjoy!

**That's it! 🚀**

---

**Need help?** Check these files:
- `README.md` - Main guide
- `ADMIN_PANEL_GUIDE.md` - Admin help
- `FRONTEND_COMPLETE.md` - Frontend help
- `COMPLETE_SUMMARY.md` - Full overview

**Happy Publishing! 📰**
