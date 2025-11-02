<?php
namespace App\OpenApi\Responses\Exceptions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "Exception404",
    description: "Not Found",
    content: new OA\JsonContent(ref: '#/components/schemas/Exception')
)]
final class Exception404 {}
