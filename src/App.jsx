import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Productos from "./pages/ProductosDetalle";
import NavBar from "./assets/components/NavBar";
import Footer from "./assets/components/Footer"
import Faqs from "./pages/Faqs";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/faqs" element={<Faqs/>} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
