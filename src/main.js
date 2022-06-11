import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(undefined, function(error) {
    switch (error.response.status) {
        case 401:
        case 419:
        case 503:
            window.location.reload();
            break;
        case 500:
            alert('500 alert');
            break;
        default:
            return Promise.reject(error);
    }
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");
