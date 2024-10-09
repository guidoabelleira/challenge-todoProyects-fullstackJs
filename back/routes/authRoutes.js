import express from 'express';
import { registerUser, loginUser } from './authController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

export default router;