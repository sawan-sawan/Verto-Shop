// src/pages/AuthLogin.jsx (FINAL CORRECTED CODE)

import React, { useState } from "react";
import "./AuthLogin.css";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function AuthLogin() {
  useScrollToTop();
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      // Login logic bilkul sahi hai
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          sessionStorage.setItem('successMessage', 'You are successfully logged in!');
          window.location.href = '/profile';
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
        });
    } else {
      // Signup Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // ✅ FIX: Yahan se 'await' hata diya gaya hai.
          // Hum naam update hone ka wait nahi karenge.
          updateProfile(userCredential.user, { displayName: fullName });
          
          // Ab message turant set hoga aur page redirect ho jaayega.
          sessionStorage.setItem('successMessage', 'Your account has been created successfully!');
          window.location.href = '/profile'; // Signup ke baad seedha profile par bhej rahe hain
        })
        .catch((error) => {
          alert("Signup failed: " + error.message);
        });
    }
  };

  return (
    // Aapka JSX design waisa hi rahega
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-quote-box">
            <p className="auth-quote-title">{isLogin ? "A WISE QUOTE" : "JOIN US"}</p>
            <h2 className="auth-quote-main">{isLogin ? "Get Everything You Want" : "Create Your Account"}</h2>
            <p className="auth-quote-sub">{isLogin ? "You can get everything you want if you work hard, trust the process, and stick to the plan." : "Start your journey with us today. It's quick and easy!"}</p>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-box">
            <h2 className="auth-title">
              {isLogin ? (<><span className="auth-orange">Welcome</span> <span className="auth-black">Back</span></>) : (<><span className="auth-orange">Sign</span> <span className="auth-black">Up</span></>)}
            </h2>
            <p className="auth-subtitle">{isLogin ? "Enter your email and password to access your account" : "Fill in your details to register"}</p>
            <form className="auth-form" onSubmit={handleFormSubmit}>
              {!isLogin && (<>
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </>)}
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
              <button type="submit" className="auth-signin-btn">{isLogin ? "Sign In" : "Create Account"}</button>
            </form>
            <p className="auth-footer">
              {isLogin ? (<>Don’t have an account? <span onClick={() => setIsLogin(false)} style={{ cursor: "pointer", color: "blue" }}>Sign Up</span></>) : (<>Already have an account? <span onClick={() => setIsLogin(true)} style={{ cursor: "pointer", color: "blue" }}>Sign In</span></>)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}