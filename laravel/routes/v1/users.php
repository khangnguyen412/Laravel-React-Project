<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerAdminUsers;
use App\Http\Controllers\ControllerPayment;

Route::post('/login', [ControllerAuth::class, 'login']);
Route::middleware(["auth:api"])->post('/logout', [ControllerAuth::class, 'logout']);

Route::prefix('/admin')->middleware(["auth:api"])->group(function () {
    Route::apiResource('/user', ControllerAdminUsers::class);
    Route::get('/profile', [ControllerAuth::class, 'profile']);
    Route::get('/update/{id}', [ControllerAuth::class, 'profile']);
});

Route::post('/stripe-checkout', [ControllerPayment::class, 'StripePaymentAPI']);