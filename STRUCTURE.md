# Project structure 
```
LaraStackCMS
├─ .dockerignore
├─ backend
│  ├─ .editorconfig
│  ├─ .env
│  ├─ .env.example
│  ├─ app
│  │  ├─ Console
│  │  │  └─ Kernel.php
│  │  ├─ Contracts
│  │  │  └─ PaymentGateway.php
│  │  ├─ Exceptions
│  │  │  └─ Handler.php
│  │  ├─ Http
│  │  │  ├─ Controllers
│  │  │  │  ├─ Controller.php
│  │  │  │  ├─ ControllerAuth.php
│  │  │  │  ├─ ControllerPermissions.php
│  │  │  │  ├─ ControllerRoles.php
│  │  │  │  ├─ ControllerUsers.php
│  │  │  │  ├─ PaymentIntegration.md
│  │  │  │  └─ Payments
│  │  │  │     ├─ PaymentStripe.php
│  │  │  │     └─ PaymentVnPay.php
│  │  │  ├─ Kernel.php
│  │  │  ├─ Middleware
│  │  │  │  ├─ Authenticate.php
│  │  │  │  ├─ AuthMiddleware.php
│  │  │  │  ├─ CheckJwtFormCookie.php
│  │  │  │  ├─ CheckPermissionMiddleware.php
│  │  │  │  ├─ EncryptCookies.php
│  │  │  │  ├─ PreventRequestsDuringMaintenance.php
│  │  │  │  ├─ RedirectIfAuthenticated.php
│  │  │  │  ├─ TrimStrings.php
│  │  │  │  ├─ TrustHosts.php
│  │  │  │  ├─ TrustProxies.php
│  │  │  │  ├─ ValidateSignature.php
│  │  │  │  └─ VerifyCsrfToken.php
│  │  │  ├─ Requests
│  │  │  │  ├─ AuthRequest.php
│  │  │  │  └─ UserRequest.php
│  │  │  └─ Resources
│  │  │     ├─ Auths
│  │  │     │  ├─ AuthsForgotPassword.php
│  │  │     │  ├─ AuthsLogout.php
│  │  │     │  └─ AuthsResetPassword.php
│  │  │     ├─ ErrorsResource.php
│  │  │     ├─ Payments
│  │  │     │  ├─ Stripe.php
│  │  │     │  ├─ VnPayIPN.php
│  │  │     │  └─ VnPayVerify.php
│  │  │     ├─ Permissions
│  │  │     │  ├─ PermissionsCreate.php
│  │  │     │  ├─ PermissionsDelete.php
│  │  │     │  ├─ PermissionsSearch.php
│  │  │     │  └─ PermissionsUpdate.php
│  │  │     ├─ Roles
│  │  │     │  ├─ RolesCreate.php
│  │  │     │  ├─ RolesDelete.php
│  │  │     │  ├─ RolesSearch.php
│  │  │     │  └─ RolesUpdate.php
│  │  │     └─ UsersResource.php
│  │  ├─ Jobs
│  │  │  └─ SendResetPassJob.php
│  │  ├─ Logging
│  │  │  ├─ DiscordHandler.php
│  │  │  ├─ DiscordLogger.php
│  │  │  └─ README.MD
│  │  ├─ Mail
│  │  │  └─ ResetPassMail.php
│  │  ├─ Models
│  │  │  ├─ ModelsPermissions.php
│  │  │  ├─ ModelsRoles.php
│  │  │  ├─ ModelsUsers.php
│  │  │  └─ UserDefault.php
│  │  ├─ Notifications
│  │  │  └─ ResetPasswordQueued.php
│  │  ├─ OpenApi
│  │  │  ├─ Bootstrap.php
│  │  │  ├─ README.md
│  │  │  ├─ Requests
│  │  │  │  ├─ Auths
│  │  │  │  │  ├─ AuthsForgotPassword.php
│  │  │  │  │  ├─ AuthsLogin.php
│  │  │  │  │  └─ AuthsResetPassword.php
│  │  │  │  ├─ Permissions
│  │  │  │  │  ├─ PermissionsCreate.php
│  │  │  │  │  └─ PermissionsUpdate.php
│  │  │  │  ├─ Roles
│  │  │  │  │  ├─ RolesCreate.php
│  │  │  │  │  └─ RolesUpdate.php
│  │  │  │  └─ Users
│  │  │  │     └─ UsersCreate.php
│  │  │  ├─ Responses
│  │  │  │  ├─ Auths
│  │  │  │  │  ├─ AuthsForgotPassword.php
│  │  │  │  │  ├─ AuthsLogin.php
│  │  │  │  │  ├─ AuthsLogout.php
│  │  │  │  │  ├─ AuthsMe.php
│  │  │  │  │  └─ AuthsResetPassword.php
│  │  │  │  ├─ Exceptions
│  │  │  │  │  ├─ Exception400.php
│  │  │  │  │  ├─ Exception401.php
│  │  │  │  │  ├─ Exception404.php
│  │  │  │  │  └─ Exception500.php
│  │  │  │  ├─ Payments
│  │  │  │  │  └─ VnPaysIPN.php
│  │  │  │  ├─ Permissions
│  │  │  │  │  ├─ PermissionsCreate.php
│  │  │  │  │  ├─ PermissionsDelete.php
│  │  │  │  │  ├─ PermissionsGetById.php
│  │  │  │  │  ├─ PermissionsSearch.php
│  │  │  │  │  └─ PermissionsUpdate.php
│  │  │  │  ├─ Roles
│  │  │  │  │  ├─ RolesCreate.php
│  │  │  │  │  ├─ RolesDelete.php
│  │  │  │  │  ├─ RolesGetById.php
│  │  │  │  │  ├─ RolesSearch.php
│  │  │  │  │  └─ RolesUpdate.php
│  │  │  │  └─ Users
│  │  │  │     ├─ UsersCreate.php
│  │  │  │     ├─ UsersGetById.php
│  │  │  │     └─ UsersSearch.php
│  │  │  └─ Schemas
│  │  │     ├─ ExceptionSchema.php
│  │  │     ├─ PermissionSchema.php
│  │  │     ├─ RoleSchema.php
│  │  │     └─ UserSchema.php
│  │  ├─ Policies
│  │  │  ├─ RolePolicy.php
│  │  │  └─ UserPolicy.php
│  │  ├─ Providers
│  │  │  ├─ AppServiceProvider.php
│  │  │  ├─ AuthServiceProvider.php
│  │  │  ├─ BroadcastServiceProvider.php
│  │  │  ├─ EventServiceProvider.php
│  │  │  └─ RouteServiceProvider.php
│  │  ├─ Repositories
│  │  │  ├─ BasesRepository.php
│  │  │  ├─ Interface
│  │  │  │  ├─ BaseRepositoryInterface.php
│  │  │  │  ├─ PermissionRepositoryInterface.php
│  │  │  │  ├─ RoleRepositoryInterface.php
│  │  │  │  └─ UserRepositoryInterface.php
│  │  │  ├─ PermissionsRepository.php
│  │  │  ├─ RolesRepository.php
│  │  │  └─ UsersRepository.php
│  │  └─ Services
│  │     ├─ AuthService.php
│  │     ├─ Interface
│  │     │  ├─ AuthServiceInterface.php
│  │     │  ├─ PermissionServiceInterface.php
│  │     │  ├─ RoleServiceInterface.php
│  │     │  └─ UserServiceInterface.php
│  │     ├─ Payments
│  │     │  └─ VNPayGateway.php
│  │     ├─ PermissionService.php
│  │     ├─ RoleService.php
│  │     └─ UserService.php
│  ├─ artisan
│  ├─ bootstrap
│  │  ├─ app.php
│  │  └─ cache
│  │     ├─ packages.php
│  │     └─ services.php
│  ├─ composer.json
│  ├─ composer.lock
│  ├─ config
│  │  ├─ app.php
│  │  ├─ auth.php
│  │  ├─ broadcasting.php
│  │  ├─ cache.php
│  │  ├─ cors.php
│  │  ├─ database.php
│  │  ├─ filesystems.php
│  │  ├─ hashing.php
│  │  ├─ jwt.php
│  │  ├─ l5-swagger.php
│  │  ├─ logging.php
│  │  ├─ mail.php
│  │  ├─ payment.php
│  │  ├─ queue.php
│  │  ├─ sanctum.php
│  │  ├─ services.php
│  │  ├─ session.php
│  │  └─ view.php
│  ├─ database
│  │  ├─ factories
│  │  │  └─ UserFactory.php
│  │  ├─ migrations
│  │  │  ├─ 0001_01_01_000001_create_cache_table.php
│  │  │  ├─ 2019_12_14_000001_create_personal_access_tokens_table.php
│  │  │  ├─ 2025_10_18_071104_create_permission_table.php
│  │  │  ├─ 2025_10_18_071126_create_roles_table.php
│  │  │  ├─ 2025_10_18_071302_create_roles_has_permissions_table.php
│  │  │  ├─ 2025_10_18_071352_create_users_table.php
│  │  │  ├─ 2025_10_18_071451_create_posts_table.php
│  │  │  ├─ 2025_10_18_071523_create_tags_table.php
│  │  │  ├─ 2025_10_18_071615_create_tag_post_table.php
│  │  │  ├─ 2025_10_18_071642_create_categories_table.php
│  │  │  ├─ 2025_10_18_071742_create_category_post_table.php
│  │  │  ├─ 2025_10_18_071855_create_pages_table.php
│  │  │  ├─ 2025_10_18_071956_create_products_table.php
│  │  │  ├─ 2025_10_18_072024_create_products_taxonomy_table.php
│  │  │  ├─ 2025_10_18_072205_create_products_taxonomy_pivot_table.php
│  │  │  ├─ 2025_10_18_072245_create_meta_data_table.php
│  │  │  ├─ 2025_10_18_072324_create_media_table.php
│  │  │  ├─ 2025_10_18_072346_add_uuid_and_backfill.php
│  │  │  ├─ 2025_10_18_072422_switch_to_uuid_pk_and_fk.php
│  │  │  ├─ 2025_10_18_073543_drop_remembertoken_in_user_table.php
│  │  │  ├─ 2026_02_25_063505_update_user_id.php
│  │  │  ├─ 2026_03_06_024357_update_role_guard_name.php
│  │  │  ├─ 2026_03_06_024551_update_permission_guard_name.php
│  │  │  ├─ 2026_05_12_164642_create_jobs_table.php
│  │  │  ├─ 2026_05_13_063115_create_password_resets_table.php
│  │  │  ├─ 2026_05_23_153153_add_password_changed_at_to_users_table.php
│  │  │  ├─ 2026_05_23_160748_drop_password_resets_table.php
│  │  │  └─ 2026_06_25_163652_add_level_to_roles_table.php
│  │  └─ seeders
│  │     ├─ DatabaseSeeder.php
│  │     ├─ DatabaseSeederPermission.php
│  │     ├─ DatabaseSeederRoleHasPermission.php
│  │     ├─ DatabaseSeederRoles.php
│  │     └─ DatabaseSeederUser.php
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ phpunit.xml
│  ├─ public
│  │  ├─ .htaccess
│  │  ├─ favicon.ico
│  │  ├─ index.php
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ resources
│  │  ├─ css
│  │  │  └─ app.css
│  │  ├─ js
│  │  │  ├─ app.js
│  │  │  └─ bootstrap.js
│  │  └─ views
│  │     ├─ emails
│  │     │  └─ reset_password.blade.php
│  │     ├─ payment.blade.php
│  │     └─ welcome.blade.php
│  ├─ routes
│  │  ├─ api.php
│  │  ├─ channels.php
│  │  ├─ console.php
│  │  ├─ v1
│  │  │  ├─ auth.php
│  │  │  ├─ payment.php
│  │  │  ├─ permissions.php
│  │  │  ├─ roles.php
│  │  │  └─ users.php
│  │  └─ web.php
│  ├─ tests
│  │  ├─ CreatesApplication.php
│  │  ├─ Feature
│  │  │  └─ ExampleTest.php
│  │  ├─ TestCase.php
│  │  └─ Unit
│  │     └─ ExampleTest.php
│  └─ vite.config.js
├─ docker-compose.yml
├─ frontend-admin
│  ├─ .env.example
│  ├─ .env.local
│  ├─ .npmrc
│  ├─ .vite
│  │  └─ deps
│  │     ├─ @reduxjs_toolkit.js
│  │     ├─ @reduxjs_toolkit.js.map
│  │     ├─ antd.js
│  │     ├─ antd.js.map
│  │     ├─ antd_lib_locale_en_US.js
│  │     ├─ antd_lib_locale_en_US.js.map
│  │     ├─ chunk-5WRI5ZAA.js
│  │     ├─ chunk-5WRI5ZAA.js.map
│  │     ├─ chunk-NO6UH6X3.js
│  │     ├─ chunk-NO6UH6X3.js.map
│  │     ├─ chunk-X5EBYUPF.js
│  │     ├─ chunk-X5EBYUPF.js.map
│  │     ├─ package.json
│  │     ├─ react-dom_client.js
│  │     ├─ react-dom_client.js.map
│  │     ├─ react-redux.js
│  │     ├─ react-redux.js.map
│  │     ├─ react-router-dom.js
│  │     ├─ react-router-dom.js.map
│  │     ├─ react.js
│  │     ├─ react.js.map
│  │     ├─ react_jsx-dev-runtime.js
│  │     ├─ react_jsx-dev-runtime.js.map
│  │     └─ _metadata.json
│  ├─ components.json
│  ├─ Dockerfile
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ pnpm-lock.yaml
│  ├─ pnpm-workspace.yaml
│  ├─ postcss.config.js
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  └─ axios.ts
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ assets
│  │  │  ├─ images
│  │  │  │  ├─ logo-icon-white.png
│  │  │  │  ├─ logo-icon.png
│  │  │  │  ├─ screen-full.png
│  │  │  │  ├─ screen-nobg-full.png
│  │  │  │  ├─ screen-nobg-white.png
│  │  │  │  ├─ screen-nobg.png
│  │  │  │  └─ screen.png
│  │  │  └─ scss
│  │  │     ├─ button.scss
│  │  │     ├─ layout
│  │  │     │  └─ header.scss
│  │  │     ├─ loading.scss
│  │  │     ├─ page
│  │  │     │  ├─ dashboard.scss
│  │  │     │  ├─ login.scss
│  │  │     │  ├─ userCreation.scss
│  │  │     │  └─ userList.scss
│  │  │     └─ style.scss
│  │  ├─ components
│  │  │  ├─ Editor
│  │  │  │  ├─ align-toolbar-button.tsx
│  │  │  │  ├─ blockquote-node.tsx
│  │  │  │  ├─ dropdown-menu.tsx
│  │  │  │  ├─ editor-static.tsx
│  │  │  │  ├─ editor.tsx
│  │  │  │  ├─ fixed-toolbar.tsx
│  │  │  │  ├─ heading-node.tsx
│  │  │  │  ├─ hr-node.tsx
│  │  │  │  ├─ mark-toolbar-button.tsx
│  │  │  │  ├─ paragraph-node.tsx
│  │  │  │  ├─ plugins
│  │  │  │  │  └─ basic-blocks-kit.tsx
│  │  │  │  ├─ separator.tsx
│  │  │  │  ├─ toolbar.tsx
│  │  │  │  └─ tooltip.tsx
│  │  │  ├─ Editor.tsx
│  │  │  ├─ Error.tsx
│  │  │  ├─ Layout
│  │  │  │  ├─ AdminLayout.tsx
│  │  │  │  └─ FormLogin.tsx
│  │  │  ├─ Loading.tsx
│  │  │  ├─ Partials
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ ListData.tsx
│  │  │  │  ├─ SideBar.tsx
│  │  │  │  └─ TableData.tsx
│  │  │  └─ Users
│  │  │     ├─ UsersDeleteComfirm.tsx
│  │  │     └─ UsersProfileModal.tsx
│  │  ├─ config
│  │  │  ├─ config.ts
│  │  │  └─ menuItem.tsx
│  │  ├─ constants
│  │  │  ├─ permissions.ts
│  │  │  └─ tagProps.tsx
│  │  ├─ hooks
│  │  │  ├─ dayTime.ts
│  │  │  ├─ useDeviceType.ts
│  │  │  ├─ usePermission.ts
│  │  │  └─ useRole.ts
│  │  ├─ index.css
│  │  ├─ lib
│  │  │  └─ utils.ts
│  │  ├─ logo.svg
│  │  ├─ main.tsx
│  │  ├─ mocks
│  │  │  ├─ mocks.ts
│  │  │  └─ permission
│  │  │     └─ permission.mocks.ts
│  │  ├─ pages
│  │  │  ├─ AppDefault.tsx
│  │  │  ├─ Auths
│  │  │  │  ├─ ForgotPassword.tsx
│  │  │  │  ├─ Login.tsx
│  │  │  │  └─ ResetPassword.tsx
│  │  │  ├─ Component.tsx
│  │  │  ├─ Dashboard.tsx
│  │  │  ├─ Pages.tsx
│  │  │  ├─ Payments
│  │  │  │  └─ PaymentTest.tsx
│  │  │  ├─ Permissions
│  │  │  │  ├─ Permissions.tsx
│  │  │  │  └─ PermissionsSearch.tsx
│  │  │  ├─ Roles
│  │  │  │  ├─ Roles.tsx
│  │  │  │  └─ RolesSearch.tsx
│  │  │  └─ Users
│  │  │     ├─ UsersCreate.tsx
│  │  │     └─ UsersList.tsx
│  │  ├─ redux
│  │  │  ├─ features
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ payment.ts
│  │  │  │  ├─ permission.ts
│  │  │  │  ├─ roles.ts
│  │  │  │  └─ user.ts
│  │  │  ├─ store.ts
│  │  │  └─ types.ts
│  │  ├─ routes
│  │  │  ├─ ProtectedRoute
│  │  │  │  └─ protectedRoute.tsx
│  │  │  └─ route.tsx
│  │  ├─ services
│  │  │  ├─ servicesAuth.ts
│  │  │  ├─ servicesPayment.ts
│  │  │  ├─ servicesPermission.ts
│  │  │  ├─ servicesRole.ts
│  │  │  └─ servicesUsers.ts
│  │  ├─ types
│  │  │  ├─ admin
│  │  │  │  ├─ permissions.type.ts
│  │  │  │  ├─ roles.type.ts
│  │  │  │  └─ users.type.ts
│  │  │  ├─ common.type.ts
│  │  │  ├─ error.type.ts
│  │  │  └─ login.type.ts
│  │  └─ utils
│  │     └─ errorHandler.ts
│  ├─ tailwind.config.js
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ frontend-client
│  ├─ AGENTS.md
│  ├─ CLAUDE.md
│  ├─ eslint.config.mjs
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ file.svg
│  │  ├─ globe.svg
│  │  ├─ next.svg
│  │  ├─ vercel.svg
│  │  └─ window.svg
│  ├─ README.md
│  ├─ src
│  │  └─ app
│  │     ├─ api
│  │     │  ├─ layout.tsx
│  │     │  └─ page.tsx
│  │     ├─ favicon.ico
│  │     ├─ globals.css
│  │     ├─ layout.tsx
│  │     └─ page.tsx
│  └─ tsconfig.json
├─ nginx
│  └─ default.conf
├─ package-lock.json
├─ php
│  └─ php.ini
├─ README.md
├─ start-project-laravel.bat
├─ start-project-reactjs.bat
├─ start-project.bat
├─ start-project.sh
├─ STRUCTURE copy.md
└─ STRUCTURE.md

```