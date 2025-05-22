<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerUsers;

Route::get('/', function () {
    return view('welcome');
});