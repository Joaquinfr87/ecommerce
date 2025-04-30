import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/Store";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Productos from "./pages/ProductosDetalle";
import Faqs from "./pages/Faqs";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orden from "./pages/Orden"; 
import ProductoManager from "./assets/components/ProductoManager";
import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import Sidebar from "./assets/components/Sidebar";
import LoadingSpinner from "./assets/components/LoadingSpinner";
import ProtectedRoute from "./utils/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register", "/crud", "/TablaCrud"];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(true); // 👈 nuevo estado

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
        ERROR
      </div>
    );
  }

  const isCrudPath = location.pathname === "/crud";

  return (
    <>
      {showHeader && <Header />}
      {isCrudPath && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}

      <div className="flex min-h-screen">
        <div className={`flex-grow transition-all duration-300 ${isCrudPath ? (sidebarOpen ? "pl-[220px]" : "pl-[65px]") : ""}`}>
          <Routes>
            <Route 
              path="/crud" 
              element={
                <ProtectedRoute>
                  <ProductoManager />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Home />} />
            <Route path="/productos/:id" element={<Productos />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/acerca" element={<Acerca />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orden/:id" element={<Orden />} />
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
