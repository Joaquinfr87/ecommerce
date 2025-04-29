import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderById } from "../api/orderAPI";
import { getProductoById } from "../api/productoAPI";

export default function Orden() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data);

        // Fetch product details for each item in the order
        const productPromises = response.data.items.map(item =>
          getProductoById(item._id).then((producto) => ({
            ...item,
            producto,
          }))
        );

        const productData = await Promise.all(productPromises);
        setProducts(
          productData.reduce((acc, item) => {
            acc[item._id] = item.producto;
            return acc;
          }, {})
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p>Cargando pedido...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No se encontró el pedido.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Factura</h2>
      <div className="mb-6">
        <h3 className="text-lg text-gray-600">ID del pedido: <span className="font-semibold text-gray-800">#{order._id}</span></h3>
        <h3 className="text-lg text-gray-600">Fecha: <span className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span></h3>
      </div>
  
      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Factura a:</h2>
        <p className="text-gray-800">John Doe</p>
        <p className="text-gray-800">Calle Falsa 123</p>
        <p className="text-gray-800">john@example.com</p>
        <p className="text-gray-800">+595 999 123 456</p>
        <p className="text-gray-800">CI: 1234567</p>
      </div>
  
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {order.items.map((item) => {
              const producto = products[item._id];
              return producto ? (
                <tr key={item._id}>
                  <td className="px-4 py-2">{producto.titulo}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">${producto.precio}</td>
                  <td className="px-4 py-2">${(producto.precio * item.quantity).toFixed(2)}</td>
                </tr>
              ) : (
                <tr key={item._id}>
                  <td className="px-4 py-2 italic text-gray-500">Cargando producto...</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2">-</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr>
              <td className="px-4 py-3 font-semibold text-gray-700" colSpan="3">Total</td>
              <td className="px-4 py-3 font-semibold text-gray-900">${order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
  
}

