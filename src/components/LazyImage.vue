<script setup lang="ts">
import { ref } from "vue"

const props = defineProps({
  src: String,
})
const isLoading = ref(true)
const image = new URL(`../assets/images/${props.src}`, import.meta.url).href
const imageBlur = new URL(`../assets/images/${props.src?.replace(/(\.[\w\d_-]+)$/i, "_blur$1")}`, import.meta.url).href

const imageLoaded = () => {
  isLoading.value = false
}
</script>

<template>
  <img
    v-bind="$attrs"
    decoding="async"
    :src="isLoading ? imageBlur : image"
    @load="imageLoaded"
    :class="[isLoading ? 'grayscale blur-xl' : 'grayscale-0 blur-0']"
    class="duration-300 ease-in-out filter"
  />
  <img :src="image" class="hidden" v-if="isLoading" />
</template>
