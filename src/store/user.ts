import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => ({ admin: null, displayName: null }),
  actions: {
    setUser(payload: string) {
      this.admin = payload;
    },
    setDisplayName(payload: string) {
      this.displayName = payload;
    },
  },
});
