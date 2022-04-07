<script setup lang="ts">
import { ref } from "vue"
import { highlighter } from "@/plugins/shiki"

const props = defineProps({
  title: String,
})

let code = ref(`const supabase = createClient(...)  // Login to get receive credential

const { data, error } = await supabase.from("${props.title}").select("*")
`)

code.value = highlighter.codeToHtml(code.value, { lang: "ts" })
</script>

<template>
  <div v-html="code"></div>
</template>
