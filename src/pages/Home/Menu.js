  import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import "../../styles/MenuStyle.css";
import axios from "axios";

/* ================= ULTRA MODERN CARD ================= */
const UltraModernCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/cart/add",
        { menuId: item.id },
        { withCredentials: true }
      );

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch {
      alert("Please login to add items to cart");
    }
  };

  return (
    <div
      className={`ultra-modern-card ${isHovered ? "ultra-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="ultra-image-container">
        <img src={item.image} alt={item.title} className="ultra-card-image" />
      </div>

      <div className="ultra-content">
        <h3 className="ultra-title">{item.title}</h3>
        <p className="ultra-description">{item.paragraph}</p>

        <div className="price-section">
          <span className="current-price">${item.price}</span>

          <button
            className={`ultra-cart-btn ${addedToCart ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? "Added ✔" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= MENU PAGE ================= */
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  /* FETCH MENU */
  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* FILTER MENU */
  const filteredMenu =
    activeFilter === "all"
      ? menu
      : menu.filter((item) => item.category === activeFilter);

  /* BUILD CATEGORIES DYNAMICALLY */
  const categories = [
    {
      id: "all",
      label: "All Items",
      icon: "🍽️",
      count: menu.length,
    },
    ...Array.from(
      new Map(
        menu.map((item) => [
          item.category,
          {
            id: item.category,
            label:
              item.category.charAt(0).toUpperCase() +
              item.category.slice(1),
            icon: item.category === "burgers" ? "🍔" : "⭐",
            count: menu.filter((m) => m.category === item.category).length,
          },
        ])
      ).values()
    ),
  ];

  return (
    <Layout>
      <section className="menu_hero">
        <Container>
          <h1 className="menu_hero_title">Our Menu</h1>
        </Container>
      </section>

      <section className="menu_page">
        <Container>
          {/* CATEGORY FILTER */}
          <Row className="mb-4">
            <Col>
              <div className="category_filters">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`category_btn ${
                      activeFilter === cat.id ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter(cat.id)}
                  >
                    {cat.icon} {cat.label}
                    <Badge bg="light" text="dark" className="ms-2">
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </Col>
          </Row>

          {/* MENU ITEMS */}
          <Row>
            {filteredMenu.map((item, index) => (
              <Col lg={3} md={6} sm={12} key={item.id} className="mb-4">
                <UltraModernCard item={item} index={index} />
              </Col>
            ))}
          </Row>

          {filteredMenu.length === 0 && (
            <p className="text-center">No items found</p>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default Menu;
