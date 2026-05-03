# 🚀 IndiaBriefed - Hostinger Deployment Guide

## 📋 Prerequisites
- ✅ Hostinger account with hosting plan
- ✅ Domain name configured
- ✅ FTP/SSH access credentials
- ✅ MySQL database access

---

## 🎯 DEPLOYMENT STEPS

### STEP 1: Create Database on Hostinger

1. Login to **Hostinger Control Panel** (hPanel)
2. Go to **Databases** → **MySQL Databases**
3. Click **Create New Database**
4. Fill in:
   - Database Name: `u123456789_indiabriefed` (Hostinger adds prefix automatically)
   - Username: `u123456789_admin`
   - Password: Create a strong password (save it!)
5. Click **Create**
6. **Save these credentials** - you'll need them!

---

### STEP 2: Prepare Backend Files

#### A. Create Production .env File

Create a new file `backend/.env.production` with these settings:

```env
APP_NAME=IndiaBriefed
APP_ENV=production
APP_KEY=base64:/IHyrrhcHWDa+XreMbeo1oNMLrM/aDDhGeNQI8lwO4Q=
APP_DEBUG=false
APP_TIMEZONE=UTC
APP_URL=https://yourdomain.com

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
APP_MAINTENANCE_STORE=database

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# REPLACE WITH YOUR HOSTINGER DATABASE CREDENTIALS
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_indiabriefed
DB_USERNAME=u123456789_admin
DB_PASSWORD=YOUR_DATABASE_PASSWORD_HERE

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.yourdomain.com

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=public
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

FRONTEND_URL=https://yourdomain.com

# AI & News API Keys (Keep your existing keys)
NEWS_API_KEY=b7d8646df06d457d87745d9e313f2e0e
GEMINI_API_KEY=AIzaSyCiZ1IY-AKXsAtC2WEr_i6qH4hYRY0iHNg
```

**IMPORTANT:** Replace:
- `yourdomain.com` → Your actual domain
- `u123456789_indiabriefed` → Your database name from Step 1
- `u123456789_admin` → Your database username from Step 1
- `YOUR_DATABASE_PASSWORD_HERE` → Your database password from Step 1

#### B. Optimize Backend for Production

Run these commands in `D:\indiabriefed\backend`:

```bash
# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Install production dependencies only
composer install --optimize-autoloader --no-dev
```

---

### STEP 3: Upload Backend to Hostinger

#### Option A: Using File Manager (Easier)

1. Login to **Hostinger hPanel**
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. Create folder structure:
   ```
   public_html/
   ├── api/          (Laravel backend goes here)
   └── public/       (Frontend will go here later)
   ```

5. **Upload Backend Files:**
   - Zip your `D:\indiabriefed\backend` folder
   - Upload zip to `public_html/api/`
   - Extract the zip
   - Delete the zip file

6. **Important:** Move contents of `public_html/api/public/` to `public_html/api/` (Laravel requirement)

#### Option B: Using FTP (FileZilla)

1. Download **FileZilla** (free FTP client)
2. Get FTP credentials from Hostinger:
   - Go to hPanel → **FTP Accounts**
   - Copy: Host, Username, Password, Port
3. Connect via FileZilla
4. Upload `backend` folder to `public_html/api/`

---

### STEP 4: Configure Backend on Server

#### A. Set Permissions (Important!)

Via File Manager or SSH, set these permissions:

```bash
chmod -R 755 public_html/api/storage
chmod -R 755 public_html/api/bootstrap/cache
chmod -R 755 public_html/api/public
```

#### B. Rename .env File

1. Go to `public_html/api/`
2. Rename `.env.production` to `.env`
3. Delete old `.env` if exists

#### C. Create .htaccess for Laravel

Create `public_html/api/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

Create `public_html/api/public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

---

### STEP 5: Run Database Migrations

#### Option A: Using SSH (Recommended)

1. Login to Hostinger hPanel
2. Go to **Advanced** → **SSH Access**
3. Enable SSH and get credentials
4. Connect via terminal:

```bash
ssh u123456789@yourdomain.com
cd public_html/api
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
```

#### Option B: Using Hostinger Terminal

1. Go to hPanel → **Advanced** → **Terminal**
2. Run:

```bash
cd public_html/api
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
```

---

### STEP 6: Test Backend API

Visit: `https://yourdomain.com/api/api/v1/categories`

You should see JSON response with categories!

---

### STEP 7: Prepare Frontend (Next.js)

#### A. Update Frontend API URL

Edit `D:\indiabriefed\frontend\.env.local`:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api/api/v1
```

#### B. Build Frontend for Production

Run in `D:\indiabriefed\frontend`:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Export static files
npm run export
```

This creates `out` folder with static HTML/CSS/JS files.

---

### STEP 8: Upload Frontend to Hostinger

1. Go to File Manager → `public_html/`
2. Upload all files from `frontend/out/` folder
3. Your structure should be:
   ```
   public_html/
   ├── api/              (Backend)
   ├── index.html        (Frontend homepage)
   ├── _next/            (Frontend assets)
   ├── articles/         (Frontend pages)
   └── category/         (Frontend pages)
   ```

---

### STEP 9: Configure Domain & SSL

#### A. Point Domain to Hosting

1. Go to hPanel → **Domains**
2. Click your domain
3. Make sure it points to your hosting account
4. Wait 24-48 hours for DNS propagation

#### B. Enable SSL (Free)

1. Go to hPanel → **SSL**
2. Click **Install SSL** for your domain
3. Select **Free SSL** (Let's Encrypt)
4. Wait 5-10 minutes for activation

---

### STEP 10: Setup Cron Job for News Automation

1. Go to hPanel → **Advanced** → **Cron Jobs**
2. Click **Create Cron Job**
3. Fill in:
   - **Type:** Custom
   - **Minute:** `0`
   - **Hour:** `*/6` (every 6 hours)
   - **Day:** `*`
   - **Month:** `*`
   - **Weekday:** `*`
   - **Command:** 
     ```bash
     cd /home/u123456789/public_html/api && php artisan news:fetch-all
     ```
4. Click **Create**

This will automatically fetch news every 6 hours!

---

## ✅ VERIFICATION CHECKLIST

After deployment, test these URLs:

- [ ] `https://yourdomain.com` → Frontend homepage loads
- [ ] `https://yourdomain.com/api/api/v1/categories` → Returns JSON
- [ ] `https://yourdomain.com/api/api/v1/articles` → Returns articles
- [ ] `https://yourdomain.com/api/admin` → Admin panel loads
- [ ] Login with: `admin@indiabriefed.com` / `password123`
- [ ] Click on articles → Article pages load
- [ ] Chatbot button appears and works
- [ ] Images load correctly

---

## 🔧 TROUBLESHOOTING

### Issue: 500 Internal Server Error

**Solution:**
```bash
cd public_html/api
php artisan config:clear
php artisan cache:clear
chmod -R 755 storage bootstrap/cache
```

### Issue: Database Connection Error

**Solution:**
- Check `.env` file has correct database credentials
- Verify database exists in hPanel → Databases
- Check DB_HOST is `localhost` not `127.0.0.1`

### Issue: Images Not Loading

**Solution:**
```bash
cd public_html/api
php artisan storage:link
chmod -R 755 storage/app/public
```

### Issue: Admin Panel Not Loading

**Solution:**
```bash
cd public_html/api
php artisan filament:upgrade
php artisan optimize:clear
```

### Issue: Cron Job Not Running

**Solution:**
- Check cron job path is correct
- Test manually via SSH:
  ```bash
  cd public_html/api
  php artisan news:fetch-all
  ```

---

## 📊 MONITORING

### Check Logs

Via SSH or File Manager:
```
public_html/api/storage/logs/laravel.log
```

### Check Cron Job Execution

hPanel → Cron Jobs → View execution history

---

## 🎉 CONGRATULATIONS!

Your IndiaBriefed platform is now LIVE! 🚀

**What's Working:**
- ✅ News website with 146+ articles
- ✅ Admin panel for content management
- ✅ Automatic news fetching every 6 hours
- ✅ AI-powered chatbot
- ✅ Fully responsive design
- ✅ SEO optimized
- ✅ SSL secured

**Next Steps:**
1. Change admin password
2. Customize categories
3. Add your own articles
4. Share your website!

---

## 📞 NEED HELP?

If you face any issues during deployment, check:
1. Hostinger Knowledge Base
2. Laravel Deployment Documentation
3. Next.js Static Export Guide

**Common Hostinger Support Topics:**
- FTP/SSH access
- Database creation
- SSL installation
- Cron job setup
