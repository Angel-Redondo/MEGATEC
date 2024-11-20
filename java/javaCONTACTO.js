// Coordenadas del negocio
const negocioLatLng = [37.391551, -4.766921]; // Dirección del negocio

// Inicializar el mapa
const mapa = L.map('mapa').setView(negocioLatLng, 13);

// Agregar una capa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(mapa);

// Agregar un marcador en la ubicación del negocio
L.marker(negocioLatLng).addTo(mapa)
  .bindPopup('MEGATEC: Calle Miguel Romero 7, Puente Genil, España')
  .openPopup();

// Obtener la ubicación del usuario
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLatLng = [position.coords.latitude, position.coords.longitude];

      // Agregar un marcador en la ubicación del usuario
      L.marker(userLatLng).addTo(mapa)
        .bindPopup('Tu ubicación')
        .openPopup();

      // Centrar el mapa en la ubicación del usuario
      mapa.setView(userLatLng, 13);

      // Usar Leaflet Routing Machine con el servicio OSRM para calcular la ruta por carretera
      L.Routing.control({
        waypoints: [
          L.latLng(userLatLng), // Coordenadas del usuario
          L.latLng(negocioLatLng) // Coordenadas del negocio
        ],
        routeWhileDragging: false, // Permite arrastrar el punto de la ruta
        router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }), // URL del servicio OSRM
        show: true, // Mostrar el control de la ruta
      }).addTo(mapa);
    },
    (error) => {
      console.error("Error al obtener la ubicación del usuario:", error.message);
      alert("No se pudo obtener tu ubicación. Asegúrate de que la geolocalización esté habilitada.");
    }
  );
} else {
  alert("Geolocalización no soportada por tu navegador.");
}






  // Formulario
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  alert("Mensaje enviado. Nos pondremos en contacto contigo pronto.");
});

