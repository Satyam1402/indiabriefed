# 🐳 IndiaBriefed - Docker Deployment Guide

## 🎯 What is Docker?

Docker packages your entire application (code + database + dependencies) into **containers** that run anywhere.

**Think of it like:**
- Traditional: Building a house brick by brick (manual setup)
- Docker: Buying a pre-built house, just place it and it works! (automated)

---

## ✅ Why Docker is Better

| Feature | Docker | Traditional cPanel |
|---------|--------|-------------------|
| **Setup Time** | 10 minutes | 1 hour |
| **Commands** | 3 commands | 50+ steps |
| **Errors** | Rare | Common |
| **Updates** | 1 command | Manual |
| **Backup** | 1 command | Complex |
| **Portability** | Works anywhere | Server-specific |

---

## 📋 Prerequisites

### What You Need:

1. **VPS Server** with:
   - Ubuntu 20.04+ or CentOS 7+
   - Root/sudo access
   - 2GB RAM minimum
   - 20GB disk space

2. **Domain** (optional):
   - Can use server IP initially
   - Add domain later

3. **Your Project**:
   - Already on GitHub ✅
   - Docker files created ✅

---

## 🚀 DEPLOYMENT OPTIONS

Choose based on your server:

### Option 1: cPanel VPS with Docker (Recommended)
- If your cPanel has Docker support
- Easiest with GUI

### Option 2: Plain VPS (Ubuntu/CentOS)
- No cPanel needed
- More control
- I'll guide you through this

---

## 🖥️ OPTION 1: Deploy on cPanel VPS with Docker

### STEP 1: Check if Docker is Available

1. **Login to cPanel**

2. **Look for "Docker" icon** in Software section

3. **If you see it:**
   - ✅ Docker is available
   - Continue with cPanel Docker steps below

4. **If you DON'T see it:**
   - ❌ Docker not installed
   - Use Option 2 (Plain VPS) instead

### STEP 2: Enable Docker in cPanel

1. **Click "Docker" icon**

2. **Click "Enable Docker"**

3. **Wait for activation**

### STEP 3: Upload Project

1. **In cPanel File Manager**

2. **Go to home directory** (not public_html)

3. **Create folder:** `indiabriefed`

4. **Upload your project files** (or clone from GitHub)

### STEP 4: Deploy with Docker Compose

1. **In cPanel, click "Terminal"**

2. **Run these commands:**

```bash
cd ~/indiabriefed

# Start all services
docker-compose up -d
```

3. **Wait 5 minutes** (first time takes longer)

4. **Check status:**

```bash
docker-compose ps
```

You should see 3 containers running:
- indiabriefed_mysql
- indiabriefed_backend
- indiabriefed_frontend

### STEP 5: Access Your Site

- **Frontend:** `http://your-server-ip:3000`
- **Backend API:** `http://your-server-ip:8000/api/v1/categories`
- **Admin Panel:** `http://your-server-ip:8000/admin`

✅ **Done!** Your site is live!

---

## 🖥️ OPTION 2: Deploy on Plain VPS (Ubuntu) - DETAILED

This is the **COMPLETE** guide for VPS without cPanel.

### STEP 1: Connect to Your VPS (5 minutes)

#### On Windows:

1. **Download PuTTY:**
   - Go to: https://www.putty.org
   - Download and install

2. **Open PuTTY**

3. **Enter:**
   - Host Name: Your VPS IP address
   - Port: 22
   - Connection type: SSH

4. **Click "Open"**

5. **Login:**
   - Username: `root` (or provided username)
   - Password: Your VPS password

6. **You'll see command prompt** like: `root@server:~#`

✅ **Connected!**

---

### STEP 2: Install Docker (10 minutes)

#### For Ubuntu 20.04/22.04:

**Copy and paste these commands ONE BY ONE:**

```bash
# Update system
apt update && apt upgrade -y
```

```bash
# Install required packages
apt install -y apt-transport-https ca-certificates curl software-properties-common
```

```bash
# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

```bash
# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
# Update package list
apt update
```

```bash
# Install Docker
apt install -y docker-ce docker-ce-cli containerd.io
```

```bash
# Start Docker
systemctl start docker
systemctl enable docker
```

```bash
# Verify Docker is running
docker --version
```

You should see: `Docker version 24.x.x`

```bash
# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
# Make it executable
chmod +x /usr/local/bin/docker-compose
```

```bash
# Verify Docker Compose
docker-compose --version
```

You should see: `Docker Compose version v2.x.x`

✅ **Docker installed!**

---

### STEP 3: Install Git (2 minutes)

```bash
apt install -y git
```

```bash
git --version
```

✅ **Git installed!**

---

### STEP 4: Clone Your Project (5 minutes)

```bash
# Go to home directory
cd ~
```

```bash
# Clone from GitHub (replace with your username)
git clone https://github.com/Satyam1402/indiabriefed.git
```

```bash
# Enter project directory
cd indiabriefed
```

```bash
# List files to verify
ls -la
```

You should see:
- backend/
- frontend/
- docker-compose.yml

✅ **Project cloned!**

---

### STEP 5: Configure Environment (5 minutes)

```bash
# Edit docker-compose.yml
nano docker-compose.yml
```

**Change these lines:**

Find:
```yaml
MYSQL_PASSWORD: indiabriefed_password_change_this
```

Change to:
```yaml
MYSQL_PASSWORD: YourStrongPassword123!
```

Find:
```yaml
DB_PASSWORD: indiabriefed_password_change_this
```

Change to:
```yaml
DB_PASSWORD: YourStrongPassword123!
```

Find:
```yaml
APP_URL: http://localhost:8000
```

Change to:
```yaml
APP_URL: http://YOUR_SERVER_IP:8000
```

Find:
```yaml
FRONTEND_URL: http://localhost:3000
```

Change to:
```yaml
FRONTEND_URL: http://YOUR_SERVER_IP:3000
```

Find:
```yaml
NEXT_PUBLIC_API_URL: http://localhost:8000/api/v1
```

Change to:
```yaml
NEXT_PUBLIC_API_URL: http://YOUR_SERVER_IP:8000/api/v1
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

✅ **Configuration done!**

---

### STEP 6: Deploy with Docker (10 minutes)

```bash
# Make sure you're in project directory
cd ~/indiabriefed
```

```bash
# Build and start all containers
docker-compose up -d --build
```

**This will:**
- Build backend Docker image (3-5 minutes)
- Build frontend Docker image (2-3 minutes)
- Download MySQL image
- Start all containers
- Run migrations
- Seed database

**Watch the progress:**

```bash
# View logs
docker-compose logs -f
```

Press `Ctrl + C` to stop viewing logs (containers keep running)

**Check if containers are running:**

```bash
docker-compose ps
```

You should see:

```
NAME                      STATUS
indiabriefed_mysql        Up
indiabriefed_backend      Up
indiabriefed_frontend     Up
```

✅ **All containers running!**

---

### STEP 7: Open Firewall Ports (5 minutes)

```bash
# Allow ports 3000 and 8000
ufw allow 3000
ufw allow 8000
ufw allow 80
ufw allow 443
```

```bash
# Enable firewall
ufw enable
```

```bash
# Check status
ufw status
```

✅ **Firewall configured!**

---

### STEP 8: Test Your Deployment (5 minutes)

**Open browser and test:**

1. **Frontend:**
   - URL: `http://YOUR_SERVER_IP:3000`
   - Should see homepage with articles ✅

2. **Backend API:**
   - URL: `http://YOUR_SERVER_IP:8000/api/v1/categories`
   - Should see JSON with categories ✅

3. **Admin Panel:**
   - URL: `http://YOUR_SERVER_IP:8000/admin`
   - Login: `admin@indiabriefed.com` / `password123`
   - Should see dashboard ✅

✅ **Everything working!**

---

## 🌐 STEP 9: Add Domain (Optional - 15 minutes)

### Install Nginx Reverse Proxy:

```bash
apt install -y nginx
```

```bash
# Create Nginx config
nano /etc/nginx/sites-available/indiabriefed
```

**Paste this:**

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save and exit** (`Ctrl + X`, `Y`, `Enter`)

```bash
# Enable site
ln -s /etc/nginx/sites-available/indiabriefed /etc/nginx/sites-enabled/
```

```bash
# Test Nginx config
nginx -t
```

```bash
# Restart Nginx
systemctl restart nginx
```

### Configure DNS:

1. **Go to your domain registrar**

2. **Add A records:**
   - `@` → Your server IP
   - `www` → Your server IP
   - `api` → Your server IP

3. **Wait 1-24 hours** for DNS propagation

### Install SSL (Free):

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx
```

```bash
# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

Follow prompts, enter email, agree to terms.

✅ **SSL installed! Your site is now HTTPS!**

---

## 🔄 STEP 10: Setup Auto News Fetching (5 minutes)

```bash
# Create cron job
crontab -e
```

**Choose editor** (select nano if asked)

**Add this line at the end:**

```bash
0 */6 * * * docker exec indiabriefed_backend php artisan news:fetch-all
```

**Save and exit** (`Ctrl + X`, `Y`, `Enter`)

✅ **Cron job setup! News will fetch every 6 hours!**

---

## 📊 Useful Docker Commands

### View running containers:
```bash
docker-compose ps
```

### View logs:
```bash
docker-compose logs -f
```

### Restart all containers:
```bash
docker-compose restart
```

### Stop all containers:
```bash
docker-compose down
```

### Start all containers:
```bash
docker-compose up -d
```

### Rebuild and restart:
```bash
docker-compose up -d --build
```

### Access backend container:
```bash
docker exec -it indiabriefed_backend bash
```

### Run artisan commands:
```bash
docker exec indiabriefed_backend php artisan migrate
docker exec indiabriefed_backend php artisan cache:clear
docker exec indiabriefed_backend php artisan config:cache
```

### View database:
```bash
docker exec -it indiabriefed_mysql mysql -u indiabriefed_user -p
# Enter password when prompted
```

### Backup database:
```bash
docker exec indiabriefed_mysql mysqldump -u indiabriefed_user -p indiabriefed > backup.sql
```

### Restore database:
```bash
docker exec -i indiabriefed_mysql mysql -u indiabriefed_user -p indiabriefed < backup.sql
```

---

## 🔄 How to Update Your Site

### Method 1: Update from GitHub

```bash
cd ~/indiabriefed
git pull
docker-compose up -d --build
```

### Method 2: Manual Update

1. **Edit files on your PC**
2. **Push to GitHub**
3. **On server:**
```bash
cd ~/indiabriefed
git pull
docker-compose restart
```

---

## 🆘 Troubleshooting

### Issue: Container won't start

**Check logs:**
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### Issue: Database connection error

**Check if MySQL is ready:**
```bash
docker exec indiabriefed_mysql mysqladmin ping -h localhost
```

### Issue: Port already in use

**Find what's using the port:**
```bash
lsof -i :8000
lsof -i :3000
```

**Kill the process:**
```bash
kill -9 <PID>
```

### Issue: Out of disk space

**Clean Docker:**
```bash
docker system prune -a
```

---

## 💰 Cost Comparison

| Hosting | Setup Time | Monthly Cost | Difficulty |
|---------|------------|--------------|------------|
| **Docker VPS** | 1 hour | $5-10 | Medium |
| **cPanel** | 2 hours | $10-20 | Easy |
| **Vercel + Railway** | 30 min | $0-5 | Easy |

---

## 🎉 CONGRATULATIONS!

Your IndiaBriefed is now running in Docker! 🐳

**What You Have:**
- ✅ Containerized application
- ✅ Easy updates (1 command)
- ✅ Easy backup
- ✅ Professional setup
- ✅ Portable (works on any server)
- ✅ Isolated environment

---

## 📞 Need Help?

**Tell me:**
1. Which option you're using (cPanel or Plain VPS)
2. Which step you're on
3. Any error messages you see

I'll help you fix it! 😊
