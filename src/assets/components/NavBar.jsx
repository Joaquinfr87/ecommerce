import { User, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleUser = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-white shadow-md">
      <>
        <div className="py-4 shadow-md">
          <ul
            className="container mx-auto flex flex-wrap justify-between md:flex-row px-4 
            md:px-2 items-center"
          >
            <div className="flex gap-4">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/">Acerca</Link>
              </li>
              <li>
                <Link to="/">FAQs</Link>
              </li>
              <li>
                <Link to="/">Contacto</Link>
              </li>
            </div>
            <div className="relative">
              <User
                size={40}
                className="bg-gray-200 p-2 rounded text-black cursor-pointer"
                onClick={handleUser}
              />

              <div
                className={
                  isOpen
                    ? "flex flex-col absolute right-0 top-12 z-10 bg-zinc-50 p-4 gap-4 shadow-md rounded"
                    : "hidden"
                }
              >
                <li>
                  <Link to="/">Iniciar</Link>
                </li>
                <li>
                  <Link to="/">Cuenta</Link>
                </li>
              </div>
            </div>
          </ul>
        </div>
        <nav className="flex justify-between items-center container mx-auto py-8 md:py-6 px-2">
          <div className="flex items-center">
            <a
              href="/"
              className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 hover:scale-105 transition-transform duration-300"
            >
              TODO BICI Y MOTO
            </a>
          </div>
          <form className="w-1/2 sm:block hidden">
            <input
              type="text"
              placeholder="Buscar productos"
              className="bg-zinc-100 rounded-md border border-zinc-300 focus:outline-none p-3 w-full"
            />
          </form>
          <Link to={"/cart"}>
            <ShoppingCart size={50} className="cursor-pointer  bg-gray-200 py-3 px-4 rounded-full"/>
          </Link>
        </nav>
      </>
    </header>
  );
}
