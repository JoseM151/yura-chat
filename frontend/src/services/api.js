/**
 * YURA API Service
 */

const API_BASE_URL = 'http://localhost:3000';

export async function sendMessage(message, sessionId = "default") {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, sessionId }),
        });

        if (!response.ok) {
            throw new Error('Error en el servidor. Revisa tu conexión.');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
