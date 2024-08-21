import Vue from "vue";
import Vuex from "vuex";
import { User } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null as User | null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
    },
  },
  actions: {
    fetchUserData({ commit }, userId: string) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const { getUserDataById } = await import("@/core/getUserDataById");
        const [user, error] = await getUserDataById(userId);
        if (error) {
          reject(error);
        } else {
          commit("setUser", user);
          resolve(user);
        }
      });
    },
  },
  modules: {},
});
