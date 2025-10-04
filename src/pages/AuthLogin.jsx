import React, { useState } from "react";
import "./AuthLogin.css";
import { useScrollToTop } from "../hooks/useScrollToTop";

// STEP 1: Firebase se zaroori cheezein import karein
import { auth } from "../firebase"; // Aapki banayi hui firebase.js file
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function AuthLogin() {
  useScrollToTop();
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // STEP 2: handleFormSubmit function ko update karein
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      // Login Logic: Yahan Firebase ka signIn function use hoga
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Login successful
          console.log("User logged in:", userCredential.user);
          alert("Aap successfully login ho gaye hain!");
          // Yahan aap user ko homepage par bhej sakte hain
        })
        .catch((error) => {
          // Agar login fail hota hai
          console.error("Login Error:", error.message);
          alert("Login failed: " + error.message);
        });
    } else {
      // Signup Logic: Yahan Firebase ka createUser function use hoga
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signup successful
          console.log("User created:", userCredential.user);
          alert("Aapka account safaltapoorvak ban gaya hai!");
          // Signup ke baad aap user ko login page par bhej sakte hain
          setIsLogin(true); 
        })
        .catch((error) => {
          // Agar signup fail hota hai (jaise email pehle se registered hai)
          console.error("Signup Error:", error.message);
          alert("Signup failed: " + error.message);
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side (No changes needed here) */}
        <div className="auth-left">
          <div className="auth-quote-box">
            <p className="auth-quote-title">
              {isLogin ? "A WISE QUOTE" : "JOIN US"}
            </p>
            <h2 className="auth-quote-main">
              {isLogin ? "Get Everything You Want" : "Create Your Account"}
            </h2>
            <p className="auth-quote-sub">
              {isLogin
                ? "You can get everything you want if you work hard, trust the process, and stick to the plan."
                : "Start your journey with us today. It's quick and easy!"}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right">
          <div className="auth-box">
            {/* ...logo, title, subtitle code... */}
            <h2 className="auth-title">
              {isLogin ? "Welcome Back" : "Sign Up"}
            </h2>
             <p className="auth-subtitle">
               {isLogin
                 ? "Enter your email and password to access your account"
                 : "Fill in your details to register"}
             </p>

            <form className="auth-form" onSubmit={handleFormSubmit}>
              {!isLogin && (
                <>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </>
              )}

              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />

              <button type="submit" className="auth-signin-btn">
                {isLogin ? "Sign In" : "Create Account"}
              </button>

              {/* ...baki ka form code... */}
            </form>

            <p className="auth-footer">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLogin(true)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Sign In
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}