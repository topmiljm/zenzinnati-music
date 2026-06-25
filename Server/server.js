require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
app.use(cors({ origin: ["https://zenzinnatimusic.vercel.app", "http://localhost:3000"] }));
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
        success_url: "https://zenzinnatimusic.vercel.app/success",
        cancel_url: "https://zenzinnatimusic.vercel.app/merch",
    });

    res.json({ url: session.url });
});

app.post("/api/contact", async (req, res) => {

    const { firstName, lastName, email, subject, message } = req.body;
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.CONTACT_EMAIL,
            reply_to: email,
            subject: `[Website Contact] ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p>${message}</p>
            `,
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(4000, () => console.log("Server running on port 4000"));