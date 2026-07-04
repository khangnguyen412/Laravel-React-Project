<?php

namespace App\Services;

use Exception;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;


/**
 * Models
 */
use App\Models\ModelsUsers;

/****
 * Repository
 */
use App\Repositories\Interface\UserRepositoryInterface;
use App\Repositories\Interface\RoleRepositoryInterface;

/**
 * Interface
 */
use App\Services\Interface\UserServiceInterface;


class UserService implements UserServiceInterface {
    protected UserRepositoryInterface $usersRepository;
    protected RoleRepositoryInterface $rolesRepository;

    public function __construct(UserRepositoryInterface $usersRepository, RoleRepositoryInterface $rolesRepository) {
        $this->usersRepository = $usersRepository;
        $this->rolesRepository = $rolesRepository;
    }

    /**
     * Get user profile
     * @param string $uuid - User uuid
     * @return array
     */
    public function current(string $uuid): object {
        $profile = $this->usersRepository->getProfileWithRolesAndPermissions($uuid);
        if (!$profile) {
            throw new ModelNotFoundException("User not found");
        }
        return $profile;
    }

    /**
     * Search user profile
     * @param object $params - Search params
     * @return LengthAwarePaginator
     */
    public function search(array $params): ?LengthAwarePaginator {
        $paramHash = md5(json_encode($params));
        $cacheKey = "user_search_{$paramHash}";

        return Cache::tags('users')->remember($cacheKey, 300, function () use ($params) {
            $users = $this->usersRepository->search($params);
            return $users;
        });
    }

    /**
     * Get user by id
     * @param string $uuid - User uuid
     * @return object|null - User profile or null
     */
    public function searchById(string $uuid): ?ModelsUsers {
        $paramHash = md5(json_encode($uuid));
        $cacheKey = "user_search_{$paramHash}";

        return Cache::tags('users')->remember($cacheKey, 300, function () use ($uuid) {
            return $this->usersRepository->getByUuid($uuid);
        });
    }

    /**
     * Find user by email
     * @param string $email - User email
     * @return object|null
     */
    public function searchByEmail(string $email): ?ModelsUsers {
        $paramHash = md5(json_encode($email));
        $cacheKey = "user_search_{$paramHash}";

        return Cache::tags('users')->remember($cacheKey, 300, function () use ($email) {
            return $this->usersRepository->getByEmail($email);
        });
    }

    /**
     * Create user
     * @param array $data
     * @return object|null
     */
    public function create(array $data): ?ModelsUsers {
        if (empty($data['uuid'])) {
            $data['uuid'] = Str::uuid();
        }
        if (empty($data['role_id'])) {
            $defaultRoleId = $this->rolesRepository->getDefaultRoleId();
            $data['role_id'] = $defaultRoleId;
        }
        $user = DB::transaction(function () use ($data) {
            return $this->usersRepository->create($data);
        });
        Cache::tags('users')->flush();
        return $user;
    }

    /**
     * Update user
     * @param string $uuid - User uuid
     * @param array $data - User data
     * @return object|null - User profile or null
     */
    public function update(string $uuid, array $data): ?bool {
        $user = DB::transaction(function () use ($uuid, $data) {
            return $this->usersRepository->update($uuid, $data);
        });
        Cache::tags('users')->flush();
        return $user;
    }

    /**
     * Delete user
     * @param string $uuid - User uuid
     * @return bool|null
     */
    public function delete(string $uuid): ?bool {
        $user = DB::transaction(function () use ($uuid) {
            return $this->usersRepository->delete($uuid);
        });
        Cache::tags('users')->flush();
        return $user;
    }

}
