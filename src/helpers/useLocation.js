const calcCrow = (coords1, coords2) => {
  const R = 6371000;
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const toRad = (Value) => {
  return (Value * Math.PI) / 180;
};

const getCoordinates = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getDistance = async () => {
  const position = await getCoordinates();

  const coords2 = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  // location coords
  const coords1 = {
    lat: 44.68670524777419,
    lng: 20.381842999712696,
  };

  const calculateDistance = calcCrow(coords1, coords2);
  const roundedDistance = calculateDistance.toFixed(2);
  const distance = roundedDistance;

  return distance;
};
