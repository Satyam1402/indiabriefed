@echo off
echo ========================================
echo IndiaBriefed Admin Panel Setup
echo ========================================
echo.

cd backend

echo [1/6] Generating application key...
php artisan key:generate
echo.

echo [2/6] Running database migrations...
php artisan migrate --force
echo.

echo [3/6] Seeding database (Categories + Admin User)...
php artisan db:seed --force
echo.

echo [4/6] Creating storage link...
php artisan storage:link
echo.

echo [5/6] Installing npm dependencies...
call npm install
echo.

echo [6/6] Building Filament assets...
call npm run build
echo.

echo ========================================
echo Admin Panel Setup Complete!
echo ========================================
echo.
echo Admin Panel URL: http://localhost:8000/admin
echo.
echo Login Credentials:
echo Email: admin@indiabriefed.com
echo Password: password123
echo.
echo To start the server, run:
echo cd backend
echo php artisan serve
echo.
echo Then visit: http://localhost:8000/admin
echo.
pause
