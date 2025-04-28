import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
  } from "@tanstack/react-table";
  import Swal from "sweetalert2";
  import { FaArrowsAltV } from "react-icons/fa";
  import { useSelector, useDispatch } from "react-redux";
  import { useState, useEffect } from "react";
  import { deleteProducto, getAllProductos } from "../api/productoAPI";
  import { setProducts } from "../features/products/ProductSlice";
  import { useNavigate } from "react-router-dom";
  import LogoutButton from "../assets/components/LogoutButton";

  export default function TablaCrud({
    SetopenRegistro,
    setdataSelect,
    setAccion,
  }) {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.product.items);
    const navigate = useNavigate();
  
    useEffect(() => {
      const loadProductos = async () => {
        try {
          const productosData = await getAllProductos();
          dispatch(setProducts(productosData));
        } catch (error) {
          console.error("Error al cargar productos:", error);
        }
      };
  
      loadProductos();
    }, [dispatch]);
  
    const editar = (producto) => {
      SetopenRegistro(true);
      setdataSelect(producto);
      setAccion("Editar");
    };
  
    const eliminar = async (p) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteProducto(p._id);
            dispatch(
              setProducts(productos.filter((producto) => producto._id !== p._id))
            );
            Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
          } catch (error) {
            Swal.fire("Error", "No se pudo eliminar el producto", "error");
          }
        }
      });
    };
  
    const columns = [
      {
        accessorKey: "titulo",
        header: "Producto",
        cell: (info) => <span className="text-gray-800">{info.getValue()}</span>,
      },
      {
        accessorKey: "precio",
        header: "Precio",
        cell: (info) => (
          <span className="font-medium">${info.getValue().toFixed(2)}</span>
        ),
      },
      {
        accessorKey: "categoria",
        header: "Categoría",
        cell: (info) => (
          <span className="text-gray-600">
            {info.row.original.categoria || "Sin categoría"}
          </span>
        ),
      },
      {
        accessorKey: "descripcion",
        header: "Descripción",
        cell: (info) => {
          const desc = info.getValue() || "";
          return (
            <span className="text-gray-600">
              {desc.length > 30 ? `${desc.substring(0, 30)}...` : desc}
            </span>
          );
        },
      },
      {
        accessorKey: "imageURL",
        header: "Imagen",
        cell: (info) =>
          info.getValue() && (
            <img
              src={info.getValue()}
              alt="Producto"
              className="h-10 w-10 object-cover rounded inline-block"
            />
          ),
      },
      {
        accessorKey: "acciones",
        header: "Acciones",
        enableSorting: false,
        cell: (info) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => editar(info.row.original)}
              className="p-1 text-blue-600 hover:text-blue-800"
            >
              Editar
            </button>
            <button
              onClick={() => eliminar(info.row.original)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ];
  
    const table = useReactTable({
      data: productos,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
    return (
      <div className="relative mx-3 my-5 md:mx-2 md:my-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              navigate("/crud");
              SetopenRegistro(true);
              setAccion("Crear");
            }}
            className="flex items-center justify-center space-x-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105"
          >
            <span className="font-semibold">Crear Nuevo Producto</span>
          </button>
          <LogoutButton/>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full mb-6">
            <thead className="hidden md:table-header-group">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-center border-b-2 border-gray-300 bg-gray-100 text-gray-700 font-medium"
                    >
                      <div className="flex items-center justify-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className="ml-2 focus:outline-none"
                          >
                            <FaArrowsAltV size={12} className="text-gray-500" />
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted()] || null}
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="block md:table-row-group">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="block mb-4 border border-gray-200 rounded-lg md:table-row md:mb-0 md:border-none even:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-right md:text-center border-b border-gray-200"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="flex flex-col md:flex-row items-center justify-between mt-4">
          <div className="mb-2 md:mb-0">
            <span className="text-sm text-gray-700">
              Mostrando página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Primera
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Siguiente
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Última
            </button>
          </div>
        </div>
      </div>
    );
  }