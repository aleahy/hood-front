<template>
  <MainSection title="Dashboard">
    <h2>Uploaded Images</h2>
    <div>

    </div>

    <RouterLink :to="{ name: 'addImage'}">Add More</RouterLink>
  </MainSection>
</template>
<script setup>
import { onMounted } from "vue";
import {useImageStore} from "../stores/useImages";
import MainSection from "./MainSection.vue";

const images = useImageStore();

onMounted(() => {
  images.getImages();
});
</script>