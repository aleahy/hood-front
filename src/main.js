import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";




axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
// axios.interceptors.response.use(undefined, function(error) {
//     switch (error.response.status) {
//         case 401:
//         case 419:
//         case 503:
//             window.location.reload();
//             break;
//         case 500:
//             alert('500 alert');
//             break;
//         default:
//             return Promise.reject(error);
//     }
// });
window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'abcdef',
    cluster: 'mt1',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            }
        };
    },
});
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");

