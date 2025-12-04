/**
 * SCRIPT DE PRUEBA - Envío por WhatsApp
 * Wake Up Servicios
 *
 * Usa este script para probar la funcionalidad antes de integrarlo en Gemini
 */

// Importar la función principal
const { procesarSolicitudWhatsApp, enviarWhatsApp, extraerTelefono } = require('./enviar-whatsapp.js');

// ============================================
// TESTS
// ============================================

async function ejecutarPruebas() {
    console.log('🧪 Iniciando pruebas del sistema de WhatsApp...\n');

    // Test 1: Extraer número de teléfono
    console.log('📝 Test 1: Extraer número de teléfono');
    const tests = [
        "Envíame esto al +34612345678",
        "Mi número es +34 612 345 678",
        "Llámame al 0034612345678",
        "+1234567890123"
    ];

    tests.forEach(test => {
        const numero = extraerTelefono(test);
        console.log(`   "${test}" → ${numero || '❌ No encontrado'}`);
    });

    console.log('\n---\n');

    // Test 2: Validación de entrada
    console.log('📝 Test 2: Validación de entrada');

    const testInvalido1 = await enviarWhatsApp('', 'mensaje');
    console.log(`   Teléfono vacío: ${testInvalido1.success ? '✅' : '❌'} - ${testInvalido1.error || 'OK'}`);

    const testInvalido2 = await enviarWhatsApp('+34612345678', '');
    console.log(`   Mensaje vacío: ${testInvalido2.success ? '✅' : '❌'} - ${testInvalido2.error || 'OK'}`);

    const testInvalido3 = await enviarWhatsApp('612345678', 'mensaje');
    console.log(`   Sin código país: ${testInvalido3.success ? '✅' : '❌'} - ${testInvalido3.error || 'OK'}`);

    console.log('\n---\n');

    // Test 3: Envío real (solo si las credenciales están configuradas)
    console.log('📝 Test 3: Envío real por WhatsApp');
    console.log('   ⚠️  Para ejecutar este test, necesitas:');
    console.log('   1. Configurar las variables de entorno en .env');
    console.log('   2. Tener el servidor backend activo O credenciales de Twilio');
    console.log('   3. Haber activado el sandbox de Twilio en tu número\n');

    // Descomenta estas líneas para probar el envío real
    /*
    const NUMERO_DE_PRUEBA = '+34612345678'; // ⚠️ CAMBIA ESTO POR TU NÚMERO
    const mensajePrueba = 'Este es un mensaje de prueba del sistema Wake Up Servicios. Si recibes esto, ¡todo funciona correctamente! 🚀';

    console.log(`   📱 Enviando mensaje de prueba a ${NUMERO_DE_PRUEBA}...`);

    const resultadoReal = await enviarWhatsApp(NUMERO_DE_PRUEBA, mensajePrueba);

    if (resultadoReal.success) {
        console.log(`   ✅ ¡Mensaje enviado! SID: ${resultadoReal.messageSid}`);
        console.log(`   Revisa tu WhatsApp en ${NUMERO_DE_PRUEBA}`);
    } else {
        console.log(`   ❌ Error: ${resultadoReal.error}`);
    }
    */

    console.log('   ℹ️  Descomenta el código en test-enviar-whatsapp.js para probar envío real');

    console.log('\n---\n');

    // Test 4: Función completa de procesamiento
    console.log('📝 Test 4: Procesamiento completo');

    const mensajeUsuario = "Hola, envíame la información por WhatsApp al +34612345678";
    const respuestaAsistente = "Aquí está la información sobre nuestros servicios de Wake Up:\n\n1. Consultoría empresarial\n2. Desarrollo web\n3. Marketing digital\n\n¿En cuál estás interesado?";

    console.log(`   Usuario: "${mensajeUsuario}"`);
    console.log(`   Respuesta a enviar: "${respuestaAsistente.substring(0, 50)}..."`);
    console.log(`\n   Procesando...\n`);

    // Descomenta para probar el procesamiento completo
    /*
    const confirmacion = await procesarSolicitudWhatsApp(mensajeUsuario, respuestaAsistente);
    console.log(`   Resultado: ${confirmacion}`);
    */

    console.log('   ℹ️  Descomenta el código para ejecutar el procesamiento completo');

    console.log('\n---\n');
    console.log('✅ Pruebas completadas!\n');
}

// ============================================
// EJEMPLOS DE USO
// ============================================

async function mostrarEjemplos() {
    console.log('📚 EJEMPLOS DE USO\n');

    console.log('Ejemplo 1: Envío simple');
    console.log('```javascript');
    console.log('const resultado = await enviarWhatsApp(');
    console.log('    "+34612345678",');
    console.log('    "Hola, este es un mensaje de prueba"');
    console.log(');');
    console.log('console.log(resultado);');
    console.log('```\n');

    console.log('Ejemplo 2: Procesar solicitud del usuario');
    console.log('```javascript');
    console.log('const mensajeUsuario = "Envíame esto al +34612345678";');
    console.log('const respuesta = "Tu información aquí...";');
    console.log('');
    console.log('const confirmacion = await procesarSolicitudWhatsApp(');
    console.log('    mensajeUsuario,');
    console.log('    respuesta');
    console.log(');');
    console.log('```\n');

    console.log('Ejemplo 3: Integración con Gemini');
    console.log('```javascript');
    console.log('// En tu asistente Gemini:');
    console.log('import { procesarSolicitudWhatsApp } from "./enviar-whatsapp.js";');
    console.log('');
    console.log('// Cuando el usuario pida WhatsApp:');
    console.log('const resultado = await procesarSolicitudWhatsApp(');
    console.log('    userInput,        // Input del usuario');
    console.log('    assistantReply    // Tu respuesta generada');
    console.log(');');
    console.log('```\n');
}

// ============================================
// MENÚ INTERACTIVO
// ============================================

function mostrarMenu() {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║   WAKE UP SERVICIOS - WhatsApp Testing    ║');
    console.log('╚════════════════════════════════════════════╝\n');
    console.log('Opciones:');
    console.log('  1. Ejecutar pruebas de validación');
    console.log('  2. Ver ejemplos de uso');
    console.log('  3. Probar envío real (requiere configuración)');
    console.log('  4. Verificar configuración\n');
}

async function verificarConfiguracion() {
    console.log('🔍 Verificando configuración...\n');

    // Verificar variables de entorno
    const requiredVars = [
        'TWILIO_ACCOUNT_SID',
        'TWILIO_AUTH_TOKEN',
        'TWILIO_WHATSAPP_NUMBER'
    ];

    console.log('Variables de entorno:');
    requiredVars.forEach(varName => {
        const value = process.env[varName];
        const status = value && !value.includes('xxx') ? '✅' : '❌';
        const display = value ? (value.substring(0, 10) + '...') : 'No configurada';
        console.log(`  ${status} ${varName}: ${display}`);
    });

    console.log('\n📦 Dependencias:');
    try {
        require('dotenv');
        console.log('  ✅ dotenv');
    } catch (e) {
        console.log('  ❌ dotenv - Ejecuta: npm install dotenv');
    }

    console.log('\n💡 Consejos:');
    console.log('  - Copia .env.example a .env');
    console.log('  - Añade tus credenciales de Twilio');
    console.log('  - Ejecuta: npm install');
}

// ============================================
// EJECUTAR
// ============================================

async function main() {
    // Cargar variables de entorno
    require('dotenv').config();

    const args = process.argv.slice(2);

    if (args.length === 0) {
        mostrarMenu();
        console.log('Uso: node test-enviar-whatsapp.js [opcion]');
        console.log('Ejemplo: node test-enviar-whatsapp.js 1\n');
        return;
    }

    const opcion = args[0];

    switch (opcion) {
        case '1':
            await ejecutarPruebas();
            break;
        case '2':
            await mostrarEjemplos();
            break;
        case '3':
            console.log('⚠️  Edita el archivo test-enviar-whatsapp.js');
            console.log('   Descomenta la sección "Test 3" y añade tu número');
            console.log('   Luego ejecuta: node test-enviar-whatsapp.js 1\n');
            break;
        case '4':
            await verificarConfiguracion();
            break;
        default:
            console.log('❌ Opción inválida\n');
            mostrarMenu();
    }
}

// Solo ejecutar si se llama directamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    ejecutarPruebas,
    mostrarEjemplos,
    verificarConfiguracion
};
