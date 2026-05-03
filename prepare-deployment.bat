@echo off
echo ========================================
echo   IndiaBriefed - Deployment Preparation
echo ========================================
echo.

cd backend

echo [1/5] Clearing caches...
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
echo Done!
echo.

echo [2/5] Optimizing for production...
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo Done!
echo.

echo [3/5] Installing production dependencies...
composer install --optimize-autoloader --no-dev
echo Done!
echo.

echo [4/5] Building frontend...
cd ..\frontend
call npm install
call npm run build
echo Done!
echo.

echo [5/5] Creating deployment package...
cd ..
echo.
echo ========================================
echo   PREPARATION COMPLETE!
echo ========================================
echo.
echo Next Steps:
echo 1. Edit backend\.env.production with your domain and database details
echo 2. Zip the 'backend' folder
echo 3. Upload to Hostinger public_html/api/
echo 4. Follow DEPLOYMENT_CHECKLIST.md
echo.
echo Full Guide: HOSTINGER_DEPLOYMENT_GUIDE.md
echo.
pause
