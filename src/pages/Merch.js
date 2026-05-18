import React, { useState } from "react";
import "./Merch.css";

const Merch = () => {
    const [cartOpen, setCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const products = [
        {
            id: 1,
            name: "OG Zinnati Logo Tee",
            price: 30,
            image: "/covers/merch-shirt-1.jpg",
        },
        {
            id: 2,
            name: "Zinnati Hat",
            price: 15,
            image: "/covers/merch-hat-1.jpg",
        },
        {
            id: 3,
            name: "Black Hoodie",
            price: 60,
            image: "/covers/merch-hoodie-1.jpg",
        },
        {
            id: 4,
            name: "Sticker Pack",
            price: 8,
            image: "/covers/merch-sticker-1.jpg",
        },
    ];

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                    size: "M",
                },
            ];
        });
    };

    const increaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity < 5
                                ? item.quantity + 1
                                : 5,
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

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

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-wrapper">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                            />
                        </div>

                        <div className="product-info">
                            <h3>{product.name}</h3>

                            <p>${product.price}</p>

                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart(product)}
                                disabled={cartItems.some(
                                    (item) => item.id === product.id
                                )}
                            >
                                {cartItems.some(
                                    (item) => item.id === product.id
                                ) ? (
                                    <div className="added-btn-content">
                                        <span className="added-text">Added</span>
                                        <img
                                            src="/covers/cart-image-1.jpg"
                                            alt="cart-image"
                                            style={{ maxWidth: "40px" }}
                                            className="added-icon"
                                        />
                                    </div>
                                ) : (
                                    "Add To Cart"
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
                <div>({cartCount})</div>
            </button>

            {/* Overlay */}
            {
                cartOpen && (
                    <div
                        className="cart-overlay"
                        onClick={() => setCartOpen(false)}
                    />
                )
            }

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
                            <p>Time to Fill It Up</p>
                            <img
                                src="/covers/cart-image-2.jpg"
                                alt="cart-image-2"
                                style={{ maxWidth: "130px", borderRadius: "10px" }}
                            >
                            </img>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-image-placeholder" />

                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Size: {item.size}</p>
                                    <p>${item.price}</p>
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-controls-decrease"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            {item.quantity === 1 ? (
                                                "🗑"
                                            ) : (
                                                "-"
                                            )}
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            className="quantity-controls-increase"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <h3>Subtotal: ${subtotal}</h3>
                    <button
                        className="checkout-button"
                        disabled={cartItems.length === 0}
                    >
                        Checkout
                    </button>
                    <button
                        className="clear-cart-btn"
                        onClick={clearCart}
                        disabled={cartItems.length === 0}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Merch;