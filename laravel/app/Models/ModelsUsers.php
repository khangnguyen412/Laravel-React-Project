<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Profiles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class ModelsUsers extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    protected $table = 'Users';
    protected $fillable = [
        'user_name',
        'display_name',
        'email',
        'email_verified_at',
        'password',
        'address',
        'phone',
        'image',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public $timestamps = true;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     *  Kết nối quan hệ với bảng Profiles
     *
     * @return void
     */
    public function profiles (){
        return $this->hasOne(Profiles::class, 'id', 'id');
    }
}
