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
           console.log('Starting to listen to', channel);
           window.Echo.private(channel)
               .listen('ImageRetrievedEvent', (e) => {
                   this.notifications.push(this.createImageRetrievedNotification(e))
               })
       },

        createImageRetrievedNotification(data) {
           return {
               message: 'Your image has been successfully retrieved and saved.'
           }
        },
    }
});

