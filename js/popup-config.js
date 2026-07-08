/* =========================================================
   POPUP DE BIENVENIDA — popup-config.js
   ---------------------------------------------------------
   INSTRUCCIONES DE USO:

   1. Para ACTIVAR el popup:     activo: true
   2. Para DESACTIVAR el popup:  activo: false

   3. Elige el tipo de contenido cambiando el valor de "tipo":
         tipo: "video"    → muestra un video de YouTube
         tipo: "imagen"   → muestra una imagen o infografía

   *** IMPORTANTE: Solo uno de los dos bloques aplica
       según el "tipo" que elijas. ***
   ========================================================= */

const POPUP_CONFIG = {

  /* ── ¿Mostrar el popup al cargar la página? ────────────
     true  = SÍ mostrar
     false = NO mostrar (el popup queda desactivado)        */
  activo: true,

  /* ── Título y descripción que aparecen arriba ────────── */
  titulo: "📢 Comunicado Importante",
  subtitulo: "Por favor visualiza este mensaje antes de continuar.",

  /* ══════════════════════════════════════════════════════
     TIPO DE CONTENIDO
     Escribe exactamente "video" o "imagen" (con comillas)
     ══════════════════════════════════════════════════════ */
  tipo: "imagen",   // <── CAMBIA AQUÍ: "video" o "imagen"


  /* ══════════════════════════════════════════════════════
     BLOQUE A — Configuración para TIPO VIDEO
     (Solo aplica cuando tipo: "video")

     youtubeId → el código que va después de "youtu.be/"
     Ejemplo:
       URL:  https://youtu.be/gq8gdAVIPTE
       ID:   gq8gdAVIPTE

     autoplay → true: el video arranca solo
                false: el usuario le da play manualmente
     ══════════════════════════════════════════════════════ */
  youtubeId: "qRpLrqg-z3k?",
  autoplay: true,


  /* ══════════════════════════════════════════════════════
     BLOQUE B — Configuración para TIPO IMAGEN
     (Solo aplica cuando tipo: "imagen")

     imagen → ruta de la imagen dentro del proyecto.
              Ejemplos:
              "img/mi-infografia.jpg"   (imagen subida a /img/)
              "img/banner-landing.jpg"  (imagen ya existente)

     urlDestino → si quieres que al hacer clic en la imagen
                  lleve a un enlace. Deja "" si no quieres link.
     urlDestinoLabel → texto del botón de enlace.
     urlNuevaPestana → true: abre el link en pestaña nueva.

     cierreAuto → true: el popup se cierra solo con contador.
     cierreSegundos → segundos antes de cerrarse (mínimo 5).
     ══════════════════════════════════════════════════════ */
  imagen: "img/banner-landing.jpg",
  urlDestino: "",
  urlDestinoLabel: "Ver más información",
  urlNuevaPestana: true,
  cierreAuto: true,
  cierreSegundos: 10

};

/* ──────────────────────────────────────────────────────────
   EJEMPLOS RÁPIDOS — Copia el bloque que necesites:

   ► MOSTRAR UN VIDEO:
   ──────────────────
   activo: true,
   tipo: "video",
   titulo: "Capacitación Obligatoria",
   subtitulo: "Visualiza el video completo antes de continuar.",
   youtubeId: "gq8gdAVIPTE",
   autoplay: true,

   ► MOSTRAR UNA IMAGEN SIN LINK:
   ────────────────────────────────
   activo: true,
   tipo: "imagen",
   titulo: "Evento Especial",
   subtitulo: "¡Celebramos nuestro aniversario!",
   imagen: "img/mi-infografia.jpg",
   urlDestino: "",
   cierreAuto: true,
   cierreSegundos: 15,

   ► MOSTRAR UNA IMAGEN CON LINK:
   ────────────────────────────────
   activo: true,
   tipo: "imagen",
   titulo: "Nueva Política Interna",
   subtitulo: "Haz clic en la imagen para más información.",
   imagen: "img/politica-nueva.jpg",
   urlDestino: "https://link-a-documento.com",
   urlDestinoLabel: "Ver documento completo",
   urlNuevaPestana: true,
   cierreAuto: false,

   ► DESACTIVAR EL POPUP:
   ───────────────────────
   activo: false,
────────────────────────────────────────────────────────── */
