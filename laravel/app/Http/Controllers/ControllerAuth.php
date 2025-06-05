<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

use App\Models\Users;

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
            $request->validate([
                'email' => 'require|email',
                'password' => 'require'
            ]);

            $user = Users::where('email', $request->email)->first();
            if (!$user->email || !Hash::check($request->password, $user->email)) {
                return response()->json([
                    'status'    => 401,
                    'error'     => 'Email hoặc mật khẩu sai'
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $token = Str::random(60);
            $user->update(['api_token' => hash('sha256', $token)]);

            return response()->json([
                'status'    => 200,
                'token'     => $token,
                'user'      => $user,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            return response()->json([
                'status'    => 403,
                'error'     => 'Lỗi: '. $e->getMessage(),
            ], 403, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }
}
