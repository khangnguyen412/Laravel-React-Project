<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeederPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $arr = [
            [
                'name'              => "CREATE_USER",
                'guard_name'        => "create user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "READ_USER",
                'guard_name'        => "read user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "UPDATE_USER",
                'guard_name'        => "update user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "DELETE_USER",
                'guard_name'        => "delete user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "CREATE_ROLE",
                'guard_name'        => "create role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "READ_ROLE",
                'guard_name'        => "read role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "UPDATE_ROLE",
                'guard_name'        => "update role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "DELETE_ROLE",
                'guard_name'        => "delete role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "CREATE_PERMISSION",
                'guard_name'        => "create permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "READ_PERMISSION",
                'guard_name'        => "read permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "UPDATE_PERMISSION",
                'guard_name'        => "update permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "DELETE_PERMISSION",
                'guard_name'        => "delete permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
        ];
        DB::table('permissions')->insert($arr);
    }
}
