import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/HomeStyle.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

/* Section Images */
import HeroImg from "../../assets/hero/hero-2.png";
import Pizza from "../../assets/about/pizza.png";
import Salad from "../../assets/about/salad.png";
import Delivery from "../../assets/about/delivery-bike.png";
import PromotionImage from "../../assets/promotion/pro.png";
import StoreIOS from "../../assets/shop/appstore.png";
import StoreGoogle from "../../assets/shop/googleplay.png";
import DownloadImage from "../../assets/shop/e-shop.png";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      {/* ================= HERO SECTION - MODERN SPLIT DESIGN ================= */}
      <section className="modern-hero" style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff4757 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 10 }}>
          <Row className="align-items-center">
            <Col lg={6} className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '60px',
                borderRadius: '30px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s ease'
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff4757 100%)',
                  color: 'white',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  letterSpacing: '1px'
                }}>
                  🔥 HOT DEALS
                </span>
                
                <h1 style={{
                  fontSize: '4rem',
                  fontWeight: '900',
                  lineHeight: '1.1',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff4757 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Taste the<br/>Revolution
                </h1>
                
                <p style={{
                  fontSize: '1.2rem',
                  color: '#666',
                  marginBottom: '30px',
                  lineHeight: '1.8'
                }}>
                  Handcrafted burgers made with premium ingredients. 
                  Experience flavor like never before.
                </p>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <Link to="/menu" style={{
                    padding: '18px 40px',
                    background: 'linear-gradient(135deg, #ff6b35 0%, #ff4757 100%)',
                    color: 'white',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.4)';
                  }}>
                    Order Now
                    <span style={{ fontSize: '1.3rem' }}>→</span>
                  </Link>

                 
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  gap: '40px',
                  marginTop: '40px',
                  paddingTop: '30px',
                  borderTop: '1px solid #eee'
                }}>
                  {[
                    { num: '50K+', label: 'Happy Customers' },
                    { num: '4.9★', label: 'Rating' },
                    { num: '30min', label: 'Delivery' }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #ff6b35 0%, #ff4757 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>{stat.num}</div>
                      <div style={{ fontSize: '0.9rem', color: '#999' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div style={{
                position: 'relative',
                transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 1s ease'
              }}>
                <img 
                  src={HeroImg} 
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))',
                    animation: 'float 4s ease-in-out infinite'
                  }} 
                  alt="Hero Burger" 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= FEATURES - CARD STYLE ================= */}
      <section style={{
        padding: '100px 0',
        background: '#fff'
      }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ff6b35 0%, #ff4757 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '15px'
            }}>
              Why Choose Us
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              We're not just another burger place
            </p>
          </div>

          <Row>
            {[
              { img: Pizza, title: 'Premium Quality', desc: 'Only the finest ingredients in every bite' },
              { img: Salad, title: 'Fresh Daily', desc: 'Everything made fresh, nothing frozen' },
              { img: Delivery, title: 'Fast Delivery', desc: 'Hot food at your door in 30 minutes' }
            ].map((feature, i) => (
              <Col lg={4} md={6} key={i} className="mb-4">
                <div style={{
                  background: 'white',
                  padding: '40px',
                  borderRadius: '25px',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  border: '1px solid #f0f0f0',
                  height: '100%'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.15)';
                  e.currentTarget.style.borderColor = '#ff6b35';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 30px',
                    background: 'linear-gradient(135deg, #ff6b35 0%, #ff4757 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}>
                    <img src={feature.img} alt="" style={{ width: '80%', filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                    {feature.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= PROMOTION - MODERN SPLIT ================= */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff4757 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div style={{
                transform: 'scale(1.1)',
                animation: 'float 5s ease-in-out infinite'
              }}>
                <img src={PromotionImage} className="img-fluid" alt="promo" style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                }} />
              </div>
            </Col>
            <Col lg={6}>
              <div style={{ color: 'white' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '10px 25px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  LIMITED TIME OFFER
                </span>
                <h2 style={{
                  fontSize: '4.5rem',
                  fontWeight: '900',
                  marginBottom: '20px',
                  textShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }}>
                  50% OFF
                </h2>
                <p style={{
                  fontSize: '1.5rem',
                  marginBottom: '30px',
                  opacity: 0.95
                }}>
                  On your first order today!<br/>
                  Don't miss this amazing deal.
                </p>
                <Link to="/menu" style={{
                  display: 'inline-block',
                  padding: '20px 50px',
                  background: 'white',
                  color: '#ff6b35',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                }}>
                  Claim Offer Now →
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= APP DOWNLOAD - MODERN STYLE ================= */}
      <section style={{
        padding: '100px 0',
        background: '#f8f9fa'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <img src={DownloadImage} className="img-fluid" alt="download" style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
              }} />
            </Col>
            <Col lg={6}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: '900',
                marginBottom: '20px',
                color: '#333'
              }}>
                Download Our App
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#666',
                marginBottom: '30px',
                lineHeight: '1.8'
              }}>
                Order faster, track your delivery in real-time, and get exclusive app-only deals!
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a href="#" style={{ display: 'block', transition: 'transform 0.3s ease' }}
                   onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                   onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <img src={StoreIOS} alt="App Store" style={{ height: '60px' }} />
                </a>
                <a href="#" style={{ display: 'block', transition: 'transform 0.3s ease' }}
                   onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                   onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <img src={StoreGoogle} alt="Google Play" style={{ height: '60px' }} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fade-in 0.8s ease forwards;
        }
      `}</style>
    </Layout>
  );
};

export default Home;