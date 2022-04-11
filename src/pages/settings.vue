<script setup lang="ts">
import { store } from "@/store"
import { computed, ref, watch } from "vue"
import { useClipboard } from "@vueuse/core"
import { highlighter } from "@/plugins/shiki"

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

const code = ref("")
const tab = ref("supabase_client")
const tabs = [
  { name: "Supabase Client", value: "supabase_client" },
  { name: "Fetch", value: "fetch" },
]

const applyShiki = () => {
  if (tab.value == "supabase_client") {
    code.value = highlighter.codeToHtml(
      `const supabase = createClient("${config.value.url}", 
  "${config.value.anon}", {
  headers: {
    Authorization: "Bearer ${config.value.auth}"
  }
})`,
      "ts"
    )
  } else if (tab.value == "fetch") {
    code.value = highlighter.codeToHtml(
      `fetch("${config.value.url}/rest/v1/<table>?select=*", {
  headers: {
    apikey: "${config.value.anon}"
    Authorization: "Bearer ${config.value.auth}"
  }
})`,
      "ts"
    )
  }
}

watch([tab, config], () => applyShiki(), { immediate: true, deep: true })

const { copy, copied } = useClipboard({ source: code.value })
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

    <Tabs v-model="tab" :tabs="tabs"></Tabs>
    <div class="truncate" v-html="code" :class="{ 'animate-head-shake': copied }"></div>
  </div>
</template>
