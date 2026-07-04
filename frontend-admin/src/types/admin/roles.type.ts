/**
 * Ant
 */
import type { PaginationAnt, PaginationRequest, PaginationResponse } from '@/types/common.type';

/**
 * Permission
 */
import type { Permission } from '@/types/admin/permissions.type';

export interface Role {
    id?: number;
    name: string;
    description: string;
    permissions?: Permission[] | number[];
    createdAt?: string;
    updatedAt?: string;
}

export type RoleSearch = PaginationAnt & Role

export type RoleSearchRequest = PaginationRequest & Role

export type RoleSearchResponse = {
    data: Role[];
    meta: PaginationResponse;
}