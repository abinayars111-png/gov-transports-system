const token2 = localStorage.getItem("token");
const params = new URLSearchParams(location.search);
const routeId = params.get("id");

let routeCoordinates = [];
let averageSpeed = 40;
let map, busMarker;

async function loadRoute() {
  const res = await fetch(`/api/bus/route/${routeId}`, {
    headers: { Authorization: `Bearer ${token2}` }
  });

  const route = await res.json();
  averageSpeed = route.averageSpeed;

  routeCoordinates = route.stops.map(s => [s.lat, s.lng]);

  map = L.map("map").setView(routeCoordinates[0], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(map);

  L.polyline(routeCoordinates, { color: "blue" }).addTo(map);

  busMarker = L.marker(routeCoordinates[0]).addTo(map);

  startRealtime();
}

loadRoute();
