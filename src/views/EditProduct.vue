<template>
  <div v-if="isLoading">
    <SkeletonLoader />
  </div>
  <div v-else>
    <EditProductCard
      :product="product"
      :categoryId="categoryId"
      :productId="id"
    />
  </div>
</template>

<script>
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import LoadingButton from "../components/LoadingButton.vue";
import EditProductCard from "../components/EditProductCard.vue";
import SkeletonLoader from "../common/SkeletonLoader.vue";

export default {
  computed: {
    id() {
      return this.$route.query.id;
    },
    categoryId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.fetchProduct();
  },
  data() {
    return {
      isLoading: null,
      product: {},
    };
  },
  methods: {
    async fetchProduct() {
      this.isLoading = true;
      const docRef = doc(db, "drinks", this.categoryId, "items", this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.product = docSnap.data();
        this.isLoading = false;
      } else {
        console.log("No such document!");
      }
    },
  },
  components: { LoadingButton, EditProductCard, SkeletonLoader },
};
</script>
