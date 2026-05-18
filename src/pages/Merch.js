import React, { useState } from "react";
import "./Merch.css";

const Merch = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cooldowns, setCooldowns] = useState({});

    const products = [
        {
            id: 1,
            name: "Zen Zinnati Logo Tee style 1",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["White", "Black", "Red", "Blue"],
            defaultColor: "White",
            image: "/covers/merch-tee-1.jpg",
        },
        {
            id: 2,
            name: "Zen Zinnati Logo Tee style 2",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["White", "Black", "Red", "Blue"],
            defaultColor: "Black",
            image: "/covers/merch-tee-2.jpg",
        },
        {
            id: 3,
            name: "Zen Zinnati Logo Tee style 3",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["White", "Black", "Red", "Blue"],
            defaultColor: "Blue",
            image: "/covers/merch-tee-3.jpg",
        },
        {
            id: 4,
            name: "Zen Zinnati Logo Tee style 4",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["White", "Black", "Red", "Blue"],
            defaultColor: "Blue",
            image: "/covers/merch-tee-4.jpg",
        },
        {
            id: 5,
            name: "Zen Zinnati Logo Tee style 5",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["White", "Black", "Red", "Blue"],
            defaultColor: "Red",
            image: "/covers/merch-tee-5.jpg",
        },
        {
            id: 6,
            name: "Zen Zinnati Logo Hat",
            price: 25,
            hasSizes: false,
            colors: ["White", "Black", "Beige",],
            defaultColor: "Beige",
            image: "/covers/merch-hat-1.jpg",
        },
    ];

    const [selectedColors, setSelectedColors] = useState(
        Object.fromEntries(products.map((p) => [p.id, p.defaultColor]))
    );

    const [selectedSizes, setSelectedSizes] = useState(
        Object.fromEntries(products.map((p) => [p.id, p.defaultSize]))
    );

    const addToCart = (product, size, color) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item.id === product.id && item.size === size && item.color === color
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id && item.size === size && item.color === color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prev,
                { ...product, quantity: 1, size: size, color: color },
            ];
        });

        setCooldowns((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setCooldowns((prev) => ({ ...prev, [product.id]: false }));
        }, 2000);
    };

    const increaseQuantity = (index) => {
        setCartItems((prev) =>
            prev.map((item, i) =>
                i === index
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

    const decreaseQuantity = (index) => {
        setCartItems((prev) =>
            prev
                .map((item, i) =>
                    i === index
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
                            <div className="product-selects">
                                {product.hasSizes && (
                                    <select
                                        className="product-select"
                                        value={selectedSizes[product.id]}
                                        onChange={(e) => setSelectedSizes((prev) => ({ ...prev, [product.id]: e.target.value }))}
                                    >
                                        {product.sizes.map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                )}

                                <select
                                    className="product-select"
                                    value={selectedColors[product.id]}
                                    onChange={(e) => setSelectedColors((prev) => ({ ...prev, [product.id]: e.target.value }))}
                                >
                                    {product.colors.map((color) => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>
                            <p>${(product.price).toFixed(2)}</p>

                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart(product, selectedSizes[product.id], selectedColors[product.id])}
                                disabled={cooldowns[product.id]}
                            >
                                {cooldowns[product.id] ? (
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
                                    {item.size && <p>Size: {item.size}</p>}
                                    <p>Color: {item.color}</p>
                                    <p>${(item.price).toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-controls-decrease"
                                            onClick={() => decreaseQuantity(index)}
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
                                            onClick={() => increaseQuantity(index)}
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
                    <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
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