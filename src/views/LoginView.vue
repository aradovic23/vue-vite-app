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
import { useStore } from "@/store/user";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useStore();
const email = ref("");
const password = ref("");
const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const data = userCredential.user;
    user.setUser(data);
    user.setDisplayName("Dejan");
    router.push({ name: "home" });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};
</script>
