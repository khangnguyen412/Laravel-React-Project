/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Service
 */
import { GetPermissionList, GetPermissionByID, CreatePermission, UpdatePermission, DeletePermission } from "@/services/servicesPermission.ts";

/**
 * Type
 */
import type { ErrorType } from "@/types/error.type";
import type { Permission, PermissionSearchRequest, PermissionByIDResponse, PermissionSearchResponse } from "@/types/admin/permissions.type";

export type PermissionState = {
    data: Permission[] | Permission | null;
    total: number;
    loading: boolean;
    error?: ErrorType['errors'] | null;
}

export const GetPermissionsListThunk = createAsyncThunk<PermissionSearchResponse, PermissionSearchRequest, { rejectValue: ErrorType }>(
    'permissions/getPermissionsList',
    async (params, { rejectWithValue }) => {
        try {
            const response = await GetPermissionList(params);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get Permission List Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const GetPermissionByIDThunk = createAsyncThunk<PermissionByIDResponse, number, { rejectValue: ErrorType }>(
    'permission/getPermissionByID',
    async (id, { rejectWithValue }) => {
        try {
            const response = await GetPermissionByID(id);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get PermissionByID Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const CreatePermissionThunk = createAsyncThunk<Permission, Permission, { rejectValue: ErrorType }>(
    'permission/createPermission',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CreatePermission(data);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Create Permission Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const UpdatePermissionThunk = createAsyncThunk<Permission, Permission, { rejectValue: ErrorType }>(
    'permission/updatePermission',
    async (data, { rejectWithValue }) => {
        try {
            const response = await UpdatePermission(data.id, data);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Update Permission Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const DeletePermissionThunk = createAsyncThunk<Permission, number, { rejectValue: ErrorType }>(
    'permission/deletePermission',
    async (id, { rejectWithValue }) => {
        try {
            const response = await DeletePermission(id);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Delete Permission Failed" };
            return rejectWithValue(errorData);
        }
    }
)

const PermissionsSlice = createSlice({
    name: 'permissions',
    initialState: {
        data: null,
        total: 0,
        loading: false,
        error: null,
    } as PermissionState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         * Get Permission List
         */
        builder.addCase(GetPermissionsListThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(GetPermissionsListThunk.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.total = action.payload.meta?.total || 0;
        })
        builder.addCase(GetPermissionsListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors;
        })

        /**
         * Get PermissionByID
         */
        builder.addCase(GetPermissionByIDThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetPermissionByIDThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        builder.addCase(GetPermissionByIDThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.errors;
        })

        /**
         * Create Permission
         */
        builder.addCase(CreatePermissionThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(CreatePermissionThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(CreatePermissionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.errors;
        })

        /**
         * Update Permission
         */
        builder.addCase(UpdatePermissionThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(UpdatePermissionThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(UpdatePermissionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.errors;
        })

        /**
         * Delete Permission
         */
        builder.addCase(DeletePermissionThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(DeletePermissionThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(DeletePermissionThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.errors;
        })
    }
})
export default PermissionsSlice.reducer;
