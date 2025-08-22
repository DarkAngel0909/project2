import React, { useEffect } from "react";
import "./landing.css";


export default function Landing() {
  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("hospitalTheme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
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
            <span className="logo-text">HealthCare Feedback</span>
          </div>
          <button
            className="admin-link"
            onClick={() => (window.location.href = "admin-login.html")}
          >
            Admin Login
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <div className="hero-icon">
            <svg
              width="64"
              height="64"
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

          <h1 className="hero-title">Help Us Improve</h1>
          <p className="hero-subtitle">
            Your feedback helps us provide better healthcare services. Share
            your experience with us.
          </p>

          <button
            className="start-button"
            onClick={() => (window.location.href = "feedback-form.html")}
          >
            <span>Start Feedback</span>
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
          </button>

          <div className="features">
            <div className="feature">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Anonymous</span>
            </div>
            <div className="feature">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>5 minutes</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>
          &copy; 2025 HealthCare Feedback. Your privacy and security are our
          priority.
        </p>
      </footer>
    </div>
  );
}
