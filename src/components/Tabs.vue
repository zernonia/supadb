<script setup lang="ts">
import { PropType } from "vue"

interface Tab {
  name: string
  value: string
}

const props = defineProps({
  modelValue: String,
  tabs: Object as PropType<Tab[]>,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
</script>

<template>
  <div class="flex">
    <button
      v-for="tab in tabs"
      @click="emit('update:modelValue', tab.value)"
      class="link border-b-3 border-transparent !rounded-b-none text-true-gray-400"
      :class="{ 'border-yellow-300 !text-light-900  ': modelValue == tab.value }"
    >
      Supabase Client
    </button>
  </div>
</template>
