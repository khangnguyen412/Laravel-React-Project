<?php
namespace App\OpenApi\Responses\Users;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'UserLogout',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'message', type: 'string', example: 'Logout Successfully')
        ]
    )
)]
final class UserLogout {
}
