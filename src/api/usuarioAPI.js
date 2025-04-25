// src/api/usuarioApi.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/usuarios'; // cambia esto si tu backend está en otra dirección o puerto

export const registerUsuario = (usuarioData) => {
  return axios.post(`${API_URL}/register`, usuarioData);
};

export const loginUsuario = (usuarioData) => {
  return axios.post(`${API_URL}/login`, usuarioData);
};
