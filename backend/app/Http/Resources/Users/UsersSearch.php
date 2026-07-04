<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersSearch extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            "id"                => $this["uuid"],
            "user_name"         => $this["user_name"],
            "display_name"      => $this["display_name"],
            "email"             => $this["email"],
            "email_verified_at" => $this["email_verified_at"],
            "address"           => $this["address"],
            "phone"             => $this["phone"],
            "bio"               => $this["bio"],
            "avatar"            => $this["avatar"],
            "deleted_at"        => $this["deleted_at"],
            "created_at"        => $this["created_at"],
            "updated_at"        => $this["updated_at"],
            "role"             => $this->whenLoaded("roles", fn() => ([
                "id"          => $this["roles"]["id"],
                "name"        => $this["roles"]["name"],
                "description" => $this["roles"]["description"],
            ])),
        ];
    }
}
