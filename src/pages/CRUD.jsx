import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
  X, 
  Save, 
  Image as ImageIcon,
  Type,
  DollarSign,
  List,
  FileText
} from "lucide-react";
import { 
  createProducto, 
  updateProducto,
  getAllProductos
} from "../api/productoAPI";

export default function CRUD({ onClose, dataSelect, accion }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      titulo: "",
      precio: 0,
      categoria: "",
      descripcion: "",
      imageURL: ""
    }
  });

  useEffect(() => {
    // Cargar categorías al montar el componente
    const fetchCategorias = async () => {
      try {
        const response = await getAllProductos();
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al cargar Productos:", error);
      }
    };
    
    fetchCategorias();

    // Si es edición, cargar datos del producto seleccionado
    if (accion === "Editar" && dataSelect) {
      setValue("titulo", dataSelect.titulo);
      setValue("precio", dataSelect.precio);
      setValue("categoria", dataSelect.categoria?.id);
      setValue("descripcion", dataSelect.descripcion);
      setValue("imageURL", dataSelect.imageURL);
      setPreviewImage(dataSelect.imageURL);
    }
  }, [dataSelect, accion, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("imageURL", file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", data.titulo);
      formData.append("precio", data.precio);
      formData.append("categoria", data.categoria);
      formData.append("descripcion", data.descripcion);
      
      if (data.imageURL instanceof File) {
        formData.append("imagen", data.imageURL);
      } else if (data.imageURL) {
        formData.append("imageURL", data.imageURL);
      }

      if (accion === "Editar") {
        await updateProducto(dataSelect.id, formData);
      } else {
        await createProducto(formData);
      }
      
      onClose(true); // Pasamos true para indicar éxito
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {accion === "Editar" ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <button 
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Título */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Título
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                {...register("titulo", { required: "Este campo es requerido" })}
              />
            </div>
            {errors.titulo && (
              <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
            )}
          </div>

          {/* Campo Precio */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Precio
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={18} className="text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                {...register("precio", { 
                  required: "Este campo es requerido",
                  min: { value: 0.01, message: "El precio debe ser mayor a 0" }
                })}
              />
            </div>
            {errors.precio && (
              <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>
            )}
          </div>

          {/* Campo Categoría */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Categoría
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <List size={18} className="text-gray-400" />
              </div>
              <select
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                {...register("categoria", { required: "Seleccione una categoría" })}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.descripcion}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoria && (
              <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>
            )}
          </div>

          {/* Campo Descripción */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Descripción
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
                <FileText size={18} className="text-gray-400" />
              </div>
              <textarea
                rows={3}
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                {...register("descripcion")}
              />
            </div>
          </div>

          {/* Campo Imagen */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Imagen
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon size={18} className="text-gray-400" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
                onChange={handleImageChange}
              />
            </div>
            {previewImage && (
              <div className="mt-2">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Botón Guardar */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center w-full ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-2 px-4 rounded-lg transition`}
            >
              {loading ? (
                'Guardando...'
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Guardar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
