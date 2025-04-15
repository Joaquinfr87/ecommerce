import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Aquí iría la lógica para enviar el formulario
    // Por ahora simulamos un envío con setTimeout
    setTimeout(() => {
      console.log("Formulario enviado:", formData);
      setIsSubmitting(false);
      setSubmitMessage(
        "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes preguntas sobre nuestros productos o servicios? Estamos aquí
            para ayudarte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Envíanos un mensaje
            </h2>

            {submitMessage ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                {submitMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta general</option>
                    <option value="pedido">Sobre mi pedido</option>
                    <option value="garantia">Garantía de producto</option>
                    <option value="tecnica">Asesoría técnica</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Información de contacto */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Información de contacto
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Dirección
                    </h3>
                    <p className="text-gray-600">
                      Av. Principal 1234, Local 56
                      <br />
                      Ciudad Autopartes, CP 5000
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Teléfonos
                    </h3>
                    <p className="text-gray-600">
                      Ventas:{" "}
                      <a
                        href="tel:+5493515551234"
                        className="hover:text-blue-600"
                      >
                        +54 9 351 555-1234
                      </a>
                      <br />
                      Soporte:{" "}
                      <a
                        href="tel:+5493515555678"
                        className="hover:text-blue-600"
                      >
                        +54 9 351 555-5678
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:ventas@todobicimoto.com"
                        className="hover:text-blue-600"
                      >
                        ventas@todobicimoto.com
                      </a>
                      <br />
                      <a
                        href="mailto:soporte@todobicimoto.com"
                        className="hover:text-blue-600"
                      >
                        soporte@todobicimoto.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Horario de atención
                    </h3>
                    <p className="text-gray-600">
                      Lunes a Viernes: 9:00 - 18:00 hs
                      <br />
                      Sábados: 9:00 - 13:00 hs
                      <br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ubicación
              </h3>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237.958932891959!2d-66.15105519307232!3d-17.395322946762786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3731025e9b55f%3A0xa3cf8e42457eb1e3!2sCENTRAL%20MOTO%20LLANTAS!5e0!3m2!1ses-419!2sbo!4v1744720461928!5m2!1ses-419!2sbo"
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
