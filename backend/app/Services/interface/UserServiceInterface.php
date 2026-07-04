<?php
namespace App\Services\Interface;

/**
 * Illuminate Package
 */
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Models
 */
use App\Models\ModelsUsers;

interface UserServiceInterface {
    /**
     * Get user profile
     * @param string $uuid - User uuid
     * @return object
     */
    public function current(string $uuid): object;

    /**
     * Search user profile
     * @param object $params - Search params
     * @return LengthAwarePaginator
     */
    public function search(array $params): ?LengthAwarePaginator;

    /**
     * Get user by id
     * @param string $uuid - User uuid
     * @return object|null - User profile or null
     */
    public function searchById(string $uuid): ?ModelsUsers;

    /**
     * Get user by email
     * @param string $email - User email
     * @return object|null - User profile or null
     */
    public function searchByEmail(string $email): ?ModelsUsers;

    /**
     * Create user
     * @param array $data - User data
     * @return object|null - User profile or null
     */
    public function create(array $data): ?object;

    /**
     * Update user
     * @param string $uuid - User uuid
     * @param array $data - User data
     * @return object|null - User profile or null
     */
    public function update(string $uuid, array $data): ?bool;

    /**
     * Delete user
     * @param string $uuid - User uuid
     * @return bool
     */
    public function delete(string $uuid): ?bool;
}
