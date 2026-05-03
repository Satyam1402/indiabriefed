# 🚀 AUTOMATION QUICK SETUP - 5 MINUTES

## ✅ WHAT YOU HAVE

A **fully automated AI-powered news platform** that:
- Fetches news automatically
- Processes with AI
- Creates articles
- Publishes everything
- **ZERO manual work!**

---

## 🎯 SETUP IN 3 STEPS

### STEP 1: Get FREE API Keys (3 minutes)

#### A. NewsAPI Key
1. Visit: https://newsapi.org/register
2. Enter email
3. Get API key from email
4. Copy it

#### B. Google Gemini Key
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### STEP 2: Add Keys to .env (1 minute)

Open: `D:\indiabriefed\backend\.env`

Find and update:
```env
NEWS_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

**Paste your actual keys!**

### STEP 3: Test It! (1 minute)

```bash
cd D:\indiabriefed\backend
php artisan news:fetch
```

**Watch the magic:**
- Fetches news
- Processes with AI
- Creates articles
- Shows summary

---

## ✅ DONE!

Your platform is now **fully automated**!

### What Happens Now:

**Every 6 Hours Automatically:**
1. Fetches 25 articles from NewsAPI
2. Fetches articles from RSS feeds
3. Processes each with AI
4. Creates articles in database
5. Downloads images
6. Publishes everything

**Result:** 80-100 new articles per day, automatically!

---

## 🎯 ENABLE AUTO-SCHEDULING

### Option 1: Windows Task Scheduler (Recommended)

1. Open Task Scheduler
2. Create Basic Task
3. Name: "IndiaBriefed Automation"
4. Trigger: Daily
5. Action: Start program
   - Program: `D:\xampp\php\php.exe`
   - Arguments: `D:\indiabriefed\backend\artisan schedule:run`
6. Advanced: Repeat every 1 hour
7. Save

### Option 2: Keep Terminal Open

```bash
cd D:\indiabriefed\backend
php artisan schedule:work
```

---

## 📊 CHECK IT'S WORKING

### View New Articles:

**Admin Panel:**
- Go to: http://localhost:8000/admin
- Click "Articles"
- See new articles!

**Frontend:**
- Go to: http://localhost:3000
- See fresh news!

### Manual Run Anytime:

```bash
php artisan news:fetch
```

---

## 🎉 SUCCESS!

Your platform is **100% automated**!

**Features:**
- ✅ Auto news fetching
- ✅ AI processing
- ✅ Auto publishing
- ✅ Image downloads
- ✅ SEO optimization
- ✅ Smart categorization
- ✅ Duplicate prevention

**Cost:** $0 (100% FREE)
**Manual Work:** ZERO
**Fresh Content:** Every 6 hours

---

## 📚 FULL DOCUMENTATION

Read: `AUTOMATION_COMPLETE.md` for:
- Detailed explanation
- Customization options
- Troubleshooting
- Advanced features

---

## 🚀 YOU'RE DONE!

Just add API keys and run `php artisan news:fetch`

**Enjoy your automated news platform! 🎊**
