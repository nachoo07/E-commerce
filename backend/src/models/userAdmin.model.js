import { Schema, model } from 'mongoose';

// Esquema de administrador
const userAdminSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' }, // Rol por defecto 'admin'
}, { timestamps: true });

const UserAdmin = model('UserAdmin', userAdminSchema);

export default UserAdmin;