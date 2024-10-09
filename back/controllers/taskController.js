import { Task } from '../config/db.js';

// Obtener todas las tareas de un proyecto (para administradores o usuarios asignados)
export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({ where: { proyecto_id: req.query.project_id } });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

// Crear una nueva tarea (disponible para administradores y usuarios)
export const createTask = async (req, res, next) => {
    const { nombre, descripcion, estado, proyecto_id, asignada_a } = req.body;

    try {
        const newTask = await Task.create({
            nombre,
            descripcion,
            estado,
            proyecto_id,
            asignada_a,
        });

        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

// Actualizar una tarea (disponible para administradores y usuarios asignados)
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        // Verificar si el usuario tiene permisos (admin o asignado a la tarea)
        if (req.userRole !== 'admin' && task.asignada_a !== req.userId) {
            return res.status(403).json({ msg: 'No tienes permiso para actualizar esta tarea' });
        }

        const { estado } = req.body;
        task.estado = estado || task.estado;
        await task.save();

        res.json(task);
    } catch (err) {
        next(err);
    }
};