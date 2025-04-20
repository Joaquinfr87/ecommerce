import {React,useEffect,useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Productos from "./pages/ProductosDetalle";
import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import Faqs from "./pages/Faqs";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./App/Store";
import CRUD from "./pages/CRUD";




export default function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setMensaje(data.message));
  }, []);

  return (  
    <Provider store={store}>
      <BrowserRouter>
        <Header/> 
        <Routes>
          <Route path="/crud" element={<CRUD/>}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/productos/:id" element={<Productos />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}