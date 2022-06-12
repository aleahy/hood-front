import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
    state: () => ({
        notifications: [],
        channels: [],
    }),

    getters: {
        count: (state) => state.notifications.length,
    },

    actions: {
       listenToImageRetrievedEvent(channel) {
           window.Echo.private(channel)
               .listen('ImageRetrievedEvent', (e) => {
                   console.log(e);
                   this.notifications.push(this.createImageRetrievedNotification())
               })
               .listen('ImageRetrievalFailedEvent', (e) => {
                   console.log(e);
                   this.notifications.push(this.createImageRetrievalFailedNotification())
               })
       },

        createImageRetrievedNotification() {
           return {
               status: 'success',
               message: 'Your image has been successfully retrieved and saved.',
           }
        },
        createImageRetrievalFailedNotification() {
           return {
               status: 'error',
               message: 'There was a problem retrieving your image.',
           }
        }

    }
});

