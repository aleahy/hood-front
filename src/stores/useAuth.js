import { defineStore } from "pinia";
import axios from "axios";
import {useStorage} from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: useStorage('loading', false),
    loggedIn: useStorage("loggedIn", false),
    user: useStorage("user", {}),
  }),

  getters: {
    userInitials: (state) => state.user.name.split(" ").
      reduce((prev, curr) => prev + curr.substring(0,1), '')
  },

  actions: {
    async login(credentials) {
      this.loading = true;

      try {
        await axios.get("/sanctum/csrf-cookie");

        await axios.post("/login", credentials);

        await this.getUser();
      }

      finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await axios.post("/logout");

        this.reset();
      }
      finally {
        this.loading = false;
      }
    },

    async register(attributes) {
      this.loading = true;

      try {
        await axios.get("/sanctum/csrf-cookie");

        await axios.post("/register", attributes);

        await this.getUser();
      }

      finally {
        this.loading = false;
      }
    },

    async getUser() {
      this.user = (await axios.get("api/user")).data;
      this.loggedIn = true;
    },

    reset() {
      this.user = {};
      this.loggedIn = false;
      this.loading = false;
    },
  },
});
