import express from "express"
import { PORT } from "../src/config/config.js"
import ProductRouter from "./routes/product.router.js"
import CardRouter from "./routes/card.router.js"
import usersRoutes from './routes/user.router.js';
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser";
import './/db/db_connection.js'
const app = express()

// Configuración de middlewares
app.use(express.json());           // Procesa JSON en el cuerpo de las solicitudes
app.use(cookieParser());           // Procesa las cookies en las solicitudes


app.use(express.json())

app.use(morgan("dev"))
app.use(cors())
app.use(ProductRouter)
app.use(CardRouter)
app.use("/api", usersRoutes); // Prefijo "/api" para las rutas de usuario

// Iniciar el servidor


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

