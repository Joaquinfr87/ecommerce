import { ShoppingCart } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NavBar from "../assets/components/NavBar";
import { addToCart } from '../features/cart/cartSlice';

export default function ProductosDetalle() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.items.find((p) => p.id === parseInt(id))
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Retornar a Pagina de Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8 ">
        <div>
          <Link to="/" className="mb-8 inline-block">
            Volver a Productos
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="shadow-md p-4 * rounded w-[600px]">
            <img src={product.imageURL} alt={product.titulo} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 ">{product.titulo}</h1>
            <p className="text-gray-600 mb-6 ">{product.descripcion}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold">${product.precio}</span>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Categoria</h3>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm">
                {product.categoria}
              </span>
            </div>
            <button className="w-full md:w-auto  bg-zinc-200 px-8 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-zinc-300"
            onClick={()=> dispatch(addToCart(product))}>
              <ShoppingCart />
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
