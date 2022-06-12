<template>
  <form @submit.prevent="onSubmit" class="mt-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input v-model="name" type="text" name="name" id="name" placeholder="Name" class="px-3 py-2 w-full border focus:ring-purple-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300" >
    </div>
    <ErrorMessage field="name" class="mt-1" />


    <div class="mt-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="email" type="email" name="email" id="email" placeholder="Email" class="px-3 py-2 w-full border focus:ring-purple-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300" >
    </div>
    <ErrorMessage field="email" class="mt-2" />

    <div class="mt-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input v-model="password" type="password" name="password" id="password" placeholder="Password" class="px-3 py-2 w-full border focus:ring-purple-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300" >
    </div>
    <ErrorMessage field="password" class="mt-2" />

    <div class="mt-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Password Confirmation</label>
      <input v-model="password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" class="px-3 py-2 w-full border focus:ring-purple-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300" >
    </div>
    <ErrorMessage field="password_confirmation" class="mt-2" />

    <div class="flex justify-end text-sm mt-2">
      Have an account already?&nbsp;<RouterLink :to="{ name: 'login' }" class="text-blue-500 hover:underline">Login </RouterLink>.
    </div>
    <div class="mt-4">
      <PrimaryButton type="submit" :disabled="auth.loading" class="inline-flex items-center space-x-4">
        <span>Register</span>
        <SpinnerIcon v-if="auth.loading"/>
      </PrimaryButton>
    </div>
  </form>
</template>
<script setup>
import { onBeforeUnmount, ref } from "vue";
import { useAuthStore } from "../../stores/useAuth";
import { useRouter } from "vue-router";
import ErrorMessage from "../../components/ErrorMessage.vue";
import {useErrorStore} from "../../stores/useError";
import PrimaryButton from "../../components/PrimaryButton.vue";
import SpinnerIcon from "../../components/icons/SpinnerIcon.vue";

const errorStore = useErrorStore();
const auth = useAuthStore();

const router = useRouter();
const onSubmit = () => {
  errorStore.$reset();

  auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
    .then(() => {
      router.push({ name: "home" });
    })
    .catch(({response}) => {
      password.value = '';
      password_confirmation.value = '';
      errorStore.storeErrorsResponse(response);
    });
};
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");

onBeforeUnmount(() => {
  errorStore.$reset();
});
</script>
