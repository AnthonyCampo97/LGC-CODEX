/* =========================================================
   PDF-VIEWER.JS — Cuadrícula de manuales + visor protegido
   ---------------------------------------------------------
   Requiere que la página haya cargado antes:
   - PDF.js (cdnjs) en el <head>
   - Un archivo "docs-XXXX.js" que define DOCUMENTOS_SECCION
   ========================================================= */

(function () {
  const grid = document.getElementById("docGrid");
  const docSection = document.getElementById("docSection");
  if (!grid || typeof DOCUMENTOS_SECCION === "undefined") return;

  if (typeof pdfjsLib !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }

  const modal = document.getElementById("pdfModal");
  const modalBackdrop = document.getElementById("pdfBackdrop");
  const modalClose = document.getElementById("pdfClose");
  const modalTitle = document.getElementById("pdfTitle");
  const canvas = document.getElementById("pdfCanvas");
  const ctx = canvas.getContext("2d");
  const btnPrev = document.getElementById("pdfPrev");
  const btnNext = document.getElementById("pdfNext");
  const pageInfo = document.getElementById("pdfPageInfo");
  const loadingMsg = document.getElementById("pdfLoading");

  let pdfDoc = null;
  let pageActual = 1;
  let renderEnCurso = false;

  /* ---------- Render de tarjetas de documentos ---------- */
  function crearTarjeta(doc) {
    const card = document.createElement("button");
    card.className = "video-card doc-card";
    card.setAttribute("aria-label", "Abrir manual: " + doc.title);
    card.innerHTML = `
      <span class="video-card__thumb-wrap doc-card__thumb-wrap">
        <span class="doc-card__icon">📄</span>
        <span class="doc-card__badge">PDF</span>
      </span>
      <span class="video-card__title">${doc.title}</span>
      ${doc.description ? `<span class="video-card__desc">${doc.description}</span>` : ""}
    `;
    card.addEventListener("click", () => abrirDocumento(doc));
    return card;
  }

  function renderGrid() {
    if (!DOCUMENTOS_SECCION.length) {
      if (docSection) docSection.hidden = true;
      return;
    }
    grid.innerHTML = "";
    DOCUMENTOS_SECCION.forEach(d => grid.appendChild(crearTarjeta(d)));
  }

  /* ---------- Visor protegido ---------- */
  async function abrirDocumento(doc) {
    modalTitle.textContent = doc.title;
    modal.classList.add("player-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    loadingMsg.hidden = false;
    canvas.hidden = true;
    pageInfo.textContent = "";

    try {
      pdfDoc = await pdfjsLib.getDocument(doc.file).promise;
      pageActual = 1;
      await renderPagina(pageActual);
      loadingMsg.hidden = true;
      canvas.hidden = false;
    } catch (err) {
      loadingMsg.textContent = "No se pudo cargar el documento.";
      console.error(err);
    }
  }

  async function renderPagina(numPagina) {
    if (!pdfDoc || renderEnCurso) return;
    renderEnCurso = true;

    const page = await pdfDoc.getPage(numPagina);
    const contenedor = canvas.parentElement;
    const anchoDisponible = contenedor.clientWidth;
    const viewportBase = page.getViewport({ scale: 1 });
    const escala = (anchoDisponible / viewportBase.width) * (window.devicePixelRatio || 1);
    const viewport = page.getViewport({ scale: escala });

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = anchoDisponible + "px";
    canvas.style.height = (anchoDisponible * (viewport.height / viewport.width)) + "px";

    await page.render({ canvasContext: ctx, viewport }).promise;

    pageInfo.textContent = `Página ${numPagina} de ${pdfDoc.numPages}`;
    btnPrev.disabled = numPagina <= 1;
    btnNext.disabled = numPagina >= pdfDoc.numPages;
    renderEnCurso = false;
  }

  function cerrarDocumento() {
    modal.classList.remove("player-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    pdfDoc = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  btnPrev.addEventListener("click", () => {
    if (pageActual > 1) { pageActual--; renderPagina(pageActual); }
  });
  btnNext.addEventListener("click", () => {
    if (pdfDoc && pageActual < pdfDoc.numPages) { pageActual++; renderPagina(pageActual); }
  });

  modalClose.addEventListener("click", cerrarDocumento);
  modalBackdrop.addEventListener("click", cerrarDocumento);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("player-modal--open")) cerrarDocumento();
  });

  /* ---------- Bloqueo de descarga / impresión / clic derecho ---------- */
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("contextmenu", (e) => {
    if (modal.classList.contains("player-modal--open")) e.preventDefault();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("player-modal--open")) return;
    const k = e.key.toLowerCase();
    const bloqueado = (e.ctrlKey || e.metaKey) && (k === "p" || k === "s");
    if (bloqueado) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  window.addEventListener("beforeprint", () => {
    if (modal.classList.contains("player-modal--open")) cerrarDocumento();
  });

  renderGrid();
})();
