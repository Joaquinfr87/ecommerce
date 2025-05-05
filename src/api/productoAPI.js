import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API;

const API_URL = `${VITE_API_URL}:4000/productos`;

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
    let response;

    if (productoData instanceof FormData) {
      // Si es FormData, enviamos como multipart/form-data
      response = await axios.post(API_URL, productoData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      // Si es un objeto normal (no FormData), enviamos como JSON
      response = await axios.post(API_URL, productoData);
    }

    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error.response?.data || error);
    throw error;
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    let response;

    if (productoData instanceof FormData) {
      response = await axios.put(`${API_URL}/${id}`, productoData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await axios.put(`${API_URL}/${id}`, productoData);
    }

    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error.response?.data || error);
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