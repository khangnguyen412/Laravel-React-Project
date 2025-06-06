<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerUsers;

Route::post('/login', [ControllerAuth::class, 'login']);
Route::middleware('auth.check')->post('/logout', [ControllerAuth::class, 'logout']);

Route::prefix('/user')->middleware('auth.check')->group(function(){
    Route::get('/', [ControllerUsers::class, 'index']);
});
