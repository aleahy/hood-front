<template>
  <div>
    <div v-show="!showImage" class="rounded w-64 h-48 bg-gray-400 flex items-center justify-center">
      <span v-show="showError" class="text-2xl font-medium text-gray-600">Error</span>
      <SpinnerIcon v-show="showLoading" />
      <span v-show="emptyUri" class="text-2xl font-medium text-gray-600">Preview</span>
    </div>

    <img v-show="showImage"
         class="w-64 rounded"
         :src="imageUri"
         @error="onError"
         ref="imgContainer"
         alt="preview"/>
    </div>
</template>
<script setup>
import {computed, ref, watch} from "vue";
import SpinnerIcon from "./icons/SpinnerIcon.vue";

const props = defineProps({
  imageUri: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['hasError', 'isValid']);

const showImage = ref(false);
const imgContainer = ref(null);
const isError = ref(false);
let intervalId = 0;

const checkLoaded = () => {
  if (imgContainer.value.complete) {
    showImage.value = true;
    clearInterval(intervalId);
  }
};
const onError = () => {
  clearInterval(intervalId);
  isError.value = true;
};
const emptyUri = computed(() => {
  return !props.imageUri;
});
const showError = computed(() => {
  return isError.value && !emptyUri.value && !showImage.value;
});
const showLoading = computed(() => {
  return !isError.value && !emptyUri.value && !showImage.value;
});

watch(() => props.imageUri, () => {
    isError.value = false;
    showImage.value = false;
    intervalId = setInterval(checkLoaded, 50);
});
watch(isError, (value) => {
  emit("hasError", value);
});
watch(showImage, (value) => {
  emit('isValid', value);
});

</script>