import bcrypt from 'bcryptjs';
import { User } from './config/db.js';

// Función para crear usuarios por defecto
const createDefaultUsers = async () => {
    try {
        const adminExists = await User.findOne({ where: { nombre: 'admin' } });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin', salt);
            await User.create({
                nombre: 'admin',
                email: 'admin@example.com',
                contraseña: hashedPassword,
                rol: 'admin',
            });
            console.log("Usuario 'admin' creado por defecto.");
        }
        const userExists = await User.findOne({ where: { nombre: 'user' } });
        if (!userExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('user', salt);
            await User.create({
                nombre: 'user',
                email: 'user@example.com',
                contraseña: hashedPassword,
                rol: 'usuario',
            });
            console.log("Usuario 'user' creado por defecto.");
        }
    } catch (err) {
        console.error('Error al crear usuarios por defecto:', err);
    }
};

export {createDefaultUsers}