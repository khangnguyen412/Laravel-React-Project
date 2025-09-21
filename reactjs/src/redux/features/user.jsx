/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetUserListAdmin, GetUserIDAdmin } from '../../services/servicesUsers';

export const GetUserListAdminThunk = createAsyncThunk(
    'user/getUserListAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserListAdmin(token);
            return { data: response.users_list };
        } catch (err) {
            rejectWithValue(err.message || "Get User List Failed")
        }
    }
)

export const GetUserIDAdminThunk = createAsyncThunk(
    'user/getUserIDAdmin',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserIDAdmin(token, id);
            return { data: response.data };
        } catch (err) {
            rejectWithValue(err.message || "Get User ID Failed")
        }
    }
)

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        userAdminList: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUserListAdminThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUserListAdminThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userAdminList = action.payload.data;
            })
            .addCase(GetUserListAdminThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetUserIDAdminThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetUserIDAdminThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userAdminList = action.payload.data;
            })
            .addCase(GetUserIDAdminThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default UserSlice.reducer;