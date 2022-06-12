<template>
  <transition enter-active-class="transition-opacity ease-in duration-300"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition ease-in duration-700"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0">
  <div v-show="show" class=" h-12 bg-green-300 mt-2 flex items-center text-green-800 px-12 mx-2 border-l-4 border-green-600">
    {{ flashMessage }}
  </div>
  </transition>
</template>
<script setup>
import { ref } from "vue";
import { useNotificationsStore } from "../stores/useNotifications";

const flashMessage = ref('');
const show = ref(false);
let timer = 0;

const flash = (message) => {
  if (! message) {
    return;
  }

  flashMessage.value = message;
  show.value = true;

  hideWithTimeout();
};

const hide = () => {
  show.value = false;
};

const hideWithTimeout = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    hide();
  }, 2000);
};

const notificationsStore = useNotificationsStore();
notificationsStore.$subscribe((mutation) => {
  if (mutation.events.type === 'add') {
    flash(mutation.events.newValue?.message);
  }
})

</script>