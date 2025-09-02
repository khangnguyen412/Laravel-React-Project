/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
*/
import { Login, Logout } from "../../services/services-auth";

export const LoginThunk = createAsyncThunk(
    'auth/Login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await Login(username, password);
            if (response?.status === 200) return response;
            return rejectWithValue(response?.error || "Đăng nhập thất bại");
        } catch (error) {
            return rejectWithValue(error.response.data || "Lỗi Mạng");
        }
    }
)

const LoginSlice = createSlice({
    name: 'auth',
    initialState: {
        profile: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.profile = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload.profile ?? null;
                state.token = action.payload.token ?? null;
            })
            .addCase(LoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;