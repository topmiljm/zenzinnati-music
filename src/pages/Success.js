import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("cartItems");
    }, []);

    return (
        <div className="success-page">
            <h1>Order Confirmed!</h1>
            <img
                src="/covers/cart-image-1.jpg"
                alt="cart-image"
                style={{ maxWidth: "50px" }}
            >
            </img>
            <p>Thanks for your purchase. You will receive a confirmation email shortly.</p>
            <button onClick={() => navigate("/merch")}>Back To Merch</button>
        </div>
    );
};

export default Success;