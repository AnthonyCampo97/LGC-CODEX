// ============================================================
// ⚙️ CONFIGURACIÓN DEL ACCESO — MÓDULO SISTEMAS
// Este es un archivo de DATOS/CONFIG (sí se edita), igual que
// popup-config.js. La lógica de validación vive en gate.js
// (ese NO se toca).
// ============================================================

const GATE_CONFIG = {

  // Hash SHA-256 de la clave actual: "50p0r73"
  hash: "f2023ca56d6873ca026ae72b2cb3f0ae6af4151185c3fe073184eb468aa688f2",

  // true  = una vez ingresada la clave correcta, no la vuelve a pedir
  //         mientras esa pestaña del navegador siga abierta (sessionStorage)
  // false = la pide siempre que se entra o se recarga la página
  recordarSesion: true
};

// ------------------------------------------------------------
// 🔑 CÓMO CAMBIAR LA CLAVE (pasos para Tony):
// 1. Abre CUALQUIER página del sitio en el navegador.
// 2. Presiona F12 para abrir la consola.
// 3. Pega esta línea reemplazando TU_CLAVE_NUEVA y presiona Enter:
//
//    crypto.subtle.digest('SHA-256', new TextEncoder().encode('TU_CLAVE_NUEVA'))
//      .then(buf => console.log(Array.from(new Uint8Array(buf))
//      .map(b => b.toString(16).padStart(2,'0')).join('')))
//
// 4. La consola imprime un texto largo (el hash). Cópialo completo.
// 5. Pégalo arriba, reemplazando el valor de "hash".
// 6. Guarda, git add / commit / push como siempre.
// ------------------------------------------------------------
