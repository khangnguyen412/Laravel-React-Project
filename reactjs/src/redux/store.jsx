/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '@/redux/features/auth';
import UserSlice from '@/redux/features/user';
import PaymentSlice from '@/redux/features/payment';

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice,
        payment: PaymentSlice,
    },
});
