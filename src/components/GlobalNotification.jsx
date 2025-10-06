// src/components/GlobalNotification.jsx

import React, { useState, useEffect } from 'react';

export default function GlobalNotification() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Page load hote hi sessionStorage ko check karo
    const successMessage = sessionStorage.getItem('successMessage');

    if (successMessage) {
      // Agar message hai, to state mein set karo
      setMessage(successMessage);
      
      // Message ko sessionStorage se turant हटा do taaki refresh karne par dobara na dikhe
      sessionStorage.removeItem('successMessage');

      // 3 second ke baad message ko state se bhi हटा do taaki popup hide ho jaye
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, []); // Yeh sirf ek baar page load hone par chalega

  // Agar koi message nahi hai, to kuch bhi display mat karo
  if (!message) {
    return null;
  }

  // Agar message hai, to popup display karo
  return (
    <>
      <style>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          10%, 90% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
        }

        .global-notification {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #28a745;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-size: 1rem;
          font-weight: 500;
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
      <div className="global-notification">
        {message}
      </div>
    </>
  );
}