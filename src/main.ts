import { createApp } from "vue"
import App from "./App.vue"
import "virtual:windi.css"
import "./assets/main.css"
import { initHighlighter } from "./plugins/shiki"
import { router } from "./plugins/router"

initHighlighter().then(() => {
  createApp(App).use(router).mount("#app")
})
