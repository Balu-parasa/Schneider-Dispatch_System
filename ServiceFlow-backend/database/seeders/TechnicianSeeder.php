<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\TechnicianProfile;
use Illuminate\Support\Facades\Hash;

class TechnicianSeeder extends Seeder
{
    public function run(): void
    {
        $technicians = [
            [
                'name' => 'Michael Scott',
                'email' => 'mike.scott@serviceflow.com',
                'phone' => '+15550100',
                'specialty' => 'Plumbing',
                'vehicle' => 'Ford Transit Custom',
                'license_plate' => 'PLM-8492',
                'hourly_rate' => 85.00,
                'skills' => ['Pipe Repair', 'Water Heaters', 'Drain Cleaning'],
                'rating' => 4.9,
                'total_jobs' => 342,
            ],
            [
                'name' => 'Sarah Connor',
                'email' => 'sarah.c@serviceflow.com',
                'phone' => '+15550101',
                'specialty' => 'Electrical',
                'vehicle' => 'Mercedes Sprinter',
                'license_plate' => 'ELC-1029',
                'hourly_rate' => 95.00,
                'skills' => ['Wiring', 'Panel Upgrades', 'Smart Home Setup'],
                'rating' => 4.8,
                'total_jobs' => 210,
            ],
            [
                'name' => 'David Martinez',
                'email' => 'david.m@serviceflow.com',
                'phone' => '+15550102',
                'specialty' => 'HVAC',
                'vehicle' => 'Chevy Express',
                'license_plate' => 'HVC-4402',
                'hourly_rate' => 110.00,
                'skills' => ['AC Repair', 'Furnace Installation', 'Duct Cleaning'],
                'rating' => 4.7,
                'total_jobs' => 185,
            ],
            [
                'name' => 'Jessica Chen',
                'email' => 'jessica.c@serviceflow.com',
                'phone' => '+15550103',
                'specialty' => 'Cleaning',
                'vehicle' => 'Toyota Prius',
                'license_plate' => 'CLN-8921',
                'hourly_rate' => 45.00,
                'skills' => ['Deep Cleaning', 'Move in/out', 'Office Cleaning'],
                'rating' => 4.9,
                'total_jobs' => 520,
            ],
            [
                'name' => 'Marcus Johnson',
                'email' => 'marcus.j@serviceflow.com',
                'phone' => '+15550104',
                'specialty' => 'Handyman',
                'vehicle' => 'Ford F-150',
                'license_plate' => 'HND-5512',
                'hourly_rate' => 65.00,
                'skills' => ['Furniture Assembly', 'Mounting', 'Minor Repairs'],
                'rating' => 4.6,
                'total_jobs' => 140,
            ],
        ];

        foreach ($technicians as $tech) {
            $user = User::firstOrCreate(
                ['email' => $tech['email']],
                [
                    'name' => $tech['name'],
                    'phone' => $tech['phone'],
                    'password' => Hash::make('password123'),
                    'role' => 'technician',
                ]
            );

            TechnicianProfile::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'specialty' => $tech['specialty'],
                    'status' => 'online', // Ready for dispatch!
                    'rating' => $tech['rating'],
                    'total_jobs' => $tech['total_jobs'],
                    'hourly_rate' => $tech['hourly_rate'],
                    'verified' => true,
                    'vehicle' => $tech['vehicle'],
                    'license_plate' => $tech['license_plate'],
                    'skills' => $tech['skills'],
                    'service_areas' => ['Downtown', 'Northside', 'West End'],
                ]
            );
        }
    }
}
