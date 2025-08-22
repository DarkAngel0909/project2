import React, { useState, useEffect } from "react";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("hospitalTheme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        alert('Login successful!');
        // Handle successful login (redirect, etc.)
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="login-header-content">
          <div className="login-logo">
            <div className="login-logo-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="login-logo-text">HealthCare Feedback</span>
          </div>
          <button
            className="login-back-link"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </button>
        </div>
      </header>

      <main className="login-main-content">
        <div className="login-form-section">
          <div className="login-hero-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M12.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to your account to access the admin dashboard and manage feedback.
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
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Remember me</span>
              </label>
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => alert('Forgot password functionality would go here')}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`login-submit-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-footer-text">
            <p>
              Don't have an account?{' '}
              <button
                className="register-link"
                onClick={() => (window.location.href = "/register")}
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="login-footer">
        <p>
          &copy; 2025 HealthCare Feedback. Your privacy and security are our priority.
        </p>
      </footer>
    </div>
  );
}