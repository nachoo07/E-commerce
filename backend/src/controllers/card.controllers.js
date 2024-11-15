import Cart from "../models/card.model.js";

// Crear o actualizar el carrito
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const sessionId = req.cookies.sessionId || req.headers.sessionid; // Obtener el sessionId
        if (!sessionId) {
            return res.status(400).json({ message: "Se requiere un sessionId para agregar productos al carrito." });
        }

        let cart = await Cart.findOne({ sessionId });

        if (!cart) {
            // Si no hay carrito, crear uno nuevo con el sessionId
            cart = new Cart({ sessionId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            // Si el producto ya está en el carrito, solo actualizamos la cantidad
            existingItem.quantity += quantity;
        } else {
            // Si no está en el carrito, lo agregamos
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Producto agregado al carrito", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener el carrito
export const getCart = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId || req.headers.sessionid; // Obtener el sessionId
        if (!sessionId) {
            return res.status(400).json({ message: "Se requiere un sessionId para obtener el carrito." });
        }

        const cart = await Cart.findOne({ sessionId }).populate("items.product");
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const sessionId = req.cookies.sessionId || req.headers.sessionid; // Obtener el sessionId
        if (!sessionId) {
            return res.status(400).json({ message: "Se requiere un sessionId para eliminar productos del carrito." });
        }

        const cart = await Cart.findOne({ sessionId });

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: "Producto eliminado del carrito", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};