<?php
namespace App\Http\Response;

use Illuminate\Http\JsonResponse as JsonResponse;

class ApiResponse
{
    protected array $data = [];
    protected int $status = 200;
    protected string $message = "";

    public function setStatus(int $status)
    {
        $this->status = $status;
        return $this;
    }
    
    public function setData(array $data)
    {
        $this->data = $data;
        return $this;
    }

    public static function sendResponse(array $data = [], int $status = 200): JsonResponse
    {
        return response()->json($data, $status, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
    
}