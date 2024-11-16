import { Router } from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById } from "../controllers/product.controllers.js";

const router = Router()

router.get("/", getAllProducts)
router.post("/create", createProduct)
router.delete("/delete/:id", deleteProduct)
router.put("/update/:id", updateProduct)
router.get("/id/:id", getProductById);
export default router