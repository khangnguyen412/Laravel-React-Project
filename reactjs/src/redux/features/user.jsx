/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetUserList, GetUserID } from "@/services/servicesUsers";

export const GetUserListThunk = createAsyncThunk(
    'user/getUserList',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserList(token);
            return { data: response.users_list };
        } catch (err) {
            return rejectWithValue(err?.errorMessage || "Get User List Failed")
        }
    }
)

export const GetUserIDThunk = createAsyncThunk(
    'user/getUserID',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserID(token, id);
            return { data: response.data };
        } catch (err) {
            return rejectWithValue(err?.errorMessage || "Get User ID Failed")
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
            .addCase(GetUserListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUserListThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userAdminList = action.payload.data;
            })
            .addCase(GetUserListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetUserIDThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetUserIDThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userAdminList = action.payload.data;
            })
            .addCase(GetUserIDThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default UserSlice.reducer;