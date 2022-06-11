import { defineStore } from "pinia";

export const useErrorStore = defineStore("error", {
  state: () => ({
    message: null,
    errors: {},
  }),
  actions: {
    storeErrorsResponse(response) {
      this.errors = response?.data?.errors ?? {};
      this.message = response?.data?.message ?? null;
    },
    setErrorForField(field, message) {
      this.errors = {};
      this.errors[field] = [message];
    },
  },
});
