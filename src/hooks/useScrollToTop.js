import { useEffect } from 'react';

/**
 * Custom hook to scroll to top when component mounts
 * Can be used in individual components for immediate scroll to top
 */
export const useScrollToTop = (dependency = true) => {
  useEffect(() => {
    if (dependency) {
      // Scroll to top immediately
      window.scrollTo(0, 0);
      
      // Also reset scroll for document elements
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [dependency]);
};

/**
 * Function to manually trigger scroll to top
 * Can be called from event handlers or other functions
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  
  // Also reset document scroll
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

/**
 * Function to immediately scroll to top without animation
 */
export const scrollToTopInstant = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};
