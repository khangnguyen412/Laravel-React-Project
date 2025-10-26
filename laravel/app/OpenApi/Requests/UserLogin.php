<?php
namespace App\OpenApi\Requests;

use OpenApi\Attributes as OA;

#[OA\RequestBody(
    request: 'UserLogin',
    required: true,
    description: 'User login credentials',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'username or email', type: 'string', example: 'admin | admin@example.com'),
            new OA\Property(property: 'password', type: 'string', example: '123456'),
        ]
    )
)]
final class UserLogin {
}
