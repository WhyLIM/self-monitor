// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useSocketStore } from '@/stores/socketStore';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// FontAwesome 导入和注册
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCode, faCircleQuestion, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faEdge } from '@fortawesome/free-brands-svg-icons';

library.add(faCode, faCircleQuestion, faArrowRight, faEdge);

// 创建 Vue 应用实例
const app = createApp(App);

// 配置 Pinia 和 WebSocket
const pinia = createPinia();
app.use(pinia);

const socketStore = useSocketStore();
socketStore.connect(); // 全局初始化 WebSocket

// 注册插件和组件
app.use(ElementPlus);
app.component('font-awesome-icon', FontAwesomeIcon);

// 挂载应用
app.mount('#app');
