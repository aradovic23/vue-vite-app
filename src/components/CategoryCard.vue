<template>
  <div class="card lg:card-side bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title capitalize">
        {{ category.name }}
        <button
          @click="$emit('delete')"
          class="btn btn-secondary btn-xs"
          v-if="admin"
        >
          <TrashIcon class="h-4 w-4" /> Delete
        </button>
      </h2>
      <p>
        TODO: Current place holder is id, in future dsecription or similar here
        and/or img <br />
        ID:
        <strong>{{ category.id }}</strong>
      </p>
      <div class="card-actions justify-end">
        <router-link
          :to="{
            name: 'category',
            params: { id: category.name },
            query: { id: category.id },
          }"
        >
          <button class="btn btn-primary">View</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store/user";
import { mapState } from "pinia";
import { TrashIcon } from "@heroicons/vue/24/solid";
export default {
  props: ["category"],
  components: {
    TrashIcon,
  },
  computed: {
    ...mapState(useStore, ["admin", "displayName"]),
  },
};
</script>
