import express from "express";
import { PORT } from "../src/config/config.js";
import ProductRouter from "./routes/product.router.js";
import CardRouter from "./routes/card.router.js";
import AuthRouter from "./routes/auth.routes.js"; // Importar la ruta de autenticación
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import './db/db_connection.js';

const app = express();

app.set('trust proxy', 1); // Confía en el primer proxy (Render u otros servicios similares)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 solicitudes por IP
    message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);
// Configuración de middlewares
app.use(express.json());           // Procesa JSON en el cuerpo de las solicitudes
app.use(morgan("dev"));
app.use(cors({
    origin: 'https://e-commerce-adzq.onrender.com', // Permitir solicitudes desde este origen
    credentials: true                // Permitir el envío de cookies
}));

app.use(cookieParser());           // Procesa las cookies en las solicitudes



// Rutas
app.use("/api/product", ProductRouter);  // Rutas de productos
app.use('/api/cards', CardRouter);       // Rutas de carrito
app.use('/api/auth', AuthRouter);        // Rutas de autenticación

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});