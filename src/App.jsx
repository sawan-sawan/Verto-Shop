// App.jsx (Final Fix for Race Condition)

import React, { useState, useEffect, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import "./App.css";

// Components
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
import GlobalLoader from "./components/GlobalLoader";

// Pages
import WorkspaceSale from "./pages/WorkpaceSale";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/AuthLogin";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [justAddedProductId, setJustAddedProductId] = useState(null);
  
  // === START: RACE CONDITION FIX ===
  const [initialCartLoaded, setInitialCartLoaded] = useState(false);
  // === END: RACE CONDITION FIX ===

  const loadCartFromFirestore = useCallback(async (userId) => {
    if (!userId) return;
    const cartRef = doc(db, "carts", userId);
    try {
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        setCartItems(cartSnap.data().items || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error loading cart from Firestore:", error);
    } finally {
      // === START: RACE CONDITION FIX ===
      // Signal bhej do ki initial cart load ho chuka hai
      setInitialCartLoaded(true);
      // === END: RACE CONDITION FIX ===
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        loadCartFromFirestore(user.uid);
      } else {
        setCartItems([]);
        // === START: RACE CONDITION FIX ===
        // Logout par signal reset kar do
        setInitialCartLoaded(false);
        // === END: RACE CONDITION FIX ===
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, [loadCartFromFirestore]);

  useEffect(() => {
    const saveCartToFirestore = async () => {
      // === START: RACE CONDITION FIX ===
      // Ab hum tabhi save karenge jab initial cart load ho chuka ho
      if (currentUser && !loadingAuth && initialCartLoaded) {
      // === END: RACE CONDITION FIX ===
        const cartRef = doc(db, "carts", currentUser.uid);
        try {
          await setDoc(cartRef, { items: cartItems });
        } catch (error) {
          console.error("Error saving cart to Firestore:", error);
        }
      }
    };
    saveCartToFirestore();
  }, [cartItems, currentUser, loadingAuth, initialCartLoaded]); // initialCartLoaded ko dependency mein add karein

  const handleAddToCart = (product, details) => {
    const cartId = `${product.id}-${details.size}`;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.cartId === cartId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + details.quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, ...details, cartId }];
      }
    });
    setJustAddedProductId(product.id);
    setTimeout(() => setJustAddedProductId(null), 600);
  };

  const handleUpdateQuantity = (cartId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.cartId !== cartId);
      }
      return prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      );
    });
  };
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Logout Error:", error));
  };

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

  return (
    <Router>
      <Navbar cartItemCount={cartItemCount} user={currentUser} handleLogout={handleLogout} />
      
      {loadingAuth ? (
        <GlobalLoader />
      ) : (
        <>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<><Hero /><PopularProducts /><Categories /><NewArrival /><DealsSection /><OfferBanner /><Features /><Contact /></>}/>
            
            {/* Other Pages */}
            <Route path="/men" element={<GlobalLoader><WorkspaceSale defaultCollection="men" onAddToCart={handleAddToCart} justAddedProductId={justAddedProductId} currentUser={currentUser} /></GlobalLoader>}/>
            <Route path="/women" element={<GlobalLoader><WorkspaceSale defaultCollection="women" onAddToCart={handleAddToCart} justAddedProductId={justAddedProductId} currentUser={currentUser} /></GlobalLoader>}/>
            <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} />}/>
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <LoginPage />}/>
            <Route path="/profile" element={currentUser ? <ProfilePage user={currentUser} handleLogout={handleLogout} /> : <Navigate to="/login" />}/>
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;