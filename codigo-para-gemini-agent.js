/**
 * CÓDIGO PARA INTEGRAR EN TU AGENTE VIRTUAL DE GEMINI
 *
 * Este código te permite añadir la funcionalidad de WhatsApp
 * a tu asistente virtual de Gemini existente.
 */

// ============================================
// OPCIÓN A: Si usas Google AI Studio con "Code Execution"
// ============================================

// 1. Define esta función en tu agente
async function enviarRespuestaWhatsApp(telefono, mensaje) {
    const BACKEND_URL = 'http://localhost:3000'; // Cambia esto si despliegas en producción

    try {
        const response = await fetch(`${BACKEND_URL}/api/send-whatsapp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: telefono,
                message: `🚀 Wake Up Servicios - Respuesta de tu asistente:\n\n${mensaje}`
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al enviar WhatsApp:', error);
        return { success: false, error: error.message };
    }
}

// 2. Luego, en tu flujo del agente Gemini, después de generar una respuesta:
// Ejemplo de uso:
/*
const respuestaDelAsistente = "Aquí está la información que solicitaste...";
const telefonoUsuario = "+34612345678"; // Obtén esto del usuario

const resultado = await enviarRespuestaWhatsApp(telefonoUsuario, respuestaDelAsistente);

if (resultado.success) {
    console.log("Mensaje enviado exitosamente a WhatsApp!");
} else {
    console.log("Error:", resultado.error);
}
*/


// ============================================
// OPCIÓN B: Si tu agente Gemini está en una página web
// ============================================

// Añade este código a tu HTML existente:
/*
<!-- Botón para compartir por WhatsApp (añádelo después de cada respuesta) -->
<div class="whatsapp-share">
    <button onclick="compartirPorWhatsApp()">
        📱 Recibir por WhatsApp
    </button>
    <input type="tel" id="telefono-whatsapp" placeholder="+34612345678" style="display:none;">
</div>

<script>
let ultimaRespuestaGemini = '';

// Captura la última respuesta de Gemini
// (Adapta esto según cómo captures las respuestas en tu implementación)
function guardarRespuestaGemini(respuesta) {
    ultimaRespuestaGemini = respuesta;
}

function compartirPorWhatsApp() {
    const inputTelefono = document.getElementById('telefono-whatsapp');

    if (inputTelefono.style.display === 'none') {
        inputTelefono.style.display = 'block';
        inputTelefono.focus();

        inputTelefono.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarAWhatsApp();
            }
        });
    } else {
        enviarAWhatsApp();
    }
}

async function enviarAWhatsApp() {
    const telefono = document.getElementById('telefono-whatsapp').value;

    if (!telefono) {
        alert('Por favor ingresa tu número de WhatsApp');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/send-whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: telefono,
                message: `🚀 Wake Up Servicios:\n\n${ultimaRespuestaGemini}`
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('✅ ¡Enviado a WhatsApp!');
            document.getElementById('telefono-whatsapp').value = '';
            document.getElementById('telefono-whatsapp').style.display = 'none';
        } else {
            alert('❌ Error: ' + data.error);
        }
    } catch (error) {
        alert('❌ Error al enviar: ' + error.message);
    }
}
</script>
*/


// ============================================
// OPCIÓN C: Si usas el SDK de Gemini en Node.js
// ============================================

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require('node-fetch');

class AsistenteGeminiConWhatsApp {
    constructor(apiKey, backendUrl = 'http://localhost:3000') {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        this.backendUrl = backendUrl;
    }

    async consultarYEnviar(pregunta, telefonoWhatsApp = null) {
        try {
            // 1. Obtener respuesta de Gemini
            const result = await this.model.generateContent(pregunta);
            const respuesta = result.response.text();

            console.log("Respuesta de Gemini:", respuesta);

            // 2. Si se proporcionó teléfono, enviar por WhatsApp
            if (telefonoWhatsApp) {
                const whatsappResult = await this.enviarWhatsApp(telefonoWhatsApp, respuesta);

                if (whatsappResult.success) {
                    console.log("✅ También enviado a WhatsApp!");
                }
            }

            return respuesta;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    async enviarWhatsApp(telefono, mensaje) {
        try {
            const response = await fetch(`${this.backendUrl}/api/send-whatsapp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: telefono,
                    message: `🚀 Wake Up Servicios:\n\n${mensaje}`
                })
            });

            return await response.json();
        } catch (error) {
            console.error('Error al enviar WhatsApp:', error);
            return { success: false, error: error.message };
        }
    }
}

// Ejemplo de uso:
/*
const asistente = new AsistenteGeminiConWhatsApp('TU_API_KEY_DE_GEMINI');

// Consultar y enviar automáticamente a WhatsApp
await asistente.consultarYEnviar(
    "¿Cuáles son los servicios de Wake Up?",
    "+34612345678"  // Teléfono del usuario
);
*/

module.exports = AsistenteGeminiConWhatsApp;


// ============================================
// INSTRUCCIONES RÁPIDAS DE INTEGRACIÓN
// ============================================

/*
PASO 1: Inicia el servidor backend
    cd wake-up
    npm start

PASO 2: Elige tu método de integración según dónde tengas tu agente:

    - Si es una página web → Usa OPCIÓN B
    - Si es Google AI Studio → Usa OPCIÓN A
    - Si es Node.js backend → Usa OPCIÓN C
    - Si no tienes nada aún → Usa la interfaz completa en public/index.html

PASO 3: Configura las credenciales:
    - Twilio: en archivo .env
    - Gemini: en tu código (API_KEY)

PASO 4: Prueba enviando un mensaje!

IMPORTANTE:
- El servidor debe estar corriendo (npm start)
- Twilio debe estar configurado
- El número de WhatsApp debe unirse al sandbox de Twilio primero
*/
