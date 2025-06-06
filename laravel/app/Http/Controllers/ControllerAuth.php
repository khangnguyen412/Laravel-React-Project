<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
            $valid = Validator::make($request->all(),[
                'email' => 'required|email',
                'password' => 'required'
            ]);
            if($valid->fails()){
                return response()->json([
                    'status' => 401,
                    'error' => $valid
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $user = ModelsUsers::where('email', $request->email)->first();
            if (!$user->email || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'    => 401,
                    'error'     => 'Email hoặc mật khẩu sai'
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $token = Str::random(60);
            $user->api_token = hash('sha256', $token);
            $user->save();

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

    public function logout(Request $request){
        try{
            $user = $request->user();
            $user->api_token = null;
            $user->save();
            return response()->json([
                'status'    => 200,
                'message'   => 'Đã đăng xuất thành công'
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }catch(Exception $e){
        }
    }
}
