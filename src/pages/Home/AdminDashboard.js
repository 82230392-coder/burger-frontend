import React, { useState, useEffect } from "react";
import "../../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API = "http://localhost:5000";

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

  const menu = [
    { icon: "bi bi-speedometer2", label: "Dashboard" },
    { icon: "bi bi-box-seam", label: "Products" },
  ];

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    axios
      .get(`${API}/admin/stats`, { withCredentials: true })
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
    .get(`${API}/admin/chart`, { withCredentials: true })
    .then((res) => {
      console.log("✅ /admin/chart:", res.data);

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
    })
    .catch((err) => {
      console.error("❌ /admin/chart error:", err?.response?.status, err?.response?.data);
    });
}, []);


  /* ================= SIDEBAR CLICK ================= */
  const handleMenuClick = (label) => {
    setActive(label);
    if (label === "Products") navigate("/menu-management");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await axios.post(`${API}/logout`, {}, { withCredentials: true });
    } finally {
      navigate("/");
    }
  };

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
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <i className="bi bi-fire"></i>
          <span>Admin Panel</span>
        </div>

        <ul className="sidebar-menu">
          {menu.map((item) => (
            <li
              key={item.label}
              className={active === item.label ? "active" : ""}
              onClick={() => handleMenuClick(item.label)}
            >
              <i className={item.icon}></i> <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="logout-box" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* NAVBAR */}
        <header className="admin-navbar">
          <h2>{active}</h2>
          <div className="navbar-actions">
            <i className="bi bi-bell"></i>
            <img src="https://i.pravatar.cc/40" className="avatar" alt="profile" />
          </div>
        </header>

        {/* STATS */}
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

        {/* CHART */}
        <section className="table-section">
          <h3>Orders & Income Chart</h3>
          <div style={{ height: 320 }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
