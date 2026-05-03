# ✅ Vercel Deployment - Quick Start Checklist

## 🎯 Deploy Your IndiaBriefed Site in 30 Minutes (FREE!)

---

## 📋 Before You Start

Create accounts (all FREE):
- [ ] GitHub: https://github.com
- [ ] Vercel: https://vercel.com
- [ ] Railway: https://railway.app
- [ ] PlanetScale: https://planetscale.com

---

## 🚀 Deployment Steps

### ☑️ STEP 1: GitHub (5 minutes)

- [ ] Create GitHub account
- [ ] Create new repository: `indiabriefed`
- [ ] Upload your code:
  ```bash
  cd D:\indiabriefed
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/indiabriefed.git
  git push -u origin main
  ```

**✅ Done when:** Code visible on GitHub

---

### ☑️ STEP 2: PlanetScale Database (5 minutes)

- [ ] Sign up at planetscale.com
- [ ] Create database: `indiabriefed`
- [ ] Choose region: Closest to you
- [ ] Plan: **Hobby (FREE)**
- [ ] Click **Connect** → **Laravel**
- [ ] Copy connection details:
  ```
  DB_HOST=aws.connect.psdb.cloud
  DB_DATABASE=indiabriefed
  DB_USERNAME=xxxxxxxxxx
  DB_PASSWORD=pscale_pw_xxxxxxxxxx
  ```
- [ ] **Save these credentials!**

**✅ Done when:** Database created and credentials saved

---

### ☑️ STEP 3: Railway Backend (10 minutes)

- [ ] Sign up at railway.app with GitHub
- [ ] Click **New Project** → **Deploy from GitHub**
- [ ] Select `indiabriefed` repository
- [ ] Select `backend` folder
- [ ] Click **Variables** and add:

```env
APP_NAME=IndiaBriefed
APP_ENV=production
APP_KEY=base64:/IHyrrhcHWDa+XreMbeo1oNMLrM/aDDhGeNQI8lwO4Q=
APP_DEBUG=false
APP_URL=https://your-backend.railway.app

DB_CONNECTION=mysql
DB_HOST=aws.connect.psdb.cloud
DB_PORT=3306
DB_DATABASE=indiabriefed
DB_USERNAME=your_planetscale_username
DB_PASSWORD=your_planetscale_password
DB_SSLMODE=require

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

FRONTEND_URL=https://your-site.vercel.app

NEWS_API_KEY=b7d8646df06d457d87745d9e313f2e0e
GEMINI_API_KEY=AIzaSyCiZ1IY-AKXsAtC2WEr_i6qH4hYRY0iHNg
```

- [ ] Click **Deploy**
- [ ] Wait 3-5 minutes
- [ ] Copy your Railway URL (e.g., `https://indiabriefed-production.up.railway.app`)
- [ ] Test: Visit `https://your-backend.railway.app/api/v1/categories`

**✅ Done when:** API returns JSON response

---

### ☑️ STEP 4: Vercel Frontend (5 minutes)

- [ ] Sign up at vercel.com with GitHub
- [ ] Click **Add New** → **Project**
- [ ] Select `indiabriefed` repository
- [ ] Configure:
  - Framework: **Next.js**
  - Root Directory: **frontend**
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] Add Environment Variable:
  ```env
  NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
  ```
  (Replace with your Railway URL from Step 3)
- [ ] Click **Deploy**
- [ ] Wait 2-3 minutes
- [ ] Copy your Vercel URL (e.g., `https://indiabriefed.vercel.app`)

**✅ Done when:** Website loads at Vercel URL

---

### ☑️ STEP 5: Update CORS (2 minutes)

- [ ] Go back to Railway
- [ ] Click **Variables**
- [ ] Update `FRONTEND_URL`:
  ```env
  FRONTEND_URL=https://indiabriefed.vercel.app
  ```
  (Replace with your Vercel URL from Step 4)
- [ ] Railway will auto-redeploy

**✅ Done when:** Railway redeployed

---

### ☑️ STEP 6: Connect Domain (Optional - 5 minutes)

**If you have a domain from Hostinger:**

#### A. Vercel Domain Setup
- [ ] Go to Vercel → Project → **Settings** → **Domains**
- [ ] Add domain: `yourdomain.com`
- [ ] Vercel shows DNS records

#### B. Hostinger DNS Setup
- [ ] Login to Hostinger hPanel
- [ ] Go to **Domains** → **DNS/Nameservers**
- [ ] Add A record:
  ```
  Type: A
  Name: @
  Value: 76.76.21.21
  ```
- [ ] Add CNAME record:
  ```
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```
- [ ] Wait 24-48 hours for DNS propagation

**✅ Done when:** Domain points to Vercel

---

### ☑️ STEP 7: Setup Cron Job (3 minutes)

**Option A: Use cron-job.org (Easiest)**

- [ ] Go to https://cron-job.org
- [ ] Sign up (free)
- [ ] Create cron job:
  - Title: `Fetch News`
  - URL: `https://your-backend.railway.app/api/cron/fetch-news`
  - Schedule: `0 */6 * * *` (every 6 hours)
  - Method: GET
- [ ] Save

**Then add route in backend:**

Edit `backend/routes/api.php`:
```php
Route::get('/cron/fetch-news', function () {
    Artisan::call('news:fetch-all');
    return response()->json(['status' => 'success']);
});
```

Push to GitHub (auto-deploys to Railway).

**✅ Done when:** Cron job created and route added

---

## 🎉 FINAL VERIFICATION

Test everything works:

- [ ] **Homepage:** `https://indiabriefed.vercel.app` loads
- [ ] **Articles:** Click on article, page loads
- [ ] **Categories:** Click on category, page loads
- [ ] **API:** `https://your-backend.railway.app/api/v1/categories` returns JSON
- [ ] **Admin:** `https://your-backend.railway.app/admin` loads
- [ ] **Login:** Email: `admin@indiabriefed.com`, Password: `password123`
- [ ] **Chatbot:** Red button appears in bottom-right
- [ ] **Images:** Article thumbnails load
- [ ] **SSL:** Shows "Secure" in browser (automatic!)

---

## 🎯 Your Live URLs

After deployment, save these:

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | https://indiabriefed.vercel.app | Public site |
| **Admin** | https://your-backend.railway.app/admin | Content management |
| **API** | https://your-backend.railway.app/api/v1 | REST API |

---

## 🔄 How to Update Your Site

**Super Easy!** Just push to GitHub:

```bash
cd D:\indiabriefed

# Make changes to your code

# Commit and push
git add .
git commit -m "Updated homepage"
git push

# Done! Vercel & Railway auto-deploy in 2-3 minutes
```

No manual upload needed! 🎉

---

## 💰 Cost Summary

| Service | Cost | Limit |
|---------|------|-------|
| **Vercel** | FREE | Unlimited |
| **Railway** | FREE | 500 hours/month |
| **PlanetScale** | FREE | 5GB storage |
| **GitHub** | FREE | Unlimited |
| **Total** | **$0/month** | 🎉 |

**After Railway free tier (500 hours):**
- Railway: $5/month
- **Total: $5/month**

Still cheaper than Hostinger! 💪

---

## 🆘 Troubleshooting

### Issue: Railway build fails
**Solution:** Check `backend/composer.json` has `"php": "^8.2"`

### Issue: Database connection error
**Solution:** Verify PlanetScale credentials in Railway variables

### Issue: Frontend shows API error
**Solution:** Check `NEXT_PUBLIC_API_URL` in Vercel environment variables

### Issue: CORS error
**Solution:** Update `FRONTEND_URL` in Railway to match Vercel URL

### Issue: Images not loading
**Solution:** Railway doesn't persist storage. Images work via URL only.

---

## 📚 Full Documentation

For detailed instructions, read:
- **VERCEL_DEPLOYMENT_GUIDE.md** - Complete guide
- **VERCEL_VS_HOSTINGER.md** - Comparison

---

## 🎉 Congratulations!

Your IndiaBriefed platform is now LIVE on:
- ⚡ Vercel (Frontend) - Lightning fast
- 🚂 Railway (Backend) - Reliable API
- 🗄️ PlanetScale (Database) - Scalable storage

**Features:**
- ✅ Auto-deployment from Git
- ✅ Global CDN
- ✅ Auto SSL
- ✅ Professional setup
- ✅ FREE hosting!

**Time Taken:** 30 minutes
**Cost:** $0/month (FREE!)

---

**Enjoy your new website! 🚀**
