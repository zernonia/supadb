<script setup lang="ts">
import { ref } from "vue"
import { highlighter } from "@/plugins/shiki"

const props = defineProps({
  title: String,
})

let code = ref(`query ${props.title}Query {
    ${props.title}Collection {
      edges {
        node {
          id
          title
          link
          image
          ...
      }
    }
  }
}`)

code.value = highlighter.codeToHtml(code.value, "graphql")
</script>

<template>
  <div v-html="code"></div>
</template>
