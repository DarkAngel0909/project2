import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!validatePassword(formData.password)) newErrors.password = "Password must be at least 8 characters";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert("Registration successful!");
        navigate("/login"); // Navigate to login page
      }, 1500);
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <div className="register-header-content">
          <div className="register-logo">
            <span className="register-logo-text">HealthCare Feedback</span>
          </div>
        </div>
      </header>

      <main className="register-main-content">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
          {errors.role && <span className="error">{errors.role}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
            />
            I agree to terms and conditions
          </label>
          {errors.agreeToTerms && <span className="error">{errors.agreeToTerms}</span>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <button onClick={() => navigate("/login")}>Sign In</button>
        </p>
      </main>
    </div>
  );
}