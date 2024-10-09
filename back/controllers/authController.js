import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./db.js";

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);
    user = await User.create({
      nombre,
      email,
      contraseña: hashedPassword,
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Error al registrar usuario", err });
  }
};

// Inicio de Sesión
export const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Credenciales incorrectas" });
    }
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ msg: "Credenciales incorrectas" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Error al iniciar sesión", err });
  }
};
