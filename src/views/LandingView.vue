<template>
  <div class="grid place-items-center h-screen">
    <LandingCard />
  </div>
</template>

<script>
import LandingCard from "../components/LandingCard.vue";

export default {
  components: {
    LandingCard,
  },
  data() {
    return {
      lat: null,
      lng: null,
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      const watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.lat = latitude;
        this.lng = longitude;
      }); // TODO: Finish the Geolocation logic
    },
  },
};
</script>
