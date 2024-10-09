import express from "express";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";
import { createDefaultUsers } from "./scriptDataBase.js";
dotenv.config();

const app = express();
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos sincronizada");
    createDefaultUsers(); // Función para crear los usuarios admin y user por defecto
  })
  .catch((err) => console.error("Error al sincronizar la base de datos:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
