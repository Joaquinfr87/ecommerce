import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../assets/components/LogoutButton'; 
const API_URL = 'http://localhost:4000/productos';

const CRUD = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ titulo: '', precio: '', categoria: '', descripcion: '', imageURL: '' });
  const [editandoId, setEditandoId] = useState(null);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`${API_URL}/${editandoId}`, form);
        setEditandoId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ titulo: '', precio: '', categoria: '', descripcion: '', imageURL: '' });
      obtenerProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const manejarEditar = (producto) => {
    setForm(producto);
    setEditandoId(producto._id);
  };

  const manejarEliminar = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">CRUD de Productos</h1>

      {/* Formulario */}
      <form onSubmit={manejarSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            type="text"
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={manejarCambio}
            required
          />
          <input
            className="border p-2 rounded"
            type="number"
            name="precio"
            placeholder="Precio"
            value={form.precio}
            onChange={manejarCambio}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={manejarCambio}
            required
          />
          <input
            className="border p-2 rounded"
            type="text"
            name="imageURL"
            placeholder="URL de la imagen"
            value={form.imageURL}
            onChange={manejarCambio}
          />
        </div>
        <textarea
          className="border p-2 rounded w-full"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={manejarCambio}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editandoId ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      {/* Lista de productos */}
      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div key={producto._id} className="bg-white shadow-md rounded-lg p-4 space-y-2">
              <img
                src={producto.imageURL}
                alt={producto.titulo}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold">{producto.titulo}</h2>
              <p className="text-gray-700">Precio: ${producto.precio}</p>
              <p className="text-gray-700">Categoría: {producto.categoria}</p>
              <p className="text-gray-600 text-sm">{producto.descripcion}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => manejarEditar(producto)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => manejarEliminar(producto._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <LogoutButton/>
    </div>
  );
};

export default CRUD;
