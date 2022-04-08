<script setup lang="ts">
import bannerSteam from "@/assets/images/steam_banner.jpeg"
import BasePage from "@/components/BasePage.vue"

const dictionary = [
  { name: "id", type: "number", value: "915810" },
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
  <BasePage :dictionary="dictionary" title="steam" :banner="bannerSteam">
    <template #description>
      STEAM is included into <strong>Supabase Database</strong> because I can't find any STEAM marketplace API.
    </template>
  </BasePage>
</template>
