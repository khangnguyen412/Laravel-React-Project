<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerUsers;

Route::post('/login', [ControllerAuth::class, 'login']);
Route::middleware('auth.check')->post('/logout', [ControllerAuth::class, 'logout']);

Route::prefix('/admin')->middleware('auth.check')->group(function () {
    Route::apiResource('/user', ControllerUsers::class);
    Route::get('/profile', [ControllerAuth::class, 'profile']);
});
