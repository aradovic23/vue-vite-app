<template>
  <div>
    <div class="my-3" v-if="admin">
      <button
        @click="showForm"
        class="btn btn-secondary w-full"
        :class="[toasterVisible && 'btn-disabled']"
      >
        <PlusIcon class="h-6 w-6" />
        add new
      </button>
      <form @submit.prevent="createCategory" v-if="formVisible" class="my-4">
        <div class="form-control max-w-lg my-3">
          <label class="label">
            <span class="label-text">Category name:</span>
          </label>
          <input
            type="text"
            placeholder="Category Name"
            class="input input-bordered"
            v-model="categoryName"
          />
        </div>
        <button class="btn btn-primary w-full" type="submit">Submit</button>
      </form>
    </div>
    <div v-if="isLoading">
      <SkeletonLoader />
    </div>
    <div v-else>
      <h1 class="text-2xl mb-2 font-bold">Categories</h1>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="category in categories" :key="category.id">
          <CategoryCard
            :category="category"
            @delete="deleteCategory(category.id, category.name)"
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
import CategoryCard from "../components/CategoryCard.vue";
import LoadingButton from "../components/LoadingButton.vue";
import { useStore } from "@/store/user";
import { mapState } from "pinia";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import ToasterAlert from "../components/ToasterAlert.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import SkeletonLoader from "../common/SkeletonLoader.vue";

export default {
  components: {
    CategoryCard,
    LoadingButton,
    ToasterAlert,
    PlusIcon,
    SkeletonLoader,
  },
  data() {
    return {
      categories: [],
      isLoading: null,
      categoryName: "",
      formVisible: null,
      toasterVisible: null,
      toasterMessage: "",
    };
  },
  computed: {
    ...mapState(useStore, ["admin", "displayName"]),
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.isLoading = true;
      const data = await getDocs(collection(db, "drinks"));
      data.forEach((doc) => {
        this.categories.unshift({
          name: doc.data().name,
          id: doc.id,
        });
      });
      this.isLoading = false;
    },
    async createCategory() {
      try {
        const docRef = await addDoc(collection(db, "drinks"), {
          name: this.categoryName,
        });
        console.log("Document written with ID: ", docRef.id);
        const itemSubColl = await addDoc(
          collection(db, "drinks", docRef.id, "items"),
          {
            name: "Auto created product (edit me)",
            price: "1",
            img: "https://joeschmoe.io/api/v1/random",
          }
        );
        console.log("Subcollection written with ID: ", itemSubColl.id);
        this.formVisible = !this.formVisible;
        this.toasterVisible = true;
        this.toasterMessage = `Created ${this.categoryName} successfully `;
        setTimeout(() => {
          this.categories.unshift({
            name: this.categoryName,
            id: docRef.id,
          });
          this.toasterVisible = false;
          this.toasterMessage = "";
          this.categoryName = "";
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    },
    showForm() {
      this.formVisible = !this.formVisible;
    },
    async deleteCategory(id, name) {
      try {
        const answer = window.confirm(`Delete ${name} category?`);
        if (answer) {
          await deleteDoc(doc(db, "drinks", id));
          this.categories.splice(id, 1);
          this.toasterVisible = true;
          this.toasterMessage = `Deleted ${name}`;
          setTimeout(() => {
            this.toasterVisible = false;
            this.toasterMessage = "";
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
