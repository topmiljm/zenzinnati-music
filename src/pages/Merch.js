import React, { useState, useEffect } from "react";
import "./Merch.css";

const Merch = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("cartItems");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [cooldowns, setCooldowns] = useState({});

    const products = [
        {
            id: 1,
            name: "Zen Zinnati - 'i am Zen' Design T-Shirt",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["White", "Black"],
            defaultColor: "Black",
            images: {
                White: [
                    "/covers/tee-1-white.png",
                    "/covers/tee-1-white-back.png"
                ],
                Black: [
                    "/covers/tee-1-black.png",
                    "/covers/tee-1-black-back.png"
                ]
            },
        },
        {
            id: 2,
            name: "Zen Zinnati - 'Like Circles' Design T-Shirt",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["Red"],
            defaultColor: "Red",
            images: {
                Red: [
                    "/covers/tee-2-red.png",
                    "/covers/tee-2-red-back.png"
                ],
            }
        },
        {
            id: 3,
            name: "Zen Zinnati - 'All Shapes & Sizes' Design T-Shirt",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["Green"],
            defaultColor: "Green",
            images: {
                Green: [
                    "/covers/tee-3-green.png",
                    "/covers/tee-3-green-back.png"
                ],
            }
        },
        {
            id: 4,
            name: "Zen Zinnati - 'Just Ride The Wave' Design T-Shirt",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["Blue"],
            defaultColor: "Blue",
            images: {
                Blue: [
                    "/covers/tee-4-blue.png",
                    "/covers/tee-4-blue-back.png"
                ],
            }
        },
        {
            id: 5,
            name: "Zen Zinnati - 'Balls of Steel' Design T-Shirt",
            price: 30,
            hasSizes: true,
            sizes: ["S", "M", "L", "XL"],
            defaultSize: "M",
            colors: ["Purple"],
            defaultColor: "Purple",
            images: {
                Purple: [
                    "/covers/tee-5-purple.png",
                    "/covers/tee-5-purple-back.png"
                ],
            }
        },
        {
            id: 6,
            name: "Zen Zinnati - Adjustable Size Hat (Velcro)",
            price: 25,
            hasSizes: false,
            colors: ["Blue", "Beige",],
            defaultColor: "Beige",
            images: {
                Beige: [
                    "/covers/hat-2-beige.png"
                ],
                Blue: [
                    "/covers/hat-1-blue.png"
                ]
            }
        },
    ];

    const [selectedColors, setSelectedColors] = useState(
        Object.fromEntries(products.map((p) => [p.id, p.defaultColor]))
    );

    const [selectedSizes, setSelectedSizes] = useState(
        Object.fromEntries(products.map((p) => [p.id, p.defaultSize]))
    );

    const [imageIndexes, setImageIndexes] = useState(
        Object.fromEntries(products.map((p) => [p.id, 0]))
    );

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

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
        }, 3000);
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

    const handleCheckout = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartItems }),
        });

        const { url } = await response.json();
        window.location.href = url; // Redirect to Stripe's hosted checkout
    };

    return (
        <div className="merch-page">
            {/* Header */}
            <h1>Merch Shop</h1>

            <img
                src="/covers/sub-header-option-3.jpg"
                alt="header"
                className="merch-page-image"
            />

            <p>Under Construction... </p>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-wrapper">
                            {/* {Array.isArray(product.images?.[selectedColors[product.id]]) &&
                                product.images[selectedColors[product.id]].length > 1 && (
                                    <button
                                        className="image-arrow image-arrow-left"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageIndexes((prev) => ({
                                                ...prev,
                                                [product.id]: prev[product.id] === 0
                                                    ? product.images[selectedColors[product.id]].length - 1
                                                    : prev[product.id] - 1
                                            }));
                                        }}
                                    >
                                        ‹
                                    </button>
                                )} */}

                            <img
                                src={
                                    Array.isArray(product.images?.[selectedColors[product.id]])
                                        ? product.images[selectedColors[product.id]][imageIndexes[product.id]]
                                        : product.images?.[selectedColors[product.id]] || Object.values(product.images)[0]
                                }
                                alt={product.name}
                                className="product-image"
                                onClick={() => setPreviewImage(
                                    Array.isArray(product.images?.[selectedColors[product.id]])
                                        ? product.images[selectedColors[product.id]][imageIndexes[product.id]]
                                        : product.images?.[selectedColors[product.id]]
                                )}
                            />

                            {Array.isArray(product.images?.[selectedColors[product.id]]) &&
                                product.images[selectedColors[product.id]].length > 1 && (
                                    <button
                                        className="image-arrow image-arrow-right"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageIndexes((prev) => ({
                                                ...prev,
                                                [product.id]: prev[product.id] === product.images[selectedColors[product.id]].length - 1
                                                    ? 0
                                                    : prev[product.id] + 1
                                            }));
                                        }}
                                    >
                                        ›
                                    </button>
                                )}
                        </div>

                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <div className="product-selects">
                                {product.hasSizes && (
                                    <select
                                        className="product-select"
                                        value={selectedSizes[product.id]}
                                        onChange={(e) => {
                                            setSelectedSizes((prev) => ({ ...prev, [product.id]: e.target.value }));
                                            setImageIndexes((prev) => ({ ...prev, [product.id]: 0 }));
                                        }}
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
                                onClick={() => setCartOpen(false)}
                                className="close-cart"
                            >
                            </img>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img
                                    src={
                                        Array.isArray(item.images?.[item.color])
                                            ? item.images[item.color][0]
                                            : item.images?.[item.color]
                                    }
                                    alt={item.name}
                                    className="cart-item-image"
                                />
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
                        onClick={handleCheckout}
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
            {previewImage && (
                <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
                    <img src={previewImage} alt="preview" className="image-preview-large" />
                </div>
            )}
        </div >
    );
};

export default Merch;