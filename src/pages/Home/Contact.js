import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import "../../styles/ContactStyle.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update character count for message
    if (name === "message") {
      setCharCount(value.length);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setCharCount(0);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="contact_hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1>Contact Us</h1>
              <p>We are here to help! Reach out for any questions or support.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CONTACT INFO */}
      <section className="contact_info my-5">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="icon-circle">📞</div>
              <h4 className="fw-bold">Phone</h4>
              <p>+961 71 199 617</p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="icon-circle">📧</div>
              <h4 className="fw-bold">Email</h4>
              <p>support@burgerhouse.com</p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="icon-circle">📍</div>
              <h4 className="fw-bold">Address</h4>
              <p>Beirut, Lebanon</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CONTACT FORM */}
      <section className="contact_form py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <h2 className="text-center mb-4">Send Us a Message</h2>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>👤 Your Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>📧 Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>💬 Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5}
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                    maxLength={500}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                  <div className="char-counter">
                    {charCount}/500 characters
                  </div>
                </Form.Group>

                <Button 
                  variant="dark" 
                  size="lg" 
                  className={`w-100 ${isSubmitting ? 'loading' : ''}`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </Button>
              </Form>

              {submitSuccess && (
                <div className="success-message">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* GOOGLE MAP */}
      <section className="contact_map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.972962183193!2d35.505882!3d33.888630!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f170e91d25ead%3A0x8a788d2c34138df0!2sBeirut!5e0!3m2!1sen!2slb!4v1700000000000!5m2!1sen!2slb"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </Layout>
  );
};

export default Contact;