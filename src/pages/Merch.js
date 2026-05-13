import React, { useState } from "react";
import "../Merch.css";

const Merch = () => {
    const [cartOpen, setCartOpen] = useState(false);

    // Temporary placeholder cart items
    const cartItems = [];
    //     {
    //         id: 1,
    //         name: "OG Zinnati Logo Tee",
    //         size: "M",
    //         quantity: 1,
    //         price: 30,
    //     },
    //     {
    //         id: 2,
    //         name: "Zinnati Hat",
    //         size: "-",
    //         quantity: 1,
    //         price: 15,
    //     },
    // ];

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="merch-page">
            {/* Header */}
            <h1>Shop Merch</h1>

            <img
                src="/covers/sub-header-option-3.jpg"
                alt="header"
                className="merch-page-image"
            />

            <p>Under Construction... Coming Soon.</p>

            {/* Floating Cart Button */}
            <button
                className="cart-button"
                onClick={() => setCartOpen(true)}
            >
                <img
                    src="/covers/cart-image-1.jpg"
                    alt="cart-image"
                    style={{ maxWidth: "50px" }}
                >
                </img>
                <div>[{cartItems.length}]</div>
            </button>

            {/* Overlay */}
            {cartOpen && (
                <div
                    className="cart-overlay"
                    onClick={() => setCartOpen(false)}
                />
            )}

            {/* Sliding Cart */}
            <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
                <div className="cart-header">
                    <h2>Your Cart</h2>

                    <button
                        className="close-cart"
                        onClick={() => setCartOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <h3>Cart Empty</h3>
                            <p>Time to Fill It Up.</p>
                            <img
                                src="/covers/cart-image-2.jpg"
                                alt="cart-image-2"
                                style={{ maxWidth: "130px", borderRadius: "10px" }}
                            >
                            </img>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image-placeholder" />

                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Size: {item.size}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>${item.price}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <h3>Subtotal: ${subtotal}</h3>

                    <button className="checkout-button">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Merch;