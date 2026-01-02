import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import "../../styles/HeaderStyle.css";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* ================= CHECK LOGIN ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ================= SCROLL ================= */
  const changeValueOnScroll = () => {
    const scrollValue = document.documentElement.scrollTop;
    scrollValue > 100 ? setNav(true) : setNav(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeValueOnScroll);
    return () => window.removeEventListener("scroll", changeValueOnScroll);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={nav ? "sticky" : ""}
        style={{
          ...styles.navbar,
          ...(nav ? styles.navbarScrolled : {}),
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" className="logo" style={styles.logoLink}>
              <img src={Logo} alt="Logo" className="img-fluid" style={styles.logoImg} />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={styles.toggle} />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" style={styles.nav}>
              <Nav.Link as={Link} to="/" style={styles.navLink}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" style={styles.navLink}>About</Nav.Link>
              <Nav.Link as={Link} to="/menu" style={styles.navLink}>Our Menu</Nav.Link>
              <Nav.Link as={Link} to="/contact" style={styles.navLink}>Contact</Nav.Link>

              {/* ✅ CART ONLY IF LOGGED IN */}
              {user && (
                
                <Nav.Link as={Link} to="/cart" style={styles.navLink}>
                  🛒 Cart
                </Nav.Link>
              )}

                 {/* ✅ CART ONLY IF LOGGED IN */}
              {user && (
                
                <Nav.Link as={Link} to="/orders" style={styles.navLink}>
                Orders
                </Nav.Link>
              )}

              {/* ✅ LOGIN / LOGOUT */}
              {!user ? (
                <Nav.Link as={Link} to="/login" style={styles.loginLink}>
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link onClick={handleLogout} style={styles.loginLink}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

/* ================= STYLES ================= */
const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navbar: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "1rem 0",
    transition: "all 0.3s ease",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  },
  navbarScrolled: {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "0.5rem 0",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logoImg: {
    maxHeight: "50px",
  },
  nav: {
    alignItems: "center",
    gap: "0.5rem",
  },
  navLink: {
    color: "#333",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
  },
  loginLink: {
    background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    color: "#fff",
    fontWeight: "600",
    padding: "0.6rem 1.5rem",
    marginLeft: "1rem",
    borderRadius: "50px",
    cursor: "pointer",
    textDecoration: "none",
  },
  toggle: {
    border: "none",
  },
};

export default Header;
