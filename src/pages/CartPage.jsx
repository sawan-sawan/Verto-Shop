import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { useScrollToTop } from '../hooks/useScrollToTop';
import './CartPage.css';

// SVGs for Cart Page
const PlusIcon = () => <svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
const MinusIcon = () => <svg width="12" height="12" viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>;
const FreeShippingIcon = () => <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S5.33 16 4.5 16S3 16.67 3 17.5m17.5 1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5s.67 1.5 1.5 1.5M21 8h-3V4h-2v4h-4V4H5.5c-.83 0-1.5.67-1.5 1.5v9h1.52c.29-.48.77-1.2 1.48-1.2s1.19.72 1.48 1.2h4.04c.29-.48.77-1.2 1.48-1.2s1.19.72 1.48 1.2h2.52V8Z" /></svg>;
const CallIcon = () => <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z" /></svg>;
const ChatIcon = () => <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4zM11 11H9v2H7v-2H5V9h2V7h2v2h2zm4 0h-2V9h2zm4 0h-2V9h2z" /></svg>;
const GiftCardIcon = () => <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 6h-2v9H5v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zM17 2H7C5.9 2 5 2.9 5 4v9c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2.5 7.5H12v2h-2v-2H7.5V7h2.05V5h2.5v2H14.5z" /></svg>;

// --- New Icon for Empty Cart ---
const EmptyCartIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001" stroke="#B0B0B0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.99981 22H14.9998C19.0198 22 19.7398 20.39 19.9498 18.43L20.6998 12.43C20.9698 9.99 20.2698 8 15.9998 8H7.99981C3.72981 8 3.02981 9.99 3.29981 12.43L4.04981 18.43C4.25981 20.39 4.97981 22 8.99981 22Z" stroke="#B0B0B0" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const CartPage = ({ cartItems, onUpdateQuantity }) => {
  const navigate = useNavigate(); // <-- Initialize useNavigate
  useScrollToTop();
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = 4.00; // Example discount
    const total = subtotal - discount;
    return { subtotal, discount, total };
  }, [cartItems]);

  // --- CHECK IF CART IS EMPTY ---
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page-container">
        <div className="empty-cart-container">
          <div className="empty-cart-icon">
            <EmptyCartIcon />
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart to get started</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/men')} // <-- Navigate to products page
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER THIS IF CART HAS ITEMS ---
  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Shopping Bag</h1>
        <p>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in bag.</p>
      </div>

      <div className="cart-main-content">
        <div className="shopping-bag-section">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total Price</span>
          </div>
          {cartItems.map(item => (
            <div key={item.cartId} className="cart-item-card">
              <div className="cart-item-product">
                <img src={item.images[0]} alt={item.name} />
                <div className="cart-item-details">
                  <span className="item-category">{item.category || 'WOMEN'}</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-attrs">Color: {item.color} &bull; Size: {item.size}</span>
                </div>
              </div>
              <div className="cart-item-price">
                ${item.price.toFixed(2)}
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-control">
                  <button onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}><MinusIcon /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}><PlusIcon /></button>
                </div>
              </div>
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-section">
          {/* Summary boxes code remains the same */}
          <div className="summary-box shipping-box">
            <h4>Calculated Shipping</h4>
            <div className="form-group country-select">
              <select><option>Country</option><option>United States</option></select>
              <ChevronDown />
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <select><option> State / City </option><option> New York </option></select>
                <ChevronDown />
              </div>
              <div className="form-group">
                <input type="text" placeholder="ZIP Code" />
              </div>
            </div>
            <button className="update-btn">Update</button>
          </div>
          <div className="summary-box coupon-box">
            <h4>Coupon Code</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="form-group">
              <input type="text" placeholder="Coupon Code" />
            </div>
            <button className="apply-btn">Apply</button>
          </div>
          <div className="summary-box totals-box">
            <h4>Cart Total</h4>
            <div className="total-row"><span>Cart Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
            <div className="total-row"><span>Design by VertoShop</span><span>Free</span></div>
            <div className="total-row discount"><span>Discount</span><span>-${totals.discount.toFixed(2)}</span></div>
            <div className="total-row grand-total"><span>Cart Total</span><span>${totals.total.toFixed(2)}</span></div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>

      <div className="info-footer">
        {/* Info boxes code remains the same */}
        <div className="info-box"><FreeShippingIcon /><h5>Free Shipping</h5><p>When you spend $50+</p></div>
        <div className="info-box"><CallIcon /><h5>Call Us Anytime</h5><p>+34 555-5555</p></div>
        <div className="info-box"><ChatIcon /><h5>Chat With Us</h5><p>We offer 24-hour chat support</p></div>
        <div className="info-box"><GiftCardIcon /><h5>Gift Cards</h5><p>For your loved one, in any amount</p></div>
      </div>
    </div>
  );
};

export default CartPage;