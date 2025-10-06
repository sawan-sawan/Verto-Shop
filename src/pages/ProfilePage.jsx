// ProfilePage.jsx (FINAL CORRECTED CODE)
import React, { useState, useRef, useEffect } from 'react';
import "../pages/ProfilePage.css";
import { useScrollToTop } from "../hooks/useScrollToTop";

// --- SVG Icons ---
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Logout Confirmation Popup Component ---
const LogoutConfirmationPopup = ({ onClose, onConfirm }) => {
  const handlePopupContentClick = (e) => e.stopPropagation();
  return (
    <div className="logout-popup-overlay" onClick={onClose}>
      <div className="logout-popup-content" onClick={handlePopupContentClick}>
        <button className="logout-popup-close-btn" onClick={onClose}><CloseIcon /></button>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="logout-popup-actions">
          <button className="logout-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="logout-btn-confirm" onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
};

// ✅ Step 4: Props mein `userProfile` add karein
export default function ProfilePage({ user, userProfile, handleLogout, onProfileUpdate }) {
  useScrollToTop();

  const [profileImage, setProfileImage] = useState('');
  const [formData, setFormData] = useState({ fullName: '', bio: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const fileInputRef = useRef(null);

  // ✅ Step 5: Data ko `userProfile` se load karein
  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.displayName || 'Guest User',
        bio: userProfile.bio || '', // Default bio khaali rakhein
      });
    }
    if (user && user.photoURL) {
      setProfileImage(user.photoURL);
    }
  }, [user, userProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setProfileImage(URL.createObjectURL(file)); }
  };

  const handleImageClick = () => {
    if (isEditing) { fileInputRef.current.click(); }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Step 6: Save button ab App.jsx waale function ko call karega
  const handleSaveToggle = () => {
    if (isEditing) {
      onProfileUpdate(formData);
    }
    setIsEditing(!isEditing);
  };

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const handleClosePopup = () => setShowLogoutConfirm(false);
  const handleConfirmLogout = () => {
    handleLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div className="profile-page-container">
        <div className="container">
          <div className="profile-card">
            <header className="profile-header">
              <div className="user-info">
                <div className={`profile-pic-wrapper ${isEditing ? 'editable' : ''}`} onClick={handleImageClick}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-pic" />
                  ) : (
                    <div className="profile-letter">{formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'U'}</div>
                  )}
                  {isEditing && (<div className="camera-overlay"><CameraIcon /></div>)}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
                <div className="user-details">
                  <h1>{formData.fullName}</h1>
                  <p>{user?.email}</p>
                </div>
              </div>
              <button onClick={handleSaveToggle} className={`edit-button ${isEditing ? 'save-mode' : 'edit-mode'}`}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </header>
            <main className="profile-form">
              <div className="form-grid-single">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} disabled={!isEditing} className="form-input" placeholder="Your Full Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Your Bio</label>
                  <textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} disabled={!isEditing} className="form-textarea" placeholder="Tell us about yourself" rows="4"></textarea>
                </div>
              </div>
            </main>
            <footer className="profile-footer">
              <h2>My Email Address</h2>
              <div className="email-info">
                <div className="email-avatar">{user ? user.email.charAt(0).toUpperCase() : 'U'}</div>
                <div className="email-details">
                  <p>{user?.email}</p>
                  <p>This is your primary login email.</p>
                </div>
              </div>
              <div className="footer-actions">
                <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
              </div>
            </footer>
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <LogoutConfirmationPopup onClose={handleClosePopup} onConfirm={handleConfirmLogout} />
      )}
    </>
  );
}