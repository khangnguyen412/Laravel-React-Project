<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerRoles;

Route::prefix('/admin')->middleware(["jwt.cookie","auth:api"])->group(function () {
    /** Role */
    Route::middleware([
        'index'   => 'auth.permission:READ_ROLE',
        'show'    => 'auth.permission:READ_ROLE',
        'store'   => 'auth.permission:CREATE_ROLE',
        'update'  => 'auth.permission:UPDATE_ROLE',
        'destroy' => 'auth.permission:DELETE_ROLE',
    ])->apiResource('roles', ControllerRoles::class)->parameters(['roles' => 'id']);
});