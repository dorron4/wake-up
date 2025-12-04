# 📘 Guía de Integración - Wake Up WhatsApp

## 🤔 ¿Dónde tienes actualmente tu agente Gemini?

Responde esta pregunta para saber cómo integrar:

### A) "Todavía no tengo un agente Gemini, quiero crear uno desde cero"
→ **Usa la solución completa que ya está lista**
- Ve a la sección: **INTEGRACIÓN COMPLETA**

### B) "Tengo un agente en Google AI Studio o Vertex AI"
→ **Necesitas conectarlo vía API**
- Ve a la sección: **INTEGRACIÓN CON GOOGLE AI STUDIO**

### C) "Tengo una página web con un chatbot de Gemini"
→ **Añade el código de WhatsApp a tu web**
- Ve a la sección: **INTEGRACIÓN EN PÁGINA WEB EXISTENTE**

### D) "Tengo una aplicación o backend con Gemini"
→ **Usa el servidor como API REST**
- Ve a la sección: **INTEGRACIÓN VÍA API**

---

## 🚀 INTEGRACIÓN COMPLETA (Opción A)

Esta es la forma más fácil. Ya tienes todo el código listo.

### Paso 1: Configurar el Backend

```bash
# Navega a la carpeta
cd C:\Users\Aitor\wake-up

# Instala las dependencias
npm install

# Copia el archivo de ejemplo
copy .env.example .env
```

### Paso 2: Obtener credenciales de Twilio

1. Ve a https://www.twilio.com/try-twilio
2. Regístrate (es gratis para pruebas)
3. Ve a https://console.twilio.com
4. Copia:
   - **Account SID**
   - **Auth Token**
5. Ve a https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
6. Sigue las instrucciones para activar el sandbox de WhatsApp

### Paso 3: Obtener API Key de Gemini

1. Ve a https://makersuite.google.com/app/apikey
2. Crea una nueva API Key
3. Cópiala

### Paso 4: Configurar las credenciales

**Edita el archivo `.env`:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_WHATSAPP_NUMBER=+14155238886
PORT=3000
```

**Edita el archivo `public/index.html` línea 167:**
```javascript
const GEMINI_API_KEY = 'AIzaSy...tu_api_key_aqui';
```

### Paso 5: Iniciar el servidor

```bash
npm start
```

### Paso 6: Probar

1. Abre tu navegador en: http://localhost:3000
2. Escribe una pregunta al chatbot
3. El asistente Gemini responderá
4. Ingresa tu número de WhatsApp (ejemplo: +34612345678)
5. Haz clic en "Enviar a WhatsApp"
6. ¡Recibirás el mensaje en tu WhatsApp!

**IMPORTANTE:** Antes de recibir mensajes, debes unirte al sandbox de Twilio:
- Envía un mensaje de WhatsApp al número: +1 415 523 8886
- Con el texto: `join [código-que-te-den]`

---

## 🔗 INTEGRACIÓN CON GOOGLE AI STUDIO (Opción B)

Si ya tienes un agente creado en Google AI Studio:

### Método 1: Usar "Function Calling"

1. En Google AI Studio, ve a tu agente
2. Añade esta función:

```javascript
{
  "name": "enviarPorWhatsApp",
  "description": "Envía la respuesta al WhatsApp del usuario",
  "parameters": {
    "type": "object",
    "properties": {
      "telefono": {
        "type": "string",
        "description": "Número de teléfono con código de país (ej: +34612345678)"
      },
      "mensaje": {
        "type": "string",
        "description": "El mensaje a enviar"
      }
    },
    "required": ["telefono", "mensaje"]
  }
}
```

3. Implementa la función:

```javascript
async function enviarPorWhatsApp(telefono, mensaje) {
  const response = await fetch('http://localhost:3000/api/send-whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phoneNumber: telefono,
      message: `🚀 Wake Up Servicios:\n\n${mensaje}`
    })
  });
  return await response.json();
}
```

4. Actualiza el prompt del agente:
```
Al final de cada respuesta, pregunta al usuario:
"¿Te gustaría recibir esta información por WhatsApp? Si es así, proporcióname tu número con el código de país (ejemplo: +34612345678)"
```

### Método 2: Usar la API directamente

Ver el archivo: `codigo-para-gemini-agent.js` (OPCIÓN A)

---

## 🌐 INTEGRACIÓN EN PÁGINA WEB EXISTENTE (Opción C)

Si ya tienes una página web con un chatbot:

### Paso 1: Asegúrate de que el servidor backend esté corriendo

```bash
cd C:\Users\Aitor\wake-up
npm start
```

### Paso 2: Añade este código a tu HTML

```html
<!-- Añade este botón después de cada respuesta del chatbot -->
<button id="btn-whatsapp" onclick="solicitarWhatsApp()">
    📱 Recibir por WhatsApp
</button>

<!-- Input para el teléfono (oculto inicialmente) -->
<div id="whatsapp-container" style="display: none;">
    <input
        type="tel"
        id="telefono-whatsapp"
        placeholder="+34612345678"
    />
    <button onclick="enviarPorWhatsApp()">Enviar</button>
</div>

<!-- Zona de notificaciones -->
<div id="notificacion"></div>
```

### Paso 3: Añade este JavaScript

```javascript
let ultimaRespuesta = '';

// Llama a esta función cada vez que el chatbot genere una respuesta
function guardarRespuesta(respuesta) {
    ultimaRespuesta = respuesta;
}

function solicitarWhatsApp() {
    document.getElementById('whatsapp-container').style.display = 'block';
}

async function enviarPorWhatsApp() {
    const telefono = document.getElementById('telefono-whatsapp').value;

    if (!telefono) {
        alert('Por favor ingresa tu número');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/send-whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phoneNumber: telefono,
                message: `🚀 Wake Up Servicios:\n\n${ultimaRespuesta}`
            })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('notificacion').innerHTML =
                '✅ ¡Enviado a WhatsApp!';
        } else {
            document.getElementById('notificacion').innerHTML =
                '❌ Error: ' + data.error;
        }
    } catch (error) {
        document.getElementById('notificacion').innerHTML =
            '❌ Error al enviar';
    }
}
```

### Paso 4: Integrar con tu chatbot existente

Cuando tu chatbot Gemini genere una respuesta, llama a:

```javascript
// Ejemplo con fetch a Gemini API
const respuesta = await obtenerRespuestaDeGemini(pregunta);
guardarRespuesta(respuesta); // Guarda para WhatsApp
mostrarEnChat(respuesta);     // Muestra en el chat
```

---

## 📡 INTEGRACIÓN VÍA API (Opción D)

Si tienes una aplicación backend o móvil:

### El servidor expone estos endpoints:

#### 1. Enviar mensaje por WhatsApp
```
POST http://localhost:3000/api/send-whatsapp
Content-Type: application/json

{
  "phoneNumber": "+34612345678",
  "message": "Tu mensaje aquí"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "messageSid": "SM...",
  "message": "Mensaje enviado correctamente a WhatsApp"
}
```

#### 2. Health check
```
GET http://localhost:3000/api/health
```

### Ejemplo de uso desde cualquier lenguaje:

**Python:**
```python
import requests

response = requests.post('http://localhost:3000/api/send-whatsapp', json={
    'phoneNumber': '+34612345678',
    'message': '🚀 Wake Up Servicios:\n\nTu respuesta aquí'
})

print(response.json())
```

**PHP:**
```php
$data = [
    'phoneNumber' => '+34612345678',
    'message' => '🚀 Wake Up Servicios:\n\nTu respuesta aquí'
];

$ch = curl_init('http://localhost:3000/api/send-whatsapp');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
curl_close($ch);

echo $result;
```

**Java:**
```java
HttpClient client = HttpClient.newHttpClient();
String json = """
    {
        "phoneNumber": "+34612345678",
        "message": "🚀 Wake Up Servicios:\\n\\nTu respuesta aquí"
    }
    """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://localhost:3000/api/send-whatsapp"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
```

---

## 🔧 Solución de Problemas

### Error: "Cannot connect to server"
- Verifica que el servidor esté corriendo: `npm start`
- Revisa que el puerto 3000 esté libre

### Error: "Invalid credentials"
- Verifica que hayas configurado correctamente el `.env`
- Revisa que las credenciales de Twilio sean correctas

### Error: "Unable to send message"
- Asegúrate de que el número esté unido al sandbox de Twilio
- Verifica que el formato del número sea correcto (+código país + número)

### No recibo mensajes en WhatsApp
1. Envía "join [código]" al número de Twilio primero
2. Verifica que usaste el formato correcto: +34612345678
3. Revisa los logs del servidor para ver errores

---

## 📞 ¿Necesitas Ayuda?

Si tienes dudas:
1. Revisa el archivo `codigo-para-gemini-agent.js` para más ejemplos
2. Mira `ejemplo-integracion.html` para un ejemplo funcional
3. Abre un issue en GitHub: https://github.com/dorron4/wake-up/issues

---

## 🎯 Resumen Rápido

```bash
# 1. Instalar
cd wake-up && npm install

# 2. Configurar
# - Edita .env con credenciales de Twilio
# - Edita public/index.html con API Key de Gemini

# 3. Ejecutar
npm start

# 4. Usar
# Abre http://localhost:3000
```

¡Ya está todo listo! 🚀
