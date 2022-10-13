import { defineStore } from "pinia";

export const useCurrentDistance = defineStore("distance", {
  state: () => ({ currentDistance: null, isLoading: null }),
  getters: {
    isHere(state) {
      return state.currentDistance <= 50;
    },
  },
  actions: {
    async setCurrentDistance(payload: number) {
      this.isLoading = true;
      this.currentDistance =  payload;
      this.isLoading = false;
    },
  },
});
