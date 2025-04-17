import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

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
            <h2 className="text-2xl font-semibold my-4"> Nuestras redes</h2>
            <div className="flex flex-col gap-6 justify-center items-center text-2xl text-gray-700">
              {/* Facebook */}
              <div className=" flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <FaFacebook />
                </a>
                <p>Facebook</p>
              </div>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaTiktok />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/123456789" // Reemplaza con tu número real
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold my-4"> Paginas</h2>
          </div>
          <div>4</div>
        </div>
      </div>
    </footer>
  );
}
