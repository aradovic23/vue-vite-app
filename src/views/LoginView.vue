<template>
  <div class="my-3">
    <form @submit.prevent="handleLogin" class="my-4">
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
          type="password"
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

<script setup>
import { ref } from "vue";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const handleLogin = () => {
  // TODO: Finish this..
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
console.log(auth);
</script>
