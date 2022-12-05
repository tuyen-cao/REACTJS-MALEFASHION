import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "components/PaymentForm";
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, myErrorHandler } from 'utilities/error-boundary-utils'
import PagePreloder from "components/PagePreloder";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const PUBLIC_KEY = "pk_test_51Lx6kmA7e2lr9K2Y0GeZV41MIfic68R6WIDLp0mNro4h7na87pT1AhsiX1NkmQ5ML7qp0wd1LCNGiodYmkyfiyKr00LxT5cX5f"
const stripePromise = loadStripe(PUBLIC_KEY)

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // fetch("/create-payment-intent", {
        fetch("http://localhost:4000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currency: 'usd', amount: 700 }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            })
    }, []);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        ...appearance,
    };


    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
                {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentForm />
                    </Elements>
                )}
                {!stripePromise || !clientSecret &&
                    <PagePreloder />
                }
            </ErrorBoundary>

        </>
    )
}

export default Payment
