import { createRouter, createWebHistory, routeLocationKey } from "vue-router";
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
      meta: {
        title: "Menu | Welcome"
      }
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: {
        title: "Menu | Categories"
      }
    },
    {
      path: "/category/:id",
      name: "category",
      component: CategoryView,
      meta: {
        title: "Menu | Category" 
      }
    },
    {
      path: "/product/:id",
      name: "editProduct",
      component: EditProduct,
      meta: {
        title: "Menu | Edit Product"
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Menu | Login"
      }
    },
  ],
});


const DEFAULT_TITLE = "Home"

router.beforeEach((to, from, next) => {
  if (typeof(to.meta.title) === 'string'){
  document.title = to.meta.title || DEFAULT_TITLE; 
  next();
  }
})

export default router;
