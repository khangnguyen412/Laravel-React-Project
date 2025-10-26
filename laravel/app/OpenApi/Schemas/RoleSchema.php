<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(schema: 'Roles', required: ['role_name'])]
final class RoleSchema {
    #[OA\Property(property: 'id', type: 'integer', example: '1')]
    #[OA\Property(property: 'name', type: 'string', example: 'admin', uniqueItems: true)]
    #[OA\Property(property: 'guard_name', type: 'string', example: 'web' )]
    #[OA\Property(property: 'created_at', type: 'string', format: 'date-time', example: '2023-01-01T00:00:00Z', nullable: true)]
    #[OA\Property(property: 'updated_at', type: 'string', format: 'date-time', example: '2023-01-01T00:00:00Z', nullable: true)]
    public array $dummy = [];
}
