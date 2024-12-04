import express from "express"
import { PORT } from "../src/config/config.js"
import ProductRouter from "./routes/product.router.js"
import CardRouter from "./routes/card.router.js"
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import './db/db_connection.js'

const app = express()

// Configuración de middlewares
app.use(express.json());           // Procesa JSON en el cuerpo de las solicitudes
app.use(morgan("dev"))
app.use(cors())
app.use(cookieParser());           // Procesa las cookies en las solicitudes

// Rutas
app.use('/api/auth', authRoutes);
app.use("/api/product",ProductRouter);  // Rutas de productos
app.use('/api/cards', CardRouter);  // Rutas de carrito
app.use('/api/users', userRoutes);  // Rutas de usuarios

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});