const express = require("express");
const router = express.Router();
const aiService = require("../services/aiService");

/**
 * Endpoint para simular integración con SMS (webhook de Twilio u otros).
 * POST /sms
 * Este endpoint recibe mensajes que simulan la estructura de Twilio.
 */
router.post("/", async (req, res) => {
  try {
    // SMS provider (like Twilio) usually sends data in body. 
    // Field name might vary (e.g., 'Body' from Twilio).
    const userMessage = req.body.Body || req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "No se encontró el contenido del mensaje." });
    }

    // Obtener respuesta de IA
    const reply = await aiService.getAIResponse(userMessage);

    /**
     * Respuesta que simula el TwiML sugerido (opcional) o un JSON básico.
     * En un escenario real con Twilio, devolverías XML (TwiML).
     */
    res.json({ 
      to_sms_gateway: true,
      message: reply 
    });
  } catch (error) {
    console.error("Error en SMS webhook:", error);
    res.status(500).json({ error: "Error procesando el SMS." });
  }
});

module.exports = router;
