<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue"
import { supabase } from "./plugins/supabase"
import { store } from "@/store"

onBeforeMount(() => {
  let session = supabase.auth.session()
  if (session) store.user = session?.user
})

supabase.auth.onAuthStateChange((event, session) => {
  console.log({ event, session })
  if (event == "SIGNED_IN") {
    store.user = session?.user
  } else if (event == "SIGNED_OUT") {
    store.user = null
  }
})
</script>

<template>
  <div class="bg-dark-500 flex h-full h-screen min-h-screen justify-center p-3 md:p-6 overflow-y-auto">
    <div class="max-w-screen-xl w-full h-full flex flex-col relative">
      <div>
        <router-link class="flex w-max !font-bold text-3xl md:text-5xl link" to="/">
          <h1>SupaDB</h1>
        </router-link>
      </div>
      <div class="flex">
        <aside class="p-3 text-2xl flex -top-2 right-22 md:flex-col md:space-y-4 w-20 absolute md:static">
          <router-link
            to="/"
            class="hidden md:flex items-center justify-center p-3 bg-transparent hover:bg-dark-200 rounded-xl transition"
          >
            <i-heroicons-outline:home></i-heroicons-outline:home>
          </router-link>
          <router-link
            :to="store.user ? '/settings' : '/login'"
            class="flex items-center justify-center p-3 bg-transparent hover:bg-dark-200 rounded-xl transition"
          >
            <i-heroicons-outline:user-circle></i-heroicons-outline:user-circle>
          </router-link>

          <div class="px-4 hidden md:block">
            <div class="h-1 rounded-full bg-gray-100 w-full"></div>
          </div>

          <router-link
            to="/imdb"
            class="flex items-center justify-center p-3 bg-transparent hover:bg-dark-200 rounded-xl transition"
          >
            <i-simple-icons:imdb></i-simple-icons:imdb>
          </router-link>
          <router-link
            to="/steam"
            class="flex items-center justify-center p-3 bg-transparent hover:bg-dark-200 rounded-xl transition"
          >
            <i-simple-icons:steam></i-simple-icons:steam>
          </router-link>
        </aside>
        <div class="p-3 w-full md:w-[calc(100%-5rem)]">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:items-center mt-auto pt-12">
        <router-link class="link" to="/"> Terms & Condition </router-link>
        <span class="hidden md:block">|</span>

        <p class="flex items-center w-max px-6 font-semibold">
          Coded with 💛 by <a class="link" href="https://twitter.com/zernonia">Zernonia</a>
        </p>
      </div>
    </div>
  </div>
</template>
