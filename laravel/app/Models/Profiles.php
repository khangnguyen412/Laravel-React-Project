<?php

namespace App\Models;

use App\Models\Users;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Profiles extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'bio',
        'avatar',
        'user_id'
    ];
    protected $hidden = [];
    public $timestamps = true;

    /**
     *  Kết nối quan hệ với bảng User
     *
     * @return void
     */
    public function users() {
        return $this->belongsTo(Users::class, 'user_id', 'id');
    }
}
