<script setup lang="ts">
import { store } from "@/store"
import { computed, ref, watch } from "vue"
import * as shiki from "shiki"
import { useClipboard } from "@vueuse/core"

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

let code = computed(
  () => `const supabase = createClient("${config.value.url}", 
  "${config.value.anon}", {
  headers: {
    Authorization: "Bearer ${config.value.auth}"
  }
})`
)
let printedCode = ref("")

shiki.setCDN("/node_modules/shiki/")

const applyShiki = () => {
  shiki
    .getHighlighter({
      theme: "dark-plus",
    })
    .then((highlighter) => {
      printedCode.value = highlighter.codeToHtml(code.value, { lang: "ts" })
    })
}
applyShiki()
watch(code, () => applyShiki())

const { copy, copied } = useClipboard({ source: printedCode.value })
</script>

<template>
  <div>
    <h2 class="text-yellow-300 text-2xl md:text-4xl font-semibold">Settings</h2>

    <div class="mt-6 flex flex-col">
      <label for="url">Supabase URL</label>
      <input id="url" type="text" disabled :value="config.url" />
      <label for="url">Supabase Anon Key</label>
      <input type="text" disabled :value="config.anon" />
      <label for="url">Authorization Key</label>
      <input type="text" disabled :value="config.auth" />
    </div>

    <h2 class="text-yellow-300 mt-12 text-2xl md:text-4xl font-semibold">Initiate Supabase Client</h2>
    <div class="flex items-center justify-between">
      <p class="md:text-lg">Simply copy and paste the snippet below to initiate Supabase Client</p>
      <button
        @click="copy()"
        class="w-10 h-10 flex-shrink-0 p-2 rounded-xl bg-transparent hover:bg-dark-300 transition"
      >
        <i-heroicons-outline:clipboard-copy class="inline h-full w-full"></i-heroicons-outline:clipboard-copy>
      </button>
    </div>
    <div class="truncate" v-html="printedCode" :class="{ 'animate-head-shake': copied }"></div>
  </div>
</template>
