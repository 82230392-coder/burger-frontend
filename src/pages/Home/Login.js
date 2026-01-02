import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import "../../styles/AuthStyle.css";
import axios from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (loginError) setLoginError("");
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= LOGIN SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      const user = res.data.user;

      // ✅ save user locally (optional)
      localStorage.setItem("user", JSON.stringify(user));

      setLoginSuccess(true);

      // ✅ ROLE-BASED REDIRECT
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="auth_section">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <div className="auth_card">
                <div className="auth_icon">🍔</div>

                <h2 className="text-center mb-3 auth_title">Welcome Back</h2>
                <p className="text-center mb-4 auth_subtitle">
                  Login to continue ordering your favorite burgers
                </p>

                {loginError && (
                  <Alert variant="danger" className="auth_alert">
                    {loginError}
                  </Alert>
                )}

                {loginSuccess && (
                  <Alert variant="success" className="auth_alert">
                    ✅ Login successful! Redirecting...
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>📧 Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      className="auth_input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>🔒 Password</Form.Label>
                    <div className="password_input_wrapper">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        className="auth_input"
                      />
                      <button
                        type="button"
                        className="password_toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-4">
                    <Form.Check
                      type="checkbox"
                      name="rememberMe"
                      label="Remember me"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <Link to="/forgot-password" className="auth_link">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="auth_submit_btn w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </Form>

                <p className="text-center mt-4 auth_footer">
                  Don't have an account?{" "}
                  <Link to="/register" className="auth_link">
                    Sign up
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Login;
