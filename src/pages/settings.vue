<script setup lang="ts">
import { store } from "@/store"
import { ref } from "vue"
import * as shiki from "shiki"

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

let code = ref(`const supabase = createClient("${config.value.url}", 
  "${config.value.anon}", {
  headers: {
    Authorization: "Bearer ${config.value.auth}"
  }
})`)

shiki.setCDN("/node_modules/shiki/")
shiki
  .getHighlighter({
    theme: "dark-plus",
  })
  .then((highlighter) => {
    code.value = highlighter.codeToHtml(code.value, { lang: "ts" })
  })
</script>

<template>
  <div>
    <h2 class="opacity-50 text-4xl font-semibold">Settings</h2>

    <div class="mt-6 flex flex-col">
      <label for="url">Supabase URL</label>
      <input id="url" type="text" disabled :value="config.url" />
      <label for="url">Supabase Anon Key</label>
      <input type="text" disabled :value="config.anon" />
      <label for="url">Authorization Key</label>
      <input type="text" disabled :value="config.auth" />
    </div>

    <h2 class="opacity-50 mt-12 text-4xl font-semibold">Initiate Supabase Client</h2>
    <p class="text-lg">Simply copy and paste the snippet below to initiate Supabase Client</p>

    <div class="truncate" v-html="code"></div>
  </div>
</template>
