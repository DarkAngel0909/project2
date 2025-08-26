import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();


  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
      
            </div>
            <span className="logo-text">HealthCare Feedback</span>
          </div>

          {/* Right-side buttons */}
          <div className="header-buttons">
            <button className="admin-link" onClick={() => navigate("/admin")}>
              Admin Login
            </button>
        <button className="login-button" onClick={() => navigate("/login")}>
  Login
</button>


          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-icon">
      
          </div>

          <h1 className="hero-title">Help Us Improve</h1>
          <p className="hero-subtitle">
            Your feedback helps us provide better healthcare services. Share
            your experience with us.
          </p>

          {/* Start Feedback Button */}
          <button className="start-button" onClick={() => navigate("/home")}>
            <span>Start Feedback</span>
     
            
          </button>

          {/* Features */}
          <div className="features">
            <div className="feature">
     
              <span>Anonymous</span>
            </div>

            <div className="feature">
       
              <span>5 minutes</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; 2025 HealthCare Feedback. Your privacy and security are our
          priority.
        </p>
      </footer>
    </div>
  );
}
