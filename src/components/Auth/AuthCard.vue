<template>
  <main class="max-w-2xl mx-auto">
    <div class="flex flex-col md:mt-36 justify-center">
      <section class="bg-white px-6 pb-12 pt-8 md:rounded-xl md:border md:shadow-lg">
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <slot />
      </section>
    </div>
  </main>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
