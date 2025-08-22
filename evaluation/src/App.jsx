import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing.jsx";
import Login from "./login.jsx";

import Home from "./Feedback.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
