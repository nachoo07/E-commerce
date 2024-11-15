import { Schema, model } from "mongoose";

// Definición del esquema para los productos en el carrito
const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Referencia al modelo de Producto
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
});

// Definición del esquema para el carrito
const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User", // Referencia al modelo de Usuario
            required: false, // Cambia a false para permitir carritos sin usuario
            index: true, // Indexación del usuario para mejorar las búsquedas
        },
        sessionId: { // Nuevo campo para la identificación de la sesión
            type: String,
            required: true, // Requerido para identificar el carrito sin usuario
        },
        items: [cartItemSchema], // Array de productos en el carrito
    },
    { timestamps: true } // Campos createdAt y updatedAt automáticos
);

// Middleware para ejecutar alguna operación antes de guardar el carrito
cartSchema.pre("save", function (next) {
    // Aquí puedes implementar lógica adicional antes de guardar el carrito
    console.log("El carrito se está guardando...");
    next();
});

// Método para obtener el total de artículos en el carrito
cartSchema.methods.getTotalItems = function () {
    return this.items.reduce((total, item) => total + item.quantity, 0);
};

// Crear el modelo
const Cart = model("Cart", cartSchema);

export default Cart;