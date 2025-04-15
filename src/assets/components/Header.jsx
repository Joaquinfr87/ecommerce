import { User} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const handleUser = () => {
        setIsOpen(!isOpen);
      };
  return (
    <header className="bg-white shadow-md">
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
                <Link to="/acerca">Acerca</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
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
                  <Link to="/login">Iniciar</Link>
                </li>
                <li>
                  <Link to="/">Cuenta</Link>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </header>
  )
}
