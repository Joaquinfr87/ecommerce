import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUsuario, registerUsuario } from "../../api/usuarioAPI";

// Async Thunks
export const login = createAsyncThunk("auth/login", async (credenciales, thunkAPI) => {
  try {
    const res = await loginUsuario(credenciales);
    localStorage.setItem("token", res.data.token); // Guardar el token en el localStorage
    localStorage.setItem("user", JSON.stringify(res.data.user)); // Guardar el usuario en localStorage
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Manejo de errores
  }
});

export const register = createAsyncThunk("auth/register", async (usuario, thunkAPI) => {
  try {
    const res = await registerUsuario(usuario);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); // Manejo de errores
  }
});

// Estado inicial, obteniendo el token del localStorage si está disponible
const initialState = {
  isLogged: !!localStorage.getItem("token"), // Determinar si el usuario está autenticado
  user: (() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Error al parsear el usuario guardado:", e);
      return null;
    }
  })(),
  
  token: localStorage.getItem("token") || null, // Guardar el token en el estado
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLogged = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLogged = true;
        state.token = action.payload.token; // Guardar el token en el estado
        state.user = action.payload.user; // Guardar la información del usuario
        localStorage.setItem("token", action.payload.token); // Guardar el token en localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Guardar el usuario en localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message; // Mejor manejo de errores
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message; // Manejo de errores para registro
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
