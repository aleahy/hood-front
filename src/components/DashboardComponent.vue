<template>
  <div>
    <div class="px-4 sm:px-0 mt-4">
      <RouterLink :to="{ name: 'addImage'}" class="bg-violet-900 text-white rounded py-2 px-4 hover:bg-violet-500 disabled:opacity-50">Add More</RouterLink>
    </div>

    <div v-if="imagesStore.isLoading" class="skeleton-images py-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
      <div v-for="item in 12" :key="item" class="bg-gray-100 w-64 h-48 animate-pulse"></div>
    </div>

    <div v-else>
      <div class="mt-8" v-if="! imagesStore.hasImages">
        <p>There aren't any images. Why don't you add some?</p>
      </div>

      <div class="py-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        <div v-for="image in imagesStore.images"
             :key="image.id">
          <component :is="image.url ? 'img' : 'div'"
                     :src="image.url"
                     class="rounded border border-gray-300 shadow-lg "
                     style="max-height: 160px; max-width: 256px "
                     :class="{'w-64 h-40 flex grid place-items-center': !image.url}"
          >
          <span v-if="!image.url">
            Image Not Retrieved
          </span>
          </component>
        </div>
      </div>
    </div>

    <PaginationLinks :meta="imagesStore.meta" :links="imagesStore.links" @page-selected="loadPage"/>

  </div>
</template>
<script setup>
import { onMounted } from "vue";
import {useImageStore} from "../stores/useImages";
import PaginationLinks from "./PaginationLinks.vue";

const imagesStore = useImageStore();

const loadPage = (page) => {
  imagesStore.getImagesByPage(page);
}


onMounted(async () => {
  const page = new URLSearchParams(window.location.search).get('page');
  if (page) {
    imagesStore.getImagesByPage(page);
    return;
  }

  imagesStore.getImagesByLink();
});
</script>