import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

// Traer todos los usuarios
export const GetAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Traer un usuario por ID
export const GetUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Crear usuario (solo para administradores)
export const CreateUser = async (req, res) => {
  const { name, surname, email, password, rol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      surname,
      email,
      password: hashedPassword,
      rol: rol || "usuario", // Por defecto a "usuario" si no se proporciona rol
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

// Eliminar un usuario
export const DeleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

// Modificar un usuario
export const UpdateUser = async (req, res) => {
  const { name, surname, email, password, rol } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        surname,
        email,
        ...(password && { password: await bcrypt.hash(password, 10) }), // Si hay password, se hashea
        rol,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Loguear usuario
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    console.log("Contraseña ingresada: ", password);
    console.log("Contraseña en base de datos: ", user.password);

    // Crear el token JWT si la contraseña es correcta
    const token = jwt.sign({ id: user._id, rol: user.rol }, "SECRET_KEY", {
      expiresIn: "1d",
    });

    // Enviar el token en una cookie
    res.cookie("token", token, {
      httpOnly: true, // Solo accesible a través de HTTP
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS si está en producción
    });

    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

// controllers/authController.js

// Cerrar sesión
export const LogoutUser = (req, res) => {
  res.cookie("token", "", { maxAge: 1 }); // Caduca inmediatamente
  res.status(200).json({ message: "Cierre de sesión exitoso" });
};

// Registro de usuario (público)
export const RegisterUser = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      surname,
      email,
      password: hashedPassword,
      rol: "usuario", // Asigna el rol de "usuario" por defecto para todos los registros públicos
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente", newUser });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      // Si el error es por un email duplicado
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

