// Navbar.js
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, ShoppingCart, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import CartDrawer from "./CartDrawer";
import "./Navbar.css";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistActive, setIsWishlistActive] = useState(false); // Wishlist red dot

  const handleDropdownClick = () => {
    setDropdownOpen(false);
  };

  // Example function to simulate liking a product
  const handleProductLike = () => {
    setIsWishlistActive(true);
    // Optionally, remove dot after some time
    // setTimeout(() => setIsWishlistActive(false), 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768 && window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: "#contact-section",
      ease: "power2.inOut",
    });
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="/" className="logo">
            <img src="/img/navlogo.png" alt="VERTO Shop" className="logo-img" />
            <span className="logo-text">
              <span className="verto">VERTO</span>{" "}
              <span className="shop">Shop</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="menu desktop-only">
            <Link to="/men">Men</Link>
            <a href="#">Women</a>
            <a href="#">Accessories</a>

            <div className="dropdown">
              <button
                className="dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
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
                    <a href="#" onClick={handleDropdownClick}>
                      Electronics
                    </a>
                    <a href="#" onClick={handleDropdownClick}>
                      Clothing
                    </a>
                    <a href="#" onClick={handleDropdownClick}>
                      Accessories
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions: User, Wishlist, Cart, Mobile Menu */}
          <div className="actions">
            {/* User Icon */}
            <button
              className="icon-btnn"
              onClick={scrollToContact}
              style={{ background: "none", border: "none", cursor: "pointer", position: "relative", marginRight: "10px" }}
            >
              <User size={22} />
            </button>

            {/* Wishlist Icon */}
            <button
              className="icon-btn"
              onClick={() => console.log("Wishlist clicked!")}
              style={{ background: "none", border: "none", cursor: "pointer", position: "relative", marginRight: "10px" }}
            >
              <Heart size={22} />
              {isWishlistActive && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "8px",
                    height: "8px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                  }}
                ></span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              className="icon-btn"
              onClick={() => setIsCartOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", marginRight: "10px" }}
            >
              <ShoppingCart size={22} />
            </button>

            {/* Mobile Menu Button */}
            <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

<AnimatePresence>
  {isOpen && (
    <motion.div
      className="mobile-menu"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Mobile Menu Header */}
      <div className="mobile-menu-header">
        <a href="/" className="mobile-logo">
          <img src="/img/navlogo.png" alt="VERTO Shop" />
          <span className="mobile-logo-text">
            <span className="verto">VERTO</span> <span className="shop">Shop</span>
          </span>
        </a>
        <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
          <X size={26} />
        </button>
      </div>

      {/* Menu Links */}
      <div className="mobile-menu-links">
        <Link to="/men" onClick={() => setIsOpen(false)}>Men</Link>
        <a href="#" onClick={() => setIsOpen(false)}>Women</a>
        <a href="#" onClick={() => setIsOpen(false)}>Accessories</a>
        <a href="#" onClick={() => setIsOpen(false)}>Categories</a>

        <button
          onClick={() => {
            scrollToContact();
            setIsOpen(false);
          }}
        >
          Contact
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
