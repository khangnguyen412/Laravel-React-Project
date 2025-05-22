<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeederUser extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [];
        $i = 0;
        for ($i = 0; $i <= 10; $i++) {
            $user = [
                'user_name'         => "user_{$i}",
                'display_name'      => "User {$i}",
                'email'             => "user_{$i}@example.com",
                'email_verified_at' => now(),
                'password'          => Hash::make('password'),
                'address'           => "Address {$i}",
                'phone'             => "0987654321",
                'image'             => "default_avatar.png",
                'remember_token'    => '123',
                'created_at'        => now(),
                'updated_at'        => now(),
            ];
            DB::table('users')->insert($user);
            $user_id = DB::getPdo()->lastInsertId();
            $profile = [
                'bio'           => "This is the bio for User {$i}",
                'created_at'    => now(),
                'avatar'        => '123',
                'updated_at'    => now(),
                'user_id'       => $user_id,
            ];
            DB::table('profiles')->insert($profile);
        }
    }
}
