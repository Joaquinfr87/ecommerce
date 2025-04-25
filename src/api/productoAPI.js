// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/productos'; // Asegúrate que sea la URL correcta de tu backend

// Productos
export const getAllProductos = () => axios.get(`${API_URL}/`);
export const getProductoById = (id) => axios.get(`${API_URL}/${id}`);
export const createProducto = (producto) => axios.post(`${API_URL}/`, producto);
export const updateProducto = (id, producto) => axios.put(`${API_URL}/${id}`, producto);
export const deleteProducto = (id) => axios.delete(`${API_URL}/${id}`);
