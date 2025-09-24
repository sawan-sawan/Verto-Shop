import React from "react";
import "./AuthLogin.css";
import { useScrollToTop } from "../hooks/useScrollToTop";


export default function AuthLogin() {
  useScrollToTop();

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side */}
        <div className="auth-left">
          <div className="auth-quote-box">
            <p className="auth-quote-title">A WISE QUOTE</p>
            <h2 className="auth-quote-main">Get Everything You Want</h2>
            <p className="auth-quote-sub">
              You can get everything you want if you work hard,
              trust the process, and stick to the plan.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right">
          <div className="auth-box">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">
              Enter your email and password to access your account
            </p>
            <form className="auth-form">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />

              <label>Password</label>
              <input type="password" placeholder="Enter your password" />

              <div className="auth-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="/">Forgot Password</a>
              </div>

              <button type="submit" className="auth-signin-btn">
                Sign In
              </button>

              <button type="button" className="auth-google-btn">
                <img src="/img/google-icon.png" alt="Google" />
                Sign In with Google
              </button>
            </form>

            <p className="auth-footer">
              Don’t have an account? <a href="/">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
