@echo off
echo ========================================
echo IndiaBriefed - Quick Setup Script
echo ========================================
echo.

cd backend

echo [1/5] Generating application key...
php artisan key:generate

echo.
echo [2/5] Running database migrations...
php artisan migrate

echo.
echo [3/5] Seeding categories...
php artisan db:seed --class=CategorySeeder

echo.
echo [4/5] Creating storage link...
php artisan storage:link

echo.
echo [5/5] Setup complete!
echo.
echo ========================================
echo Backend is ready!
echo ========================================
echo.
echo To start the server, run:
echo   cd backend
echo   php artisan serve
echo.
echo API will be available at: http://localhost:8000/api/v1
echo.
pause
