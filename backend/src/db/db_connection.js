import mongoose from 'mongoose'
import { CONNECTION_STRING } from '../config/config.js'

mongoose.connect(CONNECTION_STRING, {
    tls: true,
    tlsAllowInvalidCertificates: true // Solo para pruebas, no usar en producción
})

mongoose.connection.on("connected", () => {
    console.log("Conectado a la base de datos MongoDB")
})

mongoose.connection.on("error", (error) => {
    console.error("Error al conectar a MongoDB:", error)
})