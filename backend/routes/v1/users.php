<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerUsers;

Route::prefix('/admin')->middleware(["jwt.cookie", "auth:api"])->group(function () {
    /** User */
    Route::middleware([
        'index'   => 'auth.permission:READ_USER',
        'show'    => 'auth.permission:READ_USER',
        'store'   => 'auth.permission:CREATE_USER',
        'update'  => 'auth.permission:UPDATE_USER',
        'destroy' => 'auth.permission:DELETE_USER',
    ])->apiResource('/users', ControllerUsers::class)->parameters([ 'user' => 'id',]);
});