import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: ["http://localhost:5173"], // Dominio permitido
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
// autenticación
app.use('/api/auth', authRoutes);
// Rutas de proyectos
app.use('/api', projectRoutes);
// Rutas de tareas
app.use('/api', taskRoutes);
// Middleware de manejo de errores
app.use(errorHandler);


export default app;