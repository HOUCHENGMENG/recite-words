import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./styles/main.css";
import pinia from "./pinia/index";
//element样式
import "element-plus/dist/index.css";
//element夜间主题样式
import "element-plus/theme-chalk/dark/css-vars.css";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(router);
app.use(pinia);

app.mount("#app");
