import React, { useState } from "react";
import "./CartPage.css";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fitted Blazer",
      color: "White",
      size: "M",
      stock: 100,
      price: 1999,
      qty: 1,
      img: "/img/dimg1.webp",
    },
    {
      id: 2,
      name: "Ribbed Tank",
      color: "White",
      size: "S",
      stock: 100,
      price: 299,
      qty: 2,
      img: "/img/dimg4.webp",
    },
    {
      id: 3,
      name: "Cargo Shorts",
      color: "White",
      size: "S",
      stock: 100,
      price: 699,
      qty: 1,
      img: "/img/nimg1.webp",
    },
  ]);
  useScrollToTop();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <div className="cart-content">
        {/* LEFT SIDE */}
        <div className="cart-items">
          <h2>Shopping Cart</h2>

          {/* Top select bar */}
          <div className="cart-topbar">
            <label>
              <input type="checkbox" defaultChecked /> Select all
            </label>
            <span>Items selected: {cartItems.length}</span>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <input type="checkbox" defaultChecked className="cart-checkbox" />
              <img src={item.img} alt={item.name} className="cart-img" />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p>
                <p>Stock: {item.stock} available</p>

                <div className="qty-controls">
                  <button>-</button>
                  <span>{item.qty}</span>
                  <button>+</button>
                </div>

                <div className="cart-links">
                  <span>Remove</span> | <span>Move to wishlist</span> |{" "}
                  <span>See more like this</span> | <span>Share</span>
                </div>
              </div>
              <div className="cart-price">₹{item.price}</div>
            </div>
          ))}

          <a href="/" className="continue-link">
            ← Continue shopping
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order summary</h3>
            <p>
              MRP ({cartItems.length} items): <strong>₹{total}</strong>
            </p>
            <p>
              Delivery Charges: <span className="free">Free Delivery</span>
            </p>
            <hr />
            <p className="total">Estimated total: ₹{total}</p>
            <button className="checkout-btn">Proceed To Checkout</button>
          </div>

          <div className="coupon-card">
            <h3>Coupons</h3>
            <div className="coupon-input">
              <input type="text" placeholder="Enter coupon code" />
              <button>Apply</button>
            </div>
            <p className="available">Available coupons:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
