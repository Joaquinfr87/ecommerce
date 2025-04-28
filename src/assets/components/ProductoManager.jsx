import { useState } from "react";
import TablaCrud from "../../pages/TablaCrud";
import CRUD from "../../pages/FormularioProducto";

export default function ProductoManager() {
  const [openRegistro, setOpenRegistro] = useState(false);  // Estado para abrir y cerrar el modal de CRUD
  const [accion, setAccion] = useState("");                 // Acción (Crear o Editar)
  const [dataSelect, setDataSelect] = useState(null);       // Datos del producto seleccionado

  // Función para cerrar el modal
  const handleClose = (success) => {
    setOpenRegistro(false); // Cerrar el modal al cambiar el estado
    if (success) {
      // Si el proceso de creación o edición fue exitoso, puedes realizar alguna acción adicional.
      console.log("Producto guardado exitosamente");
    }
  };

  return (
    <div>
      {/* Mostrar TablaCrud */}
      {!openRegistro ? (
        <TablaCrud
          SetopenRegistro={setOpenRegistro}
          setdataSelect={setDataSelect}
          setAccion={setAccion}
        />
      ) : (
        // Mostrar CRUD cuando openRegistro es true
        <CRUD
          onClose={handleClose}
          dataSelect={dataSelect}
          accion={accion}
        />
      )}
    </div>
  );
}