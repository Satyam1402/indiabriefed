# 🚀 GitHub Actions Automated Deployment Guide

## ✅ Files Created

Three workflow files have been created:

1. **`.github/workflows/deploy-backend.yml`** - Auto-deploys when backend code changes
2. **`.github/workflows/deploy-frontend.yml`** - Auto-deploys when frontend code changes
3. **`.github/workflows/deploy-full.yml`** - Deploys everything (manual trigger available)

---

## 📋 **NEXT STEPS TO COMPLETE SETUP**

---

## **STEP 1: Setup SSH Keys on Your VPS**

### 1.1 Connect to VPS via PuTTY
- Host: Your VPS IP
- Port: 22
- Username: root
- Password: Your VPS password

### 1.2 Generate SSH Key Pair

Run these commands on your VPS:

```bash
# Generate SSH key (press Enter for all prompts)
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions -N ""

# Display the PRIVATE key (copy this entire output)
cat ~/.ssh/github_actions
```

**IMPORTANT:** Copy the entire private key output (including `-----BEGIN` and `-----END` lines)

### 1.3 Add Public Key to Authorized Keys

```bash
# Add public key to authorized keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

---

## **STEP 2: Add Secrets to GitHub Repository**

### 2.1 Go to Your Repository Settings

1. Open your GitHub repository: https://github.com/YOUR_USERNAME/indiabriefed
2. Click **"Settings"** tab (top right)
3. In left sidebar, click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"** button

### 2.2 Add These 4 Secrets

Add each secret one by one:

#### Secret 1: VPS_HOST
- **Name:** `VPS_HOST`
- **Value:** Your VPS IP address (e.g., `123.45.67.89`)
- Click "Add secret"

#### Secret 2: VPS_USERNAME
- **Name:** `VPS_USERNAME`
- **Value:** `root`
- Click "Add secret"

#### Secret 3: VPS_SSH_KEY
- **Name:** `VPS_SSH_KEY`
- **Value:** Paste the ENTIRE private key from Step 1.2
  ```
  -----BEGIN OPENSSH PRIVATE KEY-----
  b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAA
  ... (all the lines) ...
  -----END OPENSSH PRIVATE KEY-----
  ```
- Click "Add secret"

#### Secret 4: VPS_PORT
- **Name:** `VPS_PORT`
- **Value:** `22`
- Click "Add secret"

---

## **STEP 3: Setup Git on Your VPS**

Connect to VPS and run:

```bash
# Navigate to project directory
cd /var/www/indiabriefed

# Initialize git repository
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/indiabriefed.git

# Pull the code
git pull origin main
# OR if your branch is master:
# git pull origin master

# Set git to store credentials (optional, for easier pulls)
git config --global credential.helper store
```

---

## **STEP 4: Commit and Push Workflow Files**

On your local computer (Windows):

```bash
cd D:\indiabriefed

# Check what files were created
git status

# Add the workflow files
git add .github/workflows/

# Commit
git commit -m "Add GitHub Actions automated deployment"

# Push to GitHub
git push origin main
```

---

## **STEP 5: Verify Deployment**

### 5.1 Check GitHub Actions

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. You should see the workflow running
4. Click on it to see deployment progress

### 5.2 Monitor Deployment

Watch the logs in real-time:
- ✅ Green checkmark = Success
- ❌ Red X = Failed (check logs for errors)

---

## 🎯 **HOW IT WORKS**

### Automatic Deployment Triggers:

1. **Backend Changes:**
   - Edit any file in `backend/` folder
   - Commit and push
   - `deploy-backend.yml` runs automatically
   - Backend deploys in ~2 minutes

2. **Frontend Changes:**
   - Edit any file in `frontend/` folder
   - Commit and push
   - `deploy-frontend.yml` runs automatically
   - Frontend deploys in ~3 minutes

3. **Any Changes:**
   - Edit any file
   - Commit and push
   - `deploy-full.yml` runs
   - Everything deploys

### Manual Deployment:

1. Go to GitHub → Actions tab
2. Click "Deploy Full Stack to VPS"
3. Click "Run workflow"
4. Select branch (main/master)
5. Click "Run workflow" button

---

## 📝 **TYPICAL WORKFLOW**

### Daily Development:

```bash
# 1. Make changes to your code
# Edit files in backend/ or frontend/

# 2. Test locally
cd D:\indiabriefed\backend
php artisan serve

# 3. Commit changes
git add .
git commit -m "Add new feature"

# 4. Push to GitHub
git push origin main

# 5. GitHub Actions automatically deploys! 🚀
# Check progress: GitHub → Actions tab
```

---

## 🔍 **TROUBLESHOOTING**

### Issue: "Permission denied (publickey)"

**Solution:**
```bash
# On VPS, check SSH key permissions
chmod 600 ~/.ssh/github_actions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Issue: "Git pull failed"

**Solution:**
```bash
# On VPS, reset git repository
cd /var/www/indiabriefed
git reset --hard
git pull origin main
```

### Issue: "Composer install failed"

**Solution:**
```bash
# On VPS, manually run composer
cd /var/www/indiabriefed/backend
composer install --optimize-autoloader --no-dev
```

### Issue: "PM2 not found"

**Solution:**
```bash
# On VPS, install PM2
npm install -g pm2
```

---

## 📊 **DEPLOYMENT CHECKLIST**

Before first deployment, ensure:

- ✅ VPS is setup (PHP, MySQL, Nginx, Node.js installed)
- ✅ Database created and configured
- ✅ Domain DNS pointed to VPS
- ✅ SSL certificates installed
- ✅ Nginx configured
- ✅ SSH keys generated
- ✅ GitHub secrets added
- ✅ Git initialized on VPS
- ✅ Initial code pulled to VPS

---

## 🎉 **SUCCESS!**

Once setup is complete:

1. **Make code changes** on your local computer
2. **Commit and push** to GitHub
3. **GitHub Actions deploys automatically** to your VPS
4. **Your site updates** in 2-5 minutes

No more manual SSH, no more manual commands! 🚀

---

## 📞 **QUICK REFERENCE**

### View Deployment Logs:
- GitHub → Repository → Actions tab

### Manual Deploy:
- GitHub → Actions → Deploy Full Stack → Run workflow

### Check VPS Status:
```bash
# Connect via PuTTY
systemctl status nginx
systemctl status php8.2-fpm
pm2 status
```

### View Application Logs:
```bash
# Laravel logs
tail -f /var/www/indiabriefed/backend/storage/logs/laravel.log

# Nginx logs
tail -f /var/log/nginx/error.log

# PM2 logs
pm2 logs
```

---

## 🔐 **SECURITY NOTES**

- ✅ Private key is stored securely in GitHub Secrets
- ✅ Never commit `.env` files
- ✅ Use strong passwords for database
- ✅ Keep VPS updated: `apt update && apt upgrade`
- ✅ Enable firewall: `ufw enable`

---

**Your automated deployment is ready! 🎊**

Every push to GitHub = Automatic deployment to your VPS!
