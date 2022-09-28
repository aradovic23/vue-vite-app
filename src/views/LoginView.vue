<template>
  <div class="my-3">
    <form @submit.prevent="createCategory" class="my-4">
      <div class="form-control max-w-lg my-3">
        <label class="label">
          <span class="label-text">Email:</span>
        </label>
        <input
          type="text"
          placeholder="Email"
          class="input input-bordered"
          v-model="email"
          required
        />
      </div>
      <div class="form-control max-w-lg my-3">
        <label class="label">
          <span class="label-text">Password:</span>
        </label>
        <input
          type="text"
          placeholder="Password"
          class="input input-bordered"
          v-model="password"
          required
        />
      </div>
      <button class="btn btn-primary w-full" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>
