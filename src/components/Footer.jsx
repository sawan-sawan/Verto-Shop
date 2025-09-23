import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Brand */}
        <div className="footer-brand">
          <img src="/img/navlogo.png" alt="VERTO Shop" className="footer-logo" />
          <h2 className="footer-logo-text">
            <span className="verto">VERTO</span> <span className="shop">Shop</span>
          </h2>
          <p className="footer-description">
            Premium e-commerce experience for modern shoppers. Trendy products, exclusive deals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Deals</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li>📞 +91 123 456 7890</li>
            <li>✉️ support@vertoshop.com</li>
            <li>📍 123 Main Street, Mumbai, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><Facebook size={22} /></a>
            <a href="#"><Instagram size={22} /></a>
            <a href="#"><Twitter size={22} /></a>
            <a href="#"><Linkedin size={22} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} VERTO Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
