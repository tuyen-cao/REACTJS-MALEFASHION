import React, { useEffect } from 'react'
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js"

import { PayPalButtonsComponentOptions } from "@paypal/paypal-js/types/components/buttons";

const PaypalButton: React.FC< { currency: string, showSpinner: boolean, handleClick: () => void }> = (props) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const { currency, showSpinner, handleClick } = props

    let localStorageOrder = localStorage.getItem("orderID");
    const storedorder = localStorageOrder ? JSON.parse(localStorageOrder) : 0;
    const amount = storedorder.discountedTotal > 0
        ? storedorder.total - storedorder.discountedTotal : storedorder.total


    const payPalButtonsComponentOptions: PayPalButtonsComponentOptions = {
        style: { layout: "vertical" },
        createOrder(data, actions) {

            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: amount.toFixed(2).toString()
                        }
                    }
                ]
            });
        },
        onApprove: (data, actions) => {
            /**
             * data: {
             *   orderID: string;
             *   payerID: string;
             *   paymentID: string | null;
             *   billingToken: string | null;
             *   facilitatorAccesstoken: string;
             * }
             */
            return async(actions.order?.capture().then((details) => {
                handleClick()
                let localStoragepayment = localStorage.getItem("payment");
                const storedpayment = localStoragepayment ? JSON.parse(localStoragepayment) : [];
                localStorage.setItem("payment", JSON.stringify({ ...storedpayment, message: "PAYPAL: Payment succeeded!" }))
                alert(
                    "Transaction completed by" +
                    (details?.payer.name?.given_name ?? "No details")
                );

                alert("Data details: " + JSON.stringify(data, null, 2));
            }));

        }
    };

    return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons {...payPalButtonsComponentOptions} />
    </>
    );
}

export default PaypalButton
function async(arg0: Promise<void> | undefined): Promise<void> {
    throw new Error('Function not implemented.');
}
