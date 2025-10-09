import React, { useState, useEffect } from "react";
import {
    Menu, X, ChevronDown, User, ShoppingCart, Heart, Sun, Footprints, Layers,
    Shirt, ShoppingBag, LayoutGrid, LogIn, LogOut, Mail, UserCircle2
} from "lucide-react";
import { GiBeltBuckles } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "./CartDrawer";
import "./Navbar.css";
import { Link } from "react-router-dom";

// GSAP is not used in the provided code, but keeping it in case it's used elsewhere.
// import gsap from "gsap";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
// gsap.registerPlugin(ScrollToPlugin);

const Navbar = ({ cartItemCount, user, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistActive, setIsWishlistActive] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // === NEW: Effect to lock body scroll when mobile menu is open ===
    useEffect(() => {
        if (isOpen) {
            // Menu is open, disable scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Menu is closed, enable scroll
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to ensure scroll is re-enabled when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]); // This effect runs whenever the 'isOpen' state changes

    const closeAllMenus = () => {
        setIsOpen(false);
        setIsMobileDropdownOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                <div className="navbar-container">
                    <Link to="/" className="logo">
                        <img src="/img/navlogo.png" alt="VERTO Shop" className="logo-img" />
                        <span className="logo-text">
                            <span className="verto">VERTO</span> <span className="shop">Shop</span>
                        </span>
                    </Link>

                    <div className="menu desktop-only">
                        <Link to="/allproducts">All Clothes</Link>
                        <Link to="/men">Men</Link>
                        <Link to="/women">Women</Link>
                        <div className="dropdown">
                            <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                Categories <ChevronDown size={16} />
                            </button>
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div className="dropdown-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                        <Link to="/glasses">Sunglasses</Link>
                                        <Link to="/belt">Belt</Link>
                                        <Link to="/shoes">Shoes</Link>
                                        <Link to="/fleece">Fleece</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="actions">
                        {user ? ( <Link to="/profile" className="icon-btn"><User size={22} /></Link> ) : ( <Link to="/login" className="icon-btn"><User size={22} /></Link> )}
                        <button className="icon-btnn"><Heart size={22} /></button>
                        <Link to="/cart" className="icon-btn cart-icon-wrapper">
                            <ShoppingCart size={22} />
                            {cartItemCount > 0 && (<span className="cart-badge">{cartItemCount}</span>)}
                        </Link>
                        <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div className="mobile-menu" initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                            <div className="mobile-menu-header">
                                <Link to="/" className="mobile-logo" onClick={closeAllMenus}>
                                    <img src="/img/navlogo.png" alt="VERTO Shop" />
                                    <span className="mobile-logo-text"><span className="verto">VERTO</span> <span className="shop">Shop</span></span>
                                </Link>
                                <button className="mobile-close-btn" onClick={() => setIsOpen(false)}><X size={26} /></button>
                            </div>

                            <div className="mobile-menu-links">
                                <div className="link-group">
                                    <Link to="/men" onClick={closeAllMenus}><Shirt size={20} /> Men</Link>
                                    <Link to="/women" onClick={closeAllMenus}><ShoppingBag size={20} /> Women</Link>
                                    <Link to="/allproducts" onClick={closeAllMenus}><LayoutGrid size={20} /> All Clothes</Link>
                                </div>
                                
                                <div className="mobile-category-dropdown">
                                    <button className="mobile-category-trigger" onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}>
                                        <span><Layers size={20}/> Categories</span>
                                        <motion.div animate={{ rotate: isMobileDropdownOpen ? 180 : 0 }}><ChevronDown size={20} /></motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {isMobileDropdownOpen && (
                                            <motion.div className="mobile-submenu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                                <Link to="/glasses" onClick={closeAllMenus}><Sun size={18} /> Sunglasses</Link>
                                                <Link to="/belt" onClick={closeAllMenus}><GiBeltBuckles size={18} /> Belt</Link>
                                                <Link to="/shoes" onClick={closeAllMenus}><Footprints size={18} /> Shoes</Link>
                                                <Link to="/fleece" onClick={closeAllMenus}><Layers size={18} /> Fleece</Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <hr className="mobile-menu-divider" />

                                <div className="link-group">
                                    {user ? (
                                        <>
                                            <Link to="/profile" onClick={closeAllMenus}><UserCircle2 size={20} /> Profile</Link>
                                            <button onClick={() => { handleLogout(); closeAllMenus(); }}><LogOut size={20} /> Logout</button>
                                        </>
                                    ) : (
                                        <Link to="/login" onClick={closeAllMenus}><LogIn size={20} /> Login/SignUp</Link>
                                    )}
                                    <Link to="/contact" onClick={closeAllMenus}><Mail size={20} /> Contact</Link>
                                </div>
                            </div>
                            
                            {user && (
                                <div className="mobile-menu-footer">
                                    <UserCircle2 size={36} className="footer-icon" />
                                    <div className="footer-user-info">
                                        <p className="user-name">{user.displayName || "Valued Customer"}</p>
                                        <p className="user-email">{user.email}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;