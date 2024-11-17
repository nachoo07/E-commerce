import { Schema, model } from "mongoose"; 


import bcrypt from 'bcryptjs'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, 'El campo "name" debe tener al menos 3 caracteres'],
      maxLength: [100, 'El campo "name" debe tener como máximo 100 caracteres'],
    },
    surname: {
      type: String,
      required: true,
      minLength: [3, 'El campo "surname" debe tener al menos 3 caracteres'],
      maxLength: [100, 'El campo "surname" debe tener como máximo 100 caracteres'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [3, 'El campo "password" debe tener al menos 3 caracteres'],
      maxLength: [100, 'El campo "password" debe tener como máximo 100 caracteres'],
    },
    rol: {
      type: String,
      enum: ['admin', 'usuario'],
      default: 'usuario'
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware para cifrar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Solo se ejecuta si la contraseña ha cambiado
  this.password = await bcrypt.hash(this.password, 12); // Cifra la contraseña
  next();
});

// Método para comparar contraseñas
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


export const UserModel = model('User', userSchema);



