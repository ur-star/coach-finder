import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomePageVue from "../views/HomePage.vue";
import TrainerSignupVue from "../views/TrainerSignup.vue";
import SignupVue from "@/views/Signup.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/homepage",
    name: "home",
    component: HomePageVue,
    meta: { authRequired: true },
    beforeEnter: (to, from, next) => {
      if (store.getters.isUserLoggedIn) {
        // User is authenticated, allow access to the homepage
        next();
      } else {
        // User is not authenticated, redirect to the login page
        next('/login');
      }
    }
  },

  {
    path: "/trainer-signup",
    name: "Trainer Signup",
    component: TrainerSignupVue,
    meta: { authRequired: true },
    beforeEnter: (to, from, next) => {
      if (store.getters.isUserLoggedIn) {
        // User is authenticated, allow access to the homepage
        next();
      } else {
        // User is not authenticated, redirect to the login page
        next('/login');
      }
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { authRequired: false },
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupVue,
    meta: { authRequired: false },
  },

  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach((from, to, next) => {
//   if (to.meta.authRequired) {
//     if (store.getters.isUserLoggedIn) {
//       next("");
//     } else {
//       next("/login");
//     }
//   } else {
//     next("");
//   }
// });

export default router;
