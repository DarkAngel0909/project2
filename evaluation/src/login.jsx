import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
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
        alert('Login successful!');
        navigate("/home"); // <-- SPA navigation
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
            <span className="login-logo-text">HealthCare Feedback</span>
          </div>
          <button className="login-back-link" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </header>

      <main className="login-main-content">
        <div className="login-form-section">


          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group-checkbox">
              <label className="checkbox-label">
                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="checkbox-input"/>
                <span className="checkbox-text">Remember me</span>
              </label>
              <button type="button" className="forgot-password-link" onClick={() => alert('Forgot password functionality would go here')}>
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={isLoading} className={`login-submit-button ${isLoading ? 'loading' : ''}`}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer-text">
            <p>
              Don't have an account?{' '}
              <button className="register-link" onClick={() => navigate("/register")}>
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="login-footer">
        <p>&copy; 2025 HealthCare Feedback. Your privacy and security are our priority.</p>
      </footer>
    </div>
  );
}
