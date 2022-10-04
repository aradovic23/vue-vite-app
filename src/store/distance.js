import { defineStore } from "pinia";

export const useStore = defineStore("distance", {
  state: () => ({ currentDistance: null }),
  actions: {
    setCurrentDistance(payload) {
      this.currentDistance = payload;
    },
  },
});
