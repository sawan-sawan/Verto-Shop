import React from "react";
import "./NewArrival.css";

const images = [
  "/img/nimg1.webp",
  "/img/nimg2.webp",
  "/img/nimg3.webp",
  "/img/nimg4.jpg",
  "/img/nimg5.webp",
  "/img/nimg6.webp",
  "/img/nimg7.webp",
  "/img/nimg8.webp",
];

export default function NewArrival() {
  return (
    <section className="new-arrival">
      <h2 className="new-arrival-heading">NEW ARRIVALS</h2>

      <div className="new-arrival-slider">
        <div className="new-arrival-track">
          {images.concat(images).map((img, index) => (
            <div className="new-arrival-item" key={index}>
              <img src={img} alt={`new-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
