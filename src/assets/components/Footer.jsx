import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <h2 className="my-4">
              <a
                href="/"
                className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-200 to-gray-100
 hover:scale-105 transition-transform duration-300"
              >
                TODO BICI Y MOTO
              </a>
            </h2>

            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequuntur maxime iste rem asperiores nemo dolorem quia earum
              rerum est sequi?
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold my-4 text-center">
              Nuestras redes
            </h2>
            <div className="flex flex-col gap-6 justify-center items-center text-2xl text-gray-600">
              <div className="  hover:text-blue-600 transition-colors">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center"
                >
                  <FaFacebook />
                  <p>Facebook</p>
                </a>
              </div>
              <div className="  hover:text-pink-500 transition-colors">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center"
                >
                  <FaInstagram />
                  <p>Instagram</p>
                </a>
              </div>
              <div className="  hover:text-black transition-colors">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center"
                >
                  <FaTiktok />
                  <p>TikTok</p>
                </a>
              </div>
              <div className="  hover:text-green-500 transition-colors">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-center"
                >
                  <FaWhatsapp />
                  <p>WhatsApp</p>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold my-4 text-center">Paginas</h2>
            <div className="flex flex-col gap-6 justify-center items-center text-2xl text-gray-600">
              <Link to="/" className="hover:text-gray-300 text-xl">
                Inicio
              </Link>
              <Link to="/acerca" className="hover:text-gray-300 text-xl">
                Acerca
              </Link>
              <Link to="/faqs" className="hover:text-gray-300 text-xl">
                FAQS
              </Link>
              <Link to="/contacto" className="hover:text-gray-300 text-xl">
                Contacto
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold my-4 text-center justify-center">
              Contactanos
            </h2>
            <div className="text-gray-500 p-6 w-full max-w-md space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-500">
                  <MapPin className="w-5 h-5 mt-1" />
                </span>
                <p>
                  <strong className="text-gray-300">Dirección:</strong> Calle
                  Ficticia 123, Ciudad Ejemplo
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500">
                  <Phone className="w-5 h-5 mt-1" />
                </span>
                <p>
                  <strong className="text-gray-300">Teléfono:</strong> 78451245
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500">
                  <Mail className="w-5 h-5 mt-1" />
                </span>
                <p>
                  <strong className="text-gray-300">Email:</strong>{" "}
                  tiendabicicleta@mail.com
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500">
                  <Clock className="w-5 h-5 mt-1" />
                </span>
                <p>
                  <strong className="text-gray-300">Horario:</strong> Lunes a
                  Viernes, 9:00 a 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
