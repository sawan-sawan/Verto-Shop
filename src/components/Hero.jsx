import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/img/heroimg1.jpg",
  "/img/heroimg2.jpg",
  "/img/heroimg3.jpg",
  "/img/himg5.jpg",


];

import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


export default function Hero() {
  const [current, setCurrent] = useState(0);
  const textRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 🎬 Initial load animation (entrance)
    gsap.fromTo(
      textRefs.current,
      { x: (i) => (i % 2 === 0 ? -200 : 200), opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        onComplete: () => {
          // 🎯 Scroll animation only AFTER entrance is done
          textRefs.current.forEach((el, index) => {
            gsap.to(el, {
              x: index % 2 === 0 ? -80 : 80, // thoda hi slide kare
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        },
      }
    );
  }, []);

  return (
    <section className="hero">
      <div className="hero-slider">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      <div className="hero-content">
        <h1 ref={(el) => (textRefs.current[0] = el)} className="outline-text">
          SHOP SMART
        </h1>
        <h1
          ref={(el) => (textRefs.current[1] = el)}
          className="outline-text colored"
        >
          LIVE BETTER
        </h1>
        <h1 ref={(el) => (textRefs.current[2] = el)} className="outline-text">
          WITH VERTO
        </h1>

        <p
          className="cta"
          onClick={() => {
            gsap.to(window, { duration: 1.2, scrollTo: "#popular-products", ease: "power2.inOut" });
          }}
        >
          SHOP NOW <span className="arrow">↓</span>
        </p>

      </div>
    </section>
  );
}
