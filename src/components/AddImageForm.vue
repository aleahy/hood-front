<template>
  <div class="pt-10">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="image_uri" class="">
          <span class="whitespace-nowrap">Image URI</span>
          <input type="text" v-model="imageUri" class="border px-2 py-1 shadow w-full rounded" id="image_uri" name="image_uri">
        </label>
      </div>
      <ErrorMessage field="image_uri" class="mt-2"/>
      <PrimaryButton type="submit" class="mt-4">Submit Image</PrimaryButton>
    </form>

    <div class="mt-10">
      <img v-show="displayImage" class="w-64" :src="imageUri" @error="hideImage"/>
    </div>
  </div>
</template>
<script setup>
import PrimaryButton from "./PrimaryButton.vue";
import ErrorMessage from "./ErrorMessage.vue";
import {ref, watch } from "vue";
import {useErrorStore} from "../stores/useError";
import {useImageStore} from "../stores/useImages";

const imageUri = ref('');
const displayImage = ref(false);
const imageStore = useImageStore();
const errorsStore = useErrorStore();

const hideImage = () => {
  displayImage.value = false;
};

const resetForm = () => {
  imageUri.value = "";
};

const onSubmit = () => {
  errorsStore.$reset();

  if (!displayImage.value) {
    errorsStore.setErrorForField('image_uri', 'This is not a valid image.');
    return;
  }

  imageStore
    .postImageUri(imageUri.value)
    .then(() => {
      resetForm();
    })
    .catch(({response}) => {
      errorsStore.storeErrorsResponse(response);
    });
};

watch(imageUri, () => {
  displayImage.value = true;
});
</script>