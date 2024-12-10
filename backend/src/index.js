import express from "express";
import { PORT } from "../src/config/config.js";
import ProductRouter from "./routes/product.router.js";
import CardRouter from "./routes/card.router.js";
import AuthRouter from "./routes/auth.routes.js"; // Importar la ruta de autenticación
import UserRouter from "./routes/user.routes.js"; // Importar la ruta de usuarios
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
app.use(cookieParser());           // Procesa las cookies en las solicitudes

// Configura las opciones de CORS para permitir ambos orígenes
// Configura las opciones de CORS para permitir ambos orígenes
const corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:5173', 'https://e-commerce-adzq.onrender.com']
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // Permitir el origen
      } else {
        callback(new Error('CORS not allowed'), false); // Rechazar otros orígenes
      }
    },
    credentials: true, // Permitir el envío de cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions));
// Maneja las solicitudes OPTIONS
app.options('*', cors(corsOptions));
// Rutas
app.use('/api/product', ProductRouter);  // Rutas específicas
app.use('/api/cards', CardRouter);       // Rutas de carrito
app.use('/api/users', UserRouter );       // Rutas de carrito
app.use('/api/auth', AuthRouter);        // Rutas de autenticación

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});