import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing.jsx";
import Login from "./login.jsx";
import Home from "./Feedback.jsx";
import Register from "./register.jsx";
import AdminLogin from "./adminlogin.jsx";   // ✅ only this

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />   {/* ✅ */}
      </Routes>
    </BrowserRouter>
  );
}
