/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
 */
import { Login, Logout, UserProfile, CheckAuth } from "../../services/servicesAuth";

/**
 * Models
 */
import LoginModel from "../../models/login";

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
        } catch (err) {
            return rejectWithValue(err.errorMessage || "Logout Failed");
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
        } catch (err) {
            rejectWithValue(err.errorMessage || "Check Auth Failed")
        }
    }
)


export const GetProfileThunk = createAsyncThunk(
    'auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Coundn't take token");
            }
            const response = await UserProfile(token);
            return { profile: response.profile };
        } catch (err) {
            rejectWithValue(err.errorMessage || "Get Profile Failed")
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
        authenticated: null,
        checked: false,
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
            .addCase(CheckAuthThunk.fulfilled, (state, action) => {
                state.checked = true;
                state.authenticated = action.payload?.profile !== null ?? false;
            })
            .addCase(GetProfileThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload?.profile ?? null;
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