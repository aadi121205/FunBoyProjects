import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Comps/Home";
import NavbarComponent from "./Comps/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/products" element={<div>Products Page</div>} />
      </Routes>
    </>
  );
};
export default App;
