# IndiaBriefed - Complete Setup Guide

## Project Successfully Created! ✅

Your Laravel 11 backend is installed at: `D:\indiabriefed\backend`

## Next Steps to Complete Setup:

### 1. Configure Database

1. Open XAMPP Control Panel
2. Start Apache and MySQL
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create database: `indiabriefed`
5. Update `.env` file with your MySQL password if needed

### 2. Generate Application Key

```bash
cd D:\indiabriefed\backend
php artisan key:generate
```

### 3. Create Database Migrations

Run these commands to create migration files:

```bash
php artisan make:migration create_categories_table
php artisan make:migration create_authors_table  
php artisan make:migration create_articles_table
```

### 4. Install Spatie Sluggable

```bash
cd D:\indiabriefed\backend
php ..\composer.phar require spatie/laravel-sluggable --ignore-platform-reqs
```

### 5. Create Models

```bash
php artisan make:model Category
php artisan make:model Author
php artisan make:model Article
```

### 6. Create API Controllers

```bash
php artisan make:controller Api/ArticleController
php artisan make:controller Api/CategoryController
php artisan make:controller Api/SearchController
```

### 7. Create API Resources

```bash
php artisan make:resource ArticleResource
php artisan make:resource CategoryResource
```

### 8. Create Seeder

```bash
php artisan make:seeder CategorySeeder
```

### 9. Run Migrations

```bash
php artisan migrate
php artisan db:seed --class=CategorySeeder
```

### 10. Create Storage Link

```bash
php artisan storage:link
```

### 11. Start Laravel Server

```bash
php artisan serve
```

Backend will run at: http://localhost:8000

---

## Frontend Setup (Next.js)

### 1. Create Next.js Project

```bash
cd D:\indiabriefed\frontend
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### 2. Install Dependencies

```bash
npm install axios date-fns
```

### 3. Create Environment File

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=IndiaBriefed
```

### 4. Start Next.js Server

```bash
npm run dev
```

Frontend will run at: http://localhost:3000

---

## File Contents to Add

I'll provide all the necessary file contents in the following sections. Copy and paste them into the respective files.

### Migration Files

#### database/migrations/xxxx_create_categories_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 100)->unique();
            $table->text('description')->nullable();
            $table->string('color', 20)->default('#c62828');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

#### database/migrations/xxxx_create_authors_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->text('bio')->nullable();
            $table->string('photo_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('authors');
    }
};
```

#### database/migrations/xxxx_create_articles_table.php

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->string('slug', 500)->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('thumbnail_url')->nullable();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('author_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('is_breaking')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->integer('views')->default(0);
            $table->integer('read_time')->default(3);
            $table->string('meta_title', 60)->nullable();
            $table->string('meta_description', 160)->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
```

---

## Testing the API

Once setup is complete, test these endpoints:

- GET http://localhost:8000/api/v1/articles
- GET http://localhost:8000/api/v1/categories
- GET http://localhost:8000/api/v1/articles/{slug}
- GET http://localhost:8000/api/v1/search?q=test

---

## Project Structure

```
D:\indiabriefed\
├── backend\              (Laravel 11 - API + Admin)
│   ├── app\
│   │   ├── Http\
│   │   │   ├── Controllers\Api\
│   │   │   └── Resources\
│   │   └── Models\
│   ├── database\migrations\
│   ├── routes\api.php
│   └── .env
│
└── frontend\             (Next.js 14 - Public Site)
    ├── app\
    ├── components\
    ├── lib\
    └── .env.local
```

---

## Important Notes

1. **PHP Extensions**: Your XAMPP PHP needs these extensions enabled in `php.ini`:
   - extension=pdo_mysql
   - extension=mbstring
   - extension=fileinfo
   - extension=openssl

2. **CORS**: Already configured to allow requests from localhost:3000

3. **Database**: Make sure MySQL is running before migrations

4. **Ports**: 
   - Backend: 8000
   - Frontend: 3000
   - MySQL: 3306

---

## What's Already Done ✅

- ✅ Laravel 11 installed
- ✅ Laravel Sanctum installed
- ✅ Project structure created
- ✅ Environment file configured
- ✅ SQLite database created (for testing)

## What You Need to Do

Follow steps 1-11 above to complete the backend setup, then proceed with the frontend setup.

---

## Troubleshooting

### If migrations fail:
```bash
php artisan migrate:fresh
```

### If composer issues:
```bash
php ..\composer.phar update --ignore-platform-reqs
```

### If port 8000 is busy:
```bash
php artisan serve --port=8001
```

---

## Ready to Build!

Your IndiaBriefed news platform foundation is ready. Follow the steps above to complete the setup and start building your UPSC/SSC news website!
