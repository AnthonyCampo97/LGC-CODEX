/* =========================================================
   BANNER.JS — Carousel dinámico SAGRILAFT
   ---------------------------------------------------------
   Requiere que la página haya cargado: slides-sagrilaft.js
   ========================================================= */

(function () {
  const track = document.getElementById("bannerTrack");
  const dotsWrap = document.getElementById("bannerDots");
  const btnPrev = document.getElementById("bannerPrev");
  const btnNext = document.getElementById("bannerNext");
  const btnPause = document.getElementById("bannerPause");
  const banner = document.getElementById("sagrilaftBanner");

  if (!track || typeof BANNER_SLIDES === "undefined" || !BANNER_SLIDES.length) return;

  let actual = 0;
  let total = BANNER_SLIDES.length;
  let intervalo = null;
  let pausado = false;
  let touchStartX = 0;

  /* ---------- Construir slides ---------- */
  BANNER_SLIDES.forEach((slide, i) => {
    const s = document.createElement("div");
    s.className = "banner__slide";
    s.setAttribute("aria-hidden", i !== 0 ? "true" : "false");
    s.style.backgroundImage = `linear-gradient(
      100deg,
      rgba(6,13,56,0.92) 0%,
      rgba(6,13,56,0.75) 45%,
      rgba(6,13,56,0.35) 100%
    ), url('${slide.imagen}')`;

    const enlace = slide.url
      ? `<a class="banner__cta" href="${slide.url}" ${slide.urlNuevaPestana ? 'target="_blank" rel="noopener"' : ""} style="background:${slide.color};color:${slide.color === '#FFD400' ? '#060D38' : '#ffffff'}">
           ${slide.urlLabel} <span>↗</span>
         </a>`
      : "";

    s.innerHTML = `
      <div class="banner__content">
        <span class="banner__acento" style="background:${slide.color}"></span>
        <h2 class="banner__titulo">${slide.titulo}</h2>
        ${slide.subtitulo ? `<p class="banner__subtitulo">${slide.subtitulo}</p>` : ""}
        ${enlace}
      </div>
    `;
    track.appendChild(s);
  });

  /* ---------- Construir dots ---------- */
  BANNER_SLIDES.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "banner__dot" + (i === 0 ? " banner__dot--active" : "");
    dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
    dot.addEventListener("click", () => irA(i));
    dotsWrap.appendChild(dot);
  });

  /* ---------- Navegación ---------- */
  function irA(idx) {
    const slides = track.querySelectorAll(".banner__slide");
    const dots = dotsWrap.querySelectorAll(".banner__dot");

    slides[actual].classList.remove("banner__slide--active");
    slides[actual].setAttribute("aria-hidden", "true");
    dots[actual].classList.remove("banner__dot--active");

    actual = (idx + total) % total;

    slides[actual].classList.add("banner__slide--active");
    slides[actual].setAttribute("aria-hidden", "false");
    dots[actual].classList.add("banner__dot--active");
  }

  function siguiente() { irA(actual + 1); }
  function anterior() { irA(actual - 1); }

  btnNext.addEventListener("click", () => { siguiente(); reiniciarTimer(); });
  btnPrev.addEventListener("click", () => { anterior(); reiniciarTimer(); });

  /* ---------- Auto-play ---------- */
  function iniciarTimer() {
    intervalo = setInterval(siguiente, 7000);
  }
  function detenerTimer() { clearInterval(intervalo); }
  function reiniciarTimer() { detenerTimer(); if (!pausado) iniciarTimer(); }

  btnPause.addEventListener("click", () => {
    pausado = !pausado;
    btnPause.textContent = pausado ? "▶ Reproducir" : "⏸ Detener";
    pausado ? detenerTimer() : iniciarTimer();
  });

  banner.addEventListener("mouseenter", detenerTimer);
  banner.addEventListener("mouseleave", () => { if (!pausado) iniciarTimer(); });

  /* ---------- Touch / swipe móvil ---------- */
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? siguiente() : anterior();
      reiniciarTimer();
    }
  }, { passive: true });

  /* ---------- Activar primer slide e iniciar ---------- */
  track.querySelectorAll(".banner__slide")[0].classList.add("banner__slide--active");
  iniciarTimer();
})();
