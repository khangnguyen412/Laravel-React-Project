<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException as AuthenticationException;
use Illuminate\Validation\ValidationException as ValidationException;

use App\Service\Response\ErrorResponse;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {});
    }

    public function render($request, Throwable $e){
        // Authentication (401)
        if($e instanceof AuthenticationException){
            return ErrorResponse::getErrorResponse(401, "UNAUTHORIZED", $e->getMessage(), $request);
        }

        // Validation (400)
        if($e instanceof ValidationException){
            return ErrorResponse::getErrorResponse(400, "VALIDATION_ERROR", $e->getMessage(), $request);
        }
    }
}
