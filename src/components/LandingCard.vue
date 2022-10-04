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
      <h2 class="card-title">Landing page</h2>
      <p>Distance from the bar: {{ distance }}m</p>

      <div v-if="distance <= 50">
        <div class="card-actions">
          <router-link to="/home"
            ><button class="btn btn-primary">Go Home</button></router-link
          >
        </div>
      </div>
      <div v-else>
        <div class="badge badge-error">Please enable location and refresh</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    distance: {
      type: String,
    },
  },
};
</script>
