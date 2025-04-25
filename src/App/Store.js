// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/ProductSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice'; // Asegúrate de importar el authReducer

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer  // Agrega el reducer de auth aquí
  },
});
