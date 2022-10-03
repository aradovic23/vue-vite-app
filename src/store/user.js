import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => ({ admin: null, displayName: null }),
  actions: {
    setUser(payload) {
      this.admin = payload;
    },
    setDisplayName(payload) {
      this.displayName = payload;
    },
  },
});
