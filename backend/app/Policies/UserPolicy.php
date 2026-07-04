<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

use App\Models\ModelsUsers;

class UserPolicy {
    use HandlesAuthorization;

    /**
     * 
     */
    public function update(ModelsUsers $currentUser, ModelsUsers $tagetUser): bool {
        /**
         * Check if the current user is the target user, return true if it is
         */
        if ($currentUser->getAttribute('uuid') === $tagetUser->getAttribute('uuid')) {
            return true;
        }

        /**
         * get the current user role max level and target user role max level
         */
        $currentLevel = $currentUser->roles()->pluck('level');
        $targetLevel = $tagetUser->roles()->pluck('level');

        /**
         * Check if the current user is the target user, return false if it is
         */
        if ($currentLevel->isEmpty() || $targetLevel->isEmpty()) {
            return false;
        }

        /**
         * Check if the current user role level is greater than the target user role level
         */
        return $currentLevel->max() > $targetLevel->max();
    }

    /**
     * Check if the current user has permission to delete the target user
     */
    public function delete(ModelsUsers $currentUser, ModelsUsers $targetUser): bool {
        if ($currentUser->getAttribute('uuid') === $targetUser->getAttribute('uuid')) {
            return false;
        }

        /**
         * get the current user role max level and target user role max level
         */
        $currentLevel = $currentUser->roles()->pluck('level');
        $targetLevel = $targetUser->roles()->pluck('level');

        /**
         * Check if the current user is the target user, return false if it is
         */
        if ($currentLevel->isEmpty() || $targetLevel->isEmpty()) {
            return false;
        }

        /**
         * Check if the current user role level is greater than the target user role level
         */
        return $currentLevel->max() > $targetLevel->max();
    }

    /**
     * 
     */
    public function assignRole(ModelsUsers $currentUser, ModelsUsers $targetUser, int $roleId): bool {
        if (!$currentUser->roles) {
            return false;
        }

        return true;
    }

}