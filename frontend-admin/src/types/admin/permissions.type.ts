/**
 * Ant
 */
import type { PaginationResponse, PaginationRequest, PaginationAnt } from '@/types/common.type';

export interface Permission {
    id?: number;
    name?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type PermissionSearch = PaginationAnt & Permission

export type PermissionSearchRequest = PaginationRequest & Permission

export type PermissionSearchResponse = {
    data: Permission[];
    meta: PaginationResponse;
}

export type PermissionByIDResponse = {
    data: Permission;
};