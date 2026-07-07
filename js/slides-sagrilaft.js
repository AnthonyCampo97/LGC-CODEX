/* =========================================================
   BANNER SAGRILAFT — slides.js
   ---------------------------------------------------------
   Cada objeto es una diapositiva del banner.

   CAMPOS:
   - titulo      : título principal del slide (obligatorio)
   - subtitulo   : texto descriptivo (opcional, puede ser "")
   - imagen      : ruta a la imagen de fondo (en /img/)
                   Si no tienes imagen propia, usa una URL externa.
   - color       : color de acento del slide (hex). Ej: "#FFD400"
   - url         : enlace al hacer clic en el botón (opcional, "" para omitir)
   - urlLabel    : texto del botón de enlace (opcional)
   - urlNuevaPestana: true abre en pestaña nueva, false en la misma
   ========================================================= */

const BANNER_SLIDES = [
  {
    titulo: "¿Qué es SAGRILAFT?",
    subtitulo: "Sistema de Autocontrol y Gestión del Riesgo de Lavado de Activos, Financiación del Terrorismo y Proliferación de Armas de Destrucción Masiva. Conoce tus responsabilidades.",
    imagen: "img/compliance1.jpg",
    color: "#FFD400",
    url: "https://www.supersociedades.gov.co",
    urlLabel: "Ver más en Supersociedades",
    urlNuevaPestana: true
  },
  {
    titulo: "Señales de Alerta",
    subtitulo: "Aprende a identificar operaciones inusuales o sospechosas. Reportar a tiempo es tu responsabilidad y protege a toda la empresa.",
    imagen: "img/compliance2.jpg",
    color: "#E2231A",
    url: "https://www.supersociedades.gov.co",
    urlLabel: "Ver más en Supersociedades",
    urlNuevaPestana: true
  },
  {
    titulo: "Política de Cumplimiento",
    subtitulo: "Todos los colaboradores deben conocer y aplicar la política de prevención de lavado de activos y financiación del terrorismo de La Gran Colombia.",
    imagen: "img/compliance3.jpg",
    color: "#1F7A3F",
    url: "https://www.supersociedades.gov.co",
    urlLabel: "Ver más en Supersociedades",
    urlNuevaPestana: true
  }
];
