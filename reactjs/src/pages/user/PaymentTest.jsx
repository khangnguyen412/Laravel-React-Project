/* eslint-disable */
import React, { useEffect, useState } from "react";

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

/**
 *  Services
 */
import { useDispatch } from 'react-redux';
import { GetClientSecretThunk } from '../../redux/features/payment';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const element = useElements();
    const HandleSumbit = async (e) => {
        e.preventDefault()
        if (!stripe || !element) return;

        const response = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: element.getElement(CardElement),
                billing_details: {
                    name: 'John Doe',
                },
            }
        });

        if (response.error) {
            console.count(response.error.message)
        } else {
            if (response.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
            }
        }
    }
    return (
        <form onSubmit={HandleSumbit}>
            <CardElement />
            <button type="submit">Thanh toán</button>
        </form>
    );
}

const PaymentForm = () => {
    const dispatch = useDispatch();
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        (async () => {
            dispatch(GetClientSecretThunk());
            const response = await dispatch(GetClientSecretThunk()).unwrap();
            setClientSecret(response)
        })();
    }, []);

    return (
        <div>
            {/* Hiển thị Stripe Elements */}
            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
            )}
        </div>
    );
};

const PaymentPage = () => {
    return (
        <React.Fragment>
            <main>
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            </main>
        </React.Fragment>
    )
}

export default PaymentPage;