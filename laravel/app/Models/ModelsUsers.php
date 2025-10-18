<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use OpenApi\Attributes as OA;

use App\Models\Profiles;


#[OA\Schema(
    schema: "ModelsUsers",
    required: ["id", "name", "email"],
    properties: [
        new OA\Property(property: "id", type: "integer", format: "int64", example: 1),
        new OA\Property(property: "name", type: "string", example: "Nguyen Van A"),
        new OA\Property(property: "email", type: "string", format: "email", example: "a@example.com"),
        new OA\Property(property: "created_at", type: "string", format: "date-time"),
    ],
    type: "object"
)]
class ModelsUsers extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids;
    public $incrementing = false;
    public $softDeletes = true;
    protected $keyType = 'string';
    protected $table = "users";
    protected $fillable = [
        "user_name",
        "display_name",
        "email",
        "email_verified_at",
        "password",
        "address",
        "phone",
        "image",
        "role_id",
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public $timestamps = true;
    

    public function role()
    {
        return $this->belongsTo(ModelsRoles::class, "role_id", "id");
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
