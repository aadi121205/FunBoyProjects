import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Comps/Home";
import NavbarComponent from "./Comps/Nav";
import Footer from "./Comps/Footer";
import Login from "./Comps/Login";
import Signup from "./Comps/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/products" element={<div>Products Page</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
