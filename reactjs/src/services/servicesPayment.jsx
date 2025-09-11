/* eslint-disable */
import axios from 'axios';
import { API_URL } from '../Config';

export const Payment = async () => {
    const response = await axios.post(`${API_URL}/stripe-checkout`)
    if (!response.data) throw new Error("Coundn't take response");
    return response.data.intent.client_secret
}
