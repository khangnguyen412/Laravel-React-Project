<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

/**
 * Policy
 */
use App\Policies\UserPolicy;
use App\Policies\RolePolicy;

/**
 * Models
 */
use App\Models\ModelsUsers;
use App\Models\ModelsRoles;


class AuthServiceProvider extends ServiceProvider {
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        ModelsUsers::class => UserPolicy::class,
        ModelsRoles::class => RolePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void {
        $this->registerPolicies();
    }

}
