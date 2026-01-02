import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");

    if (name === "password") calculatePasswordStrength(value);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "#ff4757";
    if (passwordStrength <= 50) return "#ffa502";
    if (passwordStrength <= 75) return "#ffd93d";
    return "#00b894";
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("verifyEmail", formData.email);
      navigate("/verify");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-bg-circle auth-circle-1"></div>
        <div className="auth-bg-circle auth-circle-2"></div>
        <div className="auth-bg-circle auth-circle-3"></div>

        <div className="auth-box">
          <div className="auth-header">
            <div className="auth-icon">
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h2 className="auth-title">Create an Account</h2>
            <p className="auth-sub">Join us and enjoy delicious food anytime.</p>
          </div>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label><i className="bi bi-person"></i> Full Name</label>
              <div className="input-wrapper">
                <input name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label><i className="bi bi-envelope"></i> Email</label>
              <div className="input-wrapper">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label><i className="bi bi-lock"></i> Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                </button>
              </div>

              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{ width: `${passwordStrength}%`, background: getPasswordStrengthColor() }}
                    />
                  </div>
                  <span style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthLabel()}
                  </span>
                </div>
              )}
            </div>

            <div className="input-group">
              <label><i className="bi bi-shield-check"></i> Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <i className={`bi bi-eye${showConfirmPassword ? "-slash" : ""}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Login</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
