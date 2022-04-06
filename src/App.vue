<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
  <div class="min-w-screen min-h-screen flex flex-col justify-center items-center">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Vite Haste ➹" />
    <router-view></router-view>
  </div>
</template>
