# 🔧 Hostinger Deployment - Troubleshooting Guide

## 🚨 Common Issues & Solutions

---

## Issue 1: 500 Internal Server Error

### Symptoms:
- White page with "500 Internal Server Error"
- Backend API not responding

### Solutions:

**A. Clear All Caches**
```bash
cd public_html/api
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

**B. Fix Permissions**
```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chmod -R 755 public
```

**C. Check .env File**
- Make sure `.env` exists in `public_html/api/`
- Verify `APP_KEY` is set
- Check `APP_ENV=production`
- Verify `APP_DEBUG=false`

**D. Regenerate Optimizations**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Issue 2: Database Connection Error

### Symptoms:
- "SQLSTATE[HY000] [1045] Access denied"
- "Could not connect to database"

### Solutions:

**A. Verify Database Credentials**

Check `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=localhost          ← Must be "localhost" not "127.0.0.1"
DB_PORT=3306
DB_DATABASE=u123456789_indiabriefed    ← Your actual DB name
DB_USERNAME=u123456789_admin            ← Your actual username
DB_PASSWORD=your_actual_password        ← Your actual password
```

**B. Check Database Exists**
1. Login to Hostinger hPanel
2. Go to **Databases** → **MySQL Databases**
3. Verify database name matches `.env`

**C. Test Database Connection**
```bash
cd public_html/api
php artisan tinker
DB::connection()->getPdo();
```

If successful, you'll see: `PDO {#...}`

---

## Issue 3: Admin Panel Not Loading

### Symptoms:
- `/api/admin` shows 404 or blank page
- Filament assets not loading

### Solutions:

**A. Rebuild Filament Assets**
```bash
cd public_html/api
php artisan filament:upgrade
php artisan optimize:clear
npm install
npm run build
```

**B. Check .htaccess**

Verify `public_html/api/public/.htaccess` exists with:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

**C. Clear Browser Cache**
- Press Ctrl+Shift+Delete
- Clear cache and cookies
- Try incognito mode

---

## Issue 4: Images Not Loading

### Symptoms:
- Article thumbnails show broken image icon
- Uploaded images return 404

### Solutions:

**A. Create Storage Link**
```bash
cd public_html/api
php artisan storage:link
```

**B. Fix Storage Permissions**
```bash
chmod -R 755 storage/app/public
chmod -R 755 public/storage
```

**C. Verify Storage Structure**
```
public_html/api/
├── storage/
│   └── app/
│       └── public/
│           └── articles/
└── public/
    └── storage → ../storage/app/public (symlink)
```

**D. Check .env**
```env
FILESYSTEM_DISK=public
```

---

## Issue 5: Frontend Not Loading

### Symptoms:
- Homepage shows 404
- Only backend works

### Solutions:

**A. Check File Structure**
```
public_html/
├── api/              ← Backend
├── index.html        ← Frontend homepage (must exist!)
├── _next/            ← Frontend assets
├── articles/         ← Frontend pages
└── category/         ← Frontend pages
```

**B. Re-upload Frontend**
1. Delete all files in `public_html/` EXCEPT `api` folder
2. Upload fresh files from `frontend/out/`

**C. Check .htaccess**

Create `public_html/.htaccess`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    
    # Rewrite everything else to index.html
    RewriteRule ^ index.html [L]
</IfModule>
```

---

## Issue 6: Cron Job Not Running

### Symptoms:
- No new articles appearing
- News not auto-updating

### Solutions:

**A. Test Command Manually**
```bash
cd public_html/api
php artisan news:fetch-all
```

If this works, cron job path is wrong.

**B. Fix Cron Job Path**

Go to hPanel → Cron Jobs → Edit

Correct command format:
```bash
cd /home/u123456789/public_html/api && php artisan news:fetch-all
```

Replace `u123456789` with your actual username.

**C. Check Cron Job Logs**

View execution history in hPanel → Cron Jobs

**D. Verify Schedule**
- Minute: `0`
- Hour: `*/6` (every 6 hours)
- Day: `*`
- Month: `*`
- Weekday: `*`

---

## Issue 7: SSL Certificate Not Working

### Symptoms:
- "Not Secure" warning in browser
- HTTPS not working

### Solutions:

**A. Install SSL**
1. Go to hPanel → **SSL**
2. Select your domain
3. Click **Install SSL**
4. Choose **Free SSL** (Let's Encrypt)
5. Wait 5-10 minutes

**B. Force HTTPS**

Add to `public_html/.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**C. Update .env**
```env
APP_URL=https://yourdomain.com
```

**D. Clear Cache**
```bash
cd public_html/api
php artisan config:clear
php artisan config:cache
```

---

## Issue 8: API Returning 404

### Symptoms:
- `/api/api/v1/categories` returns 404
- API endpoints not working

### Solutions:

**A. Check .htaccess**

Verify `public_html/api/.htaccess`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

**B. Clear Route Cache**
```bash
cd public_html/api
php artisan route:clear
php artisan route:cache
```

**C. Verify API Routes**
```bash
php artisan route:list | grep api
```

---

## Issue 9: Composer Dependencies Missing

### Symptoms:
- "Class not found" errors
- Vendor folder missing

### Solutions:

**A. Install Dependencies**
```bash
cd public_html/api
composer install --no-dev --optimize-autoloader
```

**B. If Composer Not Available**

On your PC:
```bash
cd D:\indiabriefed\backend
composer install --no-dev
```

Then re-upload entire `vendor` folder to server.

---

## Issue 10: Migration Errors

### Symptoms:
- "Table already exists"
- "Column not found"

### Solutions:

**A. Fresh Migration**
```bash
cd public_html/api
php artisan migrate:fresh --force
php artisan db:seed --force
```

⚠️ **WARNING:** This deletes all data!

**B. Rollback & Re-migrate**
```bash
php artisan migrate:rollback --force
php artisan migrate --force
```

**C. Check Database**

Login to phpMyAdmin via hPanel and verify tables exist.

---

## Issue 11: Chatbot Not Working

### Symptoms:
- Chatbot button not appearing
- Chatbot returns errors

### Solutions:

**A. Check Frontend API URL**

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api/api/v1
```

**B. Rebuild Frontend**
```bash
cd frontend
npm run build
npm run export
```

Re-upload `out` folder contents.

**C. Test API Endpoint**

Visit: `https://yourdomain.com/api/api/v1/chat/suggestions`

Should return JSON with suggested questions.

---

## Issue 12: Slow Performance

### Symptoms:
- Pages loading slowly
- Admin panel laggy

### Solutions:

**A. Enable Caching**
```bash
cd public_html/api
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**B. Optimize Database**

Via phpMyAdmin:
- Select database
- Check all tables
- Click "Optimize table"

**C. Enable OPcache**

Contact Hostinger support to enable PHP OPcache.

**D. Compress Assets**

In `public_html/.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## 🆘 Emergency Recovery

### If Everything Breaks:

**1. Backup Current State**
- Download `public_html` folder via FTP
- Export database via phpMyAdmin

**2. Fresh Start**
```bash
# Delete everything
rm -rf public_html/*

# Re-upload from local
# Upload backend to public_html/api/
# Upload frontend to public_html/
```

**3. Re-run Setup**
```bash
cd public_html/api
php artisan migrate:fresh --force
php artisan db:seed --force
php artisan storage:link
```

---

## 📞 Getting Help

### Check Logs First

**Laravel Logs:**
```
public_html/api/storage/logs/laravel.log
```

**PHP Error Logs:**
```
public_html/error_log
```

### Hostinger Support

1. **Live Chat:** Available 24/7
   - Go to hPanel → Help → Live Chat

2. **Knowledge Base:**
   - help.hostinger.com

3. **Submit Ticket:**
   - hPanel → Help → Submit Ticket

### What to Include in Support Request:

- Your domain name
- Exact error message
- What you were trying to do
- Screenshots
- Relevant log entries

---

## ✅ Verification Commands

Run these to check everything is working:

```bash
# Check PHP version (should be 8.2+)
php -v

# Check Laravel installation
cd public_html/api
php artisan --version

# Check database connection
php artisan tinker
DB::connection()->getPdo();

# Check routes
php artisan route:list

# Check storage permissions
ls -la storage/

# Test news fetching
php artisan news:fetch-all

# Check cron jobs
crontab -l
```

---

## 🎯 Prevention Tips

**1. Regular Backups**
- Enable automatic backups in hPanel
- Download manual backup weekly

**2. Monitor Logs**
- Check `laravel.log` weekly
- Look for errors or warnings

**3. Keep Updated**
- Update Composer packages monthly
- Update npm packages monthly

**4. Test Before Deploying**
- Always test locally first
- Use staging environment if possible

**5. Document Changes**
- Keep notes of what you modify
- Save backup of `.env` file

---

## 📊 Health Check Checklist

Run this weekly:

- [ ] Website loads: `https://yourdomain.com`
- [ ] Admin panel works: `https://yourdomain.com/api/admin`
- [ ] API responds: `https://yourdomain.com/api/api/v1/categories`
- [ ] New articles appearing (check cron job)
- [ ] Images loading correctly
- [ ] Chatbot working
- [ ] SSL certificate valid
- [ ] No errors in logs

---

**Remember:** Most issues are simple fixes! Check logs first, then try the solutions above. 🔧
