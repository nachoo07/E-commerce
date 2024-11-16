import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const RegisterUser = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Cifrar la contraseña antes de guardar el usuario
        const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      surname,
      email,
      password: hashedPassword,
      rol: "usuario", // Asigna el rol de "usuario" por defecto
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente", newUser });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
     const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña cifrada con la proporcionada
    const match = await bcrypt.compare(password, user.password);  // Aquí se compara la contraseña

    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

export const LogoutUser = (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,  // Solo accesible a través de HTTP, no accesible desde JS del lado del cliente
      secure: process.env.NODE_ENV === "production",  // Solo funciona en HTTPS cuando está en producción
      expires: new Date(0),  // Establece la fecha de expiración de la cookie en el pasado, lo que efectivamente la elimina
    });
  
    res.status(200).json({ message: "Cierre de sesión exitoso" });
  };