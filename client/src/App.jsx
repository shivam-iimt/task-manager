import React, { useState, useEffect, } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup"
import axios from "axios";;
import "./scss/App.scss";

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    else navigate("/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        await axios.get("/api/authantication/check-authorization", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        handleLogout();
      }
    };

    if (token) checkAuthorization();
  }, [token]);

  return token ? (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
