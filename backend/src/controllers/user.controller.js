import User from '../models/user.model.js';

// Obtener solo usuarios con rol 'admin'
export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }); // Filtra solo usuarios admin
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching admin users.', error });
    }
};

// Crear nuevo usuario con rol 'admin'
export const createAdmin = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const newAdmin = new User({
            name,
            username,
            email,
            password: hashedPassword,
            role: 'admin', // Forzar rol admin
        });

        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).send({ message: 'Error creating admin user.', error });
    }
};

// Actualizar datos de un usuario admin
export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, username, email } = req.body;

    try {
        const user = await User.findById(id);
        if (!user || user.role !== 'admin') {
            return res.status(404).send({ message: 'Admin user not found.' });
        }

        if (name) user.name = name;
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ message: 'Error updating admin user.', error });
    }
};

// Eliminar usuario admin
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user || user.role !== 'admin') {
            return res.status(404).send({ message: 'Admin user not found.' });
        }

        res.status(200).json({ message: 'Admin user deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting admin user.', error });
    }
};