/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
*/
import { Login, Logout, UserProfile } from "../../services/services-auth";

export const LoginThunk = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await Login(username, password);
            if (response?.status === 200) return response;
            return rejectWithValue(response?.error || "Login Failed");
        } catch (error) {
            return rejectWithValue(error.message|| "Login Failed");
        }
    }
)

export const LogoutThunk = createAsyncThunk(
    'auth/logout',
    async(_, {rejectWithValue}) => {
        try{
            const response = await Logout();
            return response;
        }catch(err){
            rejectWithValue(err.message || "Logout Failed")
        }
    }
)

export const GetProfileThunk = createAsyncThunk(
    'auth/profile',
    async(_, {rejectWithValue}) => {
        try{
            const response = await UserProfile();
            return response;
        }catch(err){
            rejectWithValue(err.message || "Get Profile Failed")
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