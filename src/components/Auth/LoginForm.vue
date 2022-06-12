<template>
  <form @submit.prevent="onSubmit" class="mt-6">
    <div class="">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="email" type="email" name="email" id="email" placeholder="Email" class="px-3 py-2 w-full border focus:ring-purple-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300" autocomplete="username">
    </div>
    <ErrorMessage field="email" class="mt-1" />

    <div class="mt-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input v-model="password" type="password" name="password" id="password" placeholder="Password" class="px-3 py-2 w-full border focus:ring-purple-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300" autocomplete="password">
    </div>
    <ErrorMessage field="password" class="mt-1" />

    <div class="flex justify-end text-sm mt-2">
      Don't have an account?&nbsp;<RouterLink :to="{name: 'register'}" class="text-blue-500 hover:underline">Register here</RouterLink>.
    </div>
    <div class="mt-4">
      <PrimaryButton type="submit" :disabled="auth.loading" class="inline-flex items-center space-x-4">
        <span>Login</span>
        <SpinnerIcon v-if="auth.loading"/>
      </PrimaryButton>
    </div>
  </form>
</template>
<script setup>
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../../stores/useAuth";
import { useErrorStore } from "../../stores/useError";
import PrimaryButton from "../PrimaryButton.vue";
import ErrorMessage from "../ErrorMessage.vue";
import SpinnerIcon from "../icons/SpinnerIcon.vue";

const errorStore = useErrorStore();
const auth = useAuthStore();
const router = useRouter();

const onSubmit = () => {
  errorStore.$reset();

  auth.login({
      email: email.value,
      password: password.value,
    })
    .then(() => {
      router.push({ name: "home" });
    })
    .catch(({ response }) => {
      password.value = '';
      errorStore.storeErrorsResponse(response);
    });
};

const email = ref("");
const password = ref("");

onBeforeUnmount(() => {
  errorStore.$reset();
});
</script>