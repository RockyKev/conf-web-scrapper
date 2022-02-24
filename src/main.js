import { createApp } from 'vue'
import App from './App.vue'
import VueGoodTablePlugin from 'vue-good-table-next';

// import the styles 
import 'vue-good-table-next/dist/vue-good-table-next.css'

// ORIGINAL VERSION
// createApp(App).mount('#app')

// NEW VERSION
const vueApp = createApp(App);

vueApp.use(VueGoodTablePlugin);

vueApp.mount("#app");