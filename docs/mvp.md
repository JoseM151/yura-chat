# MVP: Aplicación de Apoyo Emocional con IA

## 1. docs/mvp.md

**Objetivo:** Brindar un espacio accesible y seguro donde los usuarios puedan expresar sus emociones y recibir apoyo empático y validación emocional a través de la Inteligencia Artificial (IA) en tiempo real.

**Grupo objetivo:** Personas que experimentan estrés, ansiedad o tristeza moderada, así como cualquier usuario que necesite un espacio para desahogarse de forma inmediata sin emitir diagnósticos.

**Problema:** La dificultad para encontrar una herramienta de contención emocional inmediata en momentos de crisis leve o tensión cotidiana, lo cual puede incrementar el malestar y la sensación de soledad.

**Prioridad:** Alta. El MVP se enfoca en validar la interacción emocional, la detección correcta del contexto y la estabilidad de la plataforma principal.

**Funcionalidades del MVP:**
- Chat interactivo y responsivo tipo WhatsApp (Frontend React + Vite).
- IA que brinda respuestas empáticas y comprende emociones básicas (ansiedad, estrés, tristeza).
- Indicadores visuales en tiempo real (indicador de escritura "escribiendo...", scroll automático natural).
- Historial básico de contexto para la sesión actual manejado por la IA.
- Endpoint de respaldo para futuras interacciones vía SMS.

**Arquitectura:**
- **Frontend:** React (generado a través de Vite).
- **Backend:** Node.js usando Express para la orquestación de la IA y endpoints principales.

**Limitaciones:**
- La IA **no realiza diagnósticos médicos** bajo ninguna circunstancia.
- No reemplaza bajo ningún concepto la terapia profesional cualificada.
- Manejo de contexto circunscrito a la sesión temporal activa.
- Carencia de autenticación de múltiples capas de seguridad o un panel de administración en esta primera versión.

---

## 2. Criterios de Aceptación

### Chat Web (Frontend)
- **Despliegue de la Interfaz:**
  - *Given* que accedemos a la URL de la aplicación web,
  - *When* la página carga en el navegador del dispositivo,
  - *Then* se debe visualizar visualmente un área de chat de mensajería instantánea.
- **Flujo de Envío:**
  - *Given* que el usuario tiene la aplicación abierta con foco en el campo de texto,
  - *When* ingresa un mensaje y envía la solicitud,
  - *Then* el mensaje debe aparecer en pantalla y el campo de texto debe quedar vacío.
- **Scroll Automático (Auto-scroll):**
  - *Given* que el historial de mensajes sobrepasa la altura de la vista del usuario,
  - *When* un nuevo mensaje es enviado o recibido,
  - *Then* la pantalla hace scroll automático hacia el último mensaje para mantenerlo visible.
- **Indicador de Escritura:**
  - *Given* un mensaje enviado esperando respuesta,
  - *When* la IA está procesando la solicitud en el backend,
  - *Then* la interfaz debe mostrar un indicador dinámico informando que el agente está escribiendo.

### Backend y Servicio de IA (Sana)
- **Empatía (POST `/chat`):**
  - *Given* un texto entrante con contenido asociado a tristeza, estrés o ansiedad,
  - *When* el backend procesa el payload hacia la IA,
  - *Then* el servicio debe contestar con palabras empáticas, validando la emoción, sin recetas clínicas ni soluciones médicas, entregando HTTP 200 OK.
- **Endpoint de Mensajería SMS (POST `/sms`):**
  - *Given* un payload válido de un sistema externo simulado (Twilio o similar),
  - *When* el endpoint `/sms` recibe la llamada,
  - *Then* el backend procesa el envío correctamente.
- **Healthcheck (GET `/health`):**
  - *Given* la necesidad de comprobar el estado del servidor,
  - *When* se envíe una petición GET hacia el path `/health`,
  - *Then* el servidor debe responder un status 200 indicando "OK" o en servicio.

---

## 3. Pasos de Validación

### Cómo ejecutar Backend
1. Navegar por terminal hacia el directorio `/backend`.
2. Instalar el paquete de módulos requeridos usando `npm install`.
3. Verificar que las variables de entorno se encuentren definidas en un archivo `.env` (basándose en `.env.example`).
4. Iniciar el servidor local ejecutando `npm run dev` (o de lo contrario, `node server.js`).

### Cómo ejecutar Frontend
1. En otra sesión de terminal, acceder al directorio `/frontend`.
2. Instalar los paquetes obligatorios con `npm install`.
3. Levantar el proyecto usando Vite a través de `npm run dev`.
4. Ingresar desde su navegador la ruta expuesta (por defecto: `http://localhost:5173`).

### Validación de Endpoints Clave
- *Endpoint Health:*
  - Cargar `http://localhost:PORT/health` en el navegador o enviar un `curl GET`.
  - **Resultado Esperado:** Mensaje JSON afirmando la normalidad del servidor con código 200.

### Pruebas Funcionales con IA (Ejemplos)
*Nota: Estas pruebas se deben ejecutar directamente en el entorno web con backend inicializado.*

- **Mensaje de Entrada (Ansiedad):**
  - *Enviar:* "Estoy demasiado abrumado en mi trabajo, siento un peso y no sé cómo voy a terminar la jornada, es mucha presión."
  - *Resultado Esperado:* Indicador visual de "escribiendo...". Posteriormente, respuesta de corte terapéutico validando el estrés y recomendando bajar revoluciones sin entrar en determinaciones clínicas.
  
- **Mensaje de Entrada (Tristeza):**
  - *Enviar:* "Me siento súper solo hoy, las cosas no salieron bien."
  - *Resultado Esperado:* La IA contesta demostrando apoyo y validación incondicional a dichos sentimientos sin menospreciar su estado.
  
- **Mensaje de Entrada (Gestión de contexto):**
  - *Enviar:* "¿Recuerdas por qué te comenté que estaba presionado antes?"
  - *Resultado Esperado:* La IA conecta esta interrogante con el entorno laboral discutido en el primer mensaje de prueba.
