<?php

namespace App\Http\Controllers;

use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;

/**
 * Exception
 */
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Models
 */
use App\Models\ModelsUsers;

/**
 * Services
 */
use App\Services\Interface\UserServiceInterface;

/**
 * Resource
 */
use App\Http\Resources\Users\UsersSearch;
use App\Http\Resources\Users\UsersCreate;
use App\Http\Resources\Users\UsersUpdate;
use App\Http\Resources\Users\UsersDelete;


#[OA\Tag(name: 'Users', description: 'User management')]
class ControllerUsers extends Auth {
    protected $userService;

    public function __construct(UserServiceInterface $userService) {
        $this->userService = $userService;
    }

    /**
     *  Get User
     */
    #[OA\Get(
        path: '/api/v1/admin/users',
        summary: 'Get user list',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'perPage', in: 'query', description: 'Number of items per page', required: false, schema: new OA\Schema(type: 'integer', example: 10)),
            new OA\Parameter(name: 'currentPage', in: 'query', description: 'Current page number', required: false, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UsersSearch'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function index(Request $request) {
        try {
            $input = $request->input("data", $request->all());

            $validator = Validator::make($request->all(), [
                'perPage'     => 'required|integer|min:1',
                'currentPage' => 'required|integer|min:1',
            ], [
                'perPage.min'     => 'Items per page must be at least 1',
                'currentPage.min' => 'Current page number must be at least 1',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $users = $this->userService->search($input);

            return UsersSearch::collection($users);
        } catch (NotFoundHttpException $e) {
            throw new NotFoundHttpException($e->getMessage());
        }
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
        path: '/api/v1/admin/users',
        summary: 'Create user',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/UsersCreate'),
        responses: [
            new OA\Response(response: 201, ref: '#/components/responses/UsersCreate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function store(Request $request) {
        $input = $request->input("data", $request->all());
        $validator = Validator::make($input, [
            'user_name'    => 'required|string|unique:users,user_name',
            'display_name' => 'required|string',
            'email'        => 'required|email|unique:users,email',
            'password'     => 'required|min:6',
            'address'      => 'nullable|string',
            'phone'        => 'nullable|string',
            'bio'          => 'nullable|string',
            'role_id'      => 'required|exists:roles,id',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $user = $this->userService->create($input);

        return new UsersCreate($user);
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/users/{id}',
        summary: 'Get user by id',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'User ID', required: true, schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UsersGetById'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function show(string $id) {
        if (!$id) {
            throw new NotFoundHttpException("Couldn't get userid");
        }

        $user = $this->userService->searchById($id);

        return new UsersSearch($user);
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
        path: '/api/v1/admin/users/{id}',
        summary: 'Update user',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'uuid', in: 'path', description: 'User ID', required: true, schema: new OA\Schema(type: 'string')),
        ],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/UsersUpdate'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UsersUpdate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    #[OA\Patch(
        path: '/api/v1/admin/users/{id}',
        summary: 'Update user',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'User ID', required: true, schema: new OA\Schema(type: 'string')),
        ],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/UsersUpdate'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UsersUpdate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function update(Request $request, string $id) {
        $input = $request->input('data', $request->all());
        $isPatch = $request->isMethod('PATCH');

        $validator = Validator::make($input, [
            'name'     => $isPatch ? 'sometimes|string' : 'required|string',
            'email'    => $isPatch ? 'sometimes|email|unique:users,email,' . $id : 'required|email|unique:users,email,' . $id,
            'password' => $isPatch ? 'sometimes|string|min:6' : 'nullable|string|min:6',
            'address'  => $isPatch ? 'sometimes|string' : 'required|string',
            'phone'    => $isPatch ? 'sometimes|string' : 'required|string',
            'bio'      => $isPatch ? 'sometimes|string' : 'required|string',
            'role_id'  => $isPatch ? 'sometimes|integer|exists:roles,id' : 'required|integer|exists:roles,id',
        ], [
            'name.required'    => 'Name is required',
            'name.string'      => 'Name must be a string',
            'email.required'   => 'Email is required',
            'email.email'      => 'Email must be a valid email',
            'email.unique'     => 'Email already exists',
            'password.string'  => 'Password must be a string',
            'password.min'     => 'Password must be at least 6 characters long',
            'address.required' => 'Address is required',
            'address.string'   => 'Address must be a string',
            'phone.required'   => 'Phone is required',
            'phone.string'     => 'Phone must be a string',
            'bio.required'     => 'Bio is required',
            'bio.string'       => 'Bio must be a string',
            'role_id.required' => 'Role is required',
            'role_id.integer'  => 'Role must be an integer',
            'role_id.exists'   => 'Role must exist',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $user = $this->userService->searchById($id);
        if (Gate::denies('update', $user)) {
            throw new AuthorizationException("You don't have permission to update this user");
        }

        $this->userService->update($id, $input);

        return UsersUpdate::make(["message" => "Update user success"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(
        path: '/api/v1/admin/users/{id}',
        summary: 'Delete user',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'User ID', required: true, schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UsersDelete'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function destroy(string $id) {
        $user = $this->userService->searchById($id);
        if (Gate::denies('delete', $user)) {
            throw new AuthorizationException("You don't have permission to delete this user");
        }

        $this->userService->delete($id);

        return UsersDelete::make(["message" => "Delete user success"]);
    }

}
