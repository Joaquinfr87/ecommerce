// src/api/usuarioApi.js
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API;

const API_URL = `${VITE_API_URL}/usuarios`; // cambia esto si tu backend está en otra dirección o puerto

export const registerUsuario = (usuarioData) => {
  return axios.post(`${API_URL}/register`, usuarioData);
};

export const loginUsuario = (usuarioData) => {
  return axios.post(`${API_URL}/login`, usuarioData);
};
