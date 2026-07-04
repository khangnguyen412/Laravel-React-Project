/**
 * Ant
 */
import type { PaginationResponse, PaginationRequest, PaginationAnt } from '@/types/common.type';


/**
 * Role
 */
import type { Role } from '@/types/admin/roles.type';

export interface Users {
    id?: string;
    user_name?: string;
    display_name?: string;
    email?: string;
    email_verified?: string;
    address?: string;
    phone?: string;
    bio?: string;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    role_id?: number;
    role?: Role | string;
}

export type UsersSearch = PaginationAnt & Users

export type UsersSearchRequest = PaginationRequest & Users

export type UsersSearchResponse = {
    data: Users[];
    meta: PaginationResponse;
}

export type UsersByIDResponse = {
    data: Users;
}
