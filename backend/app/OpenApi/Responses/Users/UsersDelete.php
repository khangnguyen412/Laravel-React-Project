<?php
namespace App\OpenApi\Responses\Users;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'UsersDelete',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'data', type: 'object', properties: [
                new OA\Property(property: 'message', type: 'string', example: 'User deleted successfully')
            ])
        ]
    )
)]
final class UsersDelete {
}
