import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import FormView from "@/views/FormView.vue";
import store from "@/store";
import { getUserDataById } from "@/core/getUserDataById";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:userId",
    name: "form",
    component: FormView,
    beforeEnter: async (to, from, next) => {
      const userId = to.params.userId;
      const [user, error] = await getUserDataById(userId);
      if (error || !user) {
        // Handle error or redirect if user not found
        console.error("User not found:", error);
      } else {
        store.commit("setUser", user);
        next();
      }
    },
  },
  {
    path: "/",
    name: "form",
    component: FormView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
