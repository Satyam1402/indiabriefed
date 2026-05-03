@echo off
echo ========================================
echo Starting IndiaBriefed Platform
echo ========================================
echo.

echo Starting Backend (Laravel)...
start cmd /k "cd backend && php artisan serve"

timeout /t 3 /nobreak > nul

echo Starting Frontend (Next.js)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo IndiaBriefed is Starting!
echo ========================================
echo.
echo Backend (Admin + API): http://localhost:8000
echo Frontend (Website):    http://localhost:3000
echo.
echo Admin Panel: http://localhost:8000/admin
echo Login: admin@indiabriefed.com / password123
echo.
echo Press any key to close this window...
pause > nul
