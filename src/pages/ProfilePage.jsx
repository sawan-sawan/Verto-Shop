import React, { useState, useRef, useEffect } from 'react';
import "../pages/ProfilePage.css";

// Camera Icon for the profile picture upload
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export default function ProfilePage({ user, handleLogout, onProfileUpdate }) {
  // Profile image ke preview ke liye state
  const [profileImage, setProfileImage] = useState('');
  
  // Form input values ke liye state
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
  });
  
  // Edit mode enable/disable
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);

  // User info set karna
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.displayName || 'Guest User',
        bio: user.bio || 'Please add a short bio.',
      });
      if (user.photoURL) {
        setProfileImage(user.photoURL);
      }
    }
  }, [user]);

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      // Optional: backend upload logic
    }
  };

  // Click image = open file selector
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Edit/Save toggle
  const handleSaveToggle = () => {
    if (isEditing && onProfileUpdate) {
      onProfileUpdate(formData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="profile-page-container">
        <div className="container">
          <div className="profile-card">

            {/* --- Header Section --- */}
            <header className="profile-header">
              <div className="user-info">
                
                {/* Profile Picture or Letter Avatar */}
                <div
                  className={`profile-pic-wrapper ${isEditing ? 'editable' : ''}`}
                  onClick={handleImageClick}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-pic" />
                  ) : (
                    <div className="profile-letter">
                      {formData.fullName
                        ? formData.fullName.charAt(0).toUpperCase()
                        : 'U'}
                    </div>
                  )}
                  {isEditing && (
                    <div className="camera-overlay">
                      <CameraIcon />
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />

                {/* User Details */}
                <div className="user-details">
                  <h1>{formData.fullName || 'User Name'}</h1>
                  <p>{user ? user.email : 'user.email@example.com'}</p>
                </div>
              </div>

              <button
                onClick={handleSaveToggle}
                className={`edit-button ${isEditing ? 'save-mode' : 'edit-mode'}`}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </header>

            {/* --- Form Section --- */}
            <main className="profile-form">
              <div className="form-grid-single">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                    placeholder="Your Full Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Your Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-textarea"
                    placeholder="Tell us about yourself"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </main>

            {/* --- Footer Section --- */}
            <footer className="profile-footer">
              <h2>My Email Address</h2>
              <div className="email-info">
                <div className="email-avatar">
                  {user ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="email-details">
                  <p>{user ? user.email : 'user.email@example.com'}</p>
                  <p>This is your primary login email.</p>
                </div>
              </div>

              <div className="footer-actions">
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
