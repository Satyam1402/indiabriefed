<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'National', 'slug' => 'national', 'color' => '#c62828', 'description' => 'National news and affairs'],
            ['name' => 'International', 'slug' => 'international', 'color' => '#1565c0', 'description' => 'International news'],
            ['name' => 'Economy', 'slug' => 'economy', 'color' => '#2e7d32', 'description' => 'Economic news and updates'],
            ['name' => 'Science & Technology', 'slug' => 'science-technology', 'color' => '#6a1b9a', 'description' => 'Science and tech news'],
            ['name' => 'Environment', 'slug' => 'environment', 'color' => '#00695c', 'description' => 'Environmental issues'],
            ['name' => 'Defence', 'slug' => 'defence', 'color' => '#1a237e', 'description' => 'Defence and security'],
            ['name' => 'Polity & Governance', 'slug' => 'polity-governance', 'color' => '#e65100', 'description' => 'Political news'],
            ['name' => 'Art & Culture', 'slug' => 'art-culture', 'color' => '#f9a825', 'description' => 'Arts and culture'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'color' => $category['color'],
                'description' => $category['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
