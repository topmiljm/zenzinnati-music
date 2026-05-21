require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
                description: `Size: ${item.size || "N/A"} | Color: ${item.color}`,
            },
            unit_amount: item.price * 100, // Stripe uses cents
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        billing_address_collection: "required",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/merch",
    });

    res.json({ url: session.url });
});

app.listen(4000, () => console.log("Server running on port 4000"));