<script setup lang="ts">
import { getHighlighter, setCDN } from "shiki"
import { ref } from "vue"

const props = defineProps({
  title: String,
})

let code = ref(`const supabase = createClient(...)  // Login to get receive credential

const { data, error } = await supabase.from("${props.title}").select("*")
`)

setCDN(import.meta.env.DEV ? "node_modules/shiki/" : "/shiki/")
getHighlighter({
  theme: "dark-plus",
}).then((highlighter) => {
  code.value = highlighter.codeToHtml(code.value, { lang: "ts" })
})
</script>

<template>
  <div v-html="code"></div>
</template>
