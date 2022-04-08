<script setup lang="ts">
import bannerImdb from "@/assets/images/imdb_banner.jpeg"

const dictionary = [
  { name: "id", type: "string", value: "tt0050051" },
  {
    name: "image",
    type: "string",
    value: "https://m.media-amazon.com/images/M/MV5BZjEzYmZk...",
  },
  { name: "link", type: "string", value: "https://www.imdb.com/title/tt0050051/?ref_=adv_li_i" },
  { name: "title", type: "string", value: "Perry Mason" },
  { name: "year", type: "string", value: "1957–1966" },
  { name: "certificate", type: "string", value: "TV-PG" },
  { name: "duration", type: "number", value: 60 },
  { name: "genre", type: "string[]", value: ["Crime", "Drama", "Mystery"] },
  { name: "rating", type: "number", value: 8.4 },
  { name: "metascore", type: "number", value: 20 },
  {
    name: "description",
    type: "string",
    value: "The cases of a master criminal defens...",
  },
  { name: "vote", type: "number", value: "8645" },
]
</script>

<template>
  <BasePage :dictionary="dictionary" title="imdb" :banner="bannerImdb">
    <template #description>
      IMDb is so popular for begineer tutorial, how can I not turn it into <strong>Supabase Database</strong>?
    </template>
  </BasePage>
</template>
