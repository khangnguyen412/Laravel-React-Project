<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerAdminUsers;


Route::post('/login', [ControllerAuth::class, 'login']);

Route::middleware(["auth:api"])->group(function () {
    Route::get('/logout', [ControllerAuth::class, 'logout']);
    Route::get('/admin/profile', [ControllerAuth::class, 'profile']);
});

