import jwt from "jsonwebtoken";
import { User } from "./db.js";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    // Obtener el rol del usuario desde la base de datos
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    req.userRole = user.rol;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
