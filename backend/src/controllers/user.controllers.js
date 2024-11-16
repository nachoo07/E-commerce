import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";

export const GetAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

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

export const CreateUser = async (req, res) => {
  const { name, surname, email, password, rol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      surname,
      email,
      password: hashedPassword,
      rol: rol || "usuario", // Por defecto "usuario" si no se especifica rol
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

export const UpdateUser = async (req, res) => {
  const { name, surname, email, password, rol } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        surname,
        email,
        ...(password && { password: await bcrypt.hash(password, 10) }),
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