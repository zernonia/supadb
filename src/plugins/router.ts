import { store } from "@/store"
import { createRouter, createWebHistory } from "vue-router"
import routes from "~pages"

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const toName = to.name?.toString() ?? ""
  if (!store.user && toName.includes("settings")) {
    return { name: "login" }
  }
})
