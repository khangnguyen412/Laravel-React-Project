<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeederRoles extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $arr = [
            [
                'name'        => "Administrator",
                'description' => "admin",
                'level'       => 100,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => "Manager",
                'description' => "manager",
                'level'       => 90,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => "Editor",
                'description' => "editor",
                'level'       => 80,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'name'        => "User",
                'description' => "user",
                'level'       => 0,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];
        DB::table('roles')->insert($arr);
    }

}
