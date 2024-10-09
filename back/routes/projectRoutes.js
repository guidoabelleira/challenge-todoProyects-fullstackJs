import express from 'express';
import { verifyToken } from './middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';
import { getProjects, createProject, updateProject, deleteProject } from './controllers/projectController.js';

const router = express.Router();

// Obtener todos los proyectos (solo para administradores)
router.get('/projects', verifyToken, checkRole(['admin']), getProjects);

// Crear un nuevo proyecto (disponible para administradores y usuarios)
router.post('/projects', verifyToken, checkRole(['admin', 'usuario']), createProject);

// Actualizar un proyecto (solo administradores)
router.put('/projects/:id', verifyToken, checkRole(['admin']), updateProject);

// Eliminar un proyecto (solo administradores)
router.delete('/projects/:id', verifyToken, checkRole(['admin']), deleteProject);

export default router;