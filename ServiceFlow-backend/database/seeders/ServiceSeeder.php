<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Plumbing Repair',
                'category' => 'Plumbing',
                'description' => 'Expert plumbing repair for leaks, pipes, and fixtures.',
                'base_price' => 75.00,
                'emergency_multiplier' => 1.5,
            ],
            [
                'name' => 'Electrical Troubleshooting',
                'category' => 'Electrical',
                'description' => 'Safe and reliable electrical troubleshooting and repair.',
                'base_price' => 85.00,
                'emergency_multiplier' => 1.5,
            ],
            [
                'name' => 'HVAC Maintenance',
                'category' => 'HVAC',
                'description' => 'Routine maintenance and repair for AC and heating systems.',
                'base_price' => 110.00,
                'emergency_multiplier' => 1.5,
            ],
            [
                'name' => 'Deep House Cleaning',
                'category' => 'Cleaning',
                'description' => 'Comprehensive deep cleaning for your entire home.',
                'base_price' => 150.00,
                'emergency_multiplier' => 1.2,
            ],
            [
                'name' => 'General Handyman',
                'category' => 'Handyman',
                'description' => 'Help with assembling furniture, mounting TVs, and minor repairs.',
                'base_price' => 60.00,
                'emergency_multiplier' => 1.3,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => Str::slug($service['name'])],
                $service
            );
        }
    }
}
