const API_BASE = "/api/routes";

async function fetchStops() {
  const res = await fetch(`${API_BASE}/stops`);
  return await res.json();
}

async function searchRoutes(from, to) {
  const res = await fetch(`${API_BASE}/search?from=${from}&to=${to}`);
  return await res.json();
}

async function getRouteDetails(id, from, to) {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const qs = params.toString();
  const url = qs ? `${API_BASE}/${id}?${qs}` : `${API_BASE}/${id}`;
  const res = await fetch(url);
  return await res.json();
}
