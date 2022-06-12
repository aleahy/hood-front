<template>
  <div v-if="hasMultiplePages" class="px-6 sm:px-0 mt-4 flex justify-between items-center">
    <button type="button"
            @click="prevPage"
            :disabled="!hasPreviousPage"
            class="border px-2 py-1 rounded shadow disabled:opacity-50">
      Previous
    </button>
    <div>Page {{ meta.current_page }}</div>
    <button type="button"
            @click="nextPage"
            :disabled="!hasNextPage"
            class="border px-2 py-1 rounded shadow disabled:opacity-50">
      Next
    </button>

  </div>
</template>
<script setup>
import {computed} from "vue";

const props = defineProps({
  meta: {
    type: Object,
  },
  links: {
    type: Object,
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
  return props.meta.last_page !== 1;
});


const hasPreviousPage = computed(() => {
  return !!props.links.prev;
});

const hasNextPage = computed(() => {
  return !!props.links.next;
});
</script>