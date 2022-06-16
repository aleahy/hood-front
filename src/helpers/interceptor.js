import axios from "axios";
import {useAuthStore} from "../stores/useAuth";

export default function setup() {
    axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
    axios.defaults.withCredentials = true;

    axios.interceptors.response.use(undefined, function (error) {
        switch (error.response.status) {
            case 401:
            case 419:
            case 503:
                useAuthStore().reset();
                window.location.reload();
                break;

            default:
                return Promise.reject(error);
        }
    });
};