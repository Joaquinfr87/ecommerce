import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import LoadingSpinner from "./assets/components/LoadingSpinner";
import ErrorMessage from "./assets/components/ErrorMessage";

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register"];
  const showHeader = !hideHeaderPaths.includes(location.pathname);
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulación de carga (elimínalo en producción)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Aquí irían tus llamadas reales a API:
        // const response = await fetch('/api/data');
        // if (!response.ok) throw new Error('Error en la API');
        
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ErrorMessage 
          message={`Error: ${error}`}
          retry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/crud" element={<CRUD />} />
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
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}