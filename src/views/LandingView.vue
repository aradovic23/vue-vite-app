<template>
  <div class="grid place-items-center h-screen">
    <LandingCard :distance="distance" />
  </div>
</template>

<script>
import LandingCard from "../components/LandingCard.vue";

export default {
  components: {
    LandingCard,
  },
};
</script>
