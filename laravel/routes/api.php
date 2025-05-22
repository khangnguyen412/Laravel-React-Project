<?php

use App\Http\Controllers\ControllerUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/users',[ControllerUsers::class, 'index']);
