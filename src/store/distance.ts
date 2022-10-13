import { defineStore } from "pinia";

export const useCurrentDistance = defineStore("distance", {
  state: () => ({ currentDistance: null, isLoading: null }),
  getters: {
    isHere(state) {
      return state.currentDistance <= 50;
    },
  },
  actions: {
    async setCurrentDistance(payload) {
      this.isLoading = true;
      this.currentDistance = await payload;
      this.isLoading = false;
    },
  },
});
