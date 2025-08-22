import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import Home from "./Feedback.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} /> {/* <-- this is important */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
