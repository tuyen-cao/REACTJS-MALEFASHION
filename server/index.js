const express = require('express');
const app = express()
require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(cors())

app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body
    console.log(amount)
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method: id,
            confirmation_method: 'manual',
            confirm: true
        });
        console.log("Payment", payment)
        res.json({
            message: "Successful",
            success: true
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            message: "Failed",
            success: false
        })
    }
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const { currency, amount } = req.body;
        console.log(amount)
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
        console.log(paymentIntent.client_secret)
    } catch (error) {
        console.log("error", error)
        res.json({
            message: "Failed",
            success: false
        })
    }
});
const PORT = 4000
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));