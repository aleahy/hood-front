<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-white border-b border-gray-200" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"  active-class="border-indigo-500 border-b-2" >
                {{ item.name }}
              </RouterLink>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">


            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Open user menu</span>
                  <InitialsIcon />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <RouterLink :to="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                      {{ item.name }}
                    </RouterLink>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>


          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
                      active-class="bg-indigo-50 border-indigo-500 "
            class="hover:text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-800"
          >
            {{ item.name }}
          </RouterLink>

        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <InitialsIcon />

            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ auth.user.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ auth.user.email }}</div>
            </div>

          </div>
          <div class="mt-3 space-y-1">
            <RouterLink v-for="item in userNavigation" :key="item.name" :to="item.href" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              {{ item.name }}
            </RouterLink>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <FlashNotification :timeout="3000" />
    <slot></slot>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import InitialsIcon from "../components/icons/InitialsIcon.vue";
import FlashNotification from "../components/FlashNotification.vue";
import {onMounted} from "vue";
import {useAuthStore} from "../stores/useAuth";
import {useNotificationsStore} from "../stores/useNotifications";

const auth = useAuthStore();
const notificationStore = useNotificationsStore();

const navigation = [
  { name: 'Collected Images', href: { name: 'home'} },
  { name: 'Add Images', href: { name: 'addImage'} },
];

const userNavigation = [
  { name: 'Sign out', href: { name: 'logout' } },
];

onMounted(() => {
  notificationStore.listenToImageRetrievedEvent('App.Models.User.' + auth.user.id);
});
</script>