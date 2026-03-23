require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat");
const smsRoutes = require("./routes/sms");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permitir CORS

// Middleware para procesar JSON y archivos estáticos
app.use(express.json());
app.use(express.static("public"));

// Registro de rutas
app.use("/health", healthRoutes);
app.use("/chat", chatRoutes);
app.use("/sms", smsRoutes);

// Manejo básico de rutas no encontradas y errores globales
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.use((err, req, res, next) => {
  console.error("Error Global:", err.stack);
  res.status(500).json({ error: "Error interno del servidor." });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Backend de apoyo en salud mental (MVP) corriendo en http://localhost:${PORT}`);
  console.log("Rutas disponibles:");
  console.log(`- GET  /health`);
  console.log(`- POST /chat`);
  console.log(`- POST /sms`);
});
