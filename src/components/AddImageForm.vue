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
      <PrimaryButton type="submit" class="mt-4 inline-flex items-center space-x-3" :disabled="preventSubmit ? true : undefined">
        <span>Submit Image</span>
        <SpinnerIcon v-show="isSubmitting"/>
      </PrimaryButton>
    </form>

    <ImagePreview :image-uri="debouncedImageUri" class="mt-4" @has-error="updatePreviewError" @is-valid="updateIsValidImage"/>
  </div>
</template>
<script setup>
import PrimaryButton from "./PrimaryButton.vue";
import ErrorMessage from "./ErrorMessage.vue";
import SpinnerIcon from "./icons/SpinnerIcon.vue";
import ImagePreview from "./ImagePreview.vue";

import {ref, watch } from "vue";
import {useErrorStore} from "../stores/useError";
import {useImageStore} from "../stores/useImages";

import debounce from 'lodash/debounce';


const preventSubmit = ref(true);
const isSubmitting = ref(false);
const imageUri = ref('');
const imageStore = useImageStore();
const errorsStore = useErrorStore();
const previewError = ref(false);
const debouncedImageUri = ref('');


const resetForm = () => {
  imageUri.value = "";
  preventSubmit.value = false;
  isSubmitting.value = false;
};

const onSubmit = () => {
  errorsStore.$reset();
  preventSubmit.value = true;

  if (previewError.value) {
    errorsStore.setErrorForField('image_uri', 'This is not a valid image.');
    preventSubmit.value = false;
    return;
  }

  isSubmitting.value = true;
  imageStore
    .postImageUri(imageUri.value)
    .then(() => {
      resetForm();
    })
    .catch(({response}) => {
      errorsStore.storeErrorsResponse(response);
      isSubmitting.value = false;
      preventSubmit.value = false;
    });
};

const updatePreviewError = (hasError) => {
  previewError.value = hasError;
};

const updateIsValidImage = (isValid) => {
  preventSubmit.value = !isValid;
};

watch(imageUri, debounce((value) => {
  debouncedImageUri.value = value;
}, 200));
</script>