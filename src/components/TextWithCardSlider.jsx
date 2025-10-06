import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./TextWithCardSlider.css";

export default function TextWithCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timeoutRef = useRef(null);

  const cards = [
    { id: 1, image: "/img/fimg1.webp" },
    { id: 2, image: "/img/fimg2.webp" },
    { id: 3, image: "/img/fimg3.webp" },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
    restartAutoPlay();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
    restartAutoPlay();
  };

  // === Restart autoplay after manual action ===
  const restartAutoPlay = () => {
    setIsAutoPlay(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 5000); // Auto resumes after 5 sec
  };

  // === Auto-slide logic ===
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === cards.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, cards.length]);

  const getCardStyles = (index) => {
    const position = (index - currentIndex + cards.length) % cards.length;
    const normalized = position > 1 ? position - cards.length : position;
    return {
      rotation: normalized * 5,
      xPosition: `calc(${normalized} * (clamp(100px, 15vw, 180px)))`,
      zIndex: normalized === 0 ? 10 : 0,
    };
  };

  return (
    <section className="section">
      <div className="left-content">
        <h2>Premium Fleece Collection</h2>
        <p>
         This is heavyweight 410 GSM Fleece, enzyme-washed to feel soft and broken-in from the start. 
        </p>
        <button>Explore Now</button>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel-container">
          {cards.map((card, index) => {
            const { rotation, xPosition, zIndex } = getCardStyles(index);
            return (
              <motion.div
                key={card.id}
                className="card"
                animate={{
                  x: xPosition,
                  rotate: rotation,
                  zIndex,
                  scale: index === currentIndex ? 1 : 0.9,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.8,
                }}
                style={{ backgroundImage: `url(${card.image})` }}
              />
            );
          })}
        </div>

        <div className="controls">
          <button onClick={goToPrevious}>
            <ChevronLeft />
          </button>
          <button onClick={goToNext}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
