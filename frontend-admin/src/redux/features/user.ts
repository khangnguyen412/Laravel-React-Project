/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Services
 */
import { GetUser, GetUserByID } from '@/services/servicesUsers';

/**
 * Type
 */
import type { Users, UsersSearchRequest } from '@/types/admin/users.type';
import type { ErrorType } from '@/types/error.type';

type UserAdminListState = {
    data?: Users[] | Users;
    loading: boolean;
    error?: any;
}

export const GetUserListAdminThunk = createAsyncThunk<{ data: any }, UsersSearchRequest, { rejectValue: ErrorType }>(
    'user/getUserListAdmin',
    async (params: UsersSearchRequest, { rejectWithValue }) => {
        try {
            const response = await GetUser(params);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get User List Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const GetUserIDAdminThunk = createAsyncThunk<{data: Users}, any, { rejectValue: ErrorType }>(
    'user/getUserIDAdmin',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await GetUserByID(id);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get User ID Failed" };
            return rejectWithValue(errorData);
        }
    }
)

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        data: undefined,
        userData: null,
        loading: false,
        error: null,
    } as UserAdminListState,
    reducers: {},
    extraReducers: (builder) => {
        /**
         * Get User List Admin
         */
        builder.addCase(GetUserListAdminThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(GetUserListAdminThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action?.payload?.data as Users[];
        })
        builder.addCase(GetUserListAdminThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors || "Get User List Failed";
        })

        /**
         * Get User ID Admin
         */
        builder.addCase(GetUserIDAdminThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetUserIDAdminThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action?.payload?.data as Users;
        })
        builder.addCase(GetUserIDAdminThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors || "Get User ID Failed";
        })
    }
})
export default UserSlice.reducer;