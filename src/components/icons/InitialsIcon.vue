<template>
  <div class="h-10 w-10 rounded-full border flex items-center justify-center text-sm">
    {{ auth.userInitials }}
  </div>
</template>
<script setup>
import {useAuthStore} from "../../stores/useAuth";

const auth = useAuthStore();
</script>