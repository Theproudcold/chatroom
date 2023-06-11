import { createApp } from "vue";
// 引入路由
import router from "./router";
import App from "./App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
const pinia = createPinia();

pinia.use(piniaPluginPersist);
createApp(App).use(pinia).use(router).mount("#app");
