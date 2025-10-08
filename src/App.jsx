// App.jsx (FINAL CORRECTED CODE)
import React, { useState, useEffect, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { auth, db } from "./firebase";
// ✅ Step 1: `updateProfile` import karein
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
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
import GlobalNotification from './components/GlobalNotification';
import TextWithCardSlider from "./components/TextWithCardSlider";
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
  const [initialCartLoaded, setInitialCartLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // === Load Cart from Firestore ===
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
      setInitialCartLoaded(true);
    }
  }, []);

  // === Load User Profile from Firestore ===
  const loadUserProfile = useCallback(async (userId) => {
    if (!userId) return;
    const profileRef = doc(db, "users", userId);
    try {
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setUserProfile(profileSnap.data());
      } else {
        await setDoc(profileRef, {
          displayName: "Guest User",
          bio: "", // Bio ko shuru mein khaali rakhein
          createdAt: new Date(),
        });
        setUserProfile({ displayName: "Guest User", bio: "" });
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  }, []);

  // === Firebase Auth Listener ===
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await Promise.all([loadCartFromFirestore(user.uid), loadUserProfile(user.uid)]);
      } else {
        setCartItems([]);
        setUserProfile(null);
        setInitialCartLoaded(false);
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, [loadCartFromFirestore, loadUserProfile]);

  // === Save Cart to Firestore ===
  useEffect(() => {
    const saveCartToFirestore = async () => {
      if (currentUser && !loadingAuth && initialCartLoaded) {
        const cartRef = doc(db, "carts", currentUser.uid);
        try {
          await setDoc(cartRef, { items: cartItems });
        } catch (error) {
          console.error("Error saving cart to Firestore:", error);
        }
      }
    };
    saveCartToFirestore();
  }, [cartItems, currentUser, loadingAuth, initialCartLoaded]);

  // === Cart Functions ===
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

  // ✅ Step 2: Profile Update function banayein
  const handleProfileUpdate = async (updatedData) => {
    if (!currentUser) return;

    const { fullName, bio } = updatedData;
    const userRef = doc(db, "users", currentUser.uid);

    try {
      // Firebase Auth (ID Card) update karein
      await updateProfile(currentUser, {
        displayName: fullName,
      });

      // Firestore Database (Personal File) update karein
      await setDoc(userRef, {
        displayName: fullName,
        bio: bio
      }, { merge: true });

      // Local state update karein
      setUserProfile(prevProfile => ({ ...prevProfile, displayName: fullName, bio: bio }));

      // Success message dikhayein
      sessionStorage.setItem('successMessage', 'Profile updated successfully!');

    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Error updating profile.");
    }
  };

  // === Smooth Scroll (Lenis) ===
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
      <GlobalNotification />
      <Navbar cartItemCount={cartItemCount} user={currentUser} handleLogout={handleLogout} />

      {loadingAuth ? (
        <GlobalLoader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<> <Hero /> <PopularProducts /> <Categories /> <NewArrival /> <DealsSection /><TextWithCardSlider /> <OfferBanner /> <Features />  <Contact /> </>} />
            <Route path="/men" element={<WorkspaceSale defaultCollection="men" onAddToCart={handleAddToCart} justAddedProductId={justAddedProductId} currentUser={currentUser} />} />
            <Route path="/women" element={<WorkspaceSale defaultCollection="Women" onAddToCart={handleAddToCart} justAddedProductId={justAddedProductId} currentUser={currentUser} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <LoginPage />} />
            
            {/* ✅ Step 3: ProfilePage ko naya function pass karein */}
            <Route
              path="/profile"
              element={
                currentUser ? (
                  <ProfilePage
                    user={currentUser}
                    userProfile={userProfile}
                    handleLogout={handleLogout}
                    onProfileUpdate={handleProfileUpdate} // Yahan pass karein
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;