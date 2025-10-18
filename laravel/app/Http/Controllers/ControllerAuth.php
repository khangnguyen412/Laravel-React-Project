<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;


use App\Models\ModelsUsers;
use App\Http\Requests\AuthRequest;
use App\Http\Response\ApiResponse;

class ControllerAuth extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function login(AuthRequest $request)
    {
        $request->validated();

        $credentials = $request->only("password");
        if ($request->filled('username')) {
            $credentials["user_name"] = $request->username;
        } else {
            $credentials["email"] = $request->email;
        }

        $user = ModelsUsers::where("email", $request->email)->orWhere("user_name", $request->username)->first();
        if (!$user) {
            throw new AuthenticationException("Username not found");
        }

        if (!Hash::check($request->password, $user->password)) {
            throw new AuthenticationException("Invalid password");
        }

        if (!$token = auth()->attempt($credentials)) {
            throw new AuthenticationException("Invalid credentials");
        }

        $profile = ModelsUsers::with("role")->find(auth()->user()->id);
        return ApiResponse::sendResponse(["token" => $token, "profile" => $profile], 200);
    }

    public function logout()
    {
        try {
            auth()->logout();
            return ApiResponse::sendResponse(["message" => "Logout Successfully"], 200);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }

    public function profile(Request $request)
    {
        try {
            $profile = ModelsUsers::with("role")->find($request->user()->id); // Call user() form setUserResolver in middleware AuthMiddleware
            return ApiResponse::sendResponse(["profile" => $profile], 200);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }
}