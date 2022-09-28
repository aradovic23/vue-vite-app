<template>
  <div
    class="navbar bg-base-100 justify-between sticky top-0 left-0 z-50"
    :class="[windowTop >= 5 && 'shadow-md -mx-4 w-screen p-4']"
  >
    <div class="flex-none">
      <button class="btn btn-sm btn-primary gap-2" @click="goBack">
        <ChevronLeftIcon class="h-4 w-4" /> Back
      </button>
    </div>
    <div>
      <h5 class="font-bold text-primary">Digital Menu</h5>
    </div>
    <div class="flex-none">
      <button
        class="btn btn-primary btn-sm"
        data-toggle-theme="light,dracula"
        data-act-class="activeClass"
        @click="setActiveTheme"
      >
        <ArrowsRightLeftIcon class="h-4 w-4" /> Theme
      </button>
    </div>
  </div>
</template>

<script>
import { themeChange } from "theme-change";
import { ChevronLeftIcon, ArrowsRightLeftIcon } from "@heroicons/vue/24/solid";

export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onScroll() {
      this.windowTop = window.scrollY;
    },
  },
  mounted() {
    themeChange(false);
    window.addEventListener("scroll", this.onScroll);
  },
  data() {
    return {
      activeClass: false,
      windowTop: 0,
    };
  },
  components: {
    ChevronLeftIcon,
    ArrowsRightLeftIcon,
  },
};
</script>
