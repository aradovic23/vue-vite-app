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
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In illo quos
        velit sunt, qui eaque minima mollitia saepe adipisci eveniet sapiente
        quam fugiat dolores praesentium! Excepturi sequi repellat exercitationem
        at.
      </p>
      <div class="card-actions">
        <router-link to="/home"
          ><button class="btn btn-primary">Go Home</button></router-link
        >
      </div>
    </div>
  </div>
</template>
