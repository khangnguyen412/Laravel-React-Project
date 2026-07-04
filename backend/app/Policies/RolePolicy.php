<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

use App\Models\ModelsUsers;
use App\Models\ModelsRoles;


class RolePolicy {
    use HandlesAuthorization;

    /**
     * 
     */
    public function update(ModelsUsers $currentUser, ModelsRoles $tagetUser): bool {
        /**
         * Check if the current user has any level role - return false if it doesn't
         * Check if the target user has any level role - return false if it doesn't
         */
        if ($currentUser->roles()->pluck("level")->isEmpty() || !is_numeric($tagetUser->getAttribute("level"))) {
            return false;
        }

        /**
         * Check if the current user role level is greater than the target user role level
         */
        return $currentUser->roles()->pluck("level")->max() > $tagetUser->getAttribute("level");
    }

    /**
     * Check if the current user has permission to delete the target user
     */
    public function delete(ModelsUsers $currentUser, ModelsRoles $targetUser): bool {
        /**
         * Check if the current user has any level role - return false if it doesn't
         * Check if the target user has any level role - return false if it doesn't
         */
        if ($currentUser->roles()->pluck("level")->isEmpty() || !is_numeric($targetUser->getAttribute("level"))) {
            return false;
        }

        return $currentUser->roles()->pluck("level")->max() > $targetUser->getAttribute("level");
    }

}