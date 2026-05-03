# ✅ Quick Deployment Checklist

## Before You Start
- [ ] Have Hostinger login credentials ready
- [ ] Know your domain name
- [ ] Have FTP/SSH access details

---

## Step-by-Step (30 minutes)

### 1️⃣ Database Setup (5 min)
- [ ] Login to Hostinger hPanel
- [ ] Create MySQL database
- [ ] Save database name, username, password

### 2️⃣ Prepare Backend (5 min)
- [ ] Edit `backend/.env.production`
- [ ] Replace `yourdomain.com` with your domain
- [ ] Replace database credentials
- [ ] Run: `composer install --no-dev`

### 3️⃣ Upload Backend (10 min)
- [ ] Zip `backend` folder
- [ ] Upload to `public_html/api/` via File Manager
- [ ] Extract zip
- [ ] Set permissions: 755 for storage, bootstrap/cache
- [ ] Rename `.env.production` to `.env`

### 4️⃣ Run Migrations (5 min)
- [ ] Open Hostinger Terminal
- [ ] Run: `cd public_html/api`
- [ ] Run: `php artisan migrate --force`
- [ ] Run: `php artisan db:seed --force`
- [ ] Run: `php artisan storage:link`

### 5️⃣ Test Backend (2 min)
- [ ] Visit: `https://yourdomain.com/api/api/v1/categories`
- [ ] Should see JSON response

### 6️⃣ Prepare Frontend (5 min)
- [ ] Edit `frontend/.env.local`
- [ ] Set: `NEXT_PUBLIC_API_URL=https://yourdomain.com/api/api/v1`
- [ ] Run: `npm run build`
- [ ] Run: `npm run export`

### 7️⃣ Upload Frontend (5 min)
- [ ] Upload files from `frontend/out/` to `public_html/`
- [ ] Keep `api` folder intact

### 8️⃣ Enable SSL (2 min)
- [ ] Go to hPanel → SSL
- [ ] Install Free SSL (Let's Encrypt)
- [ ] Wait 5-10 minutes

### 9️⃣ Setup Cron Job (3 min)
- [ ] Go to hPanel → Cron Jobs
- [ ] Create new cron job
- [ ] Schedule: Every 6 hours
- [ ] Command: `cd /home/u123456789/public_html/api && php artisan news:fetch-all`

### 🔟 Final Testing (5 min)
- [ ] Visit: `https://yourdomain.com`
- [ ] Homepage loads ✅
- [ ] Articles load ✅
- [ ] Admin panel works: `https://yourdomain.com/api/admin` ✅
- [ ] Login: `admin@indiabriefed.com` / `password123` ✅
- [ ] Chatbot works ✅

---

## 🎉 DONE!

Your website is LIVE at: **https://yourdomain.com**

Admin Panel: **https://yourdomain.com/api/admin**

---

## 🆘 Quick Fixes

**500 Error?**
```bash
cd public_html/api
php artisan config:clear
chmod -R 755 storage bootstrap/cache
```

**Database Error?**
- Check `.env` has correct DB credentials
- DB_HOST should be `localhost`

**Images Not Loading?**
```bash
cd public_html/api
php artisan storage:link
chmod -R 755 storage/app/public
```

---

## 📞 Need Help?

Read full guide: `HOSTINGER_DEPLOYMENT_GUIDE.md`
