<template>
  <MainSection title="Dashboard">
    <h2>Uploaded Images</h2>
    <div class="grid grid-cols-3 space-x-3">
      <img v-for="image in imagesStore.images" :key="image.id" :src="image.url" class="w-64" />
    </div>

    <RouterLink :to="{ name: 'addImage'}">Add More</RouterLink>
  </MainSection>
</template>
<script setup>
import { onMounted } from "vue";
import {useImageStore} from "../stores/useImages";
import MainSection from "./MainSection.vue";

const imagesStore = useImageStore();

onMounted(() => {
  imagesStore.getImages();
});
</script>