<script setup lang="ts">
import bannerImdb from "@/assets/images/imdb_banner.jpeg"
import CodeInit from "@/components/CodeInit.vue"

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
  <div class="md:pr-6">
    <img class="rounded-2xl md:rounded-3xl lg:rounded-4xl" :src="bannerImdb" alt="Imdb banner" />
    <p class="mt-4 text-xl md:text-2xl font-medium">
      IMDb is so popular for begineer tutorial, how can I not turn it into <strong>Supabase Database</strong>?
    </p>

    <section class="mt-6">
      <CodeInit title="imdb"></CodeInit>

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
