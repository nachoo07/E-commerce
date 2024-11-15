
import  Product  from "../models/product.model.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Buscar todos los productos

        if (products.length === 0) {
            return res.status(200).json({ message: "No hay productos disponibles" });
        }

        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const createProduct = async (req, res) => {
    const { name, category, description, stock, price, image, image2, image3, image4 } = req.body;

    try {
        // Crear nuevo producto
        const newProduct = await Product.create({ name, category,description, stock, price, image, image2, image3, image4 });

        res.status(201).json({
            message: "El producto se agregó exitosamente",
            product: newProduct // Devuelvo el producto creado
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

import mongoose from 'mongoose';

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error); // Esto ayudará a identificar errores específicos en los logs
    return res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, description, stock, price, image, image2, image3, image4 } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, category, description, stock, price, image, image2, image3, image4 },
            { new: true } // Para devolver el producto actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto actualizado exitosamente", updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}