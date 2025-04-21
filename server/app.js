import express from 'express';
import 'dotenv/config';
import routesProductos from './routes/productoRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/productos',routesProductos);

try { 
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server esta corriendo en el puerto ${PORT}`));
}
catch (error) {
  console.error('Error starting the server:', error);
} 