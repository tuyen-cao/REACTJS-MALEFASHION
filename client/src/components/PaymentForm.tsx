import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import { useTypedSelector } from "store";
import { getBillingInfo, getPromo } from "reducers/paymentReducer";
import { selectedProducts } from "reducers/productsReducer";
import { ERRORTYPES } from "constants/card.constatnt";



const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const discount = useTypedSelector(getPromo);
    const billingInfo = useTypedSelector(getBillingInfo);
    const products = useTypedSelector(selectedProducts)

    const [message, setMessage] = useState<string | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("CREDIT CART:Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    useEffect(() => {
        !isLoading  && localStorage.setItem("payment", JSON.stringify({ products, discount, billingInfo, message }))
    }, [isLoading])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/shop/completion`
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === ERRORTYPES.CARD_ERROR || error.type === ERRORTYPES.VALIDATION_ERROR) {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);


    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (

        <>

            <section className="checkout spad">
                <div className="container">
                    <form id="payment-form" onSubmit={handleSubmit}>
                        <PaymentElement id="payment-element" />
                        <button disabled={isLoading || !stripe || !elements} id="submit">
                            <span id="button-text">
                                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                            </span>
                        </button>
                        {/* Show any error or success messages */}
                        {message && <div id="payment-message">{message}</div>}
                    </form>
                </div>
            </section>
        </>
    )
}

export default PaymentForm
