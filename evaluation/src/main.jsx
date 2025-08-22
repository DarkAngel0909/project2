import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./landing.jsx";
import Login from "./login.jsx"; // Make sure file is Login.jsx
import Home from "./Feedback.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
         <Route path="/register" element={<Register />} /> {/* <-- this is important */}
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
