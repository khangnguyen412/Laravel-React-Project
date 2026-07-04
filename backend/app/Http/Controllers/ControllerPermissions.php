<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Service
 */
use App\Services\Interface\PermissionServiceInterface;

/**
 * Resource
 */
use App\Http\Resources\Permissions\PermissionsSearch;
use App\Http\Resources\Permissions\PermissionsCreate;
use App\Http\Resources\Permissions\PermissionsUpdate;
use App\Http\Resources\Permissions\PermissionsDelete;

#[OA\Tag(name: 'Permissions', description: 'Permission management')]
class ControllerPermissions extends Controller {
    protected $permissionService;

    public function __construct(PermissionServiceInterface $permissionService) {
        $this->permissionService = $permissionService;
    }

    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/permissions',
        summary: 'Get permission list',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'perPage', in: 'query', description: 'Number of items per page', required: false, schema: new OA\Schema(type: 'integer', example: 10)),
            new OA\Parameter(name: 'currentPage', in: 'query', description: 'Current page number', required: false, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsSearch'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function index(Request $request) {
        $validator = Validator::make($request->all(), [
            'perPage'     => 'nullable|integer|min:1',
            'currentPage' => 'nullable|integer|min:1',
        ], [
            'perPage.min'     => 'Items per page must be at least 1',
            'currentPage.min' => 'Current page number must be at least 1',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $currentPage = $request->input('currentPage', 1);
        $perPage = $request->input('perPage', 10);
        $description = $request->input('description', null);
        $name = $request->input('name', null);
        $permissions = $this->permissionService->search($currentPage, $perPage, $description, $name);
        return PermissionsSearch::collection($permissions);
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
    #[OA\Post(
        path: '/api/v1/admin/permissions',
        summary: 'Create permission',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/PermissionsCreate'),
        responses: [
            new OA\Response(response: 201, ref: '#/components/responses/PermissionsCreate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function store(Request $request) {
        $inputs = $request->input('data', $request->all());

        $validator = Validator::make($inputs, [
            'name'        => 'required|string|max:255|unique:permissions,name',
            'description' => 'required|string|max:255',
        ], [
            'name.required'        => 'Permission name is required',
            'name.string'          => 'Permission name must be a string',
            'name.max'             => 'Permission name must be less than 255 characters',
            'name.unique'          => 'Permission name already exists',
            'description.required' => 'Permission description is required',
            'description.string'   => 'Permission description must be a string',
            'description.max'      => 'Permission description must be less than 255 characters',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $this->permissionService->create($inputs);
        return PermissionsCreate::make(['message' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/permissions/{id}',
        summary: 'Get permission by id',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Permission id', required: true, schema: new OA\Schema(type: 'string', example: '1')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsGetById'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function show(string $id) {
        $permission = $this->permissionService->searchById($id);
        return PermissionsSearch::make($permission);
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
    #[OA\Put(
        path: '/api/v1/admin/permissions/{id}',
        summary: 'Update permission',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Permission id', required: true, schema: new OA\Schema(type: 'string', example: '123456')),
        ],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/PermissionsUpdate'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsUpdate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    #[OA\Patch(
        path: '/api/v1/admin/permissions/{id}',
        summary: 'Update permission',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Permission id', required: true, schema: new OA\Schema(type: 'string', example: '123456')),
        ],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/PermissionsUpdate'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsUpdate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function update(Request $request, string $id) {
        $inputs = $request->input('data', $request->all());
        if (!$id) {
            throw new ModelNotFoundException('Permission not found');
        }

        $isPatch = $request->isMethod('PATCH');

        $validator = Validator::make($inputs, [
            'name'        => $isPatch ? 'sometimes|string|max:255' : 'required|string|max:255',
            'description' => $isPatch ? 'sometimes|nullable|string|max:255' : 'sometimes|nullable|string|max:255',
        ], [
            'name.required'        => 'Permission name is required',
            'name.string'          => 'Permission name must be a string',
            'name.max'             => 'Permission name must be less than 255 characters',
            'description.required' => 'Permission description is required',
            'description.string'   => 'Permission description must be a string',
            'description.max'      => 'Permission description must be less than 255 characters',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $permission = $this->permissionService->update($id, $inputs);
        return PermissionsUpdate::make(['message' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(
        path: '/api/v1/admin/permissions/{id}',
        summary: 'Delete permission',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Permission id', required: true, schema: new OA\Schema(type: 'string', example: '123456')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsDelete'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function destroy(string $id) {
        $this->permissionService->delete($id);
        return PermissionsDelete::make(['message' => 'success']);
    }

}
