// src/pages/ProfilePage.jsx

import React from 'react';

// App.js se user aur handleLogout props ke zariye aa rahe hain
export default function ProfilePage({ user, handleLogout }) {
  return (
    <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Aapka Profile</h1>
      
      {user && (
        <div style={{ margin: '30px 0' }}>
          <h2>User Information</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.uid}
          </p>
        </div>
      )}

      <button 
        onClick={handleLogout} 
        style={{ 
          padding: '12px 25px', 
          fontSize: '16px', 
          cursor: 'pointer',
          backgroundColor: '#ff6825',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        Logout
      </button>
    </div>
  );
}