<?php
namespace App\OpenApi\Responses\Exceptions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "Exception401",
    description: "Unauthorized",
    content: new OA\JsonContent(ref: '#/components/schemas/Exception')
)]
final class Exception401 {}
