import { defineStore } from "pinia";
import axios from "axios";

export const useImageStore = defineStore("images", {
    state: () => ({
        endPoint: '/api/images',
        loading: false,
        images: [],
        meta: {},
        links: {},
    }),

    getters: {
        isLoading: (state) => {
            return state.loading;
        },
        hasImages: (state) => {
            return state.images.length > 0;
        }
    },

    actions: {
        async getImagesByPage(page= 1) {
            this.loading = true;
            const url = this.endPoint + '?page=' + page;
            console.log(url);
            const { data } = await axios.get(url);
            this.processResults(data);
            this.loading = false;
        },
        async getImagesByLink(link = this.endPoint) {
            this.loading = true;
            const { data } = (await axios.get(link));
            this.processResults(data);
            this.loading = false;
        },
        async postImageUri(uri) {
            await axios.post(this.endPoint, {
                image_uri: uri,
            });
        },
        processResults(data) {
            this.images = data?.data ?? [];
            this.meta = data?.meta ?? {};
            this.links = data?.links ?? {};
        }
    }
});

