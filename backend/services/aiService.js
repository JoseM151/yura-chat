/**
 * AI Service for Mental Health Support - Phase 2
 */

// Almacenamiento simple en memoria para contexto (historial)
const sessions = {};

const AI_PROMPT = `
Eres Sana, un asistente de apoyo emocional altamente empático. 
Tu objetivo es escuchar y validar sentimientos.
REGLAS: No diagnostiques. No juzgues. Sugiere autocuidado práctico.
`;

/**
 * Detecta la intención básica del mensaje con mayor granularidad.
 */
const detectIntent = (message) => {
  const msg = message.toLowerCase();
  // Crisis: Prioridad máxima
  if (msg.includes("ayuda") || msg.includes("morir") || msg.includes("suicidio") || msg.includes("daño")) return "crisis";
  
  // Estrés: Enfocado en agobio, trabajo, tareas - Respuesta práctica
  if (msg.includes("estrés") || msg.includes("estresado") || msg.includes("agobiado") || msg.includes("cansado") || msg.includes("mucho trabajo") || msg.includes("examen")) return "estrés";
  
  // Ansiedad: Enfocado en nerviosismo y presente físico
  if (msg.includes("ansiedad") || msg.includes("nervioso") || msg.includes("pánico") || msg.includes("miedo")) return "ansiedad";
  
  // Tristeza/Depresión: Enfocado en estado de ánimo persistente - Respuesta empática profunda
  if (msg.includes("triste") || msg.includes("deprimido") || msg.includes("solo") || msg.includes("vacío")) return "tristeza";
  
  return "general";
};

/**
 * Genera respuesta basada en intención y contexto.
 */
const simulateAIResponse = (message, session) => {
  const intent = detectIntent(message);
  
  // Guardamos un poco de historia
  session.history.push({ role: "user", content: message });
  if (session.history.length > 6) session.history.shift();

  let response = "";

  switch (intent) {
    case "ansiedad":
      response = "Entiendo que los nervios o la ansiedad se sientan pesados ahora. Vamos a intentar algo físico para volver aquí: dime tres cosas que puedas ver y una que puedas tocar en este momento.";
      break;
    case "tristeza":
      response = "Lamento que te sientas con tanta tristeza o ese sentimiento de soledad. Es un espacio difícil de habitar. ¿Sientes que esto ha estado contigo por mucho tiempo o hay algo reciente que lo haya despertado? Te escucho sin prisa.";
      break;
    case "estrés":
      response = "El estrés por el trabajo o las responsabilidades puede hacernos sentir que no hay salida. Antes de seguir, ¿te parece si hacemos una pausa de 30 segundos? Solo estira los brazos y respira profundo una vez. Cuéntame, ¿qué es lo que más te está agobiando hoy?";
      break;
    case "crisis":
      response = "Siento que estás pasando por un dolor muy profundo y me preocupa tu seguridad. Por favor, no estás solo. Te pido que contactes a una línea de ayuda profesional ahora mismo o acudas a emergencias. Tu bienestar es lo más importante para mí.";
      break;
    default:
      if (session.history.length > 2) {
        response = "Te sigo escuchando. Me habías comentado sobre cómo te sentías; ¿ha cambiado algo en estos últimos minutos mientras hablamos?";
      } else {
        response = "Hola, soy Sana. Estoy aquí para escucharte y acompañarte. ¿Qué tienes en mente o cómo te sientes en este momento?";
      }
  }

  session.history.push({ role: "assistant", content: response });
  return response;
};

/**
 * @param {string} userMessage 
 * @param {string} sessionId
 */
const getAIResponse = async (userMessage, sessionId = "default") => {
  if (!userMessage || userMessage.trim() === "") {
    throw new Error("El mensaje no puede estar vacío.");
  }

  if (!sessions[sessionId]) {
    sessions[sessionId] = { history: [] };
  }

  return simulateAIResponse(userMessage, sessions[sessionId]);
};

module.exports = {
  getAIResponse
};
