<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerUsers;


Route::post('/login', [ControllerAuth::class, 'login']);
Route::middleware(["auth:api"])->post('/logout', [ControllerAuth::class, 'logout']);

Route::prefix('/admin')->middleware(["auth:api"])->group(function () {
    /** User */
    Route::apiResource('/user', ControllerUsers::class);
    Route::get('/update/{id}', [ControllerAuth::class, 'profile']);

    /** Auth */
    Route::get('/profile', [ControllerAuth::class, 'profile']);
});

