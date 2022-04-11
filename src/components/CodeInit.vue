<script setup lang="ts">
import { ref, watch } from "vue"
import { highlighter } from "@/plugins/shiki"

const props = defineProps({
  title: String,
})

const code = ref("")

code.value = highlighter.codeToHtml(code.value, "ts")

const tab = ref("supabase_client")
const tabs = [
  { name: "Supabase Client", value: "supabase_client" },
  { name: "Fetch", value: "fetch" },
]
watch(
  tab,
  (n) => {
    if (n == "supabase_client") {
      code.value = highlighter.codeToHtml(
        `const supabase = createClient(...)  // Login to get receive credential

const { data, error } = await supabase.from("${props.title}").select("*")
`,
        "ts"
      )
    } else if (n == "fetch") {
      code.value = highlighter.codeToHtml(
        `fetch('${import.meta.env.VITE_SUPABASE_URL}/rest/v1/${props.title}?select=*', {
  headers: {
    apikey: ...,      // Login to get receive credential
    Authorization: 'Bearer ...'
  }
})`,
        "ts"
      )
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <Tabs v-model="tab" :tabs="tabs"></Tabs>
    <div v-html="code"></div>
  </div>
</template>
