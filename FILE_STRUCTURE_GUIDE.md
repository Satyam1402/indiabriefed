# 📁 File Structure Guide - Hostinger Deployment

## 🎯 Where Everything Goes

---

## 📂 Your Local Structure (Current)

```
D:\indiabriefed\
│
├── 📄 README.md
├── 📄 HOSTINGER_DEPLOYMENT_GUIDE.md          ← Read this first!
├── 📄 DEPLOYMENT_CHECKLIST.md                ← Use while deploying
├── 📄 DEPLOYMENT_OVERVIEW.md                 ← Big picture view
├── 📄 TROUBLESHOOTING_GUIDE.md               ← When issues occur
├── 📄 DEPLOYMENT_PACKAGE_README.md           ← Summary of everything
├── 📄 prepare-deployment.bat                 ← Run before upload
│
├── 📁 backend\                               ← Laravel Backend
│   ├── 📁 app\
│   │   ├── 📁 Filament\                      ← Admin Panel
│   │   ├── 📁 Http\Controllers\Api\          ← API Controllers
│   │   ├── 📁 Models\                        ← Database Models
│   │   └── 📁 Services\                      ← Business Logic
│   │
│   ├── 📁 database\
│   │   ├── 📁 migrations\                    ← Database Tables
│   │   └── 📁 seeders\                       ← Sample Data
│   │
│   ├── 📁 routes\
│   │   ├── api.php                           ← API Routes
│   │   └── web.php                           ← Web Routes
│   │
│   ├── 📁 storage\
│   │   ├── 📁 app\public\                    ← Uploaded Images
│   │   └── 📁 logs\                          ← Error Logs
│   │
│   ├── 📁 public\                            ← Public Assets
│   │   ├── index.php                         ← Entry Point
│   │   └── 📁 storage\                       ← Symlink to storage
│   │
│   ├── 📄 .env                               ← Local Config
│   ├── 📄 .env.production                    ← Production Config ⭐
│   ├── 📄 composer.json                      ← PHP Dependencies
│   └── 📄 artisan                            ← Laravel CLI
│
└── 📁 frontend\                              ← Next.js Frontend
    ├── 📁 app\                               ← Pages
    │   ├── page.tsx                          ← Homepage
    │   ├── 📁 article\[slug]\                ← Article Pages
    │   └── 📁 category\[slug]\               ← Category Pages
    │
    ├── 📁 components\                        ← React Components
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── ArticleCard.tsx
    │   ├── Pagination.tsx
    │   └── 📁 Chatbot\
    │
    ├── 📁 lib\                               ← Utilities
    │   └── api.ts                            ← API Functions
    │
    ├── 📁 public\                            ← Static Assets
    │   └── images\
    │
    ├── 📄 .env.local                         ← Frontend Config ⭐
    ├── 📄 package.json                       ← Node Dependencies
    ├── 📄 next.config.ts                     ← Next.js Config
    │
    └── 📁 out\                               ← Built Files (after npm run build)
        ├── index.html
        ├── 📁 _next\
        ├── 📁 articles\
        └── 📁 category\
```

---

## 🌐 Hostinger Server Structure (After Deployment)

```
/home/u123456789/                             ← Your Hostinger Account
│
└── public_html\                              ← Web Root (Public Access)
    │
    ├── 📁 api\                               ← Backend (Laravel)
    │   │
    │   ├── 📁 app\
    │   │   ├── 📁 Filament\
    │   │   ├── 📁 Http\
    │   │   ├── 📁 Models\
    │   │   └── 📁 Services\
    │   │
    │   ├── 📁 database\
    │   │   ├── 📁 migrations\
    │   │   └── 📁 seeders\
    │   │
    │   ├── 📁 routes\
    │   │   ├── api.php
    │   │   └── web.php
    │   │
    │   ├── 📁 storage\                       ← Writable (755)
    │   │   ├── 📁 app\public\
    │   │   └── 📁 logs\
    │   │
    │   ├── 📁 bootstrap\cache\               ← Writable (755)
    │   │
    │   ├── 📁 public\                        ← Public Access
    │   │   ├── index.php
    │   │   └── 📁 storage → ../storage/app/public
    │   │
    │   ├── 📁 vendor\                        ← PHP Dependencies
    │   │
    │   ├── 📄 .env                           ← Production Config ⭐
    │   ├── 📄 .htaccess                      ← URL Rewriting ⭐
    │   ├── 📄 composer.json
    │   └── 📄 artisan
    │
    ├── 📄 index.html                         ← Frontend Homepage ⭐
    ├── 📄 .htaccess                          ← Frontend Routing ⭐
    │
    ├── 📁 _next\                             ← Frontend Assets
    │   ├── 📁 static\
    │   └── 📁 chunks\
    │
    ├── 📁 articles\                          ← Article Pages
    │   └── [slug].html
    │
    └── 📁 category\                          ← Category Pages
        └── [slug].html
```

---

## 🎯 Upload Mapping

### Backend Upload

**From:** `D:\indiabriefed\backend\`
**To:** `/home/u123456789/public_html/api/`

```
Local                           →    Server
=====================================================================================================
backend\app\                    →    public_html/api/app/
backend\database\               →    public_html/api/database/
backend\routes\                 →    public_html/api/routes/
backend\storage\                →    public_html/api/storage/
backend\public\                 →    public_html/api/public/
backend\vendor\                 →    public_html/api/vendor/
backend\.env.production         →    public_html/api/.env          ⭐ Rename!
backend\composer.json           →    public_html/api/composer.json
backend\artisan                 →    public_html/api/artisan
```

### Frontend Upload

**From:** `D:\indiabriefed\frontend\out\`
**To:** `/home/u123456789/public_html/`

```
Local                           →    Server
=====================================================================================================
frontend\out\index.html         →    public_html/index.html
frontend\out\_next\             →    public_html/_next/
frontend\out\articles\          →    public_html/articles/
frontend\out\category\          →    public_html/category/
```

---

## ⚠️ Important Files to Create/Edit

### 1. Backend .env (Production)

**Location:** `public_html/api/.env`

**Source:** Copy from `backend/.env.production` and edit:
```env
APP_URL=https://yourdomain.com
DB_DATABASE=u123456789_indiabriefed
DB_USERNAME=u123456789_admin
DB_PASSWORD=your_password
```

### 2. Backend .htaccess

**Location:** `public_html/api/.htaccess`

**Content:**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

### 3. Backend Public .htaccess

**Location:** `public_html/api/public/.htaccess`

**Content:** (Laravel default - should already exist)
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### 4. Frontend .htaccess

**Location:** `public_html/.htaccess`

**Content:**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    
    # Rewrite everything else to index.html
    RewriteRule ^ index.html [L]
</IfModule>
```

---

## 🔐 File Permissions

### Must be Writable (755)

```
public_html/api/storage/                      ← All subdirectories
public_html/api/bootstrap/cache/              ← Cache files
public_html/api/public/storage/               ← Uploaded images
```

### Command to Set Permissions

Via SSH:
```bash
cd public_html/api
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chmod -R 755 public/storage
```

Via File Manager:
- Right-click folder → Permissions → 755

---

## 🔗 Symlinks

### Storage Link (Required!)

**Purpose:** Make uploaded images accessible via web

**Command:**
```bash
cd public_html/api
php artisan storage:link
```

**Creates:**
```
public_html/api/public/storage → ../storage/app/public
```

**Test:**
Upload image via admin panel, should be accessible at:
```
https://yourdomain.com/api/storage/articles/image.jpg
```

---

## 📊 URL Structure After Deployment

```
https://yourdomain.com/
├── /                                         → Homepage (frontend)
├── /articles/[slug]                          → Article pages (frontend)
├── /category/[slug]                          → Category pages (frontend)
│
└── /api/
    ├── /api/admin                            → Admin Panel (Filament)
    ├── /api/api/v1/categories                → API: Categories
    ├── /api/api/v1/articles                  → API: Articles
    ├── /api/api/v1/articles/[slug]           → API: Single Article
    ├── /api/api/v1/search                    → API: Search
    ├── /api/api/v1/chat                      → API: Chatbot
    └── /api/storage/articles/[image]         → Uploaded Images
```

---

## 🗄️ Database Structure

**Location:** Hostinger MySQL Database

**Tables Created by Migrations:**

```
indiabriefed (database)
├── categories                                ← 8 pre-seeded
├── authors                                   ← Article authors
├── articles                                  ← 146+ articles
├── users                                     ← Admin users
├── sessions                                  ← User sessions
├── cache                                     ← Application cache
├── jobs                                      ← Queue jobs
└── failed_jobs                               ← Failed queue jobs
```

---

## 📦 What NOT to Upload

### Don't Upload These:

```
❌ backend/node_modules/                      ← Rebuild on server
❌ backend/.env                                ← Use .env.production
❌ backend/storage/logs/*.log                 ← Old logs
❌ frontend/node_modules/                     ← Not needed
❌ frontend/.next/                            ← Build artifacts
❌ frontend/out/                              ← Upload contents only
❌ .git/                                      ← Version control
❌ .gitignore                                 ← Not needed
❌ *.md files                                 ← Documentation (optional)
```

### Must Upload These:

```
✅ backend/app/                               ← Application code
✅ backend/database/                          ← Migrations & seeders
✅ backend/routes/                            ← Routes
✅ backend/storage/                           ← Empty structure
✅ backend/public/                            ← Public assets
✅ backend/vendor/                            ← PHP dependencies
✅ backend/.env.production                    ← Rename to .env
✅ backend/composer.json                      ← Dependencies list
✅ backend/artisan                            ← Laravel CLI
✅ frontend/out/* (all files)                 ← Built frontend
```

---

## 🎯 Quick Reference

### Backend Entry Point
```
https://yourdomain.com/api/public/index.php
```

### Frontend Entry Point
```
https://yourdomain.com/index.html
```

### Admin Panel
```
https://yourdomain.com/api/admin
```

### API Base URL
```
https://yourdomain.com/api/api/v1
```

---

## ✅ Verification Checklist

After upload, verify these files exist:

- [ ] `public_html/api/.env`
- [ ] `public_html/api/.htaccess`
- [ ] `public_html/api/public/index.php`
- [ ] `public_html/api/vendor/` (folder with files)
- [ ] `public_html/api/storage/` (folder structure)
- [ ] `public_html/index.html`
- [ ] `public_html/_next/` (folder with files)
- [ ] `public_html/.htaccess`

---

**This structure ensures everything works correctly on Hostinger! 📁**
