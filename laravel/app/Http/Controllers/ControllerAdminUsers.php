<?php

namespace App\Http\Controllers;

use App\Models\ModelsUsers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\Users;

class ControllerAdminUsers extends Auth
{
    /**
     *  Get User
     */
    public function index()
    {
        try {
            $users_list = ModelsUsers::all();
            return response()->json([
                "status"        => "Success",
                "users_list"    => $users_list,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            return response()->json([
                "status"    => "Failed",
                "message"   => $e->getMessage(),
            ], 404, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
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
        try {
            if (!$id) {
                return response()->json([
                    "status"    => "Failed",
                    "message"   => "Couldn't get userid",
                ], 400, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }
            $users_with_id = ModelsUsers::where('id', $id)->first();
            if (!$users_with_id) {
                return response()->json([
                    "status"    => "Failed",
                    "message"   => "Couldn't get user",
                ], 404, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }
            return response()->json([
                "status"    => "Success",
                "data"      => $users_with_id,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            return response()->json([
                "status"    => "Failed",
                "message"   => $e->getMessage(),
            ], 404, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
}
