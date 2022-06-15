import { createApp } from "vue";
import { createPinia } from "pinia";
import interceptorSetup from "./helpers/interceptor";
import echoSetup from "./helpers/echo";

import App from "./App.vue";
import router from "./router";
import "./index.css";

interceptorSetup();
echoSetup();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount("#app");

