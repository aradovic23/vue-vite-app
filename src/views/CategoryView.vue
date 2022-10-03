<template>
  <div>
    <div v-if="isLoading">
      <SkeletonLoader />
    </div>
    <div v-else>
      <div class="my-3" v-if="admin">
        <button
          @click="showForm"
          class="btn btn-secondary w-full"
          :class="[toasterVisible && 'btn-disabled']"
        >
          <PlusIcon class="h-6 w-6" />
          add new product
        </button>
        <form @submit.prevent="createProduct" v-if="formVisible" class="my-4">
          <div class="form-control max-w-lg my-3">
            <label class="label">
              <span class="label-text">Product name:</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              class="input input-bordered"
              v-model="productName"
            />
          </div>
          <div class="form-control max-w-lg my-3">
            <label class="label">
              <span class="label-text">Product price:</span>
            </label>
            <input
              type="text"
              placeholder="Product Price"
              class="input input-bordered"
              v-model="productPrice"
            />
          </div>
          <button class="btn btn-primary w-full" type="submit">Submit</button>
        </form>
      </div>
      <div class="mb-2">
        <h1 class="text-2xl">
          Category:
          <strong class="capitalize">{{ categoryName }}</strong>
        </h1>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="product in products" :key="product.id">
          <ProductCard
            :product="product"
            :categoryId="id"
            @delete="deleteProduct(product.id, product.name)"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="toasterVisible">
    <ToasterAlert>{{ this.toasterMessage }}</ToasterAlert>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard.vue";
import LoadingButton from "../components/LoadingButton.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import ToasterAlert from "../components/ToasterAlert.vue";
import SkeletonLoader from "../common/SkeletonLoader.vue";
import { useStore } from "@/store/user";
import { mapState } from "pinia";
export default {
  computed: {
    ...mapState(useStore, ["admin", "displayName"]),
    id() {
      return this.$route.query.id;
    },
    categoryName() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      products: [],
      isLoading: null,
      formVisible: null,
      productName: "",
      productPrice: "",
      toasterVisible: null,
      toasterMessage: "",
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      const data = await getDocs(collection(db, `drinks/${this.id}/items`));
      data.forEach((doc) => {
        this.products.unshift({
          name: doc.data().name,
          price: doc.data().price,
          id: doc.id,
          img: doc.data().img,
          type: doc.data().type || "",
        });
      });
      this.isLoading = false;
    },
    showForm() {
      this.formVisible = !this.formVisible;
    },
    async createProduct() {
      const docRef = await addDoc(collection(db, `drinks/${this.id}/items`), {
        name: this.productName,
        price: this.productPrice,
        img: "https://joeschmoe.io/api/v1/random", // TODO: not hardcode this
      });

      console.log("Document written with ID: ", docRef.id);
      this.formVisible = !this.formVisible;
      this.toasterVisible = true;
      this.toasterMessage = `Created ${this.productName} successfully `;
      setTimeout(() => {
        this.products.unshift({
          name: this.productName,
          price: this.productPrice,
          id: docRef.id,
          img: "https://joeschmoe.io/api/v1/random", // TODO: not hardcode this
        });
        this.toasterVisible = false;
        this.toasterMessage = "";
        this.categoryName = "";
      }, 1000);
    },
    async deleteProduct(id, name) {
      const answer = window.confirm(`Delete ${name}?`);
      if (answer) {
        await deleteDoc(doc(db, `drinks/${this.id}/items`, id));
        this.products.splice(id, 1);
        this.toasterVisible = true;
        this.toasterMessage = `Deleted ${name}`;
        setTimeout(() => {
          this.toasterVisible = false;
          this.toasterMessage = "";
        }, 1000);
      }
    },
  },
  components: {
    ProductCard,
    LoadingButton,
    PlusIcon,
    ToasterAlert,
    SkeletonLoader,
  },
};
</script>
