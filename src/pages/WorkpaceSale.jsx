import React, { useState, useEffect, useMemo, useRef } from "react";
import "./WorkpaceSale.css";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useNavigate } from "react-router-dom";

// --- SVG Icons for UI Elements ---
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MinusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CloseIcon = ({ width = 18, height = 18 }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- NEW --- SVG illustration for the login popup
const LoginIllustrationIcon = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFD6A5" d="M37.5,-59.5C51.1,-55.8,66.5,-49.2,74.9,-37.9C83.3,-26.6,84.7,-10.6,79.9,3.5C75.2,17.7,64.2,29.9,53.4,39.6C42.6,49.2,32,56.3,20.1,62.2C8.2,68.1,-5,72.9,-18.2,71.2C-31.4,69.5,-44.6,61.4,-55.6,50.7C-66.6,40,-75.4,26.7,-79.1,12.2C-82.9,-2.3,-81.6,-18,-74.6,-31C-67.6,-44,-54.9,-54.3,-41.6,-59.2C-28.3,-64.2,-14.1,-63.9,-0.4,-63.4C13.4,-62.9,26.8,-62.3,37.5,-59.5Z" transform="translate(100 100)" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="90" fill="#FFF" fontFamily="Arial, sans-serif">🛍️</text>
    </svg>
);


const Grid4Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Grid2Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="8" stroke="currentColor" strokeWidth="2"/>
    <rect x="3" y="13" width="18" height="8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);


// --- Combined and Augmented Product Data ---
const allProducts = [
  { id: 1, name: "Allied Down Hooded Blouson", price: 530, images: ["/img/dimg1.webp", "/img/dimg11.webp"], inStock: true, color: "Black" },
  { id: 2, name: "1Tuck Tapered Pants", price: 205, images: ["/img/dimg2.webp", "/img/nimg4.jpg"], inStock: true, color: "Beige" },
  { id: 3, name: "Alex Merino Wool Open Placket Polo", price: 305, images: ["/img/dimg3.webp", "/img/dimg33.webp"], inStock: false, color: "White" },
  { id: 4, name: "Bowery Miller Standard Crew", price: 121, images: ["/img/dimg4.webp", "/img/dimg44.webp"], inStock: true, color: "Green" },
  { id: 5, name: "Bowery The Big Apple Crew", price: 121, images: ["/img/wimg1.jpg", "/img/wimg2.jpg"], inStock: true, color: "Black" },
  { id: 6, name: "Boa Fleece Zip Blouson", price: 212, images: ["/img/wimg3.jpg", "/img/wimg4.jpg"], inStock: false, color: "Blue" },
  { id: 7, name: "Broome Flannel Long Sleeve Shirt", price: 177, images: ["/img/wimg5.jpg", "/img/wimg6.jpg"], inStock: true, color: "Brown" },
  { id: 8, name: "Chambray Work Shirt", price: 198, images: ["/img/wimg7.jpg", "/img/wimg1.jpg"], inStock: true, color: "Blue" },
  { id: 9, name: "Ditch International Hoodie", price: 121, images: ["/img/wimg5.jpg", "/img/wimg5.jpg"], inStock: true, color: "Yellow" },
  { id: 10, name: "Coverall Wool Shirts Blouson", price: 283, images: ["/img/wimg6.jpg", "/img/wimg6.jpg"], inStock: false, color: "Gray" },
  { id: 11, name: "Cotton Cashmere Strip Dyeing Knit", price: 212, images: ["/img/wimg7.jpg", "/img/wimg7.jpg"], inStock: true, color: "Multi" },
  { id: 12, name: "Daikanyama Gabardine Coat", price: 488, images: ["/img/wimg1.jpg", "/img/wimg1.jpg"], inStock: true, color: "Beige" },
];

const availabilityOptions = ["In stock", "Out of stock"];
const colorOptions = ["Black", "Beige", "White", "Green", "Blue", "Brown", "Yellow", "Gray", "Multi"];
const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price, low to high' },
    { value: 'price-desc', label: 'Price, high to low' },
    { value: 'alpha-asc', label: 'Alphabetically, A-Z' },
    { value: 'alpha-desc', label: 'Alphabetically, Z-A' },
];

// --- Add to Cart Popup Component ---
const ProductPopup = ({ product, onClose, onConfirmAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState('S');
    const [quantity, setQuantity] = useState(1);
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const handleAddToCartClick = () => {
        onConfirmAddToCart({ size: selectedSize, quantity });
    };
    
    const handlePopupContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={handlePopupContentClick}>
                <button className="popup-close-btn" onClick={onClose}><CloseIcon /></button>
                <div className="popup-image-container">
                    <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="popup-details-container">
                    <h2>{product.name}</h2>
                    <p className="popup-price">${product.price.toFixed(2)}</p>
                    
                    <div className="popup-size-selector">
                        <label>Size</label>
                        <div className="size-options">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="popup-quantity-selector">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><MinusIcon /></button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)}><PlusIcon /></button>
                    </div>

                    <div className="popup-actions">
                        <button className="popup-add-to-cart-btn" onClick={handleAddToCartClick}>
                            Add to cart
                        </button>
                        <button className="popup-buy-now-btn">Buy with VertoShop</button>
                        <a href="#" className="more-payment-options">More payment options</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NEW LOGIN REQUIRED POPUP COMPONENT ---
const LoginRequiredPopup = ({ onClose, onNavigate }) => {
    const handlePopupContentClick = (e) => e.stopPropagation();

    return (
        <div className="login-popup-overlay" onClick={onClose}>
            <div className="login-popup-content" onClick={handlePopupContentClick}>
                <button className="login-popup-close-btn" onClick={onClose}>
                    <CloseIcon width={22} height={22} />
                </button>
                <div className="login-popup-image-container">
                    <LoginIllustrationIcon />
                </div>
                <div className="login-popup-details">
                    <h2>Please Login or Sign Up</h2>
                    <p>You need to log in or create an account before adding items to your cart.</p>
                    <button className="login-popup-navigate-btn" onClick={onNavigate}>
                        Go to Login / Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Component ---
const WorkspaceSale = ({ onAddToCart, currentUser, justAddedProductId }) => {
  useScrollToTop();

  const [products, setProducts] = useState(allProducts);
  const [openFilter, setOpenFilter] = useState(null);
  const [gridLayout, setGridLayout] = useState("grid-5-cols");
  const [sortBy, setSortBy] = useState('featured');
  const [activeFilters, setActiveFilters] = useState({
    availability: [],
    color: [],
  });
  
  const [popupProduct, setPopupProduct] = useState(null);
  // --- NEW STATE FOR LOGIN POPUP ---
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const filterRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];
    if (activeFilters.availability.length > 0) {
      filtered = filtered.filter(p => {
        const isInStock = activeFilters.availability.includes("In stock") && p.inStock;
        const isOutOfStock = activeFilters.availability.includes("Out of stock") && !p.inStock;
        return isInStock || isOutOfStock;
      });
    }
    if (activeFilters.color.length > 0) {
      filtered = filtered.filter(p => activeFilters.color.includes(p.color));
    }
    switch (sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'alpha-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'alpha-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break;
    }
    setProducts(filtered);
  }, [activeFilters, sortBy]);

  // --- Handlers ---
  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => {
        const currentValues = prev[type];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        return { ...prev, [type]: newValues };
    });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setOpenFilter(null);
  }

  const clearFilters = (type) => {
    setActiveFilters(prev => ({ ...prev, [type]: [] }));
  };

  const totalActiveFilters = useMemo(() => {
      return activeFilters.availability.length + activeFilters.color.length;
  }, [activeFilters]);

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  // --- UPDATED POPUP AND CART LOGIC ---
  const handleOpenPopup = (product) => {
    // Check for authentication first
    if (!currentUser) {
      setShowLoginPopup(true); // Show the new login modal instead of alert
      return; // Stop the function here
    }

    // If the user is logged in, proceed with the existing logic
    if (window.innerWidth > 768) {
        setPopupProduct(product);
    } else {
        onAddToCart(product, { size: 'M', quantity: 1 });
    }
  };

  const handleClosePopup = () => {
    setPopupProduct(null);
  };
  
  const handleConfirmAddToCart = (details) => {
    onAddToCart(popupProduct, details);
    
    setTimeout(() => {
        handleClosePopup();
    }, 500); 
  };
  
  const handleNavigateToLogin = () => {
      setShowLoginPopup(false);
      navigate('/login');
  };


  return (
    <div className="product-page-container">
      <header className="page-header">
        <h1>Products</h1>
      </header>
      <div className="toolbar-container">
        <div className="filters-wrapper" ref={filterRef}>
          <div className="filter-group">
            <button onClick={() => toggleFilter('availability')} className="filter-button">
              Availability <ChevronDownIcon />
            </button>
            {openFilter === 'availability' && (
              <div className="filter-dropdown">
                <div className="dropdown-header">
                  <span>{activeFilters.availability.length} selected</span>
                  <button onClick={() => clearFilters('availability')} className="clear-button">Clear</button>
                </div>
                <ul className="dropdown-list">
                  {availabilityOptions.map(option => (
                    <li key={option}>
                      <label>
                        <input
                          type="checkbox"
                          checked={activeFilters.availability.includes(option)}
                          onChange={() => handleFilterChange('availability', option)}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="filter-group">
             <button onClick={() => toggleFilter('color')} className="filter-button">
                Color <ChevronDownIcon />
            </button>
            {openFilter === 'color' && (
              <div className="filter-dropdown">
                <div className="dropdown-header">
                  <span>{activeFilters.color.length} selected</span>
                  <button onClick={() => clearFilters('color')} className="clear-button">Clear</button>
                </div>
                <div className="color-swatch-list">
                  {colorOptions.map(color => (
                      <button
                        key={color}
                        className={`color-swatch ${activeFilters.color.includes(color) ? 'selected' : ''}`}
                        style={{ backgroundColor: color.toLowerCase() === 'multi' ? 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' : color }}
                        title={color}
                        onClick={() => handleFilterChange('color', color)}
                      />
                  ))}
                </div>
              </div>
            )}
          </div>
          {totalActiveFilters > 0 && <span className="active-filter-count">{totalActiveFilters}</span>}
        </div>
        <div className="tools-wrapper">
          <span className="product-count">{products.length} items</span>
          <div className="filter-group">
            <button onClick={() => toggleFilter('sort')} className="filter-button">
              Sort <ChevronDownIcon />
            </button>
            {openFilter === 'sort' && (
                <div className="filter-dropdown sort-dropdown">
                    <ul className="dropdown-list sort-list">
                     {sortOptions.map(option => (
                        <li
                          key={option.value}
                          className={sortBy === option.value ? 'active' : ''}
                          onClick={() => handleSortChange(option.value)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                </div>
            )}
          </div>
          <div className="layout-toggle">
            <button onClick={() => setGridLayout("grid-5-cols")} className={gridLayout === 'grid-5-cols' ? 'active' : ''}>
                <Grid4Icon />
            </button>
            <button onClick={() => setGridLayout("grid-2-cols")} className={gridLayout === 'grid-2-cols' ? 'active' : ''}>
                <Grid2Icon />
            </button>
          </div>
        </div>
      </div>
      <div className={`product-grid ${gridLayout}`}>
        {products.map((item) => (
          <div key={item.id} className={`product-card ${justAddedProductId === item.id ? 'added-to-cart-animation' : ''}`}>
            <div className="image-container">
              <img className="img-main" src={item.images[0]} alt={item.name} />
              <img className="img-hover" src={item.images[1]} alt={item.name} />
            </div>
            <div className="product-info">
              <p className="product-name">{item.name}</p>
              <p className="product-price">${item.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleOpenPopup(item)}
              >
                <PlusIcon /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* --- Render the Product Popup Conditionally --- */}
      {popupProduct && (
        <ProductPopup 
          product={popupProduct}
          onClose={handleClosePopup}
          onConfirmAddToCart={handleConfirmAddToCart}
        />
      )}

      {/* --- NEW: Render the Login Required Popup Conditionally --- */}
      {showLoginPopup && (
        <LoginRequiredPopup 
            onClose={() => setShowLoginPopup(false)}
            onNavigate={handleNavigateToLogin}
        />
      )}
    </div>
  );
};

export default WorkspaceSale;