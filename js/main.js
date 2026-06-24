/* =========================================================
   PORTAL DE CAPACITACIÓN — main.js
   ========================================================= */

const STORAGE_KEY = "capacitacion_progreso";

const grid = document.getElementById("videoGrid");
const gridEmpty = document.getElementById("gridEmpty");
const chipnav = document.getElementById("chipnav");
const modal = document.getElementById("videoModal");
const modalIframe = document.getElementById("modalIframe");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCategory = document.getElementById("modalCategory");
const modalMark = document.getElementById("modalMark");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const fabResume = document.getElementById("fabResume");
const progressPct = document.getElementById("progressPct");
const ringFg = document.getElementById("ringFg");
const menuBtn = document.getElementById("menuBtn");

const CATEGORY_LABELS = {
  bienvenida: "Bienvenida",
  seguridad: "Seguridad",
  procesos: "Procesos",
  herramientas: "Herramientas"
};

let currentFilter = "todos";
let activeVideoId = null;

/* ---------- Progreso (localStorage) ---------- */
function getProgreso() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function setVisto(id, visto) {
  const progreso = getProgreso();
  progreso[id] = visto;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
  actualizarProgreso();
}

function estaVisto(id) {
  return !!getProgreso()[id];
}

function actualizarProgreso() {
  const progreso = getProgreso();
  const total = VIDEOS.length;
  const vistos = VIDEOS.filter(v => progreso[v.id]).length;
  const pct = total ? Math.round((vistos / total) * 100) : 0;

  progressPct.textContent = pct + "%";

  const circumference = 2 * Math.PI * 52;
  ringFg.style.strokeDasharray = circumference;
  ringFg.style.strokeDashoffset = circumference - (circumference * pct) / 100;

  // Botón "continuar viendo": primer video no visto
  const siguiente = VIDEOS.find(v => !progreso[v.id]);
  if (siguiente && pct > 0 && pct < 100) {
    fabResume.hidden = false;
    fabResume.onclick = () => abrirModal(siguiente.id);
  } else {
    fabResume.hidden = true;
  }
}

/* ---------- Render de tarjetas ---------- */
function crearTarjeta(video) {
  const visto = estaVisto(video.id);
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = video.id;
  card.innerHTML = `
    <button class="card__thumb-btn" aria-label="Reproducir: ${video.title}">
      <img class="card__thumb" src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="" loading="lazy">
      <span class="card__play">▶</span>
      <span class="card__duration">${video.duration}</span>
      ${visto ? '<span class="card__seal" title="Visto">✓</span>' : ""}
    </button>
    <div class="card__body">
      <span class="card__category card__category--${video.category}">${CATEGORY_LABELS[video.category]}</span>
      <h3 class="card__title">${video.title}</h3>
      <p class="card__desc">${video.description}</p>
    </div>
  `;
  card.querySelector(".card__thumb-btn").addEventListener("click", () => abrirModal(video.id));
  return card;
}

function renderGrid() {
  grid.innerHTML = "";
  const lista = VIDEOS.filter(v => currentFilter === "todos" || v.category === currentFilter);

  if (lista.length === 0) {
    gridEmpty.hidden = false;
    return;
  }
  gridEmpty.hidden = true;

  lista.forEach(video => grid.appendChild(crearTarjeta(video)));
}

/* ---------- Filtros (chips) ---------- */
chipnav.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;

  chipnav.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
  btn.classList.add("chip--active");
  currentFilter = btn.dataset.category;
  renderGrid();
});

/* ---------- Modal de reproducción ---------- */
function abrirModal(id) {
  const video = VIDEOS.find(v => v.id === id);
  if (!video) return;

  activeVideoId = id;
  modalIframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
  modalTitle.textContent = video.title;
  modalDesc.textContent = video.description;
  modalCategory.textContent = CATEGORY_LABELS[video.category];
  modalCategory.className = `modal__category card__category--${video.category}`;
  modalMark.textContent = estaVisto(id) ? "Marcado como visto ✓" : "Marcar como visto";
  modalMark.classList.toggle("modal__mark--done", estaVisto(id));

  modal.classList.add("modal--open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function cerrarModal() {
  modal.classList.remove("modal--open");
  modal.setAttribute("aria-hidden", "true");
  modalIframe.src = "";
  document.body.classList.remove("no-scroll");
  renderGrid();
}

modalClose.addEventListener("click", cerrarModal);
modalBackdrop.addEventListener("click", cerrarModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("modal--open")) cerrarModal();
});

modalMark.addEventListener("click", () => {
  if (!activeVideoId) return;
  const nuevoEstado = !estaVisto(activeVideoId);
  setVisto(activeVideoId, nuevoEstado);
  modalMark.textContent = nuevoEstado ? "Marcado como visto ✓" : "Marcar como visto";
  modalMark.classList.toggle("modal__mark--done", nuevoEstado);
});

/* ---------- Menú móvil (chips colapsables en pantallas muy pequeñas) ---------- */
menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  chipnav.classList.toggle("chipnav--open");
});

/* ---------- Init ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
renderGrid();
actualizarProgreso();
