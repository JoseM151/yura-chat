const express = require("express");
const router = express.Router();
const aiService = require("../services/aiService");

// POST /chat
router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // Validación básica del mensaje
    if (!message) {
      return res.status(400).json({ error: "Falta el mensaje en el cuerpo de la petición." });
    }

    // Procesar mensaje con IA (pasando sessionId para el contexto)
    const reply = await aiService.getAIResponse(message, sessionId);

    // Responder al cliente
    res.json({ reply });
  } catch (error) {
    console.error("Error en chat:", error);
    res.status(500).json({ error: "Ocurrió un error al procesar tu solicitud." });
  }
});

module.exports = router;
