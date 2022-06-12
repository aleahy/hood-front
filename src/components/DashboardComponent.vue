<template>
  <MainSection title="Collected Images">

    <div class="px-4 sm:px-0 mt-4">
      <RouterLink :to="{ name: 'addImage'}" class="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500 disabled:opacity-50">Add More</RouterLink>
    </div>

    <div class="py-4  mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 place-items-center">
      <div v-for="image in imagesStore.images"
           :key="image.id">
        <component :is="image.url ? 'img' : 'div'"
             :src="image.url"
             class="rounded border border-gray-300 shadow-lg "
                   style="max-height: 160px; max-width: 256px "
             :class="{'w-64 h-40 flex grid place-items-center': !image.url}"
       >
          <span v-if="!image.url">
            Placeholder
          </span>
        </component>
      </div>
    </div>

    <PaginationLinks :meta="imagesStore.meta" :links="imagesStore.links" @page-selected="loadPage"/>

  </MainSection>
</template>
<script setup>
import { onMounted } from "vue";
import {useImageStore} from "../stores/useImages";
import MainSection from "./MainSection.vue";
import PaginationLinks from "./PaginationLinks.vue";

const imagesStore = useImageStore();

const loadPage = (page) => {
  imagesStore.getImagesByPage(page);
}


onMounted(async () => {
  const page = new URLSearchParams(window.location.search).get('page');
  if (page) {
    console.log(page);
    imagesStore.getImagesByPage(page);
    return;
  }

  imagesStore.getImagesByLink();
});
</script>