import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/MenuManagement.css";
import AdminSidebar from "../../components/AdminSidebar";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [oldImage, setOldImage] = useState("");

  /* ================= LOAD MENU ================= */
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await axios.get("http://localhost:5000/menu");
    setMenuItems(res.data);
  };

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  /* ================= ADD ================= */
  const handleAdd = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    await axios.post("http://localhost:5000/menu", data, {
      withCredentials: true,
    });

    fetchMenu();
    setFormData({ name: "", price: "", category: "", image: null });
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditID(item.id);
    setOldImage(item.image);

    setFormData({
      name: item.title || item.name,
      price: item.price,
      category: item.category,
      image: null,
    });
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("oldImage", oldImage);

    if (formData.image) {
      data.append("image", formData.image);
    }

    await axios.put(`http://localhost:5000/menu/${editID}`, data, {
      withCredentials: true,
    });

    fetchMenu();
    setIsEditing(false);
    setEditID(null);
    setFormData({ name: "", price: "", category: "", image: null });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/menu/${id}`, {
      withCredentials: true,
    });
    fetchMenu();
  };

  return (
    <div className="admin-main-layout">
      <AdminSidebar />

      <div className="admin-content">
        {/* HEADER */}
        <div className="admin-header">
          <h1 className="page-title">🍔 Menu Management</h1>
        </div>

        {/* ADD / EDIT FORM */}
        <div className="menu-form-card">
          <h3 className="section-title">
            {isEditing ? "✏ Edit Menu Item" : "➕ Add Menu Item"}
          </h3>

          <div className="menu-form">
            <input
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="price"
              placeholder="Price ($)"
              value={formData.price}
              onChange={handleChange}
            />

            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />

            <input type="file" onChange={handleImage} />

            {!isEditing ? (
              <button className="btn-black" onClick={handleAdd}>
                + Add Item
              </button>
            ) : (
              <button className="btn-black" onClick={handleSave}>
                ✔ Save Changes
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="menu-table-card">
          <h3 className="section-title">📋 Current Menu</h3>

          <table className="menu-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th className="center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}   // ✅ FIXED HERE
                      alt={item.title || item.name}
                      className="menu-img"
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </td>
                  <td>{item.title || item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
