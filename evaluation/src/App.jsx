import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./landing";
import Home from "./home"; // ✅ your Home.jsx

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
