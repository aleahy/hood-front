<template>
  <transition enter-active-class="transition-opacity ease-in duration-300"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition ease-in duration-700"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0">
  <div v-show="show"
       class="h-12 mt-2 flex items-center px-12 mx-2 border-l-4"
       :class="{'bg-green-300 text-green-800 border-green-600': flashStatus === 'success',
                'bg-red-300 text-red-800 border-red-600': flashStatus !== 'success'}">
    {{ flashMessage }}
  </div>
  </transition>
</template>
<script setup>
import { ref } from "vue";
import { useNotificationsStore } from "../stores/useNotifications";

const props = defineProps({
  timeout: {
    type: Number,
    default: 5000,
  },
});

const flashMessage = ref('');
const flashStatus = ref('success');

const show = ref(false);
let timer = 0;

const flash = (message, status = 'success') => {
  if (! message) {
    return;
  }

  flashMessage.value = message;
  flashStatus.value = status;

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
  }, props.timeout);
};

const notificationsStore = useNotificationsStore();
notificationsStore.$subscribe((mutation) => {
  if (mutation.events.type === 'add') {
    flash(mutation.events.newValue?.message, mutation.events.newValue?.status ?? 'success');
  }
})

</script>