import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";
import { useDriverAuth } from "../../context/driverAuthContext";

const DriverLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useDriverAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cleanWasteAPI.post("/drivers/login", formData);
      login(response.data);
      navigate("/driverHomePage");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default DriverLogin;
