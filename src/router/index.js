import { createRouter, createWebHistory } from "vue-router";
import {useAuthStore} from "../stores/useAuth";
import AuthLayout from "../layouts/AuthLayout.vue";

const redirectToHomeOnLoggedIn = (to, from, next) => {
  if (useAuthStore().loggedIn) {
    console.log("redirecting to home");
    next({ name: "home" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: redirectToHomeOnLoggedIn,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      beforeEnter: redirectToHomeOnLoggedIn,
    },
    {
      path: "/logout",
      name: "logout",
      component: import("../views/LogoutView.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requireAuth: true,
        layout: AuthLayout,
      },
    },
    {
      path: "/add",
      name: "addImage",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AddImageView.vue"),
      meta: {
        layout: AuthLayout,
        requireAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !useAuthStore().loggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
