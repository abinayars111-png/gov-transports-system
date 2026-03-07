const toRad = value => (value * Math.PI) / 180;

const calculateDistance = (coords) => {
  let total = 0;

  for (let i = 0; i < coords.length - 1; i++) {
    const R = 6371;
    const dLat = toRad(coords[i + 1].lat - coords[i].lat);
    const dLon = toRad(coords[i + 1].lng - coords[i].lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords[i].lat)) *
        Math.cos(toRad(coords[i + 1].lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    total += R * c;
  }

  return total.toFixed(2);
};

module.exports = calculateDistance;
