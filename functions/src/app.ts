import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './interfaces/routes/auth.routes';
import taskRoutes from './interfaces/routes/task.routes';

// Importar el archivo de configuración de Firebase
dotenv.config();

// Inicializar la aplicación Express
export const app = express();

// Configurar Cors y body-parser
// Permitir solicitudes desde el frontend
app.use(cors());
app.use(bodyParser.json());

// Configurar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// Ruta de prueba para verificar que la API está funcionando
app.get('/', (_req, res) => {
  res.send('API lista para usar!!!');
});