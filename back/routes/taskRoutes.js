import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';
import { createTask, updateTask, getTasks } from '../controllers/taskController.js';

const router = express.Router();

// Obtener todas las tareas de un proyecto (solo para administradores y usuarios asignados)
router.get('/tasks', verifyToken, checkRole(['admin', 'usuario']), getTasks);

// Crear una nueva tarea (disponible para administradores y usuarios)
router.post('/tasks', verifyToken, checkRole(['admin', 'usuario']), createTask);

// Actualizar una tarea (disponible para administradores y usuarios asignados)
router.patch('/tasks/:id', verifyToken, checkRole(['admin', 'usuario']), updateTask);

export default router;