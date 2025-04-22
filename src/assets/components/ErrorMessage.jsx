import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar mensajes de error con opción de reintentar
 * @param {string} message - El mensaje de error a mostrar
 * @param {function} retry - Función para reintentar la acción
 * @param {string} className - Clases CSS adicionales
 */
const ErrorMessage = ({ message, retry, className = '' }) => {
  return (
    <div className={`bg-red-50 border-l-4 border-red-500 p-4 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* Ícono de error (puedes reemplazarlo por tu propio ícono) */}
          <svg 
            className="h-5 w-5 text-red-500" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {message}
          </p>
          
          {/* Botón de reintentar (solo se muestra si hay función retry) */}
          {retry && (
            <div className="mt-2">
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  retry: PropTypes.func,
  className: PropTypes.string
};

export default ErrorMessage;