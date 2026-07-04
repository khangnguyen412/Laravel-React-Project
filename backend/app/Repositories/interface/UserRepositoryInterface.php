<?php
namespace App\Repositories\Interface;

interface UserRepositoryInterface {
    /**
     * Get user list
     * @param array $filter - Search params
     * @return object|null
     */
    public function search(array $filter): ?object;

    /**
     * Find user by email or username
     * @param string $email
     * @param string $username
     * @return object|null
     */
    public function getByEmailOrUserName(?string $email, ?string $username): ?object;

    /**
     * Find user by uuid
     * @param string $uuid - User uuid
     * @return object|null
     */
    public function getByUuid(string $uuid): ?object;

    /**
     * Find user by email
     * @param string $email
     * @return object|null
     */
    public function getByEmail(string $email): ?object;

    /**
     * Get user profile with roles and permissions
     * @param string $uuid
     * @return object|null
     */
    public function getProfileWithRolesAndPermissions(string $uuid): ?object;

    /**
     * Create user
     * @param array $data
     * @return object|null
     */
    public function create(array $data): ?object;

    /**
     * Update user
     * @param string $uuid
     * @param array $data
     * @return bool|null
     */
    public function update(string $uuid, array $data): ?bool;

    /**
     * Update user password
     * @param string $email
     * @param string $password
     * @return bool|null
     */
    public function updatePassword(string $email, string $password): ?bool;

    /**
     * Delete user
     * @param string $uuid
     * @return bool|null
     */
    public function delete(string $uuid): ?bool;
}
