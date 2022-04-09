<script setup lang="ts">
import CodeInit from "@/components/CodeInit.vue"
import { ref } from "vue"
import CodeGraphql from "./CodeGraphql.vue"
import LazyImage from "./LazyImage.vue"

const props = defineProps({
  dictionary: Object,
  banner: String,
  title: String,
})

const isLoading = ref(true)
</script>

<template>
  <div class="md:pr-6">
    <LazyImage
      class="min-h-48 md:h-76 object-cover w-full rounded-2xl md:rounded-3xl lg:rounded-4xl"
      alt="Steam banner"
      :src="banner"
    ></LazyImage>

    <p class="mt-4 text-xl md:text-2xl font-medium">
      <slot name="description"></slot>
    </p>

    <section class="mt-6">
      <CodeInit :title="title"></CodeInit>
      <div class="flex flex-col md:flex-row items-center justify-center">
        <div
          class="md:w-1/2 items-center justify-center h-full text-2xl md:text-4xl md:text-center md:leading-12 font-semibold opacity-50"
        >
          Or...
          <br class="hidden md:block" />
          with Graphql
        </div>
        <CodeGraphql class="md:min-w-96 w-full md:w-1/2 md:ml-6" :title="title"></CodeGraphql>
      </div>

      <div class="mt-6">
        <h4 class="text-yellow-300 text-2xl md:text-3xl font-semibold">Dictionary</h4>
        <div class="mt-3">
          <div class="px-6 py-3 flex w-full opacity-50">
            <div class="w-1/3 flex-shrink-0">name</div>
            <div class="w-1/5 flex-shrink-0 mx-3">type</div>
            <div class="w-full">value</div>
          </div>
          <ul class="p-3 rounded-2xl bg-dark-300">
            <li
              class="px-3 py-2 flex bg-transparent hover:bg-dark-100 transition rounded-xl"
              v-for="item in dictionary"
            >
              <div class="w-1/3 flex-shrink-0">{{ item.name }}</div>
              <div class="w-1/5 flex-shrink-0 mx-3">{{ item.type }}</div>
              <div class="w-full truncate">{{ item.value }}</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
