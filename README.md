# 🚀 Wake Up Servicios - Asistente Virtual con WhatsApp

Repositorio de Wake Up Servicios para integración de asistente virtual Gemini AI con envío de respuestas por WhatsApp.

## 📋 Descripción

Este proyecto integra un asistente virtual potenciado por **Gemini AI** de Google con la capacidad de enviar las respuestas directamente al **WhatsApp** del usuario mediante **Twilio API**.

## ✨ Características

- 💬 Chat interactivo con Gemini AI
- 📱 Envío automático de respuestas por WhatsApp
- 🤖 **Código autoejecutable** para integrar en tu asistente Gemini
- 🎨 Interfaz moderna y responsiva
- 🔒 Configuración segura de credenciales
- ⚡ Servidor Express para manejo de API
- 🔌 API REST para integración con cualquier sistema

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js + Express
- **IA**: Google Gemini API
- **WhatsApp**: Twilio API
- **Gestión de variables**: dotenv

## 🎯 Modos de Uso

Este proyecto ofrece **3 formas de integración**:

### 1️⃣ **Integración Directa en Asistente Gemini** (Recomendado)
Si ya tienes un asistente Gemini con capacidad de ejecutar código:
- Usa el archivo [enviar-whatsapp.js](enviar-whatsapp.js)
- Lee la guía completa: [INTEGRACION-GEMINI.md](INTEGRACION-GEMINI.md)
- Los usuarios solo dirán: "Envíame esto por WhatsApp al +34612345678"

### 2️⃣ **Interfaz Web Completa**
Aplicación web lista para usar con chat de Gemini:
- Sigue las instrucciones de instalación abajo
- Abre `http://localhost:3000`

### 3️⃣ **API REST**
Usa solo el backend para integrar con tu sistema:
- Endpoint: `POST /api/send-whatsapp`
- Ver ejemplos en [GUIA-INTEGRACION.md](GUIA-INTEGRACION.md)

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/dorron4/wake-up.git
cd wake-up
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
TWILIO_ACCOUNT_SID=tu_account_sid_aqui
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_WHATSAPP_NUMBER=+14155238886
PORT=3000
```

### 4. Configurar Gemini API

Edita el archivo `public/index.html` y reemplaza `TU_API_KEY_DE_GEMINI` con tu API key de Gemini:

```javascript
const GEMINI_API_KEY = 'tu_api_key_de_gemini_aqui';
```

## 🔑 Obtener Credenciales

### Twilio (WhatsApp)

1. Crea una cuenta en [Twilio](https://www.twilio.com/try-twilio)
2. Ve a la [Consola de Twilio](https://console.twilio.com)
3. Copia tu `Account SID` y `Auth Token`
4. Configura el [Sandbox de WhatsApp de Twilio](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn)
5. El número de WhatsApp de prueba es: `+14155238886`

**Importante**: Para activar WhatsApp con tu número:
- Envía un mensaje al número de Twilio con el código que te proporcionen
- Formato: `join [tu-codigo-sandbox]`

### Google Gemini API

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea un nuevo proyecto o selecciona uno existente
3. Genera una API Key
4. Copia la API Key y pégala en `public/index.html`

## 🚀 Uso

### Iniciar el servidor

```bash
npm start
```

O en modo desarrollo con recarga automática:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

### Usar la aplicación

1. Abre tu navegador en `http://localhost:3000`
2. Escribe tu pregunta en el chat
3. El asistente Gemini te responderá
4. Ingresa tu número de WhatsApp (formato: +34612345678)
5. Haz clic en "Enviar a WhatsApp"
6. Recibirás la respuesta en tu WhatsApp

## 📁 Estructura del Proyecto

```
wake-up/
├── public/
│   └── index.html                  # Interfaz web completa
├── server.js                       # Servidor Express con API
├── enviar-whatsapp.js             # 🤖 Código autoejecutable para Gemini
├── test-enviar-whatsapp.js        # Script de pruebas
├── codigo-para-gemini-agent.js    # Ejemplos de integración
├── ejemplo-integracion.html       # Ejemplo de uso en web
├── package.json                    # Dependencias del proyecto
├── .env.example                    # Ejemplo de variables de entorno
├── .gitignore                      # Archivos ignorados por Git
├── README.md                       # Documentación principal
├── INTEGRACION-GEMINI.md          # 📘 Guía para integrar en Gemini
└── GUIA-INTEGRACION.md            # 📗 Guía completa de integración
```

### Archivos Clave

- **[enviar-whatsapp.js](enviar-whatsapp.js)**: Código principal para integrar en tu asistente Gemini
- **[INTEGRACION-GEMINI.md](INTEGRACION-GEMINI.md)**: Guía paso a paso para integración con Gemini
- **[test-enviar-whatsapp.js](test-enviar-whatsapp.js)**: Script para probar la funcionalidad
- **[server.js](server.js)**: Servidor backend opcional

## 🔧 API Endpoints

### POST /api/send-whatsapp

Envía un mensaje por WhatsApp.

**Request Body:**
```json
{
  "phoneNumber": "+34612345678",
  "message": "Tu mensaje aquí"
}
```

**Response:**
```json
{
  "success": true,
  "messageSid": "SM...",
  "message": "Mensaje enviado correctamente a WhatsApp"
}
```

### GET /api/health

Verifica el estado del servidor.

**Response:**
```json
{
  "status": "ok",
  "service": "Wake Up - WhatsApp Integration",
  "timestamp": "2025-12-04T..."
}
```

## 🌐 Despliegue en Producción

### Opciones recomendadas:

1. **Railway**: Despliegue automático desde GitHub
2. **Render**: Plan gratuito disponible
3. **Heroku**: Fácil integración
4. **DigitalOcean**: Más control del servidor

### Pasos generales:

1. Sube tu código a GitHub
2. Conecta tu repositorio con el servicio de hosting
3. Configura las variables de entorno en el panel del hosting
4. El servicio desplegará automáticamente

## ⚠️ Notas Importantes

### Límites de Twilio (Cuenta de Prueba)

- El sandbox de WhatsApp solo permite enviar mensajes a números verificados
- Cada número debe unirse al sandbox enviando el mensaje de activación
- Para producción, necesitarás una cuenta de pago y aprobar tu número con WhatsApp

### Seguridad

- **NUNCA** subas tu archivo `.env` a GitHub
- Las API keys son secretas y personales
- Usa variables de entorno para configuración sensible

### Costos

- **Gemini API**: Tiene un tier gratuito generoso
- **Twilio**:
  - Sandbox: Gratuito para pruebas
  - Producción: Pago por mensaje (~$0.005 por mensaje)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte y consultas:
- Abre un issue en este repositorio
- Contacta a Wake Up Servicios

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Wake Up Servicios**

---

¡Hecho con ❤️ para Wake Up Servicios!
