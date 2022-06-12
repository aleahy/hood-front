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
            try {
                const url = this.endPoint + '?page=' + page;
                const { data } = await axios.get(url);
                this.processResults(data);
            } finally {
                this.loading = false;
            }
        },


        async getImagesByLink(link = this.endPoint) {
            this.loading = true;
            try {
                const {data} = (await axios.get(link));
                this.processResults(data);
            } finally {
                this.loading = false;
            }
        },


        async postImageUri(uri) {
            this.loading = true;
            try {
                await axios.post(this.endPoint, {
                    image_uri: uri,
                });
            } finally {
               this.loading = false;
            }
        },


        processResults(data) {
            this.images = data?.data ?? [];
            this.meta = data?.meta ?? {};
            this.links = data?.links ?? {};
        }
    }
});

