<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelsRoles extends Model
{
    use HasFactory;
    protected $table = "roles";
    protected $fillable = [
        "name",
        "guard_name",
    ];
    protected $hidden = [
        "created_at",
        "updated_at",
    ];

    public function users(){
        return $this->hasMany(ModelsUsers::class,"role_id","id");
    }
}
