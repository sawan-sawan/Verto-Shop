import React from "react";
import "./Contact.css";
import { useScrollToTop } from "../hooks/useScrollToTop";


export default function Contact() {
  useScrollToTop();
  return (
    <section id="contact-section" className="contact-wrapper">
      <div className="contact-container">
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/newsletter/image.png"
          alt="contact"
          className="contact-image"
        />

        <div className="contact-content">
          <div className="contact-text">
            <h1>Contact Us</h1>
            <p>
              Have questions, feedback, or need support? We’re here to help!
              Reach out to us and our team will get back to you shortly.
            </p>
            <form className="contact-form">
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Your email address" required />
              <textarea placeholder="Your message" rows="4" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
