import React from "react";
import "./PopularProducts.css";

const products = [
  {
    id: 1,
    image: "/img/timg1.avif",
    title: "Graphics >",
  },
  {
    id: 2,
    image: "/img/timg2.avif",
    title: "Jeans >",
  },
  {
    id: 3,
    image: "/img/timg3.avif",
    title: "Jackets & Coats >",
  },
  {
    id: 4,
    image: "/img/timg4.avif",
    title: "Hoodies & Sweats >",
  },
];

export default function PopularProducts() {
  return (
    <section className="popular-section" id="popular-products">
      <div className="popular-container">
        {/* Heading */}
        <h2 className="popular-heading">THE TREND REPORT</h2>

        {/* Trend Cards */}
        <div className="popular-grid">
          {products.map((product) => (
            <div key={product.id} className="popular-card">
              <img
                src={product.image}
                alt={product.title}
                className="popular-img"
              />
              <p className="popular-title">{product.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
