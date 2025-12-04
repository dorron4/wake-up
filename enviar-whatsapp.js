/**
 * CÓDIGO AUTOEJECUTABLE PARA ASISTENTE GEMINI
 * Wake Up Servicios - Envío automático por WhatsApp
 *
 * INSTRUCCIONES:
 * 1. Sube este archivo a tu repositorio de GitHub
 * 2. Vincula el repositorio en tu asistente Gemini
 * 3. Los usuarios pueden invocar: "Envíame esto por WhatsApp al +34612345678"
 * 4. El código se ejecuta automáticamente
 */

// ============================================
// CONFIGURACIÓN (Personaliza estos valores)
// ============================================
const CONFIG = {
    // URL de tu servidor backend (si lo despliegas en la nube, cambia esta URL)
    BACKEND_URL: 'https://tu-servidor.com', // O 'http://localhost:3000' para pruebas locales

    // Credenciales de Twilio (también puedes configurarlas como variables de entorno)
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'ACxxxxxxxxxxxxxxx',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'tu_auth_token',
    TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886',
};

// ============================================
// FUNCIÓN PRINCIPAL - ENVIAR POR WHATSAPP
// ============================================

/**
 * Envía un mensaje por WhatsApp usando la API de Twilio
 * @param {string} phoneNumber - Número de teléfono con código de país (ej: +34612345678)
 * @param {string} message - Mensaje a enviar
 * @returns {Promise<Object>} Resultado del envío
 */
async function enviarWhatsApp(phoneNumber, message) {
    // Validar número de teléfono
    if (!phoneNumber || !phoneNumber.startsWith('+')) {
        return {
            success: false,
            error: 'Número de teléfono inválido. Debe incluir el código de país (ej: +34612345678)'
        };
    }

    // Validar mensaje
    if (!message || message.trim() === '') {
        return {
            success: false,
            error: 'El mensaje no puede estar vacío'
        };
    }

    try {
        // OPCIÓN 1: Usar el servidor backend (recomendado)
        if (CONFIG.BACKEND_URL && !CONFIG.BACKEND_URL.includes('tu-servidor')) {
            return await enviarViaBackend(phoneNumber, message);
        }

        // OPCIÓN 2: Llamar directamente a Twilio API
        return await enviarViaTwilioDirecto(phoneNumber, message);

    } catch (error) {
        console.error('Error al enviar WhatsApp:', error);
        return {
            success: false,
            error: error.message || 'Error desconocido'
        };
    }
}

// ============================================
// OPCIÓN 1: Envío vía Backend
// ============================================
async function enviarViaBackend(phoneNumber, message) {
    try {
        const response = await fetch(`${CONFIG.BACKEND_URL}/api/send-whatsapp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                message: `🚀 Wake Up Servicios:\n\n${message}`
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error en envío vía backend:', error);
        // Si falla el backend, intentar con Twilio directo
        return await enviarViaTwilioDirecto(phoneNumber, message);
    }
}

// ============================================
// OPCIÓN 2: Envío directo a Twilio API
// ============================================
async function enviarViaTwilioDirecto(phoneNumber, message) {
    try {
        const accountSid = CONFIG.TWILIO_ACCOUNT_SID;
        const authToken = CONFIG.TWILIO_AUTH_TOKEN;
        const twilioNumber = CONFIG.TWILIO_WHATSAPP_NUMBER;

        // Validar credenciales
        if (!accountSid || accountSid.includes('xxx')) {
            throw new Error('Credenciales de Twilio no configuradas');
        }

        // Formatear números para WhatsApp
        const from = `whatsapp:${twilioNumber}`;
        const to = `whatsapp:${phoneNumber}`;

        // Crear el cuerpo de la petición
        const body = new URLSearchParams({
            To: to,
            From: from,
            Body: `🚀 Wake Up Servicios:\n\n${message}`
        });

        // Llamar a la API de Twilio
        const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al enviar mensaje');
        }

        const data = await response.json();

        return {
            success: true,
            messageSid: data.sid,
            message: '✅ Mensaje enviado correctamente a WhatsApp'
        };

    } catch (error) {
        console.error('Error en Twilio directo:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// ============================================
// FUNCIÓN AUXILIAR - EXTRAER NÚMERO DE TELÉFONO
// ============================================

/**
 * Extrae un número de teléfono de un texto
 * @param {string} text - Texto que contiene el número
 * @returns {string|null} Número de teléfono encontrado o null
 */
function extraerTelefono(text) {
    // Patrones comunes de números de teléfono
    const patterns = [
        /\+\d{1,3}\s?\d{9,}/g,           // +34 612345678
        /\+\d{11,15}/g,                   // +34612345678
        /00\d{11,15}/g,                   // 0034612345678
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            // Limpiar espacios y formatear
            let phone = match[0].replace(/\s/g, '');

            // Convertir 00 a +
            if (phone.startsWith('00')) {
                phone = '+' + phone.substring(2);
            }

            return phone;
        }
    }

    return null;
}

// ============================================
// FUNCIÓN PRINCIPAL PARA INVOCAR DESDE GEMINI
// ============================================

/**
 * Esta es la función que el asistente Gemini debe llamar
 * cuando el usuario solicite enviar información por WhatsApp
 *
 * @param {string} userMessage - Mensaje del usuario (puede contener el número)
 * @param {string} responseToSend - Respuesta del asistente que se enviará
 * @returns {Promise<string>} Mensaje de confirmación
 */
async function procesarSolicitudWhatsApp(userMessage, responseToSend) {
    try {
        // Extraer número de teléfono del mensaje del usuario
        const phoneNumber = extraerTelefono(userMessage);

        if (!phoneNumber) {
            return '❌ No pude identificar un número de teléfono válido. Por favor, proporciona tu número con el código de país (ejemplo: +34612345678)';
        }

        console.log(`📱 Enviando a WhatsApp: ${phoneNumber}`);
        console.log(`📝 Mensaje: ${responseToSend.substring(0, 100)}...`);

        // Enviar el mensaje
        const result = await enviarWhatsApp(phoneNumber, responseToSend);

        if (result.success) {
            return `✅ ¡Perfecto! He enviado la información a tu WhatsApp (${phoneNumber}). Deberías recibirla en unos segundos.`;
        } else {
            return `❌ Hubo un problema al enviar el mensaje: ${result.error}\n\nPor favor, verifica que:\n1. El número sea correcto: ${phoneNumber}\n2. Hayas activado el sandbox de Twilio enviando "join [código]" al +1 415 523 8886\n3. Las credenciales de Twilio estén configuradas correctamente`;
        }

    } catch (error) {
        console.error('Error en procesarSolicitudWhatsApp:', error);
        return `❌ Error inesperado: ${error.message}`;
    }
}

// ============================================
// EXPORTAR FUNCIONES
// ============================================

// Para uso en Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        enviarWhatsApp,
        procesarSolicitudWhatsApp,
        extraerTelefono
    };
}

// ============================================
// EJEMPLO DE USO
// ============================================

/*
// Ejemplo 1: Uso básico
const resultado = await enviarWhatsApp('+34612345678', 'Hola, esta es tu información');
console.log(resultado);

// Ejemplo 2: Procesar solicitud del usuario
const mensajeUsuario = "Envíame esto por WhatsApp al +34612345678";
const respuestaDelAsistente = "Aquí está la información que solicitaste...";
const confirmacion = await procesarSolicitudWhatsApp(mensajeUsuario, respuestaDelAsistente);
console.log(confirmacion);

// Ejemplo 3: Solo extraer teléfono
const telefono = extraerTelefono("Mi número es +34 612 345 678");
console.log(telefono); // +34612345678
*/

// ============================================
// INSTRUCCIONES DE INVOCACIÓN DESDE GEMINI
// ============================================

/*
CÓMO USAR ESTE CÓDIGO EN TU ASISTENTE GEMINI:

1. El usuario dice algo como:
   - "Envíame esta respuesta por WhatsApp al +34612345678"
   - "Mándame esto a mi WhatsApp: +34612345678"
   - "Comparte la información por WhatsApp +34612345678"

2. Tu asistente Gemini ejecuta:
   ```javascript
   const resultado = await procesarSolicitudWhatsApp(
       mensajeDelUsuario,      // El mensaje que escribió el usuario
       respuestaGenerada       // La respuesta que generaste
   );
   console.log(resultado);
   ```

3. El usuario recibe:
   - La confirmación en el chat
   - El mensaje en su WhatsApp

¡Así de simple! 🚀
*/
