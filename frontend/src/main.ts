import { createApp, ref } from 'vue';
import App from './App.vue';
import axios from 'axios';
import type { App as VueApp, Ref } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

const app: VueApp = createApp(App);

// Configure Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; 
axios.defaults.withCredentials = true; 
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const getCsrfToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/csrf-token');
    return response.data; 
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

const csrfToken: Ref<string | null> = ref(null);

const initializeCsrfToken = async () => {
  csrfToken.value = await getCsrfToken();
};

axios.interceptors.request.use(
  (config) => {
    if (csrfToken.value && ['post', 'put', 'delete'].includes(config.method ?? '')) {
      config.headers['X-CSRF-TOKEN'] = csrfToken.value;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

initializeCsrfToken();
app.provide('csrfToken', csrfToken);
app.config.globalProperties.$axios = axios;
app.mount('#app');