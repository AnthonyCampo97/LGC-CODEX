/* =========================================================
   POPUP.JS — Modal de bienvenida / comunicados
   No edites este archivo. Edita popup-config.js.
   ========================================================= */

(function () {
  if (typeof POPUP_CONFIG === "undefined" || !POPUP_CONFIG.activo) return;

  const cfg = POPUP_CONFIG;
  let cuentaAtras = null;

  /* ---------- Construir HTML ---------- */
  const overlay = document.createElement("div");
  overlay.id = "popupOverlay";
  overlay.className = "popup-overlay";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", cfg.titulo || "Comunicado");

  let contenidoHtml = "";

  if (cfg.tipo === "video") {
    const autoplay = cfg.autoplay ? "1" : "0";
    const src = `https://www.youtube.com/embed/${cfg.youtubeId}?autoplay=${autoplay}&rel=0&modestbranding=1`;
    contenidoHtml = `
      <div class="popup__media popup__media--video">
        <iframe src="${src}" title="Video comunicado" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>
      </div>`;
  } else {
    const linkAbre = cfg.urlDestino ? `<a class="popup__img-link" href="${cfg.urlDestino}" ${cfg.urlNuevaPestana ? 'target="_blank" rel="noopener"' : ""}>` : "";
    const linkCierra = cfg.urlDestino ? `</a>` : "";
    contenidoHtml = `
      <div class="popup__media popup__media--imagen">
        ${linkAbre}
          <img src="${cfg.imagen}" alt="${cfg.titulo || "Comunicado"}" draggable="false">
        ${linkCierra}
      </div>`;
  }

  const contadorHtml = (cfg.tipo === "imagen" && cfg.cierreAuto)
    ? `<div class="popup__contador" id="popupContador">
         <span class="popup__contador-barra"><span id="popupBarra"></span></span>
         <span class="popup__contador-texto">Cerrando en <strong id="popupSeg">${cfg.cierreSegundos}</strong>s</span>
       </div>`
    : "";

  const btnDestino = (cfg.tipo === "imagen" && cfg.urlDestino)
    ? `<a class="popup__btn-destino" href="${cfg.urlDestino}" ${cfg.urlNuevaPestana ? 'target="_blank" rel="noopener"' : ""}>${cfg.urlDestinoLabel || "Ver más"} ↗</a>`
    : "";

  overlay.innerHTML = `
    <div class="popup-overlay__backdrop" id="popupBackdrop"></div>
    <div class="popup">
      <div class="popup__header">
        <div class="popup__header-text">
          <span class="popup__tag">📢 Comunicado</span>
          <h2 class="popup__titulo">${cfg.titulo || ""}</h2>
          ${cfg.subtitulo ? `<p class="popup__subtitulo">${cfg.subtitulo}</p>` : ""}
        </div>
        <button class="popup__close" id="popupClose" aria-label="Cerrar">&times;</button>
      </div>
      ${contenidoHtml}
      <div class="popup__footer">
        ${btnDestino}
        ${contadorHtml}
        <button class="popup__btn-cerrar" id="popupBtnCerrar">Cerrar</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");

  /* ---------- Animación de entrada ---------- */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("popup-overlay--open"));
  });

  /* ---------- Cierre ---------- */
  function cerrar() {
    clearInterval(cuentaAtras);
    overlay.classList.remove("popup-overlay--open");
    overlay.classList.add("popup-overlay--closing");
    // Detener video al cerrar
    const iframe = overlay.querySelector("iframe");
    if (iframe) iframe.src = "";
    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("no-scroll");
    }, 380);
  }

  document.getElementById("popupClose").addEventListener("click", cerrar);
  document.getElementById("popupBtnCerrar").addEventListener("click", cerrar);
  document.getElementById("popupBackdrop").addEventListener("click", cerrar);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
  });

  /* ---------- Contador regresivo (solo imagen) ---------- */
  if (cfg.tipo === "imagen" && cfg.cierreAuto) {
    const segEl = document.getElementById("popupSeg");
    const barraEl = document.getElementById("popupBarra");
    const total = Math.max(cfg.cierreSegundos || 10, 5);
    let restante = total;

    barraEl.style.transition = `width ${total}s linear`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { barraEl.style.width = "0%"; });
    });

    cuentaAtras = setInterval(() => {
      restante--;
      if (segEl) segEl.textContent = restante;
      if (restante <= 0) cerrar();
    }, 1000);
  }
})();
