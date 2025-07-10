document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".section");
  const stickers = document.querySelectorAll(".sticker");
  const detalles = document.querySelectorAll("details");

  // Animar secciones al entrar en pantalla
  const observerSecciones = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, { threshold: 0.2 });

  secciones.forEach(seccion => observerSecciones.observe(seccion));

  // Animar stickers al entrar
  const observerStickers = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("sticker-animado");
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, { threshold: 0.3 });

  stickers.forEach(sticker => observerStickers.observe(sticker));

  // Abrir detalles automáticamente
  const observerDetalles = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.hasAttribute("open")) {
        entry.target.setAttribute("open", true);
        observer.unobserve(entry.target); // Solo abrir una vez
      }
    });
  }, { threshold: 0.5 });

  detalles.forEach(detalle => observerDetalles.observe(detalle));
});

// Función para cargar un HTML externo en un div
function cargarGrafico(idDiv, rutaArchivo) {
  fetch(rutaArchivo)
    .then(response => response.text())
    .then(html => {
      document.getElementById(idDiv).innerHTML = html;
    })
    .catch(error => {
      console.error("Error al cargar el gráfico:", rutaArchivo, error);
    });
}

// Carga de los gráficos de géneros
cargarGrafico("grafico-radio", "area_apilada_radio.html");
cargarGrafico("grafico-spotify", "area_apilada_spotify.html");
