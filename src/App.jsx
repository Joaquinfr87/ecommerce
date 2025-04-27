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
import LoadingSpinner from "./assets/components/LoadingSpinner";
import ErrorMessage from "./assets/components/ErrorMessage";
import TablaCrud from "./pages/TablaCrud";
import ProductoManager from "./assets/components/ProductoManager";
import Sidebar from "./assets/components/Sidebar";

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register", "/crud"];  // Aseguramos que /crud también oculte el header
  const showHeader = !hideHeaderPaths.includes(location.pathname);  // Mostrar solo si no estamos en /crud

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
      {/* Mostrar Header solo si no estamos en /crud */}
      {showHeader && <Header />}

      {/* Mostrar Sidebar solo en /crud */}
      {location.pathname === "/crud" && <Sidebar />}

      <div className="flex min-h-screen">
        {/* Este div contiene el contenido de la página, con un padding solo en /crud */}
        <div
          className={`flex-grow transition-all ${location.pathname === "/crud" ? "pl-[220px]" : ""}`}
        >
          <Routes>
            <Route path="/crud" element={<ProductoManager />} />
            <Route path="/TablaCrud" element={<TablaCrud />} />
            <Route path="/" element={<Home />} />
            <Route path="/productos/:id" element={<Productos />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/acerca" element={<Acerca />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>

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
