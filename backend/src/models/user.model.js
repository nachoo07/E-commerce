import { Schema, model } from 'mongoose';

// Esquema de usuario
const userSchema = new Schema({
    name: { type: String, required: true },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true // Elimina espacios en blanco
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // Ejemplo: 'admin' o 'user'
}, { timestamps: true });

const User = model('Usuario', userSchema);

export default User;