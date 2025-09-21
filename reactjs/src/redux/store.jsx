/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './features/auth';
import UserSlice from './features/user';
import PaymentSlice from './features/payment';

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice,
        payment: PaymentSlice,
    },
});
