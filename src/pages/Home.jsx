import React, { useEffect } from "react";
import { getAllProductos } from "../api/productoAPI";
import ProductoGrid from "../assets/components/ProductoGrid";
import { useDispatch } from "react-redux";
import { setSelectedCategory,setProducts } from "../features/products/ProductSlice";
import NavBar from "../assets/components/NavBar";
const categoria = [
  "All",
  "Protección",
  "Accesorios",
  "Iluminación",
  "Herramientas",
  "Componentes",
  "Seguridad",
];

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProductos()  
      .then(productos => {
        dispatch(setProducts(productos));  
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, [dispatch]);
  return (
    <>
    
      <NavBar />
      <div>
        <div className="bg"></div>
        <div className="container mx-auto my-10 px-4 ">
          <div className="flex flex-wrap gap-4">
            {categoria.map((cat) => {
              return (
                <button
                  className="bg-gray-300 py-2 px-4 rounded-md text-black active:scale-105 hover:bg-zinc-400 transition-all ease-in"
                  key={cat}
                  onClick={() => dispatch(setSelectedCategory(cat))}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <ProductoGrid />
        </div>
      </div>
    </>
  );
}
