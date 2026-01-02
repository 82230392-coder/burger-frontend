import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import AdminSidebar from "../../components/AdminSidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const AdminDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const [stats, setStats] = useState([
    { icon: "bi bi-people", number: "0", label: "Users" },
    { icon: "bi bi-cart-check", number: "0", label: "Orders Today" },
    { icon: "bi bi-currency-dollar", number: "$0", label: "Revenue" },
  ]);

  // Chart state
  const [chartLabels, setChartLabels] = useState([]);
  const [chartOrders, setChartOrders] = useState([]);
  const [chartIncome, setChartIncome] = useState([]);

  const [recentOrders, setRecentOrders] = useState([]);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    axios
      .get("/admin/stats")
      .then((res) => {
        setStats([
          { icon: "bi bi-people", number: res.data.users, label: "Users" },
          { icon: "bi bi-cart-check", number: res.data.ordersToday, label: "Orders Today" },
          { icon: "bi bi-currency-dollar", number: `$${res.data.revenue}`, label: "Revenue" },
        ]);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  /* ================= FETCH ORDERS FOR CHART =================
     Needs an endpoint that returns all orders with: total + created_at
     Example endpoint: GET /admin/orders/all
  */
  useEffect(() => {
    const formatDay = (d) => d.toISOString().slice(0, 10);

    // last 7 days labels
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(formatDay(d));
    }

    axios
      .get("/admin/chart")
      .then((res) => {
        const rows = Array.isArray(res.data) ? res.data : [];
        const ordersMap = {};
        const incomeMap = {};
        labels.forEach((day) => {
          ordersMap[day] = 0;
          incomeMap[day] = 0;
        });

        rows.forEach((r) => {
          const day = String(r.day).slice(0, 10);
          if (day in ordersMap) {
            ordersMap[day] = Number(r.orders || 0);
            incomeMap[day] = Number(r.income || 0);
          }
        });

        setChartLabels(labels);
        setChartOrders(labels.map((d) => ordersMap[d]));
        setChartIncome(labels.map((d) => incomeMap[d]));
      });

    // Fetch Recent Orders
    axios.get("/admin/orders")
      .then(res => setRecentOrders(res.data))
      .catch(err => console.error("Orders Fetch Error:", err));
  }, []);




  const lineData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Orders",
        data: chartOrders,
        tension: 0.35,
        yAxisID: "yOrders",
      },
      {
        label: "Income ($)",
        data: chartIncome,
        tension: 0.35,
        yAxisID: "yIncome",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Orders & Income (Last 7 Days)" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "index", intersect: false },
    scales: {
      yOrders: {
        type: "linear",
        position: "left",
        title: { display: true, text: "Orders" },
        ticks: { precision: 0 },
      },
      yIncome: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Income ($)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />

      <main className="admin-main">
        <header className="admin-navbar">
          <h2>Dashboard Overview</h2>
          <div className="navbar-actions">
            <i className="bi bi-bell"></i>
            <img src="https://i.pravatar.cc/40" className="avatar" alt="profile" />
          </div>
        </header>

        <section className="stats-section">
          {stats.map((card, index) => (
            <div key={index} className="stat-card enhanced">
              <div className="stat-icon-circle">
                <i className={card.icon}></i>
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{card.number}</h3>
                <p className="stat-label">{card.label}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="dashboard-content-grid">
          <section className="chart-wrapper">
            <h3>Orders & Income (7 Days)</h3>
            <div style={{ height: 300 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </section>

          <section className="recent-orders-wrapper">
            <h3>Recent Orders</h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td>{o.name}</td>
                      <td>${Number(o.total).toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${o.status}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>
                        No orders yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
