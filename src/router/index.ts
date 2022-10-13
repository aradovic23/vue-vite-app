import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import EditProduct from "../views/EditProduct.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/category/:id",
      name: "category",
      component: CategoryView,
    },
    {
      path: "/product/:id",
      name: "editProduct",
      component: EditProduct,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
