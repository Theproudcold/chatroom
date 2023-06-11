import { createApp } from "vue";
import "./style.css";
// 引入路由
import router from "./router";
import App from "./App.vue";
const pinia = createPinia();

pinia.use(piniaPluginPersist);
createApp(App).use(pinia).use(router).mount("#app");
