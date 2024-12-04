import mongoose from 'mongoose';
import Product from "../models/product.model.js";

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
    const { name, category, description, stock, price, image, image2, image3 } = req.body;
    console.log("Datos recibidos del frontend:", req.body);
    try {
        // Crear nuevo producto
        const newProduct = await Product.create({ name, category, description, stock, price, image, image2, image3 });
        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "El producto se agregó exitosamente",
            product: savedProduct // Devuelvo el producto creado
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}