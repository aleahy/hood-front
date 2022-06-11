<template>
  <div class="py-10">
    <PageHeader :title="title" />
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
<script setup>
import PageHeader from "./PageHeader.vue";
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
