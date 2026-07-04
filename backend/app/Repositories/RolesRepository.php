<?php
namespace App\Repositories;

/**
 * Illuminate
 */
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Models
 */
use App\Models\ModelsRoles;

/**
 * Interface 
 */
use App\Repositories\Interface\RoleRepositoryInterface;

class RolesRepository extends BasesRepository implements RoleRepositoryInterface {
    protected $model;

    public function __construct(ModelsRoles $model) {
        $this->model = $model;
    }

    /**
     * Get default role id
     * @return int|null
     */
    public function getDefaultRoleId(): ?int {
        $role = $this->model->orderBy('level', 'asc')->first();
        if (!$role) {
            throw new ModelNotFoundException("Default role not found");
        }
        return $role->getAttribute('id');
    }

    /**
     * Get role list
     * @return object|null
     */
    public function search(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator {
        /**
         * Create query instance
         */
        $query = $this->model->newQuery();
        if (filled($name)) {
            $query->where('name', 'like', "%{$name}%");
        }
        if (filled($description)) {
            $query->where('description', 'like', "%{$description}%");
        }
        return $query->paginate($perPage, ['*'], 'page', $currentPage);
    }

    /**
     * Get role by id
     */
    public function searchById(string $id): ?ModelsRoles {
        $role = $this->model->with('permissions')->find($id);
        if (!$role) {
            throw new ModelNotFoundException("Role not found");
        }
        return $role;
    }

    /**
     * Count user by role id
     */
    public function countUserById(string $roleId): Collection {
        $query = $this->model->select("roles.name as role_name", DB::raw("count(users.uuid) as total_user"))
            ->leftJoin("users", "roles.id", "=", "users.role_id")
            ->groupBy("roles.id", "roles.name")
            ->orderByDesc("total_user");
        if (filled($roleId)) {
            $query->having("roles.id", "=", $roleId);
        }
        return $query->get();
    }

    /**
     * Create role
     */
    public function create(string $name, string $description, array $permissions): ?ModelsRoles {
        $role = $this->model->create([
            'name'        => $name,
            'description' => $description,
        ]);
        $role->permissions()->sync($permissions);
        return $role->load(['permissions']);
    }

    /**
     * Update role
     */
    public function update(string $id, string $name, string $description, array $permissions): ?bool {
        $role = $this->searchById($id);
        $isUpdated = $role->update([
            'name'        => $name ?? $role->getAttribute('name'),
            'description' => $description ?? $role->getAttribute('description'),
        ]);
        if (filled($permissions)) {
            $role->permissions()->sync($permissions);
        }
        return $isUpdated;
    }

    /**
     * Delete role
     */
    public function delete(string $id): bool {
        $role = $this->searchById($id);
        $role->permissions()->detach();
        $role->delete();
        return true;
    }

}