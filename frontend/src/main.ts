import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

// Create the Vue app
const app = createApp(App);

// Set the base URL for Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// Enable credentials for Axios (important for Laravel APIs)
axios.defaults.withCredentials = true;

// Fetch the CSRF token from Laravel
const fetchCsrfToken = async () => {
    try {
        const response = await axios.get('/csrf-token');
        const csrfToken = response.data.csrf_token;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }
};

// Fetch the CSRF token when the app loads
fetchCsrfToken();

// Axios interceptor to handle CSRF token expiration
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 419) {
            // CSRF token expired, fetch a new one and retry the request
            await fetchCsrfToken();
            const config = error.config;
            config.headers['X-CSRF-TOKEN'] = axios.defaults.headers.common['X-CSRF-TOKEN'];
            return axios.request(config);
        }
        return Promise.reject(error);
    }
);

// Attach Axios to the Vue app instance for global access
app.config.globalProperties.$axios = axios;

// Mount the app
app.mount('#app');