import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function AdminLogin() {
  const navigate = useNavigate(); // <-- navigate hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("hospitalTheme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Admin login successful!');
        navigate("/admin-dashboard"); // <-- Admin SPA navigation
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="login-header-content">
          <div className="login-logo">
            <div className="login-logo-icon">
             
            </div>
            <span className="login-logo-text">HealthCare Feedback - Admin</span>
          </div>
          <button className="login-back-link" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </header>

      <main className="login-main-content">
        <div className="login-form-section">
      

          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">
            Secure access to system administration
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Admin Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your admin email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Admin Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your admin password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group-checkbox">
              <label className="checkbox-label">
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="checkbox-input"/>
                <span className="checkbox-text">Keep me logged in</span>
              </label>
              <button type="button" className="forgot-password-link" onClick={() => alert('Contact system administrator for password recovery')}>
                Need help?
              </button>
            </div>

            <button type="submit" disabled={isLoading} className={`login-submit-button ${isLoading ? 'loading' : ''}`}>
              {isLoading ? 'Authenticating...' : 'Admin Sign In'}
            </button>
          </form>

          <div className="login-footer-text">
            <p>
              Are you a Staff??{' '}
              <button className="register-link" onClick={() => navigate("/login")}>
                User login here
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="login-footer">
        <p>&copy; 2025 HealthCare Feedback. Administrative access - Your security is our priority.</p>
      </footer>
    </div>
  );
}