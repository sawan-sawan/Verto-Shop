import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

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
import WorkspaceSale from "./pages/WorkpaceSale";
import GlobalLoader from "./components/GlobalLoader";

function App() {
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
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PopularProducts />
              <Categories />
              <NewArrival />
              <DealsSection />
              <OfferBanner />
              <Features />
              <Contact />
            </>
          }
        />

        {/* Men / Women Pages */}
        <Route
          path="/men"
          element={
            <GlobalLoader delay={1500}>
              <WorkspaceSale defaultCollection="men" />
            </GlobalLoader>
          }
        />
        <Route
          path="/women"
          element={
            <GlobalLoader delay={1500}>
              <WorkspaceSale defaultCollection="women" />
            </GlobalLoader>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
