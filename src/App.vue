<template>
  <section class="container mx-auto p-4">
    <MainHeader v-if="!isLanding" />
    <RouterView />
  </section>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
export default {
  components: { MainHeader },
  computed: {
    isLanding() {
      return this.$route.name === "landing";
    },
  },
};
</script>
