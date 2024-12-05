import { Schema, model } from 'mongoose';

// Esquema de usuario
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Rol por defecto 'admin'
}, { timestamps: true });

const User = model('User', userSchema);

export default User;