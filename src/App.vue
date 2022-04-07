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
  <div class="bg-dark-500 min-h-screen flex justify-center">
    <div class="max-w-screen-xl w-full">
      <router-link to="/">
        <h1 class="p-6 text-5xl font-bold">SupaDB</h1>
      </router-link>
      <div class="flex">
        <aside class="p-3 text-2xl flex flex-col space-y-4">
          <router-link to="/" class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-lg transition">
            <i-heroicons-outline:home></i-heroicons-outline:home>
          </router-link>
          <router-link to="/login" class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-lg transition">
            <i-heroicons-outline:user-circle></i-heroicons-outline:user-circle>
          </router-link>

          <div class="h-1 rounded-full bg-gray-100 w-full"></div>

          <router-link to="/imdb" class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-lg transition">
            <i-simple-icons:imdb></i-simple-icons:imdb>
          </router-link>
          <router-link to="/steam" class="p-3 h-13 bg-transparent hover:bg-dark-200 rounded-lg transition">
            <i-simple-icons:steam></i-simple-icons:steam>
          </router-link>
        </aside>
        <div class="p-3 w-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
