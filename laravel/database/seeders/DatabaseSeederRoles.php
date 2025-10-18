<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeederRoles extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $arr = [
            [
                'name'              => "Administrator",
                'guard_name'        => "admin",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "Manager",
                'guard_name'        => "manager",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
        ];
        DB::table('roles')->insert($arr);
    }
}
