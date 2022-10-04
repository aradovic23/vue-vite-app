const calcCrow = (coords1, coords2) => {
  var R = 6371000;
  var dLat = toRad(coords2.lat - coords1.lat);
  var dLon = toRad(coords2.lng - coords1.lng);
  var lat1 = toRad(coords1.lat);
  var lat2 = toRad(coords2.lat);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

const toRad = (Value) => {
  return (Value * Math.PI) / 180;
};

export const getDistance = () => {
  let distance = null;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const coords2 = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // location coords
        const coords1 = {
          lat: 45.2624726,
          lng: 19.848644,
        };

        const calculateDistance = calcCrow(coords1, coords2);
        const roundedDistance = calculateDistance.toFixed(2);
        console.log(roundedDistance);
        distance = roundedDistance;
        console.log(distance);
      },
      function (error) {
        alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  return { distance };
};
