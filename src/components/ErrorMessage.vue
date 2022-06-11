<template>
  <div v-if="errors.errors[field]" class="text-xs text-red-500">
    {{ errors.errors[field][0] }}
  </div>
</template>
<script setup>
import {useErrorStore} from "../stores/useError";

const errors = useErrorStore();

defineProps({
  field: {
    type: String,
    required: true,
  },
});
</script>
