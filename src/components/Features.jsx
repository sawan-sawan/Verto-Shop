import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <div className="features-container">
      {/* Free Shipping */}
      <div className="feature-card">
        <div className="icon">
          {/* Wallet Icon */}
          <svg xmlns="http://www.w3.org/2000/svg"
            width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="black" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
            <polyline points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        </div>
        <div>
          <h3>Free Shipping</h3>
          <p>From all orders over $100</p>
        </div>
      </div>

      {/* Secure Payments */}
      <div className="feature-card">
        <div className="icon">
          {/* Truck Icon */}

          <svg xmlns="http://www.w3.org/2000/svg"
            width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="black" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
            <path d="M16 5V3a1 1 0 0 0-1-1H5a2 2 0 0 0-2 2v2" />
          </svg>
        </div>
        <div>
          <h3>Secure Payments</h3>
          <p>With 5+ Payment options</p>
        </div>
      </div>

      {/* Free Return */}
      <div className="feature-card">
        <div className="icon">
          {/* Box Icon */}
          <svg xmlns="http://www.w3.org/2000/svg"
            width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="black" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <div>
          <h3>30 days free return</h3>
          <p>No questions asked</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
