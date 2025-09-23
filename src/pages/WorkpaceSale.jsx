import React, { useState } from "react";
import "../pages/WorkpaceSale.css";
import { useScrollToTop } from "../hooks/useScrollToTop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";


const allProducts = [
  { id: 1, name: "Earthen Bottle", price: 48, img1: "/img/dimg1.webp", img2: "/img/dimg11.webp" },
  { id: 2, name: "Nomad Tumbler", price: 35, img1: "/img/dimg2.webp", img2: "/img/nimg4.jpg" },
  { id: 3, name: "Desk Lamp", price: 60, img1: "/img/dimg3.webp", img2: "/img/dimg33.webp" },
  { id: 4, name: "Planner Notebook", price: 25, img1: "/img/dimg4.webp", img2: "/img/dimg44.webp" },
  { id: 1, name: "Earthen Bottle", price: 48, img1: "/img/dimg1.webp", img2: "/img/dimg11.webp" },
  { id: 2, name: "Nomad Tumbler", price: 35, img1: "/img/dimg2.webp", img2: "/img/nimg4.jpg" },
  { id: 3, name: "Desk Lamp", price: 60, img1: "/img/dimg3.webp", img2: "/img/dimg33.webp" },
  { id: 4, name: "Planner Notebook", price: 25, img1: "/img/dimg4.webp", img2: "/img/dimg44.webp" },
  { id: 1, name: "Earthen Bottle", price: 48, img1: "/img/dimg1.webp", img2: "/img/dimg11.webp" },
  { id: 2, name: "Nomad Tumbler", price: 35, img1: "/img/dimg2.webp", img2: "/img/nimg4.jpg" },
  { id: 3, name: "Desk Lamp", price: 60, img1: "/img/dimg3.webp", img2: "/img/dimg33.webp" },
  { id: 4, name: "Planner Notebook", price: 25, img1: "/img/dimg4.webp", img2: "/img/dimg44.webp" },



];

const WorkspaceSale = ({ onAddToCart }) => {
  const [filters, setFilters] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleAddFilter = (type, value) => {
    if (value && !filters.includes(`${type}: ${value}`)) {
      setFilters([...filters, `${type}: ${value}`]);
    }
  };

  const handleRemoveFilter = (f) => {
    setFilters(filters.filter((item) => item !== f));
  };

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };
  useScrollToTop();

  return (
    <><div style={{ padding: 20 }}>
      <div className="workspace-sale-container">
        <div className="workspace-sale-content">
          <h1 className="workspace-sale-title">Our men collection</h1>
          <p className="workspace-sale-subtitle">
            Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and organization with these sale items before we run out.
          </p>

          {/* Topbar */}
          <div className="workspace-sale-topbar">
            <div className="workspace-sale-sort">Sort</div>
            <div
              className="workspace-sale-filter-icon"
              onClick={() => setShowFilterPanel(true)}
            >
              <FontAwesomeIcon icon={faFilter} /> Filters
            </div>

            {/* Desktop Dropdowns */}
            <div className="workspace-sale-dropdowns">
              <select onChange={(e) => handleAddFilter("Category", e.target.value)}>
                <option value="">Category</option>
                <option value="Stationery">Stationery</option>
                <option value="Bottle">Bottle</option>
                <option value="Tumbler">Tumbler</option>
                <option value="Lamp">Lamp</option>
              </select>
              <select onChange={(e) => handleAddFilter("Color", e.target.value)}>
                <option value="">Color</option>
                <option value="Black">Black</option>
                <option value="Beige">Beige</option>
                <option value="Green">Green</option>
                <option value="Brown">Brown</option>
              </select>
              <select onChange={(e) => handleAddFilter("Size", e.target.value)}>
                <option value="">Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          {filters.length > 0 && (
            <div className="workspace-sale-filters">
              <span>Filters:</span>
              {filters.map((f, i) => (
                <div key={i} className="workspace-sale-filter-chip">
                  {f} <button onClick={() => handleRemoveFilter(f)}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Products Grid */}
          <div className="workspace-sale-product-grid">
            {allProducts.map((item, idx) => (
              <div className="workspace-sale-product-card">
                <div className="image-group">

                  <img className="img-default" src={item.img1} alt={item.name} />
                  <img className="img-hover" src={item.img2} alt={item.name} />
                </div>
                <p className="product-name">{item.name}</p>

                {/* Price + Add to Cart Row */}
                <div className="price-cart-row">
                  <p className="product-price">${item.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>

            ))}
          </div>

        </div>

        {/* Slide-out Filter Panel */}
        <div className={`mobile-filter-panel ${showFilterPanel ? "open" : ""}`}>
          <div className="filter-header">
            <h3>Filters</h3>
            <FontAwesomeIcon
              icon={faTimes}
              className="close-filter"
              onClick={() => setShowFilterPanel(false)}
            />
          </div>

          <div className="filter-options">
            {/* Category */}
            <div className="filter-group">
              <h4>Category</h4>
              <div className="custom-dropdown">
                <div className="dropdown-header" onClick={() => toggleDropdown("category")}>
                  Select Category
                </div>
                {openDropdown === "category" && (
                  <div className="dropdown-options">
                    <div onClick={() => handleAddFilter("Category", "Stationery")}>Stationery</div>
                    <div onClick={() => handleAddFilter("Category", "Bottle")}>Bottle</div>
                    <div onClick={() => handleAddFilter("Category", "Tumbler")}>Tumbler</div>
                    <div onClick={() => handleAddFilter("Category", "Lamp")}>Lamp</div>
                  </div>
                )}
              </div>
            </div>

            {/* Color */}
            <div className="filter-group">
              <h4>Color</h4>
              <div className="custom-dropdown">
                <div className="dropdown-header" onClick={() => toggleDropdown("color")}>
                  Select Color
                </div>
                {openDropdown === "color" && (
                  <div className="dropdown-options">
                    <div onClick={() => handleAddFilter("Color", "Black")}>Black</div>
                    <div onClick={() => handleAddFilter("Color", "Beige")}>Beige</div>
                    <div onClick={() => handleAddFilter("Color", "Green")}>Green</div>
                    <div onClick={() => handleAddFilter("Color", "Brown")}>Brown</div>
                  </div>
                )}
              </div>
            </div>

            {/* Size */}
            <div className="filter-group">
              <h4>Size</h4>
              <div className="custom-dropdown">
                <div className="dropdown-header" onClick={() => toggleDropdown("size")}>
                  Select Size
                </div>
                {openDropdown === "size" && (
                  <div className="dropdown-options">
                    <div onClick={() => handleAddFilter("Size", "Small")}>Small</div>
                    <div onClick={() => handleAddFilter("Size", "Medium")}>Medium</div>
                    <div onClick={() => handleAddFilter("Size", "Large")}>Large</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WorkspaceSale;
