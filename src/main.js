import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import store from "./store";
import App from "./App.vue";
import "./assets/index.css";
import HomePage from "./pages/HomePage.vue";
import StartPage from "./pages/StartPage.vue";

const routes = [
  { path: "/", component: StartPage },
  { path: "/:max", component: HomePage, props: true },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).use(store).mount("#app");
