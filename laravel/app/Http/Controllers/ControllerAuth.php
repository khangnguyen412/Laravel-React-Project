<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

use App\Models\ModelsUsers;

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
    public function login(Request $request)
    {
        try {
            $valid = Validator::make($request->all(), [
                "email"    => "nullable|email",
                "username" => "nullable|string",
                "password" => "required"
            ]);
            if ($valid->fails() || (empty($request->email) && empty($request->username))) {
                return response()->json([
                    "status" => 401,
                    "error"  => "Invalid email or password"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $credentials = $request->only("password");
            if ($request->filled("username")){
                $credentials["user_name"] = $request->username;
            } else {
                $credentials["email"] = $request->email;
            }

            $user = ModelsUsers::where("email", $request->email)->orWhere("user_name", $request->username)->first();
            if (!$user) {
                return response()->json([
                    "status" => 401,
                    "error"  => "Username not found"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    "status" => 401,
                    "error"  => "Invalid password"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            if(!$token = auth()->attempt($credentials)){
                return response()->json([
                    "status" => 401,
                    "error" => "Invalid credentials"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $profile = ModelsUsers::with("role")->find(auth()->user()->id);
            return response()->json([
                "status"  => 200,
                "token"   => $token,
                "profile" => $profile,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            return response()->json([
                "status" => 403,
                "error"  => "Error: " . $e->getMessage(),
                "req"    => $request,
            ], 403, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }

    public function logout()
    {
        try {
            auth()->logout();
            return response()->json([
                "status"  => 200,
                "message" => "Logout Successfully"
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            return response()->json([
                "status" => 403,
                "error"  => "Error: " . $e->getMessage(),
            ], 403, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }

    public function profile(Request $request)
    {
        try {
            $profile = ModelsUsers::with("role")->find($request->user()->id); // Call user() form setUserResolver in middleware AuthMiddleware
            return response()->json([
                "status"  => 200,
                "profile" => $profile
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            return response()->json([
                "status" => 403,
                "error"  => "Error" . $e->getMessage(),
            ], 403, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }
}