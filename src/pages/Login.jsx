import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Home, LogIn, UserPlus, Key } from 'lucide-react';
import bannerImage from '../assets/banner.jpg'; // Asegúrate de tener esta imagen en la ruta correcta
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice'; 

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Para redirigir después de iniciar sesión
  const { isLogged, status, error } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (isLogged) {
      navigate('/crud');
    }
  }, [isLogged, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(login(formData)); // Ejecutamos la acción de login
    } catch (error) {
      console.error('Error al hacer login:', error); // Si ocurre un error, lo mostramos en consola
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      {/* Contenedor principal */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Sección lateral con imagen de fondo */}
        <div 
          className="relative p-8 text-white md:w-2/5 min-h-[400px]"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-8">
              <Key className="h-10 w-10 mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-2">Bienvenido de vuelta</h3>
              <p className="text-blue-100">Accede a tu cuenta para continuar</p>
            </div>
            
            <div className="mt-auto bg-black/30 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">¿No tienes cuenta?</p>
              <Link 
                to="/register" 
                className="inline-flex items-center mt-2 text-sm font-semibold text-white hover:underline"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>

        {/* Sección del formulario */}
        <div className="p-8 md:p-10 md:w-3/5">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <LogIn className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Iniciar sesión</h2>
            <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="tu@email.com"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-gray-500" />
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordar mi sesión
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex justify-center items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Iniciando sesión...' : <><LogIn className="h-4 w-4 mr-2" /> Iniciar sesión</>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Otras opciones
              </span>
            </div>
            <div className="mt-4">
              <Link
                to="/"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Home className="h-4 w-4 mr-2" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
