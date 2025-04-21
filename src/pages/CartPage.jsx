import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash } from "lucide-react";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import axios from 'axios';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener productos desde el backend
    axios.get('http://localhost:4000/productos') // Ajusta la URL a tu servidor
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center ">
          <h2>El carrito esta vacio</h2>
          <p className="text-gray-600 mb-4">
            Añade algunos productos para verlos aqui
          </p>
          <Link
            to="/"
            className="inline-block bg-zinc-200 px-6 py-2 rounded-lg hover:bg-zinc-300"
          >
            Continuar a Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto container px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Carrito de Compra</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 shadow-md p-4 rounded-md">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 py-4 border-b ">
              <img
                src={item.imageURL}
                alt={item.titulo}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <Link
                  to={`/productos/${item._id}`}
                  className="font-semibold hover:text-blue-600 "
                >
                  {item.titulo}
                </Link>
                <p className="text-gray-300">${item.precio}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          quantity: Math.max(0, item.quantity - 1),
                        })
                      )
                    }
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          quantity: Math.max(0, item.quantity + 1),
                        })
                      )
                    }
                  >
                    <Plus size={16} />
                  </button>
                  <div
                    className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    <Trash size={20} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-bold">
                  ${(item.precio * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="shadow-md bg-white p-6 rounded-md">
            <h3 className="text-xs font-bold mb-4">Resumen de pedido</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envio</span>
                <span>Gratis</span>
              </div>
              <div className="border-t pt-2 font-bold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-zinc-200 px-6 py-3 rounded-lg hover:bg-zinc-300">
              Proceder a verificar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
