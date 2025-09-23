// CartDrawer.js
import React from "react";
import { X } from "lucide-react";
import "./CartDrawer.css";

const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = [
    { id: 1, name: "T-Shirt", price: 20, qty: 2 },
    { id: 2, name: "Shoes", price: 50, qty: 1 },
  ];

  return (
    <>
      {/* ✅ Overlay */}
      <div className={`cart-overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>

      {/* ✅ Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>{item.name}</span>
                <span>
                  {item.qty} × ${item.price}
                </span>
              </div>
            ))
          ) : (
            <p className="empty">Your cart is empty</p>
          )}
        </div>

        <div className="cart-footer">
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
