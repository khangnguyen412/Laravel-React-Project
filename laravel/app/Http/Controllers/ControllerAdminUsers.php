<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use OpenApi\Attributes as OA;


use App\Models\ModelsUsers;
use App\Http\Response\ApiResponse;


class ControllerAdminUsers extends Auth
{
    /**
     *  Get User
     */
    #[OA\Get(
        path: "/api/v1/user",
        summary: "Danh sách users",
        security: [["bearerAuth" => []]],
        tags: ["ModelsUsers"],
        responses: [
            new OA\Response(
                response: 200,
                description: "OK",
                content: new OA\JsonContent(
                    type: "array",
                    items: new OA\Items(ref: "#/components/schemas/ModelsUsers")
                )
            ),
            new OA\Response(response: 401, description: "Unauthorized")
        ]
    )]
    public function index()
    {
        try {
            $users_list = ModelsUsers::with('role')->get();
            return ApiResponse::sendResponse(["users_list" => $users_list], 200);
        } catch (NotFoundHttpException $e) {
            throw new NotFoundHttpException($e->getMessage());
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
        if (!$id) {
            throw new NotFoundHttpException("Couldn't get userid");
        }
        $users_with_id = ModelsUsers::with('role')->find($id);
        if (!$users_with_id) {
            throw new NotFoundHttpException("Couldn't get user with id: $id");
        }
        return ApiResponse::sendResponse(["data" => $users_with_id], 200);
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
