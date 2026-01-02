import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/AboutStyle.css";
import { Container, Row, Col } from "react-bootstrap";

import HeroImg from "../../assets/hero/hero-2.png";
import Pizza from "../../assets/about/pizza.png";
import Salad from "../../assets/about/salad.png";
import Delivery from "../../assets/about/delivery-bike.png";

const About = () => {
  const [stats, setStats] = useState({
    years: 0,
    customers: 0,
    rating: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  // Animate counters when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const heroSection = document.querySelector('.about_hero_section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        years: Math.floor(progress * 10),
        customers: Math.floor(progress * 50000),
        rating: Math.min(progress * 4.9, 4.9)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const features = [
    {
      icon: Pizza,
      title: "Made With Love",
      description: "Every meal is prepared with real ingredients and real passion.",
      color: "#ff6b35"
    },
    {
      icon: Delivery,
      title: "Fast Delivery",
      description: "We guarantee your order arrives hot and on time.",
      color: "#f7931e"
    },
    {
      icon: Salad,
      title: "Healthy Options",
      description: "Enjoy healthy choices that taste amazing.",
      color: "#28a745"
    }
  ];

  const achievements = [
    { label: "Years of Excellence", value: "10+", icon: "🏆" },
    { label: "Happy Customers", value: "50K+", icon: "😊" },
    { label: "Customer Rating", value: "4.9★", icon: "⭐" },
    { label: "Menu Items", value: "100+", icon: "🍔" }
  ];

  return (
    <Layout>
      {/* ========= HERO SECTION ========= */}
      <section className="about_hero_section text-center">
        <Container>
          <img src={HeroImg} alt="Hero" className="hero_about_img" />
          <h1 className="about_title">About New Burger</h1>
          <p className="about_subtitle">
            Serving fresh, high-quality food with passion and love.
          </p>
          
          {/* Stats Counter */}
          <div className="stats_container">
            <div className="stat_box">
              <div className="stat_number">{stats.years}+</div>
              <div className="stat_label">Years</div>
            </div>
            <div className="stat_box">
              <div className="stat_number">{stats.customers.toLocaleString()}+</div>
              <div className="stat_label">Happy Customers</div>
            </div>
            <div className="stat_box">
              <div className="stat_number">{stats.rating.toFixed(1)}★</div>
              <div className="stat_label">Rating</div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========= OUR STORY ========= */}
      <section className="about_section_block">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <span className="section_badge">Our Journey</span>
              <h2 className="about_heading">Our Story</h2>
              <p className="about_text">
                Since day one, our mission has been simple: make great food that brings
                people together. We believe every burger, pizza, or salad should be made
                with authentic fresh ingredients.
              </p>
              <p className="about_text">
                What started as a small kitchen grew into a trusted food brand loved by
                thousands of families.
              </p>
              
              {/* Quality Badges */}
              <div className="quality_badges">
                <div className="quality_badge">
                  <span className="badge_icon">🌱</span>
                  <div>
                    <h5>Fresh Daily</h5>
                    <p>Ingredients sourced every morning</p>
                  </div>
                </div>
                <div className="quality_badge">
                  <span className="badge_icon">✓</span>
                  <div>
                    <h5>100% Quality</h5>
                    <p>No compromises, ever</p>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6} className="text-center">
              <div className="about_images_box">
                <img src={Pizza} alt="Pizza" className="about_img_small" />
                <img src={Salad} alt="Salad" className="about_img_small" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========= ACHIEVEMENTS SECTION ========= */}
      <section className="achievements_section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="about_heading">Our Achievements</h2>
              <p className="about_text_small">Numbers that speak for themselves</p>
            </Col>
          </Row>
          <Row>
            {achievements.map((achievement, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="achievement_card">
                  <div className="achievement_icon">{achievement.icon}</div>
                  <div className="achievement_value">{achievement.value}</div>
                  <div className="achievement_label">{achievement.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ========= WHY CHOOSE US ========= */}
      <section className="about_section_gray">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <span className="section_badge">What Makes Us Special</span>
              <h2 className="about_heading">Why Choose Us?</h2>
              <p className="about_text_small">Fresh. Fast. Delicious.</p>
            </Col>
          </Row>

          <Row>
            {features.map((feature, index) => (
              <Col lg={4} key={index} className="text-center mb-4">
                <div className="feature_card">
                  <div className="feature_icon_wrapper">
                    <img src={feature.icon} className="about_icon" alt={feature.title} />
                  </div>
                  <h4 className="about_card_title">{feature.title}</h4>
                  <p className="about_card_text">{feature.description}</p>
                  <div className="feature_divider"></div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ========= CONTACT CTA ========= */}
      <section className="about_contact_block text-center">
        <Container>
          <div className="cta_icon">💬</div>
          <h3>Need Help?</h3>
          <p className="about_text_small">We're always happy to assist you.</p>
          <div className="cta_buttons">
            <button className="btn btn_black px-5 py-3 rounded-pill">
              📞 Call: 999-888-7777
            </button>
            <button className="btn btn_outline px-5 py-3 rounded-pill">
              📧 Email Us
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="social_proof">
            <div className="trust_badge">
              <span>⭐⭐⭐⭐⭐</span>
              <p>Rated 4.9/5 by 10,000+ customers</p>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default About;