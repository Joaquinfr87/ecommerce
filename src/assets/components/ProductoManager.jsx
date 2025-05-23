import { useState } from "react";
import TablaCrud from "../../pages/TablaCrud";
import CRUD from "../../pages/FormularioProducto";

export default function ProductoManager() {
  const [openRegistro, setOpenRegistro] = useState(false); // Estado para abrir y cerrar el modal de CRUD
  const [accion, setAccion] = useState(""); // Acción (Crear o Editar)
  const [dataSelect, setDataSelect] = useState(null); // Datos del producto seleccionado

  // Función para cerrar el modal
  const handleClose = (success) => {
    setOpenRegistro(false); // Cerrar el modal al cambiar el estado
    if (success) {
      // Si el proceso de creación o edición fue exitoso, puedes realizar alguna acción adicional.
      console.log("Producto guardado exitosamente");
    }
  };

  return (
    <div className="relative">
      <TablaCrud
        SetopenRegistro={setOpenRegistro}
        setdataSelect={setDataSelect}
        setAccion={setAccion}
      />

      {openRegistro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => handleClose(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <CRUD
              onClose={handleClose}
              dataSelect={dataSelect}
              accion={accion}
            />
          </div>
        </div>
      )}
    </div>
  );
}
