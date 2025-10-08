// src/components/Women.jsx (FINAL & COMPLETE CODE - UPDATED FOR FIREBASE)

import React, { useState, useEffect, useMemo, useRef } from "react";
import "../pages/Women.css"; // आपका CSS फाइल
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js"; // आपका Firebase कॉन्फ़िग

// --- सारे SVG Icons ---
const PlusIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" fill="none" /></svg>);
const MinusIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const CloseIcon = ({ width = 18, height = 18 }) => (<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const LoginIllustrationIcon = () => (<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#FFD6A5" d="M37.5,-59.5C51.1,-55.8,66.5,-49.2,74.9,-37.9C83.3,-26.6,84.7,-10.6,79.9,3.5C75.2,17.7,64.2,29.9,53.4,39.6C42.6,49.2,32,56.3,20.1,62.2C8.2,68.1,-5,72.9,-18.2,71.2C-31.4,69.5,-44.6,61.4,-55.6,50.7C-66.6,40,-75.4,26.7,-79.1,12.2C-82.9,-2.3,-81.6,-18,-74.6,-31C-67.6,-44,-54.9,-54.3,-41.6,-59.2C-28.3,-64.2,-14.1,-63.9,-0.4,-63.4C13.4,-62.9,26.8,-62.3,37.5,-59.5Z" transform="translate(100 100)" /><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="90" fill="#FFF" fontFamily="Arial, sans-serif">🛍️</text></svg>);
const ChevronDownIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Grid4Icon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" /><rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" /><rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" /><rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" /></svg>);
const Grid2Icon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="8" stroke="currentColor" strokeWidth="2" /><rect x="3" y="13" width="18" height="8" stroke="currentColor" strokeWidth="2" /></svg>);

// --- फ़िल्टर के लिए Options ---
const availabilityOptions = ["In stock", "Out of stock"];
const colorOptions = ["Black", "Beige", "White", "Green", "Blue", "Brown", "Yellow", "Gray", "Multi"];
const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price, low to high' },
    { value: 'price-desc', label: 'Price, high to low' },
    { value: 'alpha-asc', label: 'Alphabetically, A-Z' },
    { value: 'alpha-desc', label: 'Alphabetically, Z-A' },
];

// --- Popup Components ---
const ProductPopup = ({ product, onClose, onConfirmAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState('S');
    const [quantity, setQuantity] = useState(1);
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const handleAddToCartClick = () => { onConfirmAddToCart({ size: selectedSize, quantity }); };
    const handlePopupContentClick = (e) => e.stopPropagation();
    return (
        <div className="women-catalog-popup-overlay" onClick={onClose}>
            <div className="women-catalog-popup-content product" onClick={handlePopupContentClick}>
                <button className="women-catalog-popup-close-btn" onClick={onClose}><CloseIcon /></button>
                <div className="women-catalog-popup-image"><img src={product.images[0]} alt={product.name} /></div>
                <div className="women-catalog-popup-details">
                    <h2>{product.name}</h2>
                    <p className="women-catalog-popup-price">${product.price.toFixed(2)}</p>
                    <div className="women-catalog-size-selector">
                        <label>Size</label>
                        <div className="women-size-options">
                            {sizes.map(size => (<button key={size} onClick={() => setSelectedSize(size)} className={`women-size-btn ${selectedSize === size ? 'selected' : ''}`}>{size}</button>))}
                        </div>
                    </div>
                    <div className="women-quantity-selector">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><MinusIcon /></button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)}><PlusIcon /></button>
                    </div>
                    <div className="women-popup-actions">
                        <button onClick={handleAddToCartClick} className="women-popup-add-to-cart-btn">Add to cart</button>
                        <button className="women-popup-buy-now-btn">Buy with VertoShop</button>
                        <a href="#" className="women-more-payment-options">More payment options</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
const LoginRequiredPopup = ({ onClose, onNavigate }) => {
    const handlePopupContentClick = (e) => e.stopPropagation();
    return (
        <div className="women-catalog-popup-overlay" onClick={onClose}>
            <div className="women-catalog-login-content" onClick={handlePopupContentClick}>
                <button className="women-catalog-popup-close-btn" onClick={onClose}><CloseIcon width={22} height={22} /></button>
                <div className="women-catalog-login-image"><LoginIllustrationIcon /></div>
                <div className="women-catalog-login-details">
                    <h2>Please Login or Sign Up</h2>
                    <p>You need to log in before adding items to your cart.</p>
                    <button onClick={onNavigate} className="women-catalog-login-nav-btn">Go to Login / Sign Up</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Women Component ---
const Women = ({ onAddToCart, currentUser, justAddedProductId }) => {
    const navigate = useNavigate();
    const filterRef = useRef(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupProduct, setPopupProduct] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [openFilter, setOpenFilter] = useState(null);
    const [gridLayout, setGridLayout] = useState("grid-5-cols");
    const [sortBy, setSortBy] = useState('featured');
    const [activeFilters, setActiveFilters] = useState({
        availability: [],
        color: [],
        category: [],
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // *** YAHAN BADLAAV KIYA GAYA HAI ***
                // Ab yeh code 'products' ke bajaye 'women_products' collection se data layega.
                const productsCollection = collection(db, "women_products");

                const snapshot = await getDocs(productsCollection);
                const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllProducts(productList);
            } catch (err) {
                console.error("Error fetching from Firestore:", err);
                setError("Could not load products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const subCategoryOptions = useMemo(() => {
        const categories = allProducts.map(p => p.category);
        return [...new Set(categories)].filter(Boolean);
    }, [allProducts]);

    const filteredAndSortedProducts = useMemo(() => {
        let processedProducts = [...allProducts];
        if (activeFilters.availability.length > 0) {
            processedProducts = processedProducts.filter(p => {
                const isInStock = activeFilters.availability.includes("In stock") && p.inStock;
                const isOutOfStock = activeFilters.availability.includes("Out of stock") && !p.inStock;
                return isInStock || isOutOfStock;
            });
        }
        if (activeFilters.color.length > 0) {
            processedProducts = processedProducts.filter(p => activeFilters.color.includes(p.color));
        }
        if (activeFilters.category.length > 0) {
            processedProducts = processedProducts.filter(p => activeFilters.category.includes(p.category));
        }
        switch (sortBy) {
            case 'price-asc': processedProducts.sort((a, b) => a.price - b.price); break;
            case 'price-desc': processedProducts.sort((a, b) => b.price - a.price); break;
            case 'alpha-asc': processedProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'alpha-desc': processedProducts.sort((a, b) => b.name.localeCompare(a.name)); break;
            default: break;
        }
        return processedProducts;
    }, [allProducts, activeFilters, sortBy]);

    const handleOpenPopup = (product) => {
        if (!currentUser) {
            setShowLoginPopup(true);
            return;
        }
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
    };
    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="women-catalog-page-container">
            <header className="women-catalog-header"><h1>Women's Collection</h1></header>

            <div className="women-catalog-toolbar">
                <div className="women-catalog-filters" ref={filterRef}>
                    <div className="women-catalog-filter-group">
                        <button onClick={() => toggleFilter('availability')} className="women-catalog-filter-btn">
                            Availability <ChevronDownIcon />
                        </button>
                        {openFilter === 'availability' && (
                            <div className="women-catalog-filter-dropdown">
                                <ul className="women-catalog-dropdown-list">
                                    {availabilityOptions.map(option => (
                                        <li key={option}><label><input type="checkbox" checked={activeFilters.availability.includes(option)} onChange={() => handleFilterChange('availability', option)} /> {option}</label></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="women-catalog-filter-group">
                        <button onClick={() => toggleFilter('color')} className="women-catalog-filter-btn">
                            Color <ChevronDownIcon />
                        </button>
                        {openFilter === 'color' && (
                            <div className="women-catalog-filter-dropdown">
                                <div className="women-catalog-color-list">
                                    {colorOptions.map(color => (
                                        <button key={color} className={`women-catalog-color-swatch ${activeFilters.color.includes(color) ? 'selected' : ''}`} style={{ backgroundColor: color.toLowerCase() }} onClick={() => handleFilterChange('color', color)} title={color} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="women-catalog-filter-group">
                        <button onClick={() => toggleFilter('category')} className="women-catalog-filter-btn" disabled={subCategoryOptions.length === 0}>
                            Categories <ChevronDownIcon />
                        </button>
                        {openFilter === 'category' && (
                            <div className="women-catalog-filter-dropdown">
                                <ul className="women-catalog-dropdown-list">
                                    {subCategoryOptions.map(option => (
                                        <li key={option}><label><input type="checkbox" checked={activeFilters.category.includes(option)} onChange={() => handleFilterChange('category', option)} /> {option}</label></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="women-catalog-tools">
                    <span className="women-catalog-item-count">{filteredAndSortedProducts.length} items</span>
                    <div className="women-catalog-filter-group">
                        <button onClick={() => toggleFilter('sort')} className="women-catalog-filter-btn">
                            Sort <ChevronDownIcon />
                        </button>
                        {openFilter === 'sort' && (
                            <div className="women-catalog-filter-dropdown women-catalog-sort-dropdown">
                                <ul className="women-catalog-dropdown-list women-catalog-sort-list">
                                    {sortOptions.map(option => (
                                        <li key={option.value} className={sortBy === option.value ? 'active' : ''} onClick={() => handleSortChange(option.value)}>
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

            <div className={`women-catalog-grid ${gridLayout}`}>
                {filteredAndSortedProducts.map(product => (
                    <div key={product.id} className="women-catalog-card">
                        <div className="women-catalog-img-wrapper">
                            <img src={product.images[0]} alt={product.name} className="women-catalog-img-main" />
                            {product.images[1] && <img src={product.images[1]} alt={product.name} className="women-catalog-img-hover" />}
                        </div>
                        <div className="women-catalog-info">
                            <p className="name">{product.name}</p>
                            <p className="price">${product.price}</p>
                            <button className="women-catalog-add-btn" onClick={() => handleOpenPopup(product)}>
                                <PlusIcon /> Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {popupProduct && (<ProductPopup product={popupProduct} onClose={handleClosePopup} onConfirmAddToCart={handleConfirmAddToCart} />)}
            {showLoginPopup && (<LoginRequiredPopup onClose={() => setShowLoginPopup(false)} onNavigate={handleNavigateToLogin} />)}
        </div>
    );
};

export default Women;