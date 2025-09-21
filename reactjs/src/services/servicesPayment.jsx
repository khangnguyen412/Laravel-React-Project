/* eslint-disable */
import { postRequest } from './axios';

export const Payment = async () => {
    try {
        return await postRequest('/stripe-checkout', {  });
    } catch (error) {
        throw error
    }
}
