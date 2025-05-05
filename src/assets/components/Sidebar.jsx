import { NavLink } from "react-router-dom";
import { 
  Home, 
  ShoppingCart, 
  UserCog,
  ChevronRight,
  ChevronLeft,
  Bike
} from "lucide-react";

const LinksArray = [
  { icon: <Home size={20} />, label: "Inicio", to: "/" },
  { icon: <ShoppingCart size={20} />, label: "Carrito", to: "/cart" },
  { icon: <UserCog size={20} />, label: "Admin", to: "/crud" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`transition-all duration-200 ease-in-out
        ${isOpen ? "w-[220px]" : "w-[65px]"}
        bg-white dark:bg-gray-800 text-gray-800 dark:text-white h-full fixed z-10 top-0 left-0`}
    >
      {/* Botón para abrir/cerrar el sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-[70px] left-[42px] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all z-20 shadow-md
          ${isOpen ? "translate-x-[162px]" : ""} bg-gray-200 dark:bg-gray-700`}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="flex flex-col pt-5">
        {/* Logo y título */}
        <div className="flex justify-center items-center pb-[60px]">
          <div className={`flex justify-center items-center w-[35px] cursor-pointer transition-all duration-300 ease ${isOpen ? "scale-75" : "scale-150"}`}>
            <Bike size={30} className="text-blue-600 dark:text-blue-400" />
          </div>
          {isOpen && <h2 className="ml-2 font-semibold">TODO BICI MOTO</h2>}
        </div>

        {LinksArray.map(({ icon, label, to }) => (
          <div className={`my-1 transition-all duration-300 ease-in-out relative px-1 ${isOpen ? "px-0" : "px-[5%]"} hover:bg-gray-100 dark:hover:bg-gray-700`} key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center no-underline py-2 h-[60px] 
                ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300"}`}
            >
              {({ isActive }) => (
                <>
                  <div className="py-2 px-3 flex">
                    {icon}
                  </div>
                  <span className={`transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    {label}
                  </span>
                  {isActive && (
                    <div className="absolute h-full w-1 rounded-full left-0 bg-blue-600 dark:bg-blue-400" />
                  )}
                </>
              )}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
