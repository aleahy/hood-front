import { defineStore } from "pinia";
import axios from "axios";
import {useStorage} from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: useStorage("loggedIn", false),
    user: useStorage("user", {}),
  }),

  getters: {
    userInitials: (state) => state.user.name.split(" ").
      reduce((prev, curr) => prev + curr.substring(0,1), '')
  },

  actions: {
    async login(credentials) {
        await axios.get("/sanctum/csrf-cookie");

        await axios.post("/login", credentials);

        await this.getUser();
    },

    async logout() {
      await axios.post("/logout");

      this.reset();
    },

    async register(attributes) {


      await axios.get("/sanctum/csrf-cookie");

      await axios.post("/register", attributes);

      await this.getUser();
    },

    async getUser() {
      console.log('Getting user');
      this.user = (await axios.get("api/user")).data;
      this.loggedIn = true;
    },

    reset() {
      this.user = {};
      this.loggedIn = false;
    }
  },
});
