/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './features/auth';

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
    },
});
