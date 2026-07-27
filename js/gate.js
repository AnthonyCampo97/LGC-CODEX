// ============================================================
// 🔒 LÓGICA DEL GATE DE ACCESO — MÓDULO SISTEMAS
// Archivo de LÓGICA (no editar). Para cambiar la clave, edita
// gate-config.js. Requiere que gate-config.js se cargue ANTES
// que este script en el HTML.
// ============================================================

(function () {
  const overlay   = document.getElementById('gateOverlay');
  const content   = document.getElementById('gatedContent');
  const form      = document.getElementById('gateForm');
  const input     = document.getElementById('gatePassword');
  const errorMsg  = document.getElementById('gateError');

  const STORAGE_KEY = 'sistemas_access';

  async function hashText(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  function unlock() {
    overlay.style.display = 'none';
    content.style.display = 'block';
  }

  // ¿Ya venía autenticado en esta misma sesión de navegador?
  if (GATE_CONFIG.recordarSesion && sessionStorage.getItem(STORAGE_KEY) === 'granted') {
    unlock();
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    const hashed = await hashText(value);

    if (hashed === GATE_CONFIG.hash) {
      if (GATE_CONFIG.recordarSesion) {
        sessionStorage.setItem(STORAGE_KEY, 'granted');
      }
      errorMsg.style.display = 'none';
      unlock();
    } else {
      errorMsg.style.display = 'block';
      input.value = '';
      input.focus();
      overlay.classList.add('gate-shake');
      setTimeout(() => overlay.classList.remove('gate-shake'), 400);
    }
  });
})();
