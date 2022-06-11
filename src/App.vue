<template>
  <component :is="$route.meta.layout ?? GuestLayout">
    <RouterView />
  </component>

</template>

<script setup>
import { RouterView } from "vue-router";
import GuestLayout from "./layouts/GuestLayout.vue";
</script>
