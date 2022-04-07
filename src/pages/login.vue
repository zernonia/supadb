<script setup lang="ts">
import { supabase } from "@/plugins/supabase"

const login = () => {
  supabase.auth.signIn({
    provider: "github",
  })
}
</script>

<template>
  <div class="mt-12 flex flex-col items-center">
    <h2 class="text-yellow-300 text-4xl font-semibold">Login with Github</h2>
    <button
      class="mt-6 flex items-center text-lg text-dark-700 bg-light-900 transition hover:bg-light-400 font-semibold px-6 py-3 rounded-xl"
      @click="login"
    >
      Login <i-simple-icons:github class="ml-2"></i-simple-icons:github>
    </button>
  </div>
</template>
