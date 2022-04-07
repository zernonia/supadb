<script setup lang="ts">
import bannerSteam from "@/assets/images/steam_banner.jpeg"
import CodeInit from "@/components/CodeInit.vue"
const dictionary = [
  { name: "id", type: "string", value: "915810" },
  {
    name: "link",
    type: "string",
    value: "https://store.steampowered.com/app/915810/Midnight_Ghost_Hunt/?snr=1_241_4_action_103",
  },
  {
    name: "image",
    type: "string",
    value: "https://cdn.akamai.steamstatic.com/steam/apps/915810/capsule_184x69.jpg?t=1649315580",
  },
  { name: "title", type: "string", value: "Midnight Ghost Hunt" },
  { name: "price", type: "number", value: 19.99 },
  { name: "tags", type: "string[]", value: ["Early Access", "Combat", "Multiplayer", "Team-Based"] },
  { name: "platforms", type: "string[]", value: ["Windows"] },
  { name: "genre", type: "string", value: "action" },
]
</script>

<template>
  <div class="pr-6">
    <img class="rounded-4xl w-full" :src="bannerSteam" alt="Imdb banner" />
    <p class="mt-4 text-2xl font-medium">IMDb is the most popular web scraping ...</p>

    <section class="mt-6">
      <CodeInit title="steam"></CodeInit>

      <div class="mt-6">
        <h4 class="text-2xl font-medium">Dictionary</h4>
        <div class="mt-3">
          <div class="px-6 py-3 flex w-full opacity-50">
            <div class="w-1/3">name</div>
            <div class="w-1/5">type</div>
            <div class="w-full">value</div>
          </div>
          <ul class="p-3 rounded-2xl bg-dark-300">
            <li
              class="px-3 py-2 flex bg-transparent hover:bg-dark-100 transition rounded-xl"
              v-for="item in dictionary"
            >
              <div class="w-1/3">{{ item.name }}</div>
              <div class="w-1/5">{{ item.type }}</div>
              <div class="w-full truncate">{{ item.value }}</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
