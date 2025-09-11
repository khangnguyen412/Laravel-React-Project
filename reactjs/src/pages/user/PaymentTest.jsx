/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

/**
 *  Services
 */
import { Payment } from "../../services/servicesPayment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


const PaymentForm = () => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        (async () => setClientSecret(await Payment()))();
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

const PaymentPage = () => {
    console.log(process.env.REACT_APP_STRIPE_KEY)
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