import React, { useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi"; // Arrow and Close icon
import "./OfferBanner.css";

const OfferBanner = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="banner-wrapper">
      <div className="banner-container">
        <div className="banner-content">
          <h1>Verto 350 Off</h1>
          <p>On your first purchase</p>
          <button onClick={() => setShowOverlay(true)}>
            Get Offer <FiArrowRight />
          </button>
        </div>
      </div>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-box">
            <img
              src="/img/banner.jpg"
              alt="Product"
              className="overlay-image"
            />
            <div className="overlay-info">
              <h2>Special Sale!</h2>
              <p>Price: $19</p>
              <p>Use Coupon: <strong>VERTO350</strong></p>
            </div>
            <FiX
              className="overlay-close"
              onClick={() => setShowOverlay(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferBanner;
