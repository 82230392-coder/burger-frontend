import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layouts/Layout";
import "../../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  return (
    <Layout>
      <div className="orders-page">
        <h1 className="orders-title">🧾 My Orders</h1>

        {orders.length === 0 ? (
          <p className="empty-orders">No orders yet.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span>Order #{order.id}</span>
                <span className="order-total">${order.total}</span>
              </div>

              <div className="order-date">
                {new Date(order.date).toLocaleString()}
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Orders;
