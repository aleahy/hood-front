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
        previousUrl: (state) => {
            return state.links.prev;
        },
        nextUrl: (state) => {
            return state.links.next;
        },
        currentPage: (state) => {
            return state.meta.current_page;
        },
        total: (state) => {
            return state.meta.total;
        },
        lastPage: (state) => {
            return state.meta.last_page;
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

