import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PopularProducts from "./components/PopularProducts";
import Categories from "./components/Categories";
import NewArrival from "./components/NewArrival";
import DealsSection from "./components/DealsSection";
import Contact from "./components/Contact";
import OfferBanner from "./components/OfferBanner";
import Footer from "./components/Footer";
import Features from "./components/Features";
import WorkspaceSale from "./pages/WorkpaceSale";
import GlobalLoader from "./components/GlobalLoader";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/AuthLogin";

function App() {
  // --- START: CART STATE MANAGEMENT ---

  // Load cart from sessionStorage or start with an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = sessionStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart items from sessionStorage", error);
      return [];
    }
  });

  // State to trigger animation on the product card
  const [justAddedProductId, setJustAddedProductId] = useState(null);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, details) => {
    // A unique ID for each cart item, combining product ID and size
    const cartId = `${product.id}-${details.size}`;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.cartId === cartId);

      if (existingItem) {
        // If item with same ID and size exists, update its quantity
        return prevItems.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + details.quantity }
            : item
        );
      } else {
        // Otherwise, add the new item to the cart
        return [...prevItems, { ...product, ...details, cartId }];
      }
    });

    // Trigger animation on product card
    setJustAddedProductId(product.id);
    setTimeout(() => setJustAddedProductId(null), 600); // Animation duration matches CSS
  };

  const handleUpdateQuantity = (cartId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        return prevItems.filter(item => item.cartId !== cartId);
      }
      return prevItems.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // --- END: CART STATE MANAGEMENT ---

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Calculate total number of items in the cart for the badge
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Navbar cartItemCount={cartItemCount} />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PopularProducts />
              <Categories />
              <NewArrival />
              <DealsSection />
              <OfferBanner />
              <Features />
              <Contact />
            </>
          }
        />

        {/* Men / Women Pages */}
        <Route
          path="/men"
          element={
            <GlobalLoader delay={1500}>
              <WorkspaceSale
                defaultCollection="men"
                onAddToCart={handleAddToCart}
                justAddedProductId={justAddedProductId}
              />
            </GlobalLoader>
          }
        />
        <Route
          path="/women"
          element={
            <GlobalLoader delay={1500}>
              <WorkspaceSale
                defaultCollection="women"
                onAddToCart={handleAddToCart}
                justAddedProductId={justAddedProductId}
              />
            </GlobalLoader>
          }
        />
        <Route
          path="/cart"
          element={

            <CartPage
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
            />

          }
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;