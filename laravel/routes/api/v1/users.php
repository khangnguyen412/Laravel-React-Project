<?php

use App\Http\Controllers\ControllerUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', []);

Route::group(['prefix' => '/user'], function(){
    Route::get('/', [ControllerUsers::class, 'index']);
});
