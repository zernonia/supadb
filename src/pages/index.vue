<script setup lang="ts">
import imgImdb from "@/assets/images/imdb.jpeg"
import imgSteam from "@/assets/images/steam.jpeg"
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="mt-32 text-7xl font-bold text-center leading-tight">
        Try out Supabase Database <br />
        instantly!
      </h1>
      <p class="mt-4 text-2xl">Free & Open Source Database</p>

      <div class="mt-32 grid grid-cols-2 gap-x-8 px-24">
        <div class="max-w-108 max-h-108 overflow-hidden rounded-3xl">
          <router-link to="/imdb">
            <img class="w-full transform hover:scale-110 transition" :src="imgImdb" alt="" />
          </router-link>
        </div>
        <div class="max-w-108 max-h-108 overflow-hidden rounded-3xl">
          <router-link to="/steam">
            <img class="w-full transform hover:scale-110 transition" :src="imgSteam" alt="" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
