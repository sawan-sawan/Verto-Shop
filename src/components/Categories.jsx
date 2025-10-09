import React, { useRef } from "react";
import "./Categories.css";
import { Link } from "react-router-dom"; // Step 1: Link ko import karein

// Step 2: Har category ke liye ek 'path' add karein
const categories = [
  { id: 1, title: "Men", image: "/img/cimg1.png", path: "/men" },
  { id: 2, title: "Women", image: "/img/cimg2.webp", path: "/women" },
  { id: 3, title: "Shoes", image: "/img/cimg3.webp", path: "/shoes" },
  { id: 4, title: "Sunglasses", image: "/img/cimg4.webp", path: "/sunglasses" },
];

export default function Categories() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <section className="category-section" id="categories">
      <div className="category-container">
        <h2 className="category-heading">SHOP BY CATEGORY</h2>

        <div className="slider-wrapper">
          <div className="category-grid" ref={sliderRef}>
            {categories.map((cat) => (
              // Step 3: 'div' ko 'Link' se replace karein
              <Link to={cat.path} key={cat.id} className="category-item">
                <div className="category-image-group">
                  <img src={cat.image} alt={cat.title} className="category-photo" />
                  <div className="category-overlay">
                    <p className="category-name">{cat.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Slider Buttons */}
          <button className="slider-btn left" onClick={scrollLeft}>
            &#8249;
          </button>
          <button className="slider-btn right" onClick={scrollRight}>
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}