<template>
  <div class="card card-side bg-base-100 shadow-xl">
    <figure class="w-32 avatar"><img :src="product.img" alt="no-img" /></figure>
    <div class="card-body">
      <div class="card-actions justify-between">
        <h2 class="card-title">{{ product.name }}</h2>
      </div>
      <div class="card-actions justify-start">
        <div
          class="badge badge-sm badge-accent"
          v-if="product.type && product.type != 'None'"
        >
          {{ product.type }}
        </div>
      </div>
      <div class="card-actions justify-start">
        <button class="btn gap-2 btn-primary">{{ product.price }} RSD</button>
      </div>
      <div class="card-actions">
        <router-link
          :to="{
            name: 'editProduct',
            params: { id: categoryId },
            query: { id: product.id },
          }"
          ><button class="btn btn-secondary btn-sm">
            <PencilIcon class="h-4 w-4" /> Edit
          </button></router-link
        >
        <button class="btn btn-secondary btn-sm" @click="$emit('delete')">
          <TrashIcon class="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { TrashIcon, PencilIcon } from "@heroicons/vue/24/solid";

export default {
  props: ["product", "categoryId"],
  components: {
    TrashIcon,
    PencilIcon,
  },
};
</script>
