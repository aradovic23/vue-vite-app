<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure class="px-10 pt-10">
      <img
        src="https://picsum.photos/200/200"
        alt="no-img"
        class="rounded-xl"
      />
    </figure>
    <div class="card-body items-center text-center">
      <div class="flex items-center flex-col gap-2">
        <h2 class="card-title">Welcome!</h2>
        <p class="text-sm">Make sure to enable to location service</p>
      </div>

      <div>
        <div class="card-actions">
          <router-link to="/home" v-if="currentDistance && isHere"
            ><button class="btn btn-primary">Enter</button></router-link
          >
          <div v-else><LoadingButton /></div>
        </div>
      </div>
      <div v-if="currentDistance && isHere">
        <div class="badge badge-warning">
          Distance from: {{ currentDistance }}
          {{ isHere }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useCurrentDistance } from "../store/distance";
import LoadingButton from "./LoadingButton.vue";
import { InformationCircleIcon } from "@heroicons/vue/24/solid";

export default {
  computed: {
    ...mapState(useCurrentDistance, ["currentDistance", "isLoading"]),
    isHere() {
      return this.currentDistance <= 50;
    },
  },
  components: { LoadingButton, InformationCircleIcon },
};
</script>
