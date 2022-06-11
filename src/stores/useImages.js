import { defineStore } from "pinia";
import axios from "axios";

export const useImageStore = defineStore("images", {
    state: () => ({
        images: [],
    }),

    actions: {
        async getImages() {
            this.images = (await axios.get('/api/images')).data
        },

        async postImageUri(uri) {
            const image = (await axios.post('/api/images', {
                image_uri: uri,
            })).data
        }
    }
});

