// --- Funciones para gestionar cookies ---
function crearCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
  const expira = "expires=" + fecha.toUTCString();
  document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
}

function leerCookie(nombre) {
  const name = nombre + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let c of ca) {
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

// --- Mostrar u ocultar el banner ---
window.addEventListener("load", () => {
  const consentimiento = leerCookie("consentimientoCookies");
  const banner = document.getElementById("cookie-banner");

  if (!consentimiento) {
    banner.style.display = "block";
  }

  document.getElementById("btn-aceptar").addEventListener("click", () => {
    crearCookie("consentimientoCookies", "aceptado", 365);
    banner.style.display = "none";
    alert("Has aceptado las cookies 😊");
  });

  document.getElementById("btn-rechazar").addEventListener("click", () => {
    crearCookie("consentimientoCookies", "rechazado", 365);
    banner.style.display = "none";
    alert("Has rechazado las cookies ❌");
  });
});