<template>
  <section class="container mx-auto p-4">
    <MainHeader v-if="!isLanding" />
    <RouterView />
  </section>
</template>

<script lang="ts">
import MainHeader from "./components/MainHeader.vue";
import { mapState } from "pinia";
import { useCurrentDistance } from "./store/distance";
import LandingCard from "./components/LandingCard.vue";
import { getDistance } from "./hooks/useLocation.js";

export default {
  components: { MainHeader, LandingCard },
  computed: {
    isLanding() {
      return this.$route.name === "landing";
    },
    ...mapState(useCurrentDistance, ["currentDistance", "isLoading"]),
  },
  mounted() {
    this.geoLocation();
  },
  methods: {
    async geoLocation() {
      const distance = await getDistance();
      const store = useCurrentDistance();
      store.setCurrentDistance(distance);
    },
  },
};
</script>
