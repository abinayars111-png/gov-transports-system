const calculateETA = (distanceKm) => {
  const speed = 35;
  const hours = distanceKm / speed;

  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  return {
    hours: h,
    minutes: m,
    totalMinutes
  };
};

module.exports = calculateETA;
