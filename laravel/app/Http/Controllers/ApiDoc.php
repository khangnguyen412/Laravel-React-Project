<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenApi\Attributes as OA;


#[OA\Info(version: "1.0.0", title: "My Laravel API")]
#[OA\Server(url: "{host}", description: "API Server", variables: [
    new OA\ServerVariable(serverVariable: "host", default: "http://localhost:8000")
])]
#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
)]
class ApiDoc extends Controller
{
}