<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Exception;
use OpenApi\Attributes as OA;

use App\Models\ModelsRoles;
use App\Http\Response\ApiResponse;

#[OA\Tag(name: 'Roles', description: 'Role management')]
class ControllerRoles extends Controller {
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/roles',
        summary: 'Get role list',
        security: [['bearerAuth' => []]],
        tags: ['Roles'],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/GetRolesList'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function index() {
        $roles_list = ModelsRoles::all();
        return ApiResponse::sendResponse(["roles_list" => $roles_list], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
