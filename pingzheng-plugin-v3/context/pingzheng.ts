import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {createApp} from 'vue';
import App from './App.vue';
import {key, store} from './store';

const dom = () => document.body.appendChild(document.createElement('div'));
createApp(App).use(ElementPlus).use(store, key).mount(dom());
