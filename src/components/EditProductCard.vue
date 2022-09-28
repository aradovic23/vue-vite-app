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
    </div>
  </div>
  <!-- Update product details -->
  <form @submit.prevent="updateForm">
    <div class="form-control max-w-lg">
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        placeholder="Name"
        class="input input-bordered"
        v-model="product.name"
      />
    </div>
    <div class="form-control max-w-lg">
      <label class="label">
        <span class="label-text">Price</span>
      </label>
      <input
        type="text"
        placeholder="Price"
        class="input input-bordered"
        v-model="product.price"
      />
    </div>
    <div class="form-control max-w-lg mb-3">
      <label class="label">
        <span class="label-text">Type</span>
      </label>
      <select class="select select-bordered w-full" v-model="product.type">
        <option disabled="disabled" selected="selected">
          Choose a type (usually tea)
        </option>
        <option>Green</option>
        <option>Fruit</option>
        <option>Black</option>
        <option>None</option>
      </select>
    </div>
    <button class="btn btn-secondary">Update product</button>
  </form>
  <div v-if="toasterVisible">
    <ToasterAlert>{{ this.toasterMessage }}</ToasterAlert>
  </div>
</template>

<script>
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ToasterAlert from "./ToasterAlert.vue";

export default {
  props: ["product", "categoryId", "productId"],
  data() {
    return {
      toasterMessage: "",
      toasterVisible: null,
    };
  },
  methods: {
    async updateForm() {
      const docRef = doc(
        db,
        "drinks",
        this.categoryId,
        "items",
        this.productId
      );

      const updatedData = {
        name: this.product.name || "",
        price: this.product.price || "",
        type: this.product.type || "",
      };

      await updateDoc(docRef, updatedData);
      this.toasterVisible = true;
      this.toasterMessage = "Updated successfully";
      setTimeout(() => {
        this.toasterVisible = false;
        this.toasterMessage = "";
        this.$router.go(-1);
      }, 2000);
    },
  },
  components: { ToasterAlert },
};
</script>
