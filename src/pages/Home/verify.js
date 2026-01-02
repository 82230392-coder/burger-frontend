import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("verifyEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!code) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/verify", {
        email,
        code,
      });

      localStorage.removeItem("verifyEmail");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <Layout>
        <div className="auth-container">
          <div className="auth-box">
            <h2>No verification request found</h2>
            <p>Please register again.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Verify Your Email</h2>
          <p className="auth-sub">
            Enter the 6-digit code sent to <b>{email}</b>
          </p>

          {error && <p style={{ color: "#ff4757" }}>{error}</p>}

          <form onSubmit={handleVerify} className="auth-form">
            <div className="input-group">
              <label>Verification Code</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
