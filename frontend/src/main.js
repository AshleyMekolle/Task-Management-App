import { __awaiter } from "tslib";
import { createApp, ref } from 'vue';
import App from './App.vue';
import axios from 'axios';
const app = createApp(App);
// Configure Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const getCsrfToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get('http://127.0.0.1:8000/csrf-token');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
});
const csrfToken = ref(null);
const initializeCsrfToken = () => __awaiter(void 0, void 0, void 0, function* () {
    csrfToken.value = yield getCsrfToken();
});
axios.interceptors.request.use((config) => {
    var _a;
    if (csrfToken.value && ['post', 'put', 'delete'].includes((_a = config.method) !== null && _a !== void 0 ? _a : '')) {
        config.headers['X-CSRF-TOKEN'] = csrfToken.value;
    }
    return config;
}, (error) => Promise.reject(error));
initializeCsrfToken();
app.provide('csrfToken', csrfToken);
app.config.globalProperties.$axios = axios;
app.mount('#app');
//# sourceMappingURL=main.js.map