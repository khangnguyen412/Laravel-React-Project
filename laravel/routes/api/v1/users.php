<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerUsers;

Route::post('/login', [ControllerAuth::class, 'login']);

Route::middleware('check.auth')->group(['prefix' => '/user'], function(){
    Route::get('/', [ControllerUsers::class, 'index']);
});
