import React, { useEffect, useState } from "react";
import "./DealsSection.css";

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
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 15 * 60 + 30); // 2hr 15min 30s

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
    <section className="deals-section">
      <div className="deals-container">
        {/* Header */}
        <div className="deals-header">
          <div>
            <h2>Hot Deals</h2>
            <p>Grab them before they’re gone!</p>
          </div>
          <div className="countdown">Ends in {formatTime(timeLeft)}</div>
        </div>

        {/* Products */}
       <div className="products-carousel-wrapper" style={{ position: "relative" }}>
  <button className="slider-btn left" onClick={() => {
    document.querySelector(".products-carousel").scrollBy({ left: -200, behavior: "smooth" });
  }}>
    &#8249;
  </button>
  <div className="products-carousel">
    {products.map((product) => (
      <div key={product.id} className="product-card">
        <div className="image-group">
          <span className="discount-badge">{product.discount}</span>
          <img className="img-default" src={product.img1} alt={product.name} />
          <img className="img-hover" src={product.img2} alt={product.name} />
        </div>
        <p className="product-name">{product.name}</p>
        <p className="product-price">${product.price}</p>
      </div>
    ))}
  </div>
  <button className="slider-btn right" onClick={() => {
    document.querySelector(".products-carousel").scrollBy({ left: 200, behavior: "smooth" });
  }}>
    &#8250;
  </button>
</div>

      </div>
    </section>
  );
};

export default DealsSection;
