# 🚀 IndiaBriefed - FREE Vercel Deployment Guide

## 🎯 Complete FREE Stack

- **Frontend:** Vercel (FREE)
- **Backend:** Railway.app (FREE - 500 hours/month)
- **Database:** PlanetScale (FREE - 5GB)
- **Total Cost:** $0/month 🎉

---

## 📋 What You Need

- ✅ GitHub account (free)
- ✅ Vercel account (free)
- ✅ Railway account (free)
- ✅ PlanetScale account (free)
- ✅ Your domain (optional - Vercel provides free subdomain)

---

## 🗂️ PART 1: Setup GitHub Repository

### Step 1: Create GitHub Account
1. Go to https://github.com
2. Sign up (free)
3. Verify email

### Step 2: Create Repository
1. Click **New Repository**
2. Name: `indiabriefed`
3. Privacy: **Public** (for free deployment)
4. Click **Create**

### Step 3: Upload Your Code

#### Option A: Using GitHub Desktop (Easier)
1. Download GitHub Desktop: https://desktop.github.com
2. Install and login
3. Click **Add** → **Add Existing Repository**
4. Select: `D:\indiabriefed`
5. Click **Publish Repository**

#### Option B: Using Git Command Line
```bash
cd D:\indiabriefed

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/indiabriefed.git

# Push
git push -u origin main
```

---

## 🗄️ PART 2: Setup Database (PlanetScale)

### Step 1: Create Account
1. Go to https://planetscale.com
2. Sign up with GitHub (free)
3. Verify email

### Step 2: Create Database
1. Click **New Database**
2. Name: `indiabriefed`
3. Region: Choose closest to you
4. Plan: **Hobby (FREE)**
5. Click **Create**

### Step 3: Get Connection String
1. Click your database
2. Go to **Connect**
3. Select **Laravel**
4. Copy the connection details:
   ```
   DB_HOST=aws.connect.psdb.cloud
   DB_PORT=3306
   DB_DATABASE=indiabriefed
   DB_USERNAME=xxxxxxxxxx
   DB_PASSWORD=pscale_pw_xxxxxxxxxx
   ```
5. **Save these!** You'll need them.

### Step 4: Enable SSL
PlanetScale requires SSL. Add to your `.env`:
```env
DB_SSLMODE=require
MYSQL_ATTR_SSL_CA=/etc/ssl/certs/ca-certificates.crt
```

---

## 🚂 PART 3: Deploy Backend (Railway)

### Step 1: Create Account
1. Go to https://railway.app
2. Sign up with GitHub (free)
3. Authorize Railway

### Step 2: Create New Project
1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Choose `indiabriefed` repository
4. Select **backend** folder

### Step 3: Configure Environment Variables

Click **Variables** and add:

```env
# App Settings
APP_NAME=IndiaBriefed
APP_ENV=production
APP_KEY=base64:/IHyrrhcHWDa+XreMbeo1oNMLrM/aDDhGeNQI8lwO4Q=
APP_DEBUG=false
APP_URL=https://your-backend.railway.app

# Database (from PlanetScale)
DB_CONNECTION=mysql
DB_HOST=aws.connect.psdb.cloud
DB_PORT=3306
DB_DATABASE=indiabriefed
DB_USERNAME=your_planetscale_username
DB_PASSWORD=your_planetscale_password
DB_SSLMODE=require

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

# Frontend URL (will update after Vercel deployment)
FRONTEND_URL=https://your-site.vercel.app

# API Keys (your existing keys)
NEWS_API_KEY=b7d8646df06d457d87745d9e313f2e0e
GEMINI_API_KEY=AIzaSyCiZ1IY-AKXsAtC2WEr_i6qH4hYRY0iHNg
```

### Step 4: Add Build Configuration

Create `backend/railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "composer install --no-dev --optimize-autoloader && php artisan config:cache && php artisan route:cache && php artisan view:cache"
  },
  "deploy": {
    "startCommand": "php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=$PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Step 5: Deploy
1. Railway will auto-deploy
2. Wait 3-5 minutes
3. You'll get a URL like: `https://indiabriefed-production.up.railway.app`
4. **Save this URL!**

### Step 6: Test Backend
Visit: `https://your-backend.railway.app/api/v1/categories`

Should see JSON response! ✅

---

## ⚡ PART 4: Deploy Frontend (Vercel)

### Step 1: Create Account
1. Go to https://vercel.com
2. Sign up with GitHub (free)
3. Authorize Vercel

### Step 2: Import Project
1. Click **Add New** → **Project**
2. Select `indiabriefed` repository
3. Click **Import**

### Step 3: Configure Project
1. **Framework Preset:** Next.js
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `.next`

### Step 4: Add Environment Variables

Click **Environment Variables** and add:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
```

Replace `your-backend.railway.app` with your Railway URL from Part 3.

### Step 5: Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://indiabriefed.vercel.app`
4. **Your site is LIVE!** 🎉

### Step 6: Update Backend CORS

Go back to Railway → Variables → Update:
```env
FRONTEND_URL=https://indiabriefed.vercel.app
```

Replace with your actual Vercel URL.

---

## 🌐 PART 5: Connect Your Domain (Optional)

### If You Have a Domain from Hostinger:

#### A. Configure Vercel
1. Go to Vercel → Your Project → **Settings** → **Domains**
2. Add your domain: `yourdomain.com`
3. Vercel will show DNS records to add

#### B. Configure Hostinger DNS
1. Login to Hostinger hPanel
2. Go to **Domains** → **DNS/Nameservers**
3. Add these records:

**For Root Domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### C. Configure Railway (Backend)
1. Go to Railway → Your Project → **Settings**
2. Click **Generate Domain**
3. Or add custom domain: `api.yourdomain.com`

If using custom domain, add to Hostinger DNS:
```
Type: CNAME
Name: api
Value: your-backend.railway.app
```

#### D. Update Environment Variables

**Vercel:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
```

**Railway:**
```env
APP_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

Wait 24-48 hours for DNS propagation.

---

## ⏰ PART 6: Setup Cron Job (Railway)

### Option 1: Railway Cron (Recommended)

Create `backend/.railway/cron.json`:
```json
{
  "crons": [
    {
      "name": "fetch-news",
      "schedule": "0 */6 * * *",
      "command": "php artisan news:fetch-all"
    }
  ]
}
```

### Option 2: External Cron Service (Free)

Use **cron-job.org** (free):

1. Go to https://cron-job.org
2. Sign up (free)
3. Create new cron job:
   - URL: `https://your-backend.railway.app/api/cron/fetch-news`
   - Schedule: Every 6 hours
   - Method: GET

Then create route in `backend/routes/api.php`:
```php
Route::get('/cron/fetch-news', function () {
    Artisan::call('news:fetch-all');
    return response()->json(['status' => 'success']);
});
```

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Frontend loads: `https://indiabriefed.vercel.app`
- [ ] Homepage shows articles
- [ ] Article pages work
- [ ] Category pages work
- [ ] Backend API: `https://your-backend.railway.app/api/v1/categories`
- [ ] Admin panel: `https://your-backend.railway.app/admin`
- [ ] Login works: `admin@indiabriefed.com` / `password123`
- [ ] Chatbot appears and works
- [ ] Images load correctly
- [ ] SSL shows "Secure" (automatic on Vercel & Railway)

---

## 🔄 Auto-Deployment (Best Feature!)

### How It Works:

```
1. Edit code on your PC
   ↓
2. Push to GitHub
   ↓
3. Vercel & Railway auto-deploy
   ↓
4. Changes live in 2-3 minutes!
```

### To Update Your Site:

```bash
cd D:\indiabriefed

# Make changes to your code

# Commit changes
git add .
git commit -m "Updated homepage"

# Push to GitHub
git push

# Done! Vercel & Railway will auto-deploy
```

No manual upload needed! 🎉

---

## 💰 Free Tier Limits

### Vercel (Frontend)
- ✅ Unlimited bandwidth
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domain
- ✅ Auto SSL

### Railway (Backend)
- ✅ 500 hours/month (enough for 24/7)
- ✅ 512MB RAM
- ✅ 1GB storage
- ✅ Unlimited bandwidth
- ⚠️ After 500 hours: $5/month

### PlanetScale (Database)
- ✅ 5GB storage
- ✅ 1 billion row reads/month
- ✅ 10 million row writes/month
- ✅ Automatic backups
- ⚠️ After limits: $29/month (unlikely to hit)

**Your Usage:**
- Backend: ~720 hours/month (24/7)
- Database: ~100MB, minimal reads/writes
- **Cost:** FREE for first month, then ~$5/month for Railway

---

## 🆚 Comparison: Vercel vs Hostinger

| Feature | Vercel Stack | Hostinger |
|---------|--------------|-----------|
| **Setup Time** | 30 minutes | 45 minutes |
| **Difficulty** | Easy | Medium |
| **Cost** | FREE (or $5/month) | $3-10/month |
| **Performance** | ⚡ Excellent (CDN) | 🐢 Good |
| **Auto Deploy** | ✅ Yes (Git push) | ❌ No (manual) |
| **SSL** | ✅ Auto | ⏳ Manual |
| **Scaling** | ✅ Auto | ❌ Manual |
| **Global CDN** | ✅ Yes | ❌ No |
| **Backups** | ✅ Git history | ⏳ Manual |

**Winner:** Vercel Stack! 🏆

---

## 🔧 Troubleshooting

### Issue: Railway Build Fails

**Solution:**
Check `backend/composer.json` has:
```json
{
  "require": {
    "php": "^8.2"
  }
}
```

### Issue: Database Connection Error

**Solution:**
Verify PlanetScale credentials in Railway environment variables.

### Issue: CORS Error

**Solution:**
Update `backend/config/cors.php`:
```php
'allowed_origins' => [
    env('FRONTEND_URL', 'http://localhost:3000'),
    'https://*.vercel.app',
],
```

### Issue: Images Not Loading

**Solution:**
Railway doesn't persist storage. Use Cloudinary (free) for images:

1. Sign up: https://cloudinary.com (free)
2. Get credentials
3. Install: `composer require cloudinary/cloudinary_php`
4. Configure in `.env`

---

## 📊 Monitoring

### Vercel Dashboard
- View deployments
- Check analytics
- Monitor performance

### Railway Dashboard
- View logs
- Monitor resource usage
- Check deployment status

### PlanetScale Dashboard
- View database size
- Monitor queries
- Check connection status

---

## 🎉 Advantages of This Setup

✅ **Completely FREE** (or $5/month after Railway free tier)
✅ **Auto-deployment** from Git
✅ **Global CDN** for fast loading worldwide
✅ **Auto SSL** certificates
✅ **Auto scaling** based on traffic
✅ **Zero maintenance** - everything managed
✅ **Professional setup** - production-grade
✅ **Easy updates** - just push to Git

---

## 🚀 Next Steps

1. **Setup GitHub** - Upload your code
2. **Setup PlanetScale** - Create database
3. **Deploy to Railway** - Backend API
4. **Deploy to Vercel** - Frontend
5. **Connect domain** (optional)
6. **Setup cron job** - Auto news fetching

**Total Time:** 30-45 minutes
**Cost:** FREE (or $5/month)

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **PlanetScale Docs:** https://planetscale.com/docs
- **GitHub Docs:** https://docs.github.com

---

**This is the BEST way to deploy your project! 🚀**

Modern, fast, free, and professional!
