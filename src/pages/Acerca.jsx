export default function Acerca() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
              Sobre <span className="text-blue-600">Todo Bici y Moto</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tu proveedor confiable de repuestos y accesorios para bicicletas y motos desde 2010.
            </p>
          </div>
  
          {/* Nuestra Historia */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 mb-4">
                  Todo comenzó en un pequeño taller en el centro de la ciudad, donde nuestro fundador, 
                  Juan Pérez, identificó la necesidad de un proveedor confiable de repuestos para bicicletas y motos.
                </p>
                <p className="text-gray-600 mb-4">
                  Lo que empezó como un negocio familiar se ha convertido en una de las distribuidoras más 
                  importantes de la región, gracias a nuestro compromiso con la calidad y servicio al cliente.
                </p>
                <p className="text-gray-600">
                  Hoy operamos con 3 tiendas físicas y nuestra plataforma online que atiende a todo el país.
                </p>
              </div>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">[Imagen de tu taller o equipo]</span>
              </div>
            </div>
          </div>
  
          {/* Nuestros Valores */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Calidad Garantizada",
                  description: "Todos nuestros productos pasan por rigurosos controles de calidad.",
                  icon: "✓"
                },
                {
                  title: "Expertise Técnico",
                  description: "Nuestro equipo tiene más de 50 años de experiencia combinada.",
                  icon: "🔧"
                },
                {
                  title: "Servicio Personalizado",
                  description: "Te asesoramos para encontrar exactamente lo que necesitas.",
                  icon: "💬"
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* Nuestro Equipo */}
          <div className="mb-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Conoce Nuestro Equipo</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Juan Pérez",
                  role: "Fundador & CEO",
                  bio: "Mecánico con 25 años de experiencia en el rubro."
                },
                {
                  name: "María González",
                  role: "Gerente Comercial",
                  bio: "Especialista en atención al cliente y ventas."
                },
                {
                  name: "Carlos Rodríguez",
                  role: "Jefe de Taller",
                  bio: "Experto en motos de alta cilindrada."
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-200 h-40 w-40 mx-auto rounded-full mb-4 flex items-center justify-center">
                    <span className="text-gray-500">[Foto]</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* CTA */}
          <div className="text-center bg-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Listo para encontrar los repuestos que necesitas?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explora nuestro catálogo o contáctanos para asesoría personalizada.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="/productos" 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Ver Productos
              </a>
              <a 
                href="/contacto" 
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Contactarnos
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }