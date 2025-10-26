/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Payment } from '../../services/servicesPayment';

export const GetClientSecretThunk = createAsyncThunk(
    'payment/getClientSecret',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Payment();
            return { clientSecret: response.clientSecret };
        } catch (error) {
            return rejectWithValue(error.message || "Get Client Secret Failed")
        }
    }
)

const PaymentSlice = createSlice({
    name: 'payment',
    initialState: {
        clientSecret: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetClientSecretThunk.fulfilled, (state, action) => {
            state.clientSecret = action.payload.clientSecret;
        })
    }
})
export default PaymentSlice.reducer;