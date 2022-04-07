<script setup lang="ts">
import imgImdb from "@/assets/images/imdb.jpeg"
import imgSteam from "@/assets/images/steam.jpeg"
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <h1 class="mt-16 md:mt-32 text-4xl md:text-6xl xl:text-7xl font-bold text-center leading-tight">
        Pre-Built <strong>Supabase DB</strong><br />
        for you to connect
      </h1>
      <p class="mt-4 text-center text-lg md:text-2xl opacity-50">
        Connect and play with Supabase REST API / Graphql easily
      </p>

      <div class="mt-16 lg:mt-32 grid lg:grid-cols-2 gap-8 lg:px-24">
        <div class="max-w-108 max-h-108 overflow-hidden rounded-3xl">
          <router-link to="/imdb">
            <img class="w-full h-full transform hover:scale-110 transition" :src="imgImdb" alt="" />
          </router-link>
        </div>
        <div class="max-w-108 max-h-108 overflow-hidden rounded-3xl">
          <router-link to="/steam">
            <img class="w-full h-full transform hover:scale-110 transition" :src="imgSteam" alt="" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
