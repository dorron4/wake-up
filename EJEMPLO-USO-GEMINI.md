# 💬 Ejemplo de Uso en Asistente Gemini

Este documento muestra cómo se vería una conversación real con tu asistente Gemini una vez integrado el código de WhatsApp.

---

## 📱 Escenario 1: Usuario solicita información por WhatsApp

### Conversación:

**Usuario:**
> Hola, ¿qué servicios ofrece Wake Up?

**Asistente Gemini:**
> ¡Hola! Wake Up Servicios ofrece:
>
> 1. **Consultoría Empresarial**: Ayudamos a las empresas a optimizar sus procesos y estrategias
> 2. **Desarrollo Web**: Creamos sitios web modernos y aplicaciones
> 3. **Marketing Digital**: Estrategias de redes sociales, SEO y publicidad online
> 4. **Automatización**: Implementamos soluciones de IA y automatización de procesos
>
> ¿En cuál de estos servicios estás interesado?

**Usuario:**
> Me interesa la consultoría empresarial. ¿Puedes enviarme esta información por WhatsApp al +34612345678?

**Asistente Gemini (internamente ejecuta):**
```javascript
import { procesarSolicitudWhatsApp } from './enviar-whatsapp.js';

const mensajeUsuario = "Me interesa la consultoría empresarial. ¿Puedes enviarme esta información por WhatsApp al +34612345678?";

const respuestaAnterior = `¡Hola! Wake Up Servicios ofrece:

1. **Consultoría Empresarial**: Ayudamos a las empresas a optimizar sus procesos y estrategias
2. **Desarrollo Web**: Creamos sitios web modernos y aplicaciones
3. **Marketing Digital**: Estrategias de redes sociales, SEO y publicidad online
4. **Automatización**: Implementamos soluciones de IA y automatización de procesos

¿En cuál de estos servicios estás interesado?`;

// El asistente ejecuta automáticamente:
const resultado = await procesarSolicitudWhatsApp(
    mensajeUsuario,
    respuestaAnterior
);

console.log(resultado);
// Resultado: "✅ ¡Perfecto! He enviado la información a tu WhatsApp (+34612345678). Deberías recibirla en unos segundos."
```

**Asistente Gemini (responde al usuario):**
> ✅ ¡Perfecto! He enviado la información a tu WhatsApp (+34612345678). Deberías recibirla en unos segundos.
>
> ¿Hay algo más en lo que pueda ayudarte sobre nuestros servicios de consultoría empresarial?

**Usuario recibe en WhatsApp:**
```
🚀 Wake Up Servicios:

¡Hola! Wake Up Servicios ofrece:

1. **Consultoría Empresarial**: Ayudamos a las empresas a optimizar sus procesos y estrategias
2. **Desarrollo Web**: Creamos sitios web modernos y aplicaciones
3. **Marketing Digital**: Estrategias de redes sociales, SEO y publicidad online
4. **Automatización**: Implementamos soluciones de IA y automatización de procesos

¿En cuál de estos servicios estás interesado?
```

---

## 📱 Escenario 2: Usuario olvida proporcionar el número

### Conversación:

**Usuario:**
> Envíame esto por WhatsApp

**Asistente Gemini:**
> ¡Claro! Para enviarte la información por WhatsApp, necesito que me proporciones tu número de teléfono con el código de país.
>
> Por ejemplo:
> - Para España: +34612345678
> - Para México: +521234567890
> - Para USA: +14151234567
>
> ¿Cuál es tu número?

**Usuario:**
> +34612345678

**Asistente Gemini (ejecuta internamente):**
```javascript
const resultado = await procesarSolicitudWhatsApp(
    "+34612345678",
    respuestaAnteriorGuardada
);
```

**Asistente Gemini:**
> ✅ ¡Enviado! Revisa tu WhatsApp en el número +34612345678

---

## 📱 Escenario 3: Múltiples formatos de número

### Conversación:

**Usuario:**
> Mándame la información al +34 612 345 678

**Asistente Gemini (detecta y normaliza):**
```javascript
// La función extraerTelefono() normaliza automáticamente:
// Input: "+34 612 345 678"
// Output: "+34612345678"

const resultado = await procesarSolicitudWhatsApp(
    "Mándame la información al +34 612 345 678",
    respuesta
);
```

**Asistente Gemini:**
> ✅ ¡Perfecto! He enviado la información a tu WhatsApp (+34612345678). Deberías recibirla en unos segundos.

---

## 📱 Escenario 4: Número inválido

### Conversación:

**Usuario:**
> Envíame esto al 612345678

**Asistente Gemini (detecta error):**
```javascript
// La función detecta que falta el código de país
const resultado = await procesarSolicitudWhatsApp(
    "Envíame esto al 612345678",
    respuesta
);
// Resultado: "❌ No pude identificar un número de teléfono válido..."
```

**Asistente Gemini:**
> ❌ No pude identificar un número de teléfono válido en tu mensaje.
>
> Por favor, proporciona tu número con el código de país. Ejemplos:
> - España: +34612345678
> - México: +521234567890
> - Estados Unidos: +14151234567

---

## 📱 Escenario 5: Conversación completa

### Conversación:

**Usuario:**
> ¿Cuánto cuesta vuestro servicio de desarrollo web?

**Asistente Gemini:**
> Nuestros servicios de desarrollo web se adaptan a las necesidades de cada proyecto. Los precios varían según:
>
> **Sitio Web Básico (Informativo)**
> - Desde 1.500€
> - Diseño responsive
> - 5-10 páginas
> - Formulario de contacto
> - SEO básico
>
> **Tienda Online (E-commerce)**
> - Desde 3.500€
> - Catálogo de productos
> - Carrito de compras
> - Pasarelas de pago
> - Panel de administración
>
> **Aplicación Web Personalizada**
> - Desde 5.000€
> - Desarrollo a medida
> - Integraciones específicas
> - Panel administrativo avanzado
>
> ¿Qué tipo de proyecto tienes en mente?

**Usuario:**
> La tienda online me interesa. Envíame los detalles por WhatsApp: +34612345678

**Asistente Gemini:**
> ¡Excelente elección! Te voy a enviar toda la información sobre nuestro servicio de tiendas online a tu WhatsApp.
>
> ✅ ¡Perfecto! He enviado la información a tu WhatsApp (+34612345678). Deberías recibirla en unos segundos.
>
> Además, me gustaría comentarte que podemos agendar una videollamada para discutir tu proyecto específico. ¿Te gustaría que te enviara las opciones de horarios disponibles?

---

## 🔧 Código Interno del Asistente

### Configuración del Prompt del Sistema:

```markdown
Eres el asistente virtual de Wake Up Servicios, especializado en consultoría empresarial,
desarrollo web, marketing digital y automatización.

## Funcionalidad de WhatsApp

Tienes la capacidad de enviar información por WhatsApp a los usuarios.

### Detección de solicitudes:
Cuando un usuario use frases como:
- "envíame esto por WhatsApp"
- "mándame la información a WhatsApp"
- "comparte por WhatsApp"
- "enviar a mi WhatsApp"

### Acción a tomar:
1. Extrae el número de teléfono del mensaje
2. Si no hay número, pídelo amablemente
3. Ejecuta: procesarSolicitudWhatsApp(mensajeUsuario, tuRespuestaAnterior)
4. Confirma el envío al usuario

### Formato de números:
- DEBE incluir código de país con +
- Ejemplo válido: +34612345678
- Ejemplo inválido: 612345678

### Código a ejecutar:
```javascript
import { procesarSolicitudWhatsApp } from './enviar-whatsapp.js';

const resultado = await procesarSolicitudWhatsApp(
    mensajeDelUsuario,
    tuUltimaRespuesta
);

// Informa al usuario del resultado
console.log(resultado);
```

### Manejo de errores:
- Si el número es inválido, explica el formato correcto
- Si falla el envío, explica al usuario cómo activar el sandbox de Twilio
- Siempre sé amable y útil
```

---

## 📊 Flujo de Ejecución

```
┌─────────────────────────────────────┐
│ Usuario escribe mensaje             │
│ "Envíame esto por WhatsApp al..."   │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Gemini detecta palabras clave       │
│ - "WhatsApp"                        │
│ - Número de teléfono                │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Gemini ejecuta código               │
│ procesarSolicitudWhatsApp()         │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Función extrae número               │
│ extraerTelefono(mensaje)            │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Función valida número               │
│ ¿Empieza con +?                     │
└─────────────┬──────────┬────────────┘
              │          │
             Sí         No
              │          │
              ▼          ▼
      ┌──────────┐  ┌──────────┐
      │ Enviar   │  │ Error    │
      │ WhatsApp │  │ devuelto │
      └─────┬────┘  └─────┬────┘
            │             │
            ▼             │
      ┌──────────┐        │
      │ Backend  │        │
      │ o Twilio │        │
      └─────┬────┘        │
            │             │
            ▼             ▼
      ┌──────────────────────┐
      │ Respuesta al usuario │
      └──────────────────────┘
```

---

## 🎨 Personalización de Mensajes

Puedes personalizar los mensajes que se envían editando `enviar-whatsapp.js`:

### Mensaje Actual:
```javascript
Body: `🚀 Wake Up Servicios:\n\n${message}`
```

### Opciones de Personalización:

**Opción 1: Más formal**
```javascript
Body: `Estimado/a cliente,\n\nGracias por tu interés en Wake Up Servicios.\n\n${message}\n\nSaludos cordiales,\nEl equipo de Wake Up`
```

**Opción 2: Con información de contacto**
```javascript
Body: `🚀 Wake Up Servicios:\n\n${message}\n\n---\n📧 info@wakeup.com\n🌐 www.wakeup.com\n📱 +34 600 000 000`
```

**Opción 3: Con CTA**
```javascript
Body: `${message}\n\n¿Listo para empezar?\n👉 Responde a este mensaje o visita: www.wakeup.com`
```

---

## ✅ Checklist de Implementación

Para que tu asistente funcione exactamente como en estos ejemplos:

- [ ] Repositorio vinculado en Gemini
- [ ] Variables de entorno configuradas (TWILIO_*)
- [ ] Prompt del sistema actualizado con instrucciones de WhatsApp
- [ ] Function calling configurado (opcional pero recomendado)
- [ ] Probado con tu número de teléfono
- [ ] Sandbox de Twilio activado
- [ ] Mensajes personalizados según tu marca

---

## 🚀 Próximos Pasos

Una vez que todo funcione:

1. **Prueba diferentes escenarios** con usuarios reales
2. **Personaliza los mensajes** según tu marca
3. **Añade analytics** para trackear envíos
4. **Implementa plantillas** para diferentes tipos de respuestas
5. **Despliega el backend** en producción (Railway, Render, etc.)

---

¿Listo para implementar? Lee la guía completa en [INICIO-RAPIDO.md](INICIO-RAPIDO.md) 🚀
