import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  // Scroll State
  const [isVisible, setIsVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    const heightToShow = 250;
    const scrollPos =
      document.body.scrollTop || document.documentElement.scrollTop;
    scrollPos > heightToShow ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      <footer className="footer_main" style={styles.footer}>
        <Container>
          <Row>
            {/* LOCATION */}
            <Col sm={6} lg={3} className="mb-4">
              <div className="footer_box text-center" style={styles.footerBox}>
                <div style={styles.iconWrapper}>
                  <i className="bi bi-geo-alt-fill" style={styles.icon}></i>
                </div>
                <h5 style={styles.heading}>Location</h5>
                <p style={styles.text}>Baalback, Lebanon</p>
                <p style={styles.text}>ras alein Street</p>
                <p style={styles.text}>Building 2</p>
              </div>
            </Col>

            {/* WORKING HOURS */}
            <Col sm={6} lg={3} className="mb-4">
              <div className="footer_box text-center" style={styles.footerBox}>
                <div style={styles.iconWrapper}>
                  <i className="bi bi-clock-fill" style={styles.icon}></i>
                </div>
                <h5 style={styles.heading}>Working Hours</h5>
                <p style={styles.text}>Mon–Fri: 9:00 AM – 10:00 PM</p>
                <p style={styles.text}>Saturday: 10:00 AM – 8:00 PM</p>
                <p style={styles.text}>Sunday: Closed</p>
              </div>
            </Col>

            {/* ORDER NOW */}
            <Col sm={6} lg={3} className="mb-4">
              <div className="footer_box text-center" style={styles.footerBox}>
                <div style={styles.iconWrapper}>
                  <i className="bi bi-telephone-fill" style={styles.icon}></i>
                </div>
                <h5 style={styles.heading}>Order Now</h5>
                <p style={styles.text}>Fast delivery & fresh taste</p>
                <p>
                  <Link to="tel:+96176123456" className="calling" style={styles.phoneLink}>
                    +961 76 123 456
                  </Link>
                </p>
              </div>
            </Col>

            {/* SOCIAL MEDIA */}
            <Col sm={6} lg={3} className="mb-4">
              <div className="footer_box text-center" style={styles.footerBox}>
                <div style={styles.iconWrapper}>
                  <i className="bi bi-share-fill" style={styles.icon}></i>
                </div>
                <h5 style={styles.heading}>Follow Us</h5>
                <p style={styles.text}>Stay connected with us</p>
                <ul className="footer_social list-unstyled d-flex justify-content-center mt-2" style={styles.socialList}>
                  <li className="mx-2">
                    <Link to="/" style={styles.socialLink}>
                      <i className="bi bi-facebook"></i>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link to="/" style={styles.socialLink}>
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link to="/" style={styles.socialLink}>
                      <i className="bi bi-tiktok"></i>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link to="/" style={styles.socialLink}>
                      <i className="bi bi-youtube"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          {/* COPYRIGHT */}
          <Row className="copy_right mt-4" style={styles.copyright}>
            <Col>
              <div className="text-center">
                <ul className="list-unstyled mb-0" style={styles.copyrightList}>
                  <li style={styles.copyrightText}>© 2025 New Burger. All Rights Reserved.</li>
                  <li style={styles.copyrightLinkItem}>
                    <Link to="/about" style={styles.copyrightLink}>About Us</Link>
                  </li>
                  <li style={styles.copyrightLinkItem}>
                    <Link to="/terms" style={styles.copyrightLink}>Terms Of Use</Link>
                  </li>
                  <li style={styles.copyrightLinkItem}>
                    <Link to="/privacy" style={styles.copyrightLink}>Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Scroll To Top */}
      {isVisible && (
        <div className="scroll_top" onClick={scrollTop} style={styles.scrollTop}>
          <i className="bi bi-arrow-up"></i>
        </div>
      )}
    </>
  );
}

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    color: '#fff',
    padding: '4rem 0 2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  footerBox: {
    padding: '1.5rem',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    height: '100%',
  },
  iconWrapper: {
    width: '60px',
    height: '60px',
    margin: '0 auto 1rem',
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  icon: {
    fontSize: '1.5rem',
    color: '#fff',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#fff',
    letterSpacing: '0.5px',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.95rem',
    marginBottom: '0.5rem',
    lineHeight: '1.6',
  },
  phoneLink: {
    color: '#FF6B6B',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  socialList: {
    gap: '0.5rem',
  },
  socialLink: {
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '1.2rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  copyright: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '2rem',
    marginTop: '2rem',
  },
  copyrightList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
  },
  copyrightText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.9rem',
  },
  copyrightLinkItem: {
    display: 'inline',
  },
  copyrightLink: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  scrollTop: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)',
    zIndex: 999,
    color: '#fff',
    fontSize: '1.2rem',
  },
};

// Add CSS for hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .footer_box:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08) !important;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
  
  .footer_box:hover > div:first-child {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }
  
  .calling:hover {
    color: #FF8E53 !important;
    letter-spacing: 1px;
  }
  
  .footer_social li a:hover {
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%) !important;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
  
  .copy_right a:hover {
    color: #FF6B6B !important;
  }
  
  .copy_right a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
    transition: width 0.3s ease;
  }
  
  .copy_right a:hover::after {
    width: 100%;
  }
  
  .scroll_top:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 30px rgba(255, 107, 107, 0.6);
  }
  
  .scroll_top:active {
    transform: translateY(-3px) scale(1);
  }
  
  @media (max-width: 768px) {
    .copy_right ul {
      flex-direction: column;
      gap: 0.75rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Footer;