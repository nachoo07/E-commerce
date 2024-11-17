import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const RegisterUser = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
        // Verifica si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
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
  
    // 1. Verificar que el email y la contraseña no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor ingresa email y contraseña' });
    }
  
    try {
     const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      

      const isPasswordCorrect = await user.correctPassword(password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      // 4. Si todo es correcto, generar un token JWT
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      // 5. Enviar el token al cliente
      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
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