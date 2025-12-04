# ⚡ Inicio Rápido - Wake Up WhatsApp Integration

## 🎯 Para integrar en tu Asistente Gemini existente

### 1. Copia este repositorio en tu asistente Gemini

En la sección de "Repositorios" o "Code Execution" de tu asistente Gemini:
- Añade: `https://github.com/dorron4/wake-up.git`

### 2. Configura las variables de entorno

En las configuraciones de tu asistente Gemini, añade:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_WHATSAPP_NUMBER=+14155238886
```

**Obtén estas credenciales en:** https://console.twilio.com

### 3. Actualiza el prompt de tu asistente

Añade esto al final del prompt del sistema:

```
Cuando un usuario solicite recibir información por WhatsApp,
usa la función procesarSolicitudWhatsApp() del archivo enviar-whatsapp.js

Ejemplo de uso:
import { procesarSolicitudWhatsApp } from './enviar-whatsapp.js';

const resultado = await procesarSolicitudWhatsApp(
    mensajeDelUsuario,     // El mensaje que escribió el usuario
    tuRespuestaAnterior    // Tu última respuesta
);

Frases clave que indican solicitud de WhatsApp:
- "envíame esto por WhatsApp"
- "mándame la información a WhatsApp"
- "comparte por WhatsApp"

El usuario DEBE proporcionar su número con código de país (ej: +34612345678)
```

### 4. ¡Listo! Pruébalo

Usuario dice:
> "Envíame esta información por WhatsApp al +34612345678"

Tu asistente:
1. Detecta la solicitud
2. Extrae el número (+34612345678)
3. Ejecuta el código automáticamente
4. Envía el mensaje por WhatsApp
5. Confirma al usuario

---

## 🔧 Configuración de Twilio (5 minutos)

### Paso 1: Crear cuenta
1. Ve a: https://www.twilio.com/try-twilio
2. Regístrate gratis

### Paso 2: Obtener credenciales
1. Ve a: https://console.twilio.com
2. Copia tu **Account SID**
3. Copia tu **Auth Token**

### Paso 3: Activar WhatsApp Sandbox
1. Ve a: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Envía desde tu WhatsApp a **+1 415 523 8886**
3. Mensaje: `join [código-que-te-muestren]`
4. Ya puedes recibir mensajes

---

## 📱 Formato de Números

✅ **Correcto:**
- `+34612345678` (España)
- `+52 1 55 1234 5678` (México)
- `+1 415 123 4567` (USA)

❌ **Incorrecto:**
- `612345678` (falta código de país)
- `0034612345678` (usa + en vez de 00)
- `34612345678` (falta el +)

---

## 🧪 Probar la Integración

### Opción 1: Test manual en terminal

```bash
cd wake-up
npm install
npm test
```

### Opción 2: Test en tu asistente Gemini

Pregunta a tu asistente:
> "Envíame un mensaje de prueba por WhatsApp al +34612345678"

(Reemplaza con tu número real)

---

## 📚 Documentación Completa

- **Guía detallada de integración con Gemini:** [INTEGRACION-GEMINI.md](INTEGRACION-GEMINI.md)
- **Todas las formas de integración:** [GUIA-INTEGRACION.md](GUIA-INTEGRACION.md)
- **Código fuente autoejecutable:** [enviar-whatsapp.js](enviar-whatsapp.js)
- **Ejemplos de código:** [codigo-para-gemini-agent.js](codigo-para-gemini-agent.js)

---

## ❓ Problemas Comunes

### "No se envía el mensaje"
- ✅ Verifica que activaste el sandbox de Twilio
- ✅ Confirma que el número tiene formato correcto (+código país)
- ✅ Revisa que las credenciales en .env sean correctas

### "Credenciales no configuradas"
- ✅ Asegúrate de añadir las variables de entorno en tu asistente Gemini
- ✅ No uses valores de ejemplo (que contienen 'xxx')

### "El asistente no detecta la solicitud"
- ✅ Actualiza el prompt del sistema
- ✅ El usuario debe mencionar explícitamente "WhatsApp"
- ✅ El usuario debe proporcionar su número

---

## 🆘 Soporte

¿Necesitas ayuda?
1. Lee la documentación completa en [INTEGRACION-GEMINI.md](INTEGRACION-GEMINI.md)
2. Revisa los ejemplos en [codigo-para-gemini-agent.js](codigo-para-gemini-agent.js)
3. Abre un issue: https://github.com/dorron4/wake-up/issues

---

## ✅ Checklist de Configuración

- [ ] Cuenta de Twilio creada
- [ ] Credenciales obtenidas (Account SID y Auth Token)
- [ ] Sandbox de WhatsApp activado (enviaste "join código")
- [ ] Repositorio añadido en tu asistente Gemini
- [ ] Variables de entorno configuradas
- [ ] Prompt del asistente actualizado
- [ ] Prueba realizada con tu número

¡Todo listo para enviar mensajes por WhatsApp! 🚀
