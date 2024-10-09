import { Project } from '../config/db.js';

// Obtener todos los proyectos (solo administradores)
export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (err) {
        next(err);
    }
};

// Crear un nuevo proyecto (disponible para administradores y usuarios)
export const createProject = async (req, res, next) => {
    const { nombre, descripcion, fecha_inicio, fecha_finalizacion } = req.body;

    try {
        const newProject = await Project.create({
            nombre,
            descripcion,
            fecha_inicio,
            fecha_finalizacion,
            usuario_id: req.userId, // Usuario que creó el proyecto
        });

        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
};

// Actualizar un proyecto (solo administradores)
export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        const { nombre, descripcion, fecha_inicio, fecha_finalizacion } = req.body;

        project.nombre = nombre || project.nombre;
        project.descripcion = descripcion || project.descripcion;
        project.fecha_inicio = fecha_inicio || project.fecha_inicio;
        project.fecha_finalizacion = fecha_finalizacion || project.fecha_finalizacion;

        await project.save();
        res.json(project);
    } catch (err) {
        next(err);
    }
};

// Eliminar un proyecto (solo administradores)
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        await project.destroy();
        res.json({ msg: 'Proyecto eliminado correctamente' });
    } catch (err) {
        next(err);
    }
};