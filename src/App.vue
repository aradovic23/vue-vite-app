<template>
  <section class="container mx-auto p-4">
    <MainHeader v-if="!isLanding" />
    <RouterView />
  </section>
</template>

<script>
import { mapState } from "pinia";
import MainHeader from "./components/MainHeader.vue";
import { useStore } from "./store/distance";
import LandingCard from "./components/LandingCard.vue";
import { getDistance } from "./helpers/useLocation.js";

export default {
  components: { MainHeader, LandingCard },
  computed: {
    isLanding() {
      return this.$route.name === "landing";
    },
    // ...mapState(useStore, ["distance"]),
  },
  created() {
    setTimeout(() => {
      this.geoLocation();
    }, 4000);
  },
  methods: {
    geoLocation() {
      const distance = getDistance();
      console.log(distance);
    },
  },
};
</script>
