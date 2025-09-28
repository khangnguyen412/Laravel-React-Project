<?php
namespace App\Service\Response;

class ErrorResponse
{
    public static function getErrorResponse($code = 500, $errorsCode = "SERVER_ERROR", $message, $data = null)
    {
        return response()->json([
            'errorCode'    => $errorsCode,
            'errorMessage' => $message,
            'data'         => $data,
        ], $code, [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}