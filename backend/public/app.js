/**
 * SANA - Premium Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chat-history');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');

    // Identificador de sesión persistente (simple)
    let sessionId = localStorage.getItem('sana_session_id');
    if (!sessionId) {
        sessionId = Math.random().toString(36).substring(7);
        localStorage.setItem('sana_session_id', sessionId);
    }

    /**
     * Formatea la hora actual.
     */
    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    /**
     * Crea un elemento de mensaje con su envoltura y hora.
     */
    function createMessageElement(text, isAI = false) {
        const wrapper = document.createElement('div');
        wrapper.className = `message-wrapper ${isAI ? 'ai' : 'user'}`;

        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.textContent = text;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'time';
        timeSpan.textContent = getFormattedTime();

        wrapper.appendChild(msgDiv);
        wrapper.appendChild(timeSpan);
        
        return wrapper;
    }

    /**
     * Agrega mensaje al DOM y hace scroll.
     */
    function addMessage(text, isAI = false) {
        const msgElement = createMessageElement(text, isAI);
        chatHistory.appendChild(msgElement);
        
        // Auto-scroll suave
        chatHistory.scrollTo({
            top: chatHistory.scrollHeight,
            behavior: 'smooth'
        });
    }

    /**
     * Lógica de envío y recepción.
     */
    async function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;

        // UI Reset
        messageInput.value = '';
        addMessage(text, false);

        // Mostrar "Yura está escribiendo..."
        typingIndicator.style.display = 'flex';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, sessionId })
            });

            if (!response.ok) throw new Error('Servicio no disponible');

            const data = await response.json();
            
            // Ocultar indicador y mostrar respuesta
            typingIndicator.style.display = 'none';
            addMessage(data.reply, true);

        } catch (error) {
            console.error('Error:', error);
            typingIndicator.style.display = 'none';
            addMessage('No puedo conectarme ahora mismo. Por favor, asegúrate de estar conectado o inténtalo en un momento.', true);
        }
    }

    // Handlers
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Foco inicial
    messageInput.focus();
});
