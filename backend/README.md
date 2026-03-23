# YURA - Apoyo Emocional (MVP)

Backend de apoyo en salud mental construido con Node.js y Express.

## Características
- **Chat Web**: Interfaz simple en el navegador.
- **API REST**: Escucha mensajes en `/chat`.
- **Integración SMS (Simulada)**: Listo para proveedores como Twilio en `/sms`.
- **IA de Apoyo**: Simulación de respuestas empáticas y seguras.

## Requisitos
- [Node.js](https://nodejs.org/) (versión 14 o superior).

## Instalación
1. Clona o descarga este repositorio.
2. Entra en la carpeta `backend`:
   ```bash
   cd backend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso
1. Inicia el servidor:
   ```bash
   npm start
   ```
2. Abre tu navegador en `http://localhost:3000` para chatear con la IA.

## API
- `GET /health`: Verifica que el servidor está activo.
- `POST /chat`: { "message": "texto" } -> Devuelve respuesta empática.
- `POST /sms`: Simula un webhook de SMS.
