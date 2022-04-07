<script setup lang="ts">
import { store } from "@/store"
import { ref } from "vue"

const config = ref({
  url: import.meta.env.VITE_SUPABASE_URL,
  anon: import.meta.env.VITE_SUPABASE_ANON,
  auth: "",
})

const getAnonKey = () => {
  fetch("./api/user/generate", {
    method: "POST",
    body: JSON.stringify({
      id: store.user?.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => (config.value.auth = res.key))
}

getAnonKey()
</script>

<template>
  <div>
    <h2>Settings</h2>

    <div class="flex flex-col">
      <label for="url">Supabase URL</label>
      <input id="url" type="text" disabled :value="config.url" />
      <label for="url">Supabase Anon Key</label>
      <input type="text" disabled :value="config.anon" />
      <label for="url">Authorization Key</label>
      <input type="text" disabled :value="config.auth" />
    </div>
  </div>
</template>
