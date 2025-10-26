<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use OpenApi\Attributes as OA;

class ModelsUsers extends Authenticatable implements JWTSubject {

	use HasFactory, Notifiable, HasUuids, SoftDeletes;
	public $incrementing = false;
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
		return $this->belongsTo( ModelsRoles::class, "role_id", "id" );
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
