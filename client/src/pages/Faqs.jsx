import { useState } from 'react';

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos todas las tarjetas de crédito/débito, transferencias bancarias y pagos a través de Mercado Pago."
    },
    {
      question: "¿Cuánto tarda el envío de los repuestos?",
      answer: "Los envíos estándar tardan 24-48 horas dentro de la ciudad y 3-5 días a otras provincias. Para envíos express contáctenos directamente."
    },
    {
      question: "¿Cómo puedo estar seguro de que el repuesto es compatible con mi vehículo?",
      answer: "Puedes usar nuestro selector de vehículo en cada producto o contactar a nuestro equipo técnico que te asesorará gratuitamente."
    },
    {
      question: "¿Ofrecen garantía en los repuestos?",
      answer: "Sí, todos nuestros repuestos tienen garantía de 6 meses contra defectos de fabricación. Los repuestos originales tienen garantía extendida de 12 meses."
    },
    {
      question: "¿Puedo devolver un producto si no es lo que necesito?",
      answer: "Aceptamos devoluciones dentro de los 7 días posteriores a la recepción, siempre que el producto esté en su empaque original y sin usar."
    },
    {
      question: "¿Tienen servicio de instalación?",
      answer: "Sí, ofrecemos servicio de instalación profesional en nuestro taller asociado con un 10% de descuento para clientes de nuestra tienda online."
    },
    {
      question: "¿Cómo puedo hacer el seguimiento de mi pedido?",
      answer: "Una vez despachado tu pedido, recibirás un email con el número de seguimiento y enlace para rastrear tu envío en tiempo real."
    },
    {
      question: "¿Atienden pedidos por mayor?",
      answer: "Sí, ofrecemos descuentos especiales para talleres y distribuidores. Contáctenos directamente para cotizaciones al por mayor."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Preguntas Frecuentes
        </h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                className="w-full px-6 py-4 text-left font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {activeIndex === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">¿No encontraste lo que buscabas?</p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Contáctanos
          </button>
        </div>
      </div>
    </div>
  );
}