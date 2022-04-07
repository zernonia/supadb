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
  <router-view></router-view>
</template>
