import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); 

// Conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306
    }
);

// Modelo de Usuario
const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'usuario'),
        defaultValue: 'usuario'
    }
}, { timestamps: true });

// Modelo de Proyecto
const Project = sequelize.define('Project', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_finalizacion: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, { timestamps: true });

// Modelo de Tarea
const Task = sequelize.define('Task', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
        defaultValue: 'pendiente'
    }
}, { timestamps: true });

// Relaciones
User.hasMany(Project, { foreignKey: 'usuario_id' });
Project.belongsTo(User, { foreignKey: 'usuario_id' });

Project.hasMany(Task, { foreignKey: 'proyecto_id' });
Task.belongsTo(Project, { foreignKey: 'proyecto_id' });

User.hasMany(Task, { foreignKey: 'asignada_a' });
Task.belongsTo(User, { foreignKey: 'asignada_a' });

export { sequelize };