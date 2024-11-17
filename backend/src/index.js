import express from "express"
import { PORT } from "../src/config/config.js"
import ProductRouter from "./routes/product.router.js"
import CardRouter from "./routes/card.router.js"
import usersRoutes from './routes/user.router.js';
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser";
import './db/db_connection.js'
import authRoutes from './routes/auth.router.js'

const app = express()

app.use(cors())
app.use(morgan("dev"))

// Configuración de middlewares
app.use(express.json());           // Procesa JSON en el cuerpo de las solicitudes
app.use(cookieParser());           // Procesa las cookies en las solicitudes


// Rutas
app.use("/api/auth", authRoutes);  // Rutas de autenticación
app.use("/api/users", usersRoutes);  // Rutas de usuarios

app.use(ProductRouter);  // Rutas de productos
app.use(CardRouter);  // Rutas de carrito


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

