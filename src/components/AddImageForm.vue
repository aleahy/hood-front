<template>
  <div class="pt-10">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="image_uri" class="">
          <span class="whitespace-nowrap">Image URI</span>
          <input type="text" v-model="imageUri" class="border px-2 py-1 shadow w-full rounded" id="image_uri" name="image_uri">
        </label>
      </div>
      <PrimaryButton type="submit" class="mt-4">Submit Image</PrimaryButton>
    </form>

    <div class="mt-10">
      <img v-show="displayImage" :src="imageUri" @error="hideImage"/>
    </div>
  </div>
</template>
<script setup>
import PrimaryButton from "./PrimaryButton.vue";
import {ref, watch } from "vue";
import {useErrorStore} from "../stores/useError";
import {useImageStore} from "../stores/useImages";

const imageUri = ref('');
const displayImage = ref(false);
const imageStore = useImageStore();
const errors = useErrorStore();

const hideImage = () => {
  displayImage.value = false;
};

const onSubmit = () => {
  imageStore.postImageUri(imageUri.value)
    .then()
    .catch(({response}) => {
      errors.storeErrorsResponse(response);
    });
};

watch(imageUri, () => {
  console.log('changed');
  displayImage.value = true;
});
</script>