import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice"; // Asegúrate de que la ruta sea correcta

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out">
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
