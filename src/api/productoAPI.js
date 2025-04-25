import axios from 'axios';

const API_URL = 'http://localhost:4000/productos';

// Configuración común para las solicitudes con FormData
const formDataConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

// Productos
export const getAllProductos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error);
    throw error;
  }
};

export const createProducto = async (productoData) => {
  try {
    const response = await axios.post(API_URL, productoData, formDataConfig);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productoData, formDataConfig);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id}:`, error);
    throw error;
  }
};