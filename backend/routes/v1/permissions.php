<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerPermissions;

Route::prefix('/admin')->middleware(["jwt.cookie", "auth:api", "throttle:api"])->group(function () {
    /** Role */
    Route::middleware([
        'index'   => 'auth.permission:READ_PERMISSION',
        'show'    => 'auth.permission:READ_PERMISSION',
        'store'   => 'auth.permission:CREATE_PERMISSION',
        'update'  => 'auth.permission:UPDATE_PERMISSION',
        'destroy' => 'auth.permission:DELETE_PERMISSION',
    ])->apiResource('permissions', ControllerPermissions::class)->parameters(['permissions' => 'id']);
});