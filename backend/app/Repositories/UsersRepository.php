<?php
namespace App\Repositories;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Models
 */
use App\Models\ModelsUsers;

/**
 * Interface 
 */
use App\Repositories\Interface\UserRepositoryInterface;

class UsersRepository extends BasesRepository implements UserRepositoryInterface {
    protected $model;

    public function __construct(ModelsUsers $model) {
        $this->model = $model;
    }

    /**
     * Get user list
     * @return LengthAwarePaginator|null
     */
    public function search(array $filter): ?LengthAwarePaginator {
        $query = $this->model->query();
        if (!empty($filter['name'])) {
            $query->where('name', 'like', "%{$filter['name']}%");
        }
        if (!empty($filter['email'])) {
            $query->where('email', 'like', "%{$filter['email']}%");
        }

        $query->with('roles');
        return $query->paginate($filter['perPage'] ?? 10, ['*'], $filter['currentPage']);
    }

    /**
     * Find user by email or username
     * @param string $email
     * @param string $username
     * @return ModelsUsers|null
     */
    public function getByEmailOrUserName(?string $email, ?string $username): ?ModelsUsers {
        $user = $this->model->where('email', $email)->orWhere('user_name', $username)->first();
        if (!$user) {
            throw new ModelNotFoundException('User not found');
        }
        return $user;
    }

    /**
     * Find user by uuid
     */
    public function getByUuid(string $uuid): ?ModelsUsers {
        $user = $this->model->find($uuid);
        if (!$user) {
            throw new ModelNotFoundException('User not found');
        }
        return $user;
    }

    /**
     * Find user by email
     * @param string $email
     * @return ModelsUsers|null
     */
    public function getByEmail(string $email): ?ModelsUsers {
        $user = $this->model->where('email', $email)->first();
        if (!$user) {
            throw new ModelNotFoundException('User not found');
        }
        return $user;
    }

    /**
     * Get user profile with roles and permissions
     * @param string $uuid
     * @return ModelsUsers|null
     */
    public function getProfileWithRolesAndPermissions(string $uuid): ?ModelsUsers {
        $user = $this->model->with('roles.permissions')->find($uuid);
        if (!$user) {
            throw new ModelNotFoundException('User not found');
        }
        return $user;
    }

    /**
     * Create user
     * @param array $data
     * @return ModelsUsers|null
     */
    public function create(array $data): ?ModelsUsers {
        $user = $this->model->create($data);
        return $user;
    }

    /**
     * Update user
     * @param string $uuid
     * @param array $data
     * @return bool|null
     */
    public function update(string $uuid, array $data): ?bool {
        $user = $this->getByUuid($uuid);
        return $user->update($data);
    }

    /**
     * Update user password
     * @param string $email
     * @param string $password
     * @return bool|null
     */
    public function updatePassword(string $email, string $password): ?bool {
        $user = $this->getByEmail($email);
        $data = [
            'password'            => $password,
            'password_changed_at' => now(),
        ];

        /**
         * if user table has remember_token column, then set remember_token to null
         */
        if (Schema::hasColumn($user->getTable(), 'remember_token')) {
            $data['remember_token'] = null;
        }
        $user->forceFill($data);
        return $user->save();
    }

    /**
     * Delete user
     * @param string $uuid
     * @return bool|null
     */
    public function delete(string $uuid): ?bool {
        $user = $this->getByUuid($uuid);
        return $user->delete();
    }

}
