<template>
  <div v-if="hasMultiplePages" class="px-6 sm:px-0 mt-4 flex justify-between items-center">
    <button type="button"
            @click="prevPage"
            :disabled="!hasPreviousPage"
            class="border hover:bg-gray-100 disabled:hover:bg-white px-2 py-1 rounded shadow disabled:opacity-30 inline-flex justify-center items-center space-x-4">
      <ChevronLeftIcon class="w-5 h-5"/>
      <span>Prev</span>
    </button>
    <div>Page {{ meta.current_page }}</div>
    <button type="button"
            @click="nextPage"
            :disabled="!hasNextPage"
            class="border hover:bg-gray-100 disabled:hover:bg-white px-2 py-1 rounded shadow disabled:opacity-30 inline-flex justify-center items-center space-x-4">
      <span>Next</span>
      <ChevronRightIcon class="w-5 h-5" />
    </button>

  </div>
</template>
<script setup>
import {computed} from "vue";
import {ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline"
const props = defineProps({
  meta: {
    type: Object,
    default() {
      return {};
    },
  },
  links: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits(['pageSelected']);

const nextPage = () => {
  const page = props.meta.current_page + 1;
  emit('pageSelected', page);
};

const prevPage = () => {
  const page = props.meta.current_page - 1;
  emit('pageSelected', page);
};

const hasMultiplePages = computed(() => {
  return props.meta.last_page !== 1 && Object.keys(props.links).length !== 0;
});


const hasPreviousPage = computed(() => {
  return !!props.links.prev;
});

const hasNextPage = computed(() => {
  return !!props.links.next;
});
</script>