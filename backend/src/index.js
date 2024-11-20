import express from "express"
import { PORT } from "../src/config/config.js"
import ProductRouter from "./routes/product.router.js"
import CardRouter from "./routes/card.router.js"
import userRoutes from './routes/user.routes.js'
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';
import './db/db_connection.js'



const app = express()

app.use(cors())
app.use(morgan("dev"))

// Configuración de middlewares
app.use(express.json());           // Procesa JSON en el cuerpo de las solicitudes
app.use(cookieParser());           // Procesa las cookies en las solicitudes

// Rutas
app.use(bodyParser.json());
app.use(userRoutes); // Registrar las rutas de usuario
app.use(ProductRouter);  // Rutas de productos
app.use(CardRouter);  // Rutas de carrito

// Iniciar el servidor
/*app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});*/
 // Render asignará un puerto automáticamente en producción
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
