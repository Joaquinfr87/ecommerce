import express from 'express';
import cors from 'cors'; // 👈 importa cors
import 'dotenv/config';
import routesProductos from './routes/productoRoute.js';
import bodyParser from 'body-parser';

const app = express();

// 🛡️ Habilita CORS para todos los orígenes (o uno específico)
app.use(cors({
  origin: 'http://localhost:5173' // puedes cambiar esto si quieres más seguridad
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/productos', routesProductos);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server está corriendo en el puerto ${PORT}`));
}
catch (error) {
  console.error('Error starting the server:', error);
}
