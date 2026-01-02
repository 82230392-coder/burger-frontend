import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import "../../styles/CartStyle.css";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  /* ================= FETCH CART ================= */
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart", {
        withCredentials: true,
      });
      setCartItems(res.data);
    } catch (err) {
      console.log("Cart error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= QUANTITY ================= */
  const updateQuantity = async (id, change) => {
    const item = cartItems.find((i) => i.id === id);
    if (change === -1 && item.quantity <= 1) return;

    try {
      await axios.post(
        "http://localhost:5000/cart/update",
        { cartId: id, change },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (id) => {
    try {
      await axios.post(
        "http://localhost:5000/cart/remove",
        { cartId: id },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= TOTALS ================= */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  /* ================= CHECKOUT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setErrors({ cart: "Your cart is empty" });
      return;
    }

    setIsCheckoutLoading(true);
    setErrors({});

    try {
      await axios.post(
        "http://localhost:5000/checkout",
        {},
        { withCredentials: true }
      );

      setOrderSuccess(true);
      setCartItems([]);

      setTimeout(() => setOrderSuccess(false), 4000);
    } catch (err) {
      alert(err.response?.data?.message || "Checkout failed");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="cart_hero">
        <Container>
          <Row className="text-center">
            <Col>
              <h1>🛒 Your Cart</h1>
              <p>Review your items before checkout</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CART */}
      <section className="cart_page py-5">
        <Container>
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : cartItems.length === 0 ? (
            <p className="text-center fs-5">Your cart is empty</p>
          ) : (
            <>
              <Row className="justify-content-center">
                <Col lg={8}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart_item mb-3">
                      <div className="cart_item_info">
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt={item.name}
                          className="cart_image"
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                          }}
                        />

                        <div>
                          <h5>{item.name}</h5>
                          <p>${Number(item.price).toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="cart_actions">
                        <Button
                          variant="light"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          −
                        </Button>

                        <span className="qty">{item.quantity}</span>

                        <Button
                          variant="light"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => removeItem(item.id)}
                        >
                          🗑
                        </Button>
                      </div>
                    </div>
                  ))}

                  {errors.cart && (
                    <p className="text-danger text-center">{errors.cart}</p>
                  )}
                </Col>
              </Row>

              {/* SUMMARY */}
              <Row className="justify-content-center mt-4">
                <Col lg={6}>
                  <div className="order_summary">
                    <h4>Order Summary</h4>

                    <div className="summary_row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary_row">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="summary_row total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <Form onSubmit={handleSubmit}>
                      <Button
                        variant="dark"
                        size="lg"
                        className="w-100 mt-3"
                        type="submit"
                        disabled={isCheckoutLoading}
                      >
                        {isCheckoutLoading ? "Processing..." : "Checkout"}
                      </Button>
                    </Form>

                    {orderSuccess && (
                      <div className="success-message mt-3">
                        ✅ Order placed successfully!
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </Layout>
  );
};

export default CartPage;
