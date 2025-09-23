import React, { useState, useEffect } from "react";
import "../pages/WorkpaceSale.css";
import { useScrollToTop } from "../hooks/useScrollToTop";

// Men Products
const menProducts = [
  { id: 1, name: "Earthen Bottle", price: 48, img1: "/img/dimg1.webp", img2: "/img/dimg11.webp" },
  { id: 2, name: "Nomad Tumbler", price: 35, img1: "/img/dimg2.webp", img2: "/img/nimg4.jpg" },
  { id: 3, name: "Desk Lamp", price: 60, img1: "/img/dimg3.webp", img2: "/img/dimg33.webp" },
  { id: 4, name: "Planner Notebook", price: 25, img1: "/img/dimg4.webp", img2: "/img/dimg44.webp" },
    { id: 1, name: "Earthen Bottle", price: 48, img1: "/img/dimg1.webp", img2: "/img/dimg11.webp" },
  { id: 2, name: "Nomad Tumbler", price: 35, img1: "/img/dimg2.webp", img2: "/img/nimg4.jpg" },
  { id: 3, name: "Desk Lamp", price: 60, img1: "/img/dimg3.webp", img2: "/img/dimg33.webp" },
  { id: 4, name: "Planner Notebook", price: 25, img1: "/img/dimg4.webp", img2: "/img/dimg44.webp" },
];

// Women Products
const womenProducts = [
  { id: 1, name: "Floral Dress", price: 80, img1: "/img/wimg1.jpg", img2: "/img/wimg1.jpg" },
  { id: 2, name: "Casual Top", price: 40, img1: "/img/wimg2.jpg", img2: "/img/wimg2.jpg" },
  { id: 3, name: "Jeans", price: 55, img1: "/img/wimg3.jpg", img2: "/img/wimg3.jpg" },
  { id: 4, name: "Jacket", price: 100, img1: "/img/wimg4.jpg", img2: "/img/wimg4.jpg" },
  { id: 5, name: "Jacket", price: 90, img1: "/img/wimg5.jpg", img2: "/img/wimg5.jpg" },
  { id: 6, name: "Jacket", price: 80, img1: "/img/wimg6.jpg", img2: "/img/wimg6.jpg" },
  { id: 7, name: "Jacket", price: 87, img1: "/img/wimg7.jpg", img2: "/img/wimg7.jpg" },
  { id: 8, name: "Jacket", price: 66, img1: "/img/wimg1.jpg", img2: "/img/wimg1.jpg" },


];

const WorkspaceSale = ({ onAddToCart, defaultCollection = "men" }) => {
  const [collection, setCollection] = useState(defaultCollection);
  const [products, setProducts] = useState(
    defaultCollection === "men" ? menProducts : womenProducts
  );

  useEffect(() => {
    if (defaultCollection === "men") {
      setProducts(menProducts);
      setCollection("men");
    } else {
      setProducts(womenProducts);
      setCollection("women");
    }
  }, [defaultCollection]);

  useScrollToTop();

  return (
    <div style={{ padding: 20 }}>
      <div className="workspace-sale-container">
        <div className="workspace-sale-content">
          <h1 className="workspace-sale-title">
            {collection === "men" ? "Our Men Collection" : "Our Women Collection"}
          </h1>
          <p className="workspace-sale-subtitle">
            Our thoughtfully designed {collection} items are crafted in limited runs.
            Improve your style with these sale items before we run out.
          </p>

          {/* Products Grid */}
          <div className="workspace-sale-product-grid">
            {products.map((item) => (
              <div key={item.id} className="workspace-sale-product-card">
                <div className="image-group">
                  <img className="img-default" src={item.img1} alt={item.name} />
                  <img className="img-hover" src={item.img2} alt={item.name} />
                </div>
                <p className="product-name">{item.name}</p>

                <div className="price-cart-row">
                  <p className="product-price">${item.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => onAddToCart && onAddToCart(item)}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSale;
