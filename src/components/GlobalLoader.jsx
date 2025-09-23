import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const GlobalLoader = ({ children, delay = 2000 }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [location, delay]);

  return (
    <div>
      {loading ? <Loader text="Loading products..." /> : children}
    </div>
  );
};

export default GlobalLoader;
