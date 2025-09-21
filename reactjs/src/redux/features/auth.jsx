/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
*/
import { Login, Logout, UserProfile, CheckAuth } from "../../services/servicesAuth";

const IsEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

export const LoginThunk = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            let payload = IsEmail(username) ? { email: username, password } : { username, password };
            const response = await Login(payload);
            if (response?.status === 200) {
                return { data: response.data, token: response.token , profile: response.profile};
            } else {
                return rejectWithValue(response?.error || "Login Failed");
            }
        } catch (error) {
            return rejectWithValue(error?.error || "Login Failed");
        }
    }
)

export const LogoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")
            const response = await Logout(token);
            if (response?.status === 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
            } else {
                return rejectWithValue(response.message || "Logout Failed");
            }
            return response;
        } catch (err) {
            return rejectWithValue(err.message || "Logout Failed");
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
            if (response?.status !== 200) {
                await Logout();
                return rejectWithValue("Token invalid");
            }
            return { status: response.status, profile: response.profile };
        } catch (err) {
            rejectWithValue(err.message || "Check Auth Failed")
        }
    }
)


export const GetProfileThunk = createAsyncThunk(
    'auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Coundn't take userprofile");
            }
            const response = await UserProfile(token);
            if (response?.status !== 200) {
                return rejectWithValue("Coundn't take userprofile");
            }
            return { status: response.status, profile: response.profile };
        } catch (err) {
            rejectWithValue(err.message || "Get Profile Failed")
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
                state.authenticated = action.payload?.status === 200 ?? false;
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