/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
 */
import { Login, Logout, CheckAuth } from "@/services/servicesAuth";

/**
 * Models
 */
import LoginModel from "@/models/login";

export const LoginThunk = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            let payload = new LoginModel().getLoginData(username, password);
            const response = await Login(payload);
            return { token: response.token, profile: response.profile };
        } catch (error) {
            return rejectWithValue(error?.errorMessage || "Login Failed");
        }
    }
)

export const LogoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")
            const response = await Logout(token);
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            return response;
        } catch (error) {
            return rejectWithValue(error?.errorMessage || "Logout Failed");
        }
    }
)

export const CheckAuthThunk = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found")
                return;
            }
            const response = await CheckAuth(token);
            return { authenticated: response?.profile !== null };
        } catch (error) {
            return rejectWithValue(error?.errorMessage || "Check Auth Failed")
        }
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        profile: null,
        token: null,
        loading: false,
        error: null,
        status: 'idle',
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
            .addCase(CheckAuthThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(CheckAuthThunk.fulfilled, (state, action) => {
                state.status = action?.payload === undefined ? 'unauthorized' : (action?.payload?.authenticated ?? 'authorized');
            })
            .addCase(CheckAuthThunk.rejected, (state, action) => {
                state.status = 'unauthorized';
            })
            .addCase(LogoutThunk.fulfilled, (state) => {
                state.profile = null;
                state.token = null;
                state.error = null;
            })
            .addCase(LoginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload?.profile ?? null;
                state.token = action.payload.token ?? null;
            })
            .addCase(LoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;