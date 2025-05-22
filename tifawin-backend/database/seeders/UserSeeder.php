<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // 👤 Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@tifawin.ma',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 👤 Employe
        User::create([
            'name' => 'Employe User',
            'email' => 'employe@tifawin.ma',
            'password' => Hash::make('password'),
            'role' => 'employe',
        ]);
    }
}
