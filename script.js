/**
 * Detective Matemático - Lógica del Menú Principal
 */

// Registro del Service Worker para funcionamiento Offline (PWA)
if ('serviceWorker' in navigator) { 
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log("Service Worker Activo"))
        .catch(err => console.log("Error en SW:", err)); 
}

/**
 * Función de navegación a los niveles
 * @param {string} url - Destino del nivel seleccionado
 */
function goTo(url) {
    // Podrías añadir un efecto de sonido aquí si quisieras
    window.location.href = url;
}