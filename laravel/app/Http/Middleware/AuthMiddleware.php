<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use App\Models\ModelsUsers;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json([
                'error' => 'Không có token'
            ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }

        $hash_token = hash('sha256', $token);
        $user = ModelsUsers::where('api_token', $hash_token)->first();

        if (!$user) {
            return response()->json([
                'error' => 'Token ko hợp lệ',
            ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }

        $request->setUserResolver(fn() => $user);
        return $next($request);
    }
}
/*

 */