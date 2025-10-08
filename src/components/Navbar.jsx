import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, ShoppingCart, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import CartDrawer from "./CartDrawer"; // Assuming this component exists
import "./Navbar.css";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

// The `cartItemCount` prop is passed down from App.js
const Navbar = ({ cartItemCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // This seems unused, keeping as is.
  const [isWishlistActive, setIsWishlistActive] = useState(false); // Example state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src="/img/navlogo.png" alt="VERTO Shop" className="logo-img" />
            <span className="logo-text">
              <span className="verto">VERTO</span> <span className="shop">Shop</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="menu desktop-only">
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <a href="#">Fleece</a>
            <div className="dropdown">
              <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Categories <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a href="#">Sunglasses</a>
                    <a href="#">Belt</a>
                    <a href="#">Shoes</a>
                    <a href="#"></a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <Link to="/login" className="icon-btn">
              <User size={22} />
            </Link>
            <button className="icon-btnn">
              <Heart size={22} />
              {isWishlistActive && <span className="wishlist-dot"></span>}
            </button>
            
            {/* --- UPDATED CART ICON WITH BADGE --- */}
            <Link to="/cart" className="icon-btn cart-icon-wrapper">
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>

            <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mobile-menu-header">
                <Link to="/" className="mobile-logo">
                  <img src="/img/navlogo.png" alt="VERTO Shop" />
                  <span className="mobile-logo-text">
                    <span className="verto">VERTO</span> <span className="shop">Shop</span>
                  </span>
                </Link>
                <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
                  <X size={26} />
                </button>
              </div>
              <div className="mobile-menu-links">
                <Link to="/men" onClick={() => setIsOpen(false)}>Men</Link>
                <Link to="/women" onClick={() => setIsOpen(false)}>Women</Link>
                <a href="#" onClick={() => setIsOpen(false)}>Accessories</a>
                <a href="#" onClick={() => setIsOpen(false)}>Categories</a>
                <Link to="/login" onClick={() => setIsOpen(false)}>Login/SignUp</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;