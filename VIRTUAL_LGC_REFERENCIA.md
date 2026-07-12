# 📋 VIRTUAL LGC — Documento de Referencia del Proyecto
**Última actualización:** Julio 2025  
**Desarrollador:** Anthony Campo (`AnthonyCampo97`)  
**URL en producción:** https://virtual.lgc.com.co  
**Repositorio GitHub:** https://github.com/AnthonyCampo97/LGC-CODEX  
**Despliegue:** GitHub Pages con dominio personalizado  

---

## 🏗️ ESTRUCTURA DE ARCHIVOS

```
LGC-VIRTUAL/
│
├── index.html                  ← Landing page principal (menú de módulos)
├── financiero.html             ← Módulo Financiero
├── comercial.html              ← Módulo Comercial
├── nomina.html                 ← Módulo Nómina Web
├── pos.html                    ← Módulo POS (Punto de Venta)
├── carnes.html                 ← Módulo Carnes
├── otros.html                  ← Módulo Otros
├── sagrilaft.html              ← Módulo COMPLIANCE/SAGRILAFT (especial)
│
├── img/
│   ├── logo-la-gran-colombia.png   ← Logo principal (header + favicon)
│   └── banner-landing.jpg          ← Imagen de fondo del landing
│
├── docs/
│   └── *.pdf                       ← Manuales PDF protegidos
│
├── style/
│   └── style.css                   ← CSS único compartido por todas las páginas
│
└── js/
    │
    ├── ── LÓGICA (no editar) ──────────────────────────
    ├── player.js               ← Reproductor de video personalizado
    ├── pdf-viewer.js           ← Visor de PDF protegido (canvas, sin descarga)
    ├── encuestas.js            ← Render de tarjetas de encuestas Google Forms
    ├── banner.js               ← Carousel/banner dinámico (COMPLIANCE)
    ├── popup.js                ← Lógica del popup de bienvenida
    │
    ├── ── CONFIGURACIÓN (sí editar) ───────────────────
    ├── popup-config.js         ← Config del popup (activar/tipo/contenido)
    │
    ├── ── DATOS DE VIDEOS (uno por módulo) ────────────
    ├── videos-financiero.js
    ├── videos-comercial.js
    ├── videos-nomina.js
    ├── videos-pos.js
    ├── videos-carnes.js
    ├── videos-otros.js (si aplica)
    ├── videos-sagrilaft.js
    │
    ├── ── DATOS DE MANUALES PDF (uno por módulo) ──────
    ├── docs-financiero.js
    ├── docs-comercial.js
    ├── docs-nomina.js
    ├── docs-pos.js
    ├── docs-carnes.js
    ├── docs-otros.js (si aplica)
    ├── docs-sagrilaft.js
    │
    ├── ── DATOS DE ENCUESTAS (solo COMPLIANCE) ────────
    ├── encuestas-sagrilaft.js
    │
    └── ── DATOS DEL BANNER (solo COMPLIANCE) ──────────
        └── slides-sagrilaft.js
```

---

## 🎨 DISEÑO Y ESTILOS

**Filosofía:** Mobile-first — estilos base para móvil, media queries escalan hacia arriba.

**Paleta de colores (variables CSS en `style.css`):**
```css
--azul-marino:        #0A1657   ← color principal de fondos
--azul-marino-oscuro: #060D38   ← fondo más profundo
--amarillo:           #FFD400   ← acento principal, bordes activos
--rojo:               #E2231A   ← acento secundario
--azul-medio:         #1B3F8B   ← variante de azul
--blanco:             #FFFFFF
--gris-claro:         #C9CEE6   ← textos secundarios
```

**Tipografía:**
- `Poppins` (700, 800) → títulos y display
- `Inter` (400, 500, 600) → cuerpo y UI

**Breakpoints:**
```css
@media (min-width: 640px)  → tablet: 2 columnas en grids
@media (min-width: 1024px) → desktop: 3 columnas en grids
```

---

## 📄 PÁGINAS — ANATOMÍA

### `index.html` — Landing
- Fondo: `banner-landing.jpg` con degradado oscuro encima
- Logo centrado arriba
- Menú de 7 tarjetas (1 col móvil → 2 tablet → 3 desktop)
- Footer con año dinámico (`<span id="year">`)
- Botón flotante WhatsApp (esquina inferior derecha)
- Popup de bienvenida (controlado por `popup-config.js`)

**Módulos del menú:**
| Label | Archivo | Ícono | Clase de color |
|---|---|---|---|
| Financiero | financiero.html | $ | (sin modificador) |
| Comercial | comercial.html | 📈 | `menu__item--rojo` |
| Nómina Web | nomina.html | 🧑‍💼 | `menu__item--azul` |
| POS | pos.html | 🧾 | (sin modificador) |
| Carnes | carnes.html | 🥩 | `menu__item--rojo` |
| Otros | otros.html | ⚙️ | `menu__item--azul` |
| COMPLIANCE | sagrilaft.html | 🛡️ | `menu__item--sagrilaft` |

---

### Módulos estándar (Financiero, Comercial, Nómina, POS, Carnes, Otros)

Estructura idéntica en todos:
```
Header fijo:
  [Logo] [Nombre módulo / Portal de Sistemas] [← Volver al inicio]

Main:
  app-card
  ├── Ícono + Título + Descripción
  ├── video-grid (id="videoGrid")       ← videos cargados por videos-*.js
  └── doc-section > Manuales
          └── video-grid (id="docGrid") ← PDFs cargados por docs-*.js

Modales (ocultos, activados por JS):
  ├── playerModal  ← reproductor de video
  └── pdfModal     ← visor de PDF

Botón WhatsApp flotante (esquina inferior derecha)

Scripts al final del body:
  videos-[modulo].js → docs-[modulo].js → player.js → pdf-viewer.js
```

---

### `sagrilaft.html` — Módulo COMPLIANCE (especial)

Tiene secciones adicionales respecto a los módulos estándar:
```
Header fijo:
  [Logo] [COMPLIANCE / Portal de Sistemas] [← Volver al inicio]

Main:
  app-card
  ├── Ícono 🛡️ + Título "COMPLIANCE" + Descripción
  ├── Banner dinámico (carousel de slides)   ← slides-sagrilaft.js + banner.js
  ├── video-grid (id="videoGrid")            ← videos-sagrilaft.js
  ├── doc-section > "PILDORAS"               ← docs-sagrilaft.js
  └── encuesta-section > "FORMULARIOS"       ← encuestas-sagrilaft.js

Modales:
  ├── playerModal
  └── pdfModal

Botón WhatsApp flotante

Scripts:
  videos-sagrilaft.js → docs-sagrilaft.js → encuestas-sagrilaft.js
  → slides-sagrilaft.js → player.js → pdf-viewer.js
  → encuestas.js → banner.js
```

---

## ⚙️ ARCHIVOS DE DATOS — CÓMO EDITARLOS

### Videos (`js/videos-[modulo].js`)
```javascript
const VIDEOS_SECCION = [
  {
    id: "fin1",                          // ID único (no repetir)
    title: "Título del video",
    description: "Descripción breve.",
    youtubeId: "gq8gdAVIPTE"            // código después de youtu.be/
  }
  // Para agregar más: copia el bloque con coma antes
];
```

### Manuales PDF (`js/docs-[modulo].js`)
```javascript
const DOCUMENTOS_SECCION = [
  {
    id: "doc-fin1",                      // ID único
    title: "Nombre del manual",
    description: "Descripción breve.",
    file: "docs/nombre-archivo.pdf"      // ruta relativa al PDF en /docs/
  }
];
```

### Encuestas Google Forms (`js/encuestas-sagrilaft.js`)
```javascript
const ENCUESTAS_SECCION = [
  {
    id: "enc1",                          // ID único
    title: "Nombre de la encuesta",
    description: "Descripción breve.",
    url: "https://forms.gle/tu-link",    // URL completa del formulario
    etiqueta: "Ir al formulario"         // texto del botón
  }
];
```

### Banner COMPLIANCE (`js/slides-sagrilaft.js`)
```javascript
const BANNER_SLIDES = [
  {
    titulo: "Título del slide",
    subtitulo: "Texto descriptivo del slide.",
    imagen: "img/nombre-imagen.jpg",     // imagen de fondo en /img/
    color: "#FFD400",                    // color del acento (hex)
    url: "https://link-externo.com",     // enlace del botón ("" para omitir)
    urlLabel: "Ver más",
    urlNuevaPestana: true
  }
];
```

---

## 🔔 POPUP DE BIENVENIDA (`js/popup-config.js`)

Controla el popup que aparece al cargar `index.html`.

```javascript
const POPUP_CONFIG = {
  activo: true,          // true = mostrar | false = apagar

  tipo: "video",         // "video" o "imagen"

  titulo: "Comunicado",
  subtitulo: "Texto de apoyo.",

  // Para tipo "video":
  youtubeId: "gq8gdAVIPTE",
  autoplay: true,

  // Para tipo "imagen":
  imagen: "img/mi-infografia.jpg",
  urlDestino: "",         // "" = sin botón de link
  urlDestinoLabel: "Ver más",
  urlNuevaPestana: true,
  cierreAuto: true,
  cierreSegundos: 10
};
```

**Para desactivar el popup:** `activo: false`

---

## 🛡️ PROTECCIÓN DE PDF

El visor de PDF usa **PDF.js renderizado en canvas**, lo que significa:
- No hay visor nativo del navegador (sin toolbar de descarga/impresión)
- Clic derecho bloqueado sobre el canvas
- `Ctrl+P` y `Ctrl+S` bloqueados mientras el visor está abierto
- `@media print` en CSS: página en blanco si intentan imprimir
- El usuario navega página a página con botones `‹ ›` propios

---

## 📱 BOTÓN WHATSAPP

- **Número:** `+57 320 690 8030`
- **Mensaje predefinido:** `"Hola, soporte Virtual LGC, tengo una pregunta"`
- **Posición:** fijo, esquina inferior derecha en todas las páginas
- **Etiqueta visible:** "Soporte Sistemas" (se oculta en móviles muy pequeños, queda solo el ícono)
- **En móvil (<480px):** solo ícono circular, texto oculto

---

## 🔧 FLUJO DE TRABAJO GIT

```bash
# Verificar cambios antes de subir
git status

# Agregar todos los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "Descripción del cambio"

# Subir a GitHub (GitHub Pages publica automáticamente)
git push
```

**Rama activa:** `main`  
**Remote:** `origin → https://github.com/AnthonyCampo97/LGC-CODEX.git`

**Advertencias conocidas (inofensivas en Windows):**
- `LF will be replaced by CRLF` → diferencia de saltos de línea Unix/Windows, no afecta el código.

---

## 🚫 REGLAS DE CÓDIGO — NO CAMBIAR

| Regla | Razón |
|---|---|
| No usar frameworks (React, Vue, etc.) | El proyecto es vanilla HTML/CSS/JS por decisión de arquitectura |
| No modificar `player.js`, `pdf-viewer.js`, `banner.js`, `encuestas.js`, `popup.js` | Son archivos de lógica — solo se editan los archivos de datos |
| No mover `id="videoGrid"`, `id="docGrid"`, `id="playerModal"`, `id="pdfModal"` | Los scripts los buscan por ID exacto |
| No cambiar rutas de `/img/`, `/js/`, `/style/`, `/docs/` | Rutas relativas hardcodeadas en todo el proyecto |

---

## ✅ ESTADO ACTUAL (post-revisión Julio 2025)

| Elemento | Estado |
|---|---|
| Landing con 7 módulos | ✅ OK |
| Videos por módulo (player personalizado) | ✅ OK |
| Manuales PDF protegidos por módulo | ✅ OK |
| Banner dinámico en COMPLIANCE | ✅ OK |
| Encuestas Google Forms en COMPLIANCE | ✅ OK |
| Popup de bienvenida (video/imagen) | ✅ OK |
| Botón WhatsApp en todas las páginas | ✅ OK |
| Mensaje WhatsApp "Virtual LGC" (unificado) | ✅ OK |
| Etiqueta "Soporte Sistemas" (unificada) | ✅ OK |
| Año dinámico en footer del landing | ✅ OK |
| Dominio personalizado virtual.lgc.com.co | ✅ OK |
| HTTPS activo | ✅ OK |
