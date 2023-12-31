import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import emitter from '@/mitt';

const app = createApp(App).use(store).use(router);
app.config.globalProperties.$mitt = emitter;
app.mount('#app');
