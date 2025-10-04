import React, { useEffect, useState } from "react";
import "../components/DealsSection.css";

const products = [
  {
    id: 1,
    name: "Stylish Sneakers",
    price: 96,
    img1: "/img/dimg1.webp",
    img2: "/img/dimg11.webp",
    discount: "20% OFF",
  },
  {
    id: 2,
    name: "Trendy Jacket",
    price: 130,
    img1: "/img/dimg2.webp",
    img2: "/img/nimg4.jpg",
    discount: "15% OFF",
  },
  {
    id: 3,
    name: "Sunglasses",
    price: 75,
    img1: "/img/dimg3.webp",
    img2: "/img/dimg33.webp",
    discount: "30% OFF",
  },
  {
    id: 4,
    name: "Stylish Bag",
    price: 75,
    img1: "/img/dimg4.webp",
    img2: "/img/dimg44.webp",
    discount: "10% OFF",
  },
];

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 15 * 60 + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <section className="hot-deals-section">
      <div className="hot-deals-container">
        {/* Header */}
        <div className="hot-deals-header">
          <div>
            <h2>Hot Deals</h2>
            <p>Grab them before they’re gone!</p>
          </div>
          <div className="hot-countdown">Ends in {formatTime(timeLeft)}</div>
        </div>

        {/* Products */}
        <div className="hot-products-carousel-wrapper" style={{ position: "relative" }}>
          <button
            className="slider-btn left"
            onClick={() => {
              document.querySelector(".hot-products-carousel").scrollBy({ left: -200, behavior: "smooth" });
            }}
          >
            &#8249;
          </button>
          <div className="hot-products-carousel">
            {products.map((product) => (
              <div key={product.id} className="hot-product-card">
                <div className="hot-image-group">
                  <span className="hot-discount-badge">{product.discount}</span>
                  <img className="hot-img-default" src={product.img1} alt={product.name} />
                  <img className="hot-img-hover" src={product.img2} alt={product.name} />
                </div>
                <p className="hot-product-name">{product.name}</p>
                <p className="hot-product-price">${product.price}</p>
              </div>
            ))}
          </div>
          <button
            className="slider-btn right"
            onClick={() => {
              document.querySelector(".hot-products-carousel").scrollBy({ left: 200, behavior: "smooth" });
            }}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
