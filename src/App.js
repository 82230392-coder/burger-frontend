import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Menu from "./pages/Home/Menu";
import Contact from "./pages/Home/Contact";
import Login from "./pages/Home/Login";
import Register from "./pages/Home/Register";
import AdminDashboard from "./pages/Home/AdminDashboard";
import MenuManagement from "./pages/Home/MenuManagement";
import Verify from "./pages/Home/verify";
import CartPage from "./pages/Home/cart";
import Orders from "./pages/Home/Orders";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/verify" element={<Verify />} />
        <Route path="/menu-management" element={<MenuManagement />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/orders" element={<Orders />} />

      </Routes>
    </Router>
  );
}

export default App;
