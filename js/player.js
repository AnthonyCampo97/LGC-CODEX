/* =========================================================
   PLAYER.JS — Grid de videos + reproductor personalizado
   ---------------------------------------------------------
   Requiere que la página haya cargado antes un archivo
   "videos-XXXX.js" que define el arreglo VIDEOS_SECCION.
   ========================================================= */

(function () {
  const grid = document.getElementById("videoGrid");
  const modal = document.getElementById("playerModal");
  const modalClose = document.getElementById("playerClose");
  const modalBackdrop = document.getElementById("playerBackdrop");
  const playerWrap = document.getElementById("playerWrap");
  const iframe = document.getElementById("playerIframe");
  const modalTitle = document.getElementById("playerTitle");
  const btnPlayPause = document.getElementById("btnPlayPause");
  const btnFullscreen = document.getElementById("btnFullscreen");

  if (!grid || typeof VIDEOS_SECCION === "undefined") return;

  let isPlaying = false;

  /* ---------- Render de tarjetas ---------- */
  function crearTarjeta(video) {
    const card = document.createElement("button");
    card.className = "video-card";
    card.setAttribute("aria-label", "Reproducir: " + video.title);
    card.innerHTML = `
      <span class="video-card__thumb-wrap">
        <img class="video-card__thumb" src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="" loading="lazy">
        <span class="video-card__play">▶</span>
      </span>
      <span class="video-card__title">${video.title}</span>
      ${video.description ? `<span class="video-card__desc">${video.description}</span>` : ""}
    `;
    card.addEventListener("click", () => abrirPlayer(video));
    return card;
  }

  function renderGrid() {
    grid.innerHTML = "";
    if (!VIDEOS_SECCION.length) {
      grid.innerHTML = '<p class="video-grid__empty">Todavía no hay videos en esta sección.</p>';
      return;
    }
    VIDEOS_SECCION.forEach(v => grid.appendChild(crearTarjeta(v)));
  }

  /* ---------- Reproductor ---------- */
  function origenSeguro() {
    return window.location.origin !== "null" ? window.location.origin : "";
  }

  function abrirPlayer(video) {
    modalTitle.textContent = video.title;
    const src = `https://www.youtube.com/embed/${video.youtubeId}` +
      `?controls=0&disablekb=1&modestbranding=1&rel=0&fs=0` +
      `&enablejsapi=1&playsinline=1&iv_load_policy=3&origin=${encodeURIComponent(origenSeguro())}`;
    iframe.src = src;
    isPlaying = false;
    updatePlayIcon();

    modal.classList.add("player-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function cerrarPlayer() {
    enviarComando("stopVideo");
    iframe.src = "";
    modal.classList.remove("player-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (document.fullscreenElement) document.exitFullscreen();
  }

  function enviarComando(func) {
    if (!iframe.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: func, args: [] }), "*");
  }

  function updatePlayIcon() {
    btnPlayPause.textContent = isPlaying ? "⏸" : "▶";
    btnPlayPause.setAttribute("aria-label", isPlaying ? "Pausar" : "Reproducir");
  }

  btnPlayPause.addEventListener("click", () => {
    if (isPlaying) {
      enviarComando("pauseVideo");
    } else {
      enviarComando("playVideo");
    }
    isPlaying = !isPlaying;
    updatePlayIcon();
  });

  btnFullscreen.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (playerWrap.requestFullscreen) {
      playerWrap.requestFullscreen();
    }
  });

  modalClose.addEventListener("click", cerrarPlayer);
  modalBackdrop.addEventListener("click", cerrarPlayer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("player-modal--open")) cerrarPlayer();
  });

  renderGrid();
})();
