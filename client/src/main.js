import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from "vuex"; 
import router from './router'

const store = createStore({
  state: {
    hasiDB: [],
    historyDB: [],
    tikSintetik: [],
    count: 0,
    hist_count: 0,
  },
});

const app = createApp(App);
app.use(store).use(router);
app.mount('#app')