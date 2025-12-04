# 🤖 Integración con Asistente Gemini - Wake Up Servicios

## 📋 Descripción

Este documento explica cómo integrar el código de envío por WhatsApp en tu asistente virtual de Gemini, de forma que sea **completamente autoejecutable**.

## 🎯 Objetivo

Que los usuarios de tu asistente Gemini puedan decir:
> "Envíame esta información por WhatsApp al +34612345678"

Y automáticamente reciban la respuesta en su WhatsApp.

---

## 🚀 Pasos de Integración

### Paso 1: Configurar el Repositorio en Gemini

1. Ve a tu asistente en Google AI Studio o Vertex AI
2. Busca la sección "Code Execution" o "Repositorios de GitHub"
3. Añade este repositorio: `https://github.com/dorron4/wake-up.git`
4. Marca el archivo `enviar-whatsapp.js` como disponible para ejecución

### Paso 2: Configurar Variables de Entorno

En la configuración de tu asistente Gemini, añade estas variables de entorno:

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token_de_twilio
TWILIO_WHATSAPP_NUMBER=+14155238886
```

**Cómo obtenerlas:**
- Ve a https://console.twilio.com
- Copia tu Account SID y Auth Token
- El número de WhatsApp del sandbox es: +14155238886

### Paso 3: Configurar el Prompt del Asistente

Actualiza el prompt de sistema de tu asistente Gemini para incluir:

```
Eres el asistente virtual de Wake Up Servicios.

Cuando un usuario solicite recibir información por WhatsApp:
1. Identifica el número de teléfono en su mensaje
2. Ejecuta la función procesarSolicitudWhatsApp()
3. Envía tu última respuesta al número proporcionado

Para enviar por WhatsApp, usa este código:

import { procesarSolicitudWhatsApp } from './enviar-whatsapp.js';

const resultado = await procesarSolicitudWhatsApp(
    mensajeDelUsuario,    // El mensaje completo del usuario
    tuRespuesta           // Tu respuesta que se enviará
);

Frases que indican que el usuario quiere WhatsApp:
- "Envíame esto por WhatsApp"
- "Mándame la información a mi WhatsApp"
- "Comparte esto por WhatsApp"
- "Quiero recibir esto en WhatsApp"

IMPORTANTE:
- El número debe incluir el código de país (ej: +34612345678)
- Si no proporcionan el número, pídelo amablemente
- Confirma siempre cuando envíes el mensaje
```

### Paso 4: Implementar la Lógica de Detección

Si tu asistente Gemini soporta "Function Calling", añade esta definición:

```json
{
  "name": "enviarRespuestaPorWhatsApp",
  "description": "Envía la última respuesta del asistente al WhatsApp del usuario",
  "parameters": {
    "type": "object",
    "properties": {
      "phoneNumber": {
        "type": "string",
        "description": "Número de teléfono con código de país (ejemplo: +34612345678)",
        "pattern": "^\\+[1-9]\\d{10,14}$"
      },
      "message": {
        "type": "string",
        "description": "El mensaje que se enviará por WhatsApp"
      }
    },
    "required": ["phoneNumber", "message"]
  }
}
```

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Usuario solicita WhatsApp

**Usuario:**
> "Me ha gustado mucho la información sobre vuestros servicios. ¿Puedes enviármela por WhatsApp al +34612345678?"

**Asistente (internamente ejecuta):**
```javascript
import { procesarSolicitudWhatsApp } from './enviar-whatsapp.js';

const mensajeUsuario = "Me ha gustado mucho la información sobre vuestros servicios. ¿Puedes enviármela por WhatsApp al +34612345678?";

const respuestaAnterior = "Wake Up Servicios ofrece soluciones integrales...";

const resultado = await procesarSolicitudWhatsApp(
    mensajeUsuario,
    respuestaAnterior
);

console.log(resultado);
```

**Asistente (responde al usuario):**
> "✅ ¡Perfecto! He enviado la información a tu WhatsApp (+34612345678). Deberías recibirla en unos segundos."

---

### Ejemplo 2: Usuario no proporciona número

**Usuario:**
> "Envíame esto por WhatsApp"

**Asistente:**
> "¡Claro! Para enviarte la información por WhatsApp, necesito tu número de teléfono con el código de país. Por ejemplo: +34612345678 (para España)."

**Usuario:**
> "+34612345678"

**Asistente (ejecuta):**
```javascript
const resultado = await procesarSolicitudWhatsApp(
    "+34612345678",
    respuestaAnterior
);
```

**Asistente:**
> "✅ ¡Enviado! Revisa tu WhatsApp."

---

## 🔧 Configuración Avanzada

### Opción A: Usar el Servidor Backend

Si prefieres usar el servidor backend (más seguro):

1. Despliega el servidor en un servicio como Railway, Render, o Heroku
2. Actualiza la variable `BACKEND_URL` en `enviar-whatsapp.js`:
   ```javascript
   BACKEND_URL: 'https://wake-up-whatsapp.railway.app'
   ```
3. El código usará el backend automáticamente

### Opción B: Usar Twilio Directo

El código ya está configurado para usar Twilio directamente si no hay backend disponible.

---

## 📱 Activar WhatsApp (Importante)

Antes de que los usuarios puedan recibir mensajes, deben unirse al sandbox de Twilio:

**Instrucciones para los usuarios:**
1. Guarda el número: **+1 415 523 8886**
2. Envía por WhatsApp: `join [código-que-te-proporcionó-twilio]`
3. Ya puedes recibir mensajes

**Nota:** Para producción, necesitarás aprobar tu propio número con WhatsApp Business API.

---

## 🎨 Personalización

### Modificar el mensaje de bienvenida

Edita en `enviar-whatsapp.js`:

```javascript
// Línea donde se envía el mensaje
Body: `🚀 Wake Up Servicios:\n\n${message}`

// Cámbialo por:
Body: `¡Hola! Aquí está la información que solicitaste:\n\n${message}\n\n-- Wake Up Servicios`
```

### Añadir validaciones personalizadas

```javascript
function validarNumeroEspanol(phoneNumber) {
    // Solo permite números españoles
    return phoneNumber.startsWith('+34') && phoneNumber.length === 12;
}
```

---

## 🔍 Debugging

### Ver logs en el asistente

```javascript
console.log('📱 Intentando enviar a:', phoneNumber);
console.log('📝 Mensaje:', message.substring(0, 50) + '...');
console.log('✅ Resultado:', resultado);
```

### Probar la función manualmente

```javascript
// En la consola del asistente
const test = await procesarSolicitudWhatsApp(
    "Envíame esto al +34612345678",
    "Mensaje de prueba"
);
console.log(test);
```

---

## ⚠️ Solución de Problemas

### Error: "Credenciales no configuradas"
- Verifica que las variables de entorno estén bien configuradas
- Asegúrate de que no haya espacios extra en los valores

### Error: "Número inválido"
- El número debe empezar con `+`
- Debe incluir el código de país
- Formato correcto: `+34612345678` (sin espacios)

### Error: "Unable to create record"
- El usuario no se ha unido al sandbox de Twilio
- Pídele que envíe "join [código]" al +1 415 523 8886

### No llegan los mensajes
- Verifica que el servidor backend esté activo (si lo usas)
- Revisa los logs de Twilio en https://console.twilio.com/monitor/logs
- Confirma que el número esté verificado en el sandbox

---

## 📊 Flujo Completo

```
Usuario escribe mensaje
        ↓
Asistente detecta solicitud de WhatsApp
        ↓
Extrae número de teléfono
        ↓
Ejecuta: procesarSolicitudWhatsApp()
        ↓
    ¿Hay backend?
    ↙          ↘
  Sí           No
   ↓            ↓
Backend API   Twilio Directo
   ↓            ↓
   └─────┬──────┘
         ↓
   Envío por WhatsApp
         ↓
   Usuario recibe mensaje
         ↓
   Asistente confirma envío
```

---

## 🚀 Siguiente Nivel

### Mejoras sugeridas:

1. **Historial de envíos**
   - Guardar qué mensajes se enviaron a qué números
   - Evitar spam enviando el mismo mensaje múltiples veces

2. **Plantillas de mensajes**
   - Crear plantillas predefinidas para diferentes tipos de respuestas
   - Formateo automático de mensajes largos

3. **Multi-idioma**
   - Detectar el idioma del usuario
   - Enviar mensajes en su idioma preferido

4. **Confirmación previa**
   - Mostrar vista previa del mensaje antes de enviar
   - Permitir al usuario confirmar o cancelar

---

## 📞 Soporte

Si tienes problemas con la integración:
1. Revisa la documentación de Twilio: https://www.twilio.com/docs/whatsapp
2. Consulta los ejemplos en `codigo-para-gemini-agent.js`
3. Abre un issue en GitHub: https://github.com/dorron4/wake-up/issues

---

## ✅ Checklist de Integración

- [ ] Repositorio vinculado en Gemini
- [ ] Variables de entorno configuradas
- [ ] Prompt del asistente actualizado
- [ ] Function calling configurado (si aplica)
- [ ] Prueba manual realizada
- [ ] Usuarios informados sobre activación de sandbox
- [ ] Backend desplegado (opcional)
- [ ] Documentación compartida con el equipo

---

¡Todo listo para que tu asistente Gemini envíe mensajes por WhatsApp! 🎉
