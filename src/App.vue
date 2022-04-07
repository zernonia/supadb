<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue"
import { supabase } from "./plugins/supabase"
import { store } from "@/store"
onBeforeMount(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log({ event, session })
    if (event == "SIGNED_IN") {
      store.user = session?.user
    } else if (event == "SIGNED_OUT") {
      store.user = null
    }
  })
})
</script>

<template>
  <div class="bg-dark-500 flex h-full h-screen min-h-screen justify-center p-6 overflow-y-auto">
    <div class="max-w-screen-xl w-full h-full flex flex-col">
      <div>
        <router-link
          class="flex w-max px-6 py-3 text-5xl font-bold bg-transparent hover:bg-dark-300 transition rounded-2xl"
          to="/"
        >
          <h1>SupaDB</h1>
        </router-link>
      </div>
      <div class="flex">
        <aside class="p-3 text-2xl flex flex-col space-y-4 w-20">
          <router-link to="/" class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-xl transition">
            <i-heroicons-outline:home></i-heroicons-outline:home>
          </router-link>
          <router-link
            :to="store.user ? '/settings' : '/login'"
            class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-xl transition"
          >
            <i-heroicons-outline:user-circle></i-heroicons-outline:user-circle>
          </router-link>

          <div class="px-4">
            <div class="h-1 rounded-full bg-gray-100 w-full"></div>
          </div>

          <router-link to="/imdb" class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-xl transition">
            <i-simple-icons:imdb></i-simple-icons:imdb>
          </router-link>
          <router-link to="/steam" class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-xl transition">
            <i-simple-icons:steam></i-simple-icons:steam>
          </router-link>
        </aside>
        <div class="p-3 w-[calc(100%-5rem)]">
          <router-view></router-view>
        </div>
      </div>
      <div class="flex items-center mt-auto pt-12">
        <router-link to="/"> Terms & Condition </router-link>
        |
        <p class="flex items-center w-max px-6 py-3 font-semibold">
          Coded with 💚 by <a href="https://twitter.com/zernonia">Zernonia</a>
        </p>
      </div>
    </div>
  </div>
</template>
