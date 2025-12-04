// Servidor Node.js para integración de WhatsApp con Gemini
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuración de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

// Endpoint para enviar mensajes por WhatsApp
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    // Validar datos
    if (!phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        error: 'Número de teléfono y mensaje son requeridos'
      });
    }

    // Formatear número de teléfono (debe incluir código de país)
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+${phoneNumber}`;

    // Enviar mensaje por WhatsApp usando Twilio
    const twilioMessage = await client.messages.create({
      body: message,
      from: `whatsapp:${twilioWhatsAppNumber}`,
      to: `whatsapp:${formattedPhone}`
    });

    console.log('Mensaje enviado:', twilioMessage.sid);

    res.json({
      success: true,
      messageSid: twilioMessage.sid,
      message: 'Mensaje enviado correctamente a WhatsApp'
    });

  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error al enviar el mensaje'
    });
  }
});

// Endpoint de prueba
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Wake Up - WhatsApp Integration',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('Servicio de integración WhatsApp - Wake Up Servicios');
});
