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
  <div class="">
    <router-link to="/">
      <h1 class="p-6 text-4xl font-bold">SupaDB</h1>
    </router-link>
    <div class="flex">
      <aside class="p-6 text-2xl">
        <i-mdi:cog></i-mdi:cog>
      </aside>
      <div class="w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
