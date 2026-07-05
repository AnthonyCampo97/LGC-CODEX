/* =========================================================
   ENCUESTAS.JS — Cuadrícula de formularios Google Forms
   ---------------------------------------------------------
   Requiere que la página haya cargado antes:
   - Un archivo "encuestas-XXXX.js" que define ENCUESTAS_SECCION
   ========================================================= */

(function () {
  const grid = document.getElementById("encuestaGrid");
  const section = document.getElementById("encuestaSection");

  if (!grid || typeof ENCUESTAS_SECCION === "undefined") return;

  if (!ENCUESTAS_SECCION.length) {
    if (section) section.hidden = true;
    return;
  }

  function crearTarjeta(encuesta) {
    const card = document.createElement("a");
    card.className = "encuesta-card";
    card.href = encuesta.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", "Abrir encuesta: " + encuesta.title);

    card.innerHTML = `
      <span class="encuesta-card__icon-wrap">
        <span class="encuesta-card__icon">📋</span>
      </span>
      <span class="encuesta-card__body">
        <span class="encuesta-card__title">${encuesta.title}</span>
        ${encuesta.description ? `<span class="encuesta-card__desc">${encuesta.description}</span>` : ""}
        <span class="encuesta-card__cta">
          <span class="encuesta-card__cta-label">${encuesta.etiqueta || "Abrir formulario"}</span>
          <span class="encuesta-card__cta-arrow">↗</span>
        </span>
      </span>
    `;

    return card;
  }

  ENCUESTAS_SECCION.forEach(e => grid.appendChild(crearTarjeta(e)));
})();
