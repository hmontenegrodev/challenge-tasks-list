import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './interfaces/routes/auth.routes';
import taskRoutes from './interfaces/routes/task.routes';
import * as functions from 'firebase-functions';

// Inicializar Express
export const app = express();

// Define la URL de tu frontend
const allowedOrigin = 'https://challenge-tasks-list.web.app';

// Configurar CORS
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Manejar OPTIONS manualmente si es necesario
app.options('*', cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Body parser
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Ruta de prueba
app.get('/', (_req, res) => {
  res.send('API lista para usar!!!');
});

// Exportar como función de Firebase
export const api = functions.https.onRequest(app);
