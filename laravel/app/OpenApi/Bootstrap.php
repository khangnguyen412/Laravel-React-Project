<?php
namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(version: '1.0.0', title: 'CMS Project API')]
#[OA\Server(url: 'http://localhost:8000', description: 'API Server')]
#[OA\SecurityScheme(securityScheme: 'bearerAuth', type: 'http', scheme: 'bearer', bearerFormat: 'JWT')]
final class Bootstrap {}