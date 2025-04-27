import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Save } from "lucide-react";
import { createProducto, updateProducto } from "../api/productoAPI";

const categoria = [
  "Protección",
  "Accesorios",
  "Iluminación",
  "Herramientas",
  "Componentes",
  "Seguridad",
];

export default function CRUD({ onClose, dataSelect, accion }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      titulo: "",
      precio: 0,
      categoria: "",
      descripcion: "",
      imageURL: "",
    },
  });

  useEffect(() => {
    if (accion === "Editar" && dataSelect && dataSelect._id) {
      setValue("titulo", dataSelect.titulo || "");
      setValue("precio", dataSelect.precio || 0);
      setValue("categoria", dataSelect.categoria || "");
      setValue("descripcion", dataSelect.descripcion || "");
      setValue("imageURL", dataSelect.imageURL || "");
      setPreviewImage(dataSelect.imageURL || null);
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
      let payload;

      if (data.imageURL instanceof File) {
        // Si el usuario subió un archivo
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("precio", data.precio);
        formData.append("categoria", data.categoria);
        formData.append("descripcion", data.descripcion);
        formData.append("imagen", data.imageURL);
        payload = formData;
      } else {
        // Si el usuario pegó una URL
        payload = {
          titulo: data.titulo,
          precio: data.precio,
          categoria: data.categoria,
          descripcion: data.descripcion,
          imageURL: data.imageURL,
        };
      }

      if (accion === "Editar" && dataSelect?._id) {
        await updateProducto(dataSelect._id, payload);
      } else {
        await createProducto(payload);
      }

      onClose(true);
    } catch (error) {
      console.error("Error al guardar producto:", error);
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
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium mb-1 dark:text-gray-300">
              Título
            </label>
            <input
              id="titulo"
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              {...register("titulo", {
                required: "Ingrese un título",
                minLength: { value: 3, message: "El título debe tener al menos 3 caracteres" },
              })}
            />
            {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
          </div>

          {/* Campo Precio */}
          <div>
            <label htmlFor="precio" className="block text-sm font-medium mb-1 dark:text-gray-300">
              Precio
            </label>
            <input
              id="precio"
              type="number"
              step="0.01"
              min="0"
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              {...register("precio", {
                required: "Ingrese un precio",
                min: { value: 0, message: "El precio no puede ser negativo" },
              })}
            />
            {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>}
          </div>

          {/* Campo Categoría */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium mb-1 dark:text-gray-300">
              Categoría
            </label>
            <select
              id="categoria"
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              {...register("categoria", { required: "Seleccione una categoría" })}
            >
              <option value="">Seleccione una categoría</option>
              {categoria.map((cat) => (
                <option key={`cat-${cat}`} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>}
          </div>

          {/* Campo Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium mb-1 dark:text-gray-300">
              Descripción
            </label>
            <textarea
              id="descripcion"
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              rows="4"
              {...register("descripcion", {
                required: "Ingrese una descripción",
                minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" },
              })}
            />
            {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
          </div>

          {/* Campo Imagen */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Imagen
            </label>

            {/* Input de archivo */}
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white mb-2"
              onChange={handleImageChange}
            />

            {/* Input de URL */}
            <input
              id="imageURL"
              type="text"
              placeholder="https://example.com/imagen.jpg"
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
              {...register("imageURL", {
                required: "Ingrese una URL de imagen o suba un archivo",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Ingrese una URL válida",
                },
              })}
              onChange={(e) => {
                setValue("imageURL", e.target.value);
                setPreviewImage(e.target.value);
              }}
            />
            {errors.imageURL && <p className="text-red-500 text-xs mt-1">{errors.imageURL.message}</p>}
          </div>

          {/* Vista previa */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Vista previa"
              className="mt-2 h-32 object-contain mx-auto"
            />
          )}

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 rounded-lg border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
