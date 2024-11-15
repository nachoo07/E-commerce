import Router from 'express'

import { addToCart, getCart, removeFromCart } from '../controllers/card.controllers.js'

const router = Router()

router.post("/add", addToCart); // Ruta para agregar al carrito
router.get("/cart", getCart); // Ruta para obtener el carrito
router.delete("/cart/:productId", removeFromCart); // Ruta para eliminar del carrito
export default router;