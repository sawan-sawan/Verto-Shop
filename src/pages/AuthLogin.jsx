import React, { useState } from "react";
import "./AuthLogin.css";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function AuthLogin() {
  useScrollToTop();

  // 👇 ab default false rakha => Sign Up dikhega by default
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side */}
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
            <div className="loginlogo">

              <span className="logo-text">
                <span className="verto">VERTO</span>{" "}
                <span className="shop">Shop</span>
              </span>
            </div>
            <h2 className="auth-title">
              {isLogin ? "Welcome Back" : "Sign Up"}
            </h2>
            <p className="auth-subtitle">
              {isLogin
                ? "Enter your email and password to access your account"
                : "Fill in your details to register"}
            </p>

            <form className="auth-form">
              {!isLogin && (
                <>
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" />
                </>
              )}

              <label>Email</label>
              <input type="email" placeholder="Enter your email" />

              <label>Password</label>
              <input type="password" placeholder="Enter your password" />

              {isLogin && (
                <div className="auth-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="/">Forgot Password</a>
                </div>
              )}

              <button type="submit" className="auth-signin-btn">
                {isLogin ? "Sign In" : "Create Account"}
              </button>

              {isLogin && (
                <button type="button" className="auth-google-btn">
                  <img src="/img/google-icon.png" alt="Google" />
                  Sign In with Google
                </button>
              )}
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
