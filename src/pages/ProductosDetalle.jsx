  const API_URL = import.meta.env.VITE_API;
  import { ShoppingCart } from "lucide-react";
  import React, { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { Link, useParams } from "react-router-dom";
  import NavBar from "../assets/components/NavBar";
  import { addToCart } from '../features/cart/cartSlice';
  import { getProductoById } from "../api/productoAPI";
  import axios from 'axios';

  export default function ProductosDetalle() {
    const { id } = useParams(); // Obtener el ID del producto de la URL
    const dispatch = useDispatch();
    
    const [product, setProduct] = useState(null); // Inicializamos el estado para el producto

    useEffect(() => {
      // Obtener el producto desde el backend
      axios.get(`${API_URL}:4000/productos/${id}`)
        .then(response => {
          setProduct(response.data); // Guardamos el producto en el estado
        })
        .catch(error => {
          console.error('Error al obtener el producto:', error);
        });
    }, [id]); // Solo se ejecutará cuando el id cambie

    // Si no hay producto, mostramos un mensaje
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
        <div className="container mx-auto px-4 py-8 ">
          <div>
            <Link to="/" className="mb-8 inline-block bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">  
              Volver a Productos
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="shadow-md p-4 * rounded">
              <img src={product.imageURL} alt={product.titulo} className="w-full h-auto rounded"/>
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
              <button 
                className="w-full md:w-auto bg-zinc-200 px-8 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-zinc-300"
                onClick={() => dispatch(addToCart(product))}
              >
                <ShoppingCart />
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
