// App.jsx (CORRECTED CODE)
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
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
// Men.jsx यहाँ import है, यह सही है।

// Pages
import WorkspaceSale from "./pages/WorkpaceSale";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/AuthLogin";
import ProfilePage from "./pages/ProfilePage";
import Men from "./pages/Men"; 
import Women from "./pages/Women"; // 
import Glasses from "./pages/Glasses";
import Belt from "./pages/Belt";
import Shoes from "./pages/Shoes";
import Fleece from "./pages/Fleece";
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
          bio: "",
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

  const handleProfileUpdate = async (updatedData) => {
    if (!currentUser) return;
    const { fullName, bio } = updatedData;
    const userRef = doc(db, "users", currentUser.uid);
    try {
      await updateProfile(currentUser, { displayName: fullName });
      await setDoc(userRef, { displayName: fullName, bio: bio }, { merge: true });
      setUserProfile(prevProfile => ({ ...prevProfile, displayName: fullName, bio: bio }));
      sessionStorage.setItem('successMessage', 'Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Error updating profile.");
    }
  };

  // === Smooth Scroll (Lenis) ===


  return (
    <Router>
      <GlobalNotification />
      <Navbar cartItemCount={cartItemCount} user={currentUser} handleLogout={handleLogout} />
      {loadingAuth ? (
        <GlobalLoader />
      ) : (
        <>
          <Routes>
            {/* होमपेज पर Men सेक्शन अभी भी दिखेगा, आप चाहें तो यहाँ से <Men /> हटा सकते हैं */}
            <Route path="/" element={<> <Hero /> <PopularProducts /> <Categories /> <NewArrival /> <DealsSection /><TextWithCardSlider /><Men /> <OfferBanner /> <Features />  <Contact /> </>} />
            
            {/* ✅ यहाँ बदलाव किया गया है */}
            <Route path="/men" element={<Men onAddToCart={handleAddToCart} currentUser={currentUser} justAddedProductId={justAddedProductId} />} />
            <Route path="/women" element={<Women onAddToCart={handleAddToCart} currentUser={currentUser} justAddedProductId={justAddedProductId} />} />
            <Route path="/glasses" element={<Glasses onAddToCart={handleAddToCart} currentUser={currentUser} justAddedProductId={justAddedProductId} />} />
            <Route path="/belt" element={<Belt onAddToCart={handleAddToCart} currentUser={currentUser} justAddedProductId={justAddedProductId} />} />
            <Route path="/shoes" element={<Shoes onAddToCart={handleAddToCart} currentUser={currentUser} justAddedProductId={justAddedProductId} />} />
            <Route path="/fleece" element={<Fleece onAddToCart={handleAddToCart} currentUser={currentUser} justAddedProductId={justAddedProductId} />} />
            <Route path="/allproducts" element={<WorkspaceSale defaultCollection="Women" onAddToCart={handleAddToCart} justAddedProductId={justAddedProductId} currentUser={currentUser} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <LoginPage />} />
            <Route
              path="/profile"
              element={
                currentUser ? (
                  <ProfilePage
                    user={currentUser}
                    userProfile={userProfile}
                    handleLogout={handleLogout}
                    onProfileUpdate={handleProfileUpdate}
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